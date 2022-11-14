"use strict";

var _core = require("@dogmalang/core");
const {
  CatalogCommand: CatalogCommandBase
} = _core.dogma.use(require("@akromio/cli"));
const {
  JobParser
} = _core.dogma.use(require("@akromio/jobs"));
const _JobCommand = _core.dogma.use(require("./_JobCommand"));
const $CatalogCommand = class CatalogCommand extends CatalogCommandBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore next */
    if (_JobCommand.prototype._constructor instanceof Function) _JobCommand.prototype._constructor.bind(this)(_);
    /* c8 ignore start */
    if (this._pvt_f79b96f884341e5884eb8533126057d7___init__ instanceof Function) this._pvt_f79b96f884341e5884eb8533126057d7___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_f79b96f884341e5884eb8533126057d7___post__ instanceof Function) this._pvt_f79b96f884341e5884eb8533126057d7___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_f79b96f884341e5884eb8533126057d7___validate__ instanceof Function) this._pvt_f79b96f884341e5884eb8533126057d7___validate__(); /* c8 ignore stop */
  }
};

_core.dogma.mixin($CatalogCommand, _JobCommand);
const CatalogCommand = new Proxy($CatalogCommand, {
  apply(receiver, self, args) {
    return new $CatalogCommand(...args);
  }
});
module.exports = exports = CatalogCommand;
CatalogCommand.prototype.createJobParser = function () {
  const self = this;
  {
    return JobParser();
  }
};