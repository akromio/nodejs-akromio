"use strict";

var _core = require("@dogmalang/core");
const vm = _core.dogma.use(require("vm"));
const Call = _core.dogma.use(require("../../Call"));
const SimpleOperator = _core.dogma.use(require("../SimpleOperator"));
const Script = _core.dogma.use(require("./Script"));
const $ScriptOperator = class ScriptOperator extends SimpleOperator {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_316e71f14edc274b67cebaf89bc482ec___init__ instanceof Function) this._pvt_316e71f14edc274b67cebaf89bc482ec___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_316e71f14edc274b67cebaf89bc482ec___post__ instanceof Function) this._pvt_316e71f14edc274b67cebaf89bc482ec___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_316e71f14edc274b67cebaf89bc482ec___validate__ instanceof Function) this._pvt_316e71f14edc274b67cebaf89bc482ec___validate__(); /* c8 ignore stop */
  }
};

const ScriptOperator = new Proxy($ScriptOperator, {
  apply(receiver, self, args) {
    return new $ScriptOperator(...args);
  }
});
module.exports = exports = ScriptOperator;
ScriptOperator.prototype.performWork = async function (call) {
  const self = this;
  let returned; /* c8 ignore next */
  _core.dogma.expect("call", call, Call);
  {
    var _ctx$params;
    const script = _core.dogma.expect('call.op', call.op, Script);
    const {
      code,
      params
    } = script;
    const ctx = _core.dogma.clone(call.ctx, {}, {}, [], []);
    const opts = {
      ["ctx"]: ctx
    };
    ctx.params = (_ctx$params = ctx.params) !== null && _ctx$params !== void 0 ? _ctx$params : params;
    if (script.kind == "sync") {
      returned = runSyncCode(code, opts);
    } else {
      returned = (0, await runAsyncCode(code, opts));
    }
  }
  return returned;
};
function createContext(ctxObject) {
  /* c8 ignore next */_core.dogma.expect("ctxObject", ctxObject);
  {
    return vm.createContext(_core.dogma.clone(ctxObject, {
      "setTimeout": setTimeout,
      "setImmediate": setImmediate,
      "setInterval": setInterval
    }, {}, [], []));
  }
}
function runSyncCode(code, opts) {
  let result; /* c8 ignore next */
  _core.dogma.expect("code", code, _core.text); /* c8 ignore next */
  _core.dogma.expect("opts", opts, _core.map);
  {
    const ctx = createContext(opts.ctx);
    result = vm.runInContext(code, ctx, _core.dogma.clone(opts, {}, {}, [], []));
  }
  return result;
}
async function runAsyncCode(code, opts) {
  let result; /* c8 ignore next */
  _core.dogma.expect("code", code, _core.text); /* c8 ignore next */
  _core.dogma.expect("opts", opts, _core.map);
  {
    const ctx = createContext(opts.ctx);
    result = (0, await vm.runInContext(code, ctx, _core.dogma.clone(opts, {
      "microtaskMode": "afterEvaluate"
    }, {}, [], [])));
  }
  return result;
}