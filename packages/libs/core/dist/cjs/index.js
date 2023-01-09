"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StaticAction = exports.SingleRunnerEngine = exports.SimpleOperator = exports.SimpleOp = exports.ScriptOperator = exports.Script = exports.Runner = exports.Result = exports.Plugins = exports.PluginParser = exports.PluginLoader = exports.Plugin = exports.Ops = exports.Op = exports.NotFoundError = exports.MacroOperator = exports.Engine = exports.DynamicMacro = exports.DynamicCo = exports.Context = exports.CompositeOperator = exports.CompositeOp = exports.CoOperator = exports.CallReqStream = exports.CallReq = exports.Call = exports.ActionOperator = exports.Action = void 0;
var _core = require("@dogmalang/core");
const CallReq = _core.dogma.use(require("./CallReq"));
exports.CallReq = CallReq;
const CallReqStream = _core.dogma.use(require("./CallReqStream"));
exports.CallReqStream = CallReqStream;
const NotFoundError = _core.dogma.use(require("./errors/NotFoundError"));
exports.NotFoundError = NotFoundError;
const Ops = _core.dogma.use(require("./ops/Ops"));
exports.Ops = Ops;
const Op = _core.dogma.use(require("./ops/Op"));
exports.Op = Op;
const Result = _core.dogma.use(require("./ops/Result"));
exports.Result = Result;
const Call = _core.dogma.use(require("./ops/Call"));
exports.Call = Call;
const Context = _core.dogma.use(require("./ops/Context"));
exports.Context = Context;
const Plugin = _core.dogma.use(require("./plugins/Plugin"));
exports.Plugin = Plugin;
const Plugins = _core.dogma.use(require("./plugins/Plugins"));
exports.Plugins = Plugins;
const PluginParser = _core.dogma.use(require("./plugins/PluginParser"));
exports.PluginParser = PluginParser;
const PluginLoader = _core.dogma.use(require("./plugins/PluginLoader"));
exports.PluginLoader = PluginLoader;
const SimpleOp = _core.dogma.use(require("./ops/simple/SimpleOp"));
exports.SimpleOp = SimpleOp;
const SimpleOperator = _core.dogma.use(require("./ops/simple/SimpleOperator"));
exports.SimpleOperator = SimpleOperator;
const Action = _core.dogma.use(require("./ops/simple/action/Action"));
exports.Action = Action;
const StaticAction = _core.dogma.use(require("./ops/simple/action/StaticAction"));
exports.StaticAction = StaticAction;
const ActionOperator = _core.dogma.use(require("./ops/simple/action/ActionOperator"));
exports.ActionOperator = ActionOperator;
const Script = _core.dogma.use(require("./ops/simple/script/Script"));
exports.Script = Script;
const ScriptOperator = _core.dogma.use(require("./ops/simple/script/ScriptOperator"));
exports.ScriptOperator = ScriptOperator;
const CompositeOp = _core.dogma.use(require("./ops/composite/CompositeOp"));
exports.CompositeOp = CompositeOp;
const CompositeOperator = _core.dogma.use(require("./ops/composite/CompositeOperator"));
exports.CompositeOperator = CompositeOperator;
const DynamicCo = _core.dogma.use(require("./ops/composite/co/DynamicCo"));
exports.DynamicCo = DynamicCo;
const CoOperator = _core.dogma.use(require("./ops/composite/co/CoOperator"));
exports.CoOperator = CoOperator;
const DynamicMacro = _core.dogma.use(require("./ops/composite/macro/DynamicMacro"));
exports.DynamicMacro = DynamicMacro;
const MacroOperator = _core.dogma.use(require("./ops/composite/macro/MacroOperator"));
exports.MacroOperator = MacroOperator;
const Engine = _core.dogma.use(require("./engines/Engine"));
exports.Engine = Engine;
const Runner = _core.dogma.use(require("./engines/Runner"));
exports.Runner = Runner;
const SingleRunnerEngine = _core.dogma.use(require("./engines/SingleRunnerEngine"));
exports.SingleRunnerEngine = SingleRunnerEngine;