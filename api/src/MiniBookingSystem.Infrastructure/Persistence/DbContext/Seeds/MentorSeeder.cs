using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using MiniBookingSystem.Application.Common.Constants;

public static class MentorSeeder
{
    private const int TargetCount = 100;
    private const string DefaultPassword = "Mentor@123456";

    // ─── public entry point ──────────────────────────────────────────────────

    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<ApplicationDbContext>>();

        var existingCount = await db.Mentors.CountAsync();
        if (existingCount >= TargetCount)
        {
            logger.LogInformation(
                "MentorSeeder: {Count} mentors already exist — skipping.",
                existingCount
            );
            return;
        }

        logger.LogInformation("MentorSeeder: Seeding {Target} mentors...", TargetCount);

        var seeded = 0;
        foreach (var entry in GenerateSeedData())
        {
            if (await userManager.FindByEmailAsync(entry.Email) is not null)
                continue;

            var user = new ApplicationUser
            {
                FullName = entry.FullName,
                Email = entry.Email,
                UserName = entry.Email,
                PhoneNumber = entry.PhoneNumber,
            };

            var createResult = await userManager.CreateAsync(user, DefaultPassword);
            if (!createResult.Succeeded)
            {
                logger.LogWarning(
                    "MentorSeeder: Could not create user '{Email}': {Errors}",
                    entry.Email,
                    string.Join(", ", createResult.Errors.Select(e => e.Description))
                );
                continue;
            }

            await userManager.AddToRolesAsync(
                user,
                [ApplicationRoles.User, ApplicationRoles.Mentor]
            );

            var mentor = new Mentor();
            mentor.Initialize(
                user.Id,
                entry.DisplayName,
                entry.Email,
                entry.Bio,
                entry.Specialization,
                entry.ExperienceYears,
                entry.BasePrice,
                avatarUrl: null
            );

            foreach (var skill in entry.Skills)
                mentor.Skills.Add(new MentorSkill { SkillName = skill });

            await db.Mentors.AddAsync(mentor);
            await db.SaveChangesAsync();
            seeded++;
        }

