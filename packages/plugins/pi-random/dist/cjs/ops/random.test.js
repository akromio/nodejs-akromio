"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const op = _core.dogma.use(require("./random"));
const buildParams = op.parameterizer;
const buildTitle = op.title;
const handle = op.fun;
suite(__filename, () => {
  {
    suite("buildParams()", () => {
      {
        test("when list, {start, stop} must be returned", () => {
          {
            const args = ["55000", "60000"];
            const out = buildParams(args);
            expected(out).equalTo({
              'start': (0, _core.num)(_core.dogma.getItem(args, 0)),
              'stop': (0, _core.num)(_core.dogma.getItem(args, 1))
            });
          }
        });
        test("when map, the same map must be returned", () => {
          {
            const args = {
              ["start"]: 55000,
              ["stop"]: "60000"
            };
            const out = buildParams(args);
            expected(out).equalTo({
              'start': args.start,
              'stop': (0, _core.num)(args.stop)
            });
          }
        });
      }
    });
    suite("buildTitle()", () => {
      {
        test("when called, a title must be returned", () => {
          {
            const start = 55000;
            const stop = 60000;
            const params = {
              ["start"]: start,
              ["stop"]: stop
            };
            const out = buildTitle(params);
            expected(out).equalTo(`random: pseudo-random number between ${start} and ${stop}`);
          }
        });
      }
    });
    suite("handle()", () => {
      {
        test("when called, a pseudo-random number must be returned", () => {
          {
            const start = 55000;
            const stop = 60000;
            const params = {
              ["start"]: start,
              ["stop"]: stop
            };
            const out = handle({
              ["params"]: params
            });
            expected(out).toBeNum().between(start, stop);
          }
        });
      }
    });
  }
});