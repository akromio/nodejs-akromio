"use strict";

var _core = require("@dogmalang/core");
const CompositeOperator = _core.dogma.use(require("../CompositeOperator"));
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