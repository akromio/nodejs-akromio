"use strict";

var _core = require("@dogmalang/core");
const ms = _core.dogma.use(require("ms"));
const IntervalEvent = _core.dogma.use(require("./IntervalEvent"));
const $IntervalTriggerImpl = class IntervalTriggerImpl {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    Object.defineProperty(this, 'timer', {
      value: null,
      writable: true,
      enumerable: false
    });
    (0, _core.expect)('interval', _['interval'], _core.text);
    Object.defineProperty(this, 'interval', {
      value: (0, _core.coalesce)(_['interval'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['immediate'] != null) (0, _core.expect)('immediate', _['immediate'], _core.bool); /* c8 ignore stop */
    Object.defineProperty(this, 'immediate', {
      value: (0, _core.coalesce)(_['immediate'], true),
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
    if (this._pvt_b7fc7eccf6d7505f34dd6956ec79522c___init__ instanceof Function) this._pvt_b7fc7eccf6d7505f34dd6956ec79522c___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_b7fc7eccf6d7505f34dd6956ec79522c___post__ instanceof Function) this._pvt_b7fc7eccf6d7505f34dd6956ec79522c___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_b7fc7eccf6d7505f34dd6956ec79522c___validate__ instanceof Function) this._pvt_b7fc7eccf6d7505f34dd6956ec79522c___validate__(); /* c8 ignore stop */
  }
};

const IntervalTriggerImpl = new Proxy($IntervalTriggerImpl, {
  apply(receiver, self, args) {
    return new $IntervalTriggerImpl(...args);
  }
});
module.exports = exports = IntervalTriggerImpl;
IntervalTriggerImpl.prototype.start = function (handler) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("handler", handler, _core.func);
  {
    const callback = () => {
      {
        this.fired += 1;
        if (!(_core.dogma.is(this.times, _core.num) && this.fired > this.times)) {
          this.fire((0, _core.timestamp)());
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
    if (this.immediate) {
      setImmediate(callback);
    }
    this.timer = setInterval(callback, ms(this.interval));
  }
  return this;
};
IntervalTriggerImpl.prototype.stop = function () {
  const self = this;
  {
    this.handler = null;
    clearInterval(this.timer);
    this.timer = null;
  }
  return this;
};
IntervalTriggerImpl.prototype.fire = async function (ts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("ts", ts, _core.timestamp);
  {
    const e = IntervalEvent({
      'ts': ts,
      'last': _core.dogma.is(this.times, _core.num) && this.fired >= this.times
    });
    0, await this.handler(e);
  }
};