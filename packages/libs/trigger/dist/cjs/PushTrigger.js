"use strict";

var _core = require("@dogmalang/core");
const Trigger = _core.dogma.use(require("./Trigger"));
const $PushTrigger = class PushTrigger extends Trigger {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_ebf5aeba6991e2873aa0ac44f9bec368___init__ instanceof Function) this._pvt_ebf5aeba6991e2873aa0ac44f9bec368___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_ebf5aeba6991e2873aa0ac44f9bec368___post__ instanceof Function) this._pvt_ebf5aeba6991e2873aa0ac44f9bec368___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_ebf5aeba6991e2873aa0ac44f9bec368___validate__ instanceof Function) this._pvt_ebf5aeba6991e2873aa0ac44f9bec368___validate__(); /* c8 ignore stop */
  }
};

const PushTrigger = new Proxy($PushTrigger, {
  apply(receiver, self, args) {
    return new $PushTrigger(...args);
  }
});
module.exports = exports = PushTrigger;