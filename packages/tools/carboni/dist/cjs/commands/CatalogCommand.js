"use strict";

var _core = require("@dogmalang/core");
const {
  CatalogCommand: CatalogCommandBase
} = _core.dogma.use(require("@akromio/cli"));
const {
  StageParser
} = _core.dogma.use(require("@akromio/stages"));
const _StageCommand = _core.dogma.use(require("./_StageCommand"));
const $CatalogCommand = class CatalogCommand extends CatalogCommandBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore next */
    if (_StageCommand.prototype._constructor instanceof Function) _StageCommand.prototype._constructor.bind(this)(_);
    /* c8 ignore start */
    if (_['desc'] != null) (0, _core.expect)('desc', _['desc'], _core.text); /* c8 ignore stop */
    Object.defineProperty(this, 'desc', {
      value: (0, _core.coalesce)(_['desc'], "List the items of a stage catalog."),
      writable: false,
      enumerable: true
    });
    Object.defineProperty(this, 'itemName', {
      value: (0, _core.coalesce)(_['itemName'], "stage"),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_f79b96f884341e5884eb8533126057d7___init__ instanceof Function) this._pvt_f79b96f884341e5884eb8533126057d7___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_f79b96f884341e5884eb8533126057d7___post__ instanceof Function) this._pvt_f79b96f884341e5884eb8533126057d7___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_f79b96f884341e5884eb8533126057d7___validate__ instanceof Function) this._pvt_f79b96f884341e5884eb8533126057d7___validate__(); /* c8 ignore stop */
  }
};

_core.dogma.mixin($CatalogCommand, _StageCommand);
const CatalogCommand = new Proxy($CatalogCommand, {
  apply(receiver, self, args) {
    return new $CatalogCommand(...args);
  }
});
module.exports = exports = CatalogCommand;
CatalogCommand.prototype.createItemParser = function () {
  const self = this;
  {
    return StageParser();
  }
};