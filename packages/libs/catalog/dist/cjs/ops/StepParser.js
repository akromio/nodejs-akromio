"use strict";

var _core = require("@dogmalang/core");
const $StepParser = class StepParser {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_c352ac55900ae765265a3c2405635983___init__ instanceof Function) this._pvt_c352ac55900ae765265a3c2405635983___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_c352ac55900ae765265a3c2405635983___post__ instanceof Function) this._pvt_c352ac55900ae765265a3c2405635983___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_c352ac55900ae765265a3c2405635983___validate__ instanceof Function) this._pvt_c352ac55900ae765265a3c2405635983___validate__(); /* c8 ignore stop */
  }
};

const StepParser = new Proxy($StepParser, {
  apply(receiver, self, args) {
    return new $StepParser(...args);
  }
});
module.exports = exports = StepParser;
StepParser.prototype.parseStep = function (decl, onError) {
  const self = this;
  let def = {}; /* c8 ignore next */
  _core.dogma.expect("decl", decl, [_core.text, _core.list, _core.map]); /* c8 ignore next */
  _core.dogma.expect("onError", onError, _core.text);
  {
    {
      const _ = decl; /*c8 ignore else*/
      if (_core.dogma.is(_, _core.text)) {
        {
          def = parseTextStep(decl, onError);
        }
      } else if (_core.dogma.is(_, _core.list)) {
        {
          def = parseListStep(decl, onError);
        }
      }
    }
  }
  return def;
};
function parseCondition(cond) {
  /* c8 ignore next */_core.dogma.expect("cond", cond, _core.text);
  {
    return cond.endsWith("?") ? _core.dogma.getSlice(cond, 0, -2) : null;
  }
}
function parseResult(result) {
  /* c8 ignore next */_core.dogma.expect("result", result, _core.text);
  {
    return (0, _core.re)("^\\$[^)]").test(result) ? _core.dogma.getSlice(result, 1, -1) : null;
  }
}
function parseOpName(name, onError) {
  let decomposition = {}; /* c8 ignore next */
  _core.dogma.expect("name", name, _core.text); /* c8 ignore next */
  _core.dogma.expect("onError", onError, _core.text);
  {
    if (name.startsWith("<")) {
      name = _core.dogma.getSlice(name, 1, -1).trim();
      decomposition.onError = "finish";
    } else {
      _core.dogma.update(decomposition, {
        name: "onError",
        visib: ".",
        assign: "=",
        value: onError
      });
    }
    decomposition.opName = name;
  }
  return decomposition;
}
function parseOpArgs(args) {
  /* c8 ignore next */if (args != null) _core.dogma.expect("args", args, _core.any);
  {
    {
      const _ = (0, _core.len)(args);
      switch (_) {
        case 0:
          {
            args = null;
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        case 1:
          {
            args = _core.dogma.getItem(args, 0);
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
      }
    }
  }
  return args;
}
function parseTextStep(decl, defaultOnError) {
  /* c8 ignore next */_core.dogma.expect("decl", decl, _core.text); /* c8 ignore next */
  _core.dogma.expect("defaultOnError", defaultOnError, _core.text);
  {
    decl = decl.split((0, _core.re)(" +"));
    let condition;
    let resultVarName;
    if (condition = parseCondition(_core.dogma.getItem(decl, 0))) {
      decl = _core.dogma.getSlice(decl, 1, -1);
    }
    if (resultVarName = parseResult(_core.dogma.getItem(decl, 0))) {
      if (_core.dogma.getItem(decl, 1) != "=") {
        _core.dogma.raise(TypeError("'=' expected after $resultVarName."));
      }
      decl = _core.dogma.getSlice(decl, 2, -1);
    }
    const {
      opName,
      onError
    } = parseOpName(_core.dogma.getItem(decl, 0), defaultOnError);
    const args = parseOpArgs(_core.dogma.getSlice(decl, 1, -1));
    return {
      ["condition"]: condition,
      ["resultVarName"]: resultVarName,
      ["opName"]: opName,
      ["args"]: args,
      ["onError"]: onError
    };
  }
}
function parseListStep(decl, defaultOnError) {
  /* c8 ignore next */_core.dogma.expect("decl", decl, _core.list); /* c8 ignore next */
  _core.dogma.expect("defaultOnError", defaultOnError, _core.text);
  {
    let condition;
    let resultVarName;
    if (condition = parseCondition(_core.dogma.getItem(decl, 0))) {
      decl = _core.dogma.getSlice(decl, 1, -1);
    }
    if (resultVarName = parseResult(_core.dogma.getItem(decl, 0))) {
      decl = _core.dogma.getSlice(decl, 1, -1);
    }
    const {
      opName,
      onError
    } = parseOpName(_core.dogma.getItem(decl, 0), defaultOnError);
    const args = parseOpArgs(_core.dogma.getSlice(decl, 1, -1));
    return {
      ["condition"]: condition,
      ["resultVarName"]: resultVarName,
      ["opName"]: opName,
      ["args"]: args,
      ["onError"]: onError
    };
  }
}