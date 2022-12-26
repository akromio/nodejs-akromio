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
      value: (0, _core.coalesce)(_['name'], ["catalog", "cat", "c", "*"]),
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
        ["desc"]: {
          ["type"]: "boolean",
          ["desc"]: "Show the catalog description if available.",
          ["default"]: false
        },
        ["all"]: {
          ["type"]: "boolean",
          ["alias"]: ["l"],
          ["desc"]: "Show all the items, including these with hidden tag.",
          ["default"]: false
        },
        ["tag"]: {
          ["type"]: "string",
          ["alias"]: ["t"],
          ["desc"]: "Show the items with a given tag."
        }
      }),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_7b7e546535f5d5ea74db6a81723fbf5b___init__ instanceof Function) this._pvt_7b7e546535f5d5ea74db6a81723fbf5b___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_7b7e546535f5d5ea74db6a81723fbf5b___post__ instanceof Function) this._pvt_7b7e546535f5d5ea74db6a81723fbf5b___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_7b7e546535f5d5ea74db6a81723fbf5b___validate__ instanceof Function) this._pvt_7b7e546535f5d5ea74db6a81723fbf5b___validate__(); /* c8 ignore stop */
  }
};

const CatalogCommand = new Proxy($CatalogCommand, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'CatalogCommand' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = CatalogCommand;
/* c8 ignore start */
CatalogCommand.prototype.createItemParser = function () {
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
      var _dogma$getItem;
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
        itemName
      } = this;
      const itemsField = itemName + "s";
      const defaultItemNameField = "default" + _core.dogma.getItem(itemName, 0).toUpperCase() + _core.dogma.getSlice(itemName, 1, -1) + "Name";
      (0, _core.print)("\nlocation:", decl.loc);
      showCatalogDesc(decl, desc);
      this.listItemDecls((_dogma$getItem = _core.dogma.getItem(decl, itemsField)) !== null && _dogma$getItem !== void 0 ? _dogma$getItem : [], _core.dogma.getItem(decl, defaultItemNameField), tag, all);
    } finally {
      0, await registries.disconnect();
    }
  }
};
CatalogCommand.prototype.listItemDecls = function (decls, defaultItemName, tag, all) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decls", decls, _core.dogma.TypeDef({
    name: 'inline',
    types: [_core.map],
    min: 0,
    max: null
  })); /* c8 ignore next */
  if (defaultItemName != null) _core.dogma.expect("defaultItemName", defaultItemName, _core.text); /* c8 ignore next */
  if (tag != null) _core.dogma.expect("tag", tag, _core.text); /* c8 ignore next */
  _core.dogma.expect("all", all, _core.bool);
  {
    const data = {};
    const ops = Ops();
    const itemParser = this.createItemParser();
    for (const decl of decls) {
      for (const [name, item] of Object.entries(itemParser.parse(decl, {
        'ops': ops
      }))) {
        {
          if (all) {
            _core.dogma.setItem("=", data, name, item);
          } else if (tag) {
            if (item.tags.includes(tag)) {
              _core.dogma.setItem("=", data, name, item);
            }
          } else {
            if (item.tags.includes("hidden")) {
              _core.dogma.nop();
            } else {
              _core.dogma.setItem("=", data, name, item);
            }
          }
        }
      }
    }
    const {
      itemName
    } = this;
    const rows = [[itemName, "type", "tags", "desc."]];
    for (const key of (0, _core.keys)(data).sort()) {
      const item = _core.dogma.getItem(data, key);
      const name = key + (key == defaultItemName ? "*" : "");
      const typeName = this.getTypeNameOf(item);
      rows.push([name, typeName, item.tags, item.desc || item.title]);
    }
    (0, _core.print)(`
${itemName}s:`);
    (0, _core.print)(table(rows, tableOpts));
  }
};
/* c8 ignore start */
CatalogCommand.prototype.getTypeNameOf = function () {
  (0, _core.abstract)();
}; /* c8 ignore stop */
function showCatalogDesc(catalog, show) {
  /* c8 ignore next */_core.dogma.expect("catalog", catalog, _core.map); /* c8 ignore next */
  _core.dogma.expect("show", show, _core.bool);
  {
    if (show) {
      {
        const extends_ = catalog.extends;
        if ((0, _core.len)(extends_) > 0) {
          (0, _core.print)("\nExtends:", extends_.join(", "));
        }
      }
      {
        const desc = catalog.desc;
        if (desc) {
          (0, _core.print)("\nDescription:");
          (0, _core.print)(desc);
        }
      }
    }
  }
}