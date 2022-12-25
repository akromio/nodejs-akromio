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
const ConstStageParser = _core.dogma.use(require("../../stages/ConstStageParser"));
const SleepStageParser = _core.dogma.use(require("../../stages/SleepStageParser"));
const constStageParser = ConstStageParser();
const sleepStageParser = SleepStageParser();
const StageCatalogParseOpts = CatalogParseOpts;
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
StageCatalogParser.prototype.parseSpecific = function (decl, opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("opts", opts, StageCatalogParseOpts);
  {
    return _core.dogma.clone(decl, {
      "stages": this.parseStages(decl.stages, decl.dataset)
    }, {}, [], []);
  }
};
StageCatalogParser.prototype.parseStages = function (decl, dataset) {
  const self = this;
  let stages = {}; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.dogma.TypeDef({
    name: 'inline',
    types: [_core.map],
    min: 0,
    max: null
  })); /* c8 ignore next */
  _core.dogma.expect("dataset", dataset, Dataset);
  {
    for (let stage of decl) {
      {
        const i = stage.impl;
        switch (i) {
          case "const":
            {
              stage = constStageParser.parse(stage, dataset);
            } /* c8 ignore start */
            break;
          /* c8 ignore stop */
          case "sleep":
            {
              stage = sleepStageParser.parse(stage, dataset);
            } /* c8 ignore start */
            break;
          /* c8 ignore stop */
          default:
            {
              _core.dogma.raise(TypeError(`Unknown stage impl: ${i}.`));
            }
        }
      }
      _core.dogma.setItem("=", stages, stage.stage, stage);
    }
  }
  return stages;
};