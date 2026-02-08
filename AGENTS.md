# Coding Style Guide

## Next.js & React Conventions

### Dynamic Metadata
- **Async Metadata Generation**: Use `export async function generateMetadata()` for dynamic SEO configuration.
- **Request-Time Logic**: Leverage `headers()` within `generateMetadata` to handle environment-specific logic (e.g., dynamic `robots` indexing based on the `x-forwarded-host`).
- **Domain Validation**: Use a `Set` for indexable hosts to ensure efficient lookup when determining `robots` permissions.

### Layouts & Fonts
- **Next.js Font Optimization**: Define `Geist` and `Geist_Mono` at the module level using the `variable` pattern.
- **CSS Variables**: Apply fonts to the `body` via CSS variables (`${font.variable}`) to maintain consistency with Tailwind or global CSS.
- **Strict Typing**: Use `Readonly<{ children: React.ReactNode }>` for layout props.

## TypeScript & Logic

### Header & Host Parsing
- **Defensive Parsing**: When extracting hostnames from headers, use optional chaining and explicit splitting to handle port numbers and comma-separated forwarded hosts:
  ```typescript
  const domain = host.split(",")[0]?.trim().split(":")[0]?.toLowerCase() || "";
  ```

### SEO & Internationalization
- **Language**: Default to German (`lang="de"`) for HTML and `de_DE` for OpenGraph locales.
- **Metadata Objects**: Prefer comprehensive metadata objects including `openGraph`, `twitter`, and `robots` configurations.

## Syntax & Formatting
- **Quotes**: Use double quotes for JSX attributes and string literals.
- **Trailing Commas**: Ensure trailing commas in objects and arrays to maintain clean diffs.
- **Naming**: Use camelCase for variables/constants and PascalCase for React components and Metadata types.