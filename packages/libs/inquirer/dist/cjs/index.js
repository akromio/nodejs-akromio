"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestionDescriber = exports.Inquirer = void 0;
var _core = require("@dogmalang/core");
const Inquirer = _core.dogma.use(require("./Inquirer"));
exports.Inquirer = Inquirer;
const QuestionDescriber = _core.dogma.use(require("./QuestionDescriber"));
exports.QuestionDescriber = QuestionDescriber;