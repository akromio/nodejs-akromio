"use strict";

var _core = require("@dogmalang/core");
const DistributorBase = _core.dogma.use(require("../DistributorBase"));
const RunReq = _core.dogma.use(require("../../../assigners/RunReq"));
const $ConsoleDistributor = class ConsoleDistributor extends DistributorBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    Object.defineProperty(this, 'console', {
      value: (0, _core.coalesce)(_['console'], _core.print),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_11afa6f70b288bd1826c9567401d1e0d___init__ instanceof Function) this._pvt_11afa6f70b288bd1826c9567401d1e0d___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_11afa6f70b288bd1826c9567401d1e0d___post__ instanceof Function) this._pvt_11afa6f70b288bd1826c9567401d1e0d___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_11afa6f70b288bd1826c9567401d1e0d___validate__ instanceof Function) this._pvt_11afa6f70b288bd1826c9567401d1e0d___validate__(); /* c8 ignore stop */
  }
};

const ConsoleDistributor = new Proxy($ConsoleDistributor, {
  apply(receiver, self, args) {
    return new $ConsoleDistributor(...args);
  }
});
module.exports = exports = ConsoleDistributor;
ConsoleDistributor.prototype.deliver = async function (req) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("req", req, RunReq);
  {
    const now = (0, _core.timestamp)().toISOString();
    this.console(`[${now}] ${req.assignee} ts:${req.ts} assignTs:${req.assignTs} job:${req.job}`);
  }
};