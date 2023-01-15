"use strict";

var _core = require("@dogmalang/core");
const $RedisStreamsTriggerImpl = class RedisStreamsTriggerImpl {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('redis', _['redis'], null);
    Object.defineProperty(this, 'redis', {
      value: (0, _core.coalesce)(_['redis'], null),
      writable: false,
      enumerable: false
    });
    (0, _core.expect)('channel', _['channel'], _core.text);
    Object.defineProperty(this, 'channel', {
      value: (0, _core.coalesce)(_['channel'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['times'] != null) (0, _core.expect)('times', _['times'], _core.num); /* c8 ignore stop */
    Object.defineProperty(this, 'times', {
      value: (0, _core.coalesce)(_['times'], null),
      writable: false,
      enumerable: true
    });
    Object.defineProperty(this, 'fired', {
      value: 0,
      writable: true,
      enumerable: false
    });
    /* c8 ignore start */
    if (_['handler'] != null) (0, _core.expect)('handler', _['handler'], _core.func); /* c8 ignore stop */
    Object.defineProperty(this, 'handler', {
      value: (0, _core.coalesce)(_['handler'], null),
      writable: true,
      enumerable: false
    });
    /* c8 ignore start */
    if (this._pvt_19058010a0c57c04554757be39b46121___init__ instanceof Function) this._pvt_19058010a0c57c04554757be39b46121___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_19058010a0c57c04554757be39b46121___post__ instanceof Function) this._pvt_19058010a0c57c04554757be39b46121___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_19058010a0c57c04554757be39b46121___validate__ instanceof Function) this._pvt_19058010a0c57c04554757be39b46121___validate__(); /* c8 ignore stop */
  }
};

const RedisStreamsTriggerImpl = new Proxy($RedisStreamsTriggerImpl, {
  apply(receiver, self, args) {
    return new $RedisStreamsTriggerImpl(...args);
  }
});
module.exports = exports = RedisStreamsTriggerImpl;
RedisStreamsTriggerImpl.prototype.start = function (handler) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("handler", handler, _core.func);
  {
    this.redis.connect().then(() => {
      {
        this.redis.subscribe(this.channel, msg => {
          /* c8 ignore next */_core.dogma.expect("msg", msg);
          {
            const call = _core.json.decode(msg);
            const e = {
              ["call"]: _core.dogma.clone(call, {
                "jobName": call.job
              }, {}, [], [])
            };
            this.handler(_core.dogma.clone(e, {
              "jobName": e.call.job
            }, {}, [], []));
          }
        });
      }
    });
    _core.dogma.update(this, {
      name: "handler",
      visib: ".",
      assign: "=",
      value: handler
    }, {
      name: "fired",
      visib: ".",
      assign: "=",
      value: 0
    });
  }
  return this;
};
RedisStreamsTriggerImpl.prototype.stop = function () {
  const self = this;
  {
    this.handler = null;
    this.redis.disconnect();
  }
  return this;
};