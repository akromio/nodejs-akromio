"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const pkg = _core.dogma.use(require("../.."));
suite(__filename, () => {
  {
    test("when imported, its api must be exported", () => {
      {
        expected(pkg).toHave({
          'name': "akro"
        }).member("plugins").len().greaterThan(2);
      }
    });
  }
});