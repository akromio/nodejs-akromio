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
    suite("fire()", () => {
      {
        test("when called, new message must be read from the stream", async () => {
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
              'group': "botnet",
              'consumer': "cavani1"
            });
            const out = (0, await trigger.fire());
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
      }
    });
  }
});