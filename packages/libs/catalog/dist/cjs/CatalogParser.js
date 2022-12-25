"use strict";

var _core = require("@dogmalang/core");
const {
  DatasetParser,
  Dataset
} = _core.dogma.use(require("@akromio/dataset"));
const datasetParser = DatasetParser();
const ParseOpts = _core.dogma.intf('ParseOpts', {
  parentDataset: {
    optional: false,
    type: Dataset
  }
});
const $CatalogParser = class CatalogParser {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_9b16b136dd8130527796b0661b87bc48___init__ instanceof Function) this._pvt_9b16b136dd8130527796b0661b87bc48___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_9b16b136dd8130527796b0661b87bc48___post__ instanceof Function) this._pvt_9b16b136dd8130527796b0661b87bc48___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_9b16b136dd8130527796b0661b87bc48___validate__ instanceof Function) this._pvt_9b16b136dd8130527796b0661b87bc48___validate__(); /* c8 ignore stop */
  }
};

const CatalogParser = new Proxy($CatalogParser, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'CatalogParser' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = CatalogParser;
/* c8 ignore start */
CatalogParser.prototype.createCatalog = function () {
  (0, _core.abstract)();
}; /* c8 ignore stop */
CatalogParser.prototype.parse = async function (decl, opts) {
  const self = this;
  let catalog; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("opts", opts, ParseOpts);
  {
    decl = this.parseCommon(decl, opts);
    decl = (0, await this.parseSpecific(decl, opts));
    catalog = this.createCatalog(decl);
  }
  return catalog;
};
CatalogParser.prototype.parseCommon = function (decl, opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("opts", opts, ParseOpts);
  {
    var _decl$dataset;
    {
      const spec = decl.spec;
      if (spec != "v1.0") {
        _core.dogma.raise(TypeError(`spec must be v1.0. Got: ${spec}.`));
      }
    }
    const dataset = this.parseDataset((_decl$dataset = decl.dataset) !== null && _decl$dataset !== void 0 ? _decl$dataset : [], _core.dogma.clone(opts, {
      "name": "catalog"
    }, {}, [], []));
    return _core.dogma.clone(decl, {
      "dataset": dataset
    }, {}, [], []);
  }
};
CatalogParser.prototype.parseDataset = function (decl, opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.dogma.TypeDef({
    name: 'inline',
    types: [_core.map],
    min: 0,
    max: null
  })); /* c8 ignore next */
  _core.dogma.expect("opts", opts, _core.map);
  {
    return datasetParser.parse(decl, {
      'name': opts.name,
      'parent': opts.parentDataset
    });
  }
};
CatalogParser.prototype.parseSpecific = async function (decl, opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("opts", opts, ParseOpts);
  {
    return decl;
  }
};