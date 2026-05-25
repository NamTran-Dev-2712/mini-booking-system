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
    private readonly ILocalizationService _localizer;

    public IdentityService(
        UserManager<ApplicationUser> userManager,
        IJwtTokenService tokenService,
        ITokenHasher tokenHasher,
        IRefreshTokenRepository refreshTokenRepository,
        IUnitOfWork unitOfWork,
        ILocalizationService localizer
    )
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _tokenHasher = tokenHasher;
        _refreshTokenRepository = refreshTokenRepository;
        _unitOfWork = unitOfWork;
        _localizer = localizer;
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
            throw new ConflictException(_localizer.GetMessage("Auth.EmailAlreadyRegistered"));

        // Check for existing user by phone number
        var phoneExists = await _unitOfWork.User.IsPhoneNumberTakenAsync(
            phoneNumber,
            cancellationToken
        );

        if (phoneExists)
            throw new ConflictException(_localizer.GetMessage("Auth.PhoneAlreadyRegistered"));

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
            throw new BadRequestException(_localizer.GetMessage("Auth.RegistrationFailed"), errors);
        }

        var roleResult = await _userManager.AddToRoleAsync(user, ApplicationRoles.User);
        if (!roleResult.Succeeded)
        {
            // Roll back: clean up the created user to keep data consistent
            await _userManager.DeleteAsync(user);

            var errors = roleResult.Errors.Select(e => e.Description).ToList();
            throw new BadRequestException(_localizer.GetMessage("Auth.RoleAssignFailed"), errors);
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
            throw new UnauthorizedException(_localizer.GetMessage("Auth.InvalidCredentials"));

        var passwordValid = await _userManager.CheckPasswordAsync(user, password);
        if (!passwordValid)
            throw new UnauthorizedException(_localizer.GetMessage("Auth.InvalidCredentials"));

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
            throw new NotFoundException(_localizer.GetMessage("Auth.UserNotFound"));

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
            throw new UnauthorizedException(_localizer.GetMessage("Auth.InvalidRefreshToken"));

        var user = await _userManager.FindByIdAsync(token.UserId.ToString());

        if (user is null)
            throw new UnauthorizedException(_localizer.GetMessage("Auth.RefreshTokenUserNotFound"));

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
            throw new NotFoundException(_localizer.GetMessage("Auth.UserNotFound"));

        var passwordHash = _userManager.PasswordHasher.HashPassword(user, newPassword);
        user.PasswordHash = passwordHash;
        user.SecurityStamp = Guid.NewGuid().ToString();

        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
        {
            var errors = result.Errors.Select(e => e.Description).ToList();
            throw new BadRequestException(
                _localizer.GetMessage("Auth.PasswordResetFailed"),
                errors
            );
        }
    }

    public async Task ChangePasswordAsync(
        Guid userId,
        string currentPassword,
        string newPassword,
        CancellationToken cancellationToken = default
    )
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());
        if (user is null)
            throw new NotFoundException(_localizer.GetMessage("Auth.UserNotFound"));

        var result = await _userManager.ChangePasswordAsync(user, currentPassword, newPassword);
        if (!result.Succeeded)
        {
            var errors = result.Errors.Select(e => e.Description).ToList();
            if (errors.Any(e => e.Contains("Incorrect password")))
                throw new UnauthorizedException(
                    _localizer.GetMessage("Auth.CurrentPasswordIncorrect")
                );

            throw new BadRequestException(
                _localizer.GetMessage("Auth.PasswordChangeFailed"),
                errors
            );
        }

        await _refreshTokenRepository.RemoveRefreshTokenAsync(userId.ToString());
    }

    public async Task<AuthResult> GoogleLoginAsync(
        string email,
        string? name,
        string? avatarUrl,
        string googleUserId,
        CancellationToken cancellationToken = default
    )
    {
        // 1. Check if user already linked with Google
        var user = await _userManager.FindByLoginAsync("Google", googleUserId);

        if (user is null)
        {
            // 2. Check if email already exists (auto-link)
            user = await _userManager.FindByEmailAsync(email);

            if (user is not null)
            {
                // Auto-link Google to existing account
                var linkResult = await _userManager.AddLoginAsync(
                    user,
                    new UserLoginInfo("Google", googleUserId, "Google")
                );
                if (!linkResult.Succeeded)
                {
                    var errors = linkResult.Errors.Select(e => e.Description).ToList();
                    throw new BadRequestException(
                        _localizer.GetMessage("Auth.GoogleLinkFailed"),
                        errors
                    );
                }
            }
            else
            {
                // 3. Create new user (no password, OAuth-only)
                user = new ApplicationUser
                {
                    FullName = name ?? email.Split('@')[0],
                    Email = email,
                    UserName = email,
                    EmailConfirmed = true,
                    AvatarUrl = avatarUrl,
                };

                var createResult = await _userManager.CreateAsync(user);
                if (!createResult.Succeeded)
                {
                    var errors = createResult.Errors.Select(e => e.Description).ToList();
                    throw new BadRequestException(
                        _localizer.GetMessage("Auth.GoogleCreateFailed"),
                        errors
                    );
                }

                await _userManager.AddToRoleAsync(user, ApplicationRoles.User);
                await _userManager.AddLoginAsync(
                    user,
                    new UserLoginInfo("Google", googleUserId, "Google")
                );
            }
        }

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

        await _refreshTokenRepository.UpdateRefreshTokenAsync(
            user.Id.ToString(),
            tokenResult.RefreshTokenHash,
            tokenResult.RefreshTokenExpiry
        );

        var requiresProfileCompletion = string.IsNullOrEmpty(user.PhoneNumber);

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
            Roles: roles,
            RequiresProfileCompletion: requiresProfileCompletion
        );
    }

    public async Task CompleteProfileAsync(
        Guid userId,
        string phoneNumber,
        CancellationToken cancellationToken = default
    )
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());
        if (user is null)
            throw new NotFoundException(_localizer.GetMessage("Auth.UserNotFound"));

        var phoneExists = await _unitOfWork.User.IsPhoneNumberTakenAsync(
            phoneNumber,
            cancellationToken
        );
        if (phoneExists)
            throw new ConflictException(_localizer.GetMessage("Auth.PhoneAlreadyRegistered"));

        user.PhoneNumber = phoneNumber;
        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
        {
            var errors = result.Errors.Select(e => e.Description).ToList();
            throw new BadRequestException(
                _localizer.GetMessage("Auth.ProfileUpdateFailed"),
                errors
            );
        }
    }
}
