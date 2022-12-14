"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  monitor
} = _core.dogma.use(require("@akromio/doubles"));
const op = _core.dogma.use(require("./info"));
suite(__filename, () => {
  {
    suite("handle()", () => {
      {
        const handle = op.fun;
        test("when value is text, this must be printed using log", () => {
          {
            const value = "waterfront";
            const logger = monitor(_core.dogma.nop());
            const out = handle({
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
        test("when value is list, list.join(' ') must be printed using log", () => {
          {
            const value = ["water", "front"];
            const logger = monitor(_core.dogma.nop());
            const out = handle({
              'params': value,
              'log': logger
            });
            const log = monitor.log(logger, {
              'clear': true
            });
            expected(out).toBeNil();
            expected(log).toHaveLen(1);
            expected(log.calledWith(["water front"])).equalTo(1);
          }
        });
      }
    });
  }
});