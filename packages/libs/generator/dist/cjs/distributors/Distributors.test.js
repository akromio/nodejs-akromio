"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  sim,
  monitor
} = _core.dogma.use(require("@akromio/doubles"));
const Distributors = _core.dogma.use(require("./Distributors"));
const ConsoleDistributor = _core.dogma.use(require("./impl/console/ConsoleDistributor"));
suite(__filename, () => {
  {
    suite("append()", () => {
      {
        test("when distributor passed, this must be added to the list", () => {
          {
            const distributor = ConsoleDistributor({
              'input': sim.stream.readable()
            });
            const distributors = Distributors();
            const out = distributors.append(distributor);
            expected(distributors).toHaveLen(1);
          }
        });
      }
    });
    suite("start()", () => {
      {
        test("when called, the start() must be called for each item", async () => {
          {
            const distributor = monitor(ConsoleDistributor({
              'input': sim.stream.readable()
            }), {
              'method': "start"
            });
            const distributors = Distributors().append(distributor);
            0, await distributors.start();
            const start = monitor.log(distributor, {
              'clear': true
            });
            expected(start.calls).equalTo(1);
          }
        });
      }
    });
  }
});