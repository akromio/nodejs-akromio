"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const pi = _core.dogma.use(require("../../.."));
const op = pi.ops.command;
suite(__filename, () => {
  {
    suite("buildParams()", () => {
      {
        const buildParams = op.parameterizer;
        test("when command, {command, opts = {}} must be returned", () => {
          {
            const out = buildParams("ls -l");
            expected(out).equalTo({
              'command': "ls -l",
              'opts': {}
            });
          }
        });
        test("when [command], {command, opts = {}} must be returned", () => {
          {
            const out = buildParams(["ls -l"]);
            expected(out).equalTo({
              'command': "ls -l",
              'opts': {}
            });
          }
        });
        test("when [command, opts], {command, opts} must be returned", () => {
          {
            const out = buildParams(["ls -l", {
              ["workDir"]: "/"
            }]);
            expected(out).equalTo({
              'command': "ls -l",
              'opts': {
                ["workDir"]: "/"
              }
            });
          }
        });
        test("when {...}, the same map must be returned", () => {
          {
            const out = buildParams({
              ["command"]: "ls -l"
            });
            expected(out).equalTo({
              'command': "ls -l"
            });
          }
        });
      }
    });
    suite("buildTitle()", () => {
      {
        const buildTitle = op.title;
        test("when called, a title must be returned", () => {
          {
            const command = "ls -l";
            const params = {
              ["command"]: command
            };
            const out = buildTitle(params);
            expected(out).equalTo(`exec: run '${command}'`);
          }
        });
      }
    });
    suite("handler()", () => {
      {
        const handler = op.fun;
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
        test("when command run ok, result must be returned", async () => {
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