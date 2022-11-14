"use strict";

var _core = require("@dogmalang/core");
const CatalogCommandBase = _core.dogma.use(require("./CatalogCommandBase"));
const {
  PluginLoader
} = _core.dogma.use(require("@akromio/core"));
const {
  ConsoleReporter,
  Reporters
} = _core.dogma.use(require("@akromio/reporter"));
const {
  baseOptions
} = CatalogCommandBase;
const $RunCommandBase = class RunCommandBase extends CatalogCommandBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_4b1ced6e0cc17fa5ae9edc4b0d96716a___init__ instanceof Function) this._pvt_4b1ced6e0cc17fa5ae9edc4b0d96716a___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_4b1ced6e0cc17fa5ae9edc4b0d96716a___post__ instanceof Function) this._pvt_4b1ced6e0cc17fa5ae9edc4b0d96716a___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_4b1ced6e0cc17fa5ae9edc4b0d96716a___validate__ instanceof Function) this._pvt_4b1ced6e0cc17fa5ae9edc4b0d96716a___validate__(); /* c8 ignore stop */
  }
};

const RunCommandBase = new Proxy($RunCommandBase, {
  apply(receiver, self, args) {
    return new $RunCommandBase(...args);
  }
});
module.exports = exports = RunCommandBase;
Object.defineProperty(RunCommandBase, 'baseOptions', {
  value: _core.dogma.clone(baseOptions, {
    "onError": {
      ["choices"]: ["carryOn", "finish"],
      ["desc"]: "What to do on error.",
      ["default"]: "carryOn"
    },
    "reporter": {
      ["type"]: "array",
      ["alias"]: ["p", "reporters"],
      ["choices"]: ["none", "console"],
      ["desc"]: "A reporter to notify the run events.",
      ["default"]: ["console"]
    },
    "summaryReporter": {
      ["type"]: "array",
      ["alias"]: ["R", "summaryReporters"],
      ["choices"]: ["none", "console"],
      ["desc"]: "A reporter to notify the run summary.",
      ["default"]: ["none"]
    },
    "answer": {
      ["type"]: "array",
      ["alias"]: ["A", "answers"],
      ["desc"]: "An answer (if name=value) or an answers file path. Available using $(answers.name)."
    },
    "logAnswers": {
      ["choices"]: ["options", "file"],
      ["desc"]: "Print the answers for their reuse as CLI options or option file."
    }
  }, {}, [], []),
  writable: false,
  enumerable: true
});
/* c8 ignore start */
RunCommandBase.prototype.createCatalogParser = function () {
  (0, _core.abstract)();
}; /* c8 ignore stop */
RunCommandBase.prototype.createCatalog = async function (decl, pluginParser, globalDataset, ops) {
  const self = this;
  let catalog; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("pluginParser", pluginParser); /* c8 ignore next */
  _core.dogma.expect("globalDataset", globalDataset); /* c8 ignore next */
  _core.dogma.expect("ops", ops);
  {
    const pluginLoader = PluginLoader({
      'paths': _core.ps.env.KRM_NODE_PATH.split(":")
    });
    const catalogParser = this.createCatalogParser({
      'pluginParser': pluginParser,
      'pluginLoader': pluginLoader
    });
    catalog = (0, await catalogParser.parse(decl, {
      'parentDataset': globalDataset,
      'ops': ops
    }));
  }
  return catalog;
};
RunCommandBase.prototype.createReporters = function (reporterNames, log) {
  const self = this;
  let reporters; /* c8 ignore next */
  _core.dogma.expect("reporterNames", reporterNames, _core.list); /* c8 ignore next */
  _core.dogma.expect("log", log);
  {
    reporters = Reporters();
    for (const reporterName of reporterNames) {
      {
        const _ = reporterName;
        switch (_) {
          case "console":
            {
              reporters.append(ConsoleReporter({
                'log': log
              }));
            } /* c8 ignore start */
            break;
          /* c8 ignore stop */
        }
      }
    }
  }
  return reporters;
};
/* c8 ignore start */
RunCommandBase.prototype._createEngine = function () {
  (0, _core.abstract)();
}; /* c8 ignore stop */
RunCommandBase.prototype.createEngine = async function (opts, registry) {
  const self = this;
  let engine;
  {
    engine = this._createEngine(opts);
    0, await engine.loadBuiltInPlugins();
    const piCrDecl = _core.dogma.clone(_core.dogma.use(require("@akromio/pi-registry")), {
      "plugin": "cr"
    }, {}, [], []);
    const piCr = (0, await engine.pluginParser.parsePlugin(piCrDecl, registry));
    engine.ops.appendPlugin(piCr);
  }
  return engine;
};