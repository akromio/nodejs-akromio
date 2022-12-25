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
    for (const ext of _core.dogma.getSlice(extendeds, 1, -1).concat(extensor)) {
      for (const [field, value] of Object.entries(ext)) {
        {
          {
            const _ = field;
            switch (_) {
              case "dataset":
                {
                  this.mergeDataset(value, decl);
                } /* c8 ignore start */
                break;
              /* c8 ignore stop */
              case "plugins":
                {
                  this.mergePlugins(value, decl);
                } /* c8 ignore start */
                break;
              /* c8 ignore stop */
              case "jobs":
                {
                  this.mergeJobs(value, decl);
                } /* c8 ignore start */
                break;
              /* c8 ignore stop */
              default:
                {
                  _core.dogma.setItem("=", decl, field, value);
                }
            }
          }
        }
      }
    }
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
CatalogMerger.prototype.mergePlugins = function (pis, decl) {
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
CatalogMerger.prototype.mergeJobs = function (jobs, decl) {
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
function getDatumName(decl) {
  /* c8 ignore next */_core.dogma.expect("decl", decl, _core.map);
  {
    var _ref, _decl$var;
    return (_ref = (_decl$var = decl.var) !== null && _decl$var !== void 0 ? _decl$var : decl.const) !== null && _ref !== void 0 ? _ref : decl.fn;
  }
}
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