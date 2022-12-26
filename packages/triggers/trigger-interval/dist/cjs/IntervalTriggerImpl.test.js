"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  monitor
} = _core.dogma.use(require("@akromio/doubles"));
const TriggerImpl = _core.dogma.use(require("./IntervalTriggerImpl"));
suite(__filename, () => {
  {
    const interval = "10s";
    setup(() => {
      {
        monitor.clearAll();
      }
    });
    suite("start()", () => {
      {
        test("when called, the timer must be started", () => {
          {
            const handler = monitor(_core.dogma.nop());
            const trigger = TriggerImpl({
              'interval': interval
            }).start(handler);
            try {
              expected(trigger).toHave({
                'times': null,
                'fired': 0
              }).member("handler").sameAs(handler).member("timer").notToBeNil();
              const log = monitor.log(handler);
              expected(log.calls).equalTo(0);
            } finally {
              trigger.stop();
            }
          }
        });
      }
    });
    suite("stop()", () => {
      {
        test("when called, timer must be cleared", () => {
          {
            const trigger = TriggerImpl({
              'interval': interval
            }).start(_core.dogma.nop()).stop();
            expected(trigger).members("handler", "timer").toBeNil();
          }
        });
      }
    });
    test("when immediate is true, first event must be fired immediately", async () => {
      {
        const handler = monitor(_core.dogma.nop());
        const trigger = TriggerImpl({
          'interval': "225ms"
        }).start(handler);
        0, await (0, _core.sleep)(800);
        try {
          const log = monitor.log(handler);
          const fired = 4;
          expected(log.calls).equalTo(fired);
          for (let i = 0; i < fired; i += 1) {
            expected(log.getCall(i).args).it(0).toBe("IntervalEvent");
          }
        } finally {
          trigger.stop();
        }
      }
    });
    test("when immediate is false, the first event is fired after interval", async () => {
      {
        const handler = monitor(_core.dogma.nop());
        const trigger = TriggerImpl({
          'immediate': false,
          'interval': "225ms"
        }).start(handler);
        0, await (0, _core.sleep)(800);
        try {
          const log = monitor.log(handler);
          const fired = 3;
          expected(log.calls).equalTo(fired);
          for (let i = 0; i < fired; i += 1) {
            expected(log.getCall(i).args).it(0).toBe("IntervalEvent");
          }
        } finally {
          trigger.stop();
        }
      }
    });
    test("when times reached, no more event must be fired", async () => {
      {
        const times = 2;
        const handler = monitor(_core.dogma.nop());
        const trigger = TriggerImpl({
          'interval': "225ms",
          'times': times
        }).start(handler);
        0, await (0, _core.sleep)(800);
        try {
          const log = monitor.log(handler);
          expected(log.calls).equalTo(times);
          for (let i = 0; i < times; i += 1) {
            expected(log.getCall(i).args).it(0).toBe("IntervalEvent");
          }
        } finally {
          trigger.stop();
        }
      }
    });
  }
});