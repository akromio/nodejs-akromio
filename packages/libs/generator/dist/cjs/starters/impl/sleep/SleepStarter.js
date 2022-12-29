"use strict";

var _core = require("@dogmalang/core");
const Starter = _core.dogma.use(require("../../Starter"));
const $SleepStarter = class SleepStarter extends Starter {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_ad38148947d94754f968e1fd81a655d0___init__ instanceof Function) this._pvt_ad38148947d94754f968e1fd81a655d0___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_ad38148947d94754f968e1fd81a655d0___post__ instanceof Function) this._pvt_ad38148947d94754f968e1fd81a655d0___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_ad38148947d94754f968e1fd81a655d0___validate__ instanceof Function) this._pvt_ad38148947d94754f968e1fd81a655d0___validate__(); /* c8 ignore stop */
  }
};

const SleepStarter = new Proxy($SleepStarter, {
  apply(receiver, self, args) {
    return new $SleepStarter(...args);
  }
});
module.exports = exports = SleepStarter;
SleepStarter.prototype.generateBlankSheets = function () {
  const self = this;
  {
    _core.dogma.nop();
  }
};