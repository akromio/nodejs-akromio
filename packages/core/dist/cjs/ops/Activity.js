"use strict";

var _core = require("@dogmalang/core");
const $Activity = class Activity {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('name', _['name'], _core.text);
    Object.defineProperty(this, 'name', {
      value: (0, _core.coalesce)(_['name'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['desc'] != null) (0, _core.expect)('desc', _['desc'], _core.text); /* c8 ignore stop */
    Object.defineProperty(this, 'desc', {
      value: (0, _core.coalesce)(_['desc'], ""),
      writable: false,
      enumerable: true
    });
    Object.defineProperty(this, 'tags', {
      value: (0, _core.coalesce)(_['tags'], []),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_6a6abf560b06d5534a314c2f6952c8aa___init__ instanceof Function) this._pvt_6a6abf560b06d5534a314c2f6952c8aa___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_6a6abf560b06d5534a314c2f6952c8aa___post__ instanceof Function) this._pvt_6a6abf560b06d5534a314c2f6952c8aa___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_6a6abf560b06d5534a314c2f6952c8aa___validate__ instanceof Function) this._pvt_6a6abf560b06d5534a314c2f6952c8aa___validate__(); /* c8 ignore stop */
  }
};

const Activity = new Proxy($Activity, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'Activity' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = Activity;