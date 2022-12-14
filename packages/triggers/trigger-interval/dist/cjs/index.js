"use strict";

var _core = require("@dogmalang/core");
const IntervalTriggerImpl = _core.dogma.use(require("./IntervalTriggerImpl"));
module.exports = exports = {
  ["name"]: "interval",
  ["desc"]: "Trigger for firing an event at intervals.",
  ["impl"]: IntervalTriggerImpl
};