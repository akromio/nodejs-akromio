"use strict";

var _core = require("@dogmalang/core");
const Constraint = _core.dogma.use(require("./Constraint"));
const ConstraintError = _core.dogma.use(require("./ConstraintError"));
const $EnumConstraint = class EnumConstraint extends Constraint {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('options', _['options'], _core.list);
    Object.defineProperty(this, 'options', {
      value: (0, _core.coalesce)(_['options'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_324dd3699b76c41a51accd67a9633e9d___init__ instanceof Function) this._pvt_324dd3699b76c41a51accd67a9633e9d___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_324dd3699b76c41a51accd67a9633e9d___post__ instanceof Function) this._pvt_324dd3699b76c41a51accd67a9633e9d___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_324dd3699b76c41a51accd67a9633e9d___validate__ instanceof Function) this._pvt_324dd3699b76c41a51accd67a9633e9d___validate__(); /* c8 ignore stop */
  }
};

const EnumConstraint = new Proxy($EnumConstraint, {
  apply(receiver, self, args) {
    return new $EnumConstraint(...args);
  }
});
module.exports = exports = EnumConstraint;
EnumConstraint.prototype.validateValue = function (value) {
  const self = this; /* c8 ignore next */
  if (value != null) _core.dogma.expect("value", value, _core.any);
  {
    {
      const values = this.options;
      if (!values.includes(value)) {
        _core.dogma.raise(ConstraintError(`Invalid value. Got: ${value}. Expected: ${values}.`));
      }
    }
  }
  return value;
};