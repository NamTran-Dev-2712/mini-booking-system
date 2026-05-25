# Internationalization (i18n) Guide

This document explains how the multi-language system works across the frontend and backend, and how to add new translations or languages.

## Overview

The application supports **English (en)** and **Vietnamese (vi)** with runtime language switching. No page reload is required — all text updates instantly when the user changes language.

---

## Frontend (React + react-i18next)

### Architecture

```
web/app/lib/i18n.ts              → i18next initialization (bundled resources)
web/app/config/languages.ts      → Supported languages and namespace definitions
web/public/locales/{lng}/{ns}.json → Translation JSON files
web/app/components/shared/language-switcher.tsx → UI dropdown component
```

### How It Works

1. **Bundled translations** — All JSON files are imported directly into `i18n.ts` at build time. This ensures translations are available synchronously (no loading delay, no HTTP requests).

2. **Language detection** — On first visit, `i18next-browser-languagedetector` checks `localStorage` key `i18nextLng`, then falls back to the browser's `navigator.language`. The detected language is cached in `localStorage`.

3. **Reactive updates** — When `i18n.changeLanguage("vi")` is called (via the LanguageSwitcher), every component using `useTranslation()` re-renders automatically with the new language.

4. **API requests** — The axios interceptor reads `i18n.language` and sets the `Accept-Language` header on every request, so the backend can return localized error messages.

### Namespace Structure

| Namespace | Purpose |
|-----------|---------|
| `common` | Navigation, buttons, status labels, validation, pagination, errors |
| `auth` | Login, register, forgot/reset password, profile management |
| `booking` | Booking list, detail, status, actions, creation |
| `mentor` | Mentor list, detail, schedule, skills, profile |
| `payment` | Payment list, QR code, status, instructions |
| `dashboard` | Stats, charts, welcome messages, quick actions |
| `public` | Home page, about page content |

### File Structure

```
web/public/locales/
├── en/
│   ├── common.json
│   ├── auth.json
│   ├── booking.json
│   ├── mentor.json
│   ├── payment.json
│   ├── dashboard.json
│   └── public.json
└── vi/
    ├── common.json
    ├── auth.json
    ├── booking.json
    ├── mentor.json
    ├── payment.json
    ├── dashboard.json
    └── public.json
```

### Usage in Components

#### Basic usage (single namespace)

```tsx
import { useTranslation } from "react-i18next";

export default function MyPage() {
  const { t } = useTranslation("booking");

  return <h2>{t("list.title")}</h2>;
}
```

#### Multiple namespaces

```tsx
const { t } = useTranslation(["booking", "common"]);

// Access booking namespace (default, first in array)
t("list.title")

// Access common namespace explicitly
t("actions.save", { ns: "common" })
```

#### Interpolation

```tsx
// JSON: "welcome": "Welcome, {{name}}"
t("welcome", { name: user.fullName })

// JSON: "yearsExperience": "{{count}} years experience"
t("detail.yearsExperience", { count: 5 })
```

### Adding New Translation Keys

1. Add the key to `web/public/locales/en/{namespace}.json`
2. Add the Vietnamese translation to `web/public/locales/vi/{namespace}.json`
3. Import is automatic (bundled at build time via `i18n.ts`)
4. Use `t("your.new.key")` in the component

### Adding a New Language

1. Create folder `web/public/locales/{code}/` with all namespace JSON files
2. Add the language to `web/app/config/languages.ts`:
   ```ts
   export const languages = [
     { code: "en", label: "English", flag: "🇺🇸" },
     { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
     { code: "ja", label: "日本語", flag: "🇯🇵" }, // new
   ] as const;
   ```
3. Import the new JSON files in `web/app/lib/i18n.ts` and add to the `resources` object
4. Add the language code to `supportedLngs` array in `i18n.ts`

### Adding a New Namespace

1. Create `web/public/locales/en/{namespace}.json` and `vi/{namespace}.json`
2. Import both in `web/app/lib/i18n.ts`
3. Add to the `resources` object under each language
4. Add to `namespaces` array in `web/app/config/languages.ts`

---

## Backend (ASP.NET Core Localization)

### Architecture

```
api/src/MiniBookingSystem.Application/
├── Common/Localization/
│   ├── ILocalizationService.cs      → Interface
│   └── SharedResource.cs            → Marker class for resource lookup
├── Resources/
│   ├── SharedResource.resx          → English (default) messages
│   └── SharedResource.vi.resx       → Vietnamese messages

api/src/MiniBookingSystem.Infrastructure/
└── Services/Localization/
    └── LocalizationService.cs       → Implementation using IStringLocalizer
```

### How It Works

1. **Request culture** — `UseRequestLocalization` middleware reads the `Accept-Language` header from each request and sets `CultureInfo.CurrentUICulture`.

2. **Resource lookup** — `ILocalizationService` wraps `IStringLocalizer<SharedResource>` which resolves the correct `.resx` file based on the current culture.

3. **Supported cultures** — `en` (default) and `vi`. If an unsupported culture is requested, it falls back to English.

### Configuration (Program.cs)

```csharp
// Service registration
builder.Services.AddLocalization();

// Middleware (after UseSerilogRequestLogging, before MapHealthChecks)
var supportedCultures = new[] { "en", "vi" };
app.UseRequestLocalization(options =>
{
    options.SetDefaultCulture("en");
    options.AddSupportedCultures(supportedCultures);
    options.AddSupportedUICultures(supportedCultures);
});
```

### Usage in Handlers/Services

```csharp
public class MyCommandHandler
{
    private readonly ILocalizationService _localizer;

    public MyCommandHandler(ILocalizationService localizer)
    {
        _localizer = localizer;
    }

    public async Task Handle(MyCommand request)
    {
        // Simple message
        var msg = _localizer.GetMessage("Auth.InvalidCredentials");

        // With format args
        var msg = _localizer.GetMessage("Validation.MinLength", "Password", 8);
    }
}
```

### Adding New Messages

1. Add to `SharedResource.resx` (English):
   ```xml
   <data name="MyModule.MyKey" xml:space="preserve">
     <value>English message here.</value>
   </data>
   ```

2. Add to `SharedResource.vi.resx` (Vietnamese):
   ```xml
   <data name="MyModule.MyKey" xml:space="preserve">
     <value>Vietnamese message here.</value>
   </data>
   ```

### Resource Key Naming Convention

Use dot-separated hierarchical keys: `{Module}.{Action/Context}`

Examples:
- `Auth.InvalidCredentials`
- `Booking.SlotNotAvailable`
- `Validation.Required`
- `Error.Generic`

---

## Testing

### Frontend
- Toggle the language switcher — all visible text should update instantly
- Refresh the page — language preference persists (localStorage)
- Check API requests in DevTools Network tab — `Accept-Language` header should match selected language

### Backend
- Send request with `Accept-Language: vi` header
- Trigger a validation error — response message should be in Vietnamese
- Send without header or with `Accept-Language: en` — response should be in English
