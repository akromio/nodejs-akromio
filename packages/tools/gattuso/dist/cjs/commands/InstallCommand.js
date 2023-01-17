"use strict";

var _core = require("@dogmalang/core");
const {
  InstallCommand: InstallCommandBase
} = _core.dogma.use(require("@akromio/cli"));
const _JobCommand = _core.dogma.use(require("./_JobCommand"));
const $InstallCommand = class InstallCommand extends InstallCommandBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore next */
    if (_JobCommand.prototype._constructor instanceof Function) _JobCommand.prototype._constructor.bind(this)(_);
    /* c8 ignore start */
    if (this._pvt_096152120eabb5e26fdd542ff453a735___init__ instanceof Function) this._pvt_096152120eabb5e26fdd542ff453a735___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_096152120eabb5e26fdd542ff453a735___post__ instanceof Function) this._pvt_096152120eabb5e26fdd542ff453a735___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_096152120eabb5e26fdd542ff453a735___validate__ instanceof Function) this._pvt_096152120eabb5e26fdd542ff453a735___validate__(); /* c8 ignore stop */
  }
};

_core.dogma.mixin($InstallCommand, _JobCommand);
const InstallCommand = new Proxy($InstallCommand, {
  apply(receiver, self, args) {
    return new $InstallCommand(...args);
  }
});
module.exports = exports = InstallCommand;