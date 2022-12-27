"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const StageParser = _core.dogma.use(require("./StageParser"));
suite(__filename, () => {
  {
    const parser = StageParser();
    const parseOpts = {};
    suite("parseStage()", () => {
      {
        suite("const", () => {
          {
            test("when valid declaration, a ConstStage must be returned", () => {
              {
                const jobs = [];
                const decl = {
                  ["const"]: "warmup",
                  ["duration"]: "2m",
                  ["interval"]: "2s",
                  ["requests"]: 100,
                  ["jobs"]: jobs
                };
                const out = parser.parse(decl, parseOpts);
                expected(out.warmup).toBe("ConstStage").toHave({
                  'name': "warmup",
                  'duration': 120000,
                  'interval': 2000,
                  'requests': 100,
                  'jobs': jobs
                });
              }
            });
          }
        });
        suite("sleep", () => {
          {
            test("when valid declaration, a SleepStage must be returned", () => {
              {
                const jobs = [];
                const decl = {
                  ["sleep"]: "pause",
                  ["duration"]: 120000
                };
                const out = parser.parse(decl, parseOpts);
                expected(out.pause).toBe("SleepStage").toHave({
                  'name': "pause",
                  'duration': 120000
                });
              }
            });
          }
        });
      }
    });
  }
});