"use strict";

var _core = require("@dogmalang/core");
const color = _core.dogma.use(require("chalk"));
module.exports = exports = {
  ["echo"]: _core.echo,
  ["print"]: _core.print,
  ["indent"]: "  ",
  ["simple"]: {
    ["prefix"]: "-"
  },
  ["composite"]: {
    ["prefix"]: ">",
    ["title"]: {
      ["color"]: color.yellow
    }
  },
  ["log"]: {
    ["startSymbol"]: "⬎",
    ["endSymbol"]: "↳",
    ["color"]: color.italic.gray
  },
  ["ok"]: {
    ["color"]: color.green
  },
  ["failed"]: {
    ["color"]: color.red
  }
};