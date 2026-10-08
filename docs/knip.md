# Knip graph diagnostic

Knip is a read-only dependency and reachability diagnostic. In this starter it
runs as `pnpm deadcode`, separately from `pnpm verify`.

It can report unused files, exports, dependencies, unlisted dependencies, and
binaries. A finding is a question to diagnose, not permission to delete code.
The graph depends on entry files and workspace configuration; a missing entry
can make used code look unused.

## Free route

1. Run the command on a clean baseline.
2. Record the candidate, version, configuration, output, and exit status.
3. Classify each finding as real unused code, missing entry, dynamic loading,
   generated/configuration surface, dependency placement, or unknown.
4. Repair only a demonstrated cause or record a narrow, reviewed exception.
5. Rerun the diagnostic and the affected finite checks.

The command is intentionally separate from the first blocking verification
route. A clean output is useful evidence, but a zero count is not a universal
quality guarantee. Production-mode and strict dependency analysis are deeper
labs and may need different `!` production patterns.

## Current configuration

`knip.json` names each actual workspace and limits project patterns to authored
source. Generated Encore output and build directories are outside the project
patterns. The global `encore` binary is documented as an external CLI, not an
application dependency.

**Checked tool:** `knip` `6.40.0` during the 2026-10-08 toolchain refresh. Re-resolve
before recording a new course release.
