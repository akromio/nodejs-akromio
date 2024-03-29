"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const index = _core.dogma.use(require("./index"));
suite(__filename, () => {
  {
    test("when imported, its api must be exported", () => {
      {
        expected(index).toHave(["Action", "ActionOperator", "buildPluginPackageName", "Call", "CallReq", "CallReqStream", "CompositeEngine", "CompositeOp", "CompositeOperator", "Context", "CoOperator", "DynamicCo", "DynamicMacro", "MacroOperator", "NotFoundError", "Ops", "Plugin", "Plugins", "PluginLoader", "PluginParser", "Result", "Runner", "Script", "ScriptOperator", "SimpleEngine", "SimpleOp", "SimpleOperator", "StaticAction"]);
      }
    });
  }
});