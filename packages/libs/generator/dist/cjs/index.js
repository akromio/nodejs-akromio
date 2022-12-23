"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StarterState = exports.Starter = exports.SleepStarter = exports.ConstStarter = void 0;
var _core = require("@dogmalang/core");
const StarterState = _core.dogma.use(require("./starters/StarterState"));
exports.StarterState = StarterState;
const Starter = _core.dogma.use(require("./starters/Starter"));
exports.Starter = Starter;
const SleepStarter = _core.dogma.use(require("./starters/SleepStarter"));
exports.SleepStarter = SleepStarter;
const ConstStarter = _core.dogma.use(require("./starters/ConstStarter"));
exports.ConstStarter = ConstStarter;