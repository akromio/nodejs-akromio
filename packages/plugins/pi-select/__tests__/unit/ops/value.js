"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const pi = _core.dogma.use(require("../../.."));
suite(__filename, () => {
  {
    const op = pi.ops.value;
    const buildParams = op.parameterizer;
    const buildTitle = op.title;
    const handler = op.fun;
    suite("buildParams()", () => {
      {
        test("when [object, field], {object, field} must be returned", () => {
          {
            const object = {
              ["x"]: 1,
              ["y"]: 2
            };
            const field = "x";
            const out = buildParams([object, field]);
            expected(out).equalTo({
              'object': object,
              'field': field
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
            expected(out).equalTo("select: value x");
          }
        });
      }
    });
    suite("handler()", () => {
      {
        test("when called, field value must be returned", async () => {
          {
            const object = {
              ["x"]: 1,
              ["y"]: 2,
              ["z"]: 3
            };
            const field = "y";
            const out = handler({
              'params': {
                ["object"]: object,
                ["field"]: field
              }
            });
            expected(out).equalTo(object.y);
          }
        });
      }
    });
  }
});