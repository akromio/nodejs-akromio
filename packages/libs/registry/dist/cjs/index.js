"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnsConnector = exports.SkynetConnector = exports.RegistryStringParser = exports.RegistryState = exports.RegistryBuilder = exports.Registry = exports.Registries = exports.Item = exports.HttpConnector = exports.GitConnector = exports.FsConnector = void 0;
var _core = require("@dogmalang/core");
const Item = _core.dogma.use(require("./Item"));
exports.Item = Item;
const Registry = _core.dogma.use(require("./Registry"));
exports.Registry = Registry;
const RegistryBuilder = _core.dogma.use(require("./RegistryBuilder"));
exports.RegistryBuilder = RegistryBuilder;
const RegistryState = _core.dogma.use(require("./RegistryState"));
exports.RegistryState = RegistryState;
const RegistryStringParser = _core.dogma.use(require("./RegistryStringParser"));
exports.RegistryStringParser = RegistryStringParser;
const Registries = _core.dogma.use(require("./Registries"));
exports.Registries = Registries;
const FsConnector = _core.dogma.use(require("./impl/fs/FsConnector"));
exports.FsConnector = FsConnector;
const GitConnector = _core.dogma.use(require("./impl/git/GitConnector"));
exports.GitConnector = GitConnector;
const HttpConnector = _core.dogma.use(require("./impl/http/HttpConnector"));
exports.HttpConnector = HttpConnector;
const SkynetConnector = _core.dogma.use(require("./impl/skynet/SkynetConnector"));
exports.SkynetConnector = SkynetConnector;
const SnsConnector = _core.dogma.use(require("./impl/sns/SnsConnector"));
exports.SnsConnector = SnsConnector;