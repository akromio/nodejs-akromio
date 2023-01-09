"use strict";

var _core = require("@dogmalang/core");
const {
  Writable
} = _core.dogma.use(require("stream"));
const {
  Dataset
} = _core.dogma.use(require("@akromio/dataset"));
const Op = _core.dogma.use(require("../ops/Op"));
const $Runner = class Runner {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('log', _['log'], Writable);
    Object.defineProperty(this, 'log', {
      value: (0, _core.coalesce)(_['log'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_3622056f25e40ee60000e63dbd3e483d___init__ instanceof Function) this._pvt_3622056f25e40ee60000e63dbd3e483d___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_3622056f25e40ee60000e63dbd3e483d___post__ instanceof Function) this._pvt_3622056f25e40ee60000e63dbd3e483d___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_3622056f25e40ee60000e63dbd3e483d___validate__ instanceof Function) this._pvt_3622056f25e40ee60000e63dbd3e483d___validate__(); /* c8 ignore stop */
  }
};

const Runner = new Proxy($Runner, {
  apply(receiver, self, args) {
    return new $Runner(...args);
  }
});
module.exports = exports = Runner;
Runner.prototype.run = function (op, args, opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("op", op, Op); /* c8 ignore next */
  if (args != null) _core.dogma.expect("args", args, _core.any); /* c8 ignore next */
  _core.dogma.expect("opts", opts, RunOpts);
  {
    return op.runWith(args, _core.dogma.clone(opts, {
      "log": this.log
    }, {}, [], []));
  }
};
const RunOpts = _core.dogma.intf('RunOpts', {
  onError: {
    optional: false,
    type: ["carryOn", "finish"]
  },
  dataset: {
    optional: false,
    type: Dataset
  }
});