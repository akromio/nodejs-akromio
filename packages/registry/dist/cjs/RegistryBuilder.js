"use strict";

var _core = require("@dogmalang/core");
const Registry = _core.dogma.use(require("./Registry"));
const $RegistryBuilder = class RegistryBuilder {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_f91ba715c79c13ed5275a341f6550570___init__ instanceof Function) this._pvt_f91ba715c79c13ed5275a341f6550570___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_f91ba715c79c13ed5275a341f6550570___post__ instanceof Function) this._pvt_f91ba715c79c13ed5275a341f6550570___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_f91ba715c79c13ed5275a341f6550570___validate__ instanceof Function) this._pvt_f91ba715c79c13ed5275a341f6550570___validate__(); /* c8 ignore stop */
  }
};

const RegistryBuilder = new Proxy($RegistryBuilder, {
  apply(receiver, self, args) {
    return new $RegistryBuilder(...args);
  }
});
module.exports = exports = RegistryBuilder;
RegistryBuilder.prototype.create = function (decl) {
  const self = this;
  let registry; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map);
  {
    let conn;
    {
      const kind = decl.impl;
      switch (kind) {
        case "fs":
          {
            conn = createFsConnector(decl);
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        case "git":
          {
            conn = createGitConnector(decl);
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        case "http":
          {
            conn = createHttpConnector(decl);
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        case "skynet":
          {
            conn = createSkynetConnector(decl);
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        case "sns":
          {
            conn = createSnsConnector(decl);
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */ /*c8 ignore next*/
        default:
          {
            _core.dogma.raise(TypeError(`Unknown connector: ${kind}.`));
          }
      }
    }
    registry = Registry(_core.dogma.clone(decl, {
      "client": conn
    }, {}, [], []));
  }
  return registry;
};
function createFsConnector(decl) {
  /* c8 ignore next */_core.dogma.expect("decl", decl, _core.map);
  {
    return _core.dogma.use(require("./impl/fs/FsConnector"))(decl);
  }
}
function createGitConnector(decl) {
  /* c8 ignore next */_core.dogma.expect("decl", decl, _core.map);
  {
    return _core.dogma.use(require("./impl/git/GitConnector"))(decl);
  }
}
function createHttpConnector(decl) {
  /* c8 ignore next */_core.dogma.expect("decl", decl, _core.map);
  {
    return _core.dogma.use(require("./impl/http/HttpConnector"))(decl);
  }
}
function createSkynetConnector(decl) {
  let conn; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map);
  {
    const {
      SkynetClient
    } = _core.dogma.use(require("@skynetlabs/skynet-nodejs"));
    const portal = `https://${decl.portal}`;
    const client = new SkynetClient(portal);
    conn = _core.dogma.use(require("./impl/skynet/SkynetConnector"))(_core.dogma.clone(decl, {
      "client": client
    }, {}, [], []));
  }
  return conn;
}
function createSnsConnector(decl) {
  let conn; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map);
  {
    const {
      SkynetClient
    } = _core.dogma.use(require("@skynetlabs/skynet-nodejs"));
    const portal = `https://${decl.portal}`;
    const client = new SkynetClient(portal);
    conn = _core.dogma.use(require("./impl/sns/SnsConnector"))(_core.dogma.clone(decl, {
      "client": client
    }, {}, [], []));
  }
  return conn;
}