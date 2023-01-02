"use strict";

var _core = require("@dogmalang/core");
const Starter = _core.dogma.use(require("../../Starter"));
const $IncStarter = class IncStarter extends Starter {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('blankSheets', _['blankSheets'], _core.num);
    Object.defineProperty(this, 'blankSheets', {
      value: (0, _core.coalesce)(_['blankSheets'], null),
      writable: true,
      enumerable: false
    });
    (0, _core.expect)('inc', _['inc'], _core.num);
    Object.defineProperty(this, 'inc', {
      value: (0, _core.coalesce)(_['inc'], null),
      writable: true,
      enumerable: false
    });
    /* c8 ignore start */
    if (this._pvt_875ac5042f9376be38b98c53fbc879db___init__ instanceof Function) this._pvt_875ac5042f9376be38b98c53fbc879db___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_875ac5042f9376be38b98c53fbc879db___post__ instanceof Function) this._pvt_875ac5042f9376be38b98c53fbc879db___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_875ac5042f9376be38b98c53fbc879db___validate__ instanceof Function) this._pvt_875ac5042f9376be38b98c53fbc879db___validate__(); /* c8 ignore stop */
  }
};

const IncStarter = new Proxy($IncStarter, {
  apply(receiver, self, args) {
    return new $IncStarter(...args);
  }
});
module.exports = exports = IncStarter;
IncStarter.prototype.generateBlankSheets = function () {
  const self = this;
  {
    if (this.iterations > 1) {
      this.blankSheets += this.inc;
    }
    for (let i = 0; i < Math.floor(this.blankSheets); i += 1) {
      this.output.append({
        'ts': (0, _core.timestamp)().valueOf()
      });
    }
  }
};