"use strict";

var _core = require("@dogmalang/core");
const SleepStage = _core.dogma.use(require("./SleepStage"));
const StageParser = _core.dogma.use(require("./StageParser"));
const $ConstStageParser = class ConstStageParser extends StageParser {
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

const ConstStageParser = new Proxy($ConstStageParser, {
  apply(receiver, self, args) {
    return new $ConstStageParser(...args);
  }
});
module.exports = exports = ConstStageParser;