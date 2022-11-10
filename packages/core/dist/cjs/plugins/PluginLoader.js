"use strict";

var _core = require("@dogmalang/core");
const $PluginLoader = class PluginLoader {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (_['paths'] != null) (0, _core.expect)('paths', _['paths'], _core.dogma.TypeDef({
      name: 'inline',
      types: [_core.text],
      min: 0,
      max: null
    })); /* c8 ignore stop */
    Object.defineProperty(this, 'paths', {
      value: (0, _core.coalesce)(_['paths'], []),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_758bccf0cc95e9ca177ecb38485447fa___init__ instanceof Function) this._pvt_758bccf0cc95e9ca177ecb38485447fa___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_758bccf0cc95e9ca177ecb38485447fa___post__ instanceof Function) this._pvt_758bccf0cc95e9ca177ecb38485447fa___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_758bccf0cc95e9ca177ecb38485447fa___validate__ instanceof Function) this._pvt_758bccf0cc95e9ca177ecb38485447fa___validate__(); /* c8 ignore stop */
  }
};

const PluginLoader = new Proxy($PluginLoader, {
  apply(receiver, self, args) {
    return new $PluginLoader(...args);
  }
});
module.exports = exports = PluginLoader;
PluginLoader.prototype.loadPlugin = function (name) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("name", name, _core.text);
  {
    var _this$loadDefault;
    return (_this$loadDefault = this.loadDefault(name)) !== null && _this$loadDefault !== void 0 ? _this$loadDefault : this.loadFromPaths(this.paths, name);
  }
};
PluginLoader.prototype.loadPreset = function (name) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("name", name, _core.text);
  {
    return this.loadPlugin(name);
  }
};
PluginLoader.prototype.loadDefault = function (name) {
  const self = this;
  let decl = {}; /* c8 ignore next */
  _core.dogma.expect("name", name, _core.text);
  {
    {
      const [ok, value] = _core.dogma.peval(() => {
        return _core.dogma.use(require(name));
      }); /*c8 ignore else*/
      if (ok) {
        decl = value;
      } else if (value.code == "MODULE_NOT_FOUND") {
        decl = null;
      } /* c8 ignore start */else {
        _core.dogma.raise(value);
      } /* c8 ignore stop */
    }
  }
  return decl;
};
PluginLoader.prototype.loadFromPaths = function (paths, name) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("paths", paths, _core.dogma.TypeDef({
    name: 'inline',
    types: [_core.text],
    min: 0,
    max: null
  })); /* c8 ignore next */
  _core.dogma.expect("name", name, _core.text);
  {
    return _core.dogma.use(require(require.resolve(name, {
      'paths': paths
    })));
  }
};