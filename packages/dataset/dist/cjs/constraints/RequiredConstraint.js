"use strict";

var _core = require("@dogmalang/core");
const Constraint = _core.dogma.use(require("./Constraint"));
const ConstraintError = _core.dogma.use(require("./ConstraintError"));
const $RequiredConstraint = class RequiredConstraint extends Constraint {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_c9eb847842de16802dbf40b939824328___init__ instanceof Function) this._pvt_c9eb847842de16802dbf40b939824328___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_c9eb847842de16802dbf40b939824328___post__ instanceof Function) this._pvt_c9eb847842de16802dbf40b939824328___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_c9eb847842de16802dbf40b939824328___validate__ instanceof Function) this._pvt_c9eb847842de16802dbf40b939824328___validate__(); /* c8 ignore stop */
  }
};

const RequiredConstraint = new Proxy($RequiredConstraint, {
  apply(receiver, self, args) {
    return new $RequiredConstraint(...args);
  }
});
module.exports = exports = RequiredConstraint;
RequiredConstraint.prototype.validateValue = function (value) {
  const self = this; /* c8 ignore next */
  if (value != null) _core.dogma.expect("value", value, _core.any);
  {
    if (value == null) {
      _core.dogma.raise(ConstraintError(`A value is required.`));
    }
  }
  return value;
};