"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  sim
} = _core.dogma.use(require("@akromio/doubles"));
const Assigner = _core.dogma.use(require("./Assigner"));
suite(__filename, () => {
  {
    const registry = "fs:///my/registry";
    const catalog = "catalog-name";
    const job = "job-name";
    suite("constructor", () => {
      {
        test("when total weight is not 100, error must be raised", () => {
          {
            const jobs = [{
              ["registry"]: registry,
              ["catalog"]: catalog,
              ["job"]: job,
              ["weight"]: 90
            }, {
              ["registry"]: registry,
              ["catalog"]: catalog,
              ["job"]: job,
              ["weight"]: 20
            }];
            const opts = {
              ["input"]: sim.stream.readable(),
              ["output"]: sim.stream.duplex(),
              ["jobs"]: jobs
            };
            const out = _core.dogma.peval(() => {
              return Assigner(opts);
            });
            expected(out).it(0).equalTo(false).it(1).equalTo(TypeError("Sum of job weights must be 100. Got: 110."));
          }
        });
      }
    });
    suite("start()", () => {
      {
        test("when started, run requests must be generated", async () => {
          {
            const blankSheets = ["one", "two", "three"];
            const jobs = [{
              ["registry"]: registry,
              ["catalog"]: catalog,
              ["job"]: job,
              ["weight"]: 25
            }, {
              ["registry"]: registry,
              ["catalog"]: catalog,
              ["job"]: job,
              ["weight"]: 75
            }];
            const opts = {
              ["input"]: sim.stream.readable({
                'data': blankSheets
              }),
              ["output"]: sim.stream.duplex(),
              ["jobs"]: jobs
            };
            const assigner = Assigner(opts);
            const out = [];
            assigner.start();
            0, await (0, _core.sleep)("1s");
            expected(out).equalTo([]);
          }
        });
      }
    });
  }
});