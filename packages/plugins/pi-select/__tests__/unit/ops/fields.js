"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const pi = _core.dogma.use(require("../../.."));
suite(__filename, () => {
  {
    const op = pi.ops.fields;
    const buildParams = op.parameterizer;
    const buildTitle = op.title;
    const handler = op.fun;
    suite("buildParams()", () => {
      {
        test("when [object, ...fields], {object, fields} must be returned", () => {
          {
            const object = {
              ["x"]: 1,
              ["y"]: 2
            };
            const field1 = "x";
            const field2 = ["y"];
            const out = buildParams([object, field1, field2]);
            expected(out).equalTo({
              'object': object,
              'fields': ["x", "y"]
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
              ["fields"]: ["x", "y"]
            };
            const out = buildTitle(params);
            expected(out).equalTo("select: fields x, y");
          }
        });
      }
    });
    suite("handler()", () => {
      {
        test("when called, fields must be filtered and new object returned", async () => {
          {
            const object = {
              ["x"]: 1,
              ["y"]: 2,
              ["z"]: 3
            };
            const fields = ["x", "zzz=z"];
            const out = handler({
              'params': {
                ["object"]: object,
                ["fields"]: fields
              }
            });
            expected(out).equalTo({
              'x': 1,
              'zzz': 3
            });
          }
        });
      }
    });
  }
});