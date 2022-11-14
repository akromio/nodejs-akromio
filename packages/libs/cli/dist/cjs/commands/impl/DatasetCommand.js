"use strict";

var _core = require("@dogmalang/core");
const {
  DatasetParser,
  DatasetDescriber
} = _core.dogma.use(require("@akromio/dataset"));
const {
  QuestionDescriber
} = _core.dogma.use(require("@akromio/inquirer"));
const {
  table,
  tableOpts
} = _core.dogma.use(require("../../helpers/table"));
const CatalogCommandBase = _core.dogma.use(require("../CatalogCommandBase"));
const {
  baseOptions
} = CatalogCommandBase;
const $DatasetCommand = class DatasetCommand extends CatalogCommandBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (_['name'] != null) (0, _core.expect)('name', _['name'], _core.list); /* c8 ignore stop */
    Object.defineProperty(this, 'name', {
      value: (0, _core.coalesce)(_['name'], ["dataset", "ds"]),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['desc'] != null) (0, _core.expect)('desc', _['desc'], _core.text); /* c8 ignore stop */
    Object.defineProperty(this, 'desc', {
      value: (0, _core.coalesce)(_['desc'], "List the dataset of a catalog."),
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
        ["registryAndCatalogName"]: baseOptions.registryAndCatalogName,
        ["arg"]: baseOptions.arg,
        ["showPasswordValues"]: {
          ["type"]: "boolean",
          ["alias"]: ["p"],
          ["desc"]: "Show the password values (these with the tag 'password'); otherwise, these will be obfuscated.",
          ["default"]: false
        },
        ["tag"]: {
          ["type"]: "string",
          ["alias"]: ["t"],
          ["desc"]: "Only show the data with the given tag."
        },
        ["showType"]: {
          ["type"]: "boolean",
          ["desc"]: "Show the datum type: var, const, fn.",
          ["default"]: false
        },
        ["showOptions"]: {
          ["type"]: "boolean",
          ["alias"]: ["o"],
          ["desc"]: "Show the datum options.",
          ["default"]: false
        },
        ["notShowDesc"]: {
          ["type"]: "boolean",
          ["alias"]: ["D"],
          ["desc"]: "Not show the datum description.",
          ["default"]: false
        }
      }),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_f01a0039fb583628effa7bc10183222d___init__ instanceof Function) this._pvt_f01a0039fb583628effa7bc10183222d___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_f01a0039fb583628effa7bc10183222d___post__ instanceof Function) this._pvt_f01a0039fb583628effa7bc10183222d___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_f01a0039fb583628effa7bc10183222d___validate__ instanceof Function) this._pvt_f01a0039fb583628effa7bc10183222d___validate__(); /* c8 ignore stop */
  }
};

const DatasetCommand = new Proxy($DatasetCommand, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'DatasetCommand' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = DatasetCommand;
DatasetCommand.prototype.handle = async function (argv) {
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
      var _decl$dataset;
      if (registryAndCatalogName) {
        catalogName = _core.dogma.getItem(registryAndCatalogName.split("://"), 1);
      }
      let decl;
      catalogName = this.buildCatalogPath(catalogName);
      decl = (0, await this.readCatalogDecl(catalogName, registries));
      if (!decl) {
        (0, _core.print)(`Catalog '${catalogName}' not found in '${registries.registryNames}'.`);
        _core.ps.exit(1);
      }
      const {
        createGlobalDataset
      } = _core.dogma.use(require("../util/dataset"));
      const globalDataset = (0, await createGlobalDataset({
        'catalog': decl,
        'args': args
      }));
      const localDataset = DatasetParser().parse((_decl$dataset = decl.dataset) !== null && _decl$dataset !== void 0 ? _decl$dataset : [], {
        'name': "catalog",
        'parent': globalDataset
      });
      (0, _core.print)("\nLocation:", decl.loc);
      listDataset(localDataset, argv);
    } finally {
      0, await registries.disconnect();
    }
  }
};
function listDataset(dataset, opts) {
  /* c8 ignore next */_core.dogma.expect("dataset", dataset); /* c8 ignore next */
  _core.dogma.expect("opts", opts, _core.map);
  let {
    showType,
    showOptions,
    notShowDesc
  } = opts;
  {
    const data = DatasetDescriber().describeData(dataset, opts);
    const header = ["Datum"];
    if (showType) {
      header.push("Type");
    }
    header.push("Value");
    if (showOptions) {
      header.push("Options");
    }
    if (!notShowDesc) {
      header.push("Desc.");
    }
    const rows = [header];
    for (const key of (0, _core.keys)(data).sort()) {
      const datum = _core.dogma.getItem(data, key);
      const row = [key];
      if (showType) {
        row.push(datum.kind);
      }
      row.push(datum.value);
      if (showOptions) {
        var _datum$options;
        row.push((_datum$options = datum.options) !== null && _datum$options !== void 0 ? _datum$options : "");
      }
      if (!notShowDesc) {
        var _datum$desc;
        row.push((_datum$desc = datum.desc) !== null && _datum$desc !== void 0 ? _datum$desc : "");
      }
      rows.push(row);
    }
    (0, _core.print)("\nDataset:");
    (0, _core.print)(table(rows, tableOpts));
  }
}