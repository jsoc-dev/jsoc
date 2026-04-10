import * as utils from "@jsoc/utils";
import { expect, test } from "vitest";

test("@jsoc/utils loads correctly", () => {
  expect(utils).toBeDefined();
  expect(Object.keys(utils).length).toBeGreaterThan(0);
});
