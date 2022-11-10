"use strict";

var _core = require("@dogmalang/core");
const Action = _core.dogma.use(require("./Action"));
const $StaticAction = class StaticAction extends Action {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('fun', _['fun'], _core.func);
    Object.defineProperty(this, 'fun', {
      value: (0, _core.coalesce)(_['fun'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_f81dbc83711be885496b148f6d1aa13b___init__ instanceof Function) this._pvt_f81dbc83711be885496b148f6d1aa13b___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_f81dbc83711be885496b148f6d1aa13b___post__ instanceof Function) this._pvt_f81dbc83711be885496b148f6d1aa13b___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_f81dbc83711be885496b148f6d1aa13b___validate__ instanceof Function) this._pvt_f81dbc83711be885496b148f6d1aa13b___validate__(); /* c8 ignore stop */
  }
};

const StaticAction = new Proxy($StaticAction, {
  apply(receiver, self, args) {
    return new $StaticAction(...args);
  }
});
module.exports = exports = StaticAction;
StaticAction.prototype.getFn = function () {
  const self = this;
  {
    return this.fun;
  }
};