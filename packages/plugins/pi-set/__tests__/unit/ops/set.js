"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const pi = _core.dogma.use(require("../../.."));
suite(__filename, () => {
  {
    const op = pi.ops.set;
    const buildParams = op.parameterizer;
    const buildTitle = op.title;
    const handler = op.fun;
    suite("buildParams()", () => {
      {
        test("when [object, field, value], {object, field, value} must be returned", () => {
          {
            const object = {
              ["x"]: 1,
              ["y"]: 2
            };
            const field = "x";
            const value = 123;
            const out = buildParams([object, field, value]);
            expected(out).equalTo({
              'object': object,
              'field': field,
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
            const params = {
              ["object"]: {},
              ["field"]: "x"
            };
            const out = buildTitle(params);
            expected(out).equalTo("set: x");
          }
        });
      }
    });
    suite("handler()", () => {
      {
        test("when called, field must be set and object returned", async () => {
          {
            const object = {
              ["x"]: 1,
              ["y"]: 2,
              ["z"]: 3
            };
            const field = "x";
            const value = 123;
            const out = handler({
              'params': {
                ["object"]: object,
                ["field"]: field,
                ["value"]: value
              }
            });
            expected(out).equalTo({
              'x': 123,
              'y': 2,
              'z': 3
            });
          }
        });
      }
    });
  }
});