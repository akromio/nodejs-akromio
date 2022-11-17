"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const isEmpty = _core.dogma.use(require("../../../dist/cjs/helpers/isEmpty"));
suite(__filename, () => {
  {
    test("when empty, true must be returned", () => {
      {
        const out = isEmpty("");
        expected(out).equalTo(true);
      }
    });
    test("when not empty, false must be returned", () => {
      {
        const out = isEmpty("123");
        expected(out).equalTo(false);
      }
    });
  }
});