        logger.LogInformation("MentorSeeder: Done — {Seeded} mentors created.", seeded);
    }

    // ─── seed data ───────────────────────────────────────────────────────────

    private sealed record MentorSeedEntry(
        string FullName,
        string Email,
        string PhoneNumber,
        string DisplayName,
        string Bio,
        string Specialization,
        int ExperienceYears,
        decimal BasePrice,
        string[] Skills
    );

    private static IEnumerable<MentorSeedEntry> GenerateSeedData()
    {
        // Each category: (Specialization, skills pool, bio, min/max price)
        var categories = new (
            string Spec,
            string[] SkillPool,
            string[] BioTemplates,
            decimal MinPrice,
            decimal MaxPrice
        )[]
        {
            (
                "Backend Development",
                [
                    "C#",
                    ".NET Core",
                    "Java",
                    "Spring Boot",
                    "PostgreSQL",
                    "Redis",
                    "Microservices",
                    "REST API",
                    "GraphQL",
                    "Docker",
                ],
                [
                    "Senior backend engineer with deep expertise in building scalable, high-performance APIs and distributed systems.",
                    "Passionate about clean architecture and domain-driven design, helping teams write maintainable server-side code.",
                    "Backend specialist focused on performance tuning, database optimization, and microservices patterns.",
                ],
                80m,
                200m
            ),
            (
                "Frontend Development",
                [
                    "React",
                    "TypeScript",
                    "Vue.js",
                    "Angular",
                    "Tailwind CSS",
                    "Next.js",
                    "Testing Library",
                    "Webpack",
                    "CSS Architecture",
                    "Web Performance",
                ],
                [
                    "Frontend engineer obsessed with UI performance, accessibility, and pixel-perfect implementation of complex interfaces.",
                    "Experienced in building large-scale SPAs with React and TypeScript, focusing on code quality and design systems.",
                    "Full-stack leaning frontend developer who bridges the gap between design and engineering.",
                ],
                70m,
                160m
            ),
            (
                "Mobile Development",
                [
                    "Flutter",
                    "Dart",
                    "React Native",
                    "Swift",
                    "Kotlin",
                    "iOS SDK",
                    "Android SDK",
                    "Firebase",
                    "App Architecture",
                    "CI/CD for Mobile",
                ],
                [
                    "Mobile engineer with cross-platform expertise in Flutter and React Native, delivering apps with millions of downloads.",
                    "iOS/Android native developer transitioning teams to Flutter; focused on smooth animations and offline-first patterns.",
                    "Mobile architect specializing in app performance, state management, and publishing production apps at scale.",
                ],
                80m,
                190m
            ),
            (
                "AI & Machine Learning",
                [
                    "Python",
                    "TensorFlow",
                    "PyTorch",
                    "Scikit-learn",
                    "NLP",
                    "Computer Vision",
                    "MLOps",
                    "LangChain",
                    "Hugging Face",
                    "Data Preprocessing",
                ],
                [
                    "ML engineer with production experience deploying deep learning models for NLP and computer vision at scale.",
                    "AI researcher turned industry practitioner; helps teams build practical ML pipelines from data to deployment.",
                    "Specialist in large language models and RAG systems; experienced in fine-tuning and prompt engineering.",
                ],
                120m,
                300m
            ),
            (
                "DevOps & CI/CD",
                [
                    "Docker",
                    "Kubernetes",
                    "GitHub Actions",
                    "Jenkins",
                    "Terraform",
                    "Ansible",
                    "Prometheus",
                    "Grafana",
                    "Linux",
                    "Bash",
                ],
                [
                    "DevOps engineer who has built and maintained CI/CD pipelines for 50+ microservices in production Kubernetes clusters.",
                    "Platform engineer focused on developer productivity, infrastructure automation, and zero-downtime deployments.",
                    "SRE background with deep experience in observability, incident management, and reliability engineering.",
                ],
                90m,
                220m
            ),
            (
                "Data Engineering",
                [
                    "Apache Spark",
                    "Apache Kafka",
                    "Airflow",
                    "dbt",
                    "Snowflake",
                    "BigQuery",
                    "Python",
                    "SQL",
                    "Delta Lake",
                    "Data Modeling",
                ],
                [
                    "Data engineer with 7+ years building real-time and batch pipelines processing billions of events daily.",
                    "Specializes in modern data stack: dbt, Airflow, Snowflake. Helps teams migrate from legacy ETL to cloud-native solutions.",
                    "Experienced in designing data warehouses and lakehouse architectures for analytics-driven products.",
                ],
                90m,
                240m
            ),
            (
                "Cybersecurity",
                [
                    "Penetration Testing",
                    "OWASP Top 10",
                    "Burp Suite",
                    "Network Security",
                    "SIEM",
                    "Cryptography",
                    "Threat Modeling",
                    "Secure Code Review",
                    "Zero Trust",
                    "Incident Response",
                ],
                [
                    "Offensive security engineer who has conducted 100+ penetration tests for fintech and e-commerce platforms.",
                    "Application security specialist who embeds security into SDLC; experienced with secure design reviews and red teaming.",
                    "Security architect helping teams implement zero-trust networks and mature their security programs.",
                ],
                100m,
                280m
            ),
            (
                "Cloud Architecture",
                [
                    "AWS",
                    "Azure",
                    "GCP",
                    "Serverless",
                    "Microservices",
                    "Service Mesh",
                    "Istio",
                    "CDN & Edge",
                    "Cost Optimization",
                    "Multi-cloud Strategy",
                ],
                [
                    "AWS Solutions Architect Professional with 10+ years designing cloud-native systems for enterprise clients.",
                    "Multi-cloud architect helping startups and enterprises migrate on-premise workloads to the cloud cost-effectively.",
                    "Focused on designing resilient, cost-optimized cloud architectures with solid disaster recovery strategies.",
                ],
                100m,
                260m
            ),
            (
                "Game Development",
                [
                    "Unity",
                    "Unreal Engine",
                    "C++",
                    "C#",
                    "Shader Programming",
                    "Physics Simulation",
                    "Multiplayer Networking",
                    "Game AI",
                    "Asset Pipeline",
                    "Performance Profiling",
                ],
                [
                    "Game developer with shipped titles on Steam and mobile; deep expertise in Unity performance optimization.",
                    "Unreal Engine specialist focused on AAA-quality visuals and multiplayer backend architecture.",
                    "Indie game developer and mentor helping new developers ship their first game with clean code and good practices.",
                ],
                70m,
                180m
            ),
            (
                "Blockchain & Web3",
                [
                    "Solidity",
                    "Ethereum",
                    "Hardhat",
                    "Web3.js",
                    "Ethers.js",
                    "DeFi Protocols",
                    "Smart Contract Auditing",
                    "IPFS",
                    "Layer 2",
                    "Tokenomics",
                ],
                [
                    "Smart contract developer who has audited and deployed protocols managing $50M+ TVL on Ethereum and L2 networks.",
                    "Web3 full-stack developer bridging DeFi protocol engineering with great user-facing dApps.",
                    "Blockchain educator and developer; helps teams understand tokenomics, security pitfalls, and on-chain architecture.",
                ],
                100m,
                280m
            ),
        };

        // Vietnamese names (first + last)
        string[] viFirstNames =
        [
            "An",
            "Bảo",
            "Cường",
            "Dũng",
            "Hùng",
            "Khánh",
            "Linh",
            "Minh",
            "Nam",
            "Phúc",
        ];
        string[] viLastNames =
        [
            "Nguyễn",
            "Trần",
            "Lê",
            "Phạm",
            "Hoàng",
            "Phan",
            "Vũ",
            "Đặng",
            "Bùi",
            "Đỗ",
        ];

        // International names
        string[] intlFirstNames =
        [
            "Alice",
            "Bob",
            "Carlos",
            "Diana",
            "Eric",
            "Fiona",
            "George",
            "Hannah",
            "Ivan",
            "Julia",
        ];
        string[] intlLastNames =
        [
            "Smith",
            "Johnson",
            "Williams",
            "Brown",
            "Jones",
            "Garcia",
            "Miller",
            "Davis",
            "Wilson",
            "Moore",
        ];

        var index = 0;
        foreach (var cat in categories)
        {
            for (var j = 0; j < 10; j++)
            {
                index++;
                var isVi = j < 5; // first 5 per category are Vietnamese

                string fullName,
                    displayName;
                if (isVi)
                {
                    var last = viLastNames[j % viLastNames.Length];
                    var first = viFirstNames[(index - 1) % viFirstNames.Length];
                    fullName = $"{last} {first}";
                    displayName = $"{first} {last}";
                }
                else
                {
                    var first = intlFirstNames[(j - 5) % intlFirstNames.Length];
                    var last = intlLastNames[(index - 1) % intlLastNames.Length];
                    fullName = $"{first} {last}";
                    displayName = $"{first} {last}";
                }

                var email = $"mentor{index:D3}@mentor.dev";
                var phone = $"090{index:D7}";
                var bio = cat.BioTemplates[j % cat.BioTemplates.Length];

                // Spread experience: 1–20 years cycling through the 10 mentors
                var experienceYears = (j * 2) + 1; // 1,3,5,7,9,11,13,15,17,19

                // Spread price proportionally within the category range
                var step = (cat.MaxPrice - cat.MinPrice) / 9m;
                var basePrice = Math.Round(cat.MinPrice + step * j, 0);

                // Pick 4 skills cycling through the pool
                var skills = Enumerable
                    .Range(0, 4)
                    .Select(k => cat.SkillPool[(j + k) % cat.SkillPool.Length])
                    .Distinct()
                    .ToArray();

                yield return new MentorSeedEntry(
                    fullName,
                    email,
                    phone,
                    displayName,
                    bio,
                    cat.Spec,
                    experienceYears,
                    basePrice,
                    skills
                );
            }
        }
    }
}
