"use strict";

var _core = require("@dogmalang/core");
const Macro = _core.dogma.use(require("./Macro"));
const CompositeOperator = _core.dogma.use(require("../CompositeOperator"));
const Call = _core.dogma.use(require("../../Call"));
const $MacroOperator = class MacroOperator extends CompositeOperator {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_f16b5eb081041191e1b543412a5b6ad7___init__ instanceof Function) this._pvt_f16b5eb081041191e1b543412a5b6ad7___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_f16b5eb081041191e1b543412a5b6ad7___post__ instanceof Function) this._pvt_f16b5eb081041191e1b543412a5b6ad7___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_f16b5eb081041191e1b543412a5b6ad7___validate__ instanceof Function) this._pvt_f16b5eb081041191e1b543412a5b6ad7___validate__(); /* c8 ignore stop */
  }
};

const MacroOperator = new Proxy($MacroOperator, {
  apply(receiver, self, args) {
    return new $MacroOperator(...args);
  }
});
module.exports = exports = MacroOperator;
MacroOperator.prototype.performWorks = async function (call) {
  const self = this;
  let results = []; /* c8 ignore next */
  _core.dogma.expect("call", call, Call);
  {
    const macro = _core.dogma.expect('call.op', call.op, Macro);
    if (macro.isLoop()) {
      results = this.performLoop(call, {
        'randomly': macro.randomSteps
      });
    } else {
      results = _core.dogma.super(this, "performWorks")(call, {
        'randomly': macro.randomSteps
      });
    }
  }
  return results;
};
MacroOperator.prototype.performLoop = async function (call, opts) {
  const self = this;
  let results = [];
  {
    var _collStep$resultVarNa;
    const loop = call.op;
    0, await this.performInitializerSteps(call, results);
    const collStep = loop.getLoopCollection(call);
    const collResult = (0, await this.performStep(collStep, call));
    results.push(collResult);
    const {
      dataset
    } = call;
    const itemName = (_collStep$resultVarNa = collStep.resultVarName) !== null && _collStep$resultVarNa !== void 0 ? _collStep$resultVarNa : "i";
    const items = collResult.value;
    const steps = (0, await loop.getSteps(call));
    for (const item of items) {
      dataset.setDatumValue(itemName, item);
      if (_core.dogma.getItem((0, await this._performSteps(steps, call, results, opts)), 0) === false) {
        return [false, results];
      }
    }
    0, await this.performFinalizerSteps(call, results);
  }
  return results;
};