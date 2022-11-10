"use strict";

var _core = require("@dogmalang/core");
const $Result = class Result {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('callId', _['callId'], _core.text);
    Object.defineProperty(this, 'callId', {
      value: (0, _core.coalesce)(_['callId'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('title', _['title'], _core.text);
    Object.defineProperty(this, 'title', {
      value: (0, _core.coalesce)(_['title'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('duration', _['duration'], _core.num);
    Object.defineProperty(this, 'duration', {
      value: (0, _core.coalesce)(_['duration'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('kind', _['kind'], ["ok", "failed"]);
    Object.defineProperty(this, 'kind', {
      value: (0, _core.coalesce)(_['kind'], null),
      writable: false,
      enumerable: true
    });
    Object.defineProperty(this, 'value', {
      value: (0, _core.coalesce)(_['value'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('onError', _['onError'], ["carryOn", "finish"]);
    Object.defineProperty(this, 'onError', {
      value: (0, _core.coalesce)(_['onError'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_3981310a308aa0ba8427a1369b5cb71b___init__ instanceof Function) this._pvt_3981310a308aa0ba8427a1369b5cb71b___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_3981310a308aa0ba8427a1369b5cb71b___post__ instanceof Function) this._pvt_3981310a308aa0ba8427a1369b5cb71b___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_3981310a308aa0ba8427a1369b5cb71b___validate__ instanceof Function) this._pvt_3981310a308aa0ba8427a1369b5cb71b___validate__(); /* c8 ignore stop */
  }
};

const Result = new Proxy($Result, {
  apply(receiver, self, args) {
    return new $Result(...args);
  }
});
module.exports = exports = Result;
Object.defineProperty(Result.prototype, "returned", {
  enum: true,
  get: function () {
    const self = this;
    {
      return this.value;
    }
  }
});
Object.defineProperty(Result.prototype, "raised", {
  enum: true,
  get: function () {
    const self = this;
    {
      return this.value;
    }
  }
});