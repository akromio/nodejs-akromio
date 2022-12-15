"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  simulator,
  method
} = _core.dogma.use(require("@akromio/doubles"));
const {
  JobCatalog,
  JobCatalogParser
} = _core.dogma.use(require("../../.."));
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
  Plugin,
  CatalogParser
} = _core.dogma.use(require("@akromio/core"));
suite(__filename, () => {
  {
    const ops = Ops();
    const catalogOpt = {
      ["name"]: "test",
      ["loc"]: "file:///my/file.yaml",
      ["cty"]: "text/yaml"
    };
    const pluginParser = PluginParser();
    const pluginLoader = simulator(PluginLoader, {});
    const parser = JobCatalogParser({
      'pluginParser': pluginParser,
      'pluginLoader': pluginLoader
    });
    suite("parse()", () => {
      {
        const catalogDecl = {
          ["name"]: "test",
          ["loc"]: "test:///test.yaml",
          ["cty"]: "text/yaml",
          ["spec"]: "v1.0",
          ["desc"]: "A catalog to perform the unit tests.",
          ["defaultJobName"]: "build",
          ["jobs"]: []
        };
        test("when invalid decl of a step, an error must be raised", async () => {
          {
            const globalDataset = GlobalDataset({
              'name': "global"
            });
            const out = await _core.dogma.pawait(() => parser.parse(_core.dogma.clone(catalogDecl, {
              "jobs": [{
                ["macrox"]: "mymacro",
                ["steps"]: []
              }]
            }, {}, [], []), {
              'catalog': catalogOpt,
              'parentDataset': globalDataset,
              'ops': ops
            }));
            expected(out).it(0).equalTo(false).it(1).toBe(Error).like("Invalid job declaration");
          }
        });
        test("when valid decl w/o dataset, a jobs catalog must be returned", async () => {
          {
            const globalDataset = GlobalDataset({
              'name': "global"
            });
            const out = (0, await parser.parse(_core.dogma.clone(catalogDecl, {
              "jobs": [{
                ["macro"]: "mymacro",
                ["steps"]: []
              }, {
                ["co"]: "myco",
                ["steps"]: []
              }]
            }, {}, [], []), {
              'catalog': catalogOpt,
              'parentDataset': globalDataset,
              'ops': ops
            }));
            expected(out).toBe(JobCatalog).toHave({
              'spec': "v1.0",
              'loc': "test:///test.yaml",
              'cty': "text/yaml",
              'desc': "A catalog to perform the unit tests.",
              'plugins': Plugins(),
              'defaultJobName': "build"
            }).member("dataset").toBe(LocalDataset).member("dataset.parent").sameAs(globalDataset);
            expected(out.jobs).toBeMap();
          }
        });
        test("when valid decl w/ dataset, a jobs catalog must be returned", async () => {
          {
            const globalDataset = GlobalDataset({
              'name': "global"
            });
            const out = (0, await parser.parse(_core.dogma.clone(catalogDecl, {
              "dataset": [{
                ["var"]: "mydatum",
                ["value"]: "my value"
              }]
            }, {}, [], []), {
              'catalog': catalogOpt,
              'parentDataset': globalDataset,
              'ops': ops
            }));
            expected(out).toBe(JobCatalog).toHave({
              'spec': "v1.0",
              'loc': "test:///test.yaml",
              'cty': "text/yaml",
              'desc': "A catalog to perform the unit tests.",
              'plugins': Plugins(),
              'defaultJobName': "build",
              'jobs': {}
            }).member("dataset").toBe(LocalDataset);
          }
        });
        test("when valid decl w/ plugins, a jobs catalog must be returned", async () => {
          {
            const piWoi = {
              ["name"]: "pi-without-ini",
              ["ops"]: {}
            };
            const piWini = {
              ["name"]: "pi-with-ini",
              ["ops"]: {},
              ["ini"]: () => {
                {
                  return "value";
                }
              }
            };
            const pluginLoader = simulator(PluginLoader, {
              'loadPlugin': method([{
                ["args"]: ["pi-without-ini"],
                ["returns"]: piWoi
              }, {
                ["args"]: ["pi-with-ini"],
                ["returns"]: piWini
              }])
            });
            const parser = JobCatalogParser({
              'pluginLoader': pluginLoader,
              'pluginParser': pluginParser
            });
            const globalDataset = GlobalDataset({
              'name': "global"
            });
            const out = (0, await parser.parse(_core.dogma.clone(catalogDecl, {
              "plugins": [{
                ["plugin"]: "woi",
                ["impl"]: "pi-without-ini"
              }, {
                ["plugin"]: "wi",
                ["impl"]: "pi-with-ini"
              }]
            }, {}, [], []), {
              'catalog': catalogOpt,
              'parentDataset': globalDataset,
              'ops': ops
            }));
            expected(out).toBe(JobCatalog).toHave({
              'spec': "v1.0",
              'loc': "test:///test.yaml",
              'cty': "text/yaml",
              'desc': "A catalog to perform the unit tests.",
              'defaultJobName': "build",
              'jobs': {}
            }).member("dataset").toBe(LocalDataset).member("dataset.parent").sameAs(globalDataset);
            expected(out.plugins).toBe(Plugins).toHaveLen(2).get("items.woi").toBe(Plugin).toHave({
              'name': "woi",
              'state': null
            }).get("items.wi").toBe(Plugin).toHave({
              'name': "wi",
              'state': "value"
            });
          }
        });
      }
    });
  }
});