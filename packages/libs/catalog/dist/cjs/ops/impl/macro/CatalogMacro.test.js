"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  simulator
} = _core.dogma.use(require("@akromio/doubles"));
const {
  GlobalDataset
} = _core.dogma.use(require("@akromio/dataset"));
const {
  Ops,
  StaticAction: Action,
  ActionOperator,
  MacroOperator,
  Call,
  Context
} = _core.dogma.use(require("@akromio/core"));
const CatalogMacro = _core.dogma.use(require("./CatalogMacro"));
suite(__filename, () => {
  {
    const operator = MacroOperator();
    const dataset = GlobalDataset({
      'name': "global"
    });
    const log = simulator.stream.duplex();
    const ctx = Context({
      'log': _core.dogma.nop()
    });
    const onError = "carryOn";
    const title = "testing";
    suite("isLoop()", () => {
      {
        test("when forEach set, true must be returned", () => {
          {
            const ops = Ops();
            const forEach = "list onw two three";
            const steps = [];
            const macro = CatalogMacro({
              'name': "test",
              'forEach': forEach,
              'steps': steps,
              'ops': ops,
              'operator': operator
            });
            const out = macro.isLoop();
            expected(out).equalTo(true);
          }
        });
        test("when forEach unset, false must be returned", () => {
          {
            const ops = Ops();
            const steps = [];
            const macro = CatalogMacro({
              'name': "test",
              'steps': steps,
              'ops': ops,
              'operator': operator
            });
            const out = macro.isLoop();
            expected(out).equalTo(false);
          }
        });
      }
    });
    suite("buildSteps()", () => {
      {
        test("when decls are alright, a list with the steps must be returned", () => {
          {
            const cp = Action({
              'name': "cp",
              'fun': _core.dogma.nop(),
              'operator': ActionOperator()
            });
            const exec = Action({
              'name': "exec",
              'fun': _core.dogma.nop(),
              'operator': ActionOperator()
            });
            const ops = Ops().appendOp(cp).appendOp(exec);
            const steps = ["cp", ["<cp", "$(src)", "$(dst)"], ["$result", "cp", "$(src2)", "$(dst2)"], {
              ["log"]: "cp"
            }, {
              ["log"]: ["cp", "$(src)", "$(dst)"]
            }, {
              ["quiet"]: "cp"
            }, {
              ["step"]: "cp"
            }, {
              ["run"]: "redis-cli ping"
            }, {
              ["sudo"]: "docker ps"
            }];
            const macro = CatalogMacro({
              'name': "test",
              'steps': steps,
              'ops': ops,
              'operator': operator
            });
            const call = Call({
              'op': macro,
              'dataset': dataset,
              'onError': onError,
              'title': title,
              'log': log,
              'ctx': ctx
            });
            const out = macro.getSteps(call);
            expected(out).toBeList().toHaveLen(9);
            expected(_core.dogma.getItem(out, 0)).toBeMap().member("op").toBe(Action);
            expected(_core.dogma.getItem(out, 1)).toBeMap().toHave({
              'onError': "finish",
              'resultVarName': "last",
              'quiet': false,
              'resultLog': false,
              'args': ["$(src)", "$(dst)"]
            }).member("op").toBe(Action);
            expected(_core.dogma.getItem(out, 2)).toBeMap().toHave({
              'onError': "carryOn",
              'resultVarName': "result",
              'quiet': false,
              'resultLog': false,
              'args': ["$(src2)", "$(dst2)"]
            }).member("op").toBe(Action);
            expected(_core.dogma.getItem(out, 3)).toBeMap().toHave({
              'onError': "carryOn",
              'resultVarName': "last",
              'quiet': false,
              'resultLog': true,
              'args': null
            }).member("op").toBe(Action);
            expected(_core.dogma.getItem(out, 4)).toBeMap().toHave({
              'onError': "carryOn",
              'resultVarName': "last",
              'resultLog': true,
              'quiet': false,
              'args': ["$(src)", "$(dst)"]
            }).member("op").toBe(Action);
            expected(_core.dogma.getItem(out, 5)).toBeMap().toHave({
              'onError': "carryOn",
              'resultVarName': "last",
              'resultLog': false,
              'quiet': true,
              'args': null
            }).member("op").toBe(Action);
            expected(_core.dogma.getItem(out, 6)).toBeMap().member("op").toBe(Action);
            expected(_core.dogma.getItem(out, 7)).toBeMap().toHave({
              'args': ["redis-cli", "ping"]
            }).member("op").toBe(Action).toHave({
              'name': "exec"
            });
            expected(_core.dogma.getItem(out, 8)).toBeMap().toHave({
              'args': ["sudo", "docker", "ps"]
            }).member("op").toBe(Action).toHave({
              'name': "exec"
            });
          }
        });
      }
    });
    suite("getInitializerSteps()", () => {
      {
        test("when called, the steps must be built and returned", () => {
          {
            const cpOp = Action({
              'name': "cp",
              'fun': _core.dogma.nop(),
              'operator': ActionOperator()
            });
            const ops = Ops().appendOp(cpOp);
            const macro = CatalogMacro({
              'name': "test",
              'initializers': ["cp"],
              'steps': [],
              'ops': ops,
              'operator': operator
            });
            const call = Call({
              'op': macro,
              'dataset': dataset,
              'onError': onError,
              'title': title,
              'log': log,
              'ctx': ctx
            });
            const out = macro.getInitializerSteps(call);
            expected(out).toHaveLen(1);
            expected(_core.dogma.getItem(out, 0).op).toBe(Action);
          }
        });
      }
    });
    suite("getFinalizerSteps()", () => {
      {
        test("when called, the steps must be built and returned", () => {
          {
            const cpOp = Action({
              'name': "cp",
              'fun': _core.dogma.nop(),
              'operator': ActionOperator()
            });
            const ops = Ops().appendOp(cpOp);
            const macro = CatalogMacro({
              'name': "test",
              'finalizers': ["cp"],
              'steps': [],
              'ops': ops,
              'operator': operator
            });
            const call = Call({
              'op': macro,
              'dataset': dataset,
              'onError': onError,
              'title': title,
              'log': log,
              'ctx': ctx
            });
            const out = macro.getFinalizerSteps(call);
            expected(out).toHaveLen(1);
            expected(_core.dogma.getItem(out, 0).op).toBe(Action);
          }
        });
      }
    });
    suite("getLoopCollection()", () => {
      {
        test("when called, a list must be returned", () => {
          {
            const op = Action({
              'name': "list",
              'fun': _core.dogma.nop(),
              'operator': ActionOperator()
            });
            const ops = Ops().appendOp(op);
            const forEach = ["list", "file1", "file2"];
            const steps = [];
            const loop = CatalogMacro({
              'name': "test",
              'forEach': forEach,
              'steps': steps,
              'ops': ops,
              'operator': operator
            });
            const call = Call({
              'op': loop,
              'dataset': dataset,
              'onError': onError,
              'title': title,
              'log': log,
              'ctx': ctx
            });
            const out = loop.getLoopCollection(call);
            expected(out).toBeMap().toHave({
              'args': ["file1", "file2"],
              'onError': "carryOn",
              'resultVarName': "i"
            }).member("op").toBe(Action);
          }
        });
      }
    });
  }
});