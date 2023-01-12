"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  monitor,
  sim,
  fun
} = _core.dogma.use(require("@akromio/doubles"));
const ConsoleReporter = _core.dogma.use(require("./ConsoleReporter"));
suite(__filename, () => {
  {
    const log = sim.stream.readable();
    const id = "my-id";
    const title = "my title";
    suite("_handleOpStart()", () => {
      {
        test("when simple, echo must be called", () => {
          {
            const echo = monitor(fun.returns());
            const print = monitor(fun.returns());
            const config = {
              ["echo"]: echo,
              ["print"]: print
            };
            const reporter = ConsoleReporter({
              'log': log,
              'config': config
            }).start();
            const e = {
              ["type"]: "opStart",
              ["opType"]: "simple",
              ["title"]: title
            };
            reporter.handleEvent(e);
            const elog = monitor.log(echo, {
              'clear': true
            });
            expected(elog.calls).equalTo(1);
            expected(elog.call.args).equalTo(["- my title"]);
            const plog = monitor.log(print, {
              'clear': true
            });
            expected(plog.calls).equalTo(0);
          }
        });
        test("when composite, print must be called", () => {
          {
            const echo = monitor(fun.returns());
            const print = monitor(fun.returns());
            const config = {
              ["echo"]: echo,
              ["print"]: print
            };
            const reporter = ConsoleReporter({
              'log': log,
              'config': config
            }).start();
            const e = {
              ["type"]: "opStart",
              ["opType"]: "composite",
              ["title"]: title
            };
            reporter.handleEvent(e);
            const elog = monitor.log(echo, {
              'clear': true
            });
            expected(elog.calls).equalTo(0);
            const plog = monitor.log(print, {
              'clear': true
            });
            expected(plog.calls).equalTo(1);
            expected(plog.call.args).first.toStartWith(">").toInclude("my title");
          }
        });
      }
    });
    suite("_handleOpEnd()", () => {
      {
        test("when simple, print must be called", () => {
          {
            const echo = monitor(fun.returns());
            const print = monitor(fun.returns());
            const config = {
              ["echo"]: echo,
              ["print"]: print
            };
            const reporter = ConsoleReporter({
              'log': log,
              'config': config
            }).start();
            const startEvent = {
              ["id"]: id,
              ["type"]: "opStart",
              ["opType"]: "simple",
              ["title"]: title
            };
            const endEvent = {
              ["id"]: id,
              ["type"]: "opEnd",
              ["opType"]: "simple",
              ["result"]: {
                ["kind"]: "ok",
                ["duration"]: 12
              }
            };
            reporter.handleEvent(startEvent).handleEvent(endEvent);
            const elog = monitor.log(echo, {
              'clear': true
            });
            expected(elog.calls).equalTo(1);
            const plog = monitor.log(print, {
              'clear': true
            });
            expected(plog.calls).equalTo(1);
            expected(plog.call.args).first.toStartWith(" ").toInclude("ok").toInclude("12 ms");
          }
        });
        test("when composite, nothing to do", () => {
          {
            const echo = monitor(fun.returns());
            const print = monitor(fun.returns());
            const config = {
              ["echo"]: echo,
              ["print"]: print
            };
            const reporter = ConsoleReporter({
              'log': log,
              'config': config
            }).start();
            const startEvent = {
              ["id"]: id,
              ["type"]: "opStart",
              ["opType"]: "composite",
              ["title"]: title
            };
            const endEvent = {
              ["id"]: id,
              ["type"]: "opEnd",
              ["opType"]: "composite",
              ["result"]: {}
            };
            reporter.handleEvent(startEvent).handleEvent(endEvent);
            const elog = monitor.log(echo, {
              'clear': true
            });
            expected(elog.calls).equalTo(0);
            const plog = monitor.log(print, {
              'clear': true
            });
            expected(plog.calls).equalTo(1);
          }
        });
      }
    });
    suite("_handleOpLog()", () => {
      {
        test("when logged, log content must be shown", () => {
          {
            const echo = monitor(fun.returns());
            const print = monitor(fun.returns());
            const config = {
              ["echo"]: echo,
              ["print"]: print
            };
            const content = "my log content";
            const opType = "simple";
            const startEvent = {
              ["id"]: id,
              ["type"]: "opStart",
              ["opType"]: opType,
              ["title"]: title
            };
            const logEvent = {
              ["id"]: id,
              ["type"]: "opLog",
              ["opType"]: opType,
              ["content"]: content
            };
            const endEvent = {
              ["id"]: id,
              ["type"]: "opEnd",
              ["opType"]: opType,
              ["result"]: {
                ["kind"]: "ok",
                ["duration"]: 12
              }
            };
            const reporter = ConsoleReporter({
              'log': log,
              'config': config
            }).start();
            reporter.handleEvent(startEvent).handleEvent(logEvent).handleEvent(endEvent);
            const elog = monitor.log(echo, {
              'clear': true
            });
            expected(elog.calls).equalTo(2);
            expected(elog.firstCall.args).first.toInclude(`- ${title}`);
            expected(elog.secondCall.args).first.toInclude("↳");
            const plog = monitor.log(print, {
              'clear': true
            });
            expected(plog.calls).equalTo(3);
            expected(plog.firstCall.args).first.toInclude("⬎");
            expected(plog.secondCall.args).first.toInclude(content);
            expected(plog.thirdCall.args).first.toInclude("ok").toInclude("12 ms");
          }
        });
        test("when log content ends with eol, echo must be used instead print", () => {
          {
            const echo = monitor(fun.returns());
            const print = monitor(fun.returns());
            const config = {
              ["echo"]: echo,
              ["print"]: print
            };
            const content = "my log content\n";
            const opType = "simple";
            const startEvent = {
              ["id"]: id,
              ["type"]: "opStart",
              ["opType"]: opType,
              ["title"]: title
            };
            const logEvent = {
              ["id"]: id,
              ["type"]: "opLog",
              ["opType"]: opType,
              ["content"]: content
            };
            const endEvent = {
              ["id"]: id,
              ["type"]: "opEnd",
              ["opType"]: opType,
              ["result"]: {
                ["kind"]: "failed",
                ["duration"]: 1234567
              }
            };
            const reporter = ConsoleReporter({
              'log': log,
              'config': config
            }).start();
            reporter.handleEvent(startEvent).handleEvent(logEvent).handleEvent(endEvent);
            const elog = monitor.log(echo, {
              'clear': true
            });
            expected(elog.calls).equalTo(3);
            expected(elog.firstCall.args).first.toInclude(`- ${title}`);
            expected(elog.secondCall.args).first.toInclude(_core.dogma.getSlice(content, 0, -2));
            const plog = monitor.log(print, {
              'clear': true
            });
            expected(plog.calls).equalTo(2);
            expected(plog.firstCall.args).first.toInclude("⬎");
            expected(plog.secondCall.args).first.toInclude("failed").toInclude("20 m, 34.567 s");
          }
        });
      }
    });
  }
});