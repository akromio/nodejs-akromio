"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const pi = _core.dogma.use(require("../../.."));
suite(__filename, () => {
  {
    const op = pi.ops.inc;
    const buildParams = op.parameterizer;
    const buildTitle = op.title;
    const handler = op.fun;
    suite("buildParams()", () => {
      {
        test("when value, {value} must be returned", () => {
          {
            const value = 123;
            const out = buildParams(value);
            expected(out).equalTo({
              'value': value
            });
          }
        });
      }
    });
    suite("buildTitle()", () => {
      {
        test("when called, a title must be returned", () => {
          {
            const value = 123;
            const out = buildTitle({
              'value': value
            });
            expected(out).equalTo(`inc: value ${value}`);
          }
        });
      }
    });
    suite("handler", () => {
      {
        test("when called, the value + 1 must be returned", () => {
          {
            const value = 123;
            const out = handler({
              'params': {
                ["value"]: value
              }
            });
            expected(out).equalTo(124);
          }
        });
        test("when called with nil as value, 1 must be returned", () => {
          {
            const value = null;
            const out = handler({
              'params': {
                ["value"]: value
              }
            });
            expected(out).equalTo(1);
          }
        });
      }
    });
  }
});