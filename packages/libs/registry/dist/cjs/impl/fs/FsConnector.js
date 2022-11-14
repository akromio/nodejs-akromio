"use strict";

var _core = require("@dogmalang/core");
const mime = _core.dogma.use(require("mime-types"));
const fs = _core.dogma.use(require("fs/promises"));
const path = _core.dogma.use(require("path"));
const InternalConnector = _core.dogma.use(require("../InternalConnector"));
const $FsConnector = class FsConnector extends InternalConnector {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('basePath', _['basePath'], _core.text);
    Object.defineProperty(this, 'basePath', {
      value: (0, _core.coalesce)(_['basePath'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_ff99ccddc8d8348b9fb8db30bf2cc5f3___init__ instanceof Function) this._pvt_ff99ccddc8d8348b9fb8db30bf2cc5f3___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_ff99ccddc8d8348b9fb8db30bf2cc5f3___post__ instanceof Function) this._pvt_ff99ccddc8d8348b9fb8db30bf2cc5f3___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_ff99ccddc8d8348b9fb8db30bf2cc5f3___validate__ instanceof Function) this._pvt_ff99ccddc8d8348b9fb8db30bf2cc5f3___validate__(); /* c8 ignore stop */
  }
};

const FsConnector = new Proxy($FsConnector, {
  apply(receiver, self, args) {
    return new $FsConnector(...args);
  }
});
module.exports = exports = FsConnector;
FsConnector.prototype._getItem = async function (itemPath) {
  const self = this;
  let item; /* c8 ignore next */
  _core.dogma.expect("itemPath", itemPath, _core.text);
  {
    const loc = path.join(this.basePath, itemPath);
    {
      const [ok, content] = await _core.dogma.pawait(() => fs.readFile(loc, "utf8"));
      if (ok) {
        item = {
          ["name"]: itemPath,
          ["value"]: content,
          ["cty"]: mime.lookup(itemPath) || "text/plain"
        };
      }
    }
  }
  return item;
};
FsConnector.prototype.listItems = async function (dirPath) {
  const self = this;
  let items = []; /* c8 ignore next */
  _core.dogma.expect("dirPath", dirPath, _core.text);
  {
    const loc = path.join(this.basePath, dirPath);
    {
      const [ok, entries] = await _core.dogma.pawait(() => fs.readdir(loc));
      if (ok) {
        items = entries;
      }
    }
  }
  return items;
};