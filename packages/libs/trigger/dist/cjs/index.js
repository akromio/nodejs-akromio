"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggerState = exports.Trigger = void 0;
var _core = require("@dogmalang/core");
const Trigger = _core.dogma.use(require("./Trigger"));
exports.Trigger = Trigger;
const TriggerState = _core.dogma.use(require("./TriggerState"));
exports.TriggerState = TriggerState;