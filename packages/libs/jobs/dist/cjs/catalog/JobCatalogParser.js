"use strict";

var _core = require("@dogmalang/core");
const {
  Dataset
} = _core.dogma.use(require("@akromio/dataset"));
const {
  Ops,
  CatalogParser,
  CatalogParseOpts
} = _core.dogma.use(require("@akromio/catalog"));
const {
  Plugin,
  Plugins,
  PluginParser,
  PluginLoader
} = _core.dogma.use(require("@akromio/core"));
const JobCatalog = _core.dogma.use(require("./JobCatalog"));
const JobParser = _core.dogma.use(require("./JobParser"));
const jobParser = JobParser();
const JobCatalogParseOpts = _core.dogma.intf('JobCatalogParseOpts', {
  parentDataset: {
    optional: false,
    type: Dataset
  },
  ops: {
    optional: false,
    type: Ops
  }
}, CatalogParseOpts);
const $JobCatalogParser = class JobCatalogParser extends CatalogParser {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
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
    if (this._pvt_9eb134306e7270ca5efb424f4db58c7e___init__ instanceof Function) this._pvt_9eb134306e7270ca5efb424f4db58c7e___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_9eb134306e7270ca5efb424f4db58c7e___post__ instanceof Function) this._pvt_9eb134306e7270ca5efb424f4db58c7e___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_9eb134306e7270ca5efb424f4db58c7e___validate__ instanceof Function) this._pvt_9eb134306e7270ca5efb424f4db58c7e___validate__(); /* c8 ignore stop */
  }
};

const JobCatalogParser = new Proxy($JobCatalogParser, {
  apply(receiver, self, args) {
    return new $JobCatalogParser(...args);
  }
});
module.exports = exports = JobCatalogParser;
JobCatalogParser.prototype.createCatalog = function (decl) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map);
  {
    return JobCatalog(decl);
  }
};
JobCatalogParser.prototype.parseSpecific = async function (decl, opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("opts", opts, JobCatalogParseOpts);
  {
    var _decl$on, _decl$plugins;
    const {
      dataset
    } = decl;
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
    _core.dogma.update(decl, {
      name: "plugins",
      visib: ".",
      assign: "=",
      value: plugins
    }, {
      name: "jobs",
      visib: ".",
      assign: "=",
      value: jobs
    }, {
      name: "triggers",
      visib: ".",
      assign: "=",
      value: triggers
    });
  }
  return decl;
};
JobCatalogParser.prototype.parsePlugins = async function (decl) {
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
JobCatalogParser.prototype.parseTriggers = function (decl, ds) {
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
JobCatalogParser.prototype.parseJobs = function (decl, opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.dogma.TypeDef({
    name: 'inline',
    types: [_core.map],
    min: 0,
    max: null
  })); /* c8 ignore next */
  _core.dogma.expect("opts", opts, JobCatalogParseOpts);
  {
    return jobParser.parse(decl, opts);
  }
};