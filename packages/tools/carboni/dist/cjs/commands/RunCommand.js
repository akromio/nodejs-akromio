"use strict";

var _core = require("@dogmalang/core");
const {
  RunCommand: RunCommandBase
} = _core.dogma.use(require("@akromio/cli"));
const {
  Stage,
  ConstStage,
  SleepStage
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
const ms = _core.dogma.use(require("ms"));
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
      value: (0, _core.coalesce)(_['name'], ["run [stages..]", "r"]),
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
        ["stages"]: {
          ["type"]: "string",
          ["desc"]: "stage or stage:botnet to run. If unset, defaultStageName:botnet used."
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
    stages,
    args
  } = argv;
  {
    const registries = (0, await this.createRegistries(argv).connect());
    let code;
    try {
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
      const stagenets = [];
      if ((0, _core.len)(stages) == 0) {
        if (!catalog.defaultStageName) {
          console.error("Catalog doesn't contain default stage name.");
          code = 2;
        } else {
          stages = [catalog.defaultStageName + ":botnet"];
        }
      }
      if (code != 2) {
        const args = dataset.getDatumValue("args");
        for (const stage of stages) {
          var _botnetName;
          let [stageName, botnetName] = _core.dogma.getArrayToUnpack(stage.split(":"), 2);
          botnetName = (_botnetName = botnetName) !== null && _botnetName !== void 0 ? _botnetName : "botnet";
          {
            const stage = _core.dogma.getItem(catalog.stages, stageName);
            if (stage) {
              {
                const botnet = _core.dogma.getItem(args, botnetName);
                if (!botnet) {
                  console.log(`Botnet not found: ${botnetName}.`);
                  code = 2;
                  break;
                } else {
                  stagenets.push({
                    ["stage"]: stage,
                    ["botnet"]: botnet
                  });
                }
              }
            } else {
              console.error(`Stage not found: ${stageName}.`);
              code = 2;
              break;
            }
          }
        }
      }
      for (const stagenet of stagenets) {
        const {
          stage,
          botnet
        } = stagenet;
        (0, _core.print)(`Stage: ${stage.name} (duration: ${ms(stage.duration)})`);
        0, await this.runStage(stage, botnet);
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
  const self = this;
  let promise; /* c8 ignore next */
  _core.dogma.expect("stage", stage, Stage); /* c8 ignore next */
  if (botnet != null) _core.dogma.expect("botnet", botnet, _core.dogma.intf("inline", {
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
    {
      const _ = stage;
      if (_core.dogma.is(_, ConstStage)) {
        {
          promise = this.runConstStage(stage, botnet);
        }
      } else if (_core.dogma.is(_, SleepStage)) {
        {
          promise = this.runSleepStage(stage);
        }
      } else {
        {
          _core.dogma.raise(Error(`Unknown stage: ${(0, _core.fmt)(stage)}.`));
        }
      }
    }
  }
  return promise;
};
RunCommand.prototype.runConstStage = function (stage, botnet) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("stage", stage, ConstStage); /* c8 ignore next */
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
    const starterOutput = BlankSheetStream();
    const times = stage.duration / stage.interval;
    const blankSheets = stage.requests;
    const starterProps = _core.dogma.clone(stage, {
      "output": starterOutput,
      "times": times,
      "blankSheets": blankSheets
    }, {}, [], []);
    const starter = ConstStarter(starterProps);
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
RunCommand.prototype.runSleepStage = function (stage) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("stage", stage, SleepStage);
  {
    const starterOutput = BlankSheetStream();
    const times = stage.duration / 1000;
    const starterProps = _core.dogma.clone(stage, {
      "output": starterOutput,
      "times": times
    }, {}, [], []);
    const starter = SleepStarter(starterProps);
    return starter.start();
  }
};