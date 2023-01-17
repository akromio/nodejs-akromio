"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  monitor
} = _core.dogma.use(require("@akromio/doubles"));
const PluginParser = _core.dogma.use(require("./PluginParser"));
const Plugin = _core.dogma.use(require("./Plugin"));
const Action = _core.dogma.use(require("../ops/simple/action/Action"));
suite(__filename, () => {
  {
    const parser = PluginParser();
    suite("parsePlugin()", () => {
      {
        teardown(() => {
          {
            monitor.clearAll();
          }
        });
        test("when declaration is ok, a plugin instance must be returned", async () => {
          {
            const decl = {
              ["plugin"]: "test",
              ["defaultOpName"]: "two",
              ["ops"]: {
                ["one"]: {
                  ["fun"]: _core.dogma.nop()
                },
                ["two"]: {
                  ["fun"]: _core.dogma.nop()
                }
              }
            };
            const out = (0, await parser.parsePlugin(decl));
            expected(out).toBe(Plugin).toHave({
              'name': "test",
              'defaultOpName': "two",
              'tags': []
            });
            expected(out.ops.ops).members("one", "two").toBe(Action);
          }
        });
        test("when declaration.ini exists, op funs must be wrapped w/ initializer", async () => {
          {
            const decl = {
              ["plugin"]: "test",
              ["defaultOpName"]: "two",
              ["ini"]: _core.dogma.nop(),
              ["ops"]: {
                ["one"]: {
                  ["fun"]: _core.dogma.nop()
                },
                ["two"]: {
                  ["fun"]: _core.dogma.nop()
                }
              }
            };
            const out = (0, await parser.parsePlugin(decl, ["arg1", "arg2"]));
            expected(out).toBe(Plugin).toHave({
              'name': "test",
              'defaultOpName': "two",
              'tags': []
            });
            expected(out.ops.ops).members("one", "two").toBe(Action);
            expected(out.ops.ops.one.fun).toBeFn().notSameAs(decl.ops.one.fun);
          }
        });
      }
    });
  }
});