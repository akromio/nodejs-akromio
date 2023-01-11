"use strict";

var _core = require("@dogmalang/core");
const {
  CompositeEngine
} = _core.dogma.use(require("@akromio/core"));
const $JobsEngine = class JobsEngine extends CompositeEngine {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_b9df3bd13aade839536a874222d96910___init__ instanceof Function) this._pvt_b9df3bd13aade839536a874222d96910___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_b9df3bd13aade839536a874222d96910___post__ instanceof Function) this._pvt_b9df3bd13aade839536a874222d96910___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_b9df3bd13aade839536a874222d96910___validate__ instanceof Function) this._pvt_b9df3bd13aade839536a874222d96910___validate__(); /* c8 ignore stop */
  }
};

const JobsEngine = new Proxy($JobsEngine, {
  apply(receiver, self, args) {
    return new $JobsEngine(...args);
  }
});
module.exports = exports = JobsEngine;