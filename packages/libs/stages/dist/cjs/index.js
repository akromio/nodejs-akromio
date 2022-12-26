"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StageParser = exports.StageCatalogParser = exports.StageCatalogMerger = void 0;
var _core = require("@dogmalang/core");
const StageCatalogMerger = _core.dogma.use(require("./catalog/merger/StageCatalogMerger"));
exports.StageCatalogMerger = StageCatalogMerger;
const StageCatalogParser = _core.dogma.use(require("./catalog/parser/StageCatalogParser"));
exports.StageCatalogParser = StageCatalogParser;
const StageParser = _core.dogma.use(require("./stages/StageParser"));
exports.StageParser = StageParser;