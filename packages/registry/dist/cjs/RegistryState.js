"use strict";

var _core = require("@dogmalang/core");
class RegistryState {
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

module.exports = exports = RegistryState;
Object.defineProperty(RegistryState, "connected", {
  value: new RegistryState("connected", 1),
  enum: true
});
Object.defineProperty(RegistryState, "disconnected", {
  value: new RegistryState("disconnected", 2),
  enum: true
});