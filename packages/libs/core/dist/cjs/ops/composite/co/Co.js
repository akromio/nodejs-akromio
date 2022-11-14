"use strict";

var _core = require("@dogmalang/core");
const CompositeOp = _core.dogma.use(require("../CompositeOp"));
const $Co = class Co extends CompositeOp {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_35647c75d1164ccbf79f2d1b8d86a6d3___init__ instanceof Function) this._pvt_35647c75d1164ccbf79f2d1b8d86a6d3___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_35647c75d1164ccbf79f2d1b8d86a6d3___post__ instanceof Function) this._pvt_35647c75d1164ccbf79f2d1b8d86a6d3___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_35647c75d1164ccbf79f2d1b8d86a6d3___validate__ instanceof Function) this._pvt_35647c75d1164ccbf79f2d1b8d86a6d3___validate__(); /* c8 ignore stop */
  }
};

const Co = new Proxy($Co, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'Co' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = Co;