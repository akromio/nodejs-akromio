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
                ["stage"]: "warmup",
                ["impl"]: "xconstx",
                ["duration"]: "2m",
                ["requests"]: 1000,
                ["jobs"]: []
              }, {
                ["stage"]: "pause",
                ["impl"]: "sleep",
                ["duration"]: "1m"
              }, {
                ["stage"]: "load",
                ["impl"]: "const",
                ["duration"]: "$(duration)",
                ["requests"]: 2000,
                ["jobs"]: []
              }]
            };
            const out = await _core.dogma.pawait(() => parser.parse(decl, {
              'parentDataset': parentDataset
            }));
            expected(out).it(0).equalTo(false).it(1).equalTo(TypeError("Unknown stage impl: xconstx."));
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
                ["stage"]: "warmup",
                ["impl"]: "const",
                ["duration"]: "2m",
                ["requests"]: 1000,
                ["jobs"]: []
              }, {
                ["stage"]: "pause",
                ["impl"]: "sleep",
                ["duration"]: "1m"
              }, {
                ["stage"]: "load",
                ["impl"]: "const",
                ["duration"]: "$(duration)",
                ["requests"]: 2000,
                ["jobs"]: []
              }]
            };
            const out = (0, await parser.parse(decl, {
              'parentDataset': parentDataset
            }));
            expected(out).toBe(StageCatalog).toHave({
              'spec': "v1.0",
              'loc': "test:///stages/catalogs/test-catalog",
              'cty': "text/yaml",
              'stages': {
                ["warmup"]: {
                  ["stage"]: "warmup",
                  ["impl"]: "const",
                  ["duration"]: 120000,
                  ["requests"]: 1000,
                  ["jobs"]: [],
                  ["interval"]: 1000
                },
                ["pause"]: {
                  ["stage"]: "pause",
                  ["impl"]: "sleep",
                  ["duration"]: 60000
                },
                ["load"]: {
                  ["stage"]: "load",
                  ["impl"]: "const",
                  ["duration"]: 600000,
                  ["requests"]: 2000,
                  ["jobs"]: [],
                  ["interval"]: 1000
                }
              }
            });
          }
        });
      }
    });
  }
});