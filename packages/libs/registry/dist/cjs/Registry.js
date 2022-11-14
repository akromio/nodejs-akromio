"use strict";

var _core = require("@dogmalang/core");
const Connector = _core.dogma.use(require("./Connector"));
const Item = _core.dogma.use(require("./Item"));
const $Registry = class Registry {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('name', _['name'], _core.text);
    Object.defineProperty(this, 'name', {
      value: (0, _core.coalesce)(_['name'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('client', _['client'], Connector);
    Object.defineProperty(this, 'client', {
      value: (0, _core.coalesce)(_['client'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_529bf1338336923a251886bcfb4c3ccf___init__ instanceof Function) this._pvt_529bf1338336923a251886bcfb4c3ccf___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_529bf1338336923a251886bcfb4c3ccf___post__ instanceof Function) this._pvt_529bf1338336923a251886bcfb4c3ccf___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_529bf1338336923a251886bcfb4c3ccf___validate__ instanceof Function) this._pvt_529bf1338336923a251886bcfb4c3ccf___validate__(); /* c8 ignore stop */
  }
};

const Registry = new Proxy($Registry, {
  apply(receiver, self, args) {
    return new $Registry(...args);
  }
});
module.exports = exports = Registry;
Registry.prototype.connect = async function () {
  const self = this;
  {
    0, await this.client.connect();
  }
  return this;
};
Registry.prototype.disconnect = async function () {
  const self = this;
  {
    0, await this.client.disconnect();
  }
  return this;
};
Registry.prototype.getItem = async function (itemPath) {
  const self = this;
  let item; /* c8 ignore next */
  _core.dogma.expect("itemPath", itemPath, _core.text);
  {
    if (item = (0, await this.client.getItem(itemPath))) {
      item = Item(_core.dogma.clone(item, {
        "registryName": this.name
      }, {}, [], []));
    }
  }
  return item;
};
Registry.prototype.downloadItem = function (itemPath, localPath, opts) {
  const self = this;
  let downloaded = false; /* c8 ignore next */
  _core.dogma.expect("itemPath", itemPath, _core.text); /* c8 ignore next */
  _core.dogma.expect("localPath", localPath, _core.text); /* c8 ignore next */
  if (opts != null) _core.dogma.expect("opts", opts, _core.map);
  {
    if (this.client.downloadItem) {
      return this.client.downloadItem(itemPath, localPath, opts);
    }
  }
  return downloaded;
};
Registry.prototype.listItems = function (itemPath) {
  const self = this;
  let children = []; /* c8 ignore next */
  _core.dogma.expect("itemPath", itemPath, _core.text);
  {
    if (this.client.listItems) {
      return this.client.listItems(itemPath);
    }
  }
  return children;
};