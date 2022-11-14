"use strict";

var _core = require("@dogmalang/core");
const Connector = _core.dogma.intf('Connector', {
  connect: {
    optional: false,
    type: _core.func
  },
  disconnect: {
    optional: false,
    type: _core.func
  },
  getItem: {
    optional: false,
    type: _core.func
  },
  downloadItem: {
    optional: true,
    type: _core.func
  },
  listItems: {
    optional: true,
    type: _core.func
  }
});
module.exports = exports = Connector;