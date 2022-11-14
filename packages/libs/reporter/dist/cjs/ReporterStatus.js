"use strict";

var _core = require("@dogmalang/core");
class ReporterStatus {
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

module.exports = exports = ReporterStatus;
Object.defineProperty(ReporterStatus, "initialized", {
  value: new ReporterStatus("initialized", 1),
  enum: true
});
Object.defineProperty(ReporterStatus, "started", {
  value: new ReporterStatus("started", 2),
  enum: true
});
Object.defineProperty(ReporterStatus, "ended", {
  value: new ReporterStatus("ended", 3),
  enum: true
});