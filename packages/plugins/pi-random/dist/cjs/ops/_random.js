"use strict";

var _core = require("@dogmalang/core");
function _random(start, stop) {
  /* c8 ignore next */_core.dogma.expect("start", start, _core.num); /* c8 ignore next */
  _core.dogma.expect("stop", stop, _core.num);
  {
    return Math.ceil(Math.random() * (stop - start)) + start;
  }
}
module.exports = exports = _random;