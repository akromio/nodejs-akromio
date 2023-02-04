"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const fs = _core.dogma.use(require("fs/promises"));
const {
  monitor
} = _core.dogma.use(require("@akromio/doubles"));
const op = _core.dogma.use(require("./touch"));
suite(__filename, () => {
  {
    const buildParams = op.parameterizer;
    const path = "/my/file.txt";
    const atime = (0, _core.timestamp)();
    const mtime = (0, _core.timestamp)();
    suite("buildParams()", () => {
      {
        test("when [path, map], {path, atime, mtime} must be returned", () => {
          {
            const times = {
              ["atime"]: atime,
              ["mtime"]: mtime
            };
            const out = buildParams([path, times]);
            expected(out).equalTo({
              'path': path,
              'atime': atime,
              'mtime': mtime
            });
          }
        });
        test("when [path, atime, mtime], {path, atime, mtime} must be returned", () => {
          {
            const out = buildParams([path, atime, mtime]);
            expected(out).equalTo({
              'path': path,
              'atime': atime,
              'mtime': mtime
            });
          }
        });
        test("when map, the same map must be returned", () => {
          {
            const args = {
              ["path"]: path,
              ["atime"]: atime,
              ["mtime"]: mtime
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
              ["atime"]: atime,
              ["mtime"]: mtime
            };
            const out = buildTitle(params);
            expected(out).equalTo(`file: changes the timestamps of '${path}'`);
          }
        });
      }
    });
    suite("handler()", () => {
      {
        const handler = op.fun;
        test("when called, the file must be written", async () => {
          {
            const originalUtimes = fs.utimes;
            fs.utimes = monitor(_core.dogma.nop());
            const out = await _core.dogma.pawait(() => handler({
              'params': {
                ["path"]: path,
                ["atime"]: atime,
                ["mtime"]: mtime
              }
            }));
            try {
              const log = monitor.log(fs.utimes);
              expected(out).it(0).equalTo(true);
              expected(log).toHaveLen(1);
              expected(log.calledWith([path, atime, mtime])).equalTo(1);
            } finally {
              monitor.clearAll();
              fs.utimes = originalUtimes;
            }
          }
        });
      }
    });
  }
});