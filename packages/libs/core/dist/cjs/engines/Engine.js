"use strict";

var _core = require("@dogmalang/core");
const {
  Dataset
} = _core.dogma.use(require("@akromio/dataset"));
const RunOpts = _core.dogma.use(require("./RunOpts"));
const CallReq = _core.dogma.use(require("../CallReq"));
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
Engine.prototype.getOpOf = function (req) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("req", req, CallReq);
  {
    return this.ops.getOp(req.jobName, {
      'raiseIfNotFound': true
    });
  }
};
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