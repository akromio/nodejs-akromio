"use strict";

var _core = require("@dogmalang/core");
const fs = _core.dogma.use(require("fs/promises"));
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  monitor
} = _core.dogma.use(require("@akromio/doubles"));
const op = _core.dogma.use(require("./remove"));
suite(__filename, () => {
  {
    const path = "/my/file.txt";
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
        test("when map, that map must be returned", () => {
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
            const out = buildTitle({
              ["path"]: path
            });
            expected(out).equalTo(`file: remove '${path}'`);
          }
        });
      }
    });
    suite("handler()", () => {
      {
        const handler = op.fun;
        test("when existing, the file must be removed", async () => {
          {
            const originalUnlink = fs.unlink;
            fs.unlink = monitor(_core.dogma.nop());
            const out = await _core.dogma.pawait(() => handler({
              'params': {
                ["path"]: path
              }
            }));
            try {
              const log = monitor.log(fs.unlink);
              expected(out).it(0).equalTo(true);
              expected(log).toHaveLen(1);
              expected(log.calledWith([path])).equalTo(1);
            } finally {
              monitor.clearAll();
              fs.unlink = originalUnlink;
            }
          }
        });
      }
    });
  }
});