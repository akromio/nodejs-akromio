"use strict";

var _core = require("@dogmalang/core");
const {
  JobsEngine
} = _core.dogma.use(require("@akromio/jobs"));
const preset = _core.dogma.use(require("@akromio/preset-cavani"));
const $Engine = class Engine extends JobsEngine {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_89d20fbffb8a4b197b2e2a90b0df3656___init__ instanceof Function) this._pvt_89d20fbffb8a4b197b2e2a90b0df3656___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_89d20fbffb8a4b197b2e2a90b0df3656___post__ instanceof Function) this._pvt_89d20fbffb8a4b197b2e2a90b0df3656___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_89d20fbffb8a4b197b2e2a90b0df3656___validate__ instanceof Function) this._pvt_89d20fbffb8a4b197b2e2a90b0df3656___validate__(); /* c8 ignore stop */
  }
};

const Engine = new Proxy($Engine, {
  apply(receiver, self, args) {
    return new $Engine(...args);
  }
});
module.exports = exports = Engine;
Engine.prototype.getBuiltInPresets = function () {
  const self = this;
  {
    return [preset];
  }
};