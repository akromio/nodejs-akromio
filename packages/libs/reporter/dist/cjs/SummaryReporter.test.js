"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  sim
} = _core.dogma.use(require("@akromio/doubles"));
const SummaryReporterBase = _core.dogma.use(require("./SummaryReporter"));
const $SummaryReporter = class SummaryReporter extends SummaryReporterBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_b2d93af2a82fd8211dcc50f99ccb1539___init__ instanceof Function) this._pvt_b2d93af2a82fd8211dcc50f99ccb1539___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_b2d93af2a82fd8211dcc50f99ccb1539___post__ instanceof Function) this._pvt_b2d93af2a82fd8211dcc50f99ccb1539___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_b2d93af2a82fd8211dcc50f99ccb1539___validate__ instanceof Function) this._pvt_b2d93af2a82fd8211dcc50f99ccb1539___validate__(); /* c8 ignore stop */
  }
};

const SummaryReporter = new Proxy($SummaryReporter, {
  apply(receiver, self, args) {
    return new $SummaryReporter(...args);
  }
});
suite(__filename, () => {
  {
    const id = "my-id";
    const log = sim.stream.readable();
    suite("_handleOpEnd", () => {
      {
        test("when called, counters must be updated", () => {
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
            const reporter = SummaryReporter({
              'log': log
            });
            reporter.handleEvent(okStartEvent).handleEvent(okEndEvent).handleEvent(failedStartEvent).handleEvent(failedEndEvent);
            expected(reporter).toHave({
              'ok': 1,
              'failed': 1
            });
          }
        });
      }
    });
  }
});