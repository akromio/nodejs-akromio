"use strict";

var _core = require("@dogmalang/core");
const Plugin = _core.dogma.use(require("./Plugin"));
const StaticAction = _core.dogma.use(require("../ops/simple/action/StaticAction"));
const ActionOperator = _core.dogma.use(require("../ops/simple/action/ActionOperator"));
const actionOperator = ActionOperator();
const $PluginParser = class PluginParser {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_94444b76fb9b41ebc1af2312861ef934___init__ instanceof Function) this._pvt_94444b76fb9b41ebc1af2312861ef934___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_94444b76fb9b41ebc1af2312861ef934___post__ instanceof Function) this._pvt_94444b76fb9b41ebc1af2312861ef934___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_94444b76fb9b41ebc1af2312861ef934___validate__ instanceof Function) this._pvt_94444b76fb9b41ebc1af2312861ef934___validate__(); /* c8 ignore stop */
  }
};

const PluginParser = new Proxy($PluginParser, {
  apply(receiver, self, args) {
    return new $PluginParser(...args);
  }
});
module.exports = exports = PluginParser;
PluginParser.prototype.parsePlugin = async function (decl, iniArgs) {
  const self = this;
  let plugin; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  if (iniArgs != null) _core.dogma.expect("iniArgs", iniArgs, _core.any);
  {
    const name = decl.plugin;
    const initializer = decl.ini;
    const finalizer = decl.fin;
    plugin = Plugin(_core.dogma.clone(decl, {
      "name": name,
      "finalizer": finalizer
    }, {}, ["ops"], []));
    for (const [name, opDecl] of Object.entries(decl.ops)) {
      {
        if (initializer) {
          const fun = async (...args) => {
            {
              if (!plugin.initialized) {
                plugin.state = (0, await initializer(iniArgs));
                plugin.initialized = true;
              }
              return opDecl.fun(_core.dogma.clone(_core.dogma.getItem(args, 0), {
                "state": plugin.state
              }, {}, [], []), ..._core.dogma.getSlice(args, 1, -1));
            }
          };
          plugin.state = {};
          plugin.appendOp(StaticAction(_core.dogma.clone(opDecl, {
            "fun": fun,
            "name": name,
            "operator": actionOperator
          }, {}, [], [])));
        } else {
          plugin.appendOp(StaticAction(_core.dogma.clone(opDecl, {
            "name": name,
            "operator": actionOperator
          }, {}, [], [])));
        }
      }
    }
  }
  return plugin;
};
PluginParser.prototype.parsePreset = async function (preset) {
  const self = this;
  let plugins = []; /* c8 ignore next */
  _core.dogma.expect("preset", preset, _core.map);
  {
    for (const def of preset.plugins) {
      plugins.push((0, await this.parsePlugin(def.impl, def.iniArgs)));
    }
  }
  return plugins;
};