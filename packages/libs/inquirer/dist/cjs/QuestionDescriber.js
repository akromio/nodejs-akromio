"use strict";

var _core = require("@dogmalang/core");
const $QuestionDescriber = class QuestionDescriber {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_aee2644fcfd10592733b9a46afab4c4f___init__ instanceof Function) this._pvt_aee2644fcfd10592733b9a46afab4c4f___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_aee2644fcfd10592733b9a46afab4c4f___post__ instanceof Function) this._pvt_aee2644fcfd10592733b9a46afab4c4f___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_aee2644fcfd10592733b9a46afab4c4f___validate__ instanceof Function) this._pvt_aee2644fcfd10592733b9a46afab4c4f___validate__(); /* c8 ignore stop */
  }
};

const QuestionDescriber = new Proxy($QuestionDescriber, {
  apply(receiver, self, args) {
    return new $QuestionDescriber(...args);
  }
});
module.exports = exports = QuestionDescriber;
QuestionDescriber.prototype.describe = function (questions) {
  const self = this;
  let data = {}; /* c8 ignore next */
  _core.dogma.expect("questions", questions, _core.dogma.TypeDef({
    name: 'inline',
    types: [_core.map],
    min: 0,
    max: null
  }));
  {
    for (const q of questions) {
      /*c8 ignore else*/if (_core.dogma.includes(q, "input")) {
        _core.dogma.setItem("=", data, q.input, {
          ["type"]: "input",
          ["title"]: q.title,
          ["defaultValue"]: q.defaultValue
        });
      } else if (_core.dogma.includes(q, "select")) {
        var _q$selected;
        _core.dogma.setItem("=", data, q.select, {
          ["type"]: "select" + (q.multiple ? "[]" : ""),
          ["title"]: q.title,
          ["defaultValue"]: (_q$selected = q.selected) !== null && _q$selected !== void 0 ? _q$selected : q.defaultValue,
          ["options"]: q.options
        });
      } else if (_core.dogma.includes(q, "confirm")) {
        _core.dogma.setItem("=", data, q.confirm, {
          ["type"]: "confirm",
          ["title"]: q.title,
          ["defaultValue"]: q.defaultValue
        });
      }
    }
  }
  return data;
};