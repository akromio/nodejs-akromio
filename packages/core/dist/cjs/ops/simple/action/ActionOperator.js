"use strict";

var _core = require("@dogmalang/core");
const Call = _core.dogma.use(require("../../Call"));
const SimpleOperator = _core.dogma.use(require("../SimpleOperator"));
const Action = _core.dogma.use(require("./Action"));
const $ActionOperator = class ActionOperator extends SimpleOperator {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_2591d10857138e4c9acfe6b18a628e55___init__ instanceof Function) this._pvt_2591d10857138e4c9acfe6b18a628e55___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_2591d10857138e4c9acfe6b18a628e55___post__ instanceof Function) this._pvt_2591d10857138e4c9acfe6b18a628e55___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_2591d10857138e4c9acfe6b18a628e55___validate__ instanceof Function) this._pvt_2591d10857138e4c9acfe6b18a628e55___validate__(); /* c8 ignore stop */
  }
};

const ActionOperator = new Proxy($ActionOperator, {
  apply(receiver, self, args) {
    return new $ActionOperator(...args);
  }
});
module.exports = exports = ActionOperator;
ActionOperator.prototype.performWork = function (call) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("call", call, Call);
  {
    const action = _core.dogma.expect('call.op', call.op, Action);
    return action.getFn()(call.ctx);
  }
};