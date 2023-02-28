"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const op = _core.dogma.use(require("./includes"));
suite(__filename, () => {
  {
    const handler = op.fun;
    suite("handler()", () => {
      {
        test("when included, true must be returned", () => {
          {
            const params = ["one two thhree", "two"];
            const ctx = {
              ["params"]: params
            };
            const out = handler(ctx);
            expected(out).equalTo(true);
          }
        });
        test("when not included, false must be returned", () => {
          {
            const params = ["one two thhree", "four"];
            const ctx = {
              ["params"]: params
            };
            const out = handler(ctx);
            expected(out).equalTo(false);
          }
        });
      }
    });
  }
});