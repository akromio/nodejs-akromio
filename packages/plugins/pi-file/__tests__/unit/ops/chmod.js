"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const fs = _core.dogma.use(require("fs/promises"));
const {
  monitor
} = _core.dogma.use(require("@akromio/doubles"));
const pi = _core.dogma.use(require("../../.."));
const op = pi.ops.chmod;
suite(__filename, () => {
  {
    const path = "/my/file.txt";
    const mode = "0o400";
    suite("buildParams()", () => {
      {
        const buildParams = op.parameterizer;
        test("when [mode, path], {path, mode} must be returned", () => {
          {
            const out = buildParams([mode, path]);
            expected(out).equalTo({
              'path': path,
              'mode': mode
            });
          }
        });
        test("when map, the same map must be returned", () => {
          {
            const args = {
              ["path"]: path,
              ["mode"]: mode
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
              ["mode"]: mode
            };
            const out = buildTitle(params);
            expected(out).equalTo(`file: changes permissions of '${path}' to '${mode}'`);
          }
        });
      }
    });
    suite("handler()", () => {
      {
        const handler = op.fun;
        test("when called, the permissions must be changed", async () => {
          {
            const originalChmod = fs.chmod;
            fs.chmod = monitor(_core.dogma.nop());
            const out = await _core.dogma.pawait(() => handler({
              'params': {
                ["path"]: path,
                ["mode"]: mode
              }
            }));
            try {
              const log = monitor.log(fs.chmod);
              expected(out).it(0).equalTo(true);
              expected(log).toHaveLen(1);
              expected(log.calledWith([path, mode])).equalTo(1);
            } finally {
              monitor.clearAll();
              fs.chmod = originalChmod;
            }
          }
        });
      }
    });
  }
});