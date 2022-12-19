"use strict";

var _core = require("@dogmalang/core");
const random = _core.dogma.use(require("./_random"));
module.exports = exports = {
  ["desc"]: "Generates a random text.",
  ["parameterizer"]: buildParams,
  ["title"]: buildTitle,
  ["fun"]: handle
};
const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789";
function buildParams(args) {
  let params = {};
  {
    let min;
    let max;
    {
      const _ = args;
      if (_core.dogma.is(_, _core.text)) {
        {
          min = max = args;
        }
      } else if (_core.dogma.is(_, _core.list)) {
        {
          {
            const _ = (0, _core.len)(args);
            switch (_) {
              case 1:
                {
                  min = max = _core.dogma.getItem(args, 0);
                } /* c8 ignore start */
                break;
              /* c8 ignore stop */
              case 2:
                {
                  [min, max] = _core.dogma.getArrayToUnpack(args, 2);
                } /* c8 ignore start */
                break;
              /* c8 ignore stop */
            }
          }
        }
      } else {
        {
          ({
            min: min,
            max: max
          } = args);
        }
      }
    }
    _core.dogma.update(params, {
      name: "min",
      visib: ".",
      assign: "=",
      value: (0, _core.num)(min)
    }, {
      name: "max",
      visib: ".",
      assign: "=",
      value: (0, _core.num)(max)
    });
  }
  return params;
}
function buildTitle(params) {
  /* c8 ignore next */_core.dogma.expect("params", params, _core.map);
  let {
    min,
    max
  } = params;
  {
    return `random: text with len between ${min} and ${max}`;
  }
}
function handle(ctx) {
  let txt = ""; /* c8 ignore next */
  _core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    const size = random(params.min, params.max);
    for (let i = 0; i < size; i += 1) {
      txt += _core.dogma.getItem(alphabet, random(0, (0, _core.len)(alphabet) - 1));
    }
  }
  return txt;
}