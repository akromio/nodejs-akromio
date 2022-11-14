"use strict";

var _core = require("@dogmalang/core");
const Reporter = _core.dogma.use(require("./Reporter"));
const $SummaryReporter = class SummaryReporter extends Reporter {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    Object.defineProperty(this, 'ok', {
      value: 0,
      writable: true,
      enumerable: false
    });
    Object.defineProperty(this, 'failed', {
      value: 0,
      writable: true,
      enumerable: false
    });
    /* c8 ignore start */
    if (this._pvt_bde29deba1803505dec1d7c1f686dc15___init__ instanceof Function) this._pvt_bde29deba1803505dec1d7c1f686dc15___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_bde29deba1803505dec1d7c1f686dc15___post__ instanceof Function) this._pvt_bde29deba1803505dec1d7c1f686dc15___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_bde29deba1803505dec1d7c1f686dc15___validate__ instanceof Function) this._pvt_bde29deba1803505dec1d7c1f686dc15___validate__(); /* c8 ignore stop */
  }
};

const SummaryReporter = new Proxy($SummaryReporter, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'SummaryReporter' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = SummaryReporter;
SummaryReporter.prototype._handleOpStart = function (e) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("e", e);
  {
    _core.dogma.nop();
  }
};
SummaryReporter.prototype._handleOpEnd = function (e) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("e", e);
  {
    if (e.opType == "simple") {
      {
        const _ = e.result.kind;
        switch (_) {
          case "ok":
            {
              this.ok += 1;
            } /* c8 ignore start */
            break;
          /* c8 ignore stop */
          case "failed":
            {
              this.failed += 1;
            } /* c8 ignore start */
            break;
          /* c8 ignore stop */
        }
      }
    }
  }
};