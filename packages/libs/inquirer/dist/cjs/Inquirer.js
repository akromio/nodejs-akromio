"use strict";

var _core = require("@dogmalang/core");
const inquirer = _core.dogma.use(require("inquirer"));
const humanize = _core.dogma.use(require("humanize-string"));
const $Inquirer = class Inquirer {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_6238fffde8a52897aaf0113915d4b270___init__ instanceof Function) this._pvt_6238fffde8a52897aaf0113915d4b270___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_6238fffde8a52897aaf0113915d4b270___post__ instanceof Function) this._pvt_6238fffde8a52897aaf0113915d4b270___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_6238fffde8a52897aaf0113915d4b270___validate__ instanceof Function) this._pvt_6238fffde8a52897aaf0113915d4b270___validate__(); /* c8 ignore stop */
  }
};

const Inquirer = new Proxy($Inquirer, {
  apply(receiver, self, args) {
    return new $Inquirer(...args);
  }
});
module.exports = exports = Inquirer;
Inquirer.prototype.prompt = async function (questions, answers = {}) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("questions", questions, _core.dogma.TypeDef({
    name: 'inline',
    types: [_core.map],
    min: 0,
    max: null
  })); /* c8 ignore next */
  if (answers != null) _core.dogma.expect("answers", answers, _core.map);
  {
    for (const q of questions) {
      if (_core.dogma.includes(q, "input")) {
        0, await this.performInput(q, answers);
      } else if (_core.dogma.includes(q, "confirm")) {
        0, await this.performConfirm(q, answers);
      } else if (_core.dogma.includes(q, "select")) {
        0, await this.performSelect(q, answers);
      } else {
        _core.dogma.raise(Error(`Unknown question type: ${(0, _core.fmt)(q)}.`));
      }
    }
  }
  return answers;
};
Inquirer.prototype.performInput = async function (q, answers) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("q", q, _core.map); /* c8 ignore next */
  _core.dogma.expect("answers", answers, _core.map);
  {
    {
      const name = q.input;
      if (!_core.dogma.includes(answers, name)) {
        var _q$title;
        const title = (_q$title = q.title) !== null && _q$title !== void 0 ? _q$title : humanize(name);
        if (q.type == "password") {
          _core.dogma.setItem("=", answers, name, _core.dogma.getItem((0, await inquirer.prompt({
            'type': "password",
            'message': title,
            'default': q.defaultValue,
            'name': name
          })), name));
        } else {
          _core.dogma.setItem("=", answers, name, _core.dogma.getItem((0, await inquirer.prompt({
            'type': "input",
            'message': title,
            'default': q.defaultValue,
            'name': name
          })), name));
        }
      }
    }
  }
};
Inquirer.prototype.performConfirm = async function (q, answers) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("q", q, _core.map); /* c8 ignore next */
  _core.dogma.expect("answers", answers, _core.map);
  {
    {
      const name = q.confirm;
      if (!_core.dogma.includes(answers, name)) {
        var _q$title2;
        const title = (_q$title2 = q.title) !== null && _q$title2 !== void 0 ? _q$title2 : humanize(name);
        _core.dogma.setItem("=", answers, name, _core.dogma.getItem((0, await inquirer.prompt({
          'type': "confirm",
          'message': title,
          'default': q.defaultValue,
          'name': name
        })), name));
      }
    }
  }
};
Inquirer.prototype.performSelect = async function (q, answers) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("q", q, _core.map); /* c8 ignore next */
  _core.dogma.expect("answers", answers, _core.map);
  {
    {
      const name = q.select;
      if (!_core.dogma.includes(answers, name)) {
        var _q$title3;
        const title = (_q$title3 = q.title) !== null && _q$title3 !== void 0 ? _q$title3 : humanize(name);
        if (q.multiple) {
          var _q$selected;
          _core.dogma.setItem("=", answers, name, _core.dogma.getItem((0, await inquirer.prompt({
            'type': "checkbox",
            'message': title,
            'choices': q.options,
            'default': (_q$selected = q.selected) !== null && _q$selected !== void 0 ? _q$selected : q.defaultValue,
            'name': name
          })), name));
        } else {
          var _q$selected2;
          _core.dogma.setItem("=", answers, name, _core.dogma.getItem((0, await inquirer.prompt({
            'type': "list",
            'message': title,
            'choices': q.options,
            'default': (_q$selected2 = q.selected) !== null && _q$selected2 !== void 0 ? _q$selected2 : q.defaultValue,
            'name': name
          })), name));
        }
      }
    }
  }
};