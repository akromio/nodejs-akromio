"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StarterState = exports.Starter = exports.SleepStarter = exports.RunReqStream = exports.RunReq = exports.Ring = exports.RedisStreamsDistributor = exports.RandomAssigner = exports.IncStarter = exports.Distributors = exports.DistributorBase = exports.Distributor = exports.ConstStarter = exports.ConsoleDistributor = exports.BlankSheetStream = exports.Assigner = void 0;
var _core = require("@dogmalang/core");
const BlankSheetStream = _core.dogma.use(require("./starters/BlankSheetStream"));
exports.BlankSheetStream = BlankSheetStream;
const StarterState = _core.dogma.use(require("./starters/StarterState"));
exports.StarterState = StarterState;
const Starter = _core.dogma.use(require("./starters/Starter"));
exports.Starter = Starter;
const SleepStarter = _core.dogma.use(require("./starters/impl/sleep/SleepStarter"));
exports.SleepStarter = SleepStarter;
const ConstStarter = _core.dogma.use(require("./starters/impl/const/ConstStarter"));
exports.ConstStarter = ConstStarter;
const IncStarter = _core.dogma.use(require("./starters/impl/inc/IncStarter"));
exports.IncStarter = IncStarter;
const Ring = _core.dogma.use(require("./ring/Ring"));
exports.Ring = Ring;
const Assigner = _core.dogma.use(require("./assigners/Assigner"));
exports.Assigner = Assigner;
const RunReq = _core.dogma.use(require("./assigners/RunReq"));
exports.RunReq = RunReq;
const RunReqStream = _core.dogma.use(require("./assigners/RunReqStream"));
exports.RunReqStream = RunReqStream;
const RandomAssigner = _core.dogma.use(require("./assigners/impl/random/RandomAssigner"));
exports.RandomAssigner = RandomAssigner;
const Distributor = _core.dogma.use(require("./distributors/Distributor"));
exports.Distributor = Distributor;
const Distributors = _core.dogma.use(require("./distributors/Distributors"));
exports.Distributors = Distributors;
const DistributorBase = _core.dogma.use(require("./distributors/impl/DistributorBase"));
exports.DistributorBase = DistributorBase;
const ConsoleDistributor = _core.dogma.use(require("./distributors/impl/console/ConsoleDistributor"));
exports.ConsoleDistributor = ConsoleDistributor;
const RedisStreamsDistributor = _core.dogma.use(require("./distributors/impl/redis/RedisStreamsDistributor"));
exports.RedisStreamsDistributor = RedisStreamsDistributor;