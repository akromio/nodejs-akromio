"use strict";

var _core = require("@dogmalang/core");
const $CatalogItem = class CatalogItem {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('name', _['name'], _core.text);
    Object.defineProperty(this, 'name', {
      value: (0, _core.coalesce)(_['name'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['desc'] != null) (0, _core.expect)('desc', _['desc'], _core.text); /* c8 ignore stop */
    Object.defineProperty(this, 'desc', {
      value: (0, _core.coalesce)(_['desc'], null),
      writable: false,
      enumerable: true
    });
    Object.defineProperty(this, 'tags', {
      value: (0, _core.coalesce)(_['tags'], []),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_71293214924f76e6115e3c0fd6b7c4af___init__ instanceof Function) this._pvt_71293214924f76e6115e3c0fd6b7c4af___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_71293214924f76e6115e3c0fd6b7c4af___post__ instanceof Function) this._pvt_71293214924f76e6115e3c0fd6b7c4af___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_71293214924f76e6115e3c0fd6b7c4af___validate__ instanceof Function) this._pvt_71293214924f76e6115e3c0fd6b7c4af___validate__(); /* c8 ignore stop */
  }
};

const CatalogItem = new Proxy($CatalogItem, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'CatalogItem' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = CatalogItem;