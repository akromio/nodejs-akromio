"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const op = _core.dogma.use(require("./from"));
const buildParams = op.parameterizer;
const buildTitle = op.title;
const handle = op.fun;
suite(__filename, () => {
  {
    suite("buildParams()", () => {
      {
        test("when [], {datetime = nil} must be returned", () => {
          {
            const args = [];
            const out = buildParams(args);
            expected(out).equalTo({
              'datetime': null
            });
          }
        });
        test("when [datetime], {datetime} must be returned", () => {
          {
            const args = ["2022-12-20T08:35"];
            const out = buildParams(args);
            expected(out).equalTo({
              'datetime': _core.dogma.getItem(args, 0)
            });
          }
        });
        test("when text, {datetime = text} must be returned", () => {
          {
            const args = "2022-12-20T08:36";
            const out = buildParams(args);
            expected(out).equalTo({
              'datetime': args
            });
          }
        });
        test("when {datetime is not text | num | nil}, error must be raised", () => {
          {
            const args = {
              ["datetime"]: true
            };
            const out = _core.dogma.peval(() => {
              return buildParams(args);
            });
            expected(out).it(0).equalTo(false).it(1).equalTo(TypeError("timestamp.from: datetime must be nothing, num or text. Got: true."));
          }
        });
      }
    });
    suite("buildTitle()", () => {
      {
        test("when called, title must be returned", () => {
          {
            const params = {
              ["datetime"]: "2022-12-20T08:40"
            };
            const out = buildTitle(params);
            expected(out).equalTo(`timestamp: from '${params.datetime}'`);
          }
        });
      }
    });
    suite("handle()", () => {
      {
        test("when nothing, now must be returned", () => {
          {
            const now = (0, _core.timestamp)().valueOf();
            const params = {};
            const out = handle({
              ["params"]: params
            });
            expected(out).toBeNum().greaterThanOrEqualTo(now);
          }
        });
        test("when datetime is num, its timestamp must be returned", () => {
          {
            const params = {
              ["datetime"]: 1671522130876
            };
            const out = handle({
              ["params"]: params
            });
            expected(out).equalTo(params.datetime);
          }
        });
        test("when hh:mm, today at the given time must be returned", () => {
          {
            const params = {
              ["datetime"]: "08:43"
            };
            const out = handle({
              ["params"]: params
            });
            const e = new Date([new Date().toISOString().slice(0, 10), '08:43']).valueOf();
            expected(out).equalTo(e);
          }
        });
        test("when datetime is text, the given time must be returned", () => {
          {
            const params = {
              ["datetime"]: "2022-12-20T09:00"
            };
            const out = handle({
              ["params"]: params
            });
            expected(out).equalTo(new Date(params.datetime).valueOf());
          }
        });
      }
    });
  }
});