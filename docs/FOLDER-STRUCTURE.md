# JSOC Folder Structure

This document describes the recommended folder structure for the JSOC project.  
It is designed for long-term scalability, multi-framework support, and a clean separation of concerns.

---

## Monorepo Overview

jsoc/  
├─ pnpm-workspace.yaml  
├─ package.json  
├─ turbo.json (optional, later)  
└─ packages/  
&emsp;├─ @jsoc/core/  
&emsp;└─ @jsoc/react/

---

## packages/@jsoc/core

Framework-agnostic logic only.  
Contains parsers, resolvers, utilities, and shared types.

packages/  
└─ @jsoc/core/  
&emsp;├─ package.json  
&emsp;├─ tsconfig.json  
&emsp;└─ src/  
&emsp;&emsp;├─ index.ts  
&emsp;&emsp;│  
&emsp;&emsp;├─ parser/  
&emsp;&emsp;│&emsp;├─ parseSchema.ts  
&emsp;&emsp;│&emsp;├─ normalize.ts  
&emsp;&emsp;│&emsp;└─ index.ts  
&emsp;&emsp;│  
&emsp;&emsp;├─ resolver/  
&emsp;&emsp;│&emsp;├─ resolveNode.ts  
&emsp;&emsp;│&emsp;├─ resolveComponent.ts  
&emsp;&emsp;│&emsp;└─ index.ts  
&emsp;&emsp;│  
&emsp;&emsp;├─ utils/  
&emsp;&emsp;│&emsp;├─ isPlainObject.ts  
&emsp;&emsp;│&emsp;├─ typeGuards.ts  
&emsp;&emsp;│&emsp;├─ deepMerge.ts  
&emsp;&emsp;│&emsp;└─ index.ts  
&emsp;&emsp;│  
&emsp;&emsp;└─ types/  
&emsp;&emsp;&emsp;├─ schema.ts  
&emsp;&emsp;&emsp;├─ common.ts  
&emsp;&emsp;&emsp;└─ index.ts

---

## packages/@jsoc/react

React-specific implementation.  
Depends on `@jsoc/core`.

packages/  
└─ @jsoc/react/  
&emsp;├─ package.json  
&emsp;├─ tsconfig.json  
&emsp;└─ src/  
&emsp;&emsp;├─ index.ts  
&emsp;&emsp;│  
&emsp;&emsp;├─ grid/  
&emsp;&emsp;│&emsp;├─ JsocGrid.tsx  
&emsp;&emsp;│&emsp;└─ adapters/  
&emsp;&emsp;│&emsp;&emsp;├─ mui/  
&emsp;&emsp;│&emsp;&emsp;│&emsp;├─ MUIGridAdapter.tsx  
&emsp;&emsp;│&emsp;&emsp;│&emsp;└─ helpers.ts  
&emsp;&emsp;│&emsp;&emsp;├─ ag-grid/  
&emsp;&emsp;│&emsp;&emsp;│&emsp;├─ AGGridAdapter.tsx  
&emsp;&emsp;│&emsp;&emsp;│&emsp;└─ helpers.ts  
&emsp;&emsp;│&emsp;&emsp;└─ tanstack/  
&emsp;&emsp;│&emsp;&emsp;&emsp;└─ TanStackGridAdapter.tsx  
&emsp;&emsp;│  
&emsp;&emsp;├─ chart/  
&emsp;&emsp;│&emsp;├─ JsocChart.tsx  
&emsp;&emsp;│&emsp;└─ adapters/  
&emsp;&emsp;│&emsp;&emsp;├─ recharts/  
&emsp;&emsp;│&emsp;&emsp;│&emsp;└─ RechartsAdapter.tsx  
&emsp;&emsp;│&emsp;&emsp;└─ nivo/  
&emsp;&emsp;│&emsp;&emsp;&emsp;└─ NivoChartAdapter.tsx  
&emsp;&emsp;│  
&emsp;&emsp;├─ form/  
&emsp;&emsp;│&emsp;├─ JsocForm.tsx  
&emsp;&emsp;│&emsp;└─ adapters/  
&emsp;&emsp;│&emsp;&emsp;├─ mui/  
&emsp;&emsp;│&emsp;&emsp;│&emsp;└─ MUIFormAdapter.tsx  
&emsp;&emsp;│&emsp;&emsp;└─ headless/  
&emsp;&emsp;│&emsp;&emsp;&emsp;└─ HeadlessFormAdapter.tsx  
&emsp;&emsp;│  
&emsp;&emsp;└─ hooks/  
&emsp;&emsp;&emsp;├─ useJsoc.ts  
&emsp;&emsp;&emsp;└─ useAdapter.ts

---

## General Rules

- Public components must be prefixed with `Jsoc*`  
- Internal adapters should not use the prefix  
- `@jsoc/core` must be framework-agnostic  
- `@jsoc/react` imports and maps logic from `@jsoc/core`  
- Components are grouped by feature (grid/chart/form) and then adapters

---

## Future Expansion

Additional framework packages may be added later:

packages/  
&emsp;jsoc-vue/  
&emsp;jsoc-angular/  
&emsp;jsoc-svelte/

All will share the same core logic:

packages/@jsoc/core

---
