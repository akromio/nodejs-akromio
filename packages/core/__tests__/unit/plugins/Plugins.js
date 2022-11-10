"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  Plugins,
  Plugin,
  NotFoundError
} = _core.dogma.use(require("../../.."));
suite(__filename, () => {
  {
    suite("appendPlugin()", () => {
      {
        test("when plugin to add, this must be added to items", () => {
          {
            const plugins = Plugins();
            const plugin1 = Plugin({
              'name': "plugin1"
            });
            const out = plugins.appendPlugin(plugin1);
            expected(out).sameAs(plugins);
            expected(plugins.items).toHaveLen(1).toHave("plugin1");
          }
        });
      }
    });
    suite("appendPlugins()", () => {
      {
        test("when plugins to add, these must be added to items", () => {
          {
            const plugins = Plugins();
            const plugin1 = Plugin({
              'name': "plugin1"
            });
            const plugin2 = Plugin({
              'name': "plugin2"
            });
            const out = plugins.appendPlugins(plugin1, plugin2);
            expected(out).sameAs(plugins);
            expected(plugins.items).toHaveLen(2).toHave("plugin1", "plugin2");
          }
        });
      }
    });
    suite("getPlugin()", () => {
      {
        test("when plugin exists, this must be returned", () => {
          {
            const plugins = Plugins();
            const plugin = Plugin({
              'name': "plugin"
            });
            const out = plugins.appendPlugin(plugin).getPlugin("plugin");
            expected(out).sameAs(plugin);
          }
        });
        test("when plugin not exists, nil must be returned", () => {
          {
            const plugins = Plugins();
            const out = plugins.getPlugin("plugin");
            expected(out).toBeNil();
          }
        });
        test("when plugin not exists and raise option, error must be raised", () => {
          {
            const plugins = Plugins();
            const out = _core.dogma.peval(() => {
              return plugins.getPlugin("pi", {
                'raiseIfNotFound': true
              });
            });
            expected(out).it(0).equalTo(false).it(1).equalTo(NotFoundError("Plugin 'pi' not found."));
          }
        });
      }
    });
    suite("len", () => {
      {
        test("when called, the length must be returned", () => {
          {
            const plugins = Plugins().appendPlugin(Plugin({
              'name': "one"
            })).appendPlugin(Plugin({
              'name': "two"
            }));
            const out = (0, _core.len)(plugins);
            expected(out).equalTo(2);
          }
        });
      }
    });
    suite("finalize()", () => {
      {
        test("when called, the plugins finalize() must be called", async () => {
          {
            const plugins = Plugins().appendPlugin(Plugin({
              'name': "one"
            })).appendPlugin(Plugin({
              'name': "two"
            }));
            const out = (0, await plugins.finalize());
            expected(out).toBeNil();
          }
        });
      }
    });
  }
});