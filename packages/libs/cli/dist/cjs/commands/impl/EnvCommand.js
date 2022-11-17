"use strict";

var _core = require("@dogmalang/core");
const term = _core.dogma.use(require("term-size"));
const {
  table,
  tableOpts
} = _core.dogma.use(require("../../helpers/table"));
const Command = _core.dogma.use(require("../Command"));
const prefix = "KRM_";
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
    this.printRows(this.buildRows());
    _core.ps.exit(0);
  }
};
EnvCommand.prototype.printRows = function (rows) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("rows", rows, _core.list);
  {
    const totalWidth = term().columns - 10;
    let varWidth = 0;
    let valueWidth = 0;
    for (const row of rows) {
      {
        const width = (0, _core.len)(_core.dogma.getItem(row, 0));
        if (width > varWidth) {
          varWidth = width;
        }
      }
      {
        const width = (0, _core.len)(_core.dogma.getItem(row, 1));
        if (width > valueWidth) {
          valueWidth = width;
        }
      }
    }
    const col2Width = Math.floor((totalWidth - varWidth) / 2);
    if (valueWidth > col2Width) {
      valueWidth = col2Width;
    }
    const config = _core.dogma.clone(tableOpts, {
      "columns": [{
        ["width"]: varWidth
      }, {
        ["width"]: valueWidth
      }, {
        ["width"]: totalWidth - varWidth - valueWidth
      }]
    }, {}, [], []);
    (0, _core.print)();
    (0, _core.print)(table(rows, config));
  }
};
EnvCommand.prototype.buildRows = function () {
  const self = this;
  let rows = [];
  {
    const vars = {
      ["ANSWERS_LOG"]: {
        ["desc"]: "Print the answers for their reuse: options or file."
      },
      ["DIR_NAME"]: {
        ["desc"]: "Dir name where the akromio data is."
      },
      ["ENV_FILE"]: {
        ["desc"]: ".env file to load when started. Relative to $DIR_NAME."
      },
      ["PRIVATE_ENV_FILE"]: {
        ["desc"]: ".private.env file to load when started. Relative to $DIRNAME."
      },
      ["APM_DIR_NAME"]: {
        ["desc"]: "Dir name where the apm catalogs are installed. Relative to $DIR_NAME."
      },
      ["JOB_CATALOGS_PATH"]: {
        ["desc"]: "Dir path to prefix when root job catalog name is relative."
      },
      ["JOB_CATALOG_NAME"]: {
        ["desc"]: "Catalog name to use when unset."
      },
      ["JOB_NAME"]: {
        ["desc"]: "Default job name to run when unset."
      },
      ["REGISTRIES"]: {
        ["desc"]: "Available registries to use in order, separated by commas."
      },
      ["REGISTRY_GIT_HOST"]: {
        ["desc"]: "Host where the Git repository is."
      },
      ["REGISTRY_GIT_USER"]: {
        ["desc"]: "User name where the Git repository is."
      },
      ["REGISTRY_GIT_REPO"]: {
        ["desc"]: "Repository name to use as registry."
      },
      ["REGISTRY_GIT_BRANCH"]: {
        ["desc"]: "Branch name to use."
      },
      ["REGISTRY_GIT_PREFIX"]: {
        ["desc"]: "Path prefix to use."
      },
      ["REGISTRY_SKYNET_PORTAL"]: {
        ["desc"]: "Skynet portal (w/o https://) to use when unset."
      },
      ["REGISTRY_SKYNET_SKYLINK"]: {
        ["desc"]: "Skylink to use when unset."
      },
      ["REGISTRY_SNS_PORTAL"]: {
        ["desc"]: "Skynet portal (w/o https://) to use when unset."
      },
      ["REGISTRY_SNS_PUBLIC_KEY"]: {
        ["desc"]: "Skynet registry public key to use when unset."
      },
      ["REGISTRY_SNS_NAME"]: {
        ["desc"]: "SNS name to use when unset."
      },
      ["REGISTRY_HTTP_HOST"]: {
        ["desc"]: "Host (w/o https://) to use when unset."
      },
      ["REGISTRY_HTTP_BASE"]: {
        ["desc"]: "Base path to prefix when HTTP registry used."
      },
      ["NODE_PATH"]: {
        ["desc"]: "Paths where the assets (plugins, catalogs...) are installed with NPM."
      }
    };
    rows = [["Variable", "Value", "Desc."], [prefix + "ARG_*", "", "The arguments to pass from environment variables."], [prefix + "ANSWER_*", "", "The answers to pass from environment variables."]];
    for (let [name, item] of Object.entries(vars)) {
      {
        var _dogma$getItem;
        name = prefix + name;
        rows.push([name, (_dogma$getItem = _core.dogma.getItem(_core.ps.env, name)) !== null && _dogma$getItem !== void 0 ? _dogma$getItem : "", item.desc]);
      }
    }
  }
  return rows;
};