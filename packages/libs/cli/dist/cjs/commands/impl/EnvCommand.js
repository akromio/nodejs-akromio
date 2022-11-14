"use strict";

var _core = require("@dogmalang/core");
const path = _core.dogma.use(require("path"));
const termSize = _core.dogma.use(require("term-size"));
const {
  table,
  tableOpts
} = _core.dogma.use(require("../../helpers/table"));
const Command = _core.dogma.use(require("../Command"));
const $EnvCommand = class EnvCommand extends Command {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (_['name'] != null) (0, _core.expect)('name', _['name'], _core.list); /* c8 ignore stop */
    Object.defineProperty(this, 'name', {
      value: (0, _core.coalesce)(_['name'], ["env", "e"]),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['desc'] != null) (0, _core.expect)('desc', _['desc'], _core.text); /* c8 ignore stop */
    Object.defineProperty(this, 'desc', {
      value: (0, _core.coalesce)(_['desc'], "Show the run environment."),
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
      value: (0, _core.coalesce)(_['options'], {}),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_074f961b7b04bb2050b639667b82ec5d___init__ instanceof Function) this._pvt_074f961b7b04bb2050b639667b82ec5d___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_074f961b7b04bb2050b639667b82ec5d___post__ instanceof Function) this._pvt_074f961b7b04bb2050b639667b82ec5d___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_074f961b7b04bb2050b639667b82ec5d___validate__ instanceof Function) this._pvt_074f961b7b04bb2050b639667b82ec5d___validate__(); /* c8 ignore stop */
  }
};

const EnvCommand = new Proxy($EnvCommand, {
  apply(receiver, self, args) {
    return new $EnvCommand(...args);
  }
});
module.exports = exports = EnvCommand;
EnvCommand.prototype.handle = function () {
  const self = this;
  {
    listEnvVars();
    _core.ps.exit(0);
  }
};
const prefix = "KRM_";
function listEnvVars() {
  {
    const vars = {
      ["ANSWERS_LOG"]: {
        ["desc"]: "Print the answers for their reuse: options or file."
      },
      ["DIR_NAME"]: {
        ["desc"]: "The dir name where the akromio data is."
      },
      ["ENV_FILE"]: {
        ["desc"]: "The .env file to load when started. Relative to $DIR_NAME."
      },
      ["PRIVATE_ENV_FILE"]: {
        ["desc"]: "The .private.env file to load when started. Relative to $DIRNAME."
      },
      ["APM_DIR_NAME"]: {
        ["desc"]: "The dir name where the apm catalogs are installed. Relative to $DIR_NAME."
      },
      ["JOB_CATALOGS_PATH"]: {
        ["desc"]: "The dir path to prefix when root job catalog name is relative."
      },
      ["JOB_CATALOG_NAME"]: {
        ["desc"]: "The catalog name to use when unset."
      },
      ["JOB_NAME"]: {
        ["desc"]: "The default job name to run when unset."
      },
      ["REGISTRIES"]: {
        ["desc"]: "The available registries to use in order, separated by commas."
      },
      ["REGISTRY_GIT_HOST"]: {
        ["desc"]: "The host where the Git repository is."
      },
      ["REGISTRY_GIT_USER"]: {
        ["desc"]: "The user name where the Git repository is."
      },
      ["REGISTRY_GIT_BRANCH"]: {
        ["desc"]: "The branch name to use."
      },
      ["REGISTRY_SKYNET_PORTAL"]: {
        ["desc"]: "The Skynet portal (w/o https://) to use when unset."
      },
      ["REGISTRY_SKYNET_SKYLINK"]: {
        ["desc"]: "The skylink to use when unset."
      },
      ["REGISTRY_SNS_PORTAL"]: {
        ["desc"]: "The Skynet portal (w/o https://) to use when unset."
      },
      ["REGISTRY_SNS_PUBLIC_KEY"]: {
        ["desc"]: "The Skynet registry public key to use when unset."
      },
      ["REGISTRY_SNS_NAME"]: {
        ["desc"]: "The SNS name to use when unset."
      },
      ["REGISTRY_HTTP_HOST"]: {
        ["desc"]: "The host (w/o https://) to use when unset."
      },
      ["REGISTRY_HTTP_BASE"]: {
        ["desc"]: "The base path to prefix when HTTP registry used."
      },
      ["NODE_PATH"]: {
        ["desc"]: "The paths where the assets (plugins, catalogs...) are installed with NPM."
      }
    };
    const rows = [["Variable", "Value", "Desc."], [prefix + "ARG_*", "", "The arguments to pass from environment variables."], [prefix + "ANSWER_*", "", "The answers to pass from environment variables."]];
    for (let [name, item] of Object.entries(vars)) {
      {
        var _dogma$getItem;
        name = prefix + name;
        rows.push([name, (_dogma$getItem = _core.dogma.getItem(_core.ps.env, name)) !== null && _dogma$getItem !== void 0 ? _dogma$getItem : "", item.desc]);
      }
    }
    const totalCols = termSize().columns - 10;
    let varCols = 0;
    for (const row of rows) {
      {
        const cols = (0, _core.len)(_core.dogma.getItem(row, 0));
        if (cols > varCols) {
          varCols = cols;
        }
      }
    }
    const config = _core.dogma.clone(tableOpts, {
      "columns": [{
        ["width"]: varCols
      }, {
        ["width"]: Math.floor((totalCols - varCols) / 2)
      }, {
        ["width"]: Math.floor((totalCols - varCols) / 2)
      }]
    }, {}, [], []);
    (0, _core.print)();
    (0, _core.print)(table(rows, config));
  }
}