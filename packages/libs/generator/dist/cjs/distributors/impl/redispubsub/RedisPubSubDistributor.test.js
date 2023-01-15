"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  sim,
  monitor,
  method
} = _core.dogma.use(require("@akromio/doubles"));
const RedisPubSubDistributor = _core.dogma.use(require("./RedisPubSubDistributor"));
suite(__filename, () => {
  {
    suite("deliver()", () => {
      {
        test("when called, redis.publish() must be called", async () => {
          {
            const ts = (0, _core.timestamp)().valueOf();
            const assignTs = ts;
            const req = {
              ["ts"]: ts,
              ["assignTs"]: assignTs,
              ["job"]: "job1",
              ["assignee"]: "cavani1"
            };
            const redis = monitor(sim({
              'connect': method.resolves(),
              'publish': method.resolves(),
              'disconnect': method.resolves()
            }), {
              'method': "publish"
            });
            const input = sim.stream.readable({
              'objectMode': true
            });
            const distributor = RedisPubSubDistributor({
              'input': input,
              'redis': redis
            });
            0, await distributor.start();
            0, await distributor.deliver(req);
            const dlog = monitor.log(redis, {
              'clear': true
            });
            expected(dlog.calls).equalTo(1);
            expected(dlog.firstCall.args).equalTo([req.assignee, _core.json.encode(req)]);
          }
        });
      }
    });
  }
});