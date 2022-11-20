"use strict";

var _core = require("@dogmalang/core");
const $RegistryStringParser = class RegistryStringParser {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_8077a8bb00ab12ad2574c8e0e0e94b3f___init__ instanceof Function) this._pvt_8077a8bb00ab12ad2574c8e0e0e94b3f___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_8077a8bb00ab12ad2574c8e0e0e94b3f___post__ instanceof Function) this._pvt_8077a8bb00ab12ad2574c8e0e0e94b3f___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_8077a8bb00ab12ad2574c8e0e0e94b3f___validate__ instanceof Function) this._pvt_8077a8bb00ab12ad2574c8e0e0e94b3f___validate__(); /* c8 ignore stop */
  }
};

const RegistryStringParser = new Proxy($RegistryStringParser, {
  apply(receiver, self, args) {
    return new $RegistryStringParser(...args);
  }
});
module.exports = exports = RegistryStringParser;
RegistryStringParser.prototype.parse = function (decl, defaults) {
  const self = this;
  let parsed = {}; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.text); /* c8 ignore next */
  _core.dogma.expect("defaults", defaults, _core.map);
  {
    const segments = decl.split("=");
    let name;
    let def;
    {
      const _ = (0, _core.len)(segments);
      switch (_) {
        case 1:
          {
            def = _core.dogma.getItem(segments, 0);
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        case 2:
          {
            [name, def] = _core.dogma.getArrayToUnpack(segments, 2);
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        default:
          {
            _core.dogma.raise(TypeError(`Invalid registry string: ${decl}.`));
          }
      }
    }
    const [proto, conf] = _core.dogma.getArrayToUnpack(def.split("://"), 2);
    {
      const _ = proto;
      switch (_) {
        case "fs":
          {
            parsed = parseFsString(name || "fs", conf);
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        case "git":
          {
            parsed = parseGitString(name || "git", conf, defaults.git);
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        case "http":
          {
            parsed = parseHttpString(name || "http", conf, defaults.http);
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        case "skynet":
          {
            parsed = parseSkynetString(name || "skynet", conf, defaults.skynet);
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        case "sns":
          {
            parsed = parseSnsString(name || "sns", conf, defaults.sns);
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        default:
          {
            _core.dogma.raise(TypeError(`Unknown registry implementation: ${proto}.`));
          }
      }
    }
  }
  return parsed;
};
function parseFsString(name, conf) {
  let parsed = {}; /* c8 ignore next */
  _core.dogma.expect("name", name, _core.text); /* c8 ignore next */
  _core.dogma.expect("conf", conf, _core.text);
  {
    if (!conf.startsWith("/")) {
      _core.dogma.raise(TypeError(`FS registry expecting an absolute base path: ${conf}.`));
    }
    parsed = {
      ["name"]: name,
      ["impl"]: "fs",
      ["basePath"]: conf
    };
  }
  return parsed;
}
function parseGitString(name, conf, defaults) {
  (0, _core.print)(...arguments);
  let parsed = {}; /* c8 ignore next */
  _core.dogma.expect("name", name, _core.text); /* c8 ignore next */
  _core.dogma.expect("conf", conf, _core.text); /* c8 ignore next */
  _core.dogma.expect("defaults", defaults, _core.map);
  {
    const segments = conf == "" ? [] : conf.split("/");
    let user;
    let repo;
    let branch;
    let prefix;
    {
      const _ = (0, _core.len)(segments);
      switch (_) {
        case 0:
          {
            _core.dogma.raise(TypeError(`Invalid git configuration: ${conf}.`));
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        case 1:
          {
            repo = _core.dogma.getItem(segments, 0);
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        case 2:
          {
            [user, repo] = _core.dogma.getArrayToUnpack(segments, 2);
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        default:
          {
            [user, repo, branch] = _core.dogma.getArrayToUnpack(_core.dogma.getSlice(segments, 0, 2), 3);
            prefix = _core.dogma.getSlice(segments, 3, -1).join("/");
          }
      }
    }
    if (!user) {
      user = defaults.user;
    }
    if (!repo) {
      repo = defaults.repo;
    }
    if (!branch) {
      branch = defaults.branch;
    }
    if (!prefix) {
      prefix = defaults.prefix;
    }
    parsed = {
      ["name"]: name,
      ["impl"]: "git",
      ["user"]: user,
      ["repo"]: repo,
      ["branch"]: branch,
      ["prefix"]: prefix
    };
  }
  return parsed;
}
function parseSkynetString(name, conf, defaults) {
  let parsed = {}; /* c8 ignore next */
  _core.dogma.expect("name", name, _core.text); /* c8 ignore next */
  _core.dogma.expect("conf", conf, _core.text); /* c8 ignore next */
  _core.dogma.expect("defaults", defaults, _core.map);
  {
    let segments = conf.split("/");
    let portal;
    let skylink;
    {
      const _ = (0, _core.len)(segments);
      switch (_) {
        case 1:
          {
            portal = defaults.portal;
            skylink = _core.dogma.getItem(segments, 0) || defaults.skylink;
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        case 2:
          {
            [portal, skylink] = _core.dogma.getArrayToUnpack(segments, 2);
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        default:
          {
            _core.dogma.raise(TypeError(`Invalid skynet configuration: ${conf}.`));
          }
      }
    }
    parsed = {
      ["name"]: name,
      ["impl"]: "skynet",
      ["portal"]: portal,
      ["skylink"]: skylink
    };
  }
  return parsed;
}
function parseSnsString(name, conf, defaults) {
  let parsed = {}; /* c8 ignore next */
  _core.dogma.expect("name", name, _core.text); /* c8 ignore next */
  _core.dogma.expect("conf", conf, _core.text); /* c8 ignore next */
  _core.dogma.expect("defaults", defaults, _core.map);
  {
    let segments = conf.split("/");
    let portal;
    let publicKey;
    let name;
    {
      const _ = (0, _core.len)(segments);
      switch (_) {
        case 1:
          {
            ({
              portal: portal,
              publicKey: publicKey
            } = defaults);
            name = _core.dogma.getItem(segments, 0) || defaults.name;
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        case 2:
          {
            const [first, second] = _core.dogma.getArrayToUnpack(segments, 2);
            if (first.includes(".")) {
              portal = first;
              ({
                publicKey: publicKey
              } = defaults);
            } else {
              ({
                portal: portal
              } = defaults);
              publicKey = first;
            }
            name = second;
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        case 3:
          {
            [portal, publicKey, name] = _core.dogma.getArrayToUnpack(segments, 3);
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        default:
          {
            _core.dogma.raise(TypeError(`Invalid SNS configuration: ${conf}.`));
          }
      }
    }
    parsed = {
      ["name"]: name,
      ["impl"]: "sns",
      ["portal"]: portal,
      ["publicKey"]: publicKey,
      ["name"]: name
    };
  }
  return parsed;
}
function parseHttpString(name, conf, defaults) {
  let parsed = {}; /* c8 ignore next */
  _core.dogma.expect("name", name, _core.text); /* c8 ignore next */
  _core.dogma.expect("conf", conf, _core.text); /* c8 ignore next */
  _core.dogma.expect("defaults", defaults, _core.map);
  {
    const segments = conf.split("/");
    let host;
    let base;
    {
      const size = (0, _core.len)(segments);
      if (size == 1) {
        host = _core.dogma.getItem(segments, 0) || defaults.host;
        base = defaults.base;
      } else {
        host = _core.dogma.getItem(segments, 0);
        base = "/" + _core.dogma.getSlice(segments, 1, -1).join("/");
      }
    }
    parsed = {
      ["name"]: name,
      ["impl"]: "http",
      ["host"]: host,
      ["base"]: base
    };
  }
  return parsed;
}