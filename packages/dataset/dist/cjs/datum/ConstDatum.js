"use strict";

var _core = require("@dogmalang/core");
const DatumContainer = _core.dogma.use(require("./DatumContainer"));
const $ConstDatum = class ConstDatum extends DatumContainer {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_ed26bbdfefa7642718effad21e8709ac___init__ instanceof Function) this._pvt_ed26bbdfefa7642718effad21e8709ac___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_ed26bbdfefa7642718effad21e8709ac___post__ instanceof Function) this._pvt_ed26bbdfefa7642718effad21e8709ac___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_ed26bbdfefa7642718effad21e8709ac___validate__ instanceof Function) this._pvt_ed26bbdfefa7642718effad21e8709ac___validate__(); /* c8 ignore stop */
  }
};

const ConstDatum = new Proxy($ConstDatum, {
  apply(receiver, self, args) {
    return new $ConstDatum(...args);
  }
});
module.exports = exports = ConstDatum;
ConstDatum.prototype._pvt_ed26bbdfefa7642718effad21e8709ac_post = function () {
  const self = this;
  {
    this.tags.push("const");
  }
};
ConstDatum.prototype._pvt_ed26bbdfefa7642718effad21e8709ac___post__ = ConstDatum.prototype._pvt_ed26bbdfefa7642718effad21e8709ac_post;