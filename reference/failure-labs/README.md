# Reversible faults

Use a disposable copy after a green baseline. Predict which check should fail, apply one fault, read the final output, restore the original bytes and rerun the same check.

| ID  | Fault                        | Decisive observation                                     |
| --- | ---------------------------- | -------------------------------------------------------- |
| D01 | toggle always sets complete  | undo/two-toggle test fails                               |
| D02 | unknown ID toggles first row | unknown-ID test fails                                    |
| D03 | UI ignores returned tasks    | browser toggle/undo assertion fails                      |
| D04 | Open-task count stays stale  | [count after toggle/undo](D04-stale-open-count.md) fails |

The patch files are inert teaching fixtures. They are not a mutation engine or a mutation score. Verify patch applicability before the lesson; never apply them to an unpreserved learner worktree.

D01–D03 target the completed toggle demonstration. D04 targets the guided
open-count answer in a disposable copy; that answer is intentionally absent
from the learner's starting component.

A focused Stryker extension belongs after this lab is understood. Only the human launches a local mutation engine. Do not increase deadlines, exclude faults or change thresholds to hide an unexplained result.
