"use strict";

var _core = require("@dogmalang/core");
class TriggerState {
  constructor(name, val) {
    Object.defineProperty(this, "name", {
      value: name,
      enum: true
    });
    Object.defineProperty(this, "value", {
      value: val,
      enum: true
    });
  }

  /* c8 ignore start */
  toString() {
    return this.name;
  }
  /* c8 ignore stop */
}

module.exports = exports = TriggerState;
Object.defineProperty(TriggerState, "nonStarted", {
  value: new TriggerState("nonStarted", 1),
  enum: true
});
Object.defineProperty(TriggerState, "started", {
  value: new TriggerState("started", 2),
  enum: true
});
Object.defineProperty(TriggerState, "running", {
  value: new TriggerState("running", 3),
  enum: true
});
Object.defineProperty(TriggerState, "stopped", {
  value: new TriggerState("stopped", 4),
  enum: true
});