"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  GlobalDataset
} = _core.dogma.use(require("@akromio/dataset"));
const StageCatalog = _core.dogma.use(require("../StageCatalog"));
const StageCatalogParser = _core.dogma.use(require("./StageCatalogParser"));
suite(__filename, () => {
  {
    const parser = StageCatalogParser();
    const parentDataset = GlobalDataset({
      'name': "global"
    });
    const parseOpts = {
      ["parentDataset"]: parentDataset
    };
    suite("parseStages()", () => {
      {
        test("when unknown stage, error must be raised", async () => {
          {
            const decl = {
              ["spec"]: "v1.0",
              ["loc"]: "test:///stages/catalogs/test-catalog",
              ["cty"]: "text/yaml",
              ["dataset"]: [{
                ["const"]: "duration",
                ["value"]: "10m"
              }],
              ["stages"]: [{
                ["xconstx"]: "warmup",
                ["duration"]: "2m",
                ["requests"]: 1000,
                ["jobs"]: []
              }, {
                ["sleep"]: "pause",
                ["duration"]: "1m"
              }, {
                ["const"]: "load",
                ["duration"]: "$(duration)",
                ["requests"]: 2000,
                ["jobs"]: []
              }]
            };
            const out = await _core.dogma.pawait(() => parser.parse(decl, parseOpts));
            expected(out).it(0).equalTo(false).it(1).toBe(TypeError).like("Invalid stage declaration:.+xconstx");
          }
        });
        test("when declaration is ok, stage catalog must be raised", async () => {
          {
            const decl = {
              ["spec"]: "v1.0",
              ["loc"]: "test:///stages/catalogs/test-catalog",
              ["cty"]: "text/yaml",
              ["dataset"]: [{
                ["const"]: "duration",
                ["value"]: "10m"
              }],
              ["stages"]: [{
                ["const"]: "warmup",
                ["duration"]: "2m",
                ["requests"]: 1000,
                ["jobs"]: []
              }, {
                ["sleep"]: "pause",
                ["duration"]: "1m"
              }, {
                ["const"]: "load",
                ["duration"]: "$(duration)",
                ["requests"]: 2000,
                ["jobs"]: []
              }]
            };
            const out = (0, await parser.parse(decl, parseOpts));
            expected(out).toBe(StageCatalog).toHave({
              'spec': "v1.0",
              'loc': "test:///stages/catalogs/test-catalog",
              'cty': "text/yaml",
              'stages': {
                ["warmup"]: {
                  ["name"]: "warmup",
                  ["desc"]: null,
                  ["tags"]: [],
                  ["duration"]: 120000,
                  ["interval"]: 1000,
                  ["requests"]: 1000,
                  ["jobs"]: []
                },
                ["pause"]: {
                  ["name"]: "pause",
                  ["desc"]: null,
                  ["tags"]: [],
                  ["duration"]: 60000
                },
                ["load"]: {
                  ["name"]: "load",
                  ["desc"]: null,
                  ["tags"]: [],
                  ["duration"]: 600000,
                  ["interval"]: 1000,
                  ["requests"]: 2000,
                  ["jobs"]: []
                }
              }
            });
          }
        });
      }
    });
  }
});