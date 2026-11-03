import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { existsSync, readFileSync } from "node:fs";

// Public product identity, committed with the generated app. A build on Blocks
// must use the same tenant as its Factory build, never the host's cached tenant.
const targetFile = new URL("./blocks-project.json", import.meta.url);
const target = existsSync(targetFile) ? JSON.parse(readFileSync(targetFile, "utf8")) : null;
if (target && !/^D[0-9a-f]{32}$/i.test(target.projectId)) throw new Error("Invalid product Blocks project ID");
const projectKey = process.env.VITE_BLOCKS_PROJECT_KEY || target?.projectId;
if (target && !Object.values(target.environments || { dev: target.projectId }).includes(projectKey)) throw new Error("Product Blocks project ID mismatch");

// The app's frame, added to index.html by the build:
// - browser storage per app and version: every app and version runs on the same address, so the keys of localStorage
//   and sessionStorage are scoped to this app (MADP_APP_SCOPE: its project and version) and its folder;
// - an icon when index.html names none, so the browser never asks for /favicon.ico.
const SCOPE = process.env.MADP_APP_SCOPE || "restroqr";
const STORAGE_SCOPE = "(function (scope) {\n  try {\n    var S = window.Storage && Storage.prototype;\n    if (!S || Object.prototype.hasOwnProperty.call(S, \"__appScope\")) return;\n    var pre = \"app:\" + scope + \":\" + location.pathname.replace(/[^/]*$/, \"\") + \":\";\n    var get = S.getItem, set = S.setItem, del = S.removeItem, key = S.key;\n    var len = Object.getOwnPropertyDescriptor(S, \"length\").get;\n    var own = function (s) {\n      var out = [], n = len.call(s);\n      for (var i = 0; i < n; i++) { var k = key.call(s, i); if (k !== null && k.indexOf(pre) === 0) out.push(k); }\n      return out;\n    };\n    S.getItem = function (k) { return get.call(this, pre + k); };\n    S.setItem = function (k, v) { return set.call(this, pre + k, v); };\n    S.removeItem = function (k) { return del.call(this, pre + k); };\n    S.key = function (i) { var k = own(this)[i]; return k === undefined ? null : k.slice(pre.length); };\n    S.clear = function () { var ks = own(this); for (var i = 0; i < ks.length; i++) del.call(this, ks[i]); };\n    Object.defineProperty(S, \"length\", { configurable: true, get: function () { return own(this).length; } });\n    Object.defineProperty(S, \"__appScope\", { value: pre });\n  } catch (e) { /* storage unavailable: the app handles it */ }\n})";
const ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%230f172a'/%3E%3Crect x='9' y='9' width='14' height='14' rx='3' fill='%23ffffff'/%3E%3C/svg%3E";

function appFrame() {
  return {
    name: "app-frame",
    transformIndexHtml(html) {
      const tags = [{ tag: "script", attrs: { "data-app-scope": true }, children: STORAGE_SCOPE + "(" + JSON.stringify(SCOPE) + ");", injectTo: "head-prepend" }];
      if (!/<link[^>]+rel=["'](?:shortcut )?icon["']/i.test(html)) tags.push({ tag: "link", attrs: { rel: "icon", href: ICON }, injectTo: "head" });
      return tags;
    },
  };
}

// base "./": the build runs under any folder of the preview server (/<project>/, /<project>/v/<version>/).
export default defineConfig({
  base: "./",
  ...(target ? { define: { "import.meta.env.VITE_BLOCKS_PROJECT_KEY": JSON.stringify(projectKey) } } : {}),
  plugins: [react(), appFrame()],
  build: { outDir: "dist", emptyOutDir: true, chunkSizeWarningLimit: 2000, reportCompressedSize: true },
});
