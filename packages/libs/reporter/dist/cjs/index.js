"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Reporters = exports.ReporterStatus = exports.Reporter = exports.LogReporter = exports.ConsoleSummaryReporter = exports.ConsoleReporter = void 0;
var _core = require("@dogmalang/core");
const Reporter = _core.dogma.use(require("./Reporter"));
exports.Reporter = Reporter;
const ReporterStatus = _core.dogma.use(require("./ReporterStatus"));
exports.ReporterStatus = ReporterStatus;
const Reporters = _core.dogma.use(require("./Reporters"));
exports.Reporters = Reporters;
const ConsoleReporter = _core.dogma.use(require("./impl/console/ConsoleReporter"));
exports.ConsoleReporter = ConsoleReporter;
const ConsoleSummaryReporter = _core.dogma.use(require("./impl/console/ConsoleSummaryReporter"));
exports.ConsoleSummaryReporter = ConsoleSummaryReporter;
const LogReporter = _core.dogma.use(require("./impl/log/LogReporter"));
exports.LogReporter = LogReporter;