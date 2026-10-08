# Agent instruction layers

The starter uses one canonical rules directory and small client adapters.

| Layer           | Location                                | Purpose                                                         | Loading                                    |
| --------------- | --------------------------------------- | --------------------------------------------------------------- | ------------------------------------------ |
| Canonical rules | `.aiassistant/rules/`                   | Short purpose, workflow, and safety rules                       | Read by the adapters and task brief        |
| Codex adapter   | `AGENTS.md`                             | Repository-wide instructions Codex can discover automatically   | Loaded from the repository path hierarchy  |
| Claude adapter  | `CLAUDE.md`                             | Project memory and imports for Claude Code                      | Loaded at Claude Code session start        |
| Role prompts    | `.aiassistant/templates/agent-roles.md` | Mapper, planner, implementer, verifier, reviewer, handoff roles | Read when that role is used                |
| Task brief      | `.aiassistant/templates/task-brief.md`  | Exact outcome, files, acceptance, checks, and rollback          | Created or selected per task               |
| Tool adapter    | `.aiassistant/adapters/encore.md`       | Encore commands and boundary-specific context                   | Read when backend/tool routing is relevant |

`AGENTS.md` and `CLAUDE.md` are entry points, not second rule systems. Keep
their always-loaded text short. Put detailed reference material in `docs/` and
load it only when the current decision needs it.

An instruction file is not a permission boundary. The human or configured tool
permissions still control external writes, secrets, destructive commands, and
publication. Tests and Encore validation remain the proof authority.
