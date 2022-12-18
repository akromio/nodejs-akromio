"use strict";

var _core = require("@dogmalang/core");
const {
  setTimeout
} = _core.dogma.use(require("timers/promises"));
module.exports = exports = {
  ["desc"]: "Sleeps until a given datetime.",
  ["parameterizer"]: buildParams,
  ["title"]: buildTitle,
  ["fun"]: handle
};
function buildParams(args) {
  let params = {};
  {
    {
      const _ = args;
      if (_core.dogma.is(_, _core.list)) {
        {
          params.datetime = (0, _core.timestamp)(_core.dogma.getItem(args, 0));
        }
      } else if (_core.dogma.is(_, _core.text) || _core.dogma.is(_, _core.num)) {
        {
          params.datetime = (0, _core.timestamp)(args);
        }
      } else {
        {
          params.datetime = (0, _core.timestamp)(args.datetime);
        }
      }
    }
  }
  return params;
}
function buildTitle(params) {
  /* c8 ignore next */_core.dogma.expect("params", params, _core.map);
  let {
    datetime
  } = params;
  {
    return `sleep: until '${datetime}'`;
  }
}
function handle(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    const {
      datetime
    } = params;
    const delay = datetime.valueOf() - (0, _core.timestamp)().valueOf();
    return setTimeout(delay, _core.dogma.nop());
  }
}