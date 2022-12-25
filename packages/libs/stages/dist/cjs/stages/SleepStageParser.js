"use strict";

var _core = require("@dogmalang/core");
const SleepStage = _core.dogma.use(require("./SleepStage"));
const StageParser = _core.dogma.use(require("./StageParser"));
const $SleepStageParser = class SleepStageParser extends StageParser {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_1bedce8c0a4beb70eab0a7f7f182e14d___init__ instanceof Function) this._pvt_1bedce8c0a4beb70eab0a7f7f182e14d___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_1bedce8c0a4beb70eab0a7f7f182e14d___post__ instanceof Function) this._pvt_1bedce8c0a4beb70eab0a7f7f182e14d___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_1bedce8c0a4beb70eab0a7f7f182e14d___validate__ instanceof Function) this._pvt_1bedce8c0a4beb70eab0a7f7f182e14d___validate__(); /* c8 ignore stop */
  }
};

const SleepStageParser = new Proxy($SleepStageParser, {
  apply(receiver, self, args) {
    return new $SleepStageParser(...args);
  }
});
module.exports = exports = SleepStageParser;
SleepStageParser.prototype._parse = function (decl) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map);
  {
    return _core.dogma.clone(decl, {
      "name": decl.sleep,
      "impl": "sleep"
    }, {}, ["sleep"], []);
  }
};