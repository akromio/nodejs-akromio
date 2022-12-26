"use strict";

var _core = require("@dogmalang/core");
const {
  TriggerCommand: TriggerCommandBase
} = _core.dogma.use(require("@akromio/cli"));
const _StageCommand = _core.dogma.use(require("./_StageCommand"));
const $TriggerCommand = class TriggerCommand extends TriggerCommandBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore next */
    if (_StageCommand.prototype._constructor instanceof Function) _StageCommand.prototype._constructor.bind(this)(_);
    /* c8 ignore start */
    if (this._pvt_c7a10c316de4f3b6d643ae3fff2517f5___init__ instanceof Function) this._pvt_c7a10c316de4f3b6d643ae3fff2517f5___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_c7a10c316de4f3b6d643ae3fff2517f5___post__ instanceof Function) this._pvt_c7a10c316de4f3b6d643ae3fff2517f5___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_c7a10c316de4f3b6d643ae3fff2517f5___validate__ instanceof Function) this._pvt_c7a10c316de4f3b6d643ae3fff2517f5___validate__(); /* c8 ignore stop */
  }
};

_core.dogma.mixin($TriggerCommand, _StageCommand);
const TriggerCommand = new Proxy($TriggerCommand, {
  apply(receiver, self, args) {
    return new $TriggerCommand(...args);
  }
});
module.exports = exports = TriggerCommand;