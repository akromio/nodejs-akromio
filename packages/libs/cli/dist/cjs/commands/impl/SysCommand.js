"use strict";

var _core = require("@dogmalang/core");
const os = _core.dogma.use(require("os"));
const process = _core.dogma.use(require("process"));
const Command = _core.dogma.use(require("../Command"));
const $SysCommand = class SysCommand extends Command {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (_['name'] != null) (0, _core.expect)('name', _['name'], _core.list); /* c8 ignore stop */
    Object.defineProperty(this, 'name', {
      value: (0, _core.coalesce)(_['name'], ["sys", "s"]),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['desc'] != null) (0, _core.expect)('desc', _['desc'], _core.text); /* c8 ignore stop */
    Object.defineProperty(this, 'desc', {
      value: (0, _core.coalesce)(_['desc'], "Show the system info."),
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
    if (this._pvt_18983620740bcc0025576ac01b0a1124___init__ instanceof Function) this._pvt_18983620740bcc0025576ac01b0a1124___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_18983620740bcc0025576ac01b0a1124___post__ instanceof Function) this._pvt_18983620740bcc0025576ac01b0a1124___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_18983620740bcc0025576ac01b0a1124___validate__ instanceof Function) this._pvt_18983620740bcc0025576ac01b0a1124___validate__(); /* c8 ignore stop */
  }
};

const SysCommand = new Proxy($SysCommand, {
  apply(receiver, self, args) {
    return new $SysCommand(...args);
  }
});
module.exports = exports = SysCommand;
SysCommand.prototype.handle = function (argv) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("argv", argv, _core.map);
  let {
    pattern
  } = argv;
  {
    (0, _core.printf)("OS: %s (%s) %s", process.platform, os.release(), os.version());
    (0, _core.print)("Arch:", process.arch);
    (0, _core.print)("Node.js:", process.version);
  }
};