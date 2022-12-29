"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  sim,
  monitor,
  fun,
  method
} = _core.dogma.use(require("@akromio/doubles"));
const Ring = _core.dogma.use(require("../../ring/Ring"));
const ConsoleDistributor = _core.dogma.use(require("./ConsoleDistributor"));
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
              ["job"]: "job1"
            }, {
              ["ts"]: ts,
              ["assignTs"]: assignTs,
              ["registry"]: registry,
              ["catalog"]: catalog,
              ["job"]: "job2"
            }, {
              ["ts"]: ts,
              ["assignTs"]: assignTs,
              ["registry"]: registry,
              ["catalog"]: catalog,
              ["job"]: "job3"
            }];
            const input = sim.stream.readable({
              'objectMode': true,
              'data': reqs
            });
            const points = [{
              ["id"]: "cavani1"
            }, {
              ["id"]: "cavani2"
            }];
            const ring = Ring({
              'points': points
            });
            const console = monitor(fun());
            const distributor = ConsoleDistributor({
              'console': console,
              'input': input,
              'ring': ring
            });
            distributor.start();
            0, await (0, _core.sleep)("1s");
            const clog = monitor.log(console, {
              'clear': true
            });
            expected(clog.calls).equalTo(3);
            for (let i = 0; i < clog.calls; i += 1) {
              expected(_core.dogma.getItem(clog.getCall(i).args, 0)).like("\\[.+\\] cavani. ts:.+ assignTs:.+ registry:.+ catalog:.+ job:job.");
            }
          }
        });
      }
    });
  }
});