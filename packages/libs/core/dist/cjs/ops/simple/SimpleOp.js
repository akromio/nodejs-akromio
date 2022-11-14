"use strict";

var _core = require("@dogmalang/core");
const {
  Dataset
} = _core.dogma.use(require("@akromio/dataset"));
const Op = _core.dogma.use(require("../Op"));
const $SimpleOp = class SimpleOp extends Op {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    Object.defineProperty(this, 'parentPlugin', {
      value: (0, _core.coalesce)(_['parentPlugin'], null),
      writable: true,
      enumerable: false
    });
    /* c8 ignore start */
    if (_['title'] != null) (0, _core.expect)('title', _['title'], [_core.text, _core.func]); /* c8 ignore stop */
    Object.defineProperty(this, 'title', {
      value: (0, _core.coalesce)(_['title'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['parameterizer'] != null) (0, _core.expect)('parameterizer', _['parameterizer'], _core.func); /* c8 ignore stop */
    Object.defineProperty(this, 'parameterizer', {
      value: (0, _core.coalesce)(_['parameterizer'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_c51dbc8c01aae7d72269714f1a8b11f2___init__ instanceof Function) this._pvt_c51dbc8c01aae7d72269714f1a8b11f2___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_c51dbc8c01aae7d72269714f1a8b11f2___post__ instanceof Function) this._pvt_c51dbc8c01aae7d72269714f1a8b11f2___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_c51dbc8c01aae7d72269714f1a8b11f2___validate__ instanceof Function) this._pvt_c51dbc8c01aae7d72269714f1a8b11f2___validate__(); /* c8 ignore stop */
  }
};

const SimpleOp = new Proxy($SimpleOp, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'SimpleOp' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = SimpleOp;
Object.defineProperty(SimpleOp.prototype, "state", {
  enum: true,
  get: function () {
    const self = this;
    {
      return this.parentPlugin != null ? this.parentPlugin.state : null;
    }
  }
});
SimpleOp.prototype.buildTitle = function (params) {
  const self = this;
  let title = "";
  {
    if (_core.dogma.is(this.title, _core.text)) {
      ({
        title: title
      } = this);
    } else if (_core.dogma.is(this.title, _core.func)) {
      title = this.title(params);
    } else {
      title = this.name;
    }
  }
  return title;
};
SimpleOp.prototype.buildParams = function (args, ds) {
  const self = this;
  let params;
  {
    if (ds) {
      args = ds.eval(args);
    }
    params = this.parameterizer ? this.parameterizer(args) : args;
  }
  return params;
};