"use strict";

var _core = require("@dogmalang/core");
const Registry = _core.dogma.use(require("./Registry"));
const RegistryState = _core.dogma.use(require("./RegistryState"));
const $Registries = class Registries {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    Object.defineProperty(this, 'registries', {
      value: [],
      writable: false,
      enumerable: false
    });
    Object.defineProperty(this, 'state', {
      value: RegistryState.disconnected,
      writable: true,
      enumerable: false
    });
    /* c8 ignore start */
    if (this._pvt_4e3cda63b9a33e26a4be5ac6ec9bd534___init__ instanceof Function) this._pvt_4e3cda63b9a33e26a4be5ac6ec9bd534___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_4e3cda63b9a33e26a4be5ac6ec9bd534___post__ instanceof Function) this._pvt_4e3cda63b9a33e26a4be5ac6ec9bd534___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_4e3cda63b9a33e26a4be5ac6ec9bd534___validate__ instanceof Function) this._pvt_4e3cda63b9a33e26a4be5ac6ec9bd534___validate__(); /* c8 ignore stop */
  }
};

const Registries = new Proxy($Registries, {
  apply(receiver, self, args) {
    return new $Registries(...args);
  }
});
module.exports = exports = Registries;
Object.defineProperty(Registries.prototype, "registryNames", {
  enum: true,
  get: function () {
    const self = this;
    {
      return this.registries.map(reg => {
        /* c8 ignore next */_core.dogma.expect("reg", reg);
        {
          return reg.name;
        }
      });
    }
  }
});
Object.defineProperty(Registries.prototype, "len", {
  enum: true,
  get: function () {
    const self = this;
    {
      return (0, _core.len)(this.registries);
    }
  }
});
Registries.prototype.connect = async function () {
  const self = this;
  {
    if (_core.dogma.enumEq(this.state, "disconnected")) {
      this.state = _core.dogma.enumGet(this.state, "connected");
      for (const registry of this.registries) {
        0, await registry.connect();
      }
    }
  }
  return this;
};
Registries.prototype.disconnect = async function () {
  const self = this;
  {
    if (!_core.dogma.enumEq(this.state, "disconnected")) {
      this.state = _core.dogma.enumGet(this.state, "disconnected");
      for (const registry of this.registries) {
        0, await registry.disconnect();
      }
    }
  }
  return this;
};
Registries.prototype.appendRegistry = function (reg) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("reg", reg, Registry);
  {
    if (_core.dogma.enumEq(this.state, "connected")) {
      _core.dogma.raise(TypeError("New registries can only be appended when disconnected."));
    }
    this.registries.push(reg);
  }
  return this;
};
Registries.prototype.getRegistry = function (name) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("name", name, _core.text);
  {
    return this.registries.find(reg => {
      /* c8 ignore next */_core.dogma.expect("reg", reg);
      {
        return reg.name == name;
      }
    });
  }
};
Registries.prototype.checkConnectedState = function () {
  const self = this;
  {
    if (!_core.dogma.enumEq(this.state, "connected")) {
      _core.dogma.raise(TypeError("The registries must be connected for performing the op."));
    }
  }
};
Registries.prototype.getItem = function (itemPath, opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("itemPath", itemPath, _core.text); /* c8 ignore next */
  if (opts != null) _core.dogma.expect("opts", opts, _core.dogma.intf("inline", {
    registryName: {
      optional: true,
      type: _core.text
    }
  }));
  let {
    registryName
  } = opts || {};
  {
    this.checkConnectedState();
    return registryName ? this.getItemFromRegistry(itemPath, registryName) : this.getItemFromRegistries(itemPath);
  }
};
Registries.prototype.getItemFromRegistries = async function (itemPath) {
  const self = this;
  let item; /* c8 ignore next */
  _core.dogma.expect("itemPath", itemPath, _core.text);
  {
    for (const registry of this.registries) {
      if (item = (0, await registry.getItem(itemPath))) {
        break;
      }
    }
  }
  return item;
};
Registries.prototype.getItemFromRegistry = function (itemPath, registry) {
  const self = this;
  let item; /* c8 ignore next */
  _core.dogma.expect("itemPath", itemPath, _core.text); /* c8 ignore next */
  _core.dogma.expect("registry", registry, _core.text);
  {
    if (registry = this.getRegistry(registry)) {
      item = registry.getItem(itemPath);
    }
  }
  return item;
};
Registries.prototype.downloadItem = function (itemPath, localPath, opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("itemPath", itemPath, _core.text); /* c8 ignore next */
  _core.dogma.expect("localPath", localPath, _core.text); /* c8 ignore next */
  if (opts != null) _core.dogma.expect("opts", opts, _core.dogma.intf("inline", {
    registryName: {
      optional: true,
      type: _core.text
    }
  }));
  let {
    registryName
  } = opts || {};
  {
    this.checkConnectedState();
    return registryName ? this.downloadItemFromRegistry(itemPath, localPath, registryName, opts) : this.downloadItemFromRegistries(itemPath, localPath, opts);
  }
};
Registries.prototype.downloadItemFromRegistries = async function (itemPath, localPath, opts) {
  const self = this;
  let downloaded = false; /* c8 ignore next */
  _core.dogma.expect("itemPath", itemPath, _core.text); /* c8 ignore next */
  _core.dogma.expect("localPath", localPath, _core.text); /* c8 ignore next */
  if (opts != null) _core.dogma.expect("opts", opts, _core.map);
  {
    for (const registry of this.registries) {
      if (downloaded = (0, await registry.downloadItem(itemPath, localPath, opts))) {
        break;
      }
    }
  }
  return downloaded;
};
Registries.prototype.downloadItemFromRegistry = function (itemPath, localPath, registryName, opts) {
  const self = this;
  let downloaded = false; /* c8 ignore next */
  _core.dogma.expect("itemPath", itemPath, _core.text); /* c8 ignore next */
  _core.dogma.expect("localPath", localPath, _core.text); /* c8 ignore next */
  _core.dogma.expect("registryName", registryName, _core.text); /* c8 ignore next */
  if (opts != null) _core.dogma.expect("opts", opts, _core.map);
  {
    {
      const registry = this.getRegistry(registryName);
      if (registry) {
        return registry.downloadItem(itemPath, localPath, opts);
      }
    }
  }
  return downloaded;
};