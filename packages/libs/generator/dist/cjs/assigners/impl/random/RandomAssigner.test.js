"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  sim,
  monitor
} = _core.dogma.use(require("@akromio/doubles"));
const BlankSheetStream = _core.dogma.use(require("../../../starters/BlankSheetStream"));
const Ring = _core.dogma.use(require("../../../ring/Ring"));
const RunReqStream = _core.dogma.use(require("../../RunReqStream"));
const RandomAssigner = _core.dogma.use(require("./RandomAssigner"));
suite(__filename, () => {
  {
    const registry = "fs:///my/registry";
    const catalog = "catalog-name";
    const job = "job-name";
    const ring = Ring({
      'points': ["one", "two", "three"]
    });
    suite("constructor", () => {
      {
        test("when total weight is not 100, error must be raised", () => {
          {
            const assignations = [{
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
            const input = BlankSheetStream();
            const output = RunReqStream();
            const opts = {
              ["input"]: input,
              ["output"]: output,
              ["assignations"]: assignations,
              ["ring"]: ring
            };
            const out = _core.dogma.peval(() => {
              return RandomAssigner(opts);
            });
            expected(out).it(0).equalTo(false).it(1).equalTo(TypeError("Sum of assignation weights must be 100. Got: 110."));
          }
        });
      }
    });
    suite("start()", () => {
      {
        test("when started, run requests must be generated", async () => {
          {
            const blankSheets = _core.dogma.getSlice((0, _core.text)((0, _core.timestamp)().valueOf() + " ").repeat(100).split(" "), 0, -2).map(ts => {
              /* c8 ignore next */_core.dogma.expect("ts", ts);
              {
                return {
                  ["ts"]: (0, _core.num)(ts)
                };
              }
            });
            const assignations = [{
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
              'objectMode': true,
              'data': blankSheets
            });
            const output = monitor(RunReqStream(), {
              'method': "append"
            });
            const opts = {
              ["input"]: input,
              ["output"]: output,
              ["assignations"]: assignations,
              ["ring"]: ring
            };
            const assigner = RandomAssigner(opts);
            assigner.start();
            0, await (0, _core.sleep)("1500ms");
            expected(input.readable).equalTo(false);
            expected(output.writable).equalTo(false);
            const log = monitor.log(output, {
              'clear': true
            });
            let job1 = 0;
            let job2 = 0;
            let assignee1 = 0;
            let assignee2 = 0;
            let assignee3 = 0;
            expected(log.calls).equalTo(100);
            for (let i = 0; i < log.calls; i += 1) {
              const req = _core.dogma.getItem(log.getCall(i).args, 0);
              {
                const _ = req.job;
                switch (_) {
                  case "#1":
                    {
                      job1 += 1;
                    } /* c8 ignore start */
                    break;
                  /* c8 ignore stop */
                  case "#2":
                    {
                      job2 += 1;
                    } /* c8 ignore start */
                    break;
                  /* c8 ignore stop */
                }
              }
              {
                const _ = req.assignee;
                switch (_) {
                  case "one":
                    {
                      assignee1 += 1;
                    } /* c8 ignore start */
                    break;
                  /* c8 ignore stop */
                  case "two":
                    {
                      assignee2 += 1;
                    } /* c8 ignore start */
                    break;
                  /* c8 ignore stop */
                  case "three":
                    {
                      assignee3 += 1;
                    } /* c8 ignore start */
                    break;
                  /* c8 ignore stop */
                }
              }
            }
            expected(job1).equalTo(25);
            expected(job2).equalTo(75);
            expected(assignee1).greaterThanOrEqualTo(33);
            expected(assignee2).greaterThanOrEqualTo(33);
            expected(assignee3).greaterThanOrEqualTo(33);
          }
        });
      }
    });
  }
});