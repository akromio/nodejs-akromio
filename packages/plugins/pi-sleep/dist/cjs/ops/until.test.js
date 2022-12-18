"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const op = _core.dogma.use(require("./until"));
const buildParams = op.parameterizer;
const buildTitle = op.title;
const handle = op.fun;
suite(__filename, () => {
  {
    suite("buildParams()", () => {
      {
        test("when list, {datetime = timestamp(args[0])} must be returned", () => {
          {
            const args = [(0, _core.text)((0, _core.timestamp)())];
            const out = buildParams(args);
            expected(out.datetime).toBeTimestamp();
          }
        });
        test("when text, {datetime: timestamp} must be returned", () => {
          {
            const args = (0, _core.text)((0, _core.timestamp)());
            const out = buildParams(args);
            expected(out.datetime).toBeTimestamp();
          }
        });
        test("when num, {datetime: timestamp} must be returned", () => {
          {
            const args = (0, _core.timestamp)().valueOf();
            const out = buildParams(args);
            expected(out.datetime).toBeTimestamp();
          }
        });
        test("when map, {datetime: timestamp} must be returned", () => {
          {
            const args = {
              ["datetime"]: (0, _core.timestamp)().valueOf()
            };
            const out = buildParams(args);
            expected(out.datetime).toBeTimestamp();
          }
        });
      }
    });
    suite("buildTitle()", () => {
      {
        test("when called, title must be returned", () => {
          {
            const params = {
              ["datetime"]: (0, _core.timestamp)()
            };
            const out = buildTitle(params);
            expected(out).like("sleep: until '.{10,}'");
          }
        });
      }
    });
    suite("handle()", () => {
      {
        test("when called, wait performed", async () => {
          {
            const now = (0, _core.timestamp)();
            const delay = 750;
            const params = {
              ["datetime"]: (0, _core.timestamp)(now.valueOf() + delay)
            };
            0, await handle({
              ["params"]: params
            });
            expected((0, _core.timestamp)().valueOf()).greaterThanOrEqualTo(now.valueOf() + delay);
            expected();
          }
        });
      }
    });
  }
});