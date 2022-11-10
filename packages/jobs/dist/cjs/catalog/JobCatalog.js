"use strict";

var _core = require("@dogmalang/core");
const {
  Catalog
} = _core.dogma.use(require("@akromio/catalog"));
const $JobCatalog = class JobCatalog extends Catalog {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_14e4ef70508331cc6a23c8e83c5270a1___init__ instanceof Function) this._pvt_14e4ef70508331cc6a23c8e83c5270a1___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_14e4ef70508331cc6a23c8e83c5270a1___post__ instanceof Function) this._pvt_14e4ef70508331cc6a23c8e83c5270a1___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_14e4ef70508331cc6a23c8e83c5270a1___validate__ instanceof Function) this._pvt_14e4ef70508331cc6a23c8e83c5270a1___validate__(); /* c8 ignore stop */
  }
};

const JobCatalog = new Proxy($JobCatalog, {
  apply(receiver, self, args) {
    return new $JobCatalog(...args);
  }
});
module.exports = exports = JobCatalog;