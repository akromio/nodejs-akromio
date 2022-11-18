"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const DirSearcher = _core.dogma.use(require("./DirSearcher"));
suite(__filename, () => {
  {
    const searcher = DirSearcher();
    suite("searchDirWith()", () => {
      {
        test("when entry found, super path must be returned", async () => {
          {
            const out = (0, await searcher.searchDirWith("packages"));
            expected(out).equalTo("../../..");
          }
        });
        test("when entry not found, nil must be returned", async () => {
          {
            const out = (0, await searcher.searchDirWith("unknown"));
            expected(out).toBeNil();
          }
        });
      }
    });
  }
});