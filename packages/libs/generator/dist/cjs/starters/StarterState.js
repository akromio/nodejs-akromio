"use strict";

var _core = require("@dogmalang/core");
class StarterState {
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

module.exports = exports = StarterState;
Object.defineProperty(StarterState, "created", {
  value: new StarterState("created", 1),
  enum: true
});
Object.defineProperty(StarterState, "idle", {
  value: new StarterState("idle", 2),
  enum: true
});
Object.defineProperty(StarterState, "busy", {
  value: new StarterState("busy", 3),
  enum: true
});
Object.defineProperty(StarterState, "stopped", {
  value: new StarterState("stopped", 4),
  enum: true
});