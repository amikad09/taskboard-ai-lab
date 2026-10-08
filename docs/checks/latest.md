# Latest checks

**Candidate:** taskboard-v1 + P5 workflow foundation, toolchain refresh 2026-10-08
**State:** maintainer reference run on the refreshed candidate.
**Recorded:** 2026-10-08

Run the commands on your own checkout before accepting a change. The
maintainer's private receipt is intentionally not included in this public
repository.

The reference run passed:

- `pnpm verify` with `TURBO_FORCE=true` (format, TypeScript, Encore check,
  lint, package tests, Encore tests, and build);
- `pnpm test:browser` with Playwright 1.64.0 (three composed tests); and
- `pnpm deadcode` with the checked-in Knip configuration.

The refreshed versions are Node 24.21.0 LTS, pnpm 12.10.1, Encore 1.58.6,
TypeScript 7.0.2, Vite 8.3.3, React 19.3.0, Turborepo 2.11.7, Vitest 5.0.3,
Oxlint 1.87.0, Oxfmt 0.72.0, Knip 6.40.0, and Playwright 1.64.0.

The package scripts use explicit local Node entry points for TypeScript, Oxc,
Vitest, and Vite so Turborepo can launch the tools directly on the Linux route.
This is a process-launch portability detail; it does not change the
learner-facing commands.

Manual review, mutation-engine runs, clean-machine setup, every OS/editor
route, independent human B, accessibility review, and learner completion
remain open. A green local run does not prove production readiness or a fixed
token saving.
