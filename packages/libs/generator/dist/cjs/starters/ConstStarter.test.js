"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  simulator
} = _core.dogma.use(require("@akromio/doubles"));
const ConstStarter = _core.dogma.use(require("./ConstStarter"));
const StarterState = _core.dogma.use(require("./StarterState"));
suite(__filename, () => {
  {
    test("generateBlankSheets()", async () => {
      {
        const opts = {
          ["interval"]: 100,
          ["times"]: 5,
          ["blankSheets"]: 11,
          ["output"]: simulator.stream.duplex()
        };
        const starter = ConstStarter(opts).start();
        0, await (0, _core.sleep)("1s");
        expected(starter).toHave({
          'state': StarterState.stopped,
          'iterations': 5
        });
      }
    });
  }
});