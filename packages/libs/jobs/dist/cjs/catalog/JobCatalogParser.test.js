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
const JobCatalog = _core.dogma.use(require("./JobCatalog"));
const JobCatalogParser = _core.dogma.use(require("./JobCatalogParser"));
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
        test("when invalid step decl, an error must be raised", async () => {
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
            const pluginLoader = sim(PluginLoader, {
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
    suite("parsePlugins()", () => {
      {
        test("when plugin, a Plugin instance must be returned", async () => {
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
            const plugins = [{
              ["plugin"]: "woi",
              ["impl"]: "pi-without-ini"
            }, {
              ["plugin"]: "wi",
              ["name"]: "WI",
              ["impl"]: "pi-with-ini"
            }];
            const pluginLoader = sim(PluginLoader, {
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
            const out = (0, await parser.parse(_core.dogma.clone(catalogDecl, {
              "plugins": plugins
            }, {}, [], []), {
              'parentDataset': parentDataset,
              'ops': ops
            })).plugins;
            expected(out).toBe(Plugins).toHaveLen(2);
            expected(out.getPlugin("woi")).toHave({
              'name': "woi",
              'state': null
            });
            expected(out.getPlugin("WI")).toHave({
              'name': "WI",
              'state': "value"
            });
          }
        });
        test("when preset, its plugins must be loaded, parsed and returned", async () => {
          {
            const pi1 = {
              ["plugin"]: "pi1",
              ["ops"]: {
                ["op11"]: {
                  ["fun"]: _core.dogma.nop()
                },
                ["op12"]: {
                  ["fun"]: _core.dogma.nop()
                }
              }
            };
            const pi2 = {
              ["plugin"]: "pi2",
              ["ops"]: {
                ["op21"]: {
                  ["fun"]: _core.dogma.nop()
                },
                ["op22"]: {
                  ["fun"]: _core.dogma.nop()
                }
              }
            };
            const preset = {
              ["name"]: "test-preset",
              ["tags"]: ["test"],
              ["plugins"]: [{
                ["plugin"]: pi1.name,
                ["impl"]: pi1
              }, {
                ["plugin"]: pi2.name,
                ["impl"]: pi2
              }]
            };
            const plugins = [{
              ["preset"]: "test-preset"
            }];
            const pluginLoader = sim(PluginLoader, {
              'loadPreset': method.returns(preset),
              'loadPlugin': method.invokes((...args) => {
                {
                  (0, _core.printf)(args);
                  return _core.dogma.getItem(args, 0);
                }
              })
            });
            const parser = JobCatalogParser({
              'pluginLoader': pluginLoader,
              'pluginParser': pluginParser
            });
            const out = (0, await parser.parse(_core.dogma.clone(catalogDecl, {
              "plugins": plugins
            }, {}, [], []), {
              'parentDataset': parentDataset,
              'ops': ops
            })).plugins;
            expected(out).toHaveLen(2);
            expected(out.getPlugin("pi1")).toHave({
              'name': "pi1"
            });
            expected(out.getPlugin("pi2")).toHave({
              'name': "pi2"
            });
          }
        });
        test("when unknown plugin item, error must be raised", async () => {
          {
            const plugins = [{
              ["name"]: "woi",
              ["impl"]: "pi-without-ini"
            }];
            const parser = JobCatalogParser({
              'pluginLoader': pluginLoader,
              'pluginParser': pluginParser
            });
            const out = await _core.dogma.pawait(() => parser.parse(_core.dogma.clone(catalogDecl, {
              "plugins": plugins
            }, {}, [], []), {
              'parentDataset': parentDataset,
              'ops': ops
            }));
            expected(out).it(0).equalTo(false).it(1).equalTo(TypeError("Unknown plugin declaration: { name: 'woi', impl: 'pi-without-ini' }."));
          }
        });
      }
    });
    suite("parseTriggers()", () => {
      {
        test("when triggers, triggers must be parsed", async () => {
          {
            const parser = JobCatalogParser({
              'pluginLoader': pluginLoader,
              'pluginParser': pluginParser
            });
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
            (0, _core.printf)(out);
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