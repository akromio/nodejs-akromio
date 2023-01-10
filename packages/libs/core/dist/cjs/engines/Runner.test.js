"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  monitor,
  simulator
} = _core.dogma.use(require("@akromio/doubles"));
const {
  GlobalDataset
} = _core.dogma.use(require("@akromio/dataset"));
const Runner = _core.dogma.use(require("./Runner"));
const Result = _core.dogma.use(require("../ops/Result"));
const StaticAction = _core.dogma.use(require("../ops/simple/action/StaticAction"));
const ActionOperator = _core.dogma.use(require("../ops/simple/action/ActionOperator"));
suite(__filename, () => {
  {
    const log = simulator.stream.duplex();
    suite("run()", () => {
      {
        test("when called, op.runWith() is called and its result must be returned", async () => {
          {
            const action = StaticAction({
              'name': "test",
              'fun': _core.dogma.nop(),
              'operator': ActionOperator()
            });
            const dataset = GlobalDataset({
              'name': "global"
            });
            const runner = Runner({
              'log': log
            });
            const out = (0, await runner.run(action, null, {
              'dataset': dataset,
              'onError': "carryOn"
            }));
            expected(out).toBe(Result);
          }
        });
        test("when called w/ args, op.runWith() is called w/ args and its result must be returned", async () => {
          {
            const action = monitor(StaticAction({
              'name': "test",
              'fun': _core.dogma.nop(),
              'operator': ActionOperator()
            }), {
              'method': "runWith"
            });
            const dataset = GlobalDataset({
              'name': "global"
            });
            const runner = Runner({
              'log': log
            });
            const args = ["one", "two", "three"];
            const out = (0, await runner.run(action, args, {
              'dataset': dataset,
              'onError': "carryOn"
            }));
            expected(out).toBe(Result);
            const mlog = monitor.log(action, {
              'clear': true
            });
            expected(mlog.calls).equalTo(1);
            expected(mlog.call.args).it(0).equalTo(args);
          }
        });
      }
    });
  }
});