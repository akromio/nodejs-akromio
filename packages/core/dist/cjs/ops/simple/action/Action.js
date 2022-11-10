"use strict";

var _core = require("@dogmalang/core");
const SimpleOp = _core.dogma.use(require("../SimpleOp"));
const $Action = class Action extends SimpleOp {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_985aff71804ec29966e8564585fd57f6___init__ instanceof Function) this._pvt_985aff71804ec29966e8564585fd57f6___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_985aff71804ec29966e8564585fd57f6___post__ instanceof Function) this._pvt_985aff71804ec29966e8564585fd57f6___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_985aff71804ec29966e8564585fd57f6___validate__ instanceof Function) this._pvt_985aff71804ec29966e8564585fd57f6___validate__(); /* c8 ignore stop */
  }
};

const Action = new Proxy($Action, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'Action' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = Action;
/* c8 ignore start */
Action.prototype.getFn = function () {
  (0, _core.abstract)();
}; /* c8 ignore stop */