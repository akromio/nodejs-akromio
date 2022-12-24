"use strict";

var _core = require("@dogmalang/core");
const Stage = _core.dogma.use(require("./Stage"));
const JobInfo = _core.dogma.intf('JobInfo', {
  registry: {
    optional: false,
    type: _core.text
  },
  catalog: {
    optional: false,
    type: _core.text
  },
  job: {
    optional: false,
    type: _core.text
  },
  args: {
    optional: true,
    type: _core.any
  },
  weight: {
    optional: false,
    type: _core.num
  }
});
const ConstStage = _core.dogma.intf('ConstStage', {
  interval: {
    optional: false,
    type: _core.num
  },
  requests: {
    optional: false,
    type: _core.num
  },
  jobs: {
    optional: false,
    type: _core.dogma.TypeDef({
      name: 'inline',
      types: [JobInfo],
      min: 0,
      max: null
    })
  }
}, Stage);
module.exports = exports = ConstStage;