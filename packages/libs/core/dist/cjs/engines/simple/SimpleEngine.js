"use strict";

var _core = require("@dogmalang/core");
const Engine = _core.dogma.use(require("../Engine"));
const Runner = _core.dogma.use(require("../Runner"));
const RunOpts = _core.dogma.use(require("../RunOpts"));
const CallReq = _core.dogma.use(require("../../CallReq"));
const Op = _core.dogma.use(require("../../ops/Op"));
const $SimpleEngine = class SimpleEngine extends Engine {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('runner', _['runner'], Runner);
    Object.defineProperty(this, 'runner', {
      value: (0, _core.coalesce)(_['runner'], null),
      writable: false,
      enumerable: false
    });
    /* c8 ignore start */
    if (this._pvt_32642a80b27f5385be30cd8d04ff3d7a___init__ instanceof Function) this._pvt_32642a80b27f5385be30cd8d04ff3d7a___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_32642a80b27f5385be30cd8d04ff3d7a___post__ instanceof Function) this._pvt_32642a80b27f5385be30cd8d04ff3d7a___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_32642a80b27f5385be30cd8d04ff3d7a___validate__ instanceof Function) this._pvt_32642a80b27f5385be30cd8d04ff3d7a___validate__(); /* c8 ignore stop */
  }
};

const SimpleEngine = new Proxy($SimpleEngine, {
  apply(receiver, self, args) {
    return new $SimpleEngine(...args);
  }
});
module.exports = exports = SimpleEngine;
SimpleEngine.prototype.run = function (req, opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("req", req, CallReq); /* c8 ignore next */
  if (opts != null) _core.dogma.expect("opts", opts, RunOpts);
  {
    var _opts, _opts$onError;
    const op = this.getOpOf(req);
    opts = (_opts = opts) !== null && _opts !== void 0 ? _opts : {};
    opts.onError = (_opts$onError = opts.onError) !== null && _opts$onError !== void 0 ? _opts$onError : this.onError;
    return this.runOp(op, req.args, _core.dogma.clone(opts, {
      "dataset": this.dataset
    }, {}, [], []));
  }
};
SimpleEngine.prototype.runOp = async function (op, args, opts) {
  const self = this;
  let result; /* c8 ignore next */
  _core.dogma.expect("op", op, Op); /* c8 ignore next */
  if (args != null) _core.dogma.expect("args", args, _core.any); /* c8 ignore next */
  _core.dogma.expect("opts", opts, _core.map);
  {
    const {
      runner
    } = this;
    result = (0, await runner.run(op, args, opts));
    runner.log.push(_core.json.encode({
      ["type"]: "end"
    }));
  }
  return result;
};