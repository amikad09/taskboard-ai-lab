# Set up a calm workstation

Use the exact versions recorded in package.json, .node-version and the lockfile. They were refreshed from stable releases on 2026-10-08. Node 24.21.0 is the tested LTS baseline; Node 26 is current and needs its own compatibility rehearsal. Recheck before a new recording.

## First checks

Run node --version, pnpm --version and encore version. Fix a mismatch before editing code.

Install dependencies at the workspace root with pnpm install --frozen-lockfile. Shared packages are compiled before Encore starts; use the root dev:backend command.

## VS Code

Use built-in TypeScript, Git, terminal and debugging first. Select the workspace TypeScript version. The Oxc extension is optional and uses the project-installed tools. Format-on-save and automatic fixes are off during the first proof pass.

Only install Remote-SSH or Dev Containers when taking that optional route. A local machine works fully. A VPS provides persistence and remote access; it does not reduce AI billing by itself.

The workspace scripts call the locally installed tool entry points through Node so Turborepo can launch them directly on the tested Linux route. The learner still runs the same root commands; do not copy package internals into a new project without checking its package manager and platform.

## Support evidence

The implementation receipt names the actual OS, shell, Node, pnpm and Encore versions used. Other OS routes remain untested until rehearsed. Do not call an untested route supported.
