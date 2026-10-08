# Contributing

Thanks for helping improve the Taskboard AI Lab. Keep changes small enough to
review and useful enough to teach one idea.

## Before opening a pull request

1. Read [`AGENTS.md`](AGENTS.md), the project map, the active task, and the
   latest check note.
2. Describe one outcome, the files in scope, acceptance cases, and the files
   that must remain unchanged.
3. Run `pnpm install --frozen-lockfile` and `pnpm verify`.
4. Run `pnpm test:browser` when the composed browser route changes.
5. Explain the actual checks, manual observations, and any remaining limits.

Keep the Encore.ts backend, package direction, fictional data, and local-only
boundary intact. Do not add credentials, production data, arbitrary packages,
remote writes, or destructive cleanup commands. Never hide a failing check or
describe a cache hit as behavioral proof.

If a change affects the agent workflow, include the revised prompt or rule and
one example of the evidence it should produce. A fresh reviewer should be
able to reject the change without relying on the author's chat history.

Issues and pull requests are welcome for reproducible improvements. Please do
not post secrets, private source, personal logs, or vulnerability details in a
public issue; follow [`SECURITY.md`](SECURITY.md) for sensitive reports.
