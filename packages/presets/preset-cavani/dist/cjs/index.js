"use strict";

var _core = require("@dogmalang/core");
const plugins = ["banner", "base64", "env", "exec", "file", "fs", "hbs", "http", "inc", "json", "list", "log", "merge", "path", "random", "range", "select", "set", "sleep", "text", "timestamp", "udp", "xdg", "yaml"];
module.exports = exports = {
  ["name"]: "cavani",
  ["desc"]: "Preset for the cavani tool.",
  ["tags"]: ["built-in"],
  ["plugins"]: plugins.map(name => {
    /* c8 ignore next */_core.dogma.expect("name", name);
    {
      return {
        ["plugin"]: name,
        ["impl"]: _core.dogma.use(require(`@akromio/pi-${name}`))
      };
    }
  })
};