"use strict";

var _core = require("@dogmalang/core");
const {
  Ops
} = _core.dogma.use(require("@akromio/core"));
const {
  table,
  tableOpts
} = _core.dogma.use(require("../../helpers/table"));
const CatalogCommandBase = _core.dogma.use(require("../CatalogCommandBase"));
const {
  baseOptions
} = CatalogCommandBase;
const $CatalogCommand = class CatalogCommand extends CatalogCommandBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (_['name'] != null) (0, _core.expect)('name', _['name'], _core.list); /* c8 ignore stop */
    Object.defineProperty(this, 'name', {
      value: (0, _core.coalesce)(_['name'], ["show"]),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['desc'] != null) (0, _core.expect)('desc', _['desc'], _core.text); /* c8 ignore stop */
    Object.defineProperty(this, 'desc', {
      value: (0, _core.coalesce)(_['desc'], "Show a job catalog declaration."),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['hidden'] != null) (0, _core.expect)('hidden', _['hidden'], _core.bool); /* c8 ignore stop */
    Object.defineProperty(this, 'hidden', {
      value: (0, _core.coalesce)(_['hidden'], true),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['positionals'] != null) (0, _core.expect)('positionals', _['positionals'], _core.map); /* c8 ignore stop */
    Object.defineProperty(this, 'positionals', {
      value: (0, _core.coalesce)(_['positionals'], {}),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['options'] != null) (0, _core.expect)('options', _['options'], _core.map); /* c8 ignore stop */
    Object.defineProperty(this, 'options', {
      value: (0, _core.coalesce)(_['options'], {
        ["registries"]: baseOptions.registries,
        ["catalogName"]: baseOptions.catalogName,
        ["registryAndCatalogName"]: baseOptions.registryAndCatalogName
      }),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_49e9fe1bf00a696406c849e32f38ec7f___init__ instanceof Function) this._pvt_49e9fe1bf00a696406c849e32f38ec7f___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_49e9fe1bf00a696406c849e32f38ec7f___post__ instanceof Function) this._pvt_49e9fe1bf00a696406c849e32f38ec7f___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_49e9fe1bf00a696406c849e32f38ec7f___validate__ instanceof Function) this._pvt_49e9fe1bf00a696406c849e32f38ec7f___validate__(); /* c8 ignore stop */
  }
};

const CatalogCommand = new Proxy($CatalogCommand, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'CatalogCommand' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = CatalogCommand;
/* c8 ignore start */
CatalogCommand.prototype.createJobParser = function () {
  (0, _core.abstract)();
}; /* c8 ignore stop */
CatalogCommand.prototype.handle = async function (argv) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("argv", argv, _core.map);
  let {
    catalogName,
    registryAndCatalogName,
    all,
    tag,
    args,
    desc
  } = argv;
  {
    const registries = (0, await this.createRegistries(argv).connect());
    try {
      if (registryAndCatalogName) {
        catalogName = _core.dogma.getItem(registryAndCatalogName.split("://"), 1);
      }
      let decl;
      catalogName = this.buildCatalogPath(catalogName);
      decl = (0, await this.readCatalogDecl(catalogName, registries));
      if (!decl) {
        (0, _core.print)(`Job catalog '${catalogName}' not found in '${registries.registryNames}'.`);
        _core.ps.exit(1);
      }
      (0, _core.printf)(decl);
    } finally {
      0, await registries.disconnect();
    }
  }
};