"use strict";

var _core = require("@dogmalang/core");
function buildPluginPackageName(name) {
  /* c8 ignore next */_core.dogma.expect("name", name, _core.text);
  {
    if (!name.startsWith("@")) {
      if (!name.startsWith("pi-")) {
        name = "pi-" + name;
      }
      name = "@akromio/" + name;
    }
  }
  return name;
}
module.exports = exports = buildPluginPackageName;