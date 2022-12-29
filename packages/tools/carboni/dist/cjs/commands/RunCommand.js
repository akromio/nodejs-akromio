"use strict";

var _core = require("@dogmalang/core");
const {
  RunCommand: RunCommandBase
} = _core.dogma.use(require("@akromio/cli"));
const {
  ConstStage
} = _core.dogma.use(require("@akromio/stages"));
const {
  ConstStarter,
  SleepStarter,
  BlankSheetStream
} = _core.dogma.use(require("@akromio/generator"));
const {
  RandomAssigner,
  Ring,
  RunReqStream
} = _core.dogma.use(require("@akromio/generator"));
const {
  ConsoleDistributor,
  RedisDistributor
} = _core.dogma.use(require("@akromio/generator"));
const _StageCommand = _core.dogma.use(require("./_StageCommand"));
const {
  baseOptions
} = RunCommandBase;
const $RunCommand = class RunCommand extends RunCommandBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore next */
    if (_StageCommand.prototype._constructor instanceof Function) _StageCommand.prototype._constructor.bind(this)(_);
    /* c8 ignore start */
    if (_['name'] != null) (0, _core.expect)('name', _['name'], _core.list); /* c8 ignore stop */
    Object.defineProperty(this, 'name', {
      value: (0, _core.coalesce)(_['name'], ["run [stageName]", "r"]),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['desc'] != null) (0, _core.expect)('desc', _['desc'], _core.text); /* c8 ignore stop */
    Object.defineProperty(this, 'desc', {
      value: (0, _core.coalesce)(_['desc'], "Run a stage from a catalog."),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['positionals'] != null) (0, _core.expect)('positionals', _['positionals'], _core.map); /* c8 ignore stop */
    Object.defineProperty(this, 'positionals', {
      value: (0, _core.coalesce)(_['positionals'], {
        ["stageName"]: {
          ["type"]: "string",
          ["desc"]: "Stage name to run. If unset, defaultStageName used."
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
        ["arg"]: baseOptions.arg
      }),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_ab726dfe41a51383d99811a374f6993c___init__ instanceof Function) this._pvt_ab726dfe41a51383d99811a374f6993c___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_ab726dfe41a51383d99811a374f6993c___post__ instanceof Function) this._pvt_ab726dfe41a51383d99811a374f6993c___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_ab726dfe41a51383d99811a374f6993c___validate__ instanceof Function) this._pvt_ab726dfe41a51383d99811a374f6993c___validate__(); /* c8 ignore stop */
  }
};

_core.dogma.mixin($RunCommand, _StageCommand);
const RunCommand = new Proxy($RunCommand, {
  apply(receiver, self, args) {
    return new $RunCommand(...args);
  }
});
module.exports = exports = RunCommand;
RunCommand.prototype.handle = async function (argv) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("argv", argv, _core.map);
  let {
    catalogName,
    registryAndCatalogName,
    stageName,
    args
  } = argv;
  {
    const registries = (0, await this.createRegistries(argv).connect());
    let code;
    try {
      var _stageName;
      if (registryAndCatalogName) {
        catalogName = _core.dogma.getItem(registryAndCatalogName.split("://"), 1);
      }
      const decl = (0, await this.readCatalogDecl(catalogName = this.buildCatalogPath(catalogName), registries));
      if (!decl) {
        (0, _core.print)(`Stage catalog '${catalogName}' not found in '${registries.registryNames}'.`);
        _core.ps.exit(1);
      }
      const dataset = (0, await this.createGlobalDataset(decl, args));
      const catalog = (0, await this.createCatalog(decl, dataset));
      if (!(stageName = (_stageName = stageName) !== null && _stageName !== void 0 ? _stageName : catalog.defaultStageName)) {
        console.error("Catalog doesn't contain default stage name.");
        code = 2;
      } else {
        {
          const stage = _core.dogma.getItem(catalog.stages, stageName);
          if (!stage) {
            console.error(`Stage not found: ${stageName}.`);
            code = 2;
          } else {
            const args = dataset.getDatumValue("args");
            {
              const [ok, value] = await _core.dogma.pawait(() => this.runStage(stage, args.botnet));
              if (ok) {
                code = 0;
              } else {
                code = 1;
                if (value) {
                  (0, _core.printf)(value);
                }
              }
            }
          }
        }
      }
    } finally {
      await _core.dogma.pawait(() => registries.disconnect());
    }
    _core.ps.exit(code);
  }
};
RunCommand.prototype.createCatalog = async function (decl, globalDataset) {
  const self = this;
  let catalog; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("globalDataset", globalDataset);
  {
    const catalogParser = this.createCatalogParser();
    catalog = (0, await catalogParser.parse(decl, {
      'parentDataset': globalDataset
    }));
  }
  return catalog;
};
RunCommand.prototype.runStage = function (stage, botnet) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("stage", stage); /* c8 ignore next */
  _core.dogma.expect("botnet", botnet, _core.dogma.intf("inline", {
    impl: {
      optional: false,
      type: _core.text
    },
    bots: {
      optional: false,
      type: _core.dogma.TypeDef({
        name: 'inline',
        types: [_core.map],
        min: 0,
        max: null
      })
    }
  }));
  {
    let starter;
    const starterOutput = BlankSheetStream();
    const times = stage.duration / stage.interval;
    const blankSheets = stage.requests;
    const starterProps = _core.dogma.clone(stage, {
      "output": starterOutput,
      "times": times,
      "blankSheets": blankSheets
    }, {}, [], []);
    {
      const _ = stage;
      if (_core.dogma.is(_, ConstStage)) {
        {
          starter = ConstStarter(starterProps);
        }
      } else if (_core.dogma.is(_, SleepStage)) {
        {
          starter = SleepStarter(starterProps);
        }
      } else {
        {
          _core.dogma.raise(Error(`Unknown stage: ${(0, _core.fmt)(stage)}.`));
        }
      }
    }
    const assignerOutput = RunReqStream();
    const assignations = stage.jobs;
    const ring = Ring({
      'points': botnet.bots.map(bot => {
        /* c8 ignore next */_core.dogma.expect("bot", bot);
        {
          return bot.bot;
        }
      })
    });
    const assignerProps = {
      ["input"]: starterOutput,
      ["output"]: assignerOutput,
      ["ring"]: ring,
      ["assignations"]: assignations
    };
    const assigner = RandomAssigner(assignerProps);
    let distributor;
    const distributorInput = assignerOutput;
    const distributorProps = _core.dogma.clone(botnet, {
      "input": distributorInput
    }, {}, [], []);
    {
      const i = botnet.impl;
      switch (i) {
        case "console":
          {
            distributor = ConsoleDistributor(distributorProps);
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        case "redis":
          {
            distributor = RedisDistributor(distributorProps);
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        default:
          {
            _core.dogma.raise(TypeError(`Unknown botnet impl: ${i}.`));
          }
      }
    }
    return Promise.all([starter.start(), assigner.start(), distributor.start()]);
  }
};