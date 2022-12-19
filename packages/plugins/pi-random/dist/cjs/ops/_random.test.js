"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const random = _core.dogma.use(require("./_random"));
suite(__filename, () => {
  {
    (0, _core.text)("when called with start and stop, a number between these must be returned", () => {
      {
        const start = 0;
        const stop = 10;
        const out = random(start, stop);
        expected(out).toBeNum().between(start, stop);
      }
    });
  }
});