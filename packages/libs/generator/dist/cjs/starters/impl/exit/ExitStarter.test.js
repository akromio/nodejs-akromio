"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  monitor
} = _core.dogma.use(require("@akromio/doubles"));
const BlankSheetStream = _core.dogma.use(require("../../BlankSheetStream"));
const StarterState = _core.dogma.use(require("../../StarterState"));
const ExitStarter = _core.dogma.use(require("./ExitStarter"));
suite(__filename, () => {
  {
    suite("generateBlankSheets()", () => {
      {
        test("when called, nothing must be added to the stream", async () => {
          {
            const output = monitor(BlankSheetStream(), {
              'method': "append"
            });
            const opts = {
              ["interval"]: 50,
              ["output"]: output
            };
            const starter = ExitStarter(opts);
            0, await starter.start();
            expected(starter).toHave({
              'state': StarterState.stopped,
              'iterations': 1
            });
            expected(output.writable).equalTo(false);
            const append = monitor.log(output, {
              'clear': true
            });
            expected(append.calls).equalTo(1);
            expected(append.getCall(0).args).it(0).toHave({
              'job': "__exit__"
            });
          }
        });
      }
    });
  }
});