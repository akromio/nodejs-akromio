"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const pi = _core.dogma.use(require("../../.."));
suite(__filename, () => {
  {
    const op = pi.ops.banner;
    const buildParams = op.parameterizer;
    const buildTitle = op.title;
    suite("buildParams()", () => {
      {
        test("when args, {value = args} must be returned", () => {
          {
            const args = "hola!";
            const out = buildParams(args);
            expected(out).equalTo({
              'value': args
            });
          }
        });
      }
    });
    suite("buildTitle()", () => {
      {
        test("when called, a text title must be returned", () => {
          {
            const params = {
              ["value"]: "ciao!"
            };
            const out = buildTitle(params);
            expected(out).like("^banner: .*ciao!.*");
          }
        });
      }
    });
  }
});