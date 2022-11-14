"use strict";

var _core = require("@dogmalang/core");
const NotFoundError = _core.dogma.use(require("../errors/NotFoundError"));
const Op = _core.dogma.use(require("./Op"));
const $Ops = class Ops {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    Object.defineProperty(this, 'ops', {
      value: (0, _core.coalesce)(_['ops'], {}),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_8f26eee455f62597ba5cd03d622cf551___init__ instanceof Function) this._pvt_8f26eee455f62597ba5cd03d622cf551___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_8f26eee455f62597ba5cd03d622cf551___post__ instanceof Function) this._pvt_8f26eee455f62597ba5cd03d622cf551___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_8f26eee455f62597ba5cd03d622cf551___validate__ instanceof Function) this._pvt_8f26eee455f62597ba5cd03d622cf551___validate__(); /* c8 ignore stop */
  }
};

const Ops = new Proxy($Ops, {
  apply(receiver, self, args) {
    return new $Ops(...args);
  }
});
module.exports = exports = Ops;
Object.defineProperty(Ops.prototype, "len", {
  enum: true,
  get: function () {
    const self = this;
    {
      return (0, _core.len)(this.ops);
    }
  }
});
Ops.prototype.appendOp = function (op) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("op", op, Op);
  {
    _core.dogma.setItem("=", this.ops, op.name, op);
  }
  return this;
};
Ops.prototype.appendOps = function (...ops) {
  const self = this;
  {
    for (const op of ops) {
      this.appendOp(op);
    }
  }
  return this;
};
Ops.prototype.appendPlugin = function (pi) {
  const self = this;
  {
    for (const [_, op] of Object.entries(pi.ops.ops)) {
      {
        _core.dogma.setItem("=", this.ops, `${pi.name}.${op.name}`, op);
      }
    }
    if (pi.hasDefaultOp()) {
      _core.dogma.setItem("=", this.ops, pi.name, _core.dogma.getItem(pi.ops.ops, pi.defaultOpName));
    }
  }
  return this;
};
Ops.prototype.appendPlugins = function (...plugins) {
  const self = this;
  {
    for (const plugin of plugins) {
      this.appendPlugin(plugin);
    }
  }
  return this;
};
Ops.prototype.getOp = function (name, opts) {
  const self = this;
  let op; /* c8 ignore next */
  _core.dogma.expect("name", name, _core.text); /* c8 ignore next */
  if (opts != null) _core.dogma.expect("opts", opts, _core.dogma.intf("inline", {
    raiseIfNotFound: {
      optional: true,
      type: _core.bool
    }
  }));
  {
    if (!(op = _core.dogma.getItem(this.ops, name)) && (opts != null ? opts.raiseIfNotFound : null)) {
      _core.dogma.raise(NotFoundError(`Operation '${name}' not found.`));
    }
  }
  return op;
};