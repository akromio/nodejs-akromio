"use strict";

var _core = require("@dogmalang/core");
const {
  Dataset
} = _core.dogma.use(require("@akromio/dataset"));
const CatalogParseOpts = _core.dogma.intf('CatalogParseOpts', {
  parentDataset: {
    optional: false,
    type: Dataset
  }
});
module.exports = exports = CatalogParseOpts;