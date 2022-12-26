"use strict";

var _core = require("@dogmalang/core");
const {
  CatalogItem
} = _core.dogma.use(require("@akromio/catalog"));
const $Stage = class Stage extends CatalogItem {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('duration', _['duration'], _core.num);
    Object.defineProperty(this, 'duration', {
      value: (0, _core.coalesce)(_['duration'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_1eecd7be08487441f67fe6dc9d688a16___init__ instanceof Function) this._pvt_1eecd7be08487441f67fe6dc9d688a16___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_1eecd7be08487441f67fe6dc9d688a16___post__ instanceof Function) this._pvt_1eecd7be08487441f67fe6dc9d688a16___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_1eecd7be08487441f67fe6dc9d688a16___validate__ instanceof Function) this._pvt_1eecd7be08487441f67fe6dc9d688a16___validate__(); /* c8 ignore stop */
  }
};

const Stage = new Proxy($Stage, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'Stage' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = Stage;