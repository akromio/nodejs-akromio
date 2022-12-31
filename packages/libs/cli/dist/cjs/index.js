"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tableOpts = exports.table = exports.handleErrors = exports.createCommands = exports.TriggerCommand = exports.SysCommand = exports.ShowCommand = exports.RunCommand = exports.RegistryCommandBase = exports.RegistryCommand = exports.QuestionsCommand = exports.JobRunCommand = exports.EnvCommand = exports.EncodeCommand = exports.DescCommand = exports.DatasetCommand = exports.Command = exports.CatalogCommand = void 0;
var _core = require("@dogmalang/core");
const {
  table,
  tableOpts
} = _core.dogma.use(require("./helpers/table"));
exports.tableOpts = tableOpts;
exports.table = table;
const Command = _core.dogma.use(require("./commands/Command"));
exports.Command = Command;
const RegistryCommandBase = _core.dogma.use(require("./commands/RegistryCommandBase"));
exports.RegistryCommandBase = RegistryCommandBase;
const CatalogCommand = _core.dogma.use(require("./commands/impl/CatalogCommand"));
exports.CatalogCommand = CatalogCommand;
const DatasetCommand = _core.dogma.use(require("./commands/impl/DatasetCommand"));
exports.DatasetCommand = DatasetCommand;
const DescCommand = _core.dogma.use(require("./commands/impl/DescCommand"));
exports.DescCommand = DescCommand;
const EncodeCommand = _core.dogma.use(require("./commands/impl/EncodeCommand"));
exports.EncodeCommand = EncodeCommand;
const EnvCommand = _core.dogma.use(require("./commands/impl/EnvCommand"));
exports.EnvCommand = EnvCommand;
const JobRunCommand = _core.dogma.use(require("./commands/impl/JobRunCommand"));
exports.JobRunCommand = JobRunCommand;
const QuestionsCommand = _core.dogma.use(require("./commands/impl/QuestionsCommand"));
exports.QuestionsCommand = QuestionsCommand;
const RegistryCommand = _core.dogma.use(require("./commands/impl/RegistryCommand"));
exports.RegistryCommand = RegistryCommand;
const RunCommand = _core.dogma.use(require("./commands/impl/RunCommand"));
exports.RunCommand = RunCommand;
const ShowCommand = _core.dogma.use(require("./commands/impl/ShowCommand"));
exports.ShowCommand = ShowCommand;
const SysCommand = _core.dogma.use(require("./commands/impl/SysCommand"));
exports.SysCommand = SysCommand;
const TriggerCommand = _core.dogma.use(require("./commands/impl/TriggerCommand"));
exports.TriggerCommand = TriggerCommand;
const createCommands = _core.dogma.use(require("./helpers/createCommands"));
exports.createCommands = createCommands;
const handleErrors = _core.dogma.use(require("./helpers/handleErrors"));
exports.handleErrors = handleErrors;