"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const yaml = _core.dogma.use(require("yaml"));
const pi = _core.dogma.use(require("../../.."));
const op = pi.ops.decode;
suite(__filename, () => {
  {
    suite("fun", () => {
      {
        const {
          fun
        } = op;
        test("when YAML text, this must be parsed and returned as JS value", () => {
          {
            const value = {
              ["x"]: 1,
              ["y"]: 2
            };
            const out = fun({
              'params': yaml.stringify(value)
            });
            expected(out).equalTo(value);
          }
        });
      }
    });
  }
});