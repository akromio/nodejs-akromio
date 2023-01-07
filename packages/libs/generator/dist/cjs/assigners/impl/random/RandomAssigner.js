"use strict";

var _core = require("@dogmalang/core");
const shuffle = _core.dogma.use(require("array-shuffle"));
const Ring = _core.dogma.use(require("../../../ring/Ring"));
const Assigner = _core.dogma.use(require("../../Assigner"));
const $RandomAssigner = class RandomAssigner extends Assigner {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('ring', _['ring'], Ring);
    Object.defineProperty(this, 'ring', {
      value: (0, _core.coalesce)(_['ring'], null),
      writable: false,
      enumerable: true
    });
    Object.defineProperty(this, 'assignationOrder', {
      value: [],
      writable: true,
      enumerable: false
    });
    /* c8 ignore start */
    if (this._pvt_fba4ce954ae6f3485b6af57f4e179ab0___init__ instanceof Function) this._pvt_fba4ce954ae6f3485b6af57f4e179ab0___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_fba4ce954ae6f3485b6af57f4e179ab0___post__ instanceof Function) this._pvt_fba4ce954ae6f3485b6af57f4e179ab0___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_fba4ce954ae6f3485b6af57f4e179ab0___validate__ instanceof Function) this._pvt_fba4ce954ae6f3485b6af57f4e179ab0___validate__(); /* c8 ignore stop */
  }
};

const RandomAssigner = new Proxy($RandomAssigner, {
  apply(receiver, self, args) {
    return new $RandomAssigner(...args);
  }
});
module.exports = exports = RandomAssigner;
RandomAssigner.prototype._pvt_fba4ce954ae6f3485b6af57f4e179ab0_post = function () {
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
RandomAssigner.prototype._pvt_fba4ce954ae6f3485b6af57f4e179ab0___post__ = RandomAssigner.prototype._pvt_fba4ce954ae6f3485b6af57f4e179ab0_post;
RandomAssigner.prototype.assign = function (blankSheet) {
  const self = this;
  {
    return blankSheet.job ? this.assignInternalJob(blankSheet) : this.assignToOne(blankSheet);
  }
};
RandomAssigner.prototype.assignInternalJob = function (blankSheet) {
  const self = this;
  let reqs = [];
  {
    if (blankSheet.job == "__exit__") {
      const assignTs = (0, _core.timestamp)().valueOf();
      for (const assignee of this.ring.points) {
        reqs.push(_core.dogma.clone(blankSheet, {
          "assignTs": assignTs,
          "assignee": assignee
        }, {}, [], []));
      }
    }
  }
  return reqs;
};
RandomAssigner.prototype.assignToOne = function (blankSheet) {
  const self = this;
  {
    if ((0, _core.len)(this.assignationOrder) == 0) {
      this.assignationOrder = this.generateAssignationOrder();
    }
    const assignation = this.assignationOrder.pop();
    const assignee = this.ring.next();
    return _core.dogma.clone(assignation, {
      "assignTs": (0, _core.timestamp)().valueOf(),
      "assignee": assignee
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