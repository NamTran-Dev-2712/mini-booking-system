# Documentation

## Structure

```
docs/
├── deployment/
│   └── production-deployment.md   # Full VPS deployment guide (blue-green, SSL, monitoring)
├── guides/
│   ├── google-oauth-flow.md       # Google OAuth 2.0 integration details
│   ├── payment-flow.md            # SePay bank transfer + webhook flow
│   ├── testing-guide.md           # Unit testing patterns and conventions
│   └── i18n-guide.md             # Internationalization (i18n) guide
└── development/
    ├── ef-commands.md             # EF Core migration command reference
```

## Quick Links

- [Production Deployment](deployment/production-deployment.md) — VPS setup, CI/CD, blue-green deploy, SSL, monitoring, backup, rollback
- [Google OAuth Flow](guides/google-oauth-flow.md) — Authorization Code flow with PKCE, token handling, auto-registration
- [Payment Flow](guides/payment-flow.md) — SePay QR payment, webhook verification, transaction lifecycle
- [Testing Guide](guides/testing-guide.md) — xUnit + Moq + FluentAssertions patterns, test data builders
- [i18n Guide](guides/i18n-guide.md) — Multi-language setup, adding translations, frontend and backend usage
- [EF Core Commands](development/ef-commands.md) — Migration create, apply, rollback cheatsheet
