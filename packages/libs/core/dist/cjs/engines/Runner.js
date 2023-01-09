"use strict";

var _core = require("@dogmalang/core");
const {
  Writable
} = _core.dogma.use(require("stream"));
const $Runner = class Runner {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('log', _['log'], Writable);
    Object.defineProperty(this, 'log', {
      value: (0, _core.coalesce)(_['log'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_3622056f25e40ee60000e63dbd3e483d___init__ instanceof Function) this._pvt_3622056f25e40ee60000e63dbd3e483d___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_3622056f25e40ee60000e63dbd3e483d___post__ instanceof Function) this._pvt_3622056f25e40ee60000e63dbd3e483d___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_3622056f25e40ee60000e63dbd3e483d___validate__ instanceof Function) this._pvt_3622056f25e40ee60000e63dbd3e483d___validate__(); /* c8 ignore stop */
  }
};

const Runner = new Proxy($Runner, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'Runner' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = Runner;