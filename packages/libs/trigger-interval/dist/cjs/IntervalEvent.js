"use strict";

var _core = require("@dogmalang/core");
const $IntervalEvent = class IntervalEvent {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('ts', _['ts'], _core.timestamp);
    Object.defineProperty(this, 'ts', {
      value: (0, _core.coalesce)(_['ts'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('last', _['last'], _core.bool);
    Object.defineProperty(this, 'last', {
      value: (0, _core.coalesce)(_['last'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_d5f81915c61e5d368b3d1e8d5accb3ec___init__ instanceof Function) this._pvt_d5f81915c61e5d368b3d1e8d5accb3ec___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_d5f81915c61e5d368b3d1e8d5accb3ec___post__ instanceof Function) this._pvt_d5f81915c61e5d368b3d1e8d5accb3ec___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_d5f81915c61e5d368b3d1e8d5accb3ec___validate__ instanceof Function) this._pvt_d5f81915c61e5d368b3d1e8d5accb3ec___validate__(); /* c8 ignore stop */
  }
};

const IntervalEvent = new Proxy($IntervalEvent, {
  apply(receiver, self, args) {
    return new $IntervalEvent(...args);
  }
});
module.exports = exports = IntervalEvent;