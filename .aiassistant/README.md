# Agent instructions

Read the three short rules, the project map and the task brief. Use role prompts from templates/agent-roles.md.

This directory is ordinary project text. A client does not automatically load
it just because it has this name. The root adapters point to it:

- `AGENTS.md` is the Codex instruction adapter.
- `CLAUDE.md` is the Claude Code project-memory adapter.

Keep reusable rules here so the adapters do not drift. Test loading in the
actual client. Instructions guide behavior; permissions and approvals enforce
authority.
