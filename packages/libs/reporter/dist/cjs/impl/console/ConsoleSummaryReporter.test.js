"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  monitor,
  sim,
  fun
} = _core.dogma.use(require("@akromio/doubles"));
const ConsoleSummaryReporter = _core.dogma.use(require("./ConsoleSummaryReporter"));
suite(__filename, () => {
  {
    const id = "my-id";
    const log = sim.stream.readable();
    suite("_handleEnd", () => {
      {
        test("when called, summary must be printed", () => {
          {
            const okStartEvent = {
              ["id"]: id,
              ["type"]: "opStart",
              ["opType"]: "simple"
            };
            const okEndEvent = {
              ["id"]: id,
              ["type"]: "opEnd",
              ["opType"]: "simple",
              ["result"]: {
                ["kind"]: "ok"
              }
            };
            const failedStartEvent = {
              ["id"]: id,
              ["type"]: "opStart",
              ["opType"]: "simple"
            };
            const failedEndEvent = {
              ["id"]: id,
              ["type"]: "opEnd",
              ["opType"]: "simple",
              ["result"]: {
                ["kind"]: "failed"
              }
            };
            const endEvent = {
              ["id"]: id,
              ["type"]: "end"
            };
            const print = monitor(fun.returns());
            const reporter = ConsoleSummaryReporter({
              'log': log,
              'config': {
                ["print"]: print
              }
            });
            reporter.handleEvent(okStartEvent).handleEvent(okEndEvent).handleEvent(failedStartEvent).handleEvent(failedEndEvent).handleEvent(endEvent);
            const plog = monitor.log(print, {
              'clear': true
            });
            expected(plog.calls).equalTo(3);
            expected(plog.firstCall.args).first.equalTo("\nSummary:");
            expected(plog.secondCall.args).first.toInclude("ok").toInclude("1");
            expected(plog.thirdCall.args).first.toInclude("failed").toInclude("1");
          }
        });
      }
    });
  }
});