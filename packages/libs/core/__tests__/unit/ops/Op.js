"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  simulator,
  monitor,
  method
} = _core.dogma.use(require("@akromio/doubles"));
const {
  GlobalDataset
} = _core.dogma.use(require("@akromio/dataset"));
const {
  Op
} = _core.dogma.use(require("../../.."));
const $TestOp = class TestOp extends Op {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_acc91881e46f457b64ed8e24fc5dc9c1___init__ instanceof Function) this._pvt_acc91881e46f457b64ed8e24fc5dc9c1___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_acc91881e46f457b64ed8e24fc5dc9c1___post__ instanceof Function) this._pvt_acc91881e46f457b64ed8e24fc5dc9c1___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_acc91881e46f457b64ed8e24fc5dc9c1___validate__ instanceof Function) this._pvt_acc91881e46f457b64ed8e24fc5dc9c1___validate__(); /* c8 ignore stop */
  }
};

const TestOp = new Proxy($TestOp, {
  apply(receiver, self, args) {
    return new $TestOp(...args);
  }
});
suite(__filename, () => {
  {
    const globalDataset = GlobalDataset({
      'name': "global"
    });
    const logStream = simulator.stream.duplex();
    suite("runWith()", () => {
      {
        test("when called, operator must run the action and return its returned value", () => {
          {
            const operator = monitor(simulator({
              'run': method({
                ["resolves"]: 321
              })
            }), {
              'onlyCalls': true
            });
            const op = TestOp({
              'name': "test",
              'operator': operator
            });
            const opts = {
              ["title"]: "the title",
              ["dataset"]: globalDataset,
              ["log"]: logStream
            };
            const out = op.runWith(123, opts);
            const log = monitor.log(operator);
            try {
              expected(log).toHaveLen(1);
              expected(log.calledWith([op, 123, opts])).equalTo(1);
            } finally {
              monitor.clearAll();
            }
          }
        });
      }
    });
    suite("run()", () => {
      {
        test("when called, runWith() called with args to nil", () => {
          {
            const operator = monitor(simulator({
              'run': method({
                ["resolves"]: 321
              })
            }), {
              'onlyCalls': true
            });
            const op = TestOp({
              'name': "test",
              'operator': operator
            });
            const opts = {
              ["title"]: "the title",
              ["dataset"]: globalDataset,
              ["log"]: logStream
            };
            const out = op.run(opts);
            const log = monitor.log(operator);
            try {
              expected(log).toHaveLen(1);
              expected(log.calledWith([op, null, opts])).equalTo(1);
            } finally {
              monitor.clearAll();
            }
          }
        });
      }
    });
  }
});