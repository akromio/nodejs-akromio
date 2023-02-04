"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const plugin = _core.dogma.use(require("@akromio/expected-path"));
expected.plugin(plugin);