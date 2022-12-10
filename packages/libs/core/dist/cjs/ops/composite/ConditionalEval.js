"use strict";

var _core = require("@dogmalang/core");
const vm = _core.dogma.use(require("vm"));
const $ConditionalExpEval = class ConditionalExpEval {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_9774094f5f40005c7bca0aa21feabea9___init__ instanceof Function) this._pvt_9774094f5f40005c7bca0aa21feabea9___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_9774094f5f40005c7bca0aa21feabea9___post__ instanceof Function) this._pvt_9774094f5f40005c7bca0aa21feabea9___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_9774094f5f40005c7bca0aa21feabea9___validate__ instanceof Function) this._pvt_9774094f5f40005c7bca0aa21feabea9___validate__(); /* c8 ignore stop */
  }
};

const ConditionalExpEval = new Proxy($ConditionalExpEval, {
  apply(receiver, self, args) {
    return new $ConditionalExpEval(...args);
  }
});
module.exports = exports = ConditionalExpEval;
ConditionalExpEval.prototype.eval = function (exp, ctx) {
  const self = this;
  let result; /* c8 ignore next */
  _core.dogma.expect("exp", exp, _core.text); /* c8 ignore next */
  _core.dogma.expect("ctx", ctx, _core.map);
  {
    const script = new vm.Script(exp);
    result = script.runInNewContext(ctx);
  }
  return result;
};