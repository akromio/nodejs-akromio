"use strict";

var _core = require("@dogmalang/core");
const RedisStreamsTriggerImpl = _core.dogma.use(require("./RedisStreamsTriggerImpl"));
module.exports = exports = {
  ["name"]: "redisstreams",
  ["desc"]: "Trigger for firing an event reading from a Redis Streams stream.",
  ["impl"]: RedisStreamsTriggerImpl
};