"use strict";

var _core = require("@dogmalang/core");
function handleErrors(msg, err, yargs) {
  /* c8 ignore next */_core.dogma.expect("msg", msg); /* c8 ignore next */
  _core.dogma.expect("yargs", yargs);
  {
    if (err) {
      _core.dogma.raise(err);
    }
    if (_core.dogma.like(msg, "Missing required argument")) {
      (0, _core.print)("Error:", msg);
    } else if (_core.dogma.like(msg, "Not enough non-option arguments")) {
      _core.dogma.nop();
    } else if (msg.startsWith("Invalid values:")) {
      (0, _core.print)("Error:", msg);
      _core.ps.exit(1);
    } else {
      (0, _core.print)("Error:", msg);
    }
  }
}
module.exports = exports = handleErrors;