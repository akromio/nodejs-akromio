"use strict";

var _core = require("@dogmalang/core");
const {
  CatalogMerger
} = _core.dogma.use(require("@akromio/catalog"));
const $JobCatalogMerger = class JobCatalogMerger extends CatalogMerger {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_8d59d432ced12270942a7dec5d5c4c18___init__ instanceof Function) this._pvt_8d59d432ced12270942a7dec5d5c4c18___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_8d59d432ced12270942a7dec5d5c4c18___post__ instanceof Function) this._pvt_8d59d432ced12270942a7dec5d5c4c18___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_8d59d432ced12270942a7dec5d5c4c18___validate__ instanceof Function) this._pvt_8d59d432ced12270942a7dec5d5c4c18___validate__(); /* c8 ignore stop */
  }
};

const JobCatalogMerger = new Proxy($JobCatalogMerger, {
  apply(receiver, self, args) {
    return new $JobCatalogMerger(...args);
  }
});
module.exports = exports = JobCatalogMerger;