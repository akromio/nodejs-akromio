"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  sim,
  monitor
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
              ["output"]: sim.stream.writable(),
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
            const blankSheets = _core.dogma.getSlice("b ".repeat(100).split(" "), 0, -2);
            const jobs = [{
              ["registry"]: registry,
              ["catalog"]: catalog,
              ["job"]: "#1",
              ["weight"]: 25
            }, {
              ["registry"]: registry,
              ["catalog"]: catalog,
              ["job"]: "#2",
              ["weight"]: 75
            }];
            const input = sim.stream.readable({
              'data': blankSheets
            });
            const output = monitor(sim.stream.writable(), {
              'method': "write"
            });
            const opts = {
              ["input"]: input,
              ["output"]: output,
              ["jobs"]: jobs
            };
            const assigner = Assigner(opts);
            const out = [];
            assigner.start();
            0, await (0, _core.sleep)("500ms");
            expected(out).equalTo([]);
            expected(input.readable).equalTo(false);
            expected(output.writable).equalTo(false);
            const log = monitor.log(output, {
              'clear': true
            });
            let job1 = 0;
            let job2 = 0;
            expected(log.calls).equalTo(100);
            for (let i = 0; i < log.calls; i += 1) {
              const job = _core.json.decode(log.getCall(i).args);
              if (job.job == "#1") {
                job1 += 1;
              } else {
                job2 += 1;
              }
            }
            expected(job1).equalTo(25);
            expected(job2).equalTo(75);
          }
        });
      }
    });
  }
});