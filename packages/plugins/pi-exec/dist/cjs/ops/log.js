"use strict";

var _core = require("@dogmalang/core");
const {
  spawn
} = _core.dogma.use(require("child_process"));
const buildParams = _core.dogma.use(require("./_buildParams"));
const buildTitle = _core.dogma.use(require("./_buildTitle"));
const buildOpts = _core.dogma.use(require("./_buildOpts"));
module.exports = exports = {
  ["desc"]: "Runs a command, logging the output.",
  ["title"]: buildTitle,
  ["parameterizer"]: buildParams,
  ["fun"]: handle
};
function handle(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params,
    log
  } = ctx;
  {
    let cmd;
    let args;
    if (_core.dogma.is(params.command, _core.list)) {
      cmd = _core.dogma.getItem(params.command, 0);
      args = _core.dogma.getSlice(params.command, 1, -1);
    } else {
      const segments = params.command.split((0, _core.re)(" +"));
      cmd = _core.dogma.getItem(segments, 0);
      args = _core.dogma.getSlice(segments, 1, -1);
    }
    const opts = buildOpts(params.opts);
    return (0, _core.promise)((resolve, reject) => {
      /* c8 ignore next */_core.dogma.expect("resolve", resolve); /* c8 ignore next */
      _core.dogma.expect("reject", reject);
      {
        const ps = spawn(cmd, args, opts);
        ps.on("error", error => {
          /* c8 ignore next */_core.dogma.expect("error", error);
          {
            log(error);
            reject(1);
          }
        });
        ps.stdout.on("data", out => {
          /* c8 ignore next */_core.dogma.expect("out", out);
          {
            log(out);
          }
        });
        ps.stderr.on("data", out => {
          /* c8 ignore next */_core.dogma.expect("out", out);
          {
            log(out);
          }
        });
        ps.on("exit", code => {
          /* c8 ignore next */_core.dogma.expect("code", code);
          {
            if (code == 0) {
              resolve(code);
            } else {
              reject(code);
            }
          }
        });
      }
    });
  }
}