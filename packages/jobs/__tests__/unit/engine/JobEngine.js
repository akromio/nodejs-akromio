"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  simulator
} = _core.dogma.use(require("@akromio/doubles"));
const {
  GlobalDataset
} = _core.dogma.use(require("@akromio/dataset"));
const {
  Runner,
  PluginParser
} = _core.dogma.use(require("@akromio/core"));
const {
  JobEngine: Engine
} = _core.dogma.use(require("../../.."));
suite(__filename, () => {
  {
    suite("constructor", () => {
      {
        test("when instantiated, built-in plugins must be loaded", () => {
          {
            const out = Engine({
              'name': "jobs",
              'dataset': GlobalDataset({
                'name': "global"
              }),
              'onError': "carryOn",
              'pluginParser': PluginParser(),
              'runner': Runner({
                'log': simulator.stream.duplex()
              })
            });
            expected(out).toBe(Engine).member("ops.ops").toHaveLen(0);
          }
        });
      }
    });
  }
});