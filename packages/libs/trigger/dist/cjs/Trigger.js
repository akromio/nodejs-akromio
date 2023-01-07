"use strict";

var _core = require("@dogmalang/core");
const JobCall = _core.dogma.use(require("./JobCall"));
const TriggerImpl = _core.dogma.use(require("./TriggerImpl"));
const TriggerState = _core.dogma.use(require("./TriggerState"));
const $Trigger = class Trigger {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('name', _['name'], _core.text);
    Object.defineProperty(this, 'name', {
      value: (0, _core.coalesce)(_['name'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('engine', _['engine'], null);
    Object.defineProperty(this, 'engine', {
      value: (0, _core.coalesce)(_['engine'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['callback'] != null) (0, _core.expect)('callback', _['callback'], _core.func); /* c8 ignore stop */
    Object.defineProperty(this, 'callback', {
      value: (0, _core.coalesce)(_['callback'], null),
      writable: true,
      enumerable: true
    });
    Object.defineProperty(this, '_state', {
      value: TriggerState.nonStarted,
      writable: true,
      enumerable: false
    });
    (0, _core.expect)('triggerImpl', _['triggerImpl'], TriggerImpl);
    Object.defineProperty(this, 'triggerImpl', {
      value: (0, _core.coalesce)(_['triggerImpl'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_c3fa7541f85378fcfdd731681a632004___init__ instanceof Function) this._pvt_c3fa7541f85378fcfdd731681a632004___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_c3fa7541f85378fcfdd731681a632004___post__ instanceof Function) this._pvt_c3fa7541f85378fcfdd731681a632004___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_c3fa7541f85378fcfdd731681a632004___validate__ instanceof Function) this._pvt_c3fa7541f85378fcfdd731681a632004___validate__(); /* c8 ignore stop */
  }
};

const Trigger = new Proxy($Trigger, {
  apply(receiver, self, args) {
    return new $Trigger(...args);
  }
});
module.exports = exports = Trigger;
Object.defineProperty(Trigger.prototype, "state", {
  enum: true,
  get: function () {
    const self = this;
    {
      return this._state;
    }
  }
});
Trigger.prototype.start = async function (callback) {
  const self = this; /* c8 ignore next */
  if (callback != null) _core.dogma.expect("callback", callback, _core.func);
  {
    if (!_core.dogma.enumEq(this.state, "nonStarted")) {
      _core.dogma.raise(TypeError("The trigger has been already started."));
    }
    _core.dogma.update(this, {
      name: "callback",
      visib: ".",
      assign: "=",
      value: callback
    });
    0, await this.triggerImpl.start((0, _core.bind)(this, "handle"));
    this._state = _core.dogma.enumGet(this._state, "started");
  }
  return this;
};
Trigger.prototype.stop = async function () {
  const self = this;
  {
    if (!_core.dogma.includes([TriggerState.nonStarted, TriggerState.stopped], this.state)) {
      try {
        0, await this.triggerImpl.stop();
      } finally {
        if (this.callback) {
          this.callback();
        }
        this._state = _core.dogma.enumGet(this._state, "stopped");
      }
    }
  }
  return this;
};
Trigger.prototype.handle = async function (e) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("e", e, _core.dogma.intf("inline", {
    call: {
      optional: false,
      type: JobCall
    },
    last: {
      optional: true,
      type: _core.bool
    }
  }));
  {
    if (_core.dogma.enumEq(this._state, "running")) {
      _core.dogma.raise(TypeError("Trigger still processing an event."));
    }
    this._state = _core.dogma.enumGet(this._state, "running");
    if (e.call.jobName == "__exit__") {
      e = {
        ["last"]: true
      };
    } else {
      0, await this.engine.run(e.call.jobName, e.call.args);
    }
    if (e.last === true) {
      0, await this.stop();
    } else {
      this._state = _core.dogma.enumGet(this._state, "started");
    }
  }
};