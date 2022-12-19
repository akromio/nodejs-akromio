"use strict";

var _core = require("@dogmalang/core");
const dgram = _core.dogma.use(require("dgram"));
module.exports = exports = {
  ["desc"]: "Sends a datagram.",
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
          params.msg = _core.dogma.getItem(args, 0);
          params.addr = _core.dogma.getItem(args, 1);
          params.port = _core.dogma.getItem(args, 2);
        }
      } else {
        {
          params = args;
        }
      }
    }
  }
  return params;
}
function buildTitle(params) {
  /* c8 ignore next */_core.dogma.expect("params", params, _core.map);
  let {
    addr,
    port
  } = params;
  {
    return `udp: send to '${addr}:${port}'`;
  }
}
function handle(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    const {
      msg,
      addr,
      port
    } = params;
    const opts = {
      ["type"]: "udp4"
    };
    const socket = dgram.createSocket(opts);
    socket.send(msg, (0, _core.num)(port), addr, () => {
      {
        socket.close();
      }
    });
  }
}