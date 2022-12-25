"use strict";

var _core = require("@dogmalang/core");
const {
  ms
} = _core.dogma.use(require("./util"));
const $StageParser = class StageParser {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_1339003db8d936b7d77249a21f3bd60f___init__ instanceof Function) this._pvt_1339003db8d936b7d77249a21f3bd60f___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_1339003db8d936b7d77249a21f3bd60f___post__ instanceof Function) this._pvt_1339003db8d936b7d77249a21f3bd60f___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_1339003db8d936b7d77249a21f3bd60f___validate__ instanceof Function) this._pvt_1339003db8d936b7d77249a21f3bd60f___validate__(); /* c8 ignore stop */
  }
};

const StageParser = new Proxy($StageParser, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'StageParser' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = StageParser;
StageParser.prototype.parse = function (decl, dataset) {
  const self = this;
  let stage = {}; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("dataset", dataset);
  {
    decl = dataset.eval(decl);
    stage = this._parse(_core.dogma.clone(decl, {
      "duration": ms(decl.duration)
    }, {}, [], []));
  }
  return stage;
};
/* c8 ignore start */
StageParser.prototype._parse = function () {
  (0, _core.abstract)();
}; /* c8 ignore stop */