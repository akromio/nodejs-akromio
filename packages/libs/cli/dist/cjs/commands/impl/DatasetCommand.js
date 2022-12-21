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
const datasetParser = DatasetParser();
const datasetDescriber = DatasetDescriber();
const $DatasetCommand = class DatasetCommand extends CatalogCommandBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (_['name'] != null) (0, _core.expect)('name', _['name'], _core.list); /* c8 ignore stop */
    Object.defineProperty(this, 'name', {
      value: (0, _core.coalesce)(_['name'], ["dataset [jobName]", "ds"]),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['desc'] != null) (0, _core.expect)('desc', _['desc'], _core.text); /* c8 ignore stop */
    Object.defineProperty(this, 'desc', {
      value: (0, _core.coalesce)(_['desc'], "List the dataset of a catalog or a job."),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['positionals'] != null) (0, _core.expect)('positionals', _['positionals'], _core.map); /* c8 ignore stop */
    Object.defineProperty(this, 'positionals', {
      value: (0, _core.coalesce)(_['positionals'], {
        ["jobName"]: {
          ["type"]: "string",
          ["desc"]: "Job name to query."
        }
      }),
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
    args,
    jobName
  } = argv;
  {
    const registries = (0, await this.createRegistries(argv).connect());
    try {
      var _decl$dataset;
      if (registryAndCatalogName) {
        catalogName = _core.dogma.getItem(registryAndCatalogName.split("://"), 1);
      }
      catalogName = this.buildCatalogPath(catalogName);
      const decl = (0, await this.readCatalogDecl(catalogName, registries));
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
      const datum = globalDataset.getDatum("args");
      const originalArgs = datum.getValue();
      datum.setValueWithoutUpdatableCheck((0, _core.proxy)(originalArgs, {
        ["get"]: (_, prop) => {
          /* c8 ignore next */_core.dogma.expect("_", _); /* c8 ignore next */
          _core.dogma.expect("prop", prop);
          {
            return _core.dogma.is(prop, _core.text) && !_core.dogma.includes(originalArgs, prop) ? "" : _core.dogma.getItem(originalArgs, prop);
          }
        }
      }));
      const localDataset = datasetParser.parse((_decl$dataset = decl.dataset) !== null && _decl$dataset !== void 0 ? _decl$dataset : [], {
        'name': "catalog",
        'parent': globalDataset
      });
      (0, _core.print)("\nLocation:", decl.loc);
      if (jobName) {
        listJobInputs(localDataset, decl.jobs, argv);
      } else {
        listDataset(localDataset, argv);
      }
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
    const data = datasetDescriber.describeData(dataset, opts);
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
function listJobInputs(dataset, jobs, opts) {
  /* c8 ignore next */_core.dogma.expect("dataset", dataset); /* c8 ignore next */
  _core.dogma.expect("jobs", jobs); /* c8 ignore next */
  _core.dogma.expect("opts", opts, _core.map);
  let {
    jobName,
    showType,
    showOptions,
    notShowDesc
  } = opts;
  {
    var _findJob, _job$dataset;
    const job = (_findJob = findJob(jobName, jobs)) !== null && _findJob !== void 0 ? _findJob : _core.dogma.raise(Error(`Job not found: ${jobName}.`));
    dataset = datasetParser.parse((_job$dataset = job.dataset) !== null && _job$dataset !== void 0 ? _job$dataset : [], {
      'name': jobName,
      'parent': dataset
    });
    const data = datasetDescriber.describeData(dataset, {
      'tag': "input"
    });
    const header = ["Input"];
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
        var _datum$options2;
        row.push((_datum$options2 = datum.options) !== null && _datum$options2 !== void 0 ? _datum$options2 : "");
      }
      if (!notShowDesc) {
        var _datum$desc2;
        row.push((_datum$desc2 = datum.desc) !== null && _datum$desc2 !== void 0 ? _datum$desc2 : "");
      }
      rows.push(row);
    }
    (0, _core.printf)("\nInputs of %s:", jobName);
    (0, _core.print)(table(rows, tableOpts));
  }
}
function findJob(name, decl) {
  /* c8 ignore next */_core.dogma.expect("name", name, _core.text); /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.list);
  {
    for (let job of decl) {
      if (job.group) {
        var _findJob2;
        job = (_findJob2 = findJob(name, job.jobs)) !== null && _findJob2 !== void 0 ? _findJob2 : {};
      }
      {
        const jobName = (0, _core.coalesce)(job.macro, job.co, job.script);
        if (jobName == name) {
          return job;
        }
      }
    }
  }
}