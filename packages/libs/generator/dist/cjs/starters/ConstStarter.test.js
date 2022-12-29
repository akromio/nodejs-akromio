"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  monitor
} = _core.dogma.use(require("@akromio/doubles"));
const BlankSheetStream = _core.dogma.use(require("./BlankSheetStream"));
const ConstStarter = _core.dogma.use(require("./ConstStarter"));
const StarterState = _core.dogma.use(require("./StarterState"));
suite(__filename, () => {
  {
    test("generateBlankSheets()", async () => {
      {
        const output = monitor(BlankSheetStream(), {
          'method': "append"
        });
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
        const append = monitor.log(output, {
          'clear': true
        });
        expected(append.calls).equalTo(opts.times * opts.blankSheets);
        for (let i = 0; i < append.calls; i += 1) {
          expected(append.getCall(i).args).toHaveLen(1).it(0).toHave("ts");
        }
      }
    });
  }
});