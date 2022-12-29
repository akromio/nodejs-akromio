"use strict";

var _core = require("@dogmalang/core");
const shuffle = _core.dogma.use(require("array-shuffle"));
const Assigner = _core.dogma.use(require("./Assigner"));
const $RandomAssigner = class RandomAssigner extends Assigner {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    Object.defineProperty(this, 'assignationOrder', {
      value: [],
      writable: true,
      enumerable: false
    });
    /* c8 ignore start */
    if (this._pvt_05145d21b486203b0f2eaa683209bc66___init__ instanceof Function) this._pvt_05145d21b486203b0f2eaa683209bc66___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_05145d21b486203b0f2eaa683209bc66___post__ instanceof Function) this._pvt_05145d21b486203b0f2eaa683209bc66___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_05145d21b486203b0f2eaa683209bc66___validate__ instanceof Function) this._pvt_05145d21b486203b0f2eaa683209bc66___validate__(); /* c8 ignore stop */
  }
};

const RandomAssigner = new Proxy($RandomAssigner, {
  apply(receiver, self, args) {
    return new $RandomAssigner(...args);
  }
});
module.exports = exports = RandomAssigner;
RandomAssigner.prototype._pvt_05145d21b486203b0f2eaa683209bc66_post = function () {
  const self = this;
  {
    let total = 0;
    for (const assign of this.assignations) {
      total += assign.weight;
    }
    if (total != 100) {
      _core.dogma.raise(TypeError(`Sum of assignation weights must be 100. Got: ${total}.`));
    }
  }
};
RandomAssigner.prototype._pvt_05145d21b486203b0f2eaa683209bc66___post__ = RandomAssigner.prototype._pvt_05145d21b486203b0f2eaa683209bc66_post;
RandomAssigner.prototype.assign = function (blankSheet) {
  const self = this;
  {
    if ((0, _core.len)(this.assignationOrder) == 0) {
      this.assignationOrder = this.generateAssignationOrder();
    }
    const assignation = this.assignationOrder.pop();
    return _core.dogma.clone(assignation, {
      "assignTs": (0, _core.timestamp)().valueOf()
    }, {}, ["weight"], [blankSheet]);
  }
};
RandomAssigner.prototype.generateAssignationOrder = function () {
  const self = this;
  let order = [];
  {
    for (const assign of shuffle(this.assignations)) {
      for (let i = 0; i < assign.weight; i += 1) {
        order.push(assign);
      }
    }
    order = shuffle(order);
  }
  return order;
};