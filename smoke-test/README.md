# JSOC Grid - Smoke Tests

This directory contains the integration and smoke tests for the `@jsoc` grid packages. It validates that the generated tarballs are healthy, correctly entry-pointed, and transitive dependency-safe.

## Why is this package isolated?

This package is deliberately not included in the main workspace (`pnpm-workspace.yaml`) because:

- To test packages without publishing, `file:../packages/*.tgz` paths are used. However, local tarballs don't automatically resolve their internal dependencies to other local files. For example, `@jsoc/grid-core` has dependency on `@jsoc/utils`, but PNPM will try to resolve it to the published version of `@jsoc/utils` on the registry, not the local `jsoc-utils.tgz`.

- To fix this, we tried using `pnpm overrides` in `pnpm-workspace.yaml` as below:
  ```json
  overrides:
    "@jsoc/grid-core": "file:./packages/jsoc-grid-core.tgz",
    "@jsoc/utils": "file:./packages/jsoc-utils.tgz"
  ```
- But this forces every package in the monorepo (including the source code in `packages/**`) to use the built tarballs instead of workspace packages defined in `pnpm-workspace.yaml`. Since pnpm doesn't support scoped overrides that apply to only one specific folder in a workspace, the `test` directory was isolated.

- Isolation ensures these tests run in a "Pure Consumer" environment. By running install with `--ignore-workspace`, pnpm treats this directory as a standalone project, proving the tarballs work exactly as they would for an external customer, without workspace symlink behavior.

---

## How to run the tests

The `test` script in [package.json](package.json) is configured to automatically build the packages, pack them into tarballs, install them in an isolated environment, and run the Vitest suite.

```bash
# From this directory
pnpm test
```
