"use strict";

var _core = require("@dogmalang/core");
const {
  readFile
} = _core.dogma.use(require("fs/promises"));
const yaml = _core.dogma.use(require("yaml"));
const Command = _core.dogma.use(require("../Command"));
const $EncodeCommand = class EncodeCommand extends Command {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (_['name'] != null) (0, _core.expect)('name', _['name'], _core.list); /* c8 ignore stop */
    Object.defineProperty(this, 'name', {
      value: (0, _core.coalesce)(_['name'], ["encode <filePath>"]),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['desc'] != null) (0, _core.expect)('desc', _['desc'], _core.text); /* c8 ignore stop */
    Object.defineProperty(this, 'desc', {
      value: (0, _core.coalesce)(_['desc'], "Encodes data to json or json+base64."),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['positionals'] != null) (0, _core.expect)('positionals', _['positionals'], _core.map); /* c8 ignore stop */
    Object.defineProperty(this, 'positionals', {
      value: (0, _core.coalesce)(_['positionals'], {
        ["filePath"]: {
          ["type"]: "string",
          ["desc"]: "File path to encode."
        }
      }),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['options'] != null) (0, _core.expect)('options', _['options'], _core.map); /* c8 ignore stop */
    Object.defineProperty(this, 'options', {
      value: (0, _core.coalesce)(_['options'], {
        ["format"]: {
          ["alias"]: ["f", "fmt"],
          ["desc"]: "Format to encode.",
          ["choices"]: ["json", "json+base64"],
          ["default"]: "json+base64"
        },
        ["property"]: {
          ["alias"]: ["p", "prop"],
          ["desc"]: "Property to encode.",
          ["type"]: "string"
        },
        ["envVarArg"]: {
          ["alias"]: ["a"],
          ["desc"]: "If -p, show content as KRM_ARG_property.",
          ["type"]: "boolean",
          ["default"]: false
        },
        ["envVarArgs"]: {
          ["alias"]: ["A"],
          ["desc"]: "Show each property of the content as KRM_ARG_*.",
          ["type"]: "boolean",
          ["default"]: false
        },
        ["export"]: {
          ["alias"]: ["x", "xport"],
          ["desc"]: "If KRM_ARG_*, add export to the output. It sets -a or -A.",
          ["type"]: "boolean",
          ["default"]: false
        }
      }),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_bd2c3f928f499bdcefcdaa8516ba92a6___init__ instanceof Function) this._pvt_bd2c3f928f499bdcefcdaa8516ba92a6___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_bd2c3f928f499bdcefcdaa8516ba92a6___post__ instanceof Function) this._pvt_bd2c3f928f499bdcefcdaa8516ba92a6___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_bd2c3f928f499bdcefcdaa8516ba92a6___validate__ instanceof Function) this._pvt_bd2c3f928f499bdcefcdaa8516ba92a6___validate__(); /* c8 ignore stop */
  }
};

const EncodeCommand = new Proxy($EncodeCommand, {
  apply(receiver, self, args) {
    return new $EncodeCommand(...args);
  }
});
module.exports = exports = EncodeCommand;
EncodeCommand.prototype.handle = async function (argv) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("argv", argv, _core.map);
  let {
    filePath,
    format,
    prop,
    envVarArg,
    envVarArgs,
    xport
  } = argv;
  {
    let content = (0, await readFile(filePath, "utf-8"));
    if (filePath.endsWith("yaml")) {
      content = yaml.parse(content);
    } else {
      content = _core.json.decode(content);
    }
    if (xport) {
      if (prop) {
        envVarArg = true;
      } else {
        envVarArgs = true;
      }
    }
    if (envVarArg && prop) {
      printContentAsEnvVarArg(_core.dogma.getItem(content, prop), prop, format, xport);
    } else if (envVarArgs) {
      printContentAsEnvVarArgs(content, format, xport);
    } else {
      printContent("", content, format);
    }
  }
};
function printContent(prefix, content, format) {
  /* c8 ignore next */_core.dogma.expect("prefix", prefix, _core.text); /* c8 ignore next */
  _core.dogma.expect("content", content, _core.any); /* c8 ignore next */
  _core.dogma.expect("format", format, _core.text);
  {
    content = _core.json.encode(content);
    if (format == "json+base64") {
      content = Buffer.from(content).toString("base64");
    }
    (0, _core.print)(`${prefix}${format}://${content}`);
  }
}
function printContentAsEnvVarArg(content, arg, format, xport) {
  /* c8 ignore next */_core.dogma.expect("content", content, _core.any); /* c8 ignore next */
  _core.dogma.expect("arg", arg, _core.text); /* c8 ignore next */
  _core.dogma.expect("format", format, _core.text); /* c8 ignore next */
  _core.dogma.expect("xport", xport, _core.bool);
  {
    const prefix = xport ? "export " : "";
    printContent(`${prefix}KRM_ARG_${arg}=`, content, format);
  }
}
function printContentAsEnvVarArgs(content, format, xport) {
  /* c8 ignore next */_core.dogma.expect("content", content, _core.map); /* c8 ignore next */
  _core.dogma.expect("format", format, _core.text); /* c8 ignore next */
  _core.dogma.expect("xport", xport, _core.bool);
  {
    for (const [prop, value] of Object.entries(content)) {
      {
        printContentAsEnvVarArg(_core.dogma.getItem(content, prop), prop, format, xport);
      }
    }
  }
}