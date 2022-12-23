"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  sim
} = _core.dogma.use(require("@akromio/doubles"));
const ConstStarter = _core.dogma.use(require("./ConstStarter"));
const StarterState = _core.dogma.use(require("./StarterState"));
suite(__filename, () => {
  {
    test("generateBlankSheets()", async () => {
      {
        const output = sim.stream.writable();
        const opts = {
          ["interval"]: 50,
          ["times"]: 5,
          ["blankSheets"]: 11,
          ["output"]: output
        };
        const starter = ConstStarter(opts).start();
        0, await (0, _core.sleep)("400ms");
        expected(starter).toHave({
          'state': StarterState.stopped,
          'iterations': 5
        });
        expected(output.writable).equalTo(false);
      }
    });
  }
});