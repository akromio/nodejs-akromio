"use strict";

var _core = require("@dogmalang/core");
const {
  RegistryCommand: RegistryCommandBase
} = _core.dogma.use(require("@akromio/cli"));
const _JobCommand = _core.dogma.use(require("./_JobCommand"));
const $RegistryCommand = class RegistryCommand extends RegistryCommandBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore next */
    if (_JobCommand.prototype._constructor instanceof Function) _JobCommand.prototype._constructor.bind(this)(_);
    /* c8 ignore start */
    if (this._pvt_2b2e79c3ef3ff0b63a115e233c5ac20a___init__ instanceof Function) this._pvt_2b2e79c3ef3ff0b63a115e233c5ac20a___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_2b2e79c3ef3ff0b63a115e233c5ac20a___post__ instanceof Function) this._pvt_2b2e79c3ef3ff0b63a115e233c5ac20a___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_2b2e79c3ef3ff0b63a115e233c5ac20a___validate__ instanceof Function) this._pvt_2b2e79c3ef3ff0b63a115e233c5ac20a___validate__(); /* c8 ignore stop */
  }
};

_core.dogma.mixin($RegistryCommand, _JobCommand);
const RegistryCommand = new Proxy($RegistryCommand, {
  apply(receiver, self, args) {
    return new $RegistryCommand(...args);
  }
});
module.exports = exports = RegistryCommand;