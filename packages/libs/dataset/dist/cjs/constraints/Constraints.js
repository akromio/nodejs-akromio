"use strict";

var _core = require("@dogmalang/core");
const Constraint = _core.dogma.use(require("./Constraint"));
const $Constraints = class Constraints {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    Object.defineProperty(this, 'constraints', {
      value: [],
      writable: false,
      enumerable: false
    });
    /* c8 ignore start */
    if (this._pvt_435d67f9a71581da727f8cf349820564___init__ instanceof Function) this._pvt_435d67f9a71581da727f8cf349820564___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_435d67f9a71581da727f8cf349820564___post__ instanceof Function) this._pvt_435d67f9a71581da727f8cf349820564___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_435d67f9a71581da727f8cf349820564___validate__ instanceof Function) this._pvt_435d67f9a71581da727f8cf349820564___validate__(); /* c8 ignore stop */
  }
};

const Constraints = new Proxy($Constraints, {
  apply(receiver, self, args) {
    return new $Constraints(...args);
  }
});
module.exports = exports = Constraints;
Constraints.prototype.findConstraintByType = function (Constraint) {
  const self = this;
  let c; /* c8 ignore next */
  _core.dogma.expect("Constraint", Constraint);
  {
    for (const item of this.constraints) {
      if (_core.dogma.is(item, Constraint)) {
        c = item;
        break;
      }
    }
  }
  return c;
};
Constraints.prototype.appendConstraint = function (c) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("c", c, Constraint);
  {
    this.constraints.push(c);
  }
  return this;
};
Constraints.prototype.validateValue = function (value) {
  const self = this; /* c8 ignore next */
  if (value != null) _core.dogma.expect("value", value, _core.any);
  {
    for (const c of this.constraints) {
      value = c.validateValue(value);
    }
  }
  return value;
};