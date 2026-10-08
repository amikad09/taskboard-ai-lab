# Two ways to use an AI coding agent

The course compares a proof-first workflow with an unbounded prompt-and-patch
workflow. The point is to make the tradeoff visible, not to insult quick
prototyping.

| Question       | Unbounded prompt-and-patch | Proof-first agent loop               |
| -------------- | -------------------------- | ------------------------------------ |
| Starting point | “Make this better”         | One outcome and acceptance cases     |
| Context        | Dump the repository        | Include and exclude with reasons     |
| Changes        | Agent chooses scope        | Approved files and stop points       |
| Memory         | Long chat replay           | Small project docs and handoff       |
| Verification   | “Looks good”               | Named leaf commands and observations |
| Review         | Same agent approves itself | Fresh packet can reject              |
| Repair         | Broad rewrite              | Demonstrated cause only              |
| Cost           | Prompt length alone        | Total work per accepted result       |
| Learning       | Repeat the same failure    | One prevention rule plus transfer    |

Neither route guarantees correctness. The proof-first route makes uncertainty,
review, and recovery visible so a learner can decide when speed is worth the
risk. Compare equivalent tasks with the same checks; do not call a shorter or
faster run cheaper when quality or proof changed.
