"use strict";

var _core = require("@dogmalang/core");
const {
  exec
} = _core.dogma.use(require("child_process"));
module.exports = exports = {
  ["desc"]: "Runs a command.",
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
          if ((0, _core.len)(args) == 2 && _core.dogma.is(_core.dogma.getItem(args, -1), _core.map)) {
            var _dogma$getItem;
            params.command = _core.dogma.getItem(args, 0);
            params.opts = (_dogma$getItem = _core.dogma.getItem(args, 1)) !== null && _dogma$getItem !== void 0 ? _dogma$getItem : {};
          } else {
            params.command = args.join(" ");
            params.opts = {};
          }
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
    params
  } = ctx;
  {
    const {
      opts
    } = params;
    if (_core.dogma.includes(opts, "workDir")) {
      opts.cwd = opts.workDir;
      (0, _core.remove)("workDir", opts);
    }
    const {
      command
    } = params;
    return (0, _core.promise)((resolve, reject) => {
      /* c8 ignore next */_core.dogma.expect("resolve", resolve); /* c8 ignore next */
      _core.dogma.expect("reject", reject);
      {
        exec(command, opts, (err, stdout, stderr) => {
          /* c8 ignore next */_core.dogma.expect("stdout", stdout); /* c8 ignore next */
          _core.dogma.expect("stderr", stderr);
          {
            if (err) {
              return reject(err);
            }
            resolve({
              ["stdout"]: stdout,
              ["stderr"]: stderr
            });
          }
        });
      }
    });
  }
}