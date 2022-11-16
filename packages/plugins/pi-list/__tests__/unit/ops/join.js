"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const pi = _core.dogma.use(require("../../.."));
suite(__filename, () => {
  {
    const op = pi.ops.join;
    const buildParams = op.parameterizer;
    const handler = op.fun;
    const args = [1, "two", 3];
    const separator = " | ";
    suite("buildParams()", () => {
      {
        test("when [list] received, {list} must be returned", () => {
          {
            const out = buildParams([args]);
            expected(out).equalTo({
              ["list"]: args
            });
          }
        });
        test("when [list, separator], {list, separator} must be returned", () => {
          {
            const out = buildParams([args, separator]);
            expected(out).equalTo({
              ["list"]: args,
              ["separator"]: separator
            });
          }
        });
      }
    });
    suite("handler()", () => {
      {
        test("when called w/ separator, a text must be returned using this separator", () => {
          {
            const out = handler({
              'params': {
                ["list"]: args,
                ["separator"]: separator
              }
            });
            expected(out).equalTo("1 | two | 3");
          }
        });
        test("when called w/o separator, a text must be returned using the default separator", () => {
          {
            const out = handler({
              'params': {
                ["list"]: args
              }
            });
            expected(out).equalTo("1, two, 3");
          }
        });
      }
    });
  }
});