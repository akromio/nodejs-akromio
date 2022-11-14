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
const {
  ActionOperator,
  StaticAction,
  Call
} = _core.dogma.use(require("../../../.."));
suite(__filename, () => {
  {
    const dataset = GlobalDataset({
      'name': "local"
    });
    const log = simulator.stream.duplex();
    suite("perform()", () => {
      {
        teardown(() => {
          {
            monitor.clearAll();
          }
        });
        test("when ctx.log used, emitOpLog must be called", async () => {
          {
            const operator = monitor(ActionOperator(), {
              'methods': ["emitOpLog"]
            });
            const fun = ctx => {
              /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
              let {
                log
              } = ctx;
              {
                log("hello!");
              }
            };
            const op = StaticAction({
              'name': "test",
              'operator': operator,
              'fun': fun
            });
            const out = (0, await op.runWith(undefined, {
              'dataset': dataset,
              'log': log
            }));
            const emitOpLog = monitor.log(operator);
            expected(emitOpLog.calls).equalTo(1);
            expected(emitOpLog.entry.args).it(0).toBe(Call).it(1).equalTo("hello!");
          }
        });
        test("when resultLog, emitOpLog must be called", async () => {
          {
            const operator = monitor(ActionOperator(), {
              'methods': ["emitOpLog"]
            });
            const fun = _core.dogma.nop();
            const op = StaticAction({
              'name': "test",
              'operator': operator,
              'fun': fun
            });
            const out = (0, await op.runWith(undefined, {
              'dataset': dataset,
              'log': log,
              'resultLog': true
            }));
            expected(monitor.log(operator).calls).equalTo(1);
          }
        });
      }
    });
  }
});