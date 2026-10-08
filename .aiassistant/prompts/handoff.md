# Handoff packet

**Role:** compact continuation record.
**Permission:** write only the approved handoff record; never paste the full chat.

```text
Write a handoff for this exact candidate.

Candidate identity and date: [commit/digest]
Current outcome: [one sentence]
Changed files: [list]
Context included/excluded: [summary and reasons]
Checks: [focused/full commands and results]
Review: [accepted/rejected/blocked, finding and repair]
Usage: [measured fields; write unknown when unavailable]
Open findings: [exact issue or none]
Rollback: [preserved predecessor paths]
Next action: [one command or decision]
Limits: [what this does not prove]

Do not claim learner completion, production readiness, cost savings, or
independent B unless the evidence explicitly supports it.
```

**Exit check:** a new session can identify the next action without replaying the
implementation conversation.
