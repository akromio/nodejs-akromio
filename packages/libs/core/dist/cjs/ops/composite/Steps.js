"use strict";

var _core = require("@dogmalang/core");
const Step = _core.dogma.use(require("./Step"));
const Steps = _core.dogma.TypeDef({
  name: 'Steps',
  types: [Step],
  min: 0,
  max: null
});
module.exports = exports = Steps;