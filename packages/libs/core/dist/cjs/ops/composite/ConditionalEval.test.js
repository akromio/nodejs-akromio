"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const ConditionalEval = _core.dogma.use(require("./ConditionalEval"));
suite(__filename, () => {
  {
    suite("eval()", () => {
      {
        const ceval = ConditionalEval().eval;
        test("when valid expression, its value must be returned", () => {
          {
            const ctx = {
              ["x"]: 2,
              ["y"]: 3
            };
            const out = ceval("x < 3", ctx);
            expected(out).equalTo(true);
          }
        });
      }
    });
  }
});