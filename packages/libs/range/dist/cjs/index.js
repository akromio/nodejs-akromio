"use strict";

var _core = require("@dogmalang/core");
function range(len) {
  let seq = []; /* c8 ignore next */
  _core.dogma.expect("len", len, _core.num);
  {
    for (let i = 0; i < len; i += 1) {
      seq.push(i);
    }
  }
  return seq;
}
module.exports = exports = range;