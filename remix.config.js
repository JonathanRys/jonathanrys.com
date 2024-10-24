/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  appDirectory: "app",
  cacheDirectory: "./node_modules/.cache/remix",
  assetsBuildDirectory: "public/build",
  publicPath: "/_static/build/",
  serverBuildTarget: "arc",
  devServerPort: 8002,
  server: "./server.ts",
  ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  routes(defineRoutes) {
    return defineRoutes((route) => {
      if (process.env.NODE_ENV === "production") return;

      console.log("⚠️  Test routes enabled.");
      route(
        "__tests/create-user",
        "../cypress/support/test-routes/create-user.ts"
      );
    });
  },
};
