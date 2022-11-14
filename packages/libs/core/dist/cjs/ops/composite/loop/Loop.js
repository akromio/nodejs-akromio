"use strict";

var _core = require("@dogmalang/core");
const CompositeOp = _core.dogma.use(require("../CompositeOp"));
const $Loop = class Loop extends CompositeOp {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_4127afdf6fc32ca8d9e0ad1e257fa3da___init__ instanceof Function) this._pvt_4127afdf6fc32ca8d9e0ad1e257fa3da___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_4127afdf6fc32ca8d9e0ad1e257fa3da___post__ instanceof Function) this._pvt_4127afdf6fc32ca8d9e0ad1e257fa3da___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_4127afdf6fc32ca8d9e0ad1e257fa3da___validate__ instanceof Function) this._pvt_4127afdf6fc32ca8d9e0ad1e257fa3da___validate__(); /* c8 ignore stop */
  }
};

const Loop = new Proxy($Loop, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'Loop' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = Loop;
/* c8 ignore start */
Loop.prototype.getCollection = function () {
  (0, _core.abstract)();
}; /* c8 ignore stop */