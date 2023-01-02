"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StageParser = exports.StageCatalogParser = exports.StageCatalogMerger = exports.SleepStage = exports.IncStage = exports.ConstStage = void 0;
var _core = require("@dogmalang/core");
const StageCatalogMerger = _core.dogma.use(require("./catalog/merger/StageCatalogMerger"));
exports.StageCatalogMerger = StageCatalogMerger;
const StageCatalogParser = _core.dogma.use(require("./catalog/parser/StageCatalogParser"));
exports.StageCatalogParser = StageCatalogParser;
const StageParser = _core.dogma.use(require("./stages/StageParser"));
exports.StageParser = StageParser;
const ConstStage = _core.dogma.use(require("./stages/ConstStage"));
exports.ConstStage = ConstStage;
const IncStage = _core.dogma.use(require("./stages/IncStage"));
exports.IncStage = IncStage;
const SleepStage = _core.dogma.use(require("./stages/SleepStage"));
exports.SleepStage = SleepStage;