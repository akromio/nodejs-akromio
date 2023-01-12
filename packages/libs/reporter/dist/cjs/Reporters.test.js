"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  sim,
  method,
  monitor
} = _core.dogma.use(require("@akromio/doubles"));
const Reporters = _core.dogma.use(require("./Reporters"));
const Reporter = _core.dogma.use(require("./Reporter"));
suite(__filename, () => {
  {
    suite("append()", () => {
      {
        test("when called, the reporter must be added to the list", () => {
          {
            const reporter = sim(Reporter, {});
            const reporters = Reporters();
            const out = reporters.append(reporter);
            expected(out).sameAs(reporters);
            expected(reporters.reporters).equalTo([reporter]);
          }
        });
      }
    });
    suite("connect()", () => {
      {
        test("when called, start() of the reporters must be called", () => {
          {
            const reporter1 = monitor(sim(Reporter, {
              'start': method.returns()
            }));
            const reporter2 = monitor(sim(Reporter, {
              'start': method.returns()
            }));
            const reporters = Reporters().append(reporter1).append(reporter2);
            const out = reporters.connect();
            expected(out).sameAs(reporters);
            const start1 = monitor.log(reporter1, {
              'clear': true
            });
            expected(start1.calls).equalTo(1);
            const start2 = monitor.log(reporter2, {
              'clear': true
            });
            expected(start2.calls).equalTo(1);
          }
        });
      }
    });
    suite("disconnect()", () => {
      {
        test("when called, stop() of the reporters must be called", () => {
          {
            const reporter1 = monitor(sim(Reporter, {
              'stop': method.returns()
            }));
            const reporter2 = monitor(sim(Reporter, {
              'stop': method.returns()
            }));
            const reporters = Reporters().append(reporter1).append(reporter2);
            const out = reporters.disconnect();
            expected(out).sameAs(reporters);
            const stop1 = monitor.log(reporter1, {
              'clear': true
            });
            expected(stop1.calls).equalTo(1);
            const stop2 = monitor.log(reporter2, {
              'clear': true
            });
            expected(stop2.calls).equalTo(1);
          }
        });
      }
    });
  }
});