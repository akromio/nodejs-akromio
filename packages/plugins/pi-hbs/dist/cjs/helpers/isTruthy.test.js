"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const isTruthy = _core.dogma.use(require("./isTruthy"));
suite(__filename, () => {
  {
    test("when yes, true must be returned", () => {
      {
        const out = isTruthy("yes");
        expected(out).equalTo(true);
      }
    });
    test("when falsey, false must be returned", () => {
      {
        const out = isTruthy("123");
        expected(out).equalTo(false);
      }
    });
  }
});