"use strict";

var _core = require("@dogmalang/core");
const Op = _core.dogma.use(require("../ops/Op"));
const Engine = _core.dogma.use(require("./Engine"));
const Runner = _core.dogma.use(require("./Runner"));
const $SingleRunnerEngine = class SingleRunnerEngine extends Engine {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('runner', _['runner'], Runner);
    Object.defineProperty(this, 'runner', {
      value: (0, _core.coalesce)(_['runner'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_02fc647a554c03c7211c644d09c62e06___init__ instanceof Function) this._pvt_02fc647a554c03c7211c644d09c62e06___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_02fc647a554c03c7211c644d09c62e06___post__ instanceof Function) this._pvt_02fc647a554c03c7211c644d09c62e06___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_02fc647a554c03c7211c644d09c62e06___validate__ instanceof Function) this._pvt_02fc647a554c03c7211c644d09c62e06___validate__(); /* c8 ignore stop */
  }
};

const SingleRunnerEngine = new Proxy($SingleRunnerEngine, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'SingleRunnerEngine' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = SingleRunnerEngine;
SingleRunnerEngine.prototype.runOp = async function (op, args, opts) {
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