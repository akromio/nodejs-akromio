"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const pi = _core.dogma.use(require("../../.."));
const op = pi.ops.open;
suite(__filename, () => {
  {
    const buildParams = op.parameterizer;
    const buildTitle = op.title;
    suite("buildParams()", () => {
      {
        test("when text, {target} must be returned", () => {
          {
            const args = __filename;
            const out = buildParams(args);
            expected(out).equalTo({
              'target': args
            });
          }
        });
        test("when [target, opts], {target, opts} must be returned", () => {
          {
            const target = __filename;
            const opts = {
              ["wait"]: true
            };
            const out = buildParams([target, opts]);
            expected(out).equalTo({
              'target': target,
              'opts': opts
            });
          }
        });
        test("when map, args must be returned", () => {
          {
            const args = {
              ["target"]: __filename
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
            const target = __filename;
            const params = {
              ["target"]: target
            };
            const out = buildTitle(params);
            expected(out).equalTo(`xdg: open '${target}'`);
          }
        });
      }
    });
  }
});