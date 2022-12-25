"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  sim,
  fun
} = _core.dogma.use(require("@akromio/doubles"));
const ConstStageParser = _core.dogma.use(require("./ConstStageParser"));
suite(__filename, () => {
  {
    const parser = ConstStageParser();
    suite("_parse()", () => {
      {
        test("when declaration is not valid, error must be raised", () => {
          {
            const decl = {
              ["stage"]: "warmup",
              ["impl"]: "const",
              ["duration"]: 120
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
            expected(out).it(0).equalTo(false).it(1).toBe(TypeError).like("Const stage schema not valid: {");
          }
        });
        test("when declaration is valid, this must be returned", () => {
          {
            const jobs = [];
            const decl = {
              ["const"]: "warmup",
              ["duration"]: "2m",
              ["interval"]: "2s",
              ["requests"]: 100,
              ["jobs"]: jobs
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
              'name': "warmup",
              'impl': "const",
              'duration': 120000,
              'interval': 2000,
              'requests': 100,
              'jobs': jobs
            });
          }
        });
      }
    });
  }
});