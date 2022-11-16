"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  monitor
} = _core.dogma.use(require("@akromio/doubles"));
const pi = _core.dogma.use(require("../../.."));
const op = pi.ops.info;
suite(__filename, () => {
  {
    suite("fun", () => {
      {
        const {
          fun
        } = op;
        test("when value, this must be printed using log", () => {
          {
            const value = "waterfront";
            const logger = monitor(_core.dogma.nop());
            const out = fun({
              'params': value,
              'log': logger
            });
            const log = monitor.log(logger, {
              'clear': true
            });
            expected(out).toBeNil();
            expected(log).toHaveLen(1);
            expected(log.calledWith([value])).equalTo(1);
          }
        });
      }
    });
  }
});