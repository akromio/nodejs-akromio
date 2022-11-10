"use strict";

var _core = require("@dogmalang/core");
const inquirer = _core.dogma.use(require("inquirer"));
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  monitor,
  simulator
} = _core.dogma.use(require("@akromio/doubles"));
const {
  Inquirer
} = _core.dogma.use(require("../.."));
suite(__filename, () => {
  {
    const i = Inquirer();
    let originalPrompt;
    setup(() => {
      {
        originalPrompt = inquirer.prompt;
      }
    });
    teardown(() => {
      {
        inquirer.prompt = originalPrompt;
      }
    });
    test("when invalid question, error must be raised", async () => {
      {
        const out = await _core.dogma.pawait(() => i.prompt([{
          ["inpu"]: "test"
        }]));
        expected(out).it(0).equalTo(false).it(1).toBe(Error).like("Unknown question type: { inpu: 'test' }.");
      }
    });
    suite("performInput()", () => {
      {
        test("when called with answer, no question must be performed", async () => {
          {
            const prompt = monitor(inquirer.prompt);
            _core.dogma.update(inquirer, {
              name: "prompt",
              visib: ".",
              assign: "=",
              value: prompt
            });
            const q = {
              ["input"]: "test",
              ["title"]: "the title",
              ["defaultValue"]: false
            };
            const answers = {
              ["test"]: "321"
            };
            const out = (0, await i.prompt([q], answers));
            const log = monitor.log(prompt, {
              'clear': true
            });
            expected(out).equalTo({
              'test': "321"
            });
            expected(log).toHaveLen(0);
          }
        });
        test("when no type set, input question must be performed", async () => {
          {
            const prompt = monitor(simulator.fun({
              'resolves': {
                ["test"]: "321"
              }
            }));
            _core.dogma.update(inquirer, {
              name: "prompt",
              visib: ".",
              assign: "=",
              value: prompt
            });
            const q = {
              ["input"]: "test",
              ["title"]: "the title",
              ["defaultValue"]: "123"
            };
            const answers = {};
            const out = (0, await i.prompt([q], answers));
            const log = monitor.log(prompt, {
              'clear': true
            });
            expected(out).equalTo({
              'test': "321"
            });
            expected(log).toHaveLen(1);
            expected(log.calledWith([{
              ["name"]: "test",
              ["type"]: "input",
              ["message"]: q.title,
              ["default"]: q.defaultValue
            }])).equalTo(1);
          }
        });
        test("when type is password, password question must be performed", async () => {
          {
            const prompt = monitor(simulator.fun({
              'resolves': {
                ["test"]: "321"
              }
            }));
            _core.dogma.update(inquirer, {
              name: "prompt",
              visib: ".",
              assign: "=",
              value: prompt
            });
            const q = {
              ["input"]: "test",
              ["type"]: "password",
              ["title"]: "the title",
              ["defaultValue"]: "123"
            };
            const answers = {};
            const out = (0, await i.prompt([q], answers));
            const log = monitor.log(prompt, {
              'clear': true
            });
            expected(out).equalTo({
              'test': "321"
            });
            expected(log).toHaveLen(1);
            expected(log.calledWith([{
              ["name"]: "test",
              ["type"]: "password",
              ["message"]: q.title,
              ["default"]: q.defaultValue
            }])).equalTo(1);
          }
        });
      }
    });
    suite("performConfirm()", () => {
      {
        test("when called, confirm question must be performed", async () => {
          {
            const prompt = monitor(simulator.fun({
              'resolves': {
                ["test"]: true
              }
            }));
            _core.dogma.update(inquirer, {
              name: "prompt",
              visib: ".",
              assign: "=",
              value: prompt
            });
            const q = {
              ["confirm"]: "test",
              ["title"]: "the title",
              ["defaultValue"]: false
            };
            const answers = {};
            const out = (0, await i.prompt([q], answers));
            const log = monitor.log(prompt, {
              'clear': true
            });
            expected(out).equalTo({
              'test': true
            });
            expected(log).toHaveLen(1);
            expected(log.calledWith([{
              ["name"]: "test",
              ["type"]: "confirm",
              ["message"]: q.title,
              ["default"]: q.defaultValue
            }])).equalTo(1);
          }
        });
        test("when called with answer, no question must be performed", async () => {
          {
            const prompt = monitor(inquirer.prompt);
            _core.dogma.update(inquirer, {
              name: "prompt",
              visib: ".",
              assign: "=",
              value: prompt
            });
            const q = {
              ["confirm"]: "test",
              ["title"]: "the title",
              ["defaultValue"]: false
            };
            const answers = {
              ["test"]: true
            };
            const out = (0, await i.prompt([q], answers));
            const log = monitor.log(prompt, {
              'clear': true
            });
            expected(out).equalTo({
              'test': true
            });
            expected(log).toHaveLen(0);
          }
        });
      }
    });
    suite("performSelect()", () => {
      {
        test("when called with answer, no question must be performed", async () => {
          {
            const prompt = monitor(inquirer.prompt);
            _core.dogma.update(inquirer, {
              name: "prompt",
              visib: ".",
              assign: "=",
              value: prompt
            });
            const q = {
              ["select"]: "test",
              ["title"]: "the title",
              ["options"]: ["one", "two", "three"],
              ["selected"]: "two"
            };
            const answers = {
              ["test"]: "three"
            };
            const out = (0, await i.prompt([q], answers));
            const log = monitor.log(prompt, {
              'clear': true
            });
            expected(out).equalTo({
              'test': "three"
            });
            expected(log).toHaveLen(0);
          }
        });
        suite("w/o multiple, list must be performed", async () => {
          {
            test("when selected set, selected must be used", async () => {
              {
                const prompt = monitor(simulator.fun({
                  'resolves': {
                    ["test"]: "two"
                  }
                }));
                _core.dogma.update(inquirer, {
                  name: "prompt",
                  visib: ".",
                  assign: "=",
                  value: prompt
                });
                const q = {
                  ["select"]: "test",
                  ["title"]: "the title",
                  ["options"]: ["one", "two", "three"],
                  ["selected"]: "three"
                };
                const answers = {};
                const out = (0, await i.prompt([q], answers));
                const log = monitor.log(prompt, {
                  'clear': true
                });
                expected(out).equalTo({
                  'test': "two"
                });
                expected(log).toHaveLen(1);
                expected(log.calledWith([{
                  ["name"]: "test",
                  ["type"]: "list",
                  ["message"]: q.title,
                  ["default"]: q.selected,
                  ["choices"]: q.options
                }])).equalTo(1);
              }
            });
            test("when selected unset, defaultValue must be used", async () => {
              {
                const prompt = monitor(simulator.fun({
                  'resolves': {
                    ["test"]: "two"
                  }
                }));
                _core.dogma.update(inquirer, {
                  name: "prompt",
                  visib: ".",
                  assign: "=",
                  value: prompt
                });
                const q = {
                  ["select"]: "test",
                  ["title"]: "the title",
                  ["options"]: ["one", "two", "three"],
                  ["defaultValue"]: "three"
                };
                const answers = {};
                const out = (0, await i.prompt([q], answers));
                const log = monitor.log(prompt, {
                  'clear': true
                });
                expected(out).equalTo({
                  'test': "two"
                });
                expected(log).toHaveLen(1);
                expected(log.calledWith([{
                  ["name"]: "test",
                  ["type"]: "list",
                  ["message"]: q.title,
                  ["default"]: q.defaultValue,
                  ["choices"]: q.options
                }])).equalTo(1);
              }
            });
          }
        });
        suite("w/ multiple", () => {
          {
            test("when selected set, checkbox must be performed", async () => {
              {
                const prompt = monitor(simulator.fun({
                  'resolves': {
                    ["test"]: "two"
                  }
                }));
                _core.dogma.update(inquirer, {
                  name: "prompt",
                  visib: ".",
                  assign: "=",
                  value: prompt
                });
                const q = {
                  ["select"]: "test",
                  ["multiple"]: true,
                  ["title"]: "the title",
                  ["options"]: ["one", "two", "three"],
                  ["selected"]: ["three"]
                };
                const answers = {};
                const out = (0, await i.prompt([q], answers));
                const log = monitor.log(prompt, {
                  'clear': true
                });
                expected(out).equalTo({
                  'test': "two"
                });
                expected(log).toHaveLen(1);
                expected(log.calledWith([{
                  ["name"]: "test",
                  ["type"]: "checkbox",
                  ["message"]: q.title,
                  ["choices"]: q.options,
                  ["default"]: q.selected
                }])).equalTo(1);
              }
            });
            test("when selected unset, defaultValue must be used and checkbox must be performed", async () => {
              {
                const prompt = monitor(simulator.fun({
                  'resolves': {
                    ["test"]: "two"
                  }
                }));
                _core.dogma.update(inquirer, {
                  name: "prompt",
                  visib: ".",
                  assign: "=",
                  value: prompt
                });
                const q = {
                  ["select"]: "test",
                  ["multiple"]: true,
                  ["title"]: "the title",
                  ["options"]: ["one", "two", "three"],
                  ["defaultValue"]: ["three"]
                };
                const answers = {};
                const out = (0, await i.prompt([q], answers));
                const log = monitor.log(prompt, {
                  'clear': true
                });
                expected(out).equalTo({
                  'test': "two"
                });
                expected(log).toHaveLen(1);
                expected(log.calledWith([{
                  ["name"]: "test",
                  ["type"]: "checkbox",
                  ["message"]: q.title,
                  ["choices"]: q.options,
                  ["default"]: q.defaultValue
                }])).equalTo(1);
              }
            });
          }
        });
      }
    });
  }
});