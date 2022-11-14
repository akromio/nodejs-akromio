"use strict";

var _core = require("@dogmalang/core");
const {
  ShowCommand: ShowCommandBase
} = _core.dogma.use(require("@akromio/cli"));
const {
  JobParser
} = _core.dogma.use(require("@akromio/jobs"));
const _JobCommand = _core.dogma.use(require("./_JobCommand"));
const $ShowCommand = class ShowCommand extends ShowCommandBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore next */
    if (_JobCommand.prototype._constructor instanceof Function) _JobCommand.prototype._constructor.bind(this)(_);
    /* c8 ignore start */
    if (this._pvt_618d11c2558727a79ef77a6cf8912618___init__ instanceof Function) this._pvt_618d11c2558727a79ef77a6cf8912618___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_618d11c2558727a79ef77a6cf8912618___post__ instanceof Function) this._pvt_618d11c2558727a79ef77a6cf8912618___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_618d11c2558727a79ef77a6cf8912618___validate__ instanceof Function) this._pvt_618d11c2558727a79ef77a6cf8912618___validate__(); /* c8 ignore stop */
  }
};

_core.dogma.mixin($ShowCommand, _JobCommand);
const ShowCommand = new Proxy($ShowCommand, {
  apply(receiver, self, args) {
    return new $ShowCommand(...args);
  }
});
module.exports = exports = ShowCommand;
ShowCommand.prototype.createJobParser = function () {
  const self = this;
  {
    return JobParser();
  }
};