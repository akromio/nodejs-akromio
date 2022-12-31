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
              'sendCommand': method.resolves(),
              'connect': method.resolves(),
              'disconnect': method.resolves()
            }));
            const distributor = RedisStreamsDistributor({
              'input': input,
              'redis': redis
            });
            0, await distributor.start();
            const mlog = monitor.log(redis, {
              'clear': true
            });
            expected(mlog.calls).equalTo(5);
            expected(mlog.getCall(0).args).equalTo([]);
            expected(mlog.getCall(1).args).equalTo([["XADD", "cavani1", "*", "req", _core.json.encode(_core.dogma.getItem(reqs, 0))]]);
            expected(mlog.getCall(2).args).equalTo([["XADD", "cavani2", "*", "req", _core.json.encode(_core.dogma.getItem(reqs, 1))]]);
            expected(mlog.getCall(3).args).equalTo([["XADD", "cavani1", "*", "req", _core.json.encode(_core.dogma.getItem(reqs, 2))]]);
            expected(mlog.getCall(4).args).equalTo([]);
          }
        });
      }
    });
  }
});