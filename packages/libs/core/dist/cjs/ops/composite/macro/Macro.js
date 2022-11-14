"use strict";

var _core = require("@dogmalang/core");
const CompositeOp = _core.dogma.use(require("../CompositeOp"));
const $Macro = class Macro extends CompositeOp {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_163c79cd38cc55e51fcf9a82685f515f___init__ instanceof Function) this._pvt_163c79cd38cc55e51fcf9a82685f515f___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_163c79cd38cc55e51fcf9a82685f515f___post__ instanceof Function) this._pvt_163c79cd38cc55e51fcf9a82685f515f___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_163c79cd38cc55e51fcf9a82685f515f___validate__ instanceof Function) this._pvt_163c79cd38cc55e51fcf9a82685f515f___validate__(); /* c8 ignore stop */
  }
};

const Macro = new Proxy($Macro, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'Macro' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = Macro;