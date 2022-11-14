"use strict";

var _core = require("@dogmalang/core");
const {
  DatasetParser
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
const $QuestionsCommand = class QuestionsCommand extends CatalogCommandBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (_['name'] != null) (0, _core.expect)('name', _['name'], _core.list); /* c8 ignore stop */
    Object.defineProperty(this, 'name', {
      value: (0, _core.coalesce)(_['name'], ["questions", "q"]),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['desc'] != null) (0, _core.expect)('desc', _['desc'], _core.text); /* c8 ignore stop */
    Object.defineProperty(this, 'desc', {
      value: (0, _core.coalesce)(_['desc'], "List the questions available in a catalog."),
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
        ["arg"]: baseOptions.arg
      }),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_346e8663d0da7ab07ef7a3541337472f___init__ instanceof Function) this._pvt_346e8663d0da7ab07ef7a3541337472f___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_346e8663d0da7ab07ef7a3541337472f___post__ instanceof Function) this._pvt_346e8663d0da7ab07ef7a3541337472f___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_346e8663d0da7ab07ef7a3541337472f___validate__ instanceof Function) this._pvt_346e8663d0da7ab07ef7a3541337472f___validate__(); /* c8 ignore stop */
  }
};

const QuestionsCommand = new Proxy($QuestionsCommand, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'QuestionsCommand' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = QuestionsCommand;
QuestionsCommand.prototype.handle = async function (argv) {
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
      listQuestions(localDataset.getData({
        'tag': "questions"
      }));
    } finally {
      0, await registries.disconnect();
    }
  }
};
function listQuestions(data) {
  {
    for (const datum of data) {
      const data = QuestionDescriber().describe(datum.getValue());
      const rows = [["Name", "Type", "Question", "Default"]];
      for (const key of (0, _core.keys)(data).sort()) {
        const q = _core.dogma.getItem(data, key);
        const title = q.title + (q.type == "select" ? " (" + q.options + ")" : "");
        rows.push([key, q.type, title, q.defaultValue]);
      }
      (0, _core.print)("\nQuestions:", datum.name);
      (0, _core.print)(table(rows, tableOpts));
    }
  }
}