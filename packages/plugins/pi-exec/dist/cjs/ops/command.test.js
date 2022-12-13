"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const op = _core.dogma.use(require("./command"));
const handler = op.fun;
suite(__filename, () => {
  {
    suite("handler()", () => {
      {
        test("when command run ok, result must be returned", async () => {
          {
            const ctx = {
              ["params"]: {
                ["command"]: "ls -l",
                ["opts"]: {
                  ["workDir"]: __dirname
                }
              }
            };
            const out = (0, await handler(ctx));
            expected(out).toBeMap().member("stdout").like("command").member("stderr").equalTo("");
          }
        });
        test("when command error, error must be raised", async () => {
          {
            const ctx = {
              ["params"]: {
                ["command"]: "lslslsls -l",
                ["opts"]: {}
              }
            };
            const out = await _core.dogma.pawait(() => handler(ctx));
            expected(out).it(0).equalTo(false).it(1).like("Command failed");
          }
        });
      }
    });
  }
});