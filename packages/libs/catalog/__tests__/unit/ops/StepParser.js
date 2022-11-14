"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const StepParser = _core.dogma.use(require("../../../dist/cjs/ops/StepParser"));
suite(__filename, () => {
  {
    const parser = StepParser();
    suite("parseOpName()", () => {
      {
        test("when only op name, it must return op {opName = name, onError = default}", () => {
          {
            const out = parser.parseStep("hbs.render", "continue");
            expected(out).toHave({
              'opName': "hbs.render",
              'onError': "continue"
            });
          }
        });
        test("when <opName, {opName, onError = finish} must be returned", () => {
          {
            const out = parser.parseStep("<hbs.render", "continue");
            expected(out).toHave({
              'opName': "hbs.render",
              'onError': "finish"
            });
          }
        });
      }
    });
    suite("parseOpArgs()", () => {
      {
        test("when no argument passed, nil must be returned", () => {
          {
            const out = parser.parseStep("op", "continue");
            expected(out).toHave({
              'args': null
            });
          }
        });
        test("when only one argument passed, this must be returned", () => {
          {
            const out = parser.parseStep("op one", "continue");
            expected(out).toHave({
              'args': "one"
            });
          }
        });
        test("when more than argument passed, these must be returned in list", () => {
          {
            const out = parser.parseStep("op one two", "continue");
            expected(out).toHave({
              'args': ["one", "two"]
            });
          }
        });
      }
    });
    suite("parseCondition()", () => {
      {
        test("when condition?, datum name must be returned", () => {
          {
            const out = parser.parseStep("xyz? op", "continue");
            expected(out).toHave({
              'condition': "xyz"
            });
          }
        });
        test("when no condition, nil must be returned", () => {
          {
            const out = parser.parseStep("op", "continue");
            expected(out).toHave({
              'condition': null
            });
          }
        });
      }
    });
    suite("parseResult()", () => {
      {
        test("when $varName, datum name must be returned", () => {
          {
            const out = parser.parseStep("$xyz = op", "continue");
            expected(out).toHave({
              'resultVarName': "xyz"
            });
          }
        });
        test("when no var name, nil must be returned", () => {
          {
            const out = parser.parseStep("op", "continue");
            expected(out).toHave({
              'resultVarName': null
            });
          }
        });
      }
    });
    suite("parseTextStep()", () => {
      {
        test("when 'opName arg', {opName, args = arg, onError = finish} must be returned", () => {
          {
            const out = parser.parseStep("banner $(i.slug)", "finish");
            expected(out).toHave({
              'condition': null,
              'resultVarName': null,
              'opName': "banner",
              'args': "$(i.slug)",
              'onError': "finish"
            });
          }
        });
        test("when '$result = opName ...args', {resultVarName, opName, args, onError = finish} must be returned", () => {
          {
            const out = parser.parseStep("$xyz = op one two three", "finish");
            expected(out).toHave({
              'condition': null,
              'resultVarName': "xyz",
              'opName': "op",
              'args': ["one", "two", "three"],
              'onError': "finish"
            });
          }
        });
        test("when '$result opName ...args', error must be raised", () => {
          {
            const out = _core.dogma.peval(() => {
              return parser.parseStep("$result op arg1 arg2", "continue");
            });
            expected(out).item(0).equalTo(false).item(1).equalTo(TypeError("'=' expected after $resultVarName."));
          }
        });
        test("when 'cond? opName ...args', {condition, opName, args, onError = finish} must be returned", () => {
          {
            const out = parser.parseStep("xyz? op one two three", "finish");
            expected(out).toHave({
              'condition': "xyz",
              'resultVarName': null,
              'opName': "op",
              'args': ["one", "two", "three"],
              'onError': "finish"
            });
          }
        });
      }
    });
    suite("parseListStep()", () => {
      {
        test("when [cond?, $result, opName], {condition, resultVarName, opName, args=nil, onError} must be returned", () => {
          {
            const out = parser.parseStep(["xyz?", "$zyx", "op"], "finish");
            expected(out).toHave({
              'condition': "xyz",
              'resultVarName': "zyx",
              'opName': "op",
              'args': null,
              'onError': "finish"
            });
          }
        });
        test("when [opName, arg], {opName, args = arg, onError = finish} must be returned", () => {
          {
            const out = parser.parseStep(["banner", "$(i.slug)"], "finish");
            expected(out).toHave({
              'opName': "banner",
              'args': "$(i.slug)",
              'onError': "finish"
            });
          }
        });
        test("when [opName, ...args], {opName, args, onError = finish} must be returned", () => {
          {
            const out = parser.parseStep(["concat", "one", "two", "three"], "finish");
            expected(out).toHave({
              'opName': "concat",
              'args': ["one", "two", "three"],
              'onError': "finish"
            });
          }
        });
      }
    });
  }
});