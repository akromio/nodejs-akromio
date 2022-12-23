"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  simulator
} = _core.dogma.use(require("@akromio/doubles"));
const Assigner = _core.dogma.use(require("./Assigner"));
suite(__filename, () => {
  {
    suite("constructor", () => {
      {
        test("when total weight is not 100, error must be raised", () => {
          {
            const registry = "fs:///my/registry";
            const catalog = "catalog-name";
            const job = "job-name";
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
              ["input"]: simulator.stream.duplex(),
              ["output"]: simulator.stream.duplex(),
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
  }
});