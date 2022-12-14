"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["desc"]: "Returns the current timestamp.",
  ["title"]: "timestamp: now",
  ["fun"]: handler
};
function handler() {
  {
    return (0, _core.timestamp)().valueOf();
  }
}