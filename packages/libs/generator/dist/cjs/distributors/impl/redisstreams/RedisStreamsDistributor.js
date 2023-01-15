"use strict";

var _core = require("@dogmalang/core");
const DistributorBase = _core.dogma.use(require("../DistributorBase"));
const RunReq = _core.dogma.use(require("../../../assigners/RunReq"));
const $RedisStreamsDistributor = class RedisStreamsDistributor extends DistributorBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('redis', _['redis'], null);
    Object.defineProperty(this, 'redis', {
      value: (0, _core.coalesce)(_['redis'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_5913b25d5a894e83d499cc6e3f418d06___init__ instanceof Function) this._pvt_5913b25d5a894e83d499cc6e3f418d06___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_5913b25d5a894e83d499cc6e3f418d06___post__ instanceof Function) this._pvt_5913b25d5a894e83d499cc6e3f418d06___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_5913b25d5a894e83d499cc6e3f418d06___validate__ instanceof Function) this._pvt_5913b25d5a894e83d499cc6e3f418d06___validate__(); /* c8 ignore stop */
  }
};

const RedisStreamsDistributor = new Proxy($RedisStreamsDistributor, {
  apply(receiver, self, args) {
    return new $RedisStreamsDistributor(...args);
  }
});
module.exports = exports = RedisStreamsDistributor;
RedisStreamsDistributor.prototype.connect = function () {
  const self = this;
  {
    return this.redis.connect();
  }
};
RedisStreamsDistributor.prototype.disconnect = async function () {
  const self = this;
  {
    0, await (0, _core.sleep)("100ms");
    await _core.dogma.pawait(() => this.redis.disconnect());
  }
};
RedisStreamsDistributor.prototype.deliver = function (req) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("req", req, RunReq);
  {
    return this.redis.sendCommand(["XADD", req.assignee, "*", "req", _core.json.encode(req)]);
  }
};