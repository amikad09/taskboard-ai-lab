# Project memory for humans and agents

Read these four files first:

1. docs/README.md — how this system works.
2. docs/project-map.md — where the feature lives.
3. docs/plans/active.md — the current bounded task.
4. docs/checks/latest.md — what was actually checked.

The agent entry points are [`AGENTS.md`](../AGENTS.md) for Codex and
[`CLAUDE.md`](../CLAUDE.md) for Claude Code. They point back to the canonical
`.aiassistant/` rules instead of maintaining separate copies.

Add a document when it saves a repeated inspection, preserves a decision or lets someone check a claim. Start small; folders are not progress.

Read [the code-quality contract](code-quality.md) when a task changes a
boundary, request lifecycle, public type, or proof command.

For the full loading model, see [agent instruction layers](agent-instruction-layers.md).

The loop is map → plan → implement → verify → fresh review → repair → handoff. Instructions guide an agent. Tool permissions and your approval control its actions.

[Workstation](workstation.md) · [Check map](quality-checks.md) · [Recovery](troubleshooting.md) · [Sources](sources.md)

Workflow records and deeper routes:

- [Agent role packets](../.aiassistant/templates/agent-roles.md)
- [Knip graph diagnostic](knip.md)
- [Proof-first comparison](workflow-comparison.md)
- [Self-evolution loop](self-evolution-loop.md)
- [Public fork route](public-fork.md)
