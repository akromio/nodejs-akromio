"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  sim,
  monitor,
  method
} = _core.dogma.use(require("@akromio/doubles"));
const RedisStreamsDistributor = _core.dogma.use(require("./RedisStreamsDistributor"));
suite(__filename, () => {
  {
    const registry = "registry";
    const catalog = "catalog-name";
    suite("deliver()", () => {
      {
        test("when called, message must be sent to stream", async () => {
          {
            const ts = (0, _core.timestamp)().valueOf();
            const assignTs = ts;
            const reqs = [{
              ["ts"]: ts,
              ["assignTs"]: assignTs,
              ["registry"]: registry,
              ["catalog"]: catalog,
              ["job"]: "job1",
              ["assignee"]: "cavani1"
            }, {
              ["ts"]: ts,
              ["assignTs"]: assignTs,
              ["registry"]: registry,
              ["catalog"]: catalog,
              ["job"]: "job2",
              ["assignee"]: "cavani2"
            }, {
              ["ts"]: ts,
              ["assignTs"]: assignTs,
              ["registry"]: registry,
              ["catalog"]: catalog,
              ["job"]: "job3",
              ["assignee"]: "cavani1"
            }];
            const input = sim.stream.readable({
              'objectMode': true,
              'data': reqs
            });
            const redis = monitor(sim({
              'xadd': method.resolves()
            }), {
              'method': "xadd"
            });
            const distributor = RedisStreamsDistributor({
              'input': input,
              'redis': redis
            });
            distributor.start();
            0, await (0, _core.sleep)("100ms");
            const xadd = monitor.log(redis, {
              'clear': true
            });
            expected(xadd.calls).equalTo(3);
            expected(xadd.getCall(0).args).equalTo(["cavani1", "*", "req", _core.dogma.getItem(reqs, 0)]);
            expected(xadd.getCall(1).args).equalTo(["cavani2", "*", "req", _core.dogma.getItem(reqs, 1)]);
            expected(xadd.getCall(2).args).equalTo(["cavani1", "*", "req", _core.dogma.getItem(reqs, 2)]);
          }
        });
      }
    });
  }
});