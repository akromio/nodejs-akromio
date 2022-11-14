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
  LoopOperator,
  Call,
  Context
} = _core.dogma.use(require("@akromio/core"));
const {
  CatalogLoop
} = _core.dogma.use(require("../../../.."));
suite(__filename, () => {
  {
    const dataset = GlobalDataset({
      'name': "global"
    });
    const log = simulator.stream.duplex();
    const ctx = Context({
      'log': _core.dogma.nop()
    });
    const onError = "carryOn";
    const title = "testing";
    const operator = LoopOperator();
    suite("buildSteps()", () => {
      {
        test("when decls are alright, a list with the steps must be returned", () => {
          {
            const op1 = Action({
              'name': "list",
              'fun': _core.dogma.nop(),
              'operator': ActionOperator()
            });
            const ops = Ops().appendOp(op1);
            const forEach = ["list", "file1", "file2"];
            const steps = [];
            const loop = CatalogLoop({
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
            const out = loop.getCollection(call);
            expected(out).toBeMap().toHave({
              'args': ["file1", "file2"],
              'onError': "carryOn",
              'resultVarName': "i"
            }).member("op").toBe(Action);
          }
        });
        test("when decls are alright, a list with the steps must be returned", () => {
          {
            const op1 = Action({
              'name': "cp",
              'fun': _core.dogma.nop(),
              'operator': ActionOperator()
            });
            const ops = Ops().appendOp(op1);
            const forEach = ["list", "file1", "file2"];
            const steps = [["<cp", "$(dst)", "$(dst).old"], ["cp", "$(src)", "$(dst)"]];
            const loop = CatalogLoop({
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
            const out = loop.getSteps(call);
            expected(out).toBeList().toHaveLen(2);
            expected(_core.dogma.getItem(out, 0)).toBeMap().toHave({
              'args': ["$(dst)", "$(dst).old"],
              'onError': "finish",
              'resultVarName': "last"
            }).member("op").toBe(Action);
            expected(_core.dogma.getItem(out, 1)).toBeMap().toHave({
              'args': ["$(src)", "$(dst)"],
              'onError': "carryOn",
              'resultVarName': "last"
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
            const forEach = [];
            const initializers = ["cp"];
            const steps = [];
            const loop = CatalogLoop({
              'name': "test",
              'forEach': forEach,
              'initializers': initializers,
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
            const out = loop.getInitializerSteps(call);
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
            const forEach = [];
            const finalizers = ["cp"];
            const steps = [];
            const loop = CatalogLoop({
              'name': "test",
              'forEach': forEach,
              'finalizers': finalizers,
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
            const out = loop.getFinalizerSteps(call);
            expected(out).toHaveLen(1);
            expected(_core.dogma.getItem(out, 0).op).toBe(Action);
          }
        });
      }
    });
  }
});