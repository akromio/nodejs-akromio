"use strict";

var _core = require("@dogmalang/core");
const Co = _core.dogma.use(require("./Co"));
const $DynamicCo = class DynamicCo extends Co {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_68d356ceff6f152f42dd082b6aa7699e___init__ instanceof Function) this._pvt_68d356ceff6f152f42dd082b6aa7699e___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_68d356ceff6f152f42dd082b6aa7699e___post__ instanceof Function) this._pvt_68d356ceff6f152f42dd082b6aa7699e___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_68d356ceff6f152f42dd082b6aa7699e___validate__ instanceof Function) this._pvt_68d356ceff6f152f42dd082b6aa7699e___validate__(); /* c8 ignore stop */
  }
};

const DynamicCo = new Proxy($DynamicCo, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'DynamicCo' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = DynamicCo;