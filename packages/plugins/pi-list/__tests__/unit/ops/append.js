"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const pi = _core.dogma.use(require("../../.."));
const op = pi.ops.append;
suite(__filename, () => {
  {
    suite("buildParams()", () => {
      {
        const buildParams = op.parameterizer;
        test("when [item, list], {list, item} must be returned", () => {
          {
            const list = [];
            const item = "123";
            const out = buildParams([item, list]);
            expected(out).equalTo({
              'item': item,
              'list': list
            });
          }
        });
      }
    });
    suite("handler()", () => {
      {
        const handler = op.fun;
        test("when called, the same list must be returned with the item appended", () => {
          {
            const item = "456";
            const list = ["123"];
            const out = handler({
              'params': {
                ["item"]: item,
                ["list"]: list
              }
            });
            expected(out).sameAs(list).equalTo(["123", item]);
          }
        });
      }
    });
  }
});