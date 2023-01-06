"use strict";

var _core = require("@dogmalang/core");
const StreamEvent = _core.dogma.use(require("./StreamEvent"));
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
    (0, _core.expect)('stream', _['stream'], _core.text);
    Object.defineProperty(this, 'stream', {
      value: (0, _core.coalesce)(_['stream'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('group', _['group'], _core.text);
    Object.defineProperty(this, 'group', {
      value: (0, _core.coalesce)(_['group'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('consumer', _['consumer'], _core.text);
    Object.defineProperty(this, 'consumer', {
      value: (0, _core.coalesce)(_['consumer'], null),
      writable: false,
      enumerable: true
    });
    Object.defineProperty(this, 'timer', {
      value: null,
      writable: true,
      enumerable: false
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
    if (this._pvt_f521ec4916b36b95186f7ae4bcafba2d___init__ instanceof Function) this._pvt_f521ec4916b36b95186f7ae4bcafba2d___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_f521ec4916b36b95186f7ae4bcafba2d___post__ instanceof Function) this._pvt_f521ec4916b36b95186f7ae4bcafba2d___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_f521ec4916b36b95186f7ae4bcafba2d___validate__ instanceof Function) this._pvt_f521ec4916b36b95186f7ae4bcafba2d___validate__(); /* c8 ignore stop */
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
    const callback = () => {
      {
        if (!(_core.dogma.is(this.times, _core.num) && this.fired > this.times)) {
          this.fire();
        }
      }
    };
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
    setImmediate(callback);
    this.timer = setInterval(callback, 333);
  }
  return this;
};
RedisStreamsTriggerImpl.prototype.stop = function () {
  const self = this;
  {
    this.handler = null;
    clearInterval(this.timer);
    this.timer = null;
  }
  return this;
};
RedisStreamsTriggerImpl.prototype.fire = async function () {
  const self = this;
  {
    const {
      redis,
      stream,
      group,
      consumer
    } = this;
    const payload = (0, await redis.sendCommand(["XREADGROUP", "GROUP", group, consumer, "COUNT", 1, "BLOCK", 150, "NOACK", "STREAMS", stream, ">"]));
    if (payload) {
      this.fired += 1;
      0, await this.handler(StreamEvent({
        'last': _core.dogma.is(this.times, _core.num) && this.fired >= this.times,
        'payload': payload
      }));
    }
  }
};