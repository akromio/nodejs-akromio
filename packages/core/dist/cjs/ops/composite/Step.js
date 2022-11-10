"use strict";

var _core = require("@dogmalang/core");
const Op = _core.dogma.use(require("../Op"));
const Step = _core.dogma.intf('Step', {
  title: {
    optional: true,
    type: _core.text
  },
  op: {
    optional: false,
    type: Op
  },
  args: {
    optional: true,
    type: _core.any
  },
  resultVarName: {
    optional: true,
    type: _core.text
  },
  resultLog: {
    optional: true,
    type: _core.bool
  },
  onError: {
    optional: false,
    type: ["carryOn", "finish"]
  },
  quiet: {
    optional: true,
    type: _core.bool
  },
  condition: {
    optional: true,
    type: _core.text
  }
});
module.exports = exports = Step;