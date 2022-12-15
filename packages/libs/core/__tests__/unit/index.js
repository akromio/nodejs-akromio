"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const pkg = _core.dogma.use(require("../.."));
suite(__filename, () => {
  {
    test("when imported, its api must be exported", () => {
      {
        expected(pkg).members("NotFoundError", "SimpleOp", "SimpleOperator", "CompositeOp", "CompositeOperator", "Call", "Context", "Result", "Ops", "Plugin", "Plugins", "PluginParser", "PluginLoader", "Action", "StaticAction", "ActionOperator", "Script", "ScriptOperator", "DynamicMacro", "MacroOperator", "DynamicCo", "CoOperator", "Runner").toBeCallable();
      }
    });
  }
});