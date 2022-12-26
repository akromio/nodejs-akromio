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
    if (_['desc'] != null) (0, _core.expect)('desc', _['desc'], _core.text); /* c8 ignore stop */
    Object.defineProperty(this, 'desc', {
      value: (0, _core.coalesce)(_['desc'], "List the items of a job catalog."),
      writable: false,
      enumerable: true
    });
    Object.defineProperty(this, 'itemName', {
      value: (0, _core.coalesce)(_['itemName'], "job"),
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

_core.dogma.mixin($CatalogCommand, _JobCommand);
const CatalogCommand = new Proxy($CatalogCommand, {
  apply(receiver, self, args) {
    return new $CatalogCommand(...args);
  }
});
module.exports = exports = CatalogCommand;
CatalogCommand.prototype.createItemParser = function () {
  const self = this;
  {
    return JobParser();
  }
};
CatalogCommand.prototype.getTypeNameOf = function (item) {
  const self = this;
  let typeName = ""; /* c8 ignore next */
  _core.dogma.expect("item", item);
  {
    {
      const _ = item;
      if (_core.dogma.is(_, "Macro")) {
        {
          typeName = "macro";
        }
      } else if (_core.dogma.is(_, "Co")) {
        {
          typeName = "co";
        }
      } else if (_core.dogma.is(_, "Script")) {
        {
          typeName = "script";
        }
      }
    }
  }
  return typeName;
};