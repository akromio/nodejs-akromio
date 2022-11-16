"use strict";

var _core = require("@dogmalang/core");
const Command = _core.dogma.use(require("./Command"));
const {
  Registries,
  RegistryBuilder,
  RegistryStringParser
} = _core.dogma.use(require("@akromio/registry"));
const path = _core.dogma.use(require("path"));
const $RegistryCommandBase = class RegistryCommandBase extends Command {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_77e7121b2723b76a33a2693f7e08d50e___init__ instanceof Function) this._pvt_77e7121b2723b76a33a2693f7e08d50e___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_77e7121b2723b76a33a2693f7e08d50e___post__ instanceof Function) this._pvt_77e7121b2723b76a33a2693f7e08d50e___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_77e7121b2723b76a33a2693f7e08d50e___validate__ instanceof Function) this._pvt_77e7121b2723b76a33a2693f7e08d50e___validate__(); /* c8 ignore stop */
  }
};

const RegistryCommandBase = new Proxy($RegistryCommandBase, {
  apply(receiver, self, args) {
    return new $RegistryCommandBase(...args);
  }
});
module.exports = exports = RegistryCommandBase;
Object.defineProperty(RegistryCommandBase, 'baseOptions', {
  value: {
    ["registries"]: {
      ["type"]: "string",
      ["alias"]: ["g"],
      ["desc"]: "The registries to use, separated by commas.",
      ["default"]: _core.ps.env.KRM_REGISTRIES
    }
  },
  writable: false,
  enumerable: true
});
RegistryCommandBase.prototype.createRegistries = function (opts) {
  const self = this;
  let registries; /* c8 ignore next */
  _core.dogma.expect("opts", opts, _core.map);
  {
    const {
      defaults
    } = this;
    const builder = RegistryBuilder();
    const parser = RegistryStringParser();
    const registriesToCreate = opts.registryAndCatalogName ? [_core.dogma.getItem(opts.registryAndCatalogName.split("://"), 0)] : opts.registries.split(",");
    registries = Registries();
    for (let decl of registriesToCreate) {
      {
        const _ = decl;
        switch (_) {
          case "local":
            {
              decl = "local=fs://" + path.join(_core.ps.workDir, _core.ps.env.KRM_DIR_NAME);
            } /* c8 ignore start */
            break;
          /* c8 ignore stop */
          case "localApm":
            {
              decl = "localApm=fs://" + path.join(_core.ps.workDir, _core.ps.env.KRM_DIR_NAME, _core.ps.env.KRM_APM_DIR_NAME);
            } /* c8 ignore start */
            break;
          /* c8 ignore stop */
          case "user":
            {
              decl = "user=fs://" + path.join(_core.ps.env.HOME, _core.ps.env.KRM_DIR_NAME);
            } /* c8 ignore start */
            break;
          /* c8 ignore stop */
          case "git":
            {
              decl = "git://" + _core.ps.env.KRM_REGISTRY_GIT_USER + "/" + _core.ps.env.KRM_REGISTRY_GIT_REPO + "/" + _core.ps.env.KRM_REGISTRY_GIT_BRANCH + "/" + _core.ps.env.KRM_REGISTRY_GIT_PREFIX;
            } /* c8 ignore start */
            break;
          /* c8 ignore stop */
          case "skynet":
            {
              decl = "skynet://" + _core.ps.env.KRM_REGISTRY_SKYNET_PORTAL + "/" + _core.ps.env.KRM_REGISTRY_SKYNET_SKYLINK;
            } /* c8 ignore start */
            break;
          /* c8 ignore stop */
          case "sns":
            {
              decl = "sns://" + _core.ps.env.KRM_REGISTRY_SNS_PORTAL + "/" + _core.ps.env.KRM_REGISTRY_SNS_NAME;
            } /* c8 ignore start */
            break;
          /* c8 ignore stop */
          case "http":
            {
              decl = "http://" + _core.ps.env.KRM_REGISTRY_HTTP_HOST;
              {
                const base = _core.ps.env.KRM_REGISTRY_HTTP_BASE;
                if (base) {
                  decl += (base.startsWith("/") ? "" : "/") + base;
                }
              }
            } /* c8 ignore start */
            break;
          /* c8 ignore stop */
        }
      }
      registries.appendRegistry(builder.create(parser.parse(decl, defaults)));
    }
  }
  return registries;
};
RegistryCommandBase.prototype.getRegistryItem = function (itemName, registries, registryName) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("itemName", itemName, _core.text); /* c8 ignore next */
  _core.dogma.expect("registries", registries); /* c8 ignore next */
  if (registryName != null) _core.dogma.expect("registryName", registryName, _core.text);
  {
    return registries.getItem(itemName, registry);
  }
};