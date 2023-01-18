"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const buildPluginPackageName = _core.dogma.use(require("./buildPluginPackageName"));
suite(__filename, () => {
  {
    test("when scope set, nothin to do", () => {
      {
        const out = buildPluginPackageName("@akromio/pi-redis");
        expected(out).equalTo("@akromio/pi-redis");
      }
    });
    test("when name not starts w/ pi, @akromio/pi-name must be returned", () => {
      {
        const out = buildPluginPackageName("redis");
        expected(out).equalTo("@akromio/pi-redis");
      }
    });
  }
});