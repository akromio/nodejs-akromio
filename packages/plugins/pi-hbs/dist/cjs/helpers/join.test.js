"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const join = _core.dogma.use(require("./join"));
suite(__filename, () => {
  {
    const array = [1, "two", 3];
    test("when list, ', ' as separator must be used", () => {
      {
        const out = join(array);
        expected(out).equalTo("1, two, 3");
      }
    });
    test("when list and separator, this separator must be used", () => {
      {
        const out = join(array, " | ");
        expected(out).equalTo("1 | two | 3");
      }
    });
  }
});