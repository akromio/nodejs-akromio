"use strict";

var _core = require("@dogmalang/core");
const Stage = _core.dogma.use(require("./Stage"));
const $SleepStage = class SleepStage extends Stage {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_9d128b50009be7625bd19ef8a73d87ad___init__ instanceof Function) this._pvt_9d128b50009be7625bd19ef8a73d87ad___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_9d128b50009be7625bd19ef8a73d87ad___post__ instanceof Function) this._pvt_9d128b50009be7625bd19ef8a73d87ad___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_9d128b50009be7625bd19ef8a73d87ad___validate__ instanceof Function) this._pvt_9d128b50009be7625bd19ef8a73d87ad___validate__(); /* c8 ignore stop */
  }
};

const SleepStage = new Proxy($SleepStage, {
  apply(receiver, self, args) {
    return new $SleepStage(...args);
  }
});
module.exports = exports = SleepStage;