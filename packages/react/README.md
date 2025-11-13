# Package: @jsoc/react

## Troubleshooting

---

### 🧩 Error: Invalid hook call
> “Invalid hook call. Hooks can only be called inside of the body of a function component.”

This error usually appears **only during local development**, when the `@jsoc/react` package is linked locally using something like:

    npm link @jsoc/react
    # or
    "@jsoc/react": "file:../../packages/@jsoc/react"

---

### ⚠️ Why this happens

This is not a React bug — it’s a **module identity issue** caused by how bundlers like **Vite** handle **linked local packages**.  
In short, you end up with **two separate React instances** loaded at runtime.

---

### 🧠 How two Reacts happen

When your app imports your locally linked library:

    import React from 'react';
    import { JsocGrid } from '@jsoc/react';

You expect both to share the same React instance.  
But two situations occur:

| Context | What happens | Why |
|----------|---------------|------|
| Published npm package | Only one React module | npm installs peer deps once, shared by all packages |
| Local linked package (`file:` / `npm link`) | Two React modules bundled | Vite treats linked package as local source and re-bundles React |

---

### ⚙️ The deeper explanation

**1️⃣ Node resolution is fine at install time**

When `react` is in `peerDependencies` and not physically inside `@jsoc/react/node_modules`, Node resolves `import 'react'` by walking up to the app’s React installation:

    your-vite-app-name/node_modules/react

✅ So both the app and the library point to the same React **on disk**.

---

**2️⃣ But Vite doesn’t just execute imports — it bundles them**

When you link using `"file:../../packages/@jsoc/react"`, Vite (powered by Rollup + esbuild) treats your library as **source code**, not a prebuilt dependency.  
It crawls through all imports, optimizes them, and creates a **separate module scope** for the linked library.

So now you effectively have:

    App.jsx          → imports React (instance A)
    @jsoc/react code  → imports React (instance B)

Even though both are version `19.2.0`, they are different module instances in memory:

    import * as ReactA from 'react'; // app bundle
    import * as ReactB from 'react'; // lib bundle
    console.log(ReactA === ReactB); // false ❌

Hooks depend on a shared React context, so these separate instances cause the **Invalid hook call** error.

---

### 🔍 “Two Reacts” Visual

Without fix (two copies bundled):

    bundle-app.js          → React (copy A)
    bundle-@jsoc/react.js   → React (copy B)

With fix (deduped):

    bundle.js              → React (shared single instance)

---

### ✅ Fixes

**1️⃣ Use Peer Dependencies** (this is already done in @jsoc/react)

In `packages/@jsoc/react/package.json`:

```json
"peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
},
"devDependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
}
```

This ensures npm does not install React inside `@jsoc/react/node_modules`,  
so the library always uses the consumer’s React instance.

---

**2️⃣ Add Dedupe Config in Vite** (add this in vite config of your app if you are facing this issue)

In your app’s `vite.config.ts`:

```ts
export default {
    resolve: {
    dedupe: ['react', 'react-dom']
    }
}
```

This tells Vite:

> “If any dependency (like `@jsoc/react`) imports React, always use the same module instance as the app.”

It prevents multiple React contexts in memory during local dev.

---

### 🧱 Why Dedupe is Still Needed

Even if there’s only one React on disk,  
Vite’s optimizer can treat symlinked imports as separate modules due to differing internal paths like:

    /examples/your-vite-app-name/node_modules/react
    /packages/@jsoc/react/node_modules/react  ← virtual path via link

`resolve.dedupe` ensures both resolve to the same canonical module ID.

---

### 🧠 Key Concepts

| Term | Meaning |
|------|----------|
| **Bundle** | A compiled JavaScript chunk produced by Vite/Rollup. Each local package or entry point can create its own bundle. |
| **Context** | A module instance in memory. Each bundle keeps its own React instance (like separate namespaces). When React is bundled twice, you get two contexts → hook mismatch. |

---

### ✅ Why It Won’t Happen After Publishing

When `@jsoc/react` is published and installed normally via npm:

    npm install @jsoc/react

- Peer dependencies ensure only one React exists.
- The library is treated as a normal dependency, not as source code.
- React is included once in the final build.

✅ No more hook errors.

---

### ✅ TL;DR

> **In local development, Vite re-bundles linked packages**, creating separate React module contexts.  
> Fix by:
> 1. Declaring `react` and `react-dom` as `peerDependencies`.
> 2. Adding `resolve.dedupe: ['react', 'react-dom']` in your app’s Vite config  .
> Once published, this issue disappears automatically.
