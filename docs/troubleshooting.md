# When something stops

**Encore missing:** check CLI installation and PATH; confirm encore version. Keep the backend stack.

**Missing shared output:** use pnpm build:packages before a direct Encore command, or use dev:backend, which orders dependency builds.

**Request failed:** inspect the browser network response and the local Encore URL. Reload from the service before claiming success.

**Port busy:** identify the owner of the local listener. Stop only your own process or choose the documented alternate port route.

**Wrong pnpm or changed lockfile:** preserve the diff; fix the version/registry cause before source edits.

**Red gate:** read the complete final output, name the exact cause, make the smallest repair and rerun that leaf. Never lower a threshold or hide an error.

**Cache surprise:** inspect the task inputs/outputs and graph. A green cached task is a result for its recorded inputs.
