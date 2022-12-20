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
        test("when [list], {array = list} must be returned", () => {
          {
            const array = [1, 2, 3];
            const args = [array];
            const out = buildParams(args);
            expected(out).equalTo({
              ["array"]: array
            });
          }
        });
        test("when list, {array = list} must be returned", () => {
          {
            const args = [1, 2, 3];
            const out = buildParams(args);
            expected(out).equalTo({
              'array': args
            });
          }
        });
        test("when {array: list}, {array} must be returned", () => {
          {
            const args = {
              ["array"]: [1, 2, 3]
            };
            const out = buildParams(args);
            expected(out).equalTo({
              'array': args.array
            });
          }
        });
        test("when {array: !list}, error must be raised", () => {
          {
            const args = {
              ["array"]: "one two three"
            };
            const out = _core.dogma.peval(() => {
              return buildParams(args);
            });
            expected(out).it(0).equalTo(false).it(1).equalTo(TypeError("random.from: array expected."));
          }
        });
      }
    });
    suite("buildTitle()", () => {
      {
        test("when called, title must be returned", () => {
          {
            const params = {
              ["array"]: [1, 2, 3]
            };
            const out = buildTitle(params);
            expected(out).equalTo("random: from list with len 3");
          }
        });
      }
    });
    suite("handle()", () => {
      {
        test("when called, an item must be returned", () => {
          {
            const params = {
              ["array"]: ["one", "two", "three"]
            };
            const out = handle({
              ["params"]: params
            });
            expected(params.array).toInclude(out);
          }
        });
      }
    });
  }
});