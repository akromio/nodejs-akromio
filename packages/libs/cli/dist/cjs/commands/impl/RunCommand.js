"use strict";

var _core = require("@dogmalang/core");
const RunCommandBase = _core.dogma.use(require("../RunCommandBase"));
const $RunCommand = class RunCommand extends RunCommandBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (_['name'] != null) (0, _core.expect)('name', _['name'], _core.list); /* c8 ignore stop */
    Object.defineProperty(this, 'name', {
      value: (0, _core.coalesce)(_['name'], ["run [name]", "r"]),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_429919f6c4cad4ed48fd7ebb8e965ca4___init__ instanceof Function) this._pvt_429919f6c4cad4ed48fd7ebb8e965ca4___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_429919f6c4cad4ed48fd7ebb8e965ca4___post__ instanceof Function) this._pvt_429919f6c4cad4ed48fd7ebb8e965ca4___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_429919f6c4cad4ed48fd7ebb8e965ca4___validate__ instanceof Function) this._pvt_429919f6c4cad4ed48fd7ebb8e965ca4___validate__(); /* c8 ignore stop */
  }
};

const RunCommand = new Proxy($RunCommand, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'RunCommand' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = RunCommand;