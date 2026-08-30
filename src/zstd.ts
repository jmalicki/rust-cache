import * as core from "@actions/core";

export const ENV_ZSTD_LEVEL = "ACTIONS_CACHE_ZSTD_LEVEL";
export const ENV_ZSTD_LONG = "ACTIONS_CACHE_ZSTD_LONG";

/** Apply zstd settings from action inputs to the process environment for `@actions/cache`. */
export function applyZstdConfig(): { level: number; long: number } {
  const level = parseZstdLevel(core.getInput("zstd-level") || "10");
  const long = parseZstdLong(core.getInput("zstd-long") || "31");

  process.env[ENV_ZSTD_LEVEL] = String(level);
  process.env[ENV_ZSTD_LONG] = String(long);

  core.info(`Zstd cache compression: level ${level}, --long=${long}`);
  return { level, long };
}

export function parseZstdLevel(raw: string): number {
  const level = parseInt(raw, 10);
  if (!Number.isInteger(level) || level < 1 || level > 22) {
    throw new Error(`\`zstd-level\` must be an integer from 1 to 22, got "${raw}"`);
  }
  return level;
}

export function parseZstdLong(raw: string): number {
  const long = parseInt(raw, 10);
  if (!Number.isInteger(long) || long < 10 || long > 31) {
    throw new Error(`\`zstd-long\` must be an integer from 10 to 31, got "${raw}"`);
  }
  return long;
}
