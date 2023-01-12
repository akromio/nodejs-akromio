"use strict";

var _core = require("@dogmalang/core");
const {
  Readable
} = _core.dogma.use(require("stream"));
const ReporterStatus = _core.dogma.use(require("./ReporterStatus"));
const $Reporter = class Reporter {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    Object.defineProperty(this, 'status', {
      value: ReporterStatus.initialized,
      writable: true,
      enumerable: false
    });
    (0, _core.expect)('log', _['log'], Readable);
    Object.defineProperty(this, 'log', {
      value: (0, _core.coalesce)(_['log'], null),
      writable: false,
      enumerable: true
    });
    Object.defineProperty(this, 'callStack', {
      value: [],
      writable: false,
      enumerable: false
    });
    /* c8 ignore start */
    if (this._pvt_a900d53b37401ed20ac0dce705fe3c44___init__ instanceof Function) this._pvt_a900d53b37401ed20ac0dce705fe3c44___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_a900d53b37401ed20ac0dce705fe3c44___post__ instanceof Function) this._pvt_a900d53b37401ed20ac0dce705fe3c44___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_a900d53b37401ed20ac0dce705fe3c44___validate__ instanceof Function) this._pvt_a900d53b37401ed20ac0dce705fe3c44___validate__(); /* c8 ignore stop */
  }
};

const Reporter = new Proxy($Reporter, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'Reporter' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = Reporter;
Reporter.prototype.start = function () {
  const self = this;
  {
    if (!_core.dogma.enumEq(this.status, "initialized")) {
      _core.dogma.raise(Error(`Status expected to be initialized. Got: ${self.status}.`));
    }
    this.status = _core.dogma.enumGet(this.status, "started");
    this.log.on("data", e => {
      /* c8 ignore next */_core.dogma.expect("e", e);
      {
        this.handleEvent(_core.json.decode(e));
      }
    });
  }
  return this;
};
Reporter.prototype.handleEvent = function (e) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("e", e, _core.map);
  {
    {
      const _ = e.type;
      switch (_) {
        case "opStart":
          {
            this.handleOpStart(e);
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        case "opEnd":
          {
            this.handleOpEnd(e);
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        case "opLog":
          {
            this.handleOpLog(e);
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        case "end":
          {
            this.handleEnd(e);
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */ /*c8 ignore next*/
        default:
          {
            _core.dogma.raise(Error(`Unknown event: ${(0, _core.fmt)(e)}.`));
          }
      }
    }
  }
  return this;
};
Reporter.prototype.handleOpStart = function (e) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("e", e);
  {
    this.callStack.push(e);
    this._handleOpStart(_core.dogma.clone(e, {
      "level": (0, _core.len)(this.callStack) - 1
    }, {}, [], []));
  }
};
Reporter.prototype._handleOpStart = function (e) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("e", e);
  {
    _core.dogma.nop();
  }
};
Reporter.prototype.handleOpEnd = function (e) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("e", e);
  {
    this.checkCallStack(e.id);
    this.callStack.pop();
    this._handleOpEnd(_core.dogma.clone(e, {
      "level": (0, _core.len)(this.callStack)
    }, {}, [], []));
  }
};
Reporter.prototype.handleOpLog = function (e) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("e", e);
  {
    this.checkCallStack(e.id);
    this._handleOpLog(_core.dogma.clone(e, {
      "level": (0, _core.len)(this.callStack)
    }, {}, [], []));
  }
};
Reporter.prototype._handleOpLog = function (e) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("e", e);
  {
    _core.dogma.nop();
  }
};
Reporter.prototype.checkCallStack = function (id) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("id", id, _core.text);
  {
    {
      const top = _core.dogma.getItem(this.callStack, -1);
      if (top.id != id) {
        _core.dogma.raise(Error(`Call id expected: ${top.id}. Got: ${id}.`));
      }
    }
  }
};
Reporter.prototype.handleEnd = function (e) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("e", e);
  {
    if ((0, _core.len)(this.callStack) > 0) {
      _core.dogma.raise(Error("Call stack should be empty when end reached."));
    }
    this._handleEnd(e);
  }
};
Reporter.prototype._handleEnd = function (e) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("e", e);
  {
    _core.dogma.nop();
  }
};