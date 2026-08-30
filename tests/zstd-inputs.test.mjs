import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { parseZstdLevel, parseZstdLong } from "../.build/src/zstd.js";

describe("parseZstdLevel", () => {
  it("accepts 1–22", () => {
    assert.equal(parseZstdLevel("10"), 10);
    assert.equal(parseZstdLevel("1"), 1);
    assert.equal(parseZstdLevel("22"), 22);
  });

  it("rejects out of range", () => {
    assert.throws(() => parseZstdLevel("0"));
    assert.throws(() => parseZstdLevel("23"));
    assert.throws(() => parseZstdLevel("x"));
  });
});

describe("parseZstdLong", () => {
  it("accepts 10–31", () => {
    assert.equal(parseZstdLong("31"), 31);
    assert.equal(parseZstdLong("10"), 10);
  });

  it("rejects out of range", () => {
    assert.throws(() => parseZstdLong("9"));
    assert.throws(() => parseZstdLong("32"));
  });
});
