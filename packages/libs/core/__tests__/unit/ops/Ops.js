"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  Ops,
  SimpleOp,
  Plugin
} = _core.dogma.use(require("../../.."));
const $TestOp = class TestOp extends SimpleOp {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_073ee3378c720ce862b29556ff6c2af4___init__ instanceof Function) this._pvt_073ee3378c720ce862b29556ff6c2af4___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_073ee3378c720ce862b29556ff6c2af4___post__ instanceof Function) this._pvt_073ee3378c720ce862b29556ff6c2af4___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_073ee3378c720ce862b29556ff6c2af4___validate__ instanceof Function) this._pvt_073ee3378c720ce862b29556ff6c2af4___validate__(); /* c8 ignore stop */
  }
};

const TestOp = new Proxy($TestOp, {
  apply(receiver, self, args) {
    return new $TestOp(...args);
  }
});
suite(__filename, () => {
  {
    suite("appendOp()", () => {
      {
        test("when op unexists, this must be appended to the collection", () => {
          {
            const op1 = TestOp({
              'name': "test1",
              'operator': {}
            });
            const op2 = TestOp({
              'name': "test2",
              'operator': {}
            });
            const ops = Ops();
            ops.appendOp(op1).appendOp(op2);
            expected(ops.ops).toHaveLen(2).toHave({
              'test1': op1,
              'test2': op2
            });
          }
        });
        test("when op exists, this must be appended to the collection, replacing", () => {
          {
            const op1 = TestOp({
              'name': "test",
              'operator': {}
            });
            const op2 = TestOp({
              'name': "test",
              'operator': {}
            });
            const ops = Ops().appendOp(op1).appendOp(op2);
            expected(ops.ops).toHaveLen(1).toHave({
              'test': op2
            });
          }
        });
      }
    });
    suite("appendOps()", () => {
      {
        test("when ops, every op must be appended to the collection", () => {
          {
            const op1 = TestOp({
              'name': "test1",
              'operator': {}
            });
            const op2 = TestOp({
              'name': "test2",
              'operator': {}
            });
            const ops = Ops().appendOps(op1, op2);
            expected(ops.ops).toHaveLen(2).toHave({
              'test1': op1,
              'test2': op2
            });
          }
        });
      }
    });
    suite("getOp()", () => {
      {
        test("when op exists, this must be returned", () => {
          {
            const op = TestOp({
              'name': "test",
              'operator': {}
            });
            const ops = Ops().appendOp(op);
            const out = ops.getOp("test");
            expected(out).sameAs(op);
          }
        });
        test("when op unexists, nil must be returned", () => {
          {
            const ops = Ops();
            const out = ops.getOp("unknown");
            expected(out).toBeNil();
          }
        });
        test("when op unexists and raiseIfNotFound, error must be raised", () => {
          {
            const ops = Ops();
            const out = _core.dogma.peval(() => {
              return ops.getOp("unknown", {
                'raiseIfNotFound': true
              });
            });
            expected(out).it(0).equalTo(false).it(1).toBe(Error).like("Operation 'unknown' not found.");
          }
        });
      }
    });
    suite("appendPlugin()", () => {
      {
        test("when plugin passed, its operations must be appended as piName.opName", () => {
          {
            const op1 = TestOp({
              'name': "test1",
              'operator': {}
            });
            const op2 = TestOp({
              'name': "test2",
              'operator': {}
            });
            const pi = Plugin({
              'name': "pi"
            }).appendOp(op1).appendOp(op2);
            const ops = Ops().appendPlugin(pi);
            expected(ops.ops).toHaveLen(2).member("pi.test1").sameAs(op1).member("pi.test2").sameAs(op2);
          }
        });
        test("when plugin has default op, this must be appended additionally", () => {
          {
            const op1 = TestOp({
              'name': "test1",
              'operator': {}
            });
            const op2 = TestOp({
              'name': "test2",
              'operator': {}
            });
            const pi = Plugin({
              'name': "pi",
              'defaultOpName': "test2"
            }).appendOp(op1).appendOp(op2);
            const ops = Ops().appendPlugin(pi);
            expected(ops.ops).toHaveLen(3).member("pi").sameAs(op2).member("pi.test1").sameAs(op1).member("pi.test2").sameAs(op2);
          }
        });
      }
    });
  }
});