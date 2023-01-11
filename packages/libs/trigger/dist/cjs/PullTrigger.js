"use strict";

var _core = require("@dogmalang/core");
const Trigger = _core.dogma.use(require("./Trigger"));
const $PullTrigger = class PullTrigger extends Trigger {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    Object.defineProperty(this, 'retryTimeout', {
      value: (0, _core.coalesce)(_['retryTimeout'], 2500),
      writable: false,
      enumerable: false
    });
    /* c8 ignore start */
    if (this._pvt_0448f2e54cb2beeb856727104b769126___init__ instanceof Function) this._pvt_0448f2e54cb2beeb856727104b769126___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_0448f2e54cb2beeb856727104b769126___post__ instanceof Function) this._pvt_0448f2e54cb2beeb856727104b769126___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_0448f2e54cb2beeb856727104b769126___validate__ instanceof Function) this._pvt_0448f2e54cb2beeb856727104b769126___validate__(); /* c8 ignore stop */
  }
};

const PullTrigger = new Proxy($PullTrigger, {
  apply(receiver, self, args) {
    return new $PullTrigger(...args);
  }
});
module.exports = exports = PullTrigger;
PullTrigger.prototype._pvt_0448f2e54cb2beeb856727104b769126_post = function () {
  const self = this;
  {
    _core.dogma.expect('this.triggerImpl.gather', this.triggerImpl.gather, _core.func);
    this.stream.appendDataRecollector((0, _core.bind)(this, "gather"));
  }
};
PullTrigger.prototype._pvt_0448f2e54cb2beeb856727104b769126___post__ = PullTrigger.prototype._pvt_0448f2e54cb2beeb856727104b769126_post;
PullTrigger.prototype.gather = async function (size) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("size", size, _core.num);
  {
    {
      const got = (0, await this.triggerImpl.gather(size));
      if (got <= 0) {
        const timeout = Math.ceil(Math.random() * this.retryTimeout);
        setTimeout(() => {
          {
            this.gather(size);
          }
        }, timeout);
      }
    }
  }
};