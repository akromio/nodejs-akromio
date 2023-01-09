"use strict";

var _core = require("@dogmalang/core");
const {
  SimpleEngine,
  PluginParser
} = _core.dogma.use(require("@akromio/core"));
const $JobEngine = class JobEngine extends SimpleEngine {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_47f8fa6fd7e622f42df3d880adb9f655___init__ instanceof Function) this._pvt_47f8fa6fd7e622f42df3d880adb9f655___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_47f8fa6fd7e622f42df3d880adb9f655___post__ instanceof Function) this._pvt_47f8fa6fd7e622f42df3d880adb9f655___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_47f8fa6fd7e622f42df3d880adb9f655___validate__ instanceof Function) this._pvt_47f8fa6fd7e622f42df3d880adb9f655___validate__(); /* c8 ignore stop */
  }
};

const JobEngine = new Proxy($JobEngine, {
  apply(receiver, self, args) {
    return new $JobEngine(...args);
  }
});
module.exports = exports = JobEngine;