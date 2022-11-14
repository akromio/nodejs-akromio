"use strict";

var _core = require("@dogmalang/core");
const {
  CatalogReader: CatalogReaderBase
} = _core.dogma.use(require("@akromio/catalog-reader"));
const {
  JobCatalogMerger: CatalogMerger
} = _core.dogma.use(require("@akromio/jobs"));
const $CatalogReader = class CatalogReader extends CatalogReaderBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    Object.defineProperty(this, 'merger', {
      value: (0, _core.coalesce)(_['merger'], CatalogMerger()),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_11cd56c3593543d115d0151eacb13d98___init__ instanceof Function) this._pvt_11cd56c3593543d115d0151eacb13d98___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_11cd56c3593543d115d0151eacb13d98___post__ instanceof Function) this._pvt_11cd56c3593543d115d0151eacb13d98___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_11cd56c3593543d115d0151eacb13d98___validate__ instanceof Function) this._pvt_11cd56c3593543d115d0151eacb13d98___validate__(); /* c8 ignore stop */
  }
};

const CatalogReader = new Proxy($CatalogReader, {
  apply(receiver, self, args) {
    return new $CatalogReader(...args);
  }
});
module.exports = exports = CatalogReader;