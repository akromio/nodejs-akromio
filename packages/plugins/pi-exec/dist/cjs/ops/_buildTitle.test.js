"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const buildTitle = _core.dogma.use(require("./_buildTitle"));
suite(__filename, () => {
  {
    test("when called, a title must be returned", () => {
      {
        const command = "ls -l";
        const params = {
          ["command"]: command
        };
        const out = buildTitle(params);
        expected(out).equalTo(`exec: run '${command}'`);
      }
    });
  }
});