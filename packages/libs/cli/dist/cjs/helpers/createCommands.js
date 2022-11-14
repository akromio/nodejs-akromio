"use strict";

var _core = require("@dogmalang/core");
function createCommands(yargs, commands) {
  /* c8 ignore next */_core.dogma.expect("yargs", yargs); /* c8 ignore next */
  _core.dogma.expect("commands", commands);
  {
    for (const cmd of commands) {
      if (_core.dogma.is(cmd, _core.list)) {
        createCompositeCommand(yargs, ...cmd);
      } else {
        createSimpleCommand(yargs, cmd);
      }
    }
  }
}
module.exports = exports = createCommands;
function createSimpleCommand(yargs, cmd) {
  /* c8 ignore next */_core.dogma.expect("yargs", yargs); /* c8 ignore next */
  _core.dogma.expect("cmd", cmd);
  {
    if (!cmd.positionals) {
      yargs.command(cmd.name, cmd.desc, cmd.options, cmd.handler);
    } else {
      function builder(yargs) {
        /* c8 ignore next */_core.dogma.expect("yargs", yargs);
        {
          for (const [key, value] of Object.entries(cmd.positionals)) {
            {
              yargs.positional(key, value);
            }
          }
          for (const [key, value] of Object.entries(cmd.options)) {
            {
              yargs.option(key, value);
            }
          }
        }
      }
      yargs.command(cmd.name, cmd.hidden ? false : cmd.desc, builder, cmd.handler);
    }
  }
}
function createCompositeCommand(yargs, cmd, ...subcmds) {
  /* c8 ignore next */_core.dogma.expect("yargs", yargs); /* c8 ignore next */
  _core.dogma.expect("cmd", cmd);
  {
    yargs.command(cmd.name, cmd.desc, yargs => {
      /* c8 ignore next */_core.dogma.expect("yargs", yargs);
      {
        for (const cmd of subcmds) {
          createSimpleCommand(yargs, cmd);
        }
      }
    });
  }
}