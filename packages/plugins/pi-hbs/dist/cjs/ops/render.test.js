"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const op = _core.dogma.use(require("./render"));
suite(__filename, () => {
  {
    const buildParams = op.parameterizer;
    const handler = op.fun;
    const tmpl = "{{x}}{{y}}";
    const data = {
      ["x"]: 11,
      ["y"]: 22
    };
    const opts = {};
    suite("buildParams()", () => {
      {
        test("when args is list, {tmpl: args[0], data: args[1], opts: args[2]} must be returned", () => {
          {
            const args = [tmpl, data, opts];
            const out = buildParams(args);
            expected(out).equalTo({
              'tmpl': tmpl,
              'data': data,
              'opts': opts
            });
          }
        });
        test("when args is not list, args must be returned", () => {
          {
            const args = {
              ["tmpl"]: "{{x}}",
              ["x"]: 123
            };
            const out = buildParams(args);
            expected(out).sameAs(args);
          }
        });
      }
    });
    suite("handler()", () => {
      {
        test("when called, template must be rendered and its result returned", () => {
          {
            const params = {
              ["tmpl"]: tmpl,
              ["data"]: data,
              ["opts"]: opts
            };
            const out = handler({
              'params': params
            });
            expected(out).equalTo("1122");
          }
        });
      }
    });
  }
});