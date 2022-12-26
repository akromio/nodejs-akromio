"use strict";

var _core = require("@dogmalang/core");
const CatalogItemParseOpts = _core.dogma.use(require("./CatalogItemParseOpts"));
const $CatalogItemParser = class CatalogItemParser {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_12c818bcca2c017da71353c480c01168___init__ instanceof Function) this._pvt_12c818bcca2c017da71353c480c01168___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_12c818bcca2c017da71353c480c01168___post__ instanceof Function) this._pvt_12c818bcca2c017da71353c480c01168___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_12c818bcca2c017da71353c480c01168___validate__ instanceof Function) this._pvt_12c818bcca2c017da71353c480c01168___validate__(); /* c8 ignore stop */
  }
};

const CatalogItemParser = new Proxy($CatalogItemParser, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'CatalogItemParser' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = CatalogItemParser;
CatalogItemParser.prototype.parse = function (decl, opts) {
  const self = this;
  let items = {}; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.dogma.TypeDef({
    name: 'inline',
    types: [_core.map],
    min: 0,
    max: null
  })); /* c8 ignore next */
  _core.dogma.expect("opts", opts, CatalogItemParseOpts);
  {
    for (let item of decl) {
      if (_core.dogma.includes(item, "group")) {
        for (const aux of this.parseGroup(item, opts)) {
          _core.dogma.setItem("=", items, aux.name, aux);
        }
      } else {
        item = this.parseItem(item, opts);
        _core.dogma.setItem("=", items, item.name, item);
      }
    }
  }
  return items;
};
/* c8 ignore start */
CatalogItemParser.prototype.parseItem = function () {
  (0, _core.abstract)();
}; /* c8 ignore stop */
CatalogItemParser.prototype.parseGroup = function (decl, opts) {
  const self = this;
  let items = []; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("opts", opts, CatalogItemParseOpts);
  {
    const tag = decl.group;
    for (let item of _core.dogma.getItem(decl, this.itemName + "s")) {
      item = this.parseItem(item, opts);
      item.tags.push(tag);
      items.push(item);
    }
  }
  return items;
};