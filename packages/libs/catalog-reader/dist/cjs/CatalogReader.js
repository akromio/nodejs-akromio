"use strict";

var _core = require("@dogmalang/core");
const path = _core.dogma.use(require("path"));
const yaml = _core.dogma.use(require("yaml"));
const {
  Registries,
  Registry,
  FsConnector
} = _core.dogma.use(require("@akromio/registry"));
const DirSearcher = _core.dogma.use(require("./DirSearcher"));
const extensions = [".yaml", ".yml", ".json"];
const dirSearcher = DirSearcher();
const $CatalogReader = class CatalogReader {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('akromioDirName', _['akromioDirName'], _core.text);
    Object.defineProperty(this, 'akromioDirName', {
      value: (0, _core.coalesce)(_['akromioDirName'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('akromioJobCatalogsPath', _['akromioJobCatalogsPath'], _core.text);
    Object.defineProperty(this, 'akromioJobCatalogsPath', {
      value: (0, _core.coalesce)(_['akromioJobCatalogsPath'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_54ef1e7c694e4638c557ca3f6fc5aa09___init__ instanceof Function) this._pvt_54ef1e7c694e4638c557ca3f6fc5aa09___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_54ef1e7c694e4638c557ca3f6fc5aa09___post__ instanceof Function) this._pvt_54ef1e7c694e4638c557ca3f6fc5aa09___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_54ef1e7c694e4638c557ca3f6fc5aa09___validate__ instanceof Function) this._pvt_54ef1e7c694e4638c557ca3f6fc5aa09___validate__(); /* c8 ignore stop */
  }
};

const CatalogReader = new Proxy($CatalogReader, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'CatalogReader' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = CatalogReader;
CatalogReader.prototype.searchBaseRegistry = async function () {
  const self = this;
  let base;
  {
    const {
      akromioDirName,
      akromioJobCatalogsPath
    } = this;
    {
      let basePath = (0, await dirSearcher.searchDirWith(akromioDirName));
      if (basePath) {
        basePath = path.join(basePath, akromioDirName, akromioJobCatalogsPath);
        base = Registry({
          'name': "base",
          'client': FsConnector({
            'basePath': basePath
          })
        });
      }
    }
  }
  return base;
};
CatalogReader.prototype.decomposeCatalogName = function (catalogName, defaultRegistryName) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("catalogName", catalogName, _core.text); /* c8 ignore next */
  if (defaultRegistryName != null) _core.dogma.expect("defaultRegistryName", defaultRegistryName, _core.text);
  {
    const uriPattern = (0, _core.re)("^(.+):\\/\\/(.+)$");
    let registryName;
    if (uriPattern.test(catalogName)) {
      [, registryName, catalogName] = _core.dogma.getArrayToUnpack(uriPattern.exec(catalogName), 3);
      if (registryName) {
        catalogName = "/" + catalogName;
      }
    }
    return {
      ["registryName"]: registryName || defaultRegistryName,
      ["catalogName"]: catalogName
    };
  }
};
CatalogReader.prototype.readCatalogDecl = async function (catalogName, registries, registryName) {
  const self = this;
  let decl = {}; /* c8 ignore next */
  _core.dogma.expect("catalogName", catalogName, _core.text); /* c8 ignore next */
  _core.dogma.expect("registries", registries, Registries); /* c8 ignore next */
  if (registryName != null) _core.dogma.expect("registryName", registryName, _core.text);
  {
    ({
      registryName: registryName,
      catalogName: catalogName
    } = this.decomposeCatalogName(catalogName, registryName));
    if (registryName == "base" && !registries.getRegistry("base")) {
      {
        const base = (0, await this.searchBaseRegistry("base"));
        if (base) {
          0, await base.connect();
          registries.appendRegistry(base, {
            'force': true
          });
        } else {
          _core.dogma.raise(Error("base registry not found."));
        }
      }
    }
    let item;
    if (path.extname(catalogName)) {
      item = (0, await registries.getItem(catalogName, {
        'registryName': registryName
      }));
    } else {
      for (const ext of extensions) {
        const itemPath = catalogName + ext;
        if (item = (0, await registries.getItem(itemPath, {
          'registryName': registryName
        }))) {
          break;
        }
      }
    }
    if (decl = item != null ? item.value : null) {
      if (_core.dogma.is(decl, Buffer)) {
        decl = (0, _core.text)(decl);
      }
      if (_core.dogma.is(decl, _core.text)) {
        {
          const cty = item.cty;
          switch (cty) {
            case "text/yaml":
              {
                decl = yaml.parse(decl);
              } /* c8 ignore start */
              break;
            /* c8 ignore stop */
            case "application/json":
              {
                decl = _core.json.decode(decl);
              } /* c8 ignore start */
              break;
            /* c8 ignore stop */
            default:
              {
                _core.dogma.raise(TypeError(`Invalid content-type for catalog: ${cty}.`));
              }
          }
        }
      }
    }
    if (decl) {
      _core.dogma.update(decl, {
        name: "registryName",
        visib: ".",
        assign: "=",
        value: item.registryName
      }, {
        name: "name",
        visib: ".",
        assign: "=",
        value: catalogName
      }, {
        name: "loc",
        visib: ".",
        assign: "=",
        value: item.uri
      }, {
        name: "cty",
        visib: ".",
        assign: "=",
        value: item.cty
      });
    }
    if (_core.dogma.includes(decl, "extends")) {
      decl = (0, await this.extendCatalogDecl(decl, registries));
    }
  }
  return decl;
};
CatalogReader.prototype.extendCatalogDecl = async function (decl, registries) {
  const self = this;
  {
    let catalogNames = (0, _core.list)(decl.extends);
    const {
      registryName
    } = decl;
    const basePath = path.dirname(decl.name);
    let extend = [];
    for (let catalogName of catalogNames) {
      if (!_core.dogma.includes(catalogName, "://")) {
        catalogName = path.join(basePath, catalogName);
      }
      {
        const baseDecl = (0, await this.readCatalogDecl(catalogName, registries, registryName));
        if (baseDecl) {
          extend.push(baseDecl);
        } else {
          _core.dogma.raise(Error(`Catalog to extend not found: ${catalogName}.`));
        }
      }
    }
    decl = this.merger.merge(decl, ...extend);
  }
  return decl;
};