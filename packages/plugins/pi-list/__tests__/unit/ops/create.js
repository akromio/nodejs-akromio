"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const pi = _core.dogma.use(require("../../.."));
const op = pi.ops.create;
suite(__filename, () => {
  {
    suite("buildParams()", () => {
      {
        const buildParams = op.parameterizer;
        test("when nothing passed, an empty list must be returned", () => {
          {
            const out = buildParams();
            expected(out).equalTo([]);
          }
        });
        test("when only one argument, [arg] must be returned", () => {
          {
            const out = buildParams(123);
            expected(out).equalTo([123]);
          }
        });
        test("when several arguments, [...args] must be returned", () => {
          {
            const out = buildParams([123, 456, 789]);
            expected(out).equalTo([123, 456, 789]);
          }
        });
      }
    });
    suite("handler()", () => {
      {
        const handler = op.fun;
        test("when called, a list must be returned", () => {
          {
            const out = handler({
              'params': [12, 34, 56]
            });
            expected(out).equalTo([12, 34, 56]);
          }
        });
      }
    });
  }
});