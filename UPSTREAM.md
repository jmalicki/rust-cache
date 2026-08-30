# Upstream tracking

| Field | Value |
|-------|-------|
| Upstream repo | [Swatinem/rust-cache](https://github.com/Swatinem/rust-cache) |
| Upstream version | `2.9.2` |
| Upstream tag | [v2.9.2](https://github.com/Swatinem/rust-cache/releases/tag/v2.9.2) |

## Fork-only changes

1. **`zstd-level` / `zstd-long` action inputs** — set `ACTIONS_CACHE_ZSTD_LEVEL` / `ACTIONS_CACHE_ZSTD_LONG` for [jmalicki/actions-cache](https://github.com/jmalicki/actions-cache)
2. **`src/zstd.ts`** — input validation and env export
3. **Default `prefix-key`** — `v1-zstd10-long31` (bump when changing compression settings)
4. **`@actions/cache` dependency** — replaced with [jmalicki/actions-cache](https://github.com/jmalicki/actions-cache) via git override

## Sync procedure

See `scripts/sync-from-upstream.sh` and `renovate.json`. After merging an upstream-sync PR, run `npm run build`, commit `dist/`, tag `vX.Y.Z`, and create a GitHub Release.
