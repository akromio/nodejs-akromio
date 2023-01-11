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
    this.redis.connect();
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
RedisStreamsTriggerImpl.prototype.gather = async function (size) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("size", size, _core.num);
  {
    const {
      redis,
      stream,
      group,
      consumer
    } = this;
    const resp = (0, await redis.sendCommand(["XREADGROUP", "GROUP", group, consumer, "COUNT", (0, _core.text)(size), "BLOCK", "1000", "NOACK", "STREAMS", stream, ">"]));
    if ((0, _core.len)(resp) > 0) {
      for (const item of _core.dogma.getItem(_core.dogma.getItem(resp, 0), 1)) {
        const [, data] = _core.dogma.getArrayToUnpack(item, 2);
        const value = _core.json.decode(_core.dogma.getItem(data, 1));
        const call = {
          ["jobName"]: value.job,
          ["args"]: value.args
        };
        const e = {
          ["last"]: _core.dogma.is(this.times, _core.num) && (this.fired += 1) >= this.times,
          ["call"]: call
        };
        0, await this.handler(e);
        if (e.last) {
          break;
        }
      }
    }
  }
};