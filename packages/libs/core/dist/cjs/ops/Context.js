"use strict";

var _core = require("@dogmalang/core");
const $Context = class Context {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    Object.defineProperty(this, 'params', {
      value: (0, _core.coalesce)(_['params'], null),
      writable: false,
      enumerable: true
    });
    Object.defineProperty(this, 'state', {
      value: (0, _core.coalesce)(_['state'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('log', _['log'], _core.func);
    Object.defineProperty(this, 'log', {
      value: (0, _core.coalesce)(_['log'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_aee6b6340fba3463e15127355a649d78___init__ instanceof Function) this._pvt_aee6b6340fba3463e15127355a649d78___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_aee6b6340fba3463e15127355a649d78___post__ instanceof Function) this._pvt_aee6b6340fba3463e15127355a649d78___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_aee6b6340fba3463e15127355a649d78___validate__ instanceof Function) this._pvt_aee6b6340fba3463e15127355a649d78___validate__(); /* c8 ignore stop */
  }
};

const Context = new Proxy($Context, {
  apply(receiver, self, args) {
    return new $Context(...args);
  }
});
module.exports = exports = Context;