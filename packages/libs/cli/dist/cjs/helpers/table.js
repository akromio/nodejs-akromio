"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tableOpts = exports.table = void 0;
var _core = require("@dogmalang/core");
const {
  table
} = _core.dogma.use(require("table"));
exports.table = table;
const tableOpts = {
  ["border"]: {
    ["topBody"]: "",
    ["topJoin"]: "",
    ["topLeft"]: "",
    ["topRight"]: "",
    ["bottomBody"]: "",
    ["bottomJoin"]: "",
    ["bottomLeft"]: "",
    ["bottomRight"]: "",
    ["bodyLeft"]: "",
    ["bodyRight"]: "",
    ["bodyJoin"]: "",
    ["joinBody"]: "-",
    ["joinLeft"]: "",
    ["joinRight"]: "",
    ["joinJoin"]: ""
  },
  ["drawHorizontalLine"]: ix => {
    /* c8 ignore next */_core.dogma.expect("ix", ix);
    {
      return ix == 1;
    }
  }
};
exports.tableOpts = tableOpts;