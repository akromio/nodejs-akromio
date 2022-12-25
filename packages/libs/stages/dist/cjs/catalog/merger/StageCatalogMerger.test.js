"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const StageCatalogMerger = _core.dogma.use(require("./StageCatalogMerger"));
suite(__filename, () => {
  {
    const merger = StageCatalogMerger();
    suite("mergeStages()", () => {
      {
        test("when called, extensor stages are appended at the end of the extended one, removing the extended", () => {
          {
            const extended = {
              ["stages"]: [{
                ["sleep"]: "x",
                ["duration"]: "1m"
              }, {
                ["const"]: "y",
                ["duration"]: "1m",
                ["requests"]: 1000
              }, {
                ["sleep"]: "z",
                ["duration"]: "1m"
              }]
            };
            const extensor = {
              ["stages"]: [{
                ["sleep"]: "y",
                ["duration"]: "2m"
              }, {
                ["sleep"]: "a",
                ["duration"]: "2m"
              }]
            };
            const out = merger.merge(extensor, extended);
            expected(out.stages).equalTo([{
              ["sleep"]: "x",
              ["duration"]: "1m"
            }, {
              ["sleep"]: "z",
              ["duration"]: "1m"
            }, {
              ["sleep"]: "y",
              ["duration"]: "2m"
            }, {
              ["sleep"]: "a",
              ["duration"]: "2m"
            }]);
          }
        });
        test("when stages unset, empty list must be used", () => {
          {
            const extensor = {};
            const extended1 = {};
            const extended2 = {
              ["stages"]: [{
                ["sleep"]: "x",
                ["duration"]: "1m"
              }, {
                ["sleep"]: "y",
                ["duration"]: "1m"
              }, {
                ["sleep"]: "z",
                ["duration"]: "1m"
              }]
            };
            const out = merger.merge(extensor, extended1, extended2);
            expected(out.stages).equalTo([{
              ["sleep"]: "x",
              ["duration"]: "1m"
            }, {
              ["sleep"]: "y",
              ["duration"]: "1m"
            }, {
              ["sleep"]: "z",
              ["duration"]: "1m"
            }]);
          }
        });
      }
    });
  }
});