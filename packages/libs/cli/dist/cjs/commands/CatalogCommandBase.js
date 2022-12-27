"use strict";

var _core = require("@dogmalang/core");
const path = _core.dogma.use(require("path"));
const {
  Registries
} = _core.dogma.use(require("@akromio/registry"));
const RegistryCommandBase = _core.dogma.use(require("./RegistryCommandBase"));
const {
  baseOptions
} = RegistryCommandBase;
const $CatalogCommandBase = class CatalogCommandBase extends RegistryCommandBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (_['registries'] != null) (0, _core.expect)('registries', _['registries'], Registries); /* c8 ignore stop */
    Object.defineProperty(this, 'registries', {
      value: (0, _core.coalesce)(_['registries'], null),
      writable: true,
      enumerable: false
    });
    /* c8 ignore start */
    if (this._pvt_c7457c525d6641c2f2c80d67fbde201c___init__ instanceof Function) this._pvt_c7457c525d6641c2f2c80d67fbde201c___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_c7457c525d6641c2f2c80d67fbde201c___post__ instanceof Function) this._pvt_c7457c525d6641c2f2c80d67fbde201c___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_c7457c525d6641c2f2c80d67fbde201c___validate__ instanceof Function) this._pvt_c7457c525d6641c2f2c80d67fbde201c___validate__(); /* c8 ignore stop */
  }
};

const CatalogCommandBase = new Proxy($CatalogCommandBase, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'CatalogCommandBase' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = CatalogCommandBase;
Object.defineProperty(CatalogCommandBase, 'baseOptions', {
  value: _core.dogma.clone(baseOptions, {
    "catalogName": {
      ["type"]: "string",
      ["alias"]: ["c", "catalog"],
      ["desc"]: "The catalog to use: catalogName or registryName://catalogName.",
      ["default"]: _core.ps.env.KRM_CATALOG_NAME
    },
    "registryAndCatalogName": {
      ["type"]: "string",
      ["alias"]: ["C"],
      ["desc"]: "Register a built-in registry and set its catalog to use: registry://catalogName."
    },
    "arg": {
      ["type"]: "array",
      ["alias"]: ["a", "args"],
      ["desc"]: "An argument (if name=value) or an arguments file path. Available using $(args.name).",
      ["default"]: []
    }
  }, {}, [], []),
  writable: false,
  enumerable: true
});
/* c8 ignore start */
CatalogCommandBase.prototype.createCatalogReader = function () {
  (0, _core.abstract)();
}; /* c8 ignore stop */
CatalogCommandBase.prototype.readCatalogDecl = async function (catalogName, registries, registryName) {
  const self = this;
  {
    const reader = this.createCatalogReader();
    return 0, await reader.readCatalogDecl(catalogName, registries, registryName);
  }
};
CatalogCommandBase.prototype.buildCatalogPath = function (catalogPath) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("catalogPath", catalogPath, _core.text);
  {
    if (!catalogPath.startsWith("/")) {
      catalogPath = path.join("/", _core.ps.env.KRM_CATALOGS_PATH, catalogPath);
    }
  }
  return catalogPath;
};