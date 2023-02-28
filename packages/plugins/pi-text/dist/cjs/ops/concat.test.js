"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const op = _core.dogma.use(require("./concat"));
suite(__filename, () => {
  {
    const buildParams = op.parameterizer;
    const handler = op.fun;
    suite("buildParams()", () => {
      {
        test("when args is list, args must be returned", () => {
          {
            const args = ["one", 2, "three"];
            const out = buildParams(args);
            expected(out).sameAs(args);
          }
        });
        test("when args is not list, [args] must be returned", () => {
          {
            const args = {
              ["x"]: 1,
              ["y"]: 2
            };
            const out = buildParams(args);
            expected(out).equalTo([args]);
          }
        });
      }
    });
    suite("handler()", () => {
      {
        test("when called, params must be returned", () => {
          {
            const params = ["one", 2, "three"];
            const ctx = {
              ["params"]: params
            };
            const out = handler(ctx);
            expected(out).equalTo("one2three");
          }
        });
      }
    });
  }
});