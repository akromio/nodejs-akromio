"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  simulator
} = _core.dogma.use(require("@akromio/doubles"));
const SleepStarter = _core.dogma.use(require("./SleepStarter"));
const StarterState = _core.dogma.use(require("./StarterState"));
suite(__filename, () => {
  {
    suite("generateBlankSheets()", () => {
      {
        test("when called, nothing must be added to the stream", async () => {
          {
            const opts = {
              ["interval"]: 100,
              ["times"]: 5,
              ["output"]: simulator.stream.duplex()
            };
            const starter = SleepStarter(opts).start();
            0, await (0, _core.sleep)("1s");
            expected(starter).toHave({
              'state': StarterState.stopped,
              'iterations': 5
            });
          }
        });
      }
    });
  }
});