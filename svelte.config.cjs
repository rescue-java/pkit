const sveltePreprocess = require("svelte-preprocess");
const node = require("@sveltejs/adapter-node");
const pkg = require("./package.json");
const adapterNetlify = require("@sveltejs/adapter-netlify");
const adapterVercel = require("@sveltejs/adapter-vercel");

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    sveltePreprocess({
      defaults: {
        style: "postcss",
      },
      postcss: true,
    }),
  ],
  kit: {
    // By default, `npm run build` will create a standard Node app.
    // You can create optimized builds for different platforms by
    // specifying a different adapter
    adapter: adapterVercel(),

    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",

    vite: {
      ssr: {
        noExternal: Object.keys(pkg.dependencies || {}),
      },
    },
  },
};
