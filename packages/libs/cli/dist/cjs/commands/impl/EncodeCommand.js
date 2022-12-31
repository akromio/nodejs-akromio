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
    prop
  } = argv;
  {
    let content = (0, await readFile(filePath, "utf-8"));
    if (filePath.endsWith("yaml")) {
      content = yaml.parse(content);
    } else {
      content = _core.json.decode(content);
    }
    if (prop) {
      content = _core.dogma.getItem(content, prop);
    }
    content = _core.json.encode(content);
    if (format == "json+base64") {
      content = Buffer.from(content).toString("base64");
    }
    (0, _core.print)(content);
  }
};