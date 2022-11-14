"use strict";

var _core = require("@dogmalang/core");
const $Constraint = class Constraint {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_e9c93fc93e7f9371c47973a36e464aaa___init__ instanceof Function) this._pvt_e9c93fc93e7f9371c47973a36e464aaa___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_e9c93fc93e7f9371c47973a36e464aaa___post__ instanceof Function) this._pvt_e9c93fc93e7f9371c47973a36e464aaa___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_e9c93fc93e7f9371c47973a36e464aaa___validate__ instanceof Function) this._pvt_e9c93fc93e7f9371c47973a36e464aaa___validate__(); /* c8 ignore stop */
  }
};

const Constraint = new Proxy($Constraint, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'Constraint' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = Constraint;
/* c8 ignore start */
Constraint.prototype.validateValue = function () {
  (0, _core.abstract)();
}; /* c8 ignore stop */