"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const op = _core.dogma.use(require("./range"));
suite(__filename, () => {
  {
    const buildParams = op.parameterizer;
    const buildTitle = op.title;
    const handler = op.fun;
    suite("buildParams()", () => {
      {
        test("when list, {start, stop} must be returned", () => {
          {
            const args = [1, 5];
            const out = buildParams(args);
            expected(out).equalTo({
              'start': 1,
              'stop': 5
            });
          }
        });
        test("when map, map must be returned", () => {
          {
            const args = {
              ["start"]: 1,
              ["stop"]: 5
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
            const start = 1;
            const stop = 5;
            const params = {
              ["start"]: start,
              ["stop"]: stop
            };
            const out = buildTitle(params);
            expected(out).equalTo(`range: [${start}, ${stop}]`);
          }
        });
      }
    });
    suite("handler()", () => {
      {
        test("when called, list must be performed", async () => {
          {
            const out = (0, await handler({
              'params': {
                ["start"]: 1,
                ["stop"]: 5
              }
            }));
            expected(out).equalTo([1, 2, 3, 4, 5]);
          }
        });
      }
    });
  }
});