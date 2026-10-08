# Controlled self-evolution loop

The project improves from demonstrated evidence. The agent does not silently
rewrite its own rules or widen its permissions.

```text
observe a failure or repeated friction
→ preserve the exact candidate and first useful evidence
→ diagnose the smallest cause
→ propose one rule, template, or validator change
→ approve that change as a human-owned decision
→ rerun the old case
→ run one transfer case
→ promote or reject the change
→ record the retirement trigger
```

A rule change is accepted only when:

- the old failure is reproduced or its cause is otherwise demonstrated;
- the new rule is narrow enough to check;
- the original acceptance cases still pass;
- one different task does not expose a new regression;
- the change does not add permissions or hide evidence.

A green score, shorter prompt, faster response, or confident agent message is
not self-improvement by itself. If telemetry is missing, record `unknown`.
