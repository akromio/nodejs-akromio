"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const TriggeredJobCatalogMerger = _core.dogma.use(require("./TriggeredJobCatalogMerger"));
suite(__filename, () => {
  {
    const merger = TriggeredJobCatalogMerger();
  }
});