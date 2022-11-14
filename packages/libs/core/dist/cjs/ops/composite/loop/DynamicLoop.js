"use strict";

var _core = require("@dogmalang/core");
const Loop = _core.dogma.use(require("./Loop"));
const $DynamicLoop = class DynamicLoop extends Loop {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_aa2426eb60ca7144724e949e36f06f95___init__ instanceof Function) this._pvt_aa2426eb60ca7144724e949e36f06f95___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_aa2426eb60ca7144724e949e36f06f95___post__ instanceof Function) this._pvt_aa2426eb60ca7144724e949e36f06f95___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_aa2426eb60ca7144724e949e36f06f95___validate__ instanceof Function) this._pvt_aa2426eb60ca7144724e949e36f06f95___validate__(); /* c8 ignore stop */
  }
};

const DynamicLoop = new Proxy($DynamicLoop, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'DynamicLoop' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = DynamicLoop;