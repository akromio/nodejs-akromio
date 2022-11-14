"use strict";

var _core = require("@dogmalang/core");
const Activity = _core.dogma.use(require("./Activity"));
const CallOpts = _core.dogma.use(require("./CallOpts"));
const $Op = class Op extends Activity {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('operator', _['operator'], null);
    Object.defineProperty(this, 'operator', {
      value: (0, _core.coalesce)(_['operator'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_0a0fa53b2b8862907919cbea149161e0___init__ instanceof Function) this._pvt_0a0fa53b2b8862907919cbea149161e0___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_0a0fa53b2b8862907919cbea149161e0___post__ instanceof Function) this._pvt_0a0fa53b2b8862907919cbea149161e0___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_0a0fa53b2b8862907919cbea149161e0___validate__ instanceof Function) this._pvt_0a0fa53b2b8862907919cbea149161e0___validate__(); /* c8 ignore stop */
  }
};

const Op = new Proxy($Op, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'Op' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = Op;
/* c8 ignore start */
Op.prototype.buildTitle = function () {
  (0, _core.abstract)();
}; /* c8 ignore stop */
Op.prototype.runWith = function (args, opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("opts", opts, CallOpts);
  {
    return this.operator.run(this, args, opts);
  }
};
Op.prototype.run = function (opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("opts", opts, CallOpts);
  {
    return this.runWith(null, opts);
  }
};