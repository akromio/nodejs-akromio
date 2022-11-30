"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["dir"]: ".akromio",
  ["envFile"]: {
    ["public"]: ".env",
    ["private"]: ".private.env"
  },
  ["apm"]: {
    ["dirName"]: ".apm"
  },
  ["jobs"]: {
    ["catalogs"]: {
      ["path"]: "/jobs/catalogs/"
    }
  },
  ["registry"]: {
    ["git"]: {
      ["host"]: "raw.githubusercontent.com",
      ["user"]: "akromio",
      ["repo"]: "builtin-registry",
      ["branch"]: "master",
      ["prefix"]: "registry"
    },
    ["http"]: {
      ["host"]: "web3portal.com",
      ["base"]: "/AADBcBs1zq7O6UlmAtudNyYNbDKaWOe1beZlokaGcGjuWg"
    },
    ["skynet"]: {
      ["portal"]: "web3portal.com",
      ["skylink"]: "AQCdPkzgglLkzmCcg8vBC68jsz9UwRvCKFRqYNsPTa4O5g"
    },
    ["sns"]: {
      ["portal"]: "web3portal.com",
      ["publicKey"]: "fe1277c60bf5e379cdd830fd9c2e870f436ce642e47d49842f7b22fddb2f91f2",
      ["name"]: "basic-gen"
    }
  }
};