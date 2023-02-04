"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const op = _core.dogma.use(require("./isReadable"));
suite(__filename, () => {
  {
    const path = "/my/file.txt";
    const content = "my content";
    suite("buildParams()", () => {
      {
        const buildParams = op.parameterizer;
        test("when path, {path} must be returned", () => {
          {
            const out = buildParams(path);
            expected(out).equalTo({
              'path': path
            });
          }
        });
        test("when [path], {path} must be returned", () => {
          {
            const out = buildParams([path]);
            expected(out).equalTo({
              'path': path
            });
          }
        });
        test("when map, the same map must be returned", () => {
          {
            const args = {
              ["path"]: path
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
            const params = {
              ["path"]: path
            };
            const out = buildTitle(params);
            expected(out).equalTo(`file: check whether '${path}' is readable`);
          }
        });
      }
    });
    suite("handler()", () => {
      {
        const handler = op.fun;
        test("when readable, true must be returned", async () => {
          {
            const out = (0, await handler({
              'params': {
                ["path"]: __filename
              }
            }));
            expected(out).equalTo(true);
          }
        });
        test("when not readable, false must be returned", async () => {
          {
            const out = (0, await handler({
              'params': {
                ["path"]: "unknown.txt"
              }
            }));
            expected(out).equalTo(false);
          }
        });
      }
    });
  }
});