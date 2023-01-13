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
const Op = _core.dogma.use(require("./Op"));
const $TestOp = class TestOp extends Op {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_fa558386cdc164f101a65214f9f4a951___init__ instanceof Function) this._pvt_fa558386cdc164f101a65214f9f4a951___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_fa558386cdc164f101a65214f9f4a951___post__ instanceof Function) this._pvt_fa558386cdc164f101a65214f9f4a951___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_fa558386cdc164f101a65214f9f4a951___validate__ instanceof Function) this._pvt_fa558386cdc164f101a65214f9f4a951___validate__(); /* c8 ignore stop */
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
    const runnerName = "runner#0";
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
              ["log"]: logStream,
              ["runnerName"]: runnerName
            };
            const out = op.runWith(123, opts);
            const log = monitor.log(operator, {
              'clear': true
            });
            expected(log).toHaveLen(1);
            expected(log.calledWith([op, 123, opts])).equalTo(1);
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
              ["log"]: logStream,
              ["runnerName"]: runnerName
            };
            const out = op.run(opts);
            const log = monitor.log(operator, {
              'clear': true
            });
            expected(log).toHaveLen(1);
            expected(log.calledWith([op, null, opts])).equalTo(1);
          }
        });
      }
    });
  }
});