"use strict";

var _core = require("@dogmalang/core");
const $Reporters = class Reporters {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (_['reporters'] != null) (0, _core.expect)('reporters', _['reporters'], _core.list); /* c8 ignore stop */
    Object.defineProperty(this, 'reporters', {
      value: (0, _core.coalesce)(_['reporters'], []),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_3585f5ea0e55216aa4af53d98ee35b26___init__ instanceof Function) this._pvt_3585f5ea0e55216aa4af53d98ee35b26___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_3585f5ea0e55216aa4af53d98ee35b26___post__ instanceof Function) this._pvt_3585f5ea0e55216aa4af53d98ee35b26___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_3585f5ea0e55216aa4af53d98ee35b26___validate__ instanceof Function) this._pvt_3585f5ea0e55216aa4af53d98ee35b26___validate__(); /* c8 ignore stop */
  }
};

const Reporters = new Proxy($Reporters, {
  apply(receiver, self, args) {
    return new $Reporters(...args);
  }
});
module.exports = exports = Reporters;
Reporters.prototype.append = function (reporter) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("reporter", reporter);
  {
    this.reporters.push(reporter);
  }
  return this;
};
Reporters.prototype.connect = function () {
  const self = this;
  {
    for (const reporter of this.reporters) {
      _core.dogma.peval(() => {
        return reporter.start();
      });
    }
  }
  return this;
};
Reporters.prototype.disconnect = function () {
  const self = this;
  {
    for (const reporter of this.reporters) {
      _core.dogma.peval(() => {
        return reporter.stop();
      });
    }
  }
  return this;
};