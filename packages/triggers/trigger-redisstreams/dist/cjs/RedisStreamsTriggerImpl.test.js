"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  monitor,
  sim,
  method
} = _core.dogma.use(require("@akromio/doubles"));
const RedisStreamsTriggerImpl = _core.dogma.use(require("./RedisStreamsTriggerImpl"));
suite(__filename, () => {
  {
    const group = "botnet";
    const consumer = "cavani";
    suite("start()", () => {
      {
        test("when called, redis.connect() must be called and instance initialized", () => {
          {
            const stream = "cavani";
            const handler = _core.dogma.nop();
            const redis = monitor(sim({
              'connect': method.returns()
            }), {
              'method': "connect"
            });
            const trigger = RedisStreamsTriggerImpl({
              'redis': redis,
              'stream': stream,
              'group': group,
              'consumer': consumer
            });
            const out = trigger.start(handler);
            expected(out).sameAs(trigger).toHave({
              'fired': 0,
              'handler': handler
            });
            const connect = monitor.log(redis, {
              'clear': true
            });
            expected(connect.calls).equalTo(1);
          }
        });
      }
    });
    suite("stop()", () => {
      {
        test("when called, redis.disconnect() must be called and instante niled", () => {
          {
            const stream = "cavani";
            const redis = monitor(sim({
              'disconnect': method.returns()
            }), {
              'method': "disconnect"
            });
            const trigger = RedisStreamsTriggerImpl({
              'redis': redis,
              'stream': stream,
              'group': group,
              'consumer': consumer
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
    suite("gather()", () => {
      {
        test("when called and unavailable data, no handler call muyst be performed", async () => {
          {
            const stream = "cavani";
            const handler = monitor(method.resolves());
            const redis = sim({
              'connect': method.returns(),
              'sendCommand': method.resolves([])
            });
            const trigger = RedisStreamsTriggerImpl({
              'redis': redis,
              'handler': handler,
              'stream': stream,
              'group': group,
              'consumer': consumer
            });
            const out = (0, await trigger.gather(5));
            expected(out).toBeNil();
            const hlog = monitor.log(handler, {
              'clear': true
            });
            expected(hlog.calls).equalTo(0);
          }
        });
        test("when called and available data, new items must be read from the Redis stream", async () => {
          {
            const stream = "cavani";
            const job = {
              ["job"]: "backup",
              ["args"]: null,
              ["assignTs"]: 1673076355206,
              ["assignee"]: "cavani",
              ["ts"]: 1673076355206
            };
            const resp = [[stream, [["1673076355208-1", ["req", _core.json.encode(job)]]]]];
            const handler = monitor(method.resolves());
            const redis = sim({
              'connect': method.returns(),
              'sendCommand': method.resolves(resp)
            });
            const trigger = RedisStreamsTriggerImpl({
              'redis': redis,
              'handler': handler,
              'stream': stream,
              'group': group,
              'consumer': consumer
            });
            const out = (0, await trigger.gather(5));
            expected(out).toBeNil();
            const hlog = monitor.log(handler, {
              'clear': true
            });
            expected(hlog.calls).equalTo(1);
            expected(hlog.getCall(0).args).it(0).equalTo({
              'last': false,
              'call': {
                ["jobName"]: job.job,
                ["args"]: job.args
              }
            });
          }
        });
        test("when times set and reached, last must be set", async () => {
          {
            const stream = "cavani";
            const job = {
              ["job"]: "backup",
              ["args"]: null,
              ["assignTs"]: 1673076355206,
              ["assignee"]: "cavani",
              ["ts"]: 1673076355206
            };
            const resp = [[stream, [["1673076355208-1", ["req", _core.json.encode(job)]]]]];
            const handler = monitor(method.resolves());
            const redis = sim({
              'connect': method.returns(),
              'sendCommand': method.resolves(resp)
            });
            const trigger = RedisStreamsTriggerImpl({
              'redis': redis,
              'times': 1,
              'handler': handler,
              'stream': stream,
              'group': group,
              'consumer': consumer
            });
            const out = (0, await trigger.gather(5));
            expected(out).toBeNil();
            const hlog = monitor.log(handler, {
              'clear': true
            });
            expected(hlog.calls).equalTo(1);
            expected(hlog.getCall(0).args).it(0).equalTo({
              'last': true,
              'call': {
                ["jobName"]: job.job,
                ["args"]: job.args
              }
            });
          }
        });
      }
    });
  }
});