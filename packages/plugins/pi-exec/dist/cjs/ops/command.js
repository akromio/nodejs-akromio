"use strict";

var _core = require("@dogmalang/core");
const {
  exec
} = _core.dogma.use(require("child_process"));
const buildParams = _core.dogma.use(require("./_buildParams"));
const buildTitle = _core.dogma.use(require("./_buildTitle"));
const buildOpts = _core.dogma.use(require("./_buildOpts"));
module.exports = exports = {
  ["desc"]: "Runs a command.",
  ["title"]: buildTitle,
  ["parameterizer"]: buildParams,
  ["fun"]: handle
};
function handle(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    const opts = buildOpts(params.opts);
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