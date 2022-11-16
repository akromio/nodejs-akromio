"use strict";

var _core = require("@dogmalang/core");
const {
  spawn
} = _core.dogma.use(require("child_process"));
module.exports = exports = {
  ["desc"]: "Runs a command, logging the output.",
  ["title"]: buildTitle,
  ["parameterizer"]: buildParams,
  ["fun"]: handle
};
function buildParams(args) {
  let params = {};
  {
    {
      const _ = args;
      if (_core.dogma.is(_, _core.list)) {
        {
          var _dogma$getItem;
          params.command = _core.dogma.getItem(args, 0);
          params.opts = (_dogma$getItem = _core.dogma.getItem(args, 1)) !== null && _dogma$getItem !== void 0 ? _dogma$getItem : {};
        }
      } else if (_core.dogma.is(_, _core.text)) {
        {
          params.command = args;
          params.opts = {};
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
  /* c8 ignore next */_core.dogma.expect("params", params);
  {
    return `exec: run '${params.command}'`;
  }
}
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
      args = _core.dogma.getItem(params.command, 1);
    } else {
      const segments = params.command.split((0, _core.re)(" +"));
      cmd = _core.dogma.getItem(segments, 0);
      args = _core.dogma.getSlice(segments, 1, -1);
    }
    const {
      opts
    } = params;
    if (_core.dogma.includes(opts, "workDir")) {
      opts.cwd = opts.workDir;
      (0, _core.remove)("workDir", opts);
    }
    return (0, _core.promise)((resolve, reject) => {
      /* c8 ignore next */_core.dogma.expect("resolve", resolve); /* c8 ignore next */
      _core.dogma.expect("reject", reject);
      {
        const ps = spawn(cmd, args, opts);
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