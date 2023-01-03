"use strict";

var _core = require("@dogmalang/core");
var _ps$env$KRM_DIR_NAME, _ps$env$KRM_ENV_FILE, _ps$env$KRM_PRIVATE_E, _ps$env$KRM_APM_DIR_N, _ps$env$KRM_NODE_PATH, _ps$env$KRM_JOB_CATAL, _ps$env$KRM_JOB_CATAL2, _ps$env$KRM_REGISTRIE, _ps$env$KRM_REGISTRY_, _ps$env$KRM_REGISTRY_2, _ps$env$KRM_REGISTRY_3, _ps$env$KRM_REGISTRY_4, _ps$env$KRM_REGISTRY_5, _ps$env$KRM_REGISTRY_6, _ps$env$KRM_REGISTRY_7, _ps$env$KRM_REGISTRY_8, _ps$env$KRM_REGISTRY_9, _ps$env$KRM_REGISTRY_10, _ps$env$KRM_REGISTRY_11, _ps$env$KRM_REGISTRY_12;
const defaults = _core.dogma.use(require("@akromio/cli-defaults"));
const dotenv = _core.dogma.use(require("dotenv"));
const path = _core.dogma.use(require("path"));
const root = (_ps$env$KRM_DIR_NAME = _core.ps.env.KRM_DIR_NAME) !== null && _ps$env$KRM_DIR_NAME !== void 0 ? _ps$env$KRM_DIR_NAME : defaults.dir;
const envFile = (_ps$env$KRM_ENV_FILE = _core.ps.env.KRM_ENV_FILE) !== null && _ps$env$KRM_ENV_FILE !== void 0 ? _ps$env$KRM_ENV_FILE : defaults.envFile.public;
const privateEnvFile = (_ps$env$KRM_PRIVATE_E = _core.ps.env.KRM_PRIVATE_ENV_FILE) !== null && _ps$env$KRM_PRIVATE_E !== void 0 ? _ps$env$KRM_PRIVATE_E : defaults.envFile.private;
if (envFile) {
  dotenv.config({
    'path': path.join(root, envFile)
  });
}
if (privateEnvFile) {
  dotenv.config({
    'path': path.join(root, privateEnvFile)
  });
}
_core.ps.env.KRM_DIR_NAME = root;
_core.ps.env.KRM_ENV_FILE = envFile;
_core.ps.env.KRM_PRIVATE_ENV_FILE = privateEnvFile;
_core.ps.env.KRM_APM_DIR_NAME = (_ps$env$KRM_APM_DIR_N = _core.ps.env.KRM_APM_DIR_NAME) !== null && _ps$env$KRM_APM_DIR_N !== void 0 ? _ps$env$KRM_APM_DIR_N : defaults.apm.dirName;
_core.ps.env.KRM_NODE_PATH = (_ps$env$KRM_NODE_PATH = _core.ps.env.KRM_NODE_PATH) !== null && _ps$env$KRM_NODE_PATH !== void 0 ? _ps$env$KRM_NODE_PATH : _core.ps.workDir;
_core.ps.env.KRM_JOB_CATALOGS_PATH = (_ps$env$KRM_JOB_CATAL = _core.ps.env.KRM_JOB_CATALOGS_PATH) !== null && _ps$env$KRM_JOB_CATAL !== void 0 ? _ps$env$KRM_JOB_CATAL : defaults.jobs.catalogs.path;
_core.ps.env.KRM_CATALOGS_PATH = _core.ps.env.KRM_JOB_CATALOGS_PATH;
_core.ps.env.KRM_JOB_CATALOG_NAME = (_ps$env$KRM_JOB_CATAL2 = _core.ps.env.KRM_JOB_CATALOG_NAME) !== null && _ps$env$KRM_JOB_CATAL2 !== void 0 ? _ps$env$KRM_JOB_CATAL2 : "default";
_core.ps.env.KRM_CATALOG_NAME = _core.ps.env.KRM_JOB_CATALOG_NAME;
_core.ps.env.KRM_REGISTRIES = (_ps$env$KRM_REGISTRIE = _core.ps.env.KRM_REGISTRIES) !== null && _ps$env$KRM_REGISTRIE !== void 0 ? _ps$env$KRM_REGISTRIE : "local,localApm,user";
_core.ps.env.KRM_REGISTRY_GIT_HOST = (_ps$env$KRM_REGISTRY_ = _core.ps.env.KRM_REGISTRY_GIT_HOST) !== null && _ps$env$KRM_REGISTRY_ !== void 0 ? _ps$env$KRM_REGISTRY_ : defaults.registry.git.host;
_core.ps.env.KRM_REGISTRY_GIT_USER = (_ps$env$KRM_REGISTRY_2 = _core.ps.env.KRM_REGISTRY_GIT_USER) !== null && _ps$env$KRM_REGISTRY_2 !== void 0 ? _ps$env$KRM_REGISTRY_2 : defaults.registry.git.user;
_core.ps.env.KRM_REGISTRY_GIT_REPO = (_ps$env$KRM_REGISTRY_3 = _core.ps.env.KRM_REGISTRY_GIT_REPO) !== null && _ps$env$KRM_REGISTRY_3 !== void 0 ? _ps$env$KRM_REGISTRY_3 : defaults.registry.git.repo;
_core.ps.env.KRM_REGISTRY_GIT_BRANCH = (_ps$env$KRM_REGISTRY_4 = _core.ps.env.KRM_REGISTRY_GIT_BRANCH) !== null && _ps$env$KRM_REGISTRY_4 !== void 0 ? _ps$env$KRM_REGISTRY_4 : defaults.registry.git.branch;
_core.ps.env.KRM_REGISTRY_GIT_PREFIX = (_ps$env$KRM_REGISTRY_5 = _core.ps.env.KRM_REGISTRY_GIT_PREFIX) !== null && _ps$env$KRM_REGISTRY_5 !== void 0 ? _ps$env$KRM_REGISTRY_5 : defaults.registry.git.prefix;
_core.ps.env.KRM_REGISTRY_SKYNET_PORTAL = (_ps$env$KRM_REGISTRY_6 = _core.ps.env.KRM_REGISTRY_SKYNET_PORTAL) !== null && _ps$env$KRM_REGISTRY_6 !== void 0 ? _ps$env$KRM_REGISTRY_6 : defaults.registry.skynet.portal;
_core.ps.env.KRM_REGISTRY_SKYNET_SKYLINK = (_ps$env$KRM_REGISTRY_7 = _core.ps.env.KRM_REGISTRY_SKYNET_SKYLINK) !== null && _ps$env$KRM_REGISTRY_7 !== void 0 ? _ps$env$KRM_REGISTRY_7 : defaults.registry.skynet.skylink;
_core.ps.env.KRM_REGISTRY_SNS_PORTAL = (_ps$env$KRM_REGISTRY_8 = _core.ps.env.KRM_REGISTRY_SNS_PORTAL) !== null && _ps$env$KRM_REGISTRY_8 !== void 0 ? _ps$env$KRM_REGISTRY_8 : defaults.registry.sns.portal;
_core.ps.env.KRM_REGISTRY_SNS_PUBLIC_KEY = (_ps$env$KRM_REGISTRY_9 = _core.ps.env.KRM_REGISTRY_SNS_PUBLIC_KEY) !== null && _ps$env$KRM_REGISTRY_9 !== void 0 ? _ps$env$KRM_REGISTRY_9 : defaults.registry.sns.publicKey;
_core.ps.env.KRM_REGISTRY_SNS_NAME = (_ps$env$KRM_REGISTRY_10 = _core.ps.env.KRM_REGISTRY_SNS_NAME) !== null && _ps$env$KRM_REGISTRY_10 !== void 0 ? _ps$env$KRM_REGISTRY_10 : defaults.registry.sns.name;
_core.ps.env.KRM_REGISTRY_HTTP_HOST = (_ps$env$KRM_REGISTRY_11 = _core.ps.env.KRM_REGISTRY_HTTP_HOST) !== null && _ps$env$KRM_REGISTRY_11 !== void 0 ? _ps$env$KRM_REGISTRY_11 : defaults.registry.http.host;
_core.ps.env.KRM_REGISTRY_HTTP_BASE = (_ps$env$KRM_REGISTRY_12 = _core.ps.env.KRM_REGISTRY_HTTP_BASE) !== null && _ps$env$KRM_REGISTRY_12 !== void 0 ? _ps$env$KRM_REGISTRY_12 : defaults.registry.http.base;