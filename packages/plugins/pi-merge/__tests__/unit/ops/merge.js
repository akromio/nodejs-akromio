"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const pi = _core.dogma.use(require("../../.."));
suite(__filename, () => {
  {
    const op = pi.ops.merge;
    const buildParams = op.parameterizer;
    const buildTitle = op.title;
    const handler = op.fun;
    const one = {
      ["a"]: 1,
      ["b"]: 1,
      ["c"]: 1
    };
    const two = {
      ["b"]: 2,
      ["d"]: 2
    };
    suite("buildParams()", () => {
      {
        test("when object, {values = [object]} must be returned", () => {
          {
            const out = buildParams(one);
            expected(out).equalTo({
              'values': [one]
            });
          }
        });
        test("when [...], {values} must be returned", () => {
          {
            const out = buildParams([one, two]);
            expected(out).equalTo({
              'values': [one, two]
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
              ["values"]: [one, two]
            };
            const out = buildTitle(params);
            expected(out).equalTo("merge: 2 objects");
          }
        });
      }
    });
    suite("handler", () => {
      {
        test("when called, a new merged object must be returned", () => {
          {
            const values = [one, two];
            const out = handler({
              'params': {
                ["values"]: values
              }
            });
            expected(out).equalTo({
              'a': 1,
              'b': 2,
              'c': 1,
              'd': 2
            });
          }
        });
      }
    });
  }
});