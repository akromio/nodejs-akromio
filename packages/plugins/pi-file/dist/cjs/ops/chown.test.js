"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const fs = _core.dogma.use(require("fs/promises"));
const {
  monitor
} = _core.dogma.use(require("@akromio/doubles"));
const op = _core.dogma.use(require("./chown"));
suite(__filename, () => {
  {
    const path = "/my/file.txt";
    const uid = "1234";
    const gid = "4567";
    suite("buildParams()", () => {
      {
        const buildParams = op.parameterizer;
        test("when [uid:gid, path], {path, mode} must be returned", () => {
          {
            const out = buildParams([`${uid}:${gid}`, path]);
            expected(out).equalTo({
              'path': path,
              'uid': uid,
              'gid': gid
            });
          }
        });
        test("when map, the same map must be returned", () => {
          {
            const args = {
              ["path"]: path,
              ["uid"]: uid,
              ["gid"]: gid
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
              ["uid"]: uid,
              ["gid"]: gid
            };
            const out = buildTitle(params);
            expected(out).equalTo(`file: changes ownership of '${path}' to '${uid}:${gid}'`);
          }
        });
      }
    });
    suite("handler()", () => {
      {
        const handler = op.fun;
        test("when called, the ownership must be changed", async () => {
          {
            const originalChown = fs.chown;
            fs.chown = monitor(_core.dogma.nop());
            const out = await _core.dogma.pawait(() => handler({
              'params': {
                ["path"]: path,
                ["uid"]: uid,
                ["gid"]: gid
              }
            }));
            try {
              const log = monitor.log(fs.chown);
              expected(out).it(0).equalTo(true);
              expected(log).toHaveLen(1);
              expected(log.calledWith([path, uid, gid])).equalTo(1);
            } finally {
              monitor.clearAll();
              fs.chown = originalChown;
            }
          }
        });
      }
    });
  }
});