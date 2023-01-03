"use strict";

var _core = require("@dogmalang/core");
const {
  Ops,
  CatalogParseOpts
} = _core.dogma.use(require("@akromio/catalog"));
const {
  Dataset
} = _core.dogma.use(require("@akromio/dataset"));
const JobCatalogParseOpts = _core.dogma.intf('JobCatalogParseOpts', {
  parentDataset: {
    optional: false,
    type: Dataset
  },
  ops: {
    optional: false,
    type: Ops
  }
}, CatalogParseOpts);
module.exports = exports = JobCatalogParseOpts;