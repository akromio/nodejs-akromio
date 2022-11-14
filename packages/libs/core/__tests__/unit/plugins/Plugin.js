"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  monitor
} = _core.dogma.use(require("@akromio/doubles"));
const {
  Plugin,
  SimpleOp
} = _core.dogma.use(require("../../.."));
const $TestOp = class TestOp extends SimpleOp {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_f3c7f31792ecdf530802a4fe76015a99___init__ instanceof Function) this._pvt_f3c7f31792ecdf530802a4fe76015a99___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_f3c7f31792ecdf530802a4fe76015a99___post__ instanceof Function) this._pvt_f3c7f31792ecdf530802a4fe76015a99___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_f3c7f31792ecdf530802a4fe76015a99___validate__ instanceof Function) this._pvt_f3c7f31792ecdf530802a4fe76015a99___validate__(); /* c8 ignore stop */
  }
};

const TestOp = new Proxy($TestOp, {
  apply(receiver, self, args) {
    return new $TestOp(...args);
  }
});
suite(__filename, () => {
  {
    suite("hasDefaultOp()", () => {
      {
        test("when defaultOpName set, true must be returned", () => {
          {
            const pi = Plugin({
              'name': "test",
              'defaultOpName': "theOpName"
            });
            const out = pi.hasDefaultOp();
            expected(out).equalTo(true);
          }
        });
        test("when defaultOpName unset, false must be returned", () => {
          {
            const pi = Plugin({
              'name': "test"
            });
            const out = pi.hasDefaultOp();
            expected(out).equalTo(false);
          }
        });
      }
    });
    suite("appendOp()", () => {
      {
        test("when called, op must be appended to ops and its parent set", () => {
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
            });
            pi.appendOp(op1).appendOp(op2);
            expected(pi.ops.ops).toHaveLen(2).member("test1").sameAs(op1).member("test2").sameAs(op2);
            expected(op1.parentPlugin).sameAs(pi);
            expected(op2.parentPlugin).sameAs(pi);
          }
        });
      }
    });
    suite("finalize()", () => {
      {
        test("when finalizer set, this must be run", () => {
          {
            const finalizer = monitor(_core.dogma.nop());
            const pi = Plugin({
              'name': "pi",
              'finalizer': finalizer
            });
            pi.finalize();
            try {
              const log = monitor.log(finalizer);
              expected(log).toHaveLen(1);
            } finally {
              monitor.clearAll();
            }
          }
        });
        test("when finaluzer unset, nothing to do", () => {
          {
            const pi = Plugin({
              'name': "pi"
            });
            expected(() => {
              {
                pi.finalize();
              }
            }).notToRaise();
          }
        });
      }
    });
  }
});