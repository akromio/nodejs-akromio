"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const yaml = _core.dogma.use(require("yaml"));
const pi = _core.dogma.use(require("../../.."));
const op = pi.ops.encode;
suite(__filename, () => {
  {
    suite("fun", () => {
      {
        const {
          fun
        } = op;
        test("when value, this must be returned as a YAML text", () => {
          {
            const value = {
              ["x"]: 1,
              ["y"]: 2
            };
            const out = fun({
              'params': value
            });
            expected(out).equalTo(yaml.stringify(value));
          }
        });
      }
    });
  }
});