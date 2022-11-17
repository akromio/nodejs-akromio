"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const eq = _core.dogma.use(require("../../../dist/cjs/helpers/eq"));
suite(__filename, () => {
  {
    test("when equal, true must be returned", () => {
      {
        const out = eq("a", "a");
        expected(out).equalTo(true);
      }
    });
    test("when not equal, false must be returned", () => {
      {
        const out = eq("a", "b");
        expected(out).equalTo(false);
      }
    });
  }
});