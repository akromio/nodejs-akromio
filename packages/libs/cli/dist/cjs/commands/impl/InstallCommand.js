"use strict";

var _core = require("@dogmalang/core");
const util = _core.dogma.use(require("util"));
const cp = _core.dogma.use(require("child_process"));
const {
  Ops,
  buildPluginPackageName,
  PluginParser,
  PluginLoader
} = _core.dogma.use(require("@akromio/core"));
const CatalogCommandBase = _core.dogma.use(require("../CatalogCommandBase"));
const exec = util.promisify(cp.exec);
const {
  baseOptions
} = CatalogCommandBase;
const $InstallCommand = class InstallCommand extends CatalogCommandBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    Object.defineProperty(this, 'name', {
      value: (0, _core.coalesce)(_['name'], ["install", "i"]),
      writable: false,
      enumerable: true
    });
    Object.defineProperty(this, 'desc', {
      value: (0, _core.coalesce)(_['desc'], "Install the plugins used for a given job catalog."),
      writable: false,
      enumerable: true
    });
    Object.defineProperty(this, 'positionals', {
      value: (0, _core.coalesce)(_['positionals'], {}),
      writable: false,
      enumerable: true
    });
    Object.defineProperty(this, 'options', {
      value: (0, _core.coalesce)(_['options'], {
        ["registries"]: baseOptions.registries,
        ["catalogName"]: baseOptions.catalogName,
        ["registryAndCatalogName"]: baseOptions.registryAndCatalogName,
        ["arg"]: baseOptions.arg
      }),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_dc4d80eb823eec392e2f383c047dbea1___init__ instanceof Function) this._pvt_dc4d80eb823eec392e2f383c047dbea1___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_dc4d80eb823eec392e2f383c047dbea1___post__ instanceof Function) this._pvt_dc4d80eb823eec392e2f383c047dbea1___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_dc4d80eb823eec392e2f383c047dbea1___validate__ instanceof Function) this._pvt_dc4d80eb823eec392e2f383c047dbea1___validate__(); /* c8 ignore stop */
  }
};

const InstallCommand = new Proxy($InstallCommand, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'InstallCommand' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = InstallCommand;
Object.defineProperty(InstallCommand, 'baseOptions', {
  value: baseOptions,
  writable: false,
  enumerable: true
});
InstallCommand.prototype.handle = async function (argv) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("argv", argv, _core.map);
  let {
    catalogName,
    registryAndCatalogName,
    args
  } = argv;
  {
    const registries = (0, await this.createRegistries(argv).connect());
    try {
      const ops = Ops();
      if (registryAndCatalogName) {
        catalogName = _core.dogma.getItem(registryAndCatalogName.split("://"), 1);
      }
      const decl = (0, await this.readCatalogDecl(catalogName = this.buildCatalogPath(catalogName), registries));
      if (!decl) {
        (0, _core.print)(`Job catalog '${catalogName}' not found in '${registries.registryNames}'.`);
        _core.ps.exit(1);
      }
      const globalDataset = (0, await this.createGlobalDataset(decl, args));
      const parser = PluginParser();
      const loader = PluginLoader({
        'paths': _core.ps.env.KRM_NODE_PATH.split(":")
      });
      for (const pi of (_decl$plugins = decl.plugins) !== null && _decl$plugins !== void 0 ? _decl$plugins : []) {
        var _decl$plugins, _pi$impl;
        const name = buildPluginPackageName((_pi$impl = pi.impl) !== null && _pi$impl !== void 0 ? _pi$impl : pi.plugin);
        try {
          if (!ops.getOp(name)) {
            loader.loadPlugin(name);
          }
        } catch (e) {
          if (_core.dogma.like(e, "Cannot find module")) {
            (0, _core.print)(`Installing ${name}...`);
            0, await exec(`npm i ${name}`);
          }
        }
      }
    } finally {
      await _core.dogma.pawait(() => registries.disconnect());
    }
  }
};