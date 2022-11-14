"use strict";

var _core = require("@dogmalang/core");
const {
  CatalogParser,
  JobParser
} = _core.dogma.use(require("@akromio/catalog"));
const Catalog = _core.dogma.use(require("./JobCatalog"));
const $JobCatalogParser = class JobCatalogParser extends CatalogParser {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    Object.defineProperty(this, 'jobParser', {
      value: (0, _core.coalesce)(_['jobParser'], JobParser()),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_9eb134306e7270ca5efb424f4db58c7e___init__ instanceof Function) this._pvt_9eb134306e7270ca5efb424f4db58c7e___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_9eb134306e7270ca5efb424f4db58c7e___post__ instanceof Function) this._pvt_9eb134306e7270ca5efb424f4db58c7e___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_9eb134306e7270ca5efb424f4db58c7e___validate__ instanceof Function) this._pvt_9eb134306e7270ca5efb424f4db58c7e___validate__(); /* c8 ignore stop */
  }
};

const JobCatalogParser = new Proxy($JobCatalogParser, {
  apply(receiver, self, args) {
    return new $JobCatalogParser(...args);
  }
});
module.exports = exports = JobCatalogParser;
JobCatalogParser.prototype.createCatalog = function (decl) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map);
  {
    return Catalog(decl);
  }
};