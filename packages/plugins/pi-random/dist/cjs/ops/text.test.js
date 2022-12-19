"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const op = _core.dogma.use(require("./text"));
const buildParams = op.parameterizer;
const buildTitle = op.title;
const handle = op.fun;
suite(__filename, () => {
  {
    suite("buildParams()", () => {
      {
        test("when text, {min = num(text), max = num(text)} must be returned", () => {
          {
            const args = "15";
            const out = buildParams(args);
            expected(out).equalTo({
              'min': (0, _core.num)(args),
              'max': (0, _core.num)(args)
            });
          }
        });
        test("when [len], {min = num(list[0]), max = num(list[0])} must be returned", () => {
          {
            const it = "15";
            const out = buildParams([it]);
            expected(out).equalTo({
              'min': (0, _core.num)(it),
              'max': (0, _core.num)(it)
            });
          }
        });
        test("when [min, max], {min = num(list[0]), max = num(list[1])} must be returned", () => {
          {
            const min = "15";
            const max = "20";
            const out = buildParams([min, max]);
            expected(out).equalTo({
              'min': (0, _core.num)(min),
              'max': (0, _core.num)(max)
            });
          }
        });
        test("when {min, max}, {min, max} must be returned", () => {
          {
            const min = "15";
            const max = "20";
            const out = buildParams({
              ["min"]: min,
              ["max"]: max
            });
            expected(out).equalTo({
              'min': (0, _core.num)(min),
              'max': (0, _core.num)(max)
            });
          }
        });
      }
    });
    suite("buildTitle()", () => {
      {
        test("when called, title must be returned", () => {
          {
            const params = {
              ["min"]: 10,
              ["max"]: 15
            };
            const out = buildTitle(params);
            expected(out).equalTo(`random: text with len between ${params.min} and ${params.max}`);
          }
        });
      }
    });
    suite("handle()", () => {
      {
        test("when called, a random text must be returned", () => {
          {
            const params = {
              ["min"]: 10,
              ["max"]: 15
            };
            const out = handle({
              ["params"]: params
            });
            expected(out).toBeText().len().between(params.min, params.max);
          }
        });
      }
    });
  }
});