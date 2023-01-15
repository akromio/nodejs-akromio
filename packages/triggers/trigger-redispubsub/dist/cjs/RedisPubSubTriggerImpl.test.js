"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  monitor,
  sim,
  fun,
  method
} = _core.dogma.use(require("@akromio/doubles"));
const RedisPubSubTriggerImpl = _core.dogma.use(require("./RedisPubSubTriggerImpl"));
suite(__filename, () => {
  {
    const channel = "cavani";
    suite("start()", () => {
      {
        test("when called, redis.connect() and redis.subscribe() must be called", async () => {
          {
            const handler = _core.dogma.nop();
            const redis = monitor(sim({
              'connect': method.resolves(),
              'subscribe': method.resolves()
            }));
            const trigger = RedisPubSubTriggerImpl({
              'redis': redis,
              'channel': channel
            });
            const out = trigger.start(handler);
            0, await (0, _core.sleep)("100ms");
            expected(out).sameAs(trigger).toHave({
              'fired': 0,
              'handler': handler
            });
            const rlog = monitor.log(redis, {
              'clear': true
            });
            expected(rlog.calls).equalTo(2);
            expected(rlog.firstCall.args).equalTo([]);
            expected(rlog.secondCall.args).first.equalTo(channel).second.toBeFn();
          }
        });
      }
    });
    suite("publish", () => {
      {
        test("when new message received, handler must be called", async () => {
          {
            let subHandler;
            const redis = sim({
              'connect': method.resolves(),
              'subscribe': method.invokes((ch, hdlr) => {
                /* c8 ignore next */_core.dogma.expect("ch", ch); /* c8 ignore next */
                _core.dogma.expect("hdlr", hdlr);
                {
                  subHandler = monitor(hdlr);
                }
              })
            });
            const trigger = RedisPubSubTriggerImpl({
              'redis': redis,
              'channel': channel
            });
            const call = {
              ["jobName"]: "job-name"
            };
            trigger.start(_core.dogma.nop());
            0, await (0, _core.sleep)("100ms");
            subHandler(_core.json.encode(call));
            const shlog = monitor.log(subHandler, {
              'clear': true
            });
            expected(shlog.calls).equalTo(1);
            expected(shlog.call.args).first.equalTo(_core.json.encode(call));
          }
        });
      }
    });
    suite("stop()", () => {
      {
        test("when called, redis.disconnect() must be called and instante niled", () => {
          {
            const redis = monitor(sim({
              'disconnect': method.returns()
            }), {
              'method': "disconnect"
            });
            const trigger = RedisPubSubTriggerImpl({
              'redis': redis,
              'channel': channel
            });
            const out = trigger.stop();
            expected(out).sameAs(trigger).toHave({
              'handler': null
            });
            const disconnect = monitor.log(redis, {
              'clear': true
            });
            expected(disconnect.calls).equalTo(1);
          }
        });
      }
    });
  }
});