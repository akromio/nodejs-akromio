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
    suite("deliver()", () => {
      {
        test("when called, message must be sent to stream", async () => {
          {
            const ts = (0, _core.timestamp)().valueOf();
            const assignTs = ts;
            const reqs = [{
              ["ts"]: ts,
              ["assignTs"]: assignTs,
              ["job"]: "job1",
              ["assignee"]: "cavani1"
            }, {
              ["ts"]: ts,
              ["assignTs"]: assignTs,
              ["job"]: "job2",
              ["assignee"]: "cavani2"
            }, {
              ["ts"]: ts,
              ["assignTs"]: assignTs,
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
            0, await distributor.start();
            const clog = monitor.log(console, {
              'clear': true
            });
            expected(clog.calls).equalTo(3);
            for (let i = 0; i < clog.calls; i += 1) {
              expected(_core.dogma.getItem(clog.getCall(i).args, 0)).like("\\[.+\\] cavani. ts:.+ assignTs:.+ job:job.");
            }
          }
        });
      }
    });
  }
});