"use strict";

var _core = require("@dogmalang/core");
const RedisPubSubTriggerImpl = _core.dogma.use(require("./RedisPubSubTriggerImpl"));
module.exports = exports = {
  ["name"]: "redispubsub",
  ["desc"]: "Trigger for firing an event reading from a Redis Pub/Sub channel.",
  ["impl"]: RedisPubSubTriggerImpl
};