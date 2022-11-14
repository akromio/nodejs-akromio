"use strict";

var _core = require("@dogmalang/core");
const Activity = _core.dogma.use(require("../ops/Activity"));
const Ops = _core.dogma.use(require("../ops/Ops"));
const SimpleOp = _core.dogma.use(require("../ops/simple/SimpleOp"));
const $Plugin = class Plugin extends Activity {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (_['defaultOpName'] != null) (0, _core.expect)('defaultOpName', _['defaultOpName'], _core.text); /* c8 ignore stop */
    Object.defineProperty(this, 'defaultOpName', {
      value: (0, _core.coalesce)(_['defaultOpName'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['ops'] != null) (0, _core.expect)('ops', _['ops'], Ops); /* c8 ignore stop */
    Object.defineProperty(this, 'ops', {
      value: (0, _core.coalesce)(_['ops'], Ops()),
      writable: false,
      enumerable: false
    });
    Object.defineProperty(this, 'state', {
      value: (0, _core.coalesce)(_['state'], null),
      writable: false,
      enumerable: false
    });
    /* c8 ignore start */
    if (_['finalizer'] != null) (0, _core.expect)('finalizer', _['finalizer'], _core.func); /* c8 ignore stop */
    Object.defineProperty(this, 'finalizer', {
      value: (0, _core.coalesce)(_['finalizer'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_a6de356be1282bc8b0df83364514541f___init__ instanceof Function) this._pvt_a6de356be1282bc8b0df83364514541f___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_a6de356be1282bc8b0df83364514541f___post__ instanceof Function) this._pvt_a6de356be1282bc8b0df83364514541f___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_a6de356be1282bc8b0df83364514541f___validate__ instanceof Function) this._pvt_a6de356be1282bc8b0df83364514541f___validate__(); /* c8 ignore stop */
  }
};

const Plugin = new Proxy($Plugin, {
  apply(receiver, self, args) {
    return new $Plugin(...args);
  }
});
module.exports = exports = Plugin;
Plugin.prototype.hasDefaultOp = function () {
  const self = this;
  {
    return (0, _core.bool)(this.defaultOpName);
  }
};
Plugin.prototype.appendOp = function (op) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("op", op, SimpleOp);
  {
    this.ops.appendOp(op);
    op.parentPlugin = this;
  }
  return this;
};
Plugin.prototype.finalize = async function () {
  const self = this;
  {
    if (this.finalizer) {
      0, await this.finalizer(this.state);
    }
  }
};