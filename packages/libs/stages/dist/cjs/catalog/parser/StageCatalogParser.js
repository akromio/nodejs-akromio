"use strict";

var _core = require("@dogmalang/core");
const {
  Dataset
} = _core.dogma.use(require("@akromio/dataset"));
const {
  CatalogParser,
  CatalogParseOpts
} = _core.dogma.use(require("@akromio/catalog"));
const StageCatalog = _core.dogma.use(require("../StageCatalog"));
const StageParser = _core.dogma.use(require("../../stages/StageParser"));
const stageParser = StageParser();
const StageCatalogParseOpts = _core.dogma.intf('StageCatalogParseOpts', {
  parentDataset: {
    optional: false,
    type: Dataset
  }
}, CatalogParseOpts);
const $StageCatalogParser = class StageCatalogParser extends CatalogParser {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_69aa687001198ce51cdbead6fa9f8f36___init__ instanceof Function) this._pvt_69aa687001198ce51cdbead6fa9f8f36___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_69aa687001198ce51cdbead6fa9f8f36___post__ instanceof Function) this._pvt_69aa687001198ce51cdbead6fa9f8f36___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_69aa687001198ce51cdbead6fa9f8f36___validate__ instanceof Function) this._pvt_69aa687001198ce51cdbead6fa9f8f36___validate__(); /* c8 ignore stop */
  }
};

const StageCatalogParser = new Proxy($StageCatalogParser, {
  apply(receiver, self, args) {
    return new $StageCatalogParser(...args);
  }
});
module.exports = exports = StageCatalogParser;
StageCatalogParser.prototype.createCatalog = function (decl) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map);
  {
    return StageCatalog(decl);
  }
};
StageCatalogParser.prototype.parseSpecialization = function (decl, opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("opts", opts, StageCatalogParseOpts);
  {
    const stages = this.parseStages(decl.stages, opts);
    _core.dogma.update(decl, {
      name: "stages",
      visib: ".",
      assign: "=",
      value: stages
    });
  }
  return decl;
};
StageCatalogParser.prototype.parseStages = function (decl, opts) {
  const self = this;
  let stages = {}; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.dogma.TypeDef({
    name: 'inline',
    types: [_core.map],
    min: 0,
    max: null
  })); /* c8 ignore next */
  _core.dogma.expect("opts", opts, StageCatalogParseOpts);
  {
    for (const stageDecl of decl) {
      for (const [name, stage] of Object.entries(stageParser.parse(stageDecl, opts))) {
        {
          _core.dogma.setItem("=", stages, name, stage);
        }
      }
    }
  }
  return stages;
};