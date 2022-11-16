"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const pi = _core.dogma.use(require("../../.."));
suite(__filename, () => {
  {
    const op = pi.ops.sleep;
    const buildParams = op.parameterizer;
    const buildTitle = op.title;
    const handler = op.fun;
    suite("buildParams()", () => {
      {
        test("when text, {duration} must be returned", () => {
          {
            const args = "3s";
            const out = buildParams(args);
            expected(out).equalTo({
              'duration': args
            });
          }
        });
        test("when [text], {duration} must be returned", () => {
          {
            const duration = "3s";
            const args = [duration];
            const out = buildParams(args);
            expected(out).equalTo({
              'duration': duration
            });
          }
        });
        test("when [text], {duration} must be returned", () => {
          {
            const duration = "3s";
            const args = {
              ["duration"]: duration
            };
            const out = buildParams(args);
            expected(out).sameAs(args);
          }
        });
      }
    });
    suite("buildTitle()", () => {
      {
        test("when called, a title must be returned", () => {
          {
            const duration = "3s";
            const params = {
              ["duration"]: duration
            };
            const out = buildTitle(params);
            expected(out).equalTo(`sleep: for '${duration}'`);
          }
        });
      }
    });
    suite("handler()", () => {
      {
        test("when called, sleep must be performed", async () => {
          {
            const duration = "1s";
            const started = (0, _core.timestamp)();
            const out = (0, await handler({
              'params': {
                ["duration"]: duration
              }
            }));
            const ended = (0, _core.timestamp)();
            expected(ended - started).greaterThanOrEqualTo(1000);
          }
        });
      }
    });
  }
});