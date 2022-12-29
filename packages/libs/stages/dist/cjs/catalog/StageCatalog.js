"use strict";

var _core = require("@dogmalang/core");
const {
  Catalog
} = _core.dogma.use(require("@akromio/catalog"));
const $StageCatalog = class StageCatalog extends Catalog {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    Object.defineProperty(this, 'stages', {
      value: (0, _core.coalesce)(_['stages'], {}),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['defaultStageName'] != null) (0, _core.expect)('defaultStageName', _['defaultStageName'], _core.text); /* c8 ignore stop */
    Object.defineProperty(this, 'defaultStageName', {
      value: (0, _core.coalesce)(_['defaultStageName'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_aecd8009f7acfe64f974398bdb0a3250___init__ instanceof Function) this._pvt_aecd8009f7acfe64f974398bdb0a3250___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_aecd8009f7acfe64f974398bdb0a3250___post__ instanceof Function) this._pvt_aecd8009f7acfe64f974398bdb0a3250___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_aecd8009f7acfe64f974398bdb0a3250___validate__ instanceof Function) this._pvt_aecd8009f7acfe64f974398bdb0a3250___validate__(); /* c8 ignore stop */
  }
};

const StageCatalog = new Proxy($StageCatalog, {
  apply(receiver, self, args) {
    return new $StageCatalog(...args);
  }
});
module.exports = exports = StageCatalog;