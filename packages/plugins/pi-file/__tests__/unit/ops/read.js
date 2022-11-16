"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const pi = _core.dogma.use(require("../../.."));
const op = pi.ops.read;
suite(__filename, () => {
  {
    const path = "/my/file.txt";
    suite("buildParams()", () => {
      {
        const buildParams = op.parameterizer;
        test("when path, {path, opts= {}} must be returned", () => {
          {
            const out = buildParams(path);
            expected(out).equalTo({
              'path': path,
              'opts': {}
            });
          }
        });
        test("when [path], {path, opts = {}} must be returned", () => {
          {
            const out = buildParams([path]);
            expected(out).equalTo({
              'path': path,
              'opts': {}
            });
          }
        });
        test("when [path, opts], {path, opts} must be returned", () => {
          {
            const opts = {
              ["encoding"]: "utf8"
            };
            const out = buildParams([path, opts]);
            expected(out).equalTo({
              'path': path,
              'opts': opts
            });
          }
        });
        test("when map, that map must be returned", () => {
          {
            const opts = {
              ["encoding"]: "utf8"
            };
            const args = {
              ["path"]: path,
              ["opts"]: opts
            };
            const out = buildParams(args);
            expected(out).sameAs(args);
          }
        });
      }
    });
    suite("buildTitle()", () => {
      {
        const buildTitle = op.title;
        test("when called, a title must be returned", () => {
          {
            const out = buildTitle({
              ["path"]: path,
              ["opts"]: {}
            });
            expected(out).equalTo(`file: read content of '${path}'`);
          }
        });
      }
    });
    suite("handler()", () => {
      {
        const handler = op.fun;
        test("when accessible file, its content must be returned", async () => {
          {
            const path = __filename;
            const out = (0, await handler({
              'params': {
                ["path"]: path,
                ["opts"]: "utf8"
              }
            }));
            expected(out).like("buildTitle");
          }
        });
        test("when non-accessible file, error must be raised", async () => {
          {
            const path = "unknown";
            const out = await _core.dogma.pawait(() => handler({
              'params': {
                ["path"]: path,
                ["opts"]: {}
              }
            }));
            expected(out).it(0).equalTo(false).it(1).like("no such file");
          }
        });
      }
    });
  }
});