"use strict";

var _core = require("@dogmalang/core");
const {
  Dataset
} = _core.dogma.use(require("@akromio/dataset"));
const ParseOpts = _core.dogma.intf('ParseOpts', {
  parentDataset: {
    optional: false,
    type: Dataset
  }
});
module.exports = exports = ParseOpts;