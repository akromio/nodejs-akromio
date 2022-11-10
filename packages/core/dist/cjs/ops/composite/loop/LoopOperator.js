"use strict";

var _core = require("@dogmalang/core");
const CompositeOperator = _core.dogma.use(require("../CompositeOperator"));
const Call = _core.dogma.use(require("../../Call"));
const Loop = _core.dogma.use(require("./Loop"));
const $LoopOperator = class LoopOperator extends CompositeOperator {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_073a7598dc5cf744b415f96a004a40c5___init__ instanceof Function) this._pvt_073a7598dc5cf744b415f96a004a40c5___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_073a7598dc5cf744b415f96a004a40c5___post__ instanceof Function) this._pvt_073a7598dc5cf744b415f96a004a40c5___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_073a7598dc5cf744b415f96a004a40c5___validate__ instanceof Function) this._pvt_073a7598dc5cf744b415f96a004a40c5___validate__(); /* c8 ignore stop */
  }
};

const LoopOperator = new Proxy($LoopOperator, {
  apply(receiver, self, args) {
    return new $LoopOperator(...args);
  }
});
module.exports = exports = LoopOperator;
LoopOperator.prototype.performWorks = async function (call) {
  const self = this;
  let results = []; /* c8 ignore next */
  _core.dogma.expect("call", call, Call);
  {
    var _collStep$resultVarNa;
    const loop = _core.dogma.expect('call.op', call.op, Loop);
    0, await this.performInitializerSteps(call, results);
    const collStep = loop.getCollection(call);
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
      if (_core.dogma.getItem((0, await this._performSteps(steps, call, results)), 0) === false) {
        return [false, results];
      }
    }
    0, await this.performFinalizerSteps(call, results);
  }
  return results;
};