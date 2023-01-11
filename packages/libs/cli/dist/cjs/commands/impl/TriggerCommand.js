"use strict";

var _core = require("@dogmalang/core");
const redis = _core.dogma.use(require("redis"));
const {
  Duplex
} = _core.dogma.use(require("stream"));
const {
  CallReqStream,
  Runner,
  Ops,
  PluginLoader,
  PluginParser
} = _core.dogma.use(require("@akromio/core"));
const {
  PushTrigger,
  PullTrigger
} = _core.dogma.use(require("@akromio/trigger"));
const {
  TriggeredJobCatalogParser
} = _core.dogma.use(require("@akromio/jobs"));
const intervalTriggerImpl = _core.dogma.use(require("@akromio/trigger-interval"));
const redisStreamsTriggerImpl = _core.dogma.use(require("@akromio/trigger-redisstreams"));
const range = _core.dogma.use(require("@akromio/range"));
const JobRunCommandBase = _core.dogma.use(require("../JobRunCommandBase"));
const {
  baseOptions
} = JobRunCommandBase;
const $TriggerCommand = class TriggerCommand extends JobRunCommandBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (_['name'] != null) (0, _core.expect)('name', _['name'], _core.list); /* c8 ignore stop */
    Object.defineProperty(this, 'name', {
      value: (0, _core.coalesce)(_['name'], ["run [triggerName]", "r"]),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['desc'] != null) (0, _core.expect)('desc', _['desc'], _core.text); /* c8 ignore stop */
    Object.defineProperty(this, 'desc', {
      value: (0, _core.coalesce)(_['desc'], "Use a trigger to run a job of a catalog."),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['positionals'] != null) (0, _core.expect)('positionals', _['positionals'], _core.map); /* c8 ignore stop */
    Object.defineProperty(this, 'positionals', {
      value: (0, _core.coalesce)(_['positionals'], {
        ["triggerName"]: {
          ["type"]: "string",
          ["desc"]: "Trigger name to use. If unset, defaultTriggerName used."
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
        ["onError"]: baseOptions.onError,
        ["reporter"]: baseOptions.reporter,
        ["summaryReporter"]: baseOptions.summaryReporter
      }),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_cd7b5fd280baca02cda40ed652e5df80___init__ instanceof Function) this._pvt_cd7b5fd280baca02cda40ed652e5df80___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_cd7b5fd280baca02cda40ed652e5df80___post__ instanceof Function) this._pvt_cd7b5fd280baca02cda40ed652e5df80___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_cd7b5fd280baca02cda40ed652e5df80___validate__ instanceof Function) this._pvt_cd7b5fd280baca02cda40ed652e5df80___validate__(); /* c8 ignore stop */
  }
};

const TriggerCommand = new Proxy($TriggerCommand, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'TriggerCommand' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = TriggerCommand;
TriggerCommand.prototype.createCatalogParser = function (opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("opts", opts, _core.map);
  {
    return TriggeredJobCatalogParser(opts);
  }
};
TriggerCommand.prototype.handle = async function (argv) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("argv", argv, _core.map);
  let {
    triggerName,
    catalogName,
    registryAndCatalogName,
    onError,
    args,
    reporters,
    summaryReporters
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
      const pluginParser = PluginParser();
      const catalog = (0, await this.createCatalog(decl, pluginParser, globalDataset, ops));
      const log = new Duplex({
        emitClose: true,
        read() {},
        write() {}
      });
      const stream = CallReqStream();
      const engine = (0, await this.createEngine({
        ["dataset"]: catalog.dataset,
        ["onError"]: catalog.onError || onError,
        ["runners"]: range(catalog.parallelism).map(i => Runner({
          'name': `runner#${i}`,
          'log': log
        })),
        ["stream"]: stream,
        ["pluginParser"]: pluginParser,
        ["ops"]: ops
      }, registries.getRegistry(decl.registryName)));
      reporters = this.createReporters([], log).connect();
      ops.appendOps(...(0, _core.values)(catalog.jobs));
      const trigger = createTrigger(triggerName, catalog, stream, args);
      let code = 0;
      trigger.start(_core.dogma.nop());
      0, await engine.run();
    } finally {
      await _core.dogma.pawait(() => registries.disconnect());
      _core.dogma.peval(() => {
        return reporters.disconnect();
      });
    }
  }
};
function createTrigger(name, cat, stream, jobArgs) {
  let trigger;
  {
    var _name, _dogma$getItem;
    if (!(name = (_name = name) !== null && _name !== void 0 ? _name : cat.defaultTriggerName)) {
      _core.dogma.raise(TypeError(`trigger name expected.`));
    }
    let decl = (_dogma$getItem = _core.dogma.getItem(cat.triggers, name)) !== null && _dogma$getItem !== void 0 ? _dogma$getItem : _core.dogma.raise(TypeError(`Trigger not found: ${name}.`));
    {
      var _decl$impl;
      const i = (_decl$impl = decl.impl) !== null && _decl$impl !== void 0 ? _decl$impl : name;
      switch (i) {
        case "interval":
          {
            const TriggerImpl = intervalTriggerImpl.impl;
            trigger = PushTrigger({
              'name': name,
              'stream': stream,
              'triggerImpl': TriggerImpl(decl)
            });
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        case "redisstreams":
          {
            var _decl$host, _decl$port;
            const opts = Object.assign({}, {
              ["name"]: `${decl.group}#${decl.consumer}`,
              ["socket"]: {
                ["host"]: (_decl$host = decl.host) !== null && _decl$host !== void 0 ? _decl$host : "localhost",
                ["port"]: (_decl$port = decl.port) !== null && _decl$port !== void 0 ? _decl$port : 6379
              }
            }, decl.username ? {
              ["username"]: decl.username
            } : {}, decl.password ? {
              ["password"]: decl.password
            } : {});
            const TriggerImpl = redisStreamsTriggerImpl.impl;
            decl = _core.dogma.clone(decl, {
              "redis": redis.createClient(opts)
            }, {}, [], []);
            trigger = PullTrigger({
              'name': name,
              'stream': stream,
              'triggerImpl': TriggerImpl(decl)
            });
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        default:
          {
            _core.dogma.raise(TypeError(`Invalid trigger implementation: ${i}.`));
          }
      }
    }
  }
  return trigger;
}