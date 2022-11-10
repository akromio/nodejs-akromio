"use strict";

var _core = require("@dogmalang/core");
const {
  DynamicCo
} = _core.dogma.use(require("@akromio/core"));
const CatalogSteppedOp = _core.dogma.use(require("../CatalogSteppedOp"));
const $CatalogCo = class CatalogCo extends DynamicCo {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore next */
    if (CatalogSteppedOp.prototype._constructor instanceof Function) CatalogSteppedOp.prototype._constructor.bind(this)(_);
    /* c8 ignore start */
    if (this._pvt_c78edbabbb11ee7319298c4a295a00d5___init__ instanceof Function) this._pvt_c78edbabbb11ee7319298c4a295a00d5___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_c78edbabbb11ee7319298c4a295a00d5___post__ instanceof Function) this._pvt_c78edbabbb11ee7319298c4a295a00d5___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_c78edbabbb11ee7319298c4a295a00d5___validate__ instanceof Function) this._pvt_c78edbabbb11ee7319298c4a295a00d5___validate__(); /* c8 ignore stop */
  }
};

_core.dogma.mixin($CatalogCo, CatalogSteppedOp);
const CatalogCo = new Proxy($CatalogCo, {
  apply(receiver, self, args) {
    return new $CatalogCo(...args);
  }
});
module.exports = exports = CatalogCo;