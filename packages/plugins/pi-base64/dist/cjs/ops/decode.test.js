"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const op = _core.dogma.use(require("./decode"));
const buildParams = op.parameterizer;
const handle = op.fun;
suite(__filename, () => {
  {
    const encoded = "Y2lhbyBtb25kbyE=";
    const decoded = "ciao mondo!";
    suite("buildParams()", () => {
      {
        test("when text, {value: text} must be returned", () => {
          {
            const value = encoded;
            const args = value;
            const out = buildParams(args);
            expected(out).equalTo({
              ["value"]: value
            });
          }
        });
        test("when list, {value: list[0]} must be returned", () => {
          {
            const value = encoded;
            const args = [value];
            const out = buildParams(args);
            expected(out).equalTo({
              ["value"]: value
            });
          }
        });
        test("when map, map must be returned", () => {
          {
            const args = {
              ["value"]: encoded
            };
            const out = buildParams(args);
            expected(out).equalTo(args);
          }
        });
      }
    });
    suite("handle()", () => {
      {
        test("when encoded text, decoded text must be returned", () => {
          {
            const out = handle({
              'params': {
                ["value"]: encoded
              }
            });
            expected(out).equalTo(decoded);
          }
        });
      }
    });
  }
});