"use strict";

var _core = require("@dogmalang/core");
const {
  EnvCommand: EnvCommandBase
} = _core.dogma.use(require("@akromio/cli"));
const $EnvCommand = class EnvCommand extends EnvCommandBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_bb53fae7674a8c3fa0fe97d55a27790f___init__ instanceof Function) this._pvt_bb53fae7674a8c3fa0fe97d55a27790f___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_bb53fae7674a8c3fa0fe97d55a27790f___post__ instanceof Function) this._pvt_bb53fae7674a8c3fa0fe97d55a27790f___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_bb53fae7674a8c3fa0fe97d55a27790f___validate__ instanceof Function) this._pvt_bb53fae7674a8c3fa0fe97d55a27790f___validate__(); /* c8 ignore stop */
  }
};

const EnvCommand = new Proxy($EnvCommand, {
  apply(receiver, self, args) {
    return new $EnvCommand(...args);
  }
});
module.exports = exports = EnvCommand;
EnvCommand.prototype.buildSpecializationVars = function () {
  const self = this;
  {
    return {
      ["JOB_CATALOGS_PATH"]: {
        ["desc"]: "Dir path to prefix when root job catalog name is relative."
      },
      ["JOB_CATALOG_NAME"]: {
        ["desc"]: "Job catalog name to use when unset."
      },
      ["JOB_NAME"]: {
        ["desc"]: "Default job name to run when unset."
      }
    };
  }
};