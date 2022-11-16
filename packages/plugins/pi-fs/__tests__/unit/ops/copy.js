"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const fs = _core.dogma.use(require("fs-extra"));
const {
  monitor
} = _core.dogma.use(require("@akromio/doubles"));
const pi = _core.dogma.use(require("../../.."));
const op = pi.ops.copy;
suite(__filename, () => {
  {
    const src = "/my/file.txt";
    const dst = "/my/file.txt.old";
    suite("buildParams()", () => {
      {
        const buildParams = op.parameterizer;
        test("when [src, dst], {src, dst, opts = {}} must be returned", () => {
          {
            const out = buildParams([src, dst]);
            expected(out).equalTo({
              'src': src,
              'dst': dst,
              'opts': {}
            });
          }
        });
        test("when [src, dst, opts], {src, dst, opts} must be returned", () => {
          {
            const opts = {
              ["overwrite"]: false
            };
            const out = buildParams([src, dst, opts]);
            expected(out).equalTo({
              'src': src,
              'dst': dst,
              'opts': opts
            });
          }
        });
        test("when map, the same map must be returned", () => {
          {
            const opts = {
              ["overwrite"]: false
            };
            const args = {
              ["src"]: src,
              ["dst"]: dst,
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
              ["src"]: src,
              ["dst"]: dst
            };
            const out = buildTitle(params);
            expected(out).equalTo(`fs: copy '${src}' to '${dst}'`);
          }
        });
      }
    });
    suite("handler()", () => {
      {
        const handler = op.fun;
        test("when called, source must be copied to destination", async () => {
          {
            const originalCopy = fs.copy;
            fs.copy = monitor(_core.dogma.nop());
            const opts = {
              ["overwrite"]: false
            };
            const out = await _core.dogma.pawait(() => handler({
              'params': {
                ["src"]: src,
                ["dst"]: dst,
                ["opts"]: opts
              }
            }));
            try {
              const log = monitor.log(fs.copy);
              expected(out).it(0).equalTo(true);
              expected(log).toHaveLen(1);
              expected(log.calledWith([src, dst, opts])).equalTo(1);
            } finally {
              monitor.clearAll();
              fs.copy = originalCopy;
            }
          }
        });
      }
    });
  }
});