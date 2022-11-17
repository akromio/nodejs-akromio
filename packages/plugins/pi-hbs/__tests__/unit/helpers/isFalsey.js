"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const isFalsey = _core.dogma.use(require("../../../dist/cjs/helpers/isFalsey"));
suite(__filename, () => {
  {
    test("when no, true must be returned", () => {
      {
        const out = isFalsey("no");
        expected(out).equalTo(true);
      }
    });
    test("when truthy, false must be returned", () => {
      {
        const out = isFalsey(true);
        expected(out).equalTo(false);
      }
    });
  }
});