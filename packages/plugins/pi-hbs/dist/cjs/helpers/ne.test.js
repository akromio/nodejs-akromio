"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const ne = _core.dogma.use(require("./ne"));
suite(__filename, () => {
  {
    test("when not equal, true must be returned", () => {
      {
        const out = ne("a", "b");
        expected(out).equalTo(true);
      }
    });
    test("when equal, false must be returned", () => {
      {
        const out = ne("a", "a");
        expected(out).equalTo(false);
      }
    });
  }
});