"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  monitor,
  interceptor,
  sim,
  method
} = _core.dogma.use(require("@akromio/doubles"));
const {
  GlobalDataset
} = _core.dogma.use(require("@akromio/dataset"));
const CompositeEngine = _core.dogma.use(require("./CompositeEngine"));
const Runner = _core.dogma.use(require("../Runner"));
const PluginParser = _core.dogma.use(require("../../plugins/PluginParser"));
const Ops = _core.dogma.use(require("../../ops/Ops"));
function range(len) {
  let seq = []; /* c8 ignore next */
  _core.dogma.expect("len", len);
  {
    for (let i = 0; i < len; i += 1) {
      seq.push(i);
    }
  }
  return seq;
}
suite(__filename, () => {
  {
    suite("run()", () => {
      {
        test("when run, the runners must run the requests while stream not ended", async () => {
          {
            const dataset = GlobalDataset({
              'name': "global"
            });
            const pluginParser = PluginParser();
            const onError = "carryOn";
            const indexes = range(20);
            const callReqs = indexes.map(i => (0, _core.map)({
              'jobName': `job-name#${i}`
            }));
            const log = sim.stream.writable();
            const ops = sim(Ops, {
              'getOp': method.invokes(req => {
                /* c8 ignore next */_core.dogma.expect("req", req);
                {
                  return req;
                }
              })
            });
            const runner1 = monitor(interceptor(Runner({
              'id': "runner1",
              'log': log
            }), {
              'run': method.sleep("100ms", "one")
            }), {
              'method': "run"
            });
            const runner2 = monitor(interceptor(Runner({
              'id': "runner2",
              'log': log
            }), {
              'run': method.sleep("100ms", "two")
            }), {
              'method': "run"
            });
            const runners = [runner1, runner2];
            const stream = sim.stream.readable({
              'data': callReqs,
              'objectMode': true
            });
            const engine = CompositeEngine({
              'dataset': dataset,
              'ops': ops,
              'pluginParser': pluginParser,
              'stream': stream,
              'runners': runners,
              'onError': onError
            });
            const out = (0, await engine.run());
            expected(out).toHaveLen(2);
            const run1 = monitor.log(runner1, {
              'clear': true
            });
            expected(run1.calls).greaterThan(5);
            const run2 = monitor.log(runner2, {
              'clear': true
            });
            expected(run2.calls).greaterThan(5);
            expected(run1.calls + run2.calls).equalTo((0, _core.len)(indexes));
          }
        });
      }
    });
  }
});