import * as reactGrid from "@jsoc/react-grid";
import * as agPlugin from "@jsoc/react-grid/ag";
import * as muiPlugin from "@jsoc/react-grid/mui";
import * as primePlugin from "@jsoc/react-grid/prime";
import * as tanstackPlugin from "@jsoc/react-grid/tanstack";
import { expect, test } from "vitest";

test("@jsoc/react-grid loads correctly", () => {
  checkPlugin(reactGrid);
});

test("@jsoc/react-grid/ag plugin loads correctly", () => {
  checkPlugin(agPlugin);
});

test("@jsoc/react-grid/mui plugin loads correctly", () => {
  checkPlugin(muiPlugin);
});

test("@jsoc/react-grid/prime plugin loads correctly", () => {
  checkPlugin(primePlugin);
});

test("@jsoc/react-grid/tanstack plugin loads correctly", () => {
  checkPlugin(tanstackPlugin);
});

function checkPlugin(plugin: Record<string, unknown>) {
  expect(plugin).toBeDefined();
  expect(Object.keys(plugin).length).toBeGreaterThan(0);
}
