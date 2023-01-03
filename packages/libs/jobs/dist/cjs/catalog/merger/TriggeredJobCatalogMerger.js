"use strict";

var _core = require("@dogmalang/core");
const JobCatalogMerger = _core.dogma.use(require("./JobCatalogMerger"));
const $TriggeredJobCatalogMerger = class TriggeredJobCatalogMerger extends JobCatalogMerger {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_4c6a63b46fe5ecf7a4ec174f5b582965___init__ instanceof Function) this._pvt_4c6a63b46fe5ecf7a4ec174f5b582965___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_4c6a63b46fe5ecf7a4ec174f5b582965___post__ instanceof Function) this._pvt_4c6a63b46fe5ecf7a4ec174f5b582965___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_4c6a63b46fe5ecf7a4ec174f5b582965___validate__ instanceof Function) this._pvt_4c6a63b46fe5ecf7a4ec174f5b582965___validate__(); /* c8 ignore stop */
  }
};

const TriggeredJobCatalogMerger = new Proxy($TriggeredJobCatalogMerger, {
  apply(receiver, self, args) {
    return new $TriggeredJobCatalogMerger(...args);
  }
});
module.exports = exports = TriggeredJobCatalogMerger;