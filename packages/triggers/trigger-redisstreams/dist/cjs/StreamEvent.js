"use strict";

var _core = require("@dogmalang/core");
const $StreamEvent = class StreamEvent {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('payload', _['payload'], _core.any);
    Object.defineProperty(this, 'payload', {
      value: (0, _core.coalesce)(_['payload'], null),
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
    if (this._pvt_e41831029b94eb7efd93f23f78e48606___init__ instanceof Function) this._pvt_e41831029b94eb7efd93f23f78e48606___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_e41831029b94eb7efd93f23f78e48606___post__ instanceof Function) this._pvt_e41831029b94eb7efd93f23f78e48606___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_e41831029b94eb7efd93f23f78e48606___validate__ instanceof Function) this._pvt_e41831029b94eb7efd93f23f78e48606___validate__(); /* c8 ignore stop */
  }
};

const StreamEvent = new Proxy($StreamEvent, {
  apply(receiver, self, args) {
    return new $StreamEvent(...args);
  }
});
module.exports = exports = StreamEvent;