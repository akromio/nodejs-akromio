"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const op = _core.dogma.use(require("./replace"));
suite(__filename, () => {
  {
    const buildParams = op.parameterizer;
    const buildTitle = op.title;
    const handler = op.fun;
    const str = "onetwothree";
    const substr = "two";
    const newSubstr = "2";
    suite("buildParams()", () => {
      {
        test("when args is list, {str, substr, newSubstr} must be returned", () => {
          {
            const args = [str, substr, newSubstr];
            const out = buildParams(args);
            expected(out).equalTo({
              'str': str,
              'substr': substr,
              'newSubstr': newSubstr
            });
          }
        });
        test("when args is map, args must be returned", () => {
          {
            const args = {
              ["str"]: str,
              ["substr"]: substr,
              ["newSubstr"]: newSubstr
            };
            const out = buildParams(args);
            expected(out).sameAs(args);
          }
        });
      }
    });
    suite("buildTitle()", () => {
      {
        test("when called, title must be returned", () => {
          {
            const params = {
              ["str"]: str,
              ["substr"]: substr,
              ["newSubstr"]: newSubstr
            };
            const out = buildTitle(params);
            expected(out).equalTo(`text: replace '${substr}' by '${newSubstr}'`);
          }
        });
      }
    });
    suite("handler()", () => {
      {
        test("when included, substr must be replaced and new text returned", () => {
          {
            const params = {
              ["str"]: str,
              ["substr"]: substr,
              ["newSubstr"]: newSubstr
            };
            const ctx = {
              ["params"]: params
            };
            const out = handler(ctx);
            expected(out).equalTo("one2three");
          }
        });
        test("when not included, str must be returned", () => {
          {
            const params = {
              ["str"]: str,
              ["substr"]: "four",
              ["newSubstr"]: "4"
            };
            const ctx = {
              ["params"]: params
            };
            const out = handler(ctx);
            expected(out).equalTo(str);
          }
        });
      }
    });
  }
});