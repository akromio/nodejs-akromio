"use strict";

var _core = require("@dogmalang/core");
const {
  Writable
} = _core.dogma.use(require("stream"));
const {
  Dataset
} = _core.dogma.use(require("@akromio/dataset"));
const Call = _core.dogma.use(require("./Call"));
const CallOpts = _core.dogma.intf('CallOpts', {
  parentCall: {
    optional: true,
    type: Call
  },
  title: {
    optional: true,
    type: _core.text
  },
  dataset: {
    optional: false,
    type: Dataset
  },
  log: {
    optional: false,
    type: Writable
  },
  onError: {
    optional: true,
    type: ["finish", "carryOn"]
  }
});
module.exports = exports = CallOpts;