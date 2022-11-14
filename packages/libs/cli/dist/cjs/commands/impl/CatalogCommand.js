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
    if (_['desc'] != null) (0, _core.expect)('desc', _['desc'], _core.text); /* c8 ignore stop */
    Object.defineProperty(this, 'desc', {
      value: (0, _core.coalesce)(_['desc'], "List the content of a jobs catalog."),
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
          ["desc"]: "Show all the jobs, including these with hidden tag.",
          ["default"]: false
        },
        ["tag"]: {
          ["type"]: "string",
          ["alias"]: ["t"],
          ["desc"]: "Show the jobs with a given tag."
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
      var _decl$jobs;
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
      (0, _core.print)("\nLocation:", decl.loc);
      showCatalogDesc(decl, desc);
      this.listJobDecls((_decl$jobs = decl.jobs) !== null && _decl$jobs !== void 0 ? _decl$jobs : [], decl.defaultJobName, tag, all);
    } finally {
      0, await registries.disconnect();
    }
  }
};
CatalogCommand.prototype.listJobDecls = function (decls, defaultJobName, tag, all) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decls", decls, _core.dogma.TypeDef({
    name: 'inline',
    types: [_core.map],
    min: 0,
    max: null
  })); /* c8 ignore next */
  if (defaultJobName != null) _core.dogma.expect("defaultJobName", defaultJobName, _core.text); /* c8 ignore next */
  if (tag != null) _core.dogma.expect("tag", tag, _core.text); /* c8 ignore next */
  _core.dogma.expect("all", all, _core.bool);
  {
    const data = {};
    const jobParser = this.createJobParser();
    const jobs = jobParser.parseJobs(decls, {
      'ops': Ops()
    });
    for (const [name, job] of Object.entries(jobs)) {
      {
        if (all) {
          _core.dogma.setItem("=", data, name, job);
        } else if (tag) {
          if (job.tags.includes(tag)) {
            _core.dogma.setItem("=", data, name, job);
          }
        } else {
          if (job.tags.includes("hidden")) {
            _core.dogma.nop();
          } else {
            _core.dogma.setItem("=", data, name, job);
          }
        }
      }
    }
    const rows = [["Job", "Type", "Tags", "Desc."]];
    for (const key of (0, _core.keys)(data).sort()) {
      const job = _core.dogma.getItem(data, key);
      const name = key + (key == defaultJobName ? "*" : "");
      let opType;
      {
        const _ = job;
        if (_core.dogma.is(_, "Macro")) {
          {
            opType = "macro";
          }
        } else if (_core.dogma.is(_, "Loop")) {
          {
            opType = "loop";
          }
        } else if (_core.dogma.is(_, "Co")) {
          {
            opType = "co";
          }
        } else if (_core.dogma.is(_, "Script")) {
          {
            opType = "script";
          }
        }
      }
      rows.push([name, opType, job.tags, job.desc]);
    }
    (0, _core.print)("\nJobs:");
    (0, _core.print)(table(rows, tableOpts));
  }
};
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