"use strict";

var _core = require("@dogmalang/core");
const $ArgsParser = class ArgsParser {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('prefix', _['prefix'], _core.text);
    Object.defineProperty(this, 'prefix', {
      value: (0, _core.coalesce)(_['prefix'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_ea380fce7b4f0f9805ba19f6924d7a6a___init__ instanceof Function) this._pvt_ea380fce7b4f0f9805ba19f6924d7a6a___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_ea380fce7b4f0f9805ba19f6924d7a6a___post__ instanceof Function) this._pvt_ea380fce7b4f0f9805ba19f6924d7a6a___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_ea380fce7b4f0f9805ba19f6924d7a6a___validate__ instanceof Function) this._pvt_ea380fce7b4f0f9805ba19f6924d7a6a___validate__(); /* c8 ignore stop */
  }
};

const ArgsParser = new Proxy($ArgsParser, {
  apply(receiver, self, args) {
    return new $ArgsParser(...args);
  }
});
module.exports = exports = ArgsParser;
ArgsParser.prototype.parse = async function (decls, env, resolver) {
  const self = this;
  let args = {}; /* c8 ignore next */
  _core.dogma.expect("decls", decls, _core.dogma.TypeDef({
    name: 'inline',
    types: [_core.text],
    min: 0,
    max: null
  })); /* c8 ignore next */
  _core.dogma.expect("env", env, _core.map); /* c8 ignore next */
  _core.dogma.expect("resolver", resolver, _core.func);
  {
    args = this.parseEnvVars(env, this.prefix, args);
    args = (0, await this.parseArgFiles(decls.filter(i => {
      /* c8 ignore next */_core.dogma.expect("i", i);
      {
        return !i.includes("=");
      }
    }), resolver, args));
    args = this.parseArgLines(decls.filter(i => {
      /* c8 ignore next */_core.dogma.expect("i", i);
      {
        return i.includes("=");
      }
    }), args);
  }
  return args;
};
ArgsParser.prototype.parseEnvVars = function (env, prefix, args) {
  const self = this;
  {
    for (const name of (0, _core.keys)(env)) {
      if (name.startsWith(prefix)) {
        _core.dogma.setItem("=", args, name.replace((0, _core.re)("^" + prefix), ""), decode(_core.dogma.getItem(env, name)));
      }
    }
  }
  return args;
};
ArgsParser.prototype.parseArgLines = function (lines, args) {
  const self = this;
  {
    for (const arg of lines) {
      const equalAt = arg.indexOf("=");
      const name = _core.dogma.getSlice(arg, 0, equalAt - 1);
      const value = _core.dogma.getSlice(arg, equalAt + 1, -1);
      _core.dogma.setItem("=", args, name.trim(), decode(value.trim()));
    }
  }
  return args;
};
ArgsParser.prototype.parseArgFiles = async function (filePaths, resolver, args) {
  const self = this;
  {
    for (const filePath of filePaths) {
      const importedArgs = (0, await resolver(filePath));
      args = _core.dogma.clone(args, {}, {}, [], [importedArgs]);
    }
  }
  return args;
};
function decode(value) {
  /* c8 ignore next */_core.dogma.expect("value", value, _core.any);
  {
    if (_core.dogma.is(value, _core.text)) {
      if (value.startsWith("json://")) {
        value = _core.json.decode(_core.dogma.getSlice(value, 7, -1));
      } else if (value.startsWith("json+base64://")) {
        value = _core.json.decode((0, _core.text)(Buffer.from(_core.dogma.getSlice(value, 14, -1), "base64")));
      }
    }
  }
  return value;
}