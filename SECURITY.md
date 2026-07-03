# Security

## Reporting a vulnerability

**In the template itself** (this boilerplate — build pipeline, config, defaults):
report privately to the author, Oleksandr Bilostotskyi, via a GitHub security
advisory on the template repository, or by email. Please do not open a public
issue for an unfixed vulnerability. Expect an initial response within a few days.

**In a site you built from this template**: that deployment is the Owner's
responsibility — replace this section with your own reporting contact.

## What the template already does

- **No server, no middleware.** The site is a static export (`output: 'export'`)
  — there is no runtime backend to attack, no server-side secrets, no dynamic
  request handling. Attack surface is deliberately minimal.
- **Security headers** are set in `vercel.json`: `Strict-Transport-Security`
  (HSTS with preload), `X-Content-Type-Options: nosniff`, `X-Frame-Options:
  DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, and a restrictive
  `Permissions-Policy`. If you deploy somewhere other than Vercel, replicate
  these headers in that host's config.
- **JSON-LD is escaped** before injection (`<` → `<`) to prevent script
  breakout in the structured-data block.
- **No secrets in the repo.** The template ships placeholder config only; there
  are no tokens, keys, or credentials. `.env*` is git-ignored.
- **External links** use `rel` attributes (`me noopener`) where appropriate.

## Owner checklist before you deploy

- [ ] Never commit `.env*` or any real credentials (already git-ignored — keep
      it that way).
- [ ] Set a real `url`, `email`, and socials in `src/shared/site.ts` before
      going live.
- [ ] Keep dependencies patched: run `pnpm update` / check `pnpm audit`
      periodically.
- [ ] If you self-host (not Vercel), port the `vercel.json` security headers to
      your host.
- [ ] Replace the "site you built" reporting contact above with your own.

## Supported versions

This is a template, not a running service — there is no long-term support
branch. Fixes land on the default branch; pull the latest to pick them up.
