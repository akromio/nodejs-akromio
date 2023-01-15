"use strict";

var _core = require("@dogmalang/core");
const DistributorBase = _core.dogma.use(require("../DistributorBase"));
const RunReq = _core.dogma.use(require("../../../assigners/RunReq"));
const $RedisPubSubDistributor = class RedisPubSubDistributor extends DistributorBase {
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
    if (this._pvt_39738ed1dea5cb43aba6e3796b2e35e1___init__ instanceof Function) this._pvt_39738ed1dea5cb43aba6e3796b2e35e1___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_39738ed1dea5cb43aba6e3796b2e35e1___post__ instanceof Function) this._pvt_39738ed1dea5cb43aba6e3796b2e35e1___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_39738ed1dea5cb43aba6e3796b2e35e1___validate__ instanceof Function) this._pvt_39738ed1dea5cb43aba6e3796b2e35e1___validate__(); /* c8 ignore stop */
  }
};

const RedisPubSubDistributor = new Proxy($RedisPubSubDistributor, {
  apply(receiver, self, args) {
    return new $RedisPubSubDistributor(...args);
  }
});
module.exports = exports = RedisPubSubDistributor;
RedisPubSubDistributor.prototype.connect = function () {
  const self = this;
  {
    return this.redis.connect();
  }
};
RedisPubSubDistributor.prototype.disconnect = async function () {
  const self = this;
  {
    0, await (0, _core.sleep)("100ms");
    await _core.dogma.pawait(() => this.redis.disconnect());
  }
};
RedisPubSubDistributor.prototype.deliver = function (req) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("req", req, RunReq);
  {
    return this.redis.publish(req.assignee, _core.json.encode(req));
  }
};