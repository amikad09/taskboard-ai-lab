# D04 — Stale open-count mutant

Apply this exercise only in a disposable completed-task copy after preserving
the clean candidate.

**Fault:** calculate the open count from the first load and never replace it
with the latest response after a toggle.

**Prediction:** the task rows can show the new state while the summary still
shows the old count. A composed browser assertion should catch the mismatch.

**Decisive observation:** toggle an open row, verify the row becomes complete,
and verify the open count decreases. Restore the clean candidate before any
other lesson.

This is a manual fault fixture, not a mutation-engine run or a quality score.
