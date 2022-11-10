"use strict";

var _core = require("@dogmalang/core");
const Datum = _core.dogma.use(require("./Datum"));
const $DatumContainer = class DatumContainer extends Datum {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_7d9434ddf072357483ef0e4e8237feb3___init__ instanceof Function) this._pvt_7d9434ddf072357483ef0e4e8237feb3___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_7d9434ddf072357483ef0e4e8237feb3___post__ instanceof Function) this._pvt_7d9434ddf072357483ef0e4e8237feb3___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_7d9434ddf072357483ef0e4e8237feb3___validate__ instanceof Function) this._pvt_7d9434ddf072357483ef0e4e8237feb3___validate__(); /* c8 ignore stop */
  }
};

const DatumContainer = new Proxy($DatumContainer, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'DatumContainer' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = DatumContainer;
DatumContainer.prototype.getValue = function () {
  const self = this;
  {
    return this.value;
  }
};