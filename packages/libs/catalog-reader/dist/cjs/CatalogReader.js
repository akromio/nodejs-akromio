"use strict";

var _core = require("@dogmalang/core");
const path = _core.dogma.use(require("path"));
const yaml = _core.dogma.use(require("yaml"));
const {
  Registries
} = _core.dogma.use(require("@akromio/registry"));
const extensions = [".yaml", ".yml", ".json"];
const $CatalogReader = class CatalogReader {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
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
CatalogReader.prototype.readCatalogDecl = async function (catalogName, registries, registryName) {
  const self = this;
  let decl = {}; /* c8 ignore next */
  _core.dogma.expect("catalogName", catalogName, _core.text); /* c8 ignore next */
  _core.dogma.expect("registries", registries, Registries); /* c8 ignore next */
  if (registryName != null) _core.dogma.expect("registryName", registryName, _core.text);
  {
    const uriPattern = (0, _core.re)("^(.+):\\/\\/(.+)$");
    if (uriPattern.test(catalogName)) {
      [, registryName, catalogName] = _core.dogma.getArrayToUnpack(uriPattern.exec(catalogName), 3);
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
      catalogName = path.join(basePath, catalogName);
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