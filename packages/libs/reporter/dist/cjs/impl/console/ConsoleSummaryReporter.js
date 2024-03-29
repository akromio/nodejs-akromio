"use strict";

var _core = require("@dogmalang/core");
const merge = _core.dogma.use(require("lodash.merge"));
const config = _core.dogma.use(require("./config"));
const SummaryReporter = _core.dogma.use(require("../../SummaryReporter"));
const $ConsoleSummaryReporter = class ConsoleSummaryReporter extends SummaryReporter {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    Object.defineProperty(this, 'config', {
      value: merge(config, _.config),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_6253d2b2a629240f5a05ad71ae771f3e___init__ instanceof Function) this._pvt_6253d2b2a629240f5a05ad71ae771f3e___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_6253d2b2a629240f5a05ad71ae771f3e___post__ instanceof Function) this._pvt_6253d2b2a629240f5a05ad71ae771f3e___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_6253d2b2a629240f5a05ad71ae771f3e___validate__ instanceof Function) this._pvt_6253d2b2a629240f5a05ad71ae771f3e___validate__(); /* c8 ignore stop */
  }
};

const ConsoleSummaryReporter = new Proxy($ConsoleSummaryReporter, {
  apply(receiver, self, args) {
    return new $ConsoleSummaryReporter(...args);
  }
});
module.exports = exports = ConsoleSummaryReporter;
Object.defineProperty(ConsoleSummaryReporter.prototype, "print", {
  enum: true,
  get: function () {
    const self = this;
    {
      return this.config.print;
    }
  }
});
ConsoleSummaryReporter.prototype._handleEnd = function () {
  const self = this;
  {
    const {
      config,
      print,
      ok,
      failed
    } = this;
    print("\nSummary:");
    print(` - ${config.ok.color('ok')} ${ok}`);
    print(` - ${config.failed.color('failed')} ${failed}`);
  }
};