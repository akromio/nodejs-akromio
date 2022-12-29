"use strict";

var _core = require("@dogmalang/core");
const {
  setInterval,
  clearInterval
} = _core.dogma.use(require("timers"));
const BlankSheetStream = _core.dogma.use(require("./BlankSheetStream"));
const StarterState = _core.dogma.use(require("./StarterState"));
const $Starter = class Starter {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('interval', _['interval'], _core.num);
    Object.defineProperty(this, 'interval', {
      value: (0, _core.coalesce)(_['interval'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('times', _['times'], _core.num);
    Object.defineProperty(this, 'times', {
      value: (0, _core.coalesce)(_['times'], null),
      writable: false,
      enumerable: true
    });
    Object.defineProperty(this, 'iterations', {
      value: 0,
      writable: true,
      enumerable: false
    });
    Object.defineProperty(this, 'timer', {
      value: (0, _core.coalesce)(_['timer'], null),
      writable: true,
      enumerable: false
    });
    Object.defineProperty(this, 'state', {
      value: (0, _core.coalesce)(_['state'], StarterState.created),
      writable: true,
      enumerable: true
    });
    (0, _core.expect)('output', _['output'], BlankSheetStream);
    Object.defineProperty(this, 'output', {
      value: (0, _core.coalesce)(_['output'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_9f2349479645eea8e91d9bb6deb28941___init__ instanceof Function) this._pvt_9f2349479645eea8e91d9bb6deb28941___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_9f2349479645eea8e91d9bb6deb28941___post__ instanceof Function) this._pvt_9f2349479645eea8e91d9bb6deb28941___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_9f2349479645eea8e91d9bb6deb28941___validate__ instanceof Function) this._pvt_9f2349479645eea8e91d9bb6deb28941___validate__(); /* c8 ignore stop */
  }
};

const Starter = new Proxy($Starter, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'Starter' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = Starter;
Starter.prototype.start = function () {
  const self = this;
  {
    return (0, _core.promise)((resolve, reject) => {
      /* c8 ignore next */_core.dogma.expect("resolve", resolve); /* c8 ignore next */
      _core.dogma.expect("reject", reject);
      {
        this.state = _core.dogma.enumGet(this.state, "idle");
        this.timer = setInterval(() => {
          {
            this.handle();
            if (!this.output.writable) {
              resolve();
            }
          }
        }, this.interval);
      }
    });
  }
};
Starter.prototype.handle = function () {
  const self = this;
  {
    this.iterations += 1;
    this.state = _core.dogma.enumGet(this.state, "busy");
    this.generateBlankSheets();
    this.state = _core.dogma.enumGet(this.state, "idle");
    if (this.iterations >= this.times) {
      this.state = _core.dogma.enumGet(this.state, "stopped");
      clearInterval(this.timer);
      this.timer = null;
      this.output.end();
    }
  }
};
/* c8 ignore start */
Starter.prototype.generateBlankSheets = function () {
  (0, _core.abstract)();
}; /* c8 ignore stop */