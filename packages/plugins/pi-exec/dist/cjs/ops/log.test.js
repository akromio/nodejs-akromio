"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  fun,
  monitor
} = _core.dogma.use(require("@akromio/doubles"));
const op = _core.dogma.use(require("./log"));
const handler = op.fun;
suite(__filename, () => {
  {
    suite("handler()", () => {
      {
        test("when command error, 1 must be returned", async () => {
          {
            const log = monitor(fun());
            const ctx = {
              ["log"]: log,
              ["params"]: {
                ["command"]: "lslslsls -l",
                ["opts"]: {}
              }
            };
            const out = await _core.dogma.pawait(() => handler(ctx));
            expected(out).it(0).equalTo(false).it(1).equalTo(1);
            const mlog = monitor.log(log, {
              'clear': true
            });
            expected(mlog.calls).equalTo(1);
            expected(_core.dogma.getItem(mlog.call.args, 0)).like("ENOENT");
          }
        });
        test("when textual command run ok, 0 must be returned", async () => {
          {
            const log = monitor(fun());
            const ctx = {
              ["log"]: log,
              ["params"]: {
                ["command"]: "ls -l",
                ["opts"]: {
                  ["workDir"]: __dirname
                }
              }
            };
            const out = (0, await handler(ctx));
            expected(out).equalTo(0);
            const mlog = monitor.log(log, {
              'clear': true
            });
            expected(mlog.calls).equalTo(1);
            expected((0, _core.text)(mlog.call.args)).toContain("_buildParams.js");
          }
        });
        test("when list command run ok, 0 must be returned", async () => {
          {
            const log = monitor(fun());
            const ctx = {
              ["log"]: log,
              ["params"]: {
                ["command"]: ["ls", "-l"],
                ["opts"]: {
                  ["workDir"]: __dirname
                }
              }
            };
            const out = (0, await handler(ctx));
            expected(out).equalTo(0);
            const mlog = monitor.log(log, {
              'clear': true
            });
            expected(mlog.calls).equalTo(1);
            expected((0, _core.text)(mlog.call.args)).toContain("_buildParams.js");
          }
        });
        test("when command prints on error, this error must be sent to log", async () => {
          {
            const log = monitor(fun());
            const ctx = {
              ["log"]: log,
              ["params"]: {
                ["command"]: "node -e console.error('my-error')",
                ["opts"]: {}
              }
            };
            const out = (0, await handler(ctx));
            expected(out).equalTo(0);
            const mlog = monitor.log(log, {
              'clear': true
            });
            expected(mlog.calls).equalTo(1);
            expected((0, _core.text)(mlog.call.args)).toContain("my-error");
          }
        });
        test("when command exits with 1, error must be raised", async () => {
          {
            const ctx = {
              ["log"]: fun(),
              ["params"]: {
                ["command"]: "node -e process.exit(1)",
                ["opts"]: {}
              }
            };
            const out = await _core.dogma.pawait(() => handler(ctx));
            expected(out).it(0).equalTo(false).it(1).equalTo(1);
          }
        });
      }
    });
  }
});