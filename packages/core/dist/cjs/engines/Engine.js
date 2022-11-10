"use strict";

var _core = require("@dogmalang/core");
const {
  Dataset
} = _core.dogma.use(require("@akromio/dataset"));
const Ops = _core.dogma.use(require("../ops/Ops"));
const NotFoundError = _core.dogma.use(require("../errors/NotFoundError"));
const PluginParser = _core.dogma.use(require("../plugins/PluginParser"));
const $Engine = class Engine {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('dataset', _['dataset'], Dataset);
    Object.defineProperty(this, 'dataset', {
      value: (0, _core.coalesce)(_['dataset'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('onError', _['onError'], ["carryOn", "finish"]);
    Object.defineProperty(this, 'onError', {
      value: (0, _core.coalesce)(_['onError'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['ops'] != null) (0, _core.expect)('ops', _['ops'], Ops); /* c8 ignore stop */
    Object.defineProperty(this, 'ops', {
      value: (0, _core.coalesce)(_['ops'], Ops()),
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
    if (this._pvt_312ecd3bdf8fd2dc7de9f66e1ab3333e___init__ instanceof Function) this._pvt_312ecd3bdf8fd2dc7de9f66e1ab3333e___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_312ecd3bdf8fd2dc7de9f66e1ab3333e___post__ instanceof Function) this._pvt_312ecd3bdf8fd2dc7de9f66e1ab3333e___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_312ecd3bdf8fd2dc7de9f66e1ab3333e___validate__ instanceof Function) this._pvt_312ecd3bdf8fd2dc7de9f66e1ab3333e___validate__(); /* c8 ignore stop */
  }
};

const Engine = new Proxy($Engine, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'Engine' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = Engine;
Engine.prototype.getBuiltInPresets = function () {
  const self = this;
  {
    return [];
  }
};
Engine.prototype.loadBuiltInPlugins = async function () {
  const self = this;
  {
    const {
      ops
    } = this;
    const parser = this.pluginParser;
    for (const preset of this.getBuiltInPresets()) {
      const plugins = (0, await parser.parsePreset(preset));
      ops.appendPlugins(...plugins);
    }
  }
  return this;
};
Engine.prototype.run = function (opName, args, opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("opName", opName, _core.text); /* c8 ignore next */
  if (args != null) _core.dogma.expect("args", args, _core.any); /* c8 ignore next */
  if (opts != null) _core.dogma.expect("opts", opts, RunOpts);
  {
    var _opts, _opts$onError;
    const op = this.ops.getOp(opName, {
      'raiseIfNotFound': true
    });
    opts = (_opts = opts) !== null && _opts !== void 0 ? _opts : {};
    opts.onError = (_opts$onError = opts.onError) !== null && _opts$onError !== void 0 ? _opts$onError : this.onError;
    return this.runOp(op, args, _core.dogma.clone(opts, {
      "dataset": this.dataset
    }, {}, [], []));
  }
};
/* c8 ignore start */
Engine.prototype.runOp = function () {
  (0, _core.abstract)();
}; /* c8 ignore stop */
const RunOpts = _core.dogma.intf('RunOpts', {
  onError: {
    optional: false,
    type: ["carryOn", "finish"]
  }
});