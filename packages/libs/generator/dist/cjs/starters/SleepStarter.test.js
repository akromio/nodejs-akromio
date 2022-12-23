"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  sim
} = _core.dogma.use(require("@akromio/doubles"));
const SleepStarter = _core.dogma.use(require("./SleepStarter"));
const StarterState = _core.dogma.use(require("./StarterState"));
suite(__filename, () => {
  {
    suite("generateBlankSheets()", () => {
      {
        test("when called, nothing must be added to the stream", async () => {
          {
            const output = sim.stream.writable();
            const opts = {
              ["interval"]: 50,
              ["times"]: 5,
              ["output"]: output
            };
            const starter = SleepStarter(opts).start();
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
  }
});