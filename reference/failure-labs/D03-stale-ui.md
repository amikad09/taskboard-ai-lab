# D03 — stale UI observation

In a disposable copy, replace the toggle success update with a state update
that keeps the previous task array. The service and core can remain green while
the browser shows old state. The lesson is that package checks do not replace a
composed browser observation.

```diff
-      setState({ status: "ready", tasks: response.tasks });
+      setState((current) =>
+        current.status === "ready" ? current : { status: "ready", tasks: [] },
+      );
```
