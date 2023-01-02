"use strict";

var _core = require("@dogmalang/core");
const {
  ms
} = _core.dogma.use(require("./util"));
const {
  CatalogItemParser,
  CatalogItemParseOpts
} = _core.dogma.use(require("@akromio/catalog"));
const ConstStage = _core.dogma.use(require("./ConstStage"));
const IncStage = _core.dogma.use(require("./IncStage"));
const SleepStage = _core.dogma.use(require("./SleepStage"));
const ParseOpts = CatalogItemParseOpts;
const $StageParser = class StageParser extends CatalogItemParser {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    Object.defineProperty(this, 'itemName', {
      value: (0, _core.coalesce)(_['itemName'], "stage"),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_1339003db8d936b7d77249a21f3bd60f___init__ instanceof Function) this._pvt_1339003db8d936b7d77249a21f3bd60f___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_1339003db8d936b7d77249a21f3bd60f___post__ instanceof Function) this._pvt_1339003db8d936b7d77249a21f3bd60f___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_1339003db8d936b7d77249a21f3bd60f___validate__ instanceof Function) this._pvt_1339003db8d936b7d77249a21f3bd60f___validate__(); /* c8 ignore stop */
  }
};

const StageParser = new Proxy($StageParser, {
  apply(receiver, self, args) {
    return new $StageParser(...args);
  }
});
module.exports = exports = StageParser;
StageParser.prototype.parseItem = function (decl, opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("opts", opts, ParseOpts);
  {
    return this.parseStage(decl, opts);
  }
};
StageParser.prototype.parseStage = function (decl, opts) {
  const self = this;
  let stage; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("opts", opts, ParseOpts);
  {
    if (_core.dogma.includes(decl, "const")) {
      stage = this.parseConstStage(decl, opts);
    } else if (_core.dogma.includes(decl, "inc")) {
      stage = this.parseIncStage(decl, opts);
    } else if (_core.dogma.includes(decl, "sleep")) {
      stage = this.parseSleepStage(decl, opts);
    } else {
      stage = this.parseAddOnStage(decl, opts);
    }
  }
  return stage;
};
StageParser.prototype.parseAddOnStage = function (decl, _) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("_", _, ParseOpts);
  {
    _core.dogma.raise(TypeError(`Invalid stage declaration: ${(0, _core.fmt)(decl)}.`));
  }
};
StageParser.prototype.parseConstStage = function (decl, _) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("_", _, ParseOpts);
  {
    return ConstStage(_core.dogma.clone(decl, {
      "name": decl.const,
      "duration": ms(decl.duration),
      "interval": _core.dogma.clone(decl.interval, {
        "duration": ms(decl.interval.duration || "1s")
      }, {}, [], [])
    }, {}, [], []));
  }
};
StageParser.prototype.parseIncStage = function (decl, _) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("_", _, ParseOpts);
  {
    return IncStage(_core.dogma.clone(decl, {
      "name": decl.inc,
      "duration": ms(decl.duration),
      "interval": _core.dogma.clone(decl.interval, {
        "duration": ms(decl.interval.duration || "1s")
      }, {}, [], [])
    }, {}, [], []));
  }
};
StageParser.prototype.parseSleepStage = function (decl, _) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("_", _, ParseOpts);
  {
    return SleepStage(_core.dogma.clone(decl, {
      "name": decl.sleep,
      "duration": ms(decl.duration)
    }, {}, [], []));
  }
};