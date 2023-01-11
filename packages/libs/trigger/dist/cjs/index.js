"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggerState = exports.Trigger = exports.PushTrigger = exports.PullTrigger = void 0;
var _core = require("@dogmalang/core");
const Trigger = _core.dogma.use(require("./Trigger"));
exports.Trigger = Trigger;
const TriggerState = _core.dogma.use(require("./TriggerState"));
exports.TriggerState = TriggerState;
const PullTrigger = _core.dogma.use(require("./PullTrigger"));
exports.PullTrigger = PullTrigger;
const PushTrigger = _core.dogma.use(require("./PushTrigger"));
exports.PushTrigger = PushTrigger;