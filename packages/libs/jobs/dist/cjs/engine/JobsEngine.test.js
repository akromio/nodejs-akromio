"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  sim
} = _core.dogma.use(require("@akromio/doubles"));
const {
  GlobalDataset
} = _core.dogma.use(require("@akromio/dataset"));
const {
  Runner,
  PluginParser
} = _core.dogma.use(require("@akromio/core"));
const JobsEngine = _core.dogma.use(require("./JobsEngine"));
suite(__filename, () => {
  {
    suite("constructor", () => {
      {
        test("when instantiated, built-in plugins must be loaded", () => {
          {
            const out = JobsEngine({
              'name': "jobs",
              'dataset': GlobalDataset({
                'name': "global"
              }),
              'onError': "carryOn",
              'pluginParser': PluginParser(),
              'stream': sim.stream.readable(),
              'runners': [Runner({
                'log': sim.stream.duplex()
              })]
            });
            expected(out).toBe(JobsEngine).member("ops.ops").toHaveLen(0);
          }
        });
      }
    });
  }
});