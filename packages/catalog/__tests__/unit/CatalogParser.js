"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  simulator,
  method
} = _core.dogma.use(require("@akromio/doubles"));
const {
  Dataset,
  GlobalDataset,
  LocalDataset
} = _core.dogma.use(require("@akromio/dataset"));
const {
  Plugin,
  Plugins,
  PluginParser,
  PluginLoader,
  Ops
} = _core.dogma.use(require("@akromio/core"));
const {
  Catalog: CatalogBase,
  CatalogParser: CatalogParserBase
} = _core.dogma.use(require("../.."));
const $Catalog = class Catalog extends CatalogBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_12c3e953bd6134282a284fb7b22219c1___init__ instanceof Function) this._pvt_12c3e953bd6134282a284fb7b22219c1___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_12c3e953bd6134282a284fb7b22219c1___post__ instanceof Function) this._pvt_12c3e953bd6134282a284fb7b22219c1___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_12c3e953bd6134282a284fb7b22219c1___validate__ instanceof Function) this._pvt_12c3e953bd6134282a284fb7b22219c1___validate__(); /* c8 ignore stop */
  }
};

const Catalog = new Proxy($Catalog, {
  apply(receiver, self, args) {
    return new $Catalog(...args);
  }
});
const $CatalogParser = class CatalogParser extends CatalogParserBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    Object.defineProperty(this, 'jobParser', {
      value: (0, _core.coalesce)(_['jobParser'], simulator({
        'parseJobs': method.invokes((...args) => {
          let parsed = {};
          {
            for (const decl of _core.dogma.getItem(args, 0)) {
              _core.dogma.setItem("=", parsed, decl.macro, decl);
            }
          }
          return parsed;
        })
      })),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_12c3e953bd6134282a284fb7b22219c1___init__ instanceof Function) this._pvt_12c3e953bd6134282a284fb7b22219c1___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_12c3e953bd6134282a284fb7b22219c1___post__ instanceof Function) this._pvt_12c3e953bd6134282a284fb7b22219c1___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_12c3e953bd6134282a284fb7b22219c1___validate__ instanceof Function) this._pvt_12c3e953bd6134282a284fb7b22219c1___validate__(); /* c8 ignore stop */
  }
};

const CatalogParser = new Proxy($CatalogParser, {
  apply(receiver, self, args) {
    return new $CatalogParser(...args);
  }
});
CatalogParser.prototype.createCatalog = function (decl) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map);
  {
    return Catalog(decl);
  }
};
suite(__filename, () => {
  {
    const globalDataset = GlobalDataset({
      'name': "global"
    });
    const parentDataset = globalDataset;
    const pluginParser = PluginParser();
    const pluginLoader = simulator(PluginLoader, {});
    const ops = Ops();
    const catalogDecl = {
      ["spec"]: "v1.0",
      ["name"]: "test-catalog",
      ["loc"]: "test:///jobs/catalogs/test-catalog",
      ["cty"]: "text/yaml",
      ["desc"]: "A test catalog.",
      ["jobs"]: []
    };
    suite("parseDataset()", () => {
      {
        const datasetName = "test";
        const parser = CatalogParser({
          'pluginParser': pluginParser,
          'pluginLoader': pluginLoader
        });
        test("when empty dataset declaration, empty dataset must be returned", async () => {
          {
            const out = (0, await parser.parse(_core.dogma.clone(catalogDecl, {
              "dataset": []
            }, {}, [], []), {
              'parentDataset': parentDataset,
              'ops': ops
            })).dataset;
            expected(out).toBe(LocalDataset).member("parent").sameAs(globalDataset).member("data").toHaveLen(0);
          }
        });
        test("when dataset with data, a local dataset must be returned", async () => {
          {
            const out = (0, await parser.parse(_core.dogma.clone(catalogDecl, {
              "dataset": [{
                ["var"]: "mydatum",
                ["value"]: "my value"
              }]
            }, {}, [], []), {
              'parentDataset': parentDataset,
              'ops': ops
            })).dataset;
            expected(out).toBe(LocalDataset).member("parent").sameAs(globalDataset).get("data.mydatum").toBe("VarDatum");
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
            const pluginLoader = simulator(PluginLoader, {
              'loadPlugin': method([{
                ["args"]: ["pi-without-ini"],
                ["returns"]: piWoi
              }, {
                ["args"]: ["pi-with-ini"],
                ["returns"]: piWini
              }])
            });
            const parser = CatalogParser({
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
            const pluginLoader = simulator(PluginLoader, {
              'loadPreset': method.returns(preset),
              'loadPlugin': method.invokes((...args) => {
                {
                  (0, _core.printf)(args);
                  return _core.dogma.getItem(args, 0);
                }
              })
            });
            const parser = CatalogParser({
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
            const parser = CatalogParser({
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
            const parser = CatalogParser({
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
              "triggers": triggers
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
    suite("parseJobs()", () => {
      {
        test("when jobs, jobs must be parsed", async () => {
          {
            const parser = CatalogParser({
              'pluginLoader': pluginLoader,
              'pluginParser': pluginParser
            });
            const job1 = {
              ["macro"]: "macro1",
              ["steps"]: []
            };
            const job2 = {
              ["macro"]: "macro2",
              ["steps"]: []
            };
            const jobs = [job1, job2];
            const out = (0, await parser.parse(_core.dogma.clone(catalogDecl, {
              "jobs": jobs
            }, {}, [], []), {
              'parentDataset': parentDataset,
              'ops': ops
            })).jobs;
            expected(out).equalTo({
              'macro1': job1,
              'macro2': job2
            });
          }
        });
      }
    });
  }
});