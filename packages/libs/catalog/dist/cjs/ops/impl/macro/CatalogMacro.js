"use strict";

var _core = require("@dogmalang/core");
const {
  Call,
  DynamicMacro
} = _core.dogma.use(require("@akromio/core"));
const CatalogSteppedOp = _core.dogma.use(require("../CatalogSteppedOp"));
const $CatalogMacro = class CatalogMacro extends DynamicMacro {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore next */
    if (CatalogSteppedOp.prototype._constructor instanceof Function) CatalogSteppedOp.prototype._constructor.bind(this)(_);
    /* c8 ignore start */
    if (_['initializers'] != null) (0, _core.expect)('initializers', _['initializers'], _core.list); /* c8 ignore stop */
    Object.defineProperty(this, 'initializers', {
      value: (0, _core.coalesce)(_['initializers'], []),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['finalizers'] != null) (0, _core.expect)('finalizers', _['finalizers'], _core.list); /* c8 ignore stop */
    Object.defineProperty(this, 'finalizers', {
      value: (0, _core.coalesce)(_['finalizers'], []),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_160654bea4872492d55d37f082261698___init__ instanceof Function) this._pvt_160654bea4872492d55d37f082261698___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_160654bea4872492d55d37f082261698___post__ instanceof Function) this._pvt_160654bea4872492d55d37f082261698___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_160654bea4872492d55d37f082261698___validate__ instanceof Function) this._pvt_160654bea4872492d55d37f082261698___validate__(); /* c8 ignore stop */
  }
};

_core.dogma.mixin($CatalogMacro, CatalogSteppedOp);
const CatalogMacro = new Proxy($CatalogMacro, {
  apply(receiver, self, args) {
    return new $CatalogMacro(...args);
  }
});
module.exports = exports = CatalogMacro;
CatalogMacro.prototype.getInitializerSteps = function (call) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("call", call, Call);
  {
    return this.buildSteps(this.initializers, call);
  }
};
CatalogMacro.prototype.getFinalizerSteps = function (call) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("call", call, Call);
  {
    return this.buildSteps(this.finalizers, call);
  }
};