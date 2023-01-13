"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  monitor,
  sim,
  fun
} = _core.dogma.use(require("@akromio/doubles"));
const LogReporter = _core.dogma.use(require("./LogReporter"));
suite(__filename, () => {
  {
    const log = sim.stream.readable();
    const ts = (0, _core.timestamp)().toISOString();
    const id = "my-id";
    const title = "my title";
    const runnerName = "runner#1";
    suite("_handleOpStart()", () => {
      {
        test("when e.level > nestingLevel, nothing to do", () => {
          {
            const print = monitor(fun.returns());
            const config = {
              ["print"]: print
            };
            const reporter = LogReporter({
              'log': log,
              'nestingLevel': 0,
              'config': config
            }).start();
            const e = {
              ["id"]: id,
              ["ts"]: ts,
              ["level"]: 100,
              ["runnerName"]: runnerName,
              ["type"]: "opStart",
              ["opType"]: "simple",
              ["title"]: title
            };
            reporter._handleOpStart(e);
            const plog = monitor.log(print, {
              'clear': true
            });
            expected(plog.calls).equalTo(0);
          }
        });
        test("when e.level <= nestingLevel, log must be performed", () => {
          {
            const print = monitor(fun.returns());
            const config = {
              ["print"]: print
            };
            const reporter = LogReporter({
              'log': log,
              'config': config
            }).start();
            const e = {
              ["id"]: id,
              ["ts"]: ts,
              ["runnerName"]: runnerName,
              ["type"]: "opStart",
              ["opType"]: "simple",
              ["title"]: title
            };
            reporter.handleEvent(e);
            const plog = monitor.log(print, {
              'clear': true
            });
            expected(plog.calls).equalTo(1);
            expected(plog.call.args).first.equalTo(`[${ts}] [${runnerName}] [${id}] '${title}'`);
          }
        });
      }
    });
    suite("_handleOpEnd()", () => {
      {
        const result = {
          ["kind"]: "ok",
          ["duration"]: 1234
        };
        test("when e.level > nestingLevel, nothing to do", () => {
          {
            const print = monitor(fun.returns());
            const config = {
              ["print"]: print
            };
            const reporter = LogReporter({
              'log': log,
              'config': config
            }).start();
            const e = {
              ["id"]: id,
              ["ts"]: ts,
              ["level"]: 100,
              ["runnerName"]: runnerName,
              ["type"]: "opEnd",
              ["opType"]: "simple",
              ["title"]: title,
              ["result"]: result
            };
            reporter._handleOpEnd(e);
            const plog = monitor.log(print, {
              'clear': true
            });
            expected(plog.calls).equalTo(0);
          }
        });
        test("when e.level <= nestingLevel, log must be performed", () => {
          {
            const print = monitor(fun.returns());
            const config = {
              ["print"]: print
            };
            const reporter = LogReporter({
              'log': log,
              'config': config
            }).start();
            const startEvent = {
              ["id"]: id,
              ["ts"]: ts,
              ["runnerName"]: runnerName,
              ["type"]: "opStart",
              ["opType"]: "simple",
              ["title"]: title
            };
            const endEvent = {
              ["id"]: id,
              ["ts"]: ts,
              ["runnerName"]: runnerName,
              ["type"]: "opEnd",
              ["opType"]: "simple",
              ["title"]: title,
              ["result"]: result
            };
            reporter.handleEvent(startEvent).handleEvent(endEvent);
            const plog = monitor.log(print, {
              'clear': true
            });
            expected(plog.calls).equalTo(2);
            expected(plog.secondCall.args).first.equalTo(`[${ts}] [${runnerName}] [${id}] '${title}' OK 1.234s`);
          }
        });
      }
    });
  }
});