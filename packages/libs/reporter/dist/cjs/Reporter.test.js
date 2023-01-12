"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  monitor,
  sim
} = _core.dogma.use(require("@akromio/doubles"));
const ReporterBase = _core.dogma.use(require("./Reporter"));
const $Reporter = class Reporter extends ReporterBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_86bd7e3ab03d263bfb0e64d43251d791___init__ instanceof Function) this._pvt_86bd7e3ab03d263bfb0e64d43251d791___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_86bd7e3ab03d263bfb0e64d43251d791___post__ instanceof Function) this._pvt_86bd7e3ab03d263bfb0e64d43251d791___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_86bd7e3ab03d263bfb0e64d43251d791___validate__ instanceof Function) this._pvt_86bd7e3ab03d263bfb0e64d43251d791___validate__(); /* c8 ignore stop */
  }
};

const Reporter = new Proxy($Reporter, {
  apply(receiver, self, args) {
    return new $Reporter(...args);
  }
});
Reporter.prototype._handleOpStart = function () {
  const self = this;
  {}
};
suite(__filename, () => {
  {
    const log = sim.stream.readable();
    const id = "my-id";
    const title = "my title";
    suite("start()", () => {
      {
        test("when already started, error must be raised", () => {
          {
            const reporter = Reporter({
              'log': log
            });
            const out = _core.dogma.peval(() => {
              return reporter.start().start();
            });
            expected(out).first.equalTo(false).second.equalTo(Error("Status expected to be initialized. Got: started."));
          }
        });
      }
    });
    suite("stream", () => {
      {
        test("when new available event, handleEvent() must be called", async () => {
          {
            const e = {
              ["id"]: id,
              ["type"]: "end"
            };
            const reporter = monitor(Reporter({
              'log': sim.stream.readable({
                'data': [_core.json.encode(e)]
              })
            }), {
              'method': "handleEvent"
            });
            reporter.start();
            0, await (0, _core.sleep)("100ms");
            const handleEvent = monitor.log(reporter, {
              'clear': true
            });
            expected(handleEvent.calls).equalTo(1);
            expected(handleEvent.call.args).first.equalTo(e);
          }
        });
      }
    });
    suite("handleEvent()", () => {
      {
        test("when unknown event, internal error must be raised", () => {
          {
            const reporter = Reporter({
              'log': log
            });
            const out = _core.dogma.peval(() => {
              return reporter.handleEvent({});
            });
            expected(out).first.equalTo(false).second.equalTo(Error("Unknown event: {}."));
          }
        });
      }
    });
    suite("handleEnd()", () => {
      {
        test("when called w/ empty stack, _handleEnd() must be called", () => {
          {
            const reporter = monitor(Reporter({
              'log': log
            }), {
              'method': "_handleEnd"
            });
            const e = {
              ["id"]: id,
              ["type"]: "end"
            };
            reporter.handleEvent(e);
            const _handleEnd = monitor.log(reporter, {
              'clear': true
            });
            expected(_handleEnd.calls).equalTo(1);
          }
        });
        test("when called w/ non-empty stack, internal error must be raised", () => {
          {
            const reporter = Reporter({
              'log': log
            });
            const opStartEvent = {
              ["id"]: id,
              ["type"]: "opStart",
              ["kind"]: "composite"
            };
            const endEvent = {
              ["id"]: id,
              ["type"]: "end"
            };
            const out = _core.dogma.peval(() => {
              return reporter.handleEvent(opStartEvent).handleEvent(endEvent);
            });
            expected(out).first.equalTo(false).second.equalTo(Error("Call stack should be empty when end reached."));
          }
        });
      }
    });
    suite("handleOpLog()", () => {
      {
        test("when called, _handleOpLog() must be called", () => {
          {
            const reporter = monitor(Reporter({
              'log': log
            }), {
              'method': "_handleOpLog"
            });
            const content = "my log content";
            const startEvent = {
              ["id"]: id,
              ["type"]: "opStart",
              ["kind"]: "simple",
              ["title"]: title
            };
            const logEvent = {
              ["id"]: id,
              ["type"]: "opLog",
              ["content"]: content
            };
            reporter.handleEvent(startEvent).handleEvent(logEvent);
            const _handleOpLog = monitor.log(reporter, {
              'clear': true
            });
            expected(_handleOpLog.calls).equalTo(1);
          }
        });
      }
    });
    suite("checkCallStack()", () => {
      {
        test("when top is different from new, internal error must be raised", () => {
          {
            const reporter = monitor(Reporter({
              'log': log
            }), {
              'method': "_handleEnd"
            });
            const e = {
              ["id"]: id,
              ["type"]: "opStart",
              ["kind"]: "composite"
            };
            const out = _core.dogma.peval(() => {
              return reporter.handleEvent(e).checkCallStack("another-id");
            });
            expected(out).first.equalTo(false).second.equalTo(Error("Call id expected: my-id. Got: another-id."));
          }
        });
      }
    });
  }
});