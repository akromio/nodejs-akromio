"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["desc"]: "Returns a timestamp from a given datetime.",
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
          params.datetime = _core.dogma.getItem(args, 0);
        }
      } else if (_core.dogma.is(_, _core.text)) {
        {
          params.datetime = args;
        }
      } else {
        {
          params = args;
        }
      }
    }
    {
      const dt = params.datetime;
      if (dt != null && _core.dogma.isNot(dt, [_core.num, _core.text])) {
        _core.dogma.raise(TypeError(`timestamp.from: datetime must be nothing, num or text. Got: ${dt}.`));
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
    return `timestamp: from '${datetime}'`;
  }
}
function handle(ctx) {
  let ts; /* c8 ignore next */
  _core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    const {
      datetime
    } = params;
    {
      const _ = datetime;
      if (_core.dogma.is(_, _core.num)) {
        {
          ts = (0, _core.timestamp)(datetime).valueOf();
        }
      } else if (_core.dogma.is(_, _core.text)) {
        {
          if (_core.dogma.like(datetime, "^[0-9]{2}:[0-9]{2}$")) {
            ts = new Date([new Date().toISOString().slice(0, 10), datetime]).valueOf();
          } else {
            ts = new Date(datetime).valueOf();
          }
        }
      } else {
        {
          ts = (0, _core.timestamp)().valueOf();
        }
      }
    }
  }
  return ts;
}