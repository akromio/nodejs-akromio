"use strict";

var _core = require("@dogmalang/core");
const {
  Writable
} = _core.dogma.use(require("stream"));
const {
  Dataset
} = _core.dogma.use(require("@akromio/dataset"));
const Runner = _core.dogma.use(require("../Runner"));
const Op = _core.dogma.use(require("../../ops/Op"));
const $SimpleRunner = class SimpleRunner extends Runner {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_cebf95fc8f8a02a6e3b35bba2b106368___init__ instanceof Function) this._pvt_cebf95fc8f8a02a6e3b35bba2b106368___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_cebf95fc8f8a02a6e3b35bba2b106368___post__ instanceof Function) this._pvt_cebf95fc8f8a02a6e3b35bba2b106368___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_cebf95fc8f8a02a6e3b35bba2b106368___validate__ instanceof Function) this._pvt_cebf95fc8f8a02a6e3b35bba2b106368___validate__(); /* c8 ignore stop */
  }
};

const SimpleRunner = new Proxy($SimpleRunner, {
  apply(receiver, self, args) {
    return new $SimpleRunner(...args);
  }
});
module.exports = exports = SimpleRunner;
SimpleRunner.prototype.run = function (op, args, opts) {
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