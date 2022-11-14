"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const path = _core.dogma.use(require("path"));
const fs = _core.dogma.use(require("fs/promises"));
const {
  monitor
} = _core.dogma.use(require("@akromio/doubles"));
const {
  PluginLoader
} = _core.dogma.use(require("../../.."));
suite(__filename, () => {
  {
    const piPath = path.join(__dirname, "../../data/plugins");
    const presetPath = path.join(__dirname, "../../data/presets");
    suite("loadDefault()", () => {
      {
        test("when plugin exists, its declaration must be returned", async () => {
          {
            const src = path.join(piPath, "node_modules", "pi-npm-example");
            const dst = path.join(_core.ps.workDir, "node_modules", "pi-npm-example");
            0, await fs.cp(src, dst, {
              'recursive': true
            });
            const loader = PluginLoader();
            const out = loader.loadPlugin("pi-npm-example");
            expected(out).toHave({
              'name': "npm-example"
            });
            0, await fs.rm(dst, {
              'recursive': true
            });
          }
        });
        test("when plugin not exists, nil must be returned", () => {
          {
            const loader = PluginLoader();
            const out = _core.dogma.peval(() => {
              return loader.loadPlugin("pi-unknown");
            });
            expected(out).it(0).equalTo(false).it(1).like("Cannot find module 'pi-unknown'");
          }
        });
      }
    });
    suite("loadFromPaths()", () => {
      {
        test("when plugin exists, its declaration must be returned", () => {
          {
            const loader = PluginLoader({
              'paths': [__dirname, piPath]
            });
            const out = loader.loadPlugin("pi-example");
            expected(out).toHave({
              'name': "example",
              'desc': "Example plugin for load testing."
            });
          }
        });
        test("when plugin not exists, error must be raised", () => {
          {
            const loader = PluginLoader({
              'paths': [__dirname]
            });
            const out = _core.dogma.peval(() => {
              return loader.loadPlugin("pi-example");
            });
            expected(out).it(0).equalTo(false).it(1).like("Cannot find module 'pi-example'");
          }
        });
      }
    });
    suite("loadPreset()", () => {
      {
        test("when preset exists, declaration must be read and returned", () => {
          {
            const loader = PluginLoader({
              'paths': [__dirname, presetPath]
            });
            const out = loader.loadPreset("preset-example");
            expected(out).toHave({
              'name': "preset-example"
            });
          }
        });
        test("when preset not exists, error must be raised", () => {
          {
            const loader = PluginLoader({
              'paths': [__dirname, presetPath]
            });
            const out = _core.dogma.peval(() => {
              return loader.loadPreset("preset-unknown");
            });
            expected(out).it(0).equalTo(false).it(1).toBe(Error).like("Cannot find module 'preset-unknown'");
          }
        });
      }
    });
  }
});