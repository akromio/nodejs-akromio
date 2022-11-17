"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const trim = _core.dogma.use(require("../../../dist/cjs/helpers/trim"));
suite(__filename, () => {
  {
    test("when text with whitespaces, these must be removed and the result returned", () => {
      {
        const out = trim("  one, two, three   ");
        expected(out).equalTo("one, two, three");
      }
    });
  }
});