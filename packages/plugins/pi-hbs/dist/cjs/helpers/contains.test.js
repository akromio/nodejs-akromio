"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const contains = _core.dogma.use(require("./contains"));
suite(__filename, () => {
  {
    test("when contained, true must be returned", () => {
      {
        const out = contains(["a", "b", "c"], "b");
        expected(out).equalTo(true);
      }
    });
    test("when not contained, false must be returned", () => {
      {
        const out = contains(["a", "b", "c"], "z");
        expected(out).equalTo(false);
      }
    });
  }
});