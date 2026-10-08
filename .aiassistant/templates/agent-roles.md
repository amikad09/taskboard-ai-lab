# Role prompts

These six packets are copyable starting points. Fill in the bracketed fields
from the current task brief; do not paste the whole repository or the old
implementation conversation.

| Role           | Packet                                      | It may do                     | It must not do                               |
| -------------- | ------------------------------------------- | ----------------------------- | -------------------------------------------- |
| Mapper         | [mapper.md](../prompts/mapper.md)           | Read-only discovery           | Edit, install, approve, or publish           |
| Planner        | [planner.md](../prompts/planner.md)         | Propose a bounded plan        | Edit or approve its own plan                 |
| Implementer    | [implementer.md](../prompts/implementer.md) | Edit approved files           | Add scope, dependencies, or external actions |
| Verifier       | [verifier.md](../prompts/verifier.md)       | Run allowlisted finite checks | Repair source or launch mutation             |
| Fresh reviewer | [reviewer.md](../prompts/reviewer.md)       | Inspect a frozen candidate    | Edit or rely on the implementation chat      |
| Handoff writer | [handoff.md](../prompts/handoff.md)         | Write the next-session record | Invent evidence or learner outcomes          |

Every packet names the same contract: role, outcome, source, included and
excluded context, allowed changes, acceptance cases, checks, stop points,
rollback, report shape, and unknowns. That repetition is intentional; a role
cannot quietly gain authority because a prompt was shortened.

Run the roles in this order:

    mapper → planner → human approval → implementer → verifier
    → fresh reviewer → cause-specific repair → verifier → handoff

The reviewer may reject the candidate. A rejection is evidence for a repair,
not permission for the reviewer to edit its own finding. Mutation engines stay
human-launched; the verifier may inspect fixtures and reports but never starts
one.
