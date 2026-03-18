import nextra from "nextra";

const withNextra = nextra({
  // ... Add Nextra-specific options here
});

export default withNextra({
  // ... Add regular Next.js options here

  reactCompiler: true,

  // reactStrictMode: false,

  turbopack: {
    rules: {
      // raw-loader for all files
      "*": {
        condition: {
          // https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack#advanced-webpack-loader-conditions
          query: /[?&]raw(?=&|$)/,
        },
        loaders: ["raw-loader"],
        as: "*.js",
      },
    },

    resolveAlias: {
      // Path to your `mdx-components` file with extension
      "next-mdx-import-source-file": "./mdx-components.tsx",
    },
  },
});
