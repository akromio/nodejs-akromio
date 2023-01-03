"use strict";

var _core = require("@dogmalang/core");
const {
  DatasetCommand: DatasetCommandBase
} = _core.dogma.use(require("@akromio/cli"));
const _JobCommand = _core.dogma.use(require("./_JobCommand"));
const $DatasetCommand = class DatasetCommand extends DatasetCommandBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore next */
    if (_JobCommand.prototype._constructor instanceof Function) _JobCommand.prototype._constructor.bind(this)(_);
    /* c8 ignore start */
    if (this._pvt_13897f0000cfd06ba8e4ecfce9a8641c___init__ instanceof Function) this._pvt_13897f0000cfd06ba8e4ecfce9a8641c___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_13897f0000cfd06ba8e4ecfce9a8641c___post__ instanceof Function) this._pvt_13897f0000cfd06ba8e4ecfce9a8641c___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_13897f0000cfd06ba8e4ecfce9a8641c___validate__ instanceof Function) this._pvt_13897f0000cfd06ba8e4ecfce9a8641c___validate__(); /* c8 ignore stop */
  }
};

_core.dogma.mixin($DatasetCommand, _JobCommand);
const DatasetCommand = new Proxy($DatasetCommand, {
  apply(receiver, self, args) {
    return new $DatasetCommand(...args);
  }
});
module.exports = exports = DatasetCommand;