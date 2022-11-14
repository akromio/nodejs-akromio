"use strict";

var _core = require("@dogmalang/core");
const {
  QuestionsCommand: QuestionsCommandBase
} = _core.dogma.use(require("@akromio/cli"));
const _JobCommand = _core.dogma.use(require("./_JobCommand"));
const $QuestionsCommand = class QuestionsCommand extends QuestionsCommandBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore next */
    if (_JobCommand.prototype._constructor instanceof Function) _JobCommand.prototype._constructor.bind(this)(_);
    /* c8 ignore start */
    if (this._pvt_60bdb0470d1e8f86249245b18252b486___init__ instanceof Function) this._pvt_60bdb0470d1e8f86249245b18252b486___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_60bdb0470d1e8f86249245b18252b486___post__ instanceof Function) this._pvt_60bdb0470d1e8f86249245b18252b486___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_60bdb0470d1e8f86249245b18252b486___validate__ instanceof Function) this._pvt_60bdb0470d1e8f86249245b18252b486___validate__(); /* c8 ignore stop */
  }
};

_core.dogma.mixin($QuestionsCommand, _JobCommand);
const QuestionsCommand = new Proxy($QuestionsCommand, {
  apply(receiver, self, args) {
    return new $QuestionsCommand(...args);
  }
});
module.exports = exports = QuestionsCommand;