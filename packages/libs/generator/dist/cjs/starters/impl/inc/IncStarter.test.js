"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  monitor
} = _core.dogma.use(require("@akromio/doubles"));
const BlankSheetStream = _core.dogma.use(require("../../BlankSheetStream"));
const StarterState = _core.dogma.use(require("../../StarterState"));
const IncStarter = _core.dogma.use(require("./IncStarter"));
suite(__filename, () => {
  {
    test("generateBlankSheets()", async () => {
      {
        const output = monitor(BlankSheetStream(), {
          'method': "append"
        });
        const opts = {
          ["interval"]: 50,
          ["times"]: 10,
          ["inc"]: 0.5,
          ["blankSheets"]: 1,
          ["output"]: output
        };
        const starter = IncStarter(opts);
        0, await starter.start();
        expected(starter).toHave({
          'state': StarterState.stopped,
          'iterations': 10
        });
        expected(output.writable).equalTo(false);
        const append = monitor.log(output, {
          'clear': true
        });
        expected(append.calls).equalTo(30);
        for (let i = 0; i < append.calls; i += 1) {
          expected(append.getCall(i).args).toHaveLen(1).it(0).toHave("ts");
        }
      }
    });
  }
});