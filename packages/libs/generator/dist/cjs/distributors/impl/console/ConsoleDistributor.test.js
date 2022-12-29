"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  sim,
  monitor,
  fun,
  method
} = _core.dogma.use(require("@akromio/doubles"));
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
              ["assignee"]: "cavani3"
            }];
            const input = sim.stream.readable({
              'objectMode': true,
              'data': reqs
            });
            const console = monitor(fun());
            const distributor = ConsoleDistributor({
              'console': console,
              'input': input
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