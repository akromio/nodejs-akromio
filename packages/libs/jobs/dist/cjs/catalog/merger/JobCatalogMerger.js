"use strict";

var _core = require("@dogmalang/core");
const {
  CatalogMerger
} = _core.dogma.use(require("@akromio/catalog"));
const $JobCatalogMerger = class JobCatalogMerger extends CatalogMerger {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_8d59d432ced12270942a7dec5d5c4c18___init__ instanceof Function) this._pvt_8d59d432ced12270942a7dec5d5c4c18___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_8d59d432ced12270942a7dec5d5c4c18___post__ instanceof Function) this._pvt_8d59d432ced12270942a7dec5d5c4c18___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_8d59d432ced12270942a7dec5d5c4c18___validate__ instanceof Function) this._pvt_8d59d432ced12270942a7dec5d5c4c18___validate__(); /* c8 ignore stop */
  }
};

const JobCatalogMerger = new Proxy($JobCatalogMerger, {
  apply(receiver, self, args) {
    return new $JobCatalogMerger(...args);
  }
});
module.exports = exports = JobCatalogMerger;
JobCatalogMerger.prototype.isSpecializedField = function (name) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("name", name, _core.text);
  {
    return _core.dogma.includes(["plugins", "jobs"], name);
  }
};
JobCatalogMerger.prototype.mergeSpecialization = function (decl, extensions) {
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
      if (_core.dogma.includes(ext, "plugins")) {
        decl = this.mergePlugins(ext.plugins, decl);
      }
      if (_core.dogma.includes(ext, "jobs")) {
        decl = this.mergeJobs(ext.jobs, decl);
      }
    }
  }
  return decl;
};
JobCatalogMerger.prototype.mergePlugins = function (pis, decl) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("pis", pis, _core.dogma.TypeDef({
    name: 'inline',
    types: [_core.any],
    min: 0,
    max: null
  })); /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map);
  {
    var _decl$plugins;
    decl.plugins = (_decl$plugins = decl.plugins) !== null && _decl$plugins !== void 0 ? _decl$plugins : [];
    for (const pi of pis) {
      const piName = getPluginName(pi);
      const ix = decl.plugins.findIndex(decl => {
        /* c8 ignore next */_core.dogma.expect("decl", decl);
        {
          return getPluginName(decl) == piName;
        }
      });
      if (ix >= 0) {
        decl.plugins.splice(ix, 1);
      }
      decl.plugins.push(pi);
    }
  }
  return decl;
};
JobCatalogMerger.prototype.mergeJobs = function (jobs, decl) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("jobs", jobs, _core.dogma.TypeDef({
    name: 'inline',
    types: [_core.any],
    min: 0,
    max: null
  })); /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map);
  {
    var _decl$jobs;
    decl.jobs = (_decl$jobs = decl.jobs) !== null && _decl$jobs !== void 0 ? _decl$jobs : [];
    for (const job of jobs) {
      const jobName = getJobName(job);
      const ix = decl.jobs.findIndex(decl => {
        /* c8 ignore next */_core.dogma.expect("decl", decl);
        {
          return getJobName(decl) == jobName;
        }
      });
      if (ix >= 0) {
        decl.jobs.splice(ix, 1);
      }
      decl.jobs.push(job);
    }
  }
  return decl;
};
function getPluginName(decl) {
  /* c8 ignore next */_core.dogma.expect("decl", decl, _core.map);
  {
    return decl.plugin;
  }
}
function getJobName(decl) {
  /* c8 ignore next */_core.dogma.expect("decl", decl, _core.map);
  {
    var _decl$macro;
    return (_decl$macro = decl.macro) !== null && _decl$macro !== void 0 ? _decl$macro : decl.co;
  }
}