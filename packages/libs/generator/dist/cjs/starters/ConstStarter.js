"use strict";

var _core = require("@dogmalang/core");
const Starter = _core.dogma.use(require("./Starter"));
const $ConstLoadStarter = class ConstLoadStarter extends Starter {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('blankSheets', _['blankSheets'], _core.num);
    Object.defineProperty(this, 'blankSheets', {
      value: (0, _core.coalesce)(_['blankSheets'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_8eeadc57686bfa10a215b7740477e5de___init__ instanceof Function) this._pvt_8eeadc57686bfa10a215b7740477e5de___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_8eeadc57686bfa10a215b7740477e5de___post__ instanceof Function) this._pvt_8eeadc57686bfa10a215b7740477e5de___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_8eeadc57686bfa10a215b7740477e5de___validate__ instanceof Function) this._pvt_8eeadc57686bfa10a215b7740477e5de___validate__(); /* c8 ignore stop */
  }
};

const ConstLoadStarter = new Proxy($ConstLoadStarter, {
  apply(receiver, self, args) {
    return new $ConstLoadStarter(...args);
  }
});
module.exports = exports = ConstLoadStarter;
ConstLoadStarter.prototype.generateBlankSheets = function () {
  const self = this;
  {
    for (let i = 0; i < this.blankSheets; i += 1) {
      this.output.write("blank sheet");
    }
  }
};