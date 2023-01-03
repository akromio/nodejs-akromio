"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  sim,
  method
} = _core.dogma.use(require("@akromio/doubles"));
const {
  Dataset,
  GlobalDataset,
  LocalDataset
} = _core.dogma.use(require("@akromio/dataset"));
const {
  Ops,
  PluginParser,
  PluginLoader,
  Plugins,
  Plugin
} = _core.dogma.use(require("@akromio/core"));
const JobCatalog = _core.dogma.use(require("../JobCatalog"));
const TriggeredJobCatalogParser = _core.dogma.use(require("./TriggeredJobCatalogParser"));
suite(__filename, () => {
  {
    const globalDataset = GlobalDataset({
      'name': "global"
    });
    const parentDataset = globalDataset;
    const ops = Ops();
    const catalogOpt = {
      ["name"]: "test",
      ["loc"]: "file:///my/file.yaml",
      ["cty"]: "text/yaml"
    };
    const catalogDecl = {
      ["spec"]: "v1.0",
      ["name"]: "test-catalog",
      ["loc"]: "test:///jobs/catalogs/test-catalog",
      ["cty"]: "text/yaml",
      ["desc"]: "A test catalog.",
      ["jobs"]: []
    };
    const pluginParser = PluginParser();
    const pluginLoader = sim(PluginLoader, {});
    const parser = TriggeredJobCatalogParser({
      'pluginParser': pluginParser,
      'pluginLoader': pluginLoader
    });
    suite("parseTriggers()", () => {
      {
        test("when triggers, triggers must be parsed", async () => {
          {
            const trg1 = {
              ["trigger"]: "trg1"
            };
            const trg2 = {
              ["trigger"]: "trg2"
            };
            const triggers = [trg1, trg2];
            const out = (0, await parser.parse(_core.dogma.clone(catalogDecl, {
              "on": triggers
            }, {}, [], []), {
              'parentDataset': parentDataset,
              'ops': ops
            })).triggers;
            expected(out).equalTo({
              'trg1': trg1,
              'trg2': trg2
            });
          }
        });
      }
    });
  }
});