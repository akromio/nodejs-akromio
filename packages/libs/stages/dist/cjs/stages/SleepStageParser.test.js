"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  sim,
  fun
} = _core.dogma.use(require("@akromio/doubles"));
const SleepStageParser = _core.dogma.use(require("./SleepStageParser"));
suite(__filename, () => {
  {
    const parser = SleepStageParser();
    suite("_parse()", () => {
      {
        test("when declaration is not valid, error must be raised", () => {
          {
            const decl = {
              ["stage"]: "warmup",
              ["impl"]: "sleep",
              ["duration"]: true
            };
            const out = _core.dogma.peval(() => {
              return parser.parse(decl, sim({
                'eval': fun.invokes(decl => {
                  /* c8 ignore next */_core.dogma.expect("decl", decl);
                  {
                    return decl;
                  }
                })
              }));
            });
            expected(out).it(0).equalTo(false).it(1).toBe(TypeError);
          }
        });
        test("when declaration is valid, this must be returned", () => {
          {
            const jobs = [];
            const decl = {
              ["stage"]: "pause",
              ["impl"]: "sleep",
              ["duration"]: "2m"
            };
            const out = parser.parse(decl, sim({
              'eval': fun.invokes(decl => {
                /* c8 ignore next */_core.dogma.expect("decl", decl);
                {
                  return decl;
                }
              })
            }));
            expected(out).equalTo({
              'stage': "pause",
              'impl': "sleep",
              'duration': 120000
            });
          }
        });
      }
    });
  }
});