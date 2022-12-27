"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ms = ms;
var _core = require("@dogmalang/core");
const milliseconds = _core.dogma.use(require("ms"));
function ms(interval) {
  /* c8 ignore next */_core.dogma.expect("interval", interval, [_core.text, _core.num]);
  {
    return _core.dogma.is(interval, _core.num) ? interval : milliseconds(interval);
  }
}