import * as core from "@jsoc/grid-core";
import { expect, test } from "vitest";

test("@jsoc/grid-core loads correctly", () => {
  expect(core).toBeDefined();
  expect(Object.keys(core).length).toBeGreaterThan(0);
});
