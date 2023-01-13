"use strict";

var _core = require("@dogmalang/core");
const merge = _core.dogma.use(require("lodash.merge"));
const config = _core.dogma.use(require("./config"));
const {
  fmtDuration
} = _core.dogma.use(require("../duration"));
const Reporter = _core.dogma.use(require("../../Reporter"));
const $LogReporter = class LogReporter extends Reporter {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (_['nestingLevel'] != null) (0, _core.expect)('nestingLevel', _['nestingLevel'], _core.num); /* c8 ignore stop */
    Object.defineProperty(this, 'nestingLevel', {
      value: (0, _core.coalesce)(_['nestingLevel'], 1),
      writable: false,
      enumerable: true
    });
    Object.defineProperty(this, 'config', {
      value: merge(config, _.config),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_1f80d7cba101746bd279ea889b02187e___init__ instanceof Function) this._pvt_1f80d7cba101746bd279ea889b02187e___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_1f80d7cba101746bd279ea889b02187e___post__ instanceof Function) this._pvt_1f80d7cba101746bd279ea889b02187e___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_1f80d7cba101746bd279ea889b02187e___validate__ instanceof Function) this._pvt_1f80d7cba101746bd279ea889b02187e___validate__(); /* c8 ignore stop */
  }
};

const LogReporter = new Proxy($LogReporter, {
  apply(receiver, self, args) {
    return new $LogReporter(...args);
  }
});
module.exports = exports = LogReporter;
Object.defineProperty(LogReporter.prototype, "print", {
  enum: true,
  get: function () {
    const self = this;
    {
      return this.config.print;
    }
  }
});
Object.defineProperty(LogReporter.prototype, "format", {
  enum: true,
  get: function () {
    const self = this;
    {
      return this.config.format;
    }
  }
});
LogReporter.prototype._handleOpStart = function (e) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("e", e);
  {
    if (e.level > this.nestingLevel) {
      return;
    }
    const log = this.format.start.replace("$(ts)", e.ts).replace("$(runner)", e.runner.name).replace("$(id)", e.id).replace("$(title)", e.title);
    this.print(log);
  }
};
LogReporter.prototype._handleOpEnd = function (e) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("e", e);
  {
    if (e.level > this.nestingLevel) {
      return;
    }
    const log = this.format.end.replace("$(ts)", e.ts).replace("$(runner)", e.runner.name).replace("$(id)", e.id).replace("$(title)", e.title).replace("$(result)", e.result.kind.toUpperCase()).replace("$(duration)", fmtDuration(e.result.duration).replace(" ", ""));
    this.print(log);
  }
};