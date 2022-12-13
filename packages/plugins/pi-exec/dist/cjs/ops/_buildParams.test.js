"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const buildParams = _core.dogma.use(require("./_buildParams"));
suite(__filename, () => {
  {
    suite("params is text", () => {
      {
        test("when command is a text, {command, opts = {}} must be returned", () => {
          {
            const out = buildParams("ls -l");
            expected(out).equalTo({
              'command': "ls -l",
              'opts': {}
            });
          }
        });
      }
    });
    suite("params is list", () => {
      {
        test("when [command], {command, opts = {}} must be returned", () => {
          {
            const out = buildParams(["ls -l"]);
            expected(out).equalTo({
              'command': "ls -l",
              'opts': {}
            });
          }
        });
        test("when [command, arg], {command, opts = {}} must be returned", () => {
          {
            const out = buildParams(["ls", "-l"]);
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
      }
    });
    suite("params is map", () => {
      {
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
  }
});