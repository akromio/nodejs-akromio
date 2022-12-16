"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const stream = _core.dogma.use(require("stream"));
const {
  GlobalDataset,
  LocalDataset
} = _core.dogma.use(require("@akromio/dataset"));
const CompositeOperatorBase = _core.dogma.use(require("./CompositeOperator"));
const StaticAction = _core.dogma.use(require("../simple/action/StaticAction"));
const ActionOperator = _core.dogma.use(require("../simple/action/ActionOperator"));
const Call = _core.dogma.use(require("../Call"));
const Context = _core.dogma.use(require("../Context"));
suite(__filename, () => {
  {
    const globalDataset = GlobalDataset({
      'name': "global"
    });
    suite("_performSteps()", () => {
      {
        test("when a conditional step returning false, this must not be run", async () => {
          {
            const $CompositeOperator = class CompositeOperator extends CompositeOperatorBase {
              constructor(_) {
                super(_);
                /* c8 ignore start */
                if (_ == null) _ = {};
                /* c8 ignore stop */ /* c8 ignore start */
                if (this._pvt_44d3b8a2fd6a2599fe7142e4c6fbc913___init__ instanceof Function) this._pvt_44d3b8a2fd6a2599fe7142e4c6fbc913___init__(_); /* c8 ignore stop */
                /* c8 ignore start */
                if (this._pvt_44d3b8a2fd6a2599fe7142e4c6fbc913___post__ instanceof Function) this._pvt_44d3b8a2fd6a2599fe7142e4c6fbc913___post__(); /* c8 ignore stop */
                /* c8 ignore start */
                if (this._pvt_44d3b8a2fd6a2599fe7142e4c6fbc913___validate__ instanceof Function) this._pvt_44d3b8a2fd6a2599fe7142e4c6fbc913___validate__(); /* c8 ignore stop */
              }
            };

            const CompositeOperator = new Proxy($CompositeOperator, {
              apply(receiver, self, args) {
                return new $CompositeOperator(...args);
              }
            });
            CompositeOperator.prototype.performStep = function (step) {
              const self = this; /* c8 ignore next */
              _core.dogma.expect("step", step);
              {
                return {
                  ["title"]: step.title
                };
              }
            };
            const optor = CompositeOperator();
            const dataset = LocalDataset({
              'name': "local",
              'parent': globalDataset
            }).setDatumValue("isTrue", true).setDatumValue("isFalse", false);
            const log = new stream.Duplex();
            const ctx = Context({
              'log': _core.dogma.nop()
            });
            const call = Call({
              'op': {},
              'title': "Conditional steps",
              'dataset': dataset,
              'onError': "finish",
              'log': log,
              'ctx': ctx
            });
            const steps = [{
              ["title"]: "1st step",
              ["op"]: StaticAction({
                'name': "1st",
                'fun': () => {
                  {
                    return "action #1";
                  }
                },
                'operator': ActionOperator()
              }),
              ["args"]: 123,
              ["condition"]: "isFalse",
              ["onError"]: "carryOn"
            }, {
              ["title"]: "2nd step",
              ["op"]: StaticAction({
                'name': "2nd",
                'fun': () => {
                  {
                    return "action #2";
                  }
                },
                'operator': ActionOperator()
              }),
              ["args"]: 321,
              ["condition"]: "isTrue",
              ["resultVarName"]: "2nd",
              ["onError"]: "carryOn"
            }];
            const out = (0, await optor._performSteps(steps, call, []));
            expected(out).equalTo([{
              ["title"]: "2nd step"
            }]);
          }
        });
      }
    });
  }
});