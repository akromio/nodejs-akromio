"use strict";

var _core = require("@dogmalang/core");
const Stage = _core.dogma.use(require("./Stage"));
const $ExitStage = class ExitStage extends Stage {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_05a8d3875b93cd003c5c98e7dae18a4d___init__ instanceof Function) this._pvt_05a8d3875b93cd003c5c98e7dae18a4d___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_05a8d3875b93cd003c5c98e7dae18a4d___post__ instanceof Function) this._pvt_05a8d3875b93cd003c5c98e7dae18a4d___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_05a8d3875b93cd003c5c98e7dae18a4d___validate__ instanceof Function) this._pvt_05a8d3875b93cd003c5c98e7dae18a4d___validate__(); /* c8 ignore stop */
  }
};

const ExitStage = new Proxy($ExitStage, {
  apply(receiver, self, args) {
    return new $ExitStage(...args);
  }
});
module.exports = exports = ExitStage;