"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const fs = _core.dogma.use(require("fs/promises"));
const {
  monitor
} = _core.dogma.use(require("@akromio/doubles"));
const op = _core.dogma.use(require("./write"));
suite(__filename, () => {
  {
    const path = "/my/file.txt";
    const content = "my content";
    suite("buildParams()", () => {
      {
        const buildParams = op.parameterizer;
        test("when [content, path], {path, content, opts = {}} must be returned", () => {
          {
            const out = buildParams([content, path]);
            expected(out).toHave({
              'content': content,
              'opts': {}
            });
            expected.path(out.path).equalTo(path);
          }
        });
        test("when [content, path, opts], {path, content, opts} must be returned", () => {
          {
            const opts = {
              ["encoding"]: "utf8"
            };
            const out = buildParams([content, path, opts]);
            expected(out).toHave({
              'content': content,
              'opts': opts
            });
            expected.path(out.path).equalTo(path);
          }
        });
        test("when map, the same map must be returned", () => {
          {
            const opts = {
              ["encoding"]: "utf8"
            };
            const args = {
              ["path"]: path,
              ["content"]: content,
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
            const params = {
              ["path"]: path,
              ["content"]: content
            };
            const out = buildTitle(params);
            expected(out).equalTo(`file: write content to '${path}'`);
          }
        });
      }
    });
    suite("handler()", () => {
      {
        const handler = op.fun;
        test("when called, the file must be written", async () => {
          {
            const originalWriteFile = fs.writeFile;
            fs.writeFile = monitor(_core.dogma.nop());
            const opts = {
              ["encoding"]: "utf8"
            };
            const out = await _core.dogma.pawait(() => handler({
              'params': {
                ["path"]: path,
                ["content"]: content,
                ["opts"]: opts
              }
            }));
            try {
              const log = monitor.log(fs.writeFile);
              expected(out).it(0).equalTo(true);
              expected(log).toHaveLen(1);
              expected(log.calledWith([path, content, opts])).equalTo(1);
            } finally {
              monitor.clearAll();
              fs.writeFile = originalWriteFile;
            }
          }
        });
      }
    });
  }
});