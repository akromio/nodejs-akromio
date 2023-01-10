"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const index = _core.dogma.use(require("./index"));
suite(__filename, () => {
  {
    test("when imported, range function must be exported", () => {
      {
        expected(index).toBeFn();
      }
    });
    test("when called with a length, list must be returned", () => {
      {
        const out = index(5);
        expected(out).equalTo([0, 1, 2, 3, 4]);
      }
    });
  }
});