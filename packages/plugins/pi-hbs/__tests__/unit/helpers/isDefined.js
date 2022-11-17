"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const isDefined = _core.dogma.use(require("../../../dist/cjs/helpers/isDefined"));
suite(__filename, () => {
  {
    test("when defined, true must be returned", () => {
      {
        const out = isDefined("");
        expected(out).equalTo(true);
      }
    });
    test("when undefined, false must be returned", () => {
      {
        const out = isDefined(undefined);
        expected(out).equalTo(false);
      }
    });
  }
});