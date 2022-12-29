"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  sim,
  monitor,
  method
} = _core.dogma.use(require("@akromio/doubles"));
const Ring = _core.dogma.use(require("../../ring/Ring"));
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
            const reqs = [_core.json.encode({
              ["ts"]: ts,
              ["assignTs"]: assignTs,
              ["registry"]: registry,
              ["catalog"]: catalog,
              ["job"]: "job1"
            }), _core.json.encode({
              ["ts"]: ts,
              ["assignTs"]: assignTs,
              ["registry"]: registry,
              ["catalog"]: catalog,
              ["job"]: "job2"
            }), _core.json.encode({
              ["ts"]: ts,
              ["assignTs"]: assignTs,
              ["registry"]: registry,
              ["catalog"]: catalog,
              ["job"]: "job3"
            })];
            const input = sim.stream.readable({
              'data': reqs
            });
            const points = [{
              ["stream"]: "runner1"
            }, {
              ["stream"]: "runner2"
            }];
            const ring = Ring({
              'points': points
            });
            const redis = monitor(sim({
              'xadd': method.resolves()
            }), {
              'method': "xadd"
            });
            const distributor = RedisStreamsDistributor({
              'input': input,
              'ring': ring,
              'redis': redis
            });
            distributor.start();
            0, await (0, _core.sleep)("100ms");
            const xadd = monitor.log(redis, {
              'clear': true
            });
            expected(xadd.calls).equalTo(3);
            expected(xadd.getCall(0).args).equalTo([_core.dogma.getItem(points, 0).stream, "*", "req", _core.dogma.getItem(reqs, 0)]);
            expected(xadd.getCall(1).args).equalTo([_core.dogma.getItem(points, 1).stream, "*", "req", _core.dogma.getItem(reqs, 1)]);
            expected(xadd.getCall(2).args).equalTo([_core.dogma.getItem(points, 0).stream, "*", "req", _core.dogma.getItem(reqs, 2)]);
          }
        });
      }
    });
  }
});