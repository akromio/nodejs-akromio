"use strict";

var _core = require("@dogmalang/core");
const {
  StageCatalogParser: CatalogParser
} = _core.dogma.use(require("@akromio/stages"));
const CatalogReader = _core.dogma.use(require("../catalog/CatalogReader"));
const $_StageCommand = class _StageCommand {
  /* c8 ignore start */
  constructor() {
    this._constructor(...arguments);
  }

  /* c8 ignore stop */
  _constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    Object.defineProperty(this, 'defaults', {
      value: (0, _core.coalesce)(_['defaults'], {
        ["git"]: {
          ["host"]: _core.ps.env.KRM_REGISTRY_GIT_HOST,
          ["user"]: _core.ps.env.KRM_REGISTRY_GIT_USER,
          ["repo"]: _core.ps.env.KRM_REGISTRY_GIT_REPO,
          ["branch"]: _core.ps.env.KRM_REGISTRY_GIT_BRANCH,
          ["prefix"]: _core.ps.env.KRM_REGISTRY_GIT_PREFIX
        },
        ["http"]: {
          ["host"]: _core.ps.env.KRM_REGISTRY_HTTP_HOST,
          ["base"]: _core.ps.env.KRM_REGISTRY_HTTP_BASE
        },
        ["skynet"]: {
          ["portal"]: _core.ps.env.KRM_REGISTRY_SKYNET_PORTAL,
          ["skylink"]: _core.ps.env.KRM_REGISTRY_SKYNET_SKYLINK
        },
        ["sns"]: {
          ["portal"]: _core.ps.env.KRM_REGISTRY_SNS_PORTAL,
          ["name"]: _core.ps.env.KRM_REGISTRY_SNS_NAME,
          ["publicKey"]: _core.ps.env.KRM_REGISTRY_SNS_PUBLIC_KEY
        }
      }),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_b0adcd00da6aaff41b3f671b249239da___init__ instanceof Function) this._pvt_b0adcd00da6aaff41b3f671b249239da___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_b0adcd00da6aaff41b3f671b249239da___post__ instanceof Function) this._pvt_b0adcd00da6aaff41b3f671b249239da___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_b0adcd00da6aaff41b3f671b249239da___validate__ instanceof Function) this._pvt_b0adcd00da6aaff41b3f671b249239da___validate__(); /* c8 ignore stop */
  }
};

const _StageCommand = new Proxy($_StageCommand, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'_StageCommand' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = _StageCommand;
_StageCommand.prototype.createCatalogReader = function () {
  const self = this;
  {
    return CatalogReader({
      'akromioDirName': _core.ps.env.KRM_DIR_NAME,
      'akromioCatalogsPath': _core.ps.env.KRM_STAGE_CATALOGS_PATH
    });
  }
};
_StageCommand.prototype.createCatalogParser = function (opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("opts", opts, _core.map);
  {
    return CatalogParser(opts);
  }
};