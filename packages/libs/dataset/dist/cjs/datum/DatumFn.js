"use strict";

var _core = require("@dogmalang/core");
const Datum = _core.dogma.use(require("./Datum"));
const DatumError = _core.dogma.use(require("./DatumError"));
const $DatumFn = class DatumFn extends Datum {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_eeeae1d8906f6198ea5600566fba3319___init__ instanceof Function) this._pvt_eeeae1d8906f6198ea5600566fba3319___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_eeeae1d8906f6198ea5600566fba3319___post__ instanceof Function) this._pvt_eeeae1d8906f6198ea5600566fba3319___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_eeeae1d8906f6198ea5600566fba3319___validate__ instanceof Function) this._pvt_eeeae1d8906f6198ea5600566fba3319___validate__(); /* c8 ignore stop */
  }
};

const DatumFn = new Proxy($DatumFn, {
  apply(receiver, self, args) {
    return new $DatumFn(...args);
  }
});
module.exports = exports = DatumFn;
DatumFn.prototype._pvt_eeeae1d8906f6198ea5600566fba3319_post = function () {
  const self = this;
  {
    _core.dogma.expect('this.value', this.value, _core.func);
    this.tags.push("const");
  }
};
DatumFn.prototype._pvt_eeeae1d8906f6198ea5600566fba3319___post__ = DatumFn.prototype._pvt_eeeae1d8906f6198ea5600566fba3319_post;
DatumFn.prototype.getValue = function () {
  const self = this;
  {
    return this.value();
  }
};