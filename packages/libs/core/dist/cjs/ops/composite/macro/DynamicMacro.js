"use strict";

var _core = require("@dogmalang/core");
const Macro = _core.dogma.use(require("./Macro"));
const $DynamicMacro = class DynamicMacro extends Macro {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_1815d63e4d5e8719f77c62cf40185511___init__ instanceof Function) this._pvt_1815d63e4d5e8719f77c62cf40185511___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_1815d63e4d5e8719f77c62cf40185511___post__ instanceof Function) this._pvt_1815d63e4d5e8719f77c62cf40185511___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_1815d63e4d5e8719f77c62cf40185511___validate__ instanceof Function) this._pvt_1815d63e4d5e8719f77c62cf40185511___validate__(); /* c8 ignore stop */
  }
};

const DynamicMacro = new Proxy($DynamicMacro, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'DynamicMacro' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = DynamicMacro;