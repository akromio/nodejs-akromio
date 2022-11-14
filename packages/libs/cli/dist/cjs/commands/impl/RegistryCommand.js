"use strict";

var _core = require("@dogmalang/core");
const path = _core.dogma.use(require("path"));
const yaml = _core.dogma.use(require("yaml"));
const {
  Ops
} = _core.dogma.use(require("@akromio/core"));
const {
  table,
  tableOpts
} = _core.dogma.use(require("../../helpers/table"));
const RegistryCommandBase = _core.dogma.use(require("../RegistryCommandBase"));
const {
  baseOptions
} = RegistryCommandBase;
const $RegistryCommand = class RegistryCommand extends RegistryCommandBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (_['name'] != null) (0, _core.expect)('name', _['name'], _core.list); /* c8 ignore stop */
    Object.defineProperty(this, 'name', {
      value: (0, _core.coalesce)(_['name'], ["registry [registryName]", "g"]),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['desc'] != null) (0, _core.expect)('desc', _['desc'], _core.text); /* c8 ignore stop */
    Object.defineProperty(this, 'desc', {
      value: (0, _core.coalesce)(_['desc'], "List the catalogs available in a registry."),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['positionals'] != null) (0, _core.expect)('positionals', _['positionals'], _core.map); /* c8 ignore stop */
    Object.defineProperty(this, 'positionals', {
      value: (0, _core.coalesce)(_['positionals'], {
        ["registryName"]: {
          ["type"]: "string",
          ["desc"]: "The registry name to list."
        }
      }),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['options'] != null) (0, _core.expect)('options', _['options'], _core.map); /* c8 ignore stop */
    Object.defineProperty(this, 'options', {
      value: (0, _core.coalesce)(_['options'], {
        ["registries"]: baseOptions.registries
      }),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_f353af1086756cf0ca4bc2c6bc914c9c___init__ instanceof Function) this._pvt_f353af1086756cf0ca4bc2c6bc914c9c___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_f353af1086756cf0ca4bc2c6bc914c9c___post__ instanceof Function) this._pvt_f353af1086756cf0ca4bc2c6bc914c9c___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_f353af1086756cf0ca4bc2c6bc914c9c___validate__ instanceof Function) this._pvt_f353af1086756cf0ca4bc2c6bc914c9c___validate__(); /* c8 ignore stop */
  }
};

const RegistryCommand = new Proxy($RegistryCommand, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'RegistryCommand' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = RegistryCommand;
RegistryCommand.prototype.handle = async function (argv) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("argv", argv, _core.map);
  let {
    registryName
  } = argv;
  {
    const registries = (0, await this.createRegistries(argv).connect());
    try {
      var _registryName;
      registryName = (_registryName = registryName) !== null && _registryName !== void 0 ? _registryName : _core.dogma.getItem(registries.registryNames, 0);
      const registry = registries.getRegistry(registryName);
      if (!registry) {
        (0, _core.print)(`Registry '${registryName}' not found in '${registries.registryNames}'.`);
        _core.ps.exit(1);
      }
      0, await listCatalogs(registry, path.join("/", _core.ps.env.KRM_JOB_CATALOGS_PATH));
    } finally {
      0, await registries.disconnect();
    }
  }
};
async function listCatalogs(registry, rootPath) {
  /* c8 ignore next */_core.dogma.expect("registry", registry); /* c8 ignore next */
  _core.dogma.expect("rootPath", rootPath, _core.text);
  {
    const rows = [["Catalog", "Desc."]];
    for (const entry of (0, await registry.listItems(rootPath))) {
      if (!entry.startsWith("_") && entry.endsWith(".yaml")) {
        const catalogName = path.basename(entry, ".yaml");
        const itemPath = path.join(rootPath, entry);
        const item = (0, await registry.getItem(itemPath));
        rows.push([catalogName, yaml.parse((0, _core.text)(item.value)).desc]);
      }
    }
    (0, _core.print)();
    (0, _core.print)(table(rows, tableOpts));
  }
}