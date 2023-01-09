"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  GlobalDataset
} = _core.dogma.use(require("@akromio/dataset"));
const {
  interceptor,
  method
} = _core.dogma.use(require("@akromio/doubles"));
const EngineBase = _core.dogma.use(require("./Engine"));
const Runner = _core.dogma.use(require("./Runner"));
const Ops = _core.dogma.use(require("../ops/Ops"));
const Result = _core.dogma.use(require("../ops/Result"));
const StaticAction = _core.dogma.use(require("../ops/simple/action/StaticAction"));
const ActionOperator = _core.dogma.use(require("../ops/simple/action/ActionOperator"));
const PluginParser = _core.dogma.use(require("../plugins/PluginParser"));
const $Engine = class Engine extends EngineBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_325c1dea911c13e926831a34446a4fb6___init__ instanceof Function) this._pvt_325c1dea911c13e926831a34446a4fb6___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_325c1dea911c13e926831a34446a4fb6___post__ instanceof Function) this._pvt_325c1dea911c13e926831a34446a4fb6___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_325c1dea911c13e926831a34446a4fb6___validate__ instanceof Function) this._pvt_325c1dea911c13e926831a34446a4fb6___validate__(); /* c8 ignore stop */
  }
};

const Engine = new Proxy($Engine, {
  apply(receiver, self, args) {
    return new $Engine(...args);
  }
});
Engine.prototype.runOp = function (op, args, opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("op", op); /* c8 ignore next */
  _core.dogma.expect("opts", opts);
  {
    return Result({
      'callId': "123e4567-e89b-12d3-a456-426614174000",
      'title': "This is the title",
      'duration': 0,
      'kind': "ok",
      'value': 1234,
      'onError': "carryOn"
    });
  }
};
suite(__filename, () => {
  {
    const dataset = GlobalDataset({
      'name': "global"
    });
    const action = StaticAction({
      'name': "myaction",
      'fun': _core.dogma.nop(),
      'operator': ActionOperator()
    });
    const ops = Ops().appendOp(action);
    const pluginParser = PluginParser();
    function createEngine(ops) {
      {
        return Engine({
          'onError': "carryOn",
          'dataset': dataset,
          'pluginParser': pluginParser,
          'ops': ops
        });
      }
    }
    suite("getBuiltInPresets()", () => {
      {
        test("when not overwritten, empty list must be returned", () => {
          {
            const engine = createEngine();
            const out = engine.getBuiltInPresets();
            expected(out).toBeEmpty();
          }
        });
      }
    });
    suite("loadBuiltInPlugins()", () => {
      {
        test("when presets returned, these must be parsed and their plugins added to ops", async () => {
          {
            const pi1 = {
              ["plugin"]: "pi1",
              ["ops"]: {
                ["op11"]: {
                  ["fun"]: _core.dogma.nop()
                },
                ["op12"]: {
                  ["fun"]: _core.dogma.nop()
                }
              }
            };
            const pi2 = {
              ["plugin"]: "pi2",
              ["ops"]: {
                ["op21"]: {
                  ["fun"]: _core.dogma.nop()
                },
                ["op22"]: {
                  ["fun"]: _core.dogma.nop()
                }
              }
            };
            const preset = {
              ["name"]: "test-preset",
              ["tags"]: ["test"],
              ["plugins"]: [{
                ["plugin"]: pi1.name,
                ["impl"]: pi1
              }, {
                ["plugin"]: pi2.name,
                ["impl"]: pi2
              }]
            };
            const engine = interceptor(createEngine(), {
              'getBuiltInPresets': method.returns([preset])
            });
            const out = (0, await engine.loadBuiltInPlugins());
            expected(out).sameAs(engine);
            expected(out.ops).toHaveLen(4);
            for (const name of ["pi1.op11", "pi1.op12", "pi2.op21", "pi2.op22"]) {
              expected(out.ops.getOp(name)).toBe(StaticAction);
            }
          }
        });
      }
    });
    suite("run()", () => {
      {
        test("when operation not found, error must be raised", async () => {
          {
            const engine = createEngine();
            const out = await _core.dogma.pawait(() => engine.run("myaction"));
            expected(out).it(0).equalTo(false).it(1).equalTo(Error("Operation 'myaction' not found."));
          }
        });
        test("when operation not found, error must be raised", async () => {
          {
            const engine = createEngine(ops);
            const out = await _core.dogma.pawait(() => engine.run("myaction", ["arg1", "arg2"], {
              ["onError"]: "finish"
            }));
            expected(out).it(0).equalTo(true).it(1).toBe(Result);
          }
        });
      }
    });
  }
});