"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const op = _core.dogma.use(require("./encode"));
const buildParams = op.parameterizer;
const handle = op.fun;
suite(__filename, () => {
  {
    suite("buildParams()", () => {
      {
        test("when text, {value: text} must be returned", () => {
          {
            const value = "ciao mondo!";
            const args = value;
            const out = buildParams(args);
            expected(out).equalTo({
              ["value"]: value
            });
          }
        });
        test("when list, {value: list[0]} must be returned", () => {
          {
            const value = "ciao mondo!";
            const args = [value];
            const out = buildParams(args);
            expected(out).equalTo({
              ["value"]: value
            });
          }
        });
        test("when map, {value: fmt(map)} must be returned", () => {
          {
            const value = {
              ["x"]: 0,
              ["y"]: 1
            };
            const args = {
              ["value"]: value
            };
            const out = buildParams(args);
            expected(out).equalTo({
              'value': (0, _core.fmt)(value)
            });
          }
        });
      }
    });
    suite("handle()", () => {
      {
        test("when called, base64 text must be returned", () => {
          {
            const value = "ciao mondo!";
            const out = handle({
              'params': {
                ["value"]: value
              }
            });
            expected(out).equalTo("Y2lhbyBtb25kbyE=");
          }
        });
      }
    });
  }
});