"use strict";

var _core = require("@dogmalang/core");
const {
  CatalogMerger
} = _core.dogma.use(require("@akromio/catalog"));
const $StageCatalogMerger = class StageCatalogMerger extends CatalogMerger {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_7f2ffbe5099ea589417d8383d7ce3313___init__ instanceof Function) this._pvt_7f2ffbe5099ea589417d8383d7ce3313___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_7f2ffbe5099ea589417d8383d7ce3313___post__ instanceof Function) this._pvt_7f2ffbe5099ea589417d8383d7ce3313___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_7f2ffbe5099ea589417d8383d7ce3313___validate__ instanceof Function) this._pvt_7f2ffbe5099ea589417d8383d7ce3313___validate__(); /* c8 ignore stop */
  }
};

const StageCatalogMerger = new Proxy($StageCatalogMerger, {
  apply(receiver, self, args) {
    return new $StageCatalogMerger(...args);
  }
});
module.exports = exports = StageCatalogMerger;
StageCatalogMerger.prototype.isSpecializedField = function (name) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("name", name, _core.text);
  {
    return _core.dogma.includes(["stages"], name);
  }
};
StageCatalogMerger.prototype.mergeSpecialization = function (decl, extensions) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("extensions", extensions, _core.dogma.TypeDef({
    name: 'inline',
    types: [_core.map],
    min: 0,
    max: null
  }));
  {
    for (const ext of extensions) {
      if (_core.dogma.includes(ext, "stages")) {
        decl = this.mergeStages(ext.stages, decl);
      }
    }
  }
  return decl;
};
StageCatalogMerger.prototype.mergeStages = function (stages, decl) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("stages", stages, _core.dogma.TypeDef({
    name: 'inline',
    types: [_core.any],
    min: 0,
    max: null
  })); /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map);
  {
    var _decl$stages;
    decl.stages = (_decl$stages = decl.stages) !== null && _decl$stages !== void 0 ? _decl$stages : [];
    for (const stage of stages) {
      const stageName = getStageName(stage);
      const ix = decl.stages.findIndex(decl => {
        /* c8 ignore next */_core.dogma.expect("decl", decl);
        {
          return getStageName(decl) == stageName;
        }
      });
      if (ix >= 0) {
        decl.stages.splice(ix, 1);
      }
      decl.stages.push(stage);
    }
  }
  return decl;
};
function getStageName(decl) {
  /* c8 ignore next */_core.dogma.expect("decl", decl, _core.map);
  {
    var _decl$const;
    return (_decl$const = decl.const) !== null && _decl$const !== void 0 ? _decl$const : decl.sleep;
  }
}