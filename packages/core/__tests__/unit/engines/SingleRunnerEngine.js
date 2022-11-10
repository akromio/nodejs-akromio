"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  GlobalDataset
} = _core.dogma.use(require("@akromio/dataset"));
const {
  monitor,
  simulator,
  field,
  method
} = _core.dogma.use(require("@akromio/doubles"));
const {
  SingleRunnerEngine,
  Runner,
  Ops,
  StaticAction,
  ActionOperator,
  Result,
  PluginParser
} = _core.dogma.use(require("../../.."));
const $TestEngine = class TestEngine extends SingleRunnerEngine {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_4f79e2ab0f4411c18716754853e9399b___init__ instanceof Function) this._pvt_4f79e2ab0f4411c18716754853e9399b___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_4f79e2ab0f4411c18716754853e9399b___post__ instanceof Function) this._pvt_4f79e2ab0f4411c18716754853e9399b___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_4f79e2ab0f4411c18716754853e9399b___validate__ instanceof Function) this._pvt_4f79e2ab0f4411c18716754853e9399b___validate__(); /* c8 ignore stop */
  }
};

const TestEngine = new Proxy($TestEngine, {
  apply(receiver, self, args) {
    return new $TestEngine(...args);
  }
});
suite(__filename, () => {
  {
    const dataset = GlobalDataset({
      'name': "global"
    });
    const pluginParser = PluginParser();
    suite("runOp()", () => {
      {
        test("when called, the op must be run and returned its result", async () => {
          {
            const action = StaticAction({
              'name': "myaction",
              'fun': _core.dogma.nop(),
              'operator': ActionOperator()
            });
            const ops = Ops().appendOp(action);
            const result = Result({
              'callId': "123e4567-e89b-12d3-a456-426614174000",
              'title': "This is the title",
              'duration': 0,
              'kind': "ok",
              'value': 1234,
              'onError': "carryOn"
            });
            const runner = monitor(simulator(Runner, {
              'run': method.resolves(result),
              'log': field.stream.duplex()
            }));
            const engine = TestEngine({
              'runner': runner,
              'onError': "carryOn",
              'dataset': dataset,
              'ops': ops,
              'pluginParser': pluginParser
            });
            const out = (0, await engine.run("myaction"));
            expected(out).sameAs(result);
          }
        });
        test("when called w/ args, the op must be run and returned its result", async () => {
          {
            const action = StaticAction({
              'name': "myaction",
              'fun': _core.dogma.nop(),
              'operator': ActionOperator()
            });
            const ops = Ops().appendOp(action);
            const result = Result({
              'callId': "123e4567-e89b-12d3-a456-426614174000",
              'title': "This is the title",
              'duration': 0,
              'kind': "ok",
              'value': 1234,
              'onError': "carryOn"
            });
            const runner = monitor(simulator(Runner, {
              'run': method.resolves(result),
              'log': field.stream.duplex()
            }));
            const engine = TestEngine({
              'runner': runner,
              'onError': "carryOn",
              'dataset': dataset,
              'ops': ops,
              'pluginParser': pluginParser
            });
            const out = (0, await engine.run("myaction", ["arg1", "arg2"]));
            expected(out).sameAs(result);
          }
        });
      }
    });
  }
});