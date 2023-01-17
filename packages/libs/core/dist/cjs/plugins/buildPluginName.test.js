"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const buildPluginName = _core.dogma.use(require("./buildPluginName"));
suite(__filename, () => {
  {
    test("when scope set, nothin to do", () => {
      {
        const out = buildPluginName("@akromio/pi-redis");
        expected(out).equalTo("@akromio/pi-redis");
      }
    });
    test("when name not starts w/ pi, @akromio/pi-name must be returned", () => {
      {
        const out = buildPluginName("redis");
        expected(out).equalTo("@akromio/pi-redis");
      }
    });
  }
});