"use strict";

var _core = require("@dogmalang/core");
const Op = _core.dogma.use(require("../Op"));
const Call = _core.dogma.use(require("../Call"));
const $CompositeOp = class CompositeOp extends Op {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (_['title'] != null) (0, _core.expect)('title', _['title'], _core.text); /* c8 ignore stop */
    Object.defineProperty(this, 'title', {
      value: (0, _core.coalesce)(_['title'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['onError'] != null) (0, _core.expect)('onError', _['onError'], ["carryOn", "finish"]); /* c8 ignore stop */
    Object.defineProperty(this, 'onError', {
      value: (0, _core.coalesce)(_['onError'], "carryOn"),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['dataset'] != null) (0, _core.expect)('dataset', _['dataset'], _core.dogma.TypeDef({
      name: 'inline',
      types: [_core.map],
      min: 0,
      max: null
    })); /* c8 ignore stop */
    Object.defineProperty(this, 'dataset', {
      value: (0, _core.coalesce)(_['dataset'], []),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_3efc6787ac66593c837c4b26c9f0f5ea___init__ instanceof Function) this._pvt_3efc6787ac66593c837c4b26c9f0f5ea___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_3efc6787ac66593c837c4b26c9f0f5ea___post__ instanceof Function) this._pvt_3efc6787ac66593c837c4b26c9f0f5ea___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_3efc6787ac66593c837c4b26c9f0f5ea___validate__ instanceof Function) this._pvt_3efc6787ac66593c837c4b26c9f0f5ea___validate__(); /* c8 ignore stop */
  }
};

const CompositeOp = new Proxy($CompositeOp, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'CompositeOp' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = CompositeOp;
CompositeOp.prototype.buildTitle = function () {
  const self = this;
  let title = "";
  {
    ({
      title: title
    } = this);
    if (!title) {
      title = this.name;
    }
  }
  return title;
};
CompositeOp.prototype.getInitializerSteps = function (call) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("call", call, Call);
  {
    return [];
  }
};
CompositeOp.prototype.getSteps = function (call) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("call", call, Call);
  {
    return [];
  }
};
CompositeOp.prototype.getFinalizerSteps = function (call) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("call", call, Call);
  {
    return [];
  }
};