"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const now = _core.dogma.use(require("./now"));
const handler = now.fun;
suite(__filename, () => {
  {
    test("when called, current timemestamp must be returned", () => {
      {
        const out = handler();
        expected(out).toBeNum().greaterThan(123456789);
      }
    });
  }
});