"use strict";

var _core = require("@dogmalang/core");
const SimpleOp = _core.dogma.use(require("../SimpleOp"));
const $Script = class Script extends SimpleOp {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('code', _['code'], _core.text);
    Object.defineProperty(this, 'code', {
      value: (0, _core.coalesce)(_['code'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['params'] != null) (0, _core.expect)('params', _['params'], _core.any); /* c8 ignore stop */
    Object.defineProperty(this, 'params', {
      value: (0, _core.coalesce)(_['params'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['kind'] != null) (0, _core.expect)('kind', _['kind'], ["async", "sync"]); /* c8 ignore stop */
    Object.defineProperty(this, 'kind', {
      value: (0, _core.coalesce)(_['kind'], "sync"),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['timeout'] != null) (0, _core.expect)('timeout', _['timeout'], _core.num); /* c8 ignore stop */
    Object.defineProperty(this, 'timeout', {
      value: (0, _core.coalesce)(_['timeout'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_0bd51c697098ee548c1683a1dd3056b9___init__ instanceof Function) this._pvt_0bd51c697098ee548c1683a1dd3056b9___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_0bd51c697098ee548c1683a1dd3056b9___post__ instanceof Function) this._pvt_0bd51c697098ee548c1683a1dd3056b9___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_0bd51c697098ee548c1683a1dd3056b9___validate__ instanceof Function) this._pvt_0bd51c697098ee548c1683a1dd3056b9___validate__(); /* c8 ignore stop */
  }
};

const Script = new Proxy($Script, {
  apply(receiver, self, args) {
    return new $Script(...args);
  }
});
module.exports = exports = Script;