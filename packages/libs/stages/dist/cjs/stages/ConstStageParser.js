"use strict";

var _core = require("@dogmalang/core");
const {
  ms
} = _core.dogma.use(require("./util"));
const ConstStage = _core.dogma.use(require("./ConstStage"));
const StageParser = _core.dogma.use(require("./StageParser"));
const $ConstStageParser = class ConstStageParser extends StageParser {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_d4f2dfb74723be0fe5e643883b854758___init__ instanceof Function) this._pvt_d4f2dfb74723be0fe5e643883b854758___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_d4f2dfb74723be0fe5e643883b854758___post__ instanceof Function) this._pvt_d4f2dfb74723be0fe5e643883b854758___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_d4f2dfb74723be0fe5e643883b854758___validate__ instanceof Function) this._pvt_d4f2dfb74723be0fe5e643883b854758___validate__(); /* c8 ignore stop */
  }
};

const ConstStageParser = new Proxy($ConstStageParser, {
  apply(receiver, self, args) {
    return new $ConstStageParser(...args);
  }
});
module.exports = exports = ConstStageParser;
ConstStageParser.prototype._parse = function (decl) {
  const self = this;
  let stage = {}; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map);
  {
    stage = _core.dogma.clone(decl, {
      "interval": ms(decl.interval || "1s")
    }, {}, [], []);
    if (_core.dogma.isNot(stage, ConstStage)) {
      _core.dogma.raise(TypeError(`Const stage schema not valid: ${(0, _core.fmt)(decl)}.`));
    }
  }
  return stage;
};