"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const split = _core.dogma.use(require("../../../dist/cjs/helpers/split"));
suite(__filename, () => {
  {
    test("when text with separator, [...] must be returned", () => {
      {
        const out = split("one,two,three", ",");
        expected(out).equalTo(["one", "two", "three"]);
      }
    });
    test("when text w/o separator, [text] must be returned", () => {
      {
        const out = split("123", ",");
        expected(out).equalTo(["123"]);
      }
    });
  }
});