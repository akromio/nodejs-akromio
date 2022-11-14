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
const {
  CatalogMacro
} = _core.dogma.use(require("../../../.."));
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
    suite("buildSteps()", () => {
      {
        test("when decls are alright, a list with the steps must be returned", () => {
          {
            const op1 = Action({
              'name': "cp",
              'fun': _core.dogma.nop(),
              'operator': ActionOperator()
            });
            const ops = Ops().appendOp(op1);
            const steps = ["cp", ["<cp", "$(src)", "$(dst)"], ["$result", "cp", "$(src2)", "$(dst2)"], {
              ["log"]: "cp"
            }, {
              ["log"]: ["cp", "$(src)", "$(dst)"]
            }, {
              ["quiet"]: "cp"
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
            expected(out).toBeList().toHaveLen(6);
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
  }
});