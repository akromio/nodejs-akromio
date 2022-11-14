"use strict";

var _core = require("@dogmalang/core");
const NotFoundError = _core.dogma.use(require("../errors/NotFoundError"));
const Plugin = _core.dogma.use(require("./Plugin"));
const $Plugins = class Plugins {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    Object.defineProperty(this, 'items', {
      value: {},
      writable: false,
      enumerable: false
    });
    /* c8 ignore start */
    if (this._pvt_c477a78322e93ee9c2846f3d6abacc70___init__ instanceof Function) this._pvt_c477a78322e93ee9c2846f3d6abacc70___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_c477a78322e93ee9c2846f3d6abacc70___post__ instanceof Function) this._pvt_c477a78322e93ee9c2846f3d6abacc70___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_c477a78322e93ee9c2846f3d6abacc70___validate__ instanceof Function) this._pvt_c477a78322e93ee9c2846f3d6abacc70___validate__(); /* c8 ignore stop */
  }
};

const Plugins = new Proxy($Plugins, {
  apply(receiver, self, args) {
    return new $Plugins(...args);
  }
});
module.exports = exports = Plugins;
Object.defineProperty(Plugins.prototype, "plugins", {
  enum: true,
  get: function () {
    const self = this;
    {
      return (0, _core.values)(this.items);
    }
  }
});
Object.defineProperty(Plugins.prototype, "len", {
  enum: true,
  get: function () {
    const self = this;
    {
      return (0, _core.len)(this.items);
    }
  }
});
Plugins.prototype.appendPlugin = function (pi) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("pi", pi, Plugin);
  {
    _core.dogma.setItem("=", this.items, pi.name, pi);
  }
  return this;
};
Plugins.prototype.appendPlugins = function (...pis) {
  const self = this;
  {
    for (const pi of pis) {
      this.appendPlugin(pi);
    }
  }
  return this;
};
Plugins.prototype.getPlugin = function (name, opts) {
  const self = this;
  let plugin; /* c8 ignore next */
  _core.dogma.expect("name", name, _core.text); /* c8 ignore next */
  if (opts != null) _core.dogma.expect("opts", opts, _core.dogma.intf("inline", {
    raiseIfNotFound: {
      optional: true,
      type: _core.bool
    }
  }));
  {
    if (!(plugin = _core.dogma.getItem(this.items, name)) && (opts != null ? opts.raiseIfNotFound : null)) {
      _core.dogma.raise(NotFoundError(`Plugin '${name}' not found.`));
    }
  }
  return plugin;
};
Plugins.prototype.finalize = async function () {
  const self = this;
  {
    for (const pi of this.plugins) {
      0, await pi.finalize();
    }
  }
};