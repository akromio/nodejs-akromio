"use strict";

var _core = require("@dogmalang/core");
const {
  DatasetParser,
  Dataset
} = _core.dogma.use(require("@akromio/dataset"));
const {
  Plugin,
  Plugins,
  PluginParser,
  PluginLoader
} = _core.dogma.use(require("@akromio/core"));
const {
  Ops
} = _core.dogma.use(require("@akromio/core"));
const datasetParser = DatasetParser();
const $CatalogParser = class CatalogParser {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('pluginLoader', _['pluginLoader'], PluginLoader);
    Object.defineProperty(this, 'pluginLoader', {
      value: (0, _core.coalesce)(_['pluginLoader'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('pluginParser', _['pluginParser'], PluginParser);
    Object.defineProperty(this, 'pluginParser', {
      value: (0, _core.coalesce)(_['pluginParser'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
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
    var _decl$dataset, _decl$on, _decl$plugins;
    const dataset = this.parseDataset((_decl$dataset = decl.dataset) !== null && _decl$dataset !== void 0 ? _decl$dataset : [], _core.dogma.clone(opts, {
      "name": decl.name
    }, {}, [], []));
    const triggers = this.parseTriggers((_decl$on = decl.on) !== null && _decl$on !== void 0 ? _decl$on : [], dataset);
    const {
      ops
    } = opts;
    const pluginsDecl = dataset.eval((_decl$plugins = decl.plugins) !== null && _decl$plugins !== void 0 ? _decl$plugins : []);
    const plugins = (0, await this.parsePlugins(pluginsDecl));
    for (const pi of plugins.plugins) {
      /*c8 ignore next*/_core.dogma.expect('pi', pi, Plugin);
      ops.appendPlugin(pi);
    }
    const jobs = this.parseJobs(decl.jobs, opts);
    catalog = this.createCatalog(_core.dogma.clone(decl, {
      "dataset": dataset,
      "plugins": plugins,
      "jobs": jobs,
      "triggers": triggers
    }, {}, [], []));
  }
  return catalog;
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
CatalogParser.prototype.parsePlugins = async function (decl) {
  const self = this;
  let plugins; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.dogma.TypeDef({
    name: 'inline',
    types: [_core.map],
    min: 0,
    max: null
  }));
  {
    const loader = this.pluginLoader;
    const parser = this.pluginParser;
    plugins = Plugins();
    for (const def of decl) {
      if (_core.dogma.includes(def, "preset")) {
        const psDecl = loader.loadPreset(def.preset);
        for (const plugin of (0, await parser.parsePreset(psDecl))) {
          /*c8 ignore next*/_core.dogma.expect('plugin', plugin, Plugin);
          plugins.appendPlugin(plugin);
        }
      } else if (_core.dogma.includes(def, "plugin")) {
        var _def$name;
        const piDecl = loader.loadPlugin(def.impl);
        const name = (_def$name = def.name) !== null && _def$name !== void 0 ? _def$name : def.plugin;
        plugins.appendPlugin((0, await parser.parsePlugin(_core.dogma.clone(piDecl, {
          "plugin": name
        }, {}, [], []), def.ini)));
      } else {
        _core.dogma.raise(TypeError(`Unknown plugin declaration: ${(0, _core.fmt)(def)}.`));
      }
    }
  }
  return plugins;
};
CatalogParser.prototype.parseTriggers = function (decl, ds) {
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
CatalogParser.prototype.parseJobs = function (decl, opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.dogma.TypeDef({
    name: 'inline',
    types: [_core.map],
    min: 0,
    max: null
  })); /* c8 ignore next */
  _core.dogma.expect("opts", opts, ParseOpts);
  {
    return this.jobParser.parseJobs(decl, opts);
  }
};
const ParseOpts = _core.dogma.intf('ParseOpts', {
  parentDataset: {
    optional: false,
    type: Dataset
  },
  ops: {
    optional: false,
    type: Ops
  }
});