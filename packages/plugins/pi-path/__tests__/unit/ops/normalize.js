"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const path = _core.dogma.use(require("path"));
const pi = _core.dogma.use(require("../../.."));
const op = pi.ops.normalize;
suite(__filename, () => {
  {
    const pathToNormalize = ".././my/file.txt";
    suite("buildParams()", () => {
      {
        const buildParams = op.parameterizer;
        test("when path, {path} must be returned", () => {
          {
            const out = buildParams(pathToNormalize);
            expected(out).equalTo({
              'path': pathToNormalize
            });
          }
        });
        test("when {path}, the same argument must be returned", () => {
          {
            const args = {
              ["path"]: pathToNormalize
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
        test("when called, the path must be normalized and returned", () => {
          {
            const params = {
              ["path"]: pathToNormalize
            };
            const out = handler({
              'params': params
            });
            expected(out).equalTo(path.normalize(pathToNormalize));
          }
        });
      }
    });
  }
});