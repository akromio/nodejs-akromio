"use strict";

var _core = require("@dogmalang/core");
const $CatalogMerger = class CatalogMerger {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_9196f081df3581c4f1e462fcbf1fdbff___init__ instanceof Function) this._pvt_9196f081df3581c4f1e462fcbf1fdbff___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_9196f081df3581c4f1e462fcbf1fdbff___post__ instanceof Function) this._pvt_9196f081df3581c4f1e462fcbf1fdbff___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_9196f081df3581c4f1e462fcbf1fdbff___validate__ instanceof Function) this._pvt_9196f081df3581c4f1e462fcbf1fdbff___validate__(); /* c8 ignore stop */
  }
};

const CatalogMerger = new Proxy($CatalogMerger, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'CatalogMerger' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = CatalogMerger;
CatalogMerger.prototype.merge = function (extensor, ...extendeds) {
  const self = this;
  let decl = {}; /* c8 ignore next */
  _core.dogma.expect("extensor", extensor, _core.map);
  {
    decl = _core.dogma.copy(_core.dogma.getItem(extendeds, 0));
    decl = this.mergeCommon(decl, _core.dogma.getSlice(extendeds, 1, -1).concat(extensor));
    decl = this.mergeSpecialization(decl, _core.dogma.getSlice(extendeds, 1, -1).concat(extensor));
  }
  return decl;
};
CatalogMerger.prototype.mergeCommon = function (decl, extensions) {
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
      for (const [field, value] of Object.entries(ext)) {
        {
          if (field == "dataset") {
            this.mergeDataset(value, decl);
          } else if (!this.isSpecializedField(field)) {
            _core.dogma.setItem("=", decl, field, value);
          }
        }
      }
    }
  }
  return decl;
};
CatalogMerger.prototype.isSpecializedField = function (name) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("name", name, _core.text);
  {
    return false;
  }
};
CatalogMerger.prototype.mergeSpecialization = function (decl, extensions) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("extensions", extensions, _core.dogma.TypeDef({
    name: 'inline',
    types: [_core.map],
    min: 0,
    max: null
  }));
  {
    _core.dogma.nop();
  }
  return decl;
};
CatalogMerger.prototype.mergeDataset = function (dataset, decl) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("dataset", dataset, _core.dogma.TypeDef({
    name: 'inline',
    types: [_core.any],
    min: 0,
    max: null
  })); /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map);
  {
    var _decl$dataset;
    decl.dataset = (_decl$dataset = decl.dataset) !== null && _decl$dataset !== void 0 ? _decl$dataset : [];
    for (const datum of dataset) {
      const datumName = getDatumName(datum);
      const ix = decl.dataset.findIndex(decl => {
        /* c8 ignore next */_core.dogma.expect("decl", decl);
        {
          return getDatumName(decl) == datumName;
        }
      });
      if (ix >= 0) {
        decl.dataset.splice(ix, 1);
      }
      decl.dataset.push(datum);
    }
  }
  return decl;
};
function getDatumName(decl) {
  /* c8 ignore next */_core.dogma.expect("decl", decl, _core.map);
  {
    var _ref, _decl$var;
    return (_ref = (_decl$var = decl.var) !== null && _decl$var !== void 0 ? _decl$var : decl.const) !== null && _ref !== void 0 ? _ref : decl.fn;
  }
}