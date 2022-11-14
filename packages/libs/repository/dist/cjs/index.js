"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Repository = exports.LocalRepository = void 0;
var _core = require("@dogmalang/core");
const Repository = _core.dogma.use(require("./Repository"));
exports.Repository = Repository;
const LocalRepository = _core.dogma.use(require("./impl/local/LocalRepository"));
exports.LocalRepository = LocalRepository;