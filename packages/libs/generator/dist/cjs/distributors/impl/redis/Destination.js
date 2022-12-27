"use strict";

var _core = require("@dogmalang/core");
const RedisStreamsDestination = _core.dogma.intf('RedisStreamsDestination', {
  stream: {
    optional: false,
    type: _core.text
  }
});
module.exports = exports = RedisStreamsDestination;