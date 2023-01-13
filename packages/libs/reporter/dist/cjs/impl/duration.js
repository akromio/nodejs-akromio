"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fmtDuration = void 0;
var _core = require("@dogmalang/core");
const duration = _core.dogma.use(require("humanize-duration"));
const fmtDuration = duration.humanizer({
  ["language"]: "short",
  ["languages"]: {
    ["short"]: {
      ["m"]: () => {
        {
          return "m";
        }
      },
      ["s"]: () => {
        {
          return "s";
        }
      }
    }
  }
});
exports.fmtDuration = fmtDuration;