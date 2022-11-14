"use strict";

var _core = require("@dogmalang/core");
const CompositeOperator = _core.dogma.use(require("../CompositeOperator"));
const Call = _core.dogma.use(require("../../Call"));
const Co = _core.dogma.use(require("./Co"));
const $CoOperator = class CoOperator extends CompositeOperator {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_15dd0ad0846b6093b81f279030ee5c6d___init__ instanceof Function) this._pvt_15dd0ad0846b6093b81f279030ee5c6d___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_15dd0ad0846b6093b81f279030ee5c6d___post__ instanceof Function) this._pvt_15dd0ad0846b6093b81f279030ee5c6d___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_15dd0ad0846b6093b81f279030ee5c6d___validate__ instanceof Function) this._pvt_15dd0ad0846b6093b81f279030ee5c6d___validate__(); /* c8 ignore stop */
  }
};

const CoOperator = new Proxy($CoOperator, {
  apply(receiver, self, args) {
    return new $CoOperator(...args);
  }
});
module.exports = exports = CoOperator;
CoOperator.prototype.performWorks = async function (call) {
  const self = this;
  let results = []; /* c8 ignore next */
  _core.dogma.expect("call", call, Call);
  {
    const {
      dataset
    } = call;
    const cncr = _core.dogma.expect('call.op', call.op, Co);
    results = (0, await Promise.allSettled((0, await cncr.getSteps(call)).map(step => this.performStep(step, call))));
    results = results.map(result => result.value);
  }
  return results;
};