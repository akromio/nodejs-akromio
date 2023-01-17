#!/usr/bin/env node
"use strict";

var _core = require("@dogmalang/core");
const pkg = _core.dogma.use(require("../../package"));
const env = _core.dogma.use(require("./env"));
const {
  DescCommand,
  EncodeCommand,
  SysCommand,
  createCommands,
  handleErrors
} = _core.dogma.use(require("@akromio/cli"));
const CatalogCommand = _core.dogma.use(require("./commands/CatalogCommand"));
const RegistryCommand = _core.dogma.use(require("./commands/RegistryCommand"));
const InstallCommand = _core.dogma.use(require("./commands/InstallCommand"));
const RunCommand = _core.dogma.use(require("./commands/RunCommand"));
const ShowCommand = _core.dogma.use(require("./commands/ShowCommand"));
const EnvCommand = _core.dogma.use(require("./commands/EnvCommand"));
const DatasetCommand = _core.dogma.use(require("./commands/DatasetCommand"));
const QuestionsCommand = _core.dogma.use(require("./commands/QuestionsCommand"));
const yargs = require("yargs");
const appName = _core.dogma.getItem(pkg.name.split("/"), -1);
const {
  year
} = pkg;
const author = pkg.author.name;
yargs.scriptName(appName);
yargs.version("v", pkg.version);
yargs.help("help");
yargs.epilogue(`Copyright © ${year} ${author}. All rights reserved.
Product of Spain, EU, made in Valencia.`);
yargs.fail(handleErrors);
const commands = [CatalogCommand(), DatasetCommand(), DescCommand(), EncodeCommand(), EnvCommand(), InstallCommand(), QuestionsCommand(), RegistryCommand(), RunCommand(), ShowCommand(), SysCommand({
  'app': {
    ["name"]: appName,
    ["version"]: pkg.version
  }
})];
createCommands(yargs, commands);
yargs.argv;