"use strict";

var _core = require("@dogmalang/core");
const DatumContainer = _core.dogma.use(require("./DatumContainer"));
const $VarDatum = class VarDatum extends DatumContainer {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_4173082e25a2058ca14615c4cdb5f454___init__ instanceof Function) this._pvt_4173082e25a2058ca14615c4cdb5f454___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_4173082e25a2058ca14615c4cdb5f454___post__ instanceof Function) this._pvt_4173082e25a2058ca14615c4cdb5f454___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_4173082e25a2058ca14615c4cdb5f454___validate__ instanceof Function) this._pvt_4173082e25a2058ca14615c4cdb5f454___validate__(); /* c8 ignore stop */
  }
};

const VarDatum = new Proxy($VarDatum, {
  apply(receiver, self, args) {
    return new $VarDatum(...args);
  }
});
module.exports = exports = VarDatum;