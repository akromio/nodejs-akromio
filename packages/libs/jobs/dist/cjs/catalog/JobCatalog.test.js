"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  monitor
} = _core.dogma.use(require("@akromio/doubles"));
const {
  GlobalDataset
} = _core.dogma.use(require("@akromio/dataset"));
const {
  Plugins
} = _core.dogma.use(require("@akromio/core"));
const JobCatalog = _core.dogma.use(require("./JobCatalog"));
suite(__filename, () => {
  {
    const globalDataset = GlobalDataset({
      'name': "global"
    });
    suite("finalize()", () => {
      {
        test("when called, plugins.finalize() must be called", async () => {
          {
            const plugins = monitor(Plugins(), {
              'method': "finalize"
            });
            const catalog = JobCatalog({
              'spec': "v1.0",
              'loc': "file:///my/catalog.yaml",
              'cty': "text/yaml",
              'desc': "A test catalog.",
              'dataset': globalDataset,
              'plugins': plugins
            });
            const out = (0, await catalog.finalize());
            const pis = monitor.log(plugins, {
              'clear': true
            });
            expected(pis.calls).equalTo(1);
          }
        });
      }
    });
  }
});