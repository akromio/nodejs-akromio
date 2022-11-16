"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const path = _core.dogma.use(require("path"));
const pi = _core.dogma.use(require("../../.."));
const op = pi.ops.join;
suite(__filename, () => {
  {
    const segments = ["one", "two", "three"];
    suite("buildParams()", () => {
      {
        const buildParams = op.parameterizer;
        test("when [...segments], {segments} must be returned", () => {
          {
            const out = buildParams(segments);
            expected(out).equalTo({
              'segments': segments
            });
          }
        });
        test("when {segments}, the same argument must be returned", () => {
          {
            const args = {
              ["segments"]: segments
            };
            const out = buildParams(args);
            expected(out).sameAs(args);
          }
        });
      }
    });
    suite("handler()", () => {
      {
        const handler = op.fun;
        test("when called, the path must be returned", () => {
          {
            const params = {
              ["segments"]: segments
            };
            const out = handler({
              'params': params
            });
            expected(out).equalTo(path.join(...segments));
          }
        });
      }
    });
  }
});