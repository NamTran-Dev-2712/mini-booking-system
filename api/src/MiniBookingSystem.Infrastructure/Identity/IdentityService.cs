using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MiniBookingSystem.Application.Common.Constants;

public class IdentityService : IIdentityService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IJwtTokenService _tokenService;
    private readonly ITokenHasher _tokenHasher;
    private readonly IRefreshTokenRepository _refreshTokenRepository;
    private readonly IUnitOfWork _unitOfWork;

    public IdentityService(
        UserManager<ApplicationUser> userManager,
        IJwtTokenService tokenService,
        ITokenHasher tokenHasher,
        IRefreshTokenRepository refreshTokenRepository,
        IUnitOfWork unitOfWork
    )
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _tokenHasher = tokenHasher;
        _refreshTokenRepository = refreshTokenRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<Guid> RegisterAsync(
        string fullName,
        string email,
        string password,
        string phoneNumber,
        string? avatarUrl = null,
        CancellationToken cancellationToken = default
    )
    {
        // Check for existing user by email
        var existingByEmail = await _userManager.FindByEmailAsync(email);
        if (existingByEmail is not null)
            throw new ConflictException("Email is already registered.");

        // Check for existing user by phone number
        var phoneExists = await _unitOfWork.User.IsPhoneNumberTakenAsync(
            phoneNumber,
            cancellationToken
        );

        if (phoneExists)
            throw new ConflictException("Phone number is already registered.");

        var user = new ApplicationUser
        {
            FullName = fullName,
            Email = email,
            UserName = email,
            PhoneNumber = phoneNumber,
            AvatarUrl = avatarUrl,
        };

        var createResult = await _userManager.CreateAsync(user, password);
        if (!createResult.Succeeded)
        {
            var errors = createResult.Errors.Select(e => e.Description).ToList();
            throw new BadRequestException("User registration failed.", errors);
        }

        var roleResult = await _userManager.AddToRoleAsync(user, ApplicationRoles.User);
        if (!roleResult.Succeeded)
        {
            // Roll back: clean up the created user to keep data consistent
            await _userManager.DeleteAsync(user);

            var errors = roleResult.Errors.Select(e => e.Description).ToList();
            throw new BadRequestException("Failed to assign default role.", errors);
        }

        return user.Id;
    }

    public async Task<AuthResult> LoginAsync(
        string email,
        string password,
        CancellationToken cancellationToken = default
    )
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user is null)
            throw new UnauthorizedException("Invalid email or password.");

        var passwordValid = await _userManager.CheckPasswordAsync(user, password);
        if (!passwordValid)
            throw new UnauthorizedException("Invalid email or password.");

        // Generate tokens
        var roles = await _userManager.GetRolesAsync(user);
        var tokenResult = await _tokenService.GenerateTokensAsync(
            new UserTokenData
            {
                UserId = user.Id,
                Email = user.Email ?? string.Empty,
                FullName = user.FullName,
                Roles = roles,
            }
        );

        // Store the refresh token with the user
        await _refreshTokenRepository.UpdateRefreshTokenAsync(
            user.Id.ToString(),
            tokenResult.RefreshTokenHash,
            tokenResult.RefreshTokenExpiry
        );

        return new AuthResult(
            UserId: user.Id.ToString(),
            FullName: user.FullName,
            Email: user.Email ?? string.Empty,
            PhoneNumber: user.PhoneNumber ?? string.Empty,
            AccessToken: tokenResult.AccessToken,
            RefreshToken: tokenResult.RefreshToken,
            ExpiresIn: _tokenService.GetAccessTokenExpiry(),
            RefreshTokenExpiresAt: tokenResult.RefreshTokenExpiry,
            CreatedAt: user.CreatedAt,
            Roles: roles
        );
    }

    public async Task<bool> CheckPasswordAsync(
        string email,
        string password,
        CancellationToken cancellationToken = default
    )
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user is null)
            return false;

        return await _userManager.CheckPasswordAsync(user, password);
    }

    public async Task<UserDTO> GetProfileAsync(
        Guid userId,
        CancellationToken cancellationToken = default
    )
    {
        var user = await _userManager
            .Users.Where(u => u.Id == userId)
            .FirstOrDefaultAsync(cancellationToken);

        if (user is null)
            throw new NotFoundException("User", userId);

        var roles = await _userManager.GetRolesAsync(user);

        return new UserDTO(
            Id: user.Id,
            FullName: user.FullName,
            Email: user.Email ?? string.Empty,
            PhoneNumber: user.PhoneNumber ?? string.Empty,
            AvatarUrl: user.AvatarUrl,
            CreatedAt: user.CreatedAt,
            Roles: roles
        );
    }

    public async Task<AuthResult> RefreshTokenAsync(
        string refreshToken,
        CancellationToken cancellationToken = default
    )
    {
        var tokenHash = _tokenHasher.HashToken(refreshToken);
        var token = await _refreshTokenRepository.GetRefreshTokenAsync(tokenHash);

        if (token is null)
            throw new UnauthorizedException("Invalid refresh token.");

        var user = await _userManager.FindByIdAsync(token.UserId.ToString());

        if (user is null)
            throw new UnauthorizedException("User not found for the provided refresh token.");

        // Generate new tokens
        var roles = await _userManager.GetRolesAsync(user);
        var tokenResult = await _tokenService.GenerateTokensAsync(
            new UserTokenData
            {
                UserId = user.Id,
                Email = user.Email ?? string.Empty,
                FullName = user.FullName,
                Roles = roles,
            }
        );

        // Update the refresh token in the repository
        await _refreshTokenRepository.UpdateRefreshTokenAsync(
            user.Id.ToString(),
            tokenResult.RefreshTokenHash,
            tokenResult.RefreshTokenExpiry
        );

        return new AuthResult(
            UserId: user.Id.ToString(),
            FullName: user.FullName,
            Email: user.Email ?? string.Empty,
            PhoneNumber: user.PhoneNumber ?? string.Empty,
            AccessToken: tokenResult.AccessToken,
            RefreshToken: tokenResult.RefreshToken,
            ExpiresIn: _tokenService.GetAccessTokenExpiry(),
            RefreshTokenExpiresAt: tokenResult.RefreshTokenExpiry,
            CreatedAt: user.CreatedAt,
            Roles: roles
        );
    }

    public async Task ResetPasswordAsync(
        Guid userId,
        string newPassword,
        CancellationToken cancellationToken = default
    )
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());
        if (user is null)
            throw new NotFoundException("User", userId);

        var passwordHash = _userManager.PasswordHasher.HashPassword(user, newPassword);
        user.PasswordHash = passwordHash;
        user.SecurityStamp = Guid.NewGuid().ToString();

        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
        {
            var errors = result.Errors.Select(e => e.Description).ToList();
            throw new BadRequestException("Failed to reset password.", errors);
        }
    }
}
