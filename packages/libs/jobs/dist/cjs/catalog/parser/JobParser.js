"use strict";

var _core = require("@dogmalang/core");
const {
  Ops,
  MacroOperator,
  CoOperator,
  Script,
  ScriptOperator
} = _core.dogma.use(require("@akromio/core"));
const {
  CatalogMacro,
  CatalogCo,
  CatalogItemParser,
  CatalogItemParseOpts
} = _core.dogma.use(require("@akromio/catalog"));
const ParseOpts = _core.dogma.intf('ParseOpts', {
  ops: {
    optional: false,
    type: Ops
  }
}, CatalogItemParseOpts);
const $JobParser = class JobParser extends CatalogItemParser {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    Object.defineProperty(this, 'itemName', {
      value: (0, _core.coalesce)(_['itemName'], "job"),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_3f2f6b1f28978e7479def7898d1c20f1___init__ instanceof Function) this._pvt_3f2f6b1f28978e7479def7898d1c20f1___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_3f2f6b1f28978e7479def7898d1c20f1___post__ instanceof Function) this._pvt_3f2f6b1f28978e7479def7898d1c20f1___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_3f2f6b1f28978e7479def7898d1c20f1___validate__ instanceof Function) this._pvt_3f2f6b1f28978e7479def7898d1c20f1___validate__(); /* c8 ignore stop */
  }
};

const JobParser = new Proxy($JobParser, {
  apply(receiver, self, args) {
    return new $JobParser(...args);
  }
});
module.exports = exports = JobParser;
JobParser.prototype.parseItem = function (decl, opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("opts", opts, ParseOpts);
  {
    return this.parseJob(decl, opts);
  }
};
JobParser.prototype.parseJob = function (decl, opts) {
  const self = this;
  let job; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("opts", opts, ParseOpts);
  {
    {
      const local = decl.dataset;
      if (_core.dogma.is(local, _core.list)) {
        for (let i = 0; i < (0, _core.len)(local); i += 1) {
          {
            const datum = _core.dogma.getItem(local, i);
            if (_core.dogma.is(datum, _core.text)) {
              _core.dogma.setItem("=", local, i, {
                ["var"]: datum
              });
            }
          }
        }
      }
    }
    if (_core.dogma.includes(decl, "macro")) {
      job = this.parseMacro(decl, opts);
    } else if (_core.dogma.includes(decl, "co")) {
      job = this.parseCo(decl, opts);
    } else if (_core.dogma.includes(decl, "script")) {
      job = this.parseScript(decl, opts);
    } else {
      job = this.parseAddOnJob(decl, opts);
    }
  }
  return job;
};
JobParser.prototype.parseAddOnJob = function (decl, opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("opts", opts, ParseOpts);
  {
    _core.dogma.raise(Error(`Invalid job declaration: ${(0, _core.fmt)(decl)}.`));
  }
};
JobParser.prototype.parseMacro = function (decl, opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("opts", opts, ParseOpts);
  {
    return CatalogMacro(_core.dogma.clone(decl, {
      "name": decl.macro,
      "operator": MacroOperator(),
      "ops": opts.ops,
      "initializers": parseIni(decl),
      "finalizers": parseFin(decl)
    }, {}, [], []));
  }
};
JobParser.prototype.parseCo = function (decl, opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("opts", opts, ParseOpts);
  {
    return CatalogCo(_core.dogma.clone(decl, {
      "name": decl.co,
      "operator": CoOperator(),
      "ops": opts.ops
    }, {}, [], []));
  }
};
JobParser.prototype.parseScript = function (decl, opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("opts", opts, ParseOpts);
  {
    return Script(_core.dogma.clone(decl, {
      "name": decl.script,
      "operator": ScriptOperator()
    }, {}, [], []));
  }
};
function parseIni(decl) {
  /* c8 ignore next */_core.dogma.expect("decl", decl, _core.map);
  {
    var _decl$ini;
    return _core.dogma.is(decl.ini, _core.text) ? [decl.ini] : (_decl$ini = decl.ini) !== null && _decl$ini !== void 0 ? _decl$ini : [];
  }
}
function parseFin(decl) {
  /* c8 ignore next */_core.dogma.expect("decl", decl, _core.map);
  {
    var _decl$fin;
    return _core.dogma.is(decl.fin, _core.text) ? [decl.fin] : (_decl$fin = decl.fin) !== null && _decl$fin !== void 0 ? _decl$fin : [];
  }
}