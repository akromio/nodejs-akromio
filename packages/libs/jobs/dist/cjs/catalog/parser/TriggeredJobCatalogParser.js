"use strict";

var _core = require("@dogmalang/core");
const {
  Dataset
} = _core.dogma.use(require("@akromio/dataset"));
const TriggeredJobCatalog = _core.dogma.use(require("../TriggeredJobCatalog"));
const JobCatalogParser = _core.dogma.use(require("./JobCatalogParser"));
const JobCatalogParseOpts = _core.dogma.use(require("./JobCatalogParseOpts"));
const $TriggeredJobCatalogParser = class TriggeredJobCatalogParser extends JobCatalogParser {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_1afe612b0f9d0c3cab4f76f46cbd574d___init__ instanceof Function) this._pvt_1afe612b0f9d0c3cab4f76f46cbd574d___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_1afe612b0f9d0c3cab4f76f46cbd574d___post__ instanceof Function) this._pvt_1afe612b0f9d0c3cab4f76f46cbd574d___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_1afe612b0f9d0c3cab4f76f46cbd574d___validate__ instanceof Function) this._pvt_1afe612b0f9d0c3cab4f76f46cbd574d___validate__(); /* c8 ignore stop */
  }
};

const TriggeredJobCatalogParser = new Proxy($TriggeredJobCatalogParser, {
  apply(receiver, self, args) {
    return new $TriggeredJobCatalogParser(...args);
  }
});
module.exports = exports = TriggeredJobCatalogParser;
TriggeredJobCatalogParser.prototype.createCatalog = function (decl) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map);
  {
    return TriggeredJobCatalog(decl);
  }
};
TriggeredJobCatalogParser.prototype.parseSpecialization = async function (decl, opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("opts", opts, JobCatalogParseOpts);
  {
    const {
      dataset
    } = decl;
    const triggers = this.parseTriggers(decl.on, dataset);
    decl = _core.dogma.super(this, "parseSpecialization")(_core.dogma.update(decl, {
      name: "triggers",
      visib: ".",
      assign: "=",
      value: triggers
    }), opts);
  }
  return decl;
};
TriggeredJobCatalogParser.prototype.parseTriggers = function (decl, ds) {
  const self = this;
  let triggers = {}; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.dogma.TypeDef({
    name: 'inline',
    types: [_core.map],
    min: 0,
    max: null
  })); /* c8 ignore next */
  _core.dogma.expect("ds", ds, Dataset);
  {
    for (const trgDecl of ds.eval(decl)) {
      _core.dogma.setItem("=", triggers, trgDecl.trigger, trgDecl);
    }
  }
  return triggers;
};