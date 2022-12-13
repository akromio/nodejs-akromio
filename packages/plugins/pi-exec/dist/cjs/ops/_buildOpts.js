"use strict";

var _core = require("@dogmalang/core");
function buildOpts(opts) {
  /* c8 ignore next */_core.dogma.expect("opts", opts, _core.map);
  {
    opts = _core.dogma.copy(opts);
    if (_core.dogma.includes(opts, "workDir")) {
      opts.cwd = opts.workDir;
      (0, _core.remove)("workDir", opts);
    }
  }
  return opts;
}
module.exports = exports = buildOpts;