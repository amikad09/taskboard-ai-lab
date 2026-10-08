# Taskboard progress card

Use this card while you work. Tick a box when the evidence exists, not when an
agent says the step is finished. You can complete the route privately; this is
not a leaderboard.

## The eight checkpoints

- [ ] **1 — See the target.** I can describe the feature and predict `3 → 2 → 3`.
  - Keep: the three-line mission card.
- [ ] **2 — Prove the start.** The baseline checks pass, or the first useful
      error is saved.
  - Keep: the candidate, commands, results, and limits.
- [ ] **3 — Choose context.** I can explain one file I included and one I left
      out.
  - Keep: `docs/context-decision.md`.
- [ ] **4 — Bound the task.** Every acceptance case has a check or visible
      observation.
  - Keep: the task brief in `docs/plans/active.md`.
- [ ] **5 — Make one change.** The agent planned first and edited only the
      approved files.
  - Keep: the plan, diff, and changed-file list.
- [ ] **6 — Prove the result.** The affected checks, full checks, and browser
      behavior agree.
  - Keep: `docs/checks/latest.md` and the proof receipt.
- [ ] **7 — Challenge it.** A believable fault or fresh review found nothing
      else, or produced a repair you can explain.
  - Keep: the mutation/review note and repair result.
- [ ] **8 — Carry the method.** I wrote a handoff and started the filter task
      with a new brief instead of copying the guided answer.
  - Keep: `docs/handoffs/latest.md` and the transfer brief.

## Finish card

```text
Feature I accepted:
Evidence I can show:
Finding I repaired or explained:
What I still do not know:
Next task:
```

If you get stuck, keep the first useful error, shrink the next action, and ask
for help with redacted context. Never paste credentials, private source, or a
whole repository dump just to make progress.
