"use strict";

var _core = require("@dogmalang/core");
const path = _core.dogma.use(require("path"));
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  RegistryStringParser
} = _core.dogma.use(require("../.."));
suite(__filename, () => {
  {
    const parser = RegistryStringParser();
    const skylink = "0007rdh37vandm5ndsgmabb1o3t2k4iuiniohaovgnvphp9lj1aeoj0";
    const skyportal = "siasky.net";
    const defaults = {
      ["dir"]: ".akromio",
      ["jobs"]: {
        ["catalogs"]: {
          ["path"]: "/jobs/catalogs/"
        }
      },
      ["git"]: {
        ["user"]: "akromio",
        ["repo"]: "docker",
        ["branch"]: "master",
        ["prefix"]: ""
      },
      ["http"]: {
        ["host"]: "skynet.apm.akromio.com",
        ["base"]: "/"
      },
      ["skynet"]: {
        ["portal"]: skyportal
      }
    };
    suite("parse()", () => {
      {
        suite("fs", () => {
          {
            test("when name=fs://absoluteBasePath, {name, impl, basePath} must be returned", () => {
              {
                const out = parser.parse("test=fs:///my/dir", defaults);
                expected(out).equalTo({
                  'name': "test",
                  'impl': "fs",
                  'basePath': "/my/dir"
                });
              }
            });
            test("when fs://absoluteBasePath, {name = fs, impl, basePath} must be returned", () => {
              {
                const out = parser.parse("fs:///my/dir", defaults);
                expected(out).equalTo({
                  'name': "fs",
                  'impl': "fs",
                  'basePath': "/my/dir"
                });
              }
            });
            test("when name=fs://relativeBasePath, error must be raised", () => {
              {
                const out = _core.dogma.peval(() => {
                  return parser.parse("test=fs://my/dir", defaults);
                });
                expected(out).it(0).equalTo(false).it(1).equalTo(TypeError("FS registry expecting an absolute base path: my/dir."));
              }
            });
          }
        });
        suite("git", () => {
          {
            test("when name=git://repo, default user and branch must be used", () => {
              {
                const out = parser.parse("test=git://mydocker", defaults);
                expected(out).equalTo({
                  'name': "test",
                  'impl': "git",
                  'user': defaults.git.user,
                  'repo': "mydocker",
                  'branch': defaults.git.branch,
                  'prefix': ""
                });
              }
            });
            test("when name=git://user/repo, default branch must be used", () => {
              {
                const out = parser.parse("test=git://myuser/mydocker", defaults);
                expected(out).equalTo({
                  'name': "test",
                  'impl': "git",
                  'user': "myuser",
                  'repo': "mydocker",
                  'branch': defaults.git.branch,
                  'prefix': ""
                });
              }
            });
            test("when name=git://user/repo/mybranch, no default must be used", () => {
              {
                const out = parser.parse("test=git://myuser/mydocker/mybranch", defaults);
                expected(out).equalTo({
                  'name': "test",
                  'impl': "git",
                  'user': "myuser",
                  'repo': "mydocker",
                  'branch': "mybranch",
                  'prefix': ""
                });
              }
            });
            test("when name=git://user/repo/mybranch/prefix, no default must be used", () => {
              {
                const out = parser.parse("test=git://myuser/mydocker/mybranch/pref/ix", defaults);
                expected(out).equalTo({
                  'name': "test",
                  'impl': "git",
                  'user': "myuser",
                  'repo': "mydocker",
                  'branch': "mybranch",
                  'prefix': "pref/ix"
                });
              }
            });
            test("when invalid configuration, error raised", () => {
              {
                const conf = "";
                const out = _core.dogma.peval(() => {
                  return parser.parse(`test=git://${conf}`, defaults);
                });
                expected(out).it(0).equalTo(false).it(1).equalTo(TypeError(`Invalid git configuration: ${conf}.`));
              }
            });
          }
        });
        suite("http", () => {
          {
            test("when http://, defaults must be used", () => {
              {
                const out = parser.parse("test=http://", defaults);
                expected(out).equalTo({
                  'name': "test",
                  'impl': "http",
                  'host': defaults.http.host,
                  'base': defaults.http.base
                });
              }
            });
            test("when http://host, default base and branch must be used", () => {
              {
                const out = parser.parse("http://my.domain.com", defaults);
                expected(out).equalTo({
                  'name': "http",
                  'impl': "http",
                  'host': "my.domain.com",
                  'base': defaults.http.base
                });
              }
            });
            test("when http://host/base, no default must be used", () => {
              {
                const out = parser.parse("http://my.domain.com/mybase", defaults);
                expected(out).equalTo({
                  'name': "http",
                  'impl': "http",
                  'host': "my.domain.com",
                  'base': "/mybase"
                });
              }
            });
          }
        });
        suite("skynet", () => {
          {
            test("when skynet://skylink, default portal must be used", () => {
              {
                const out = parser.parse(`sky=skynet://${skylink}`, defaults);
                expected(out).equalTo({
                  'name': "sky",
                  'impl': "skynet",
                  'portal': defaults.skynet.portal,
                  'skylink': skylink
                });
              }
            });
            test("when skynet://portal/skylink, no default must be used", () => {
              {
                const out = parser.parse(`skynet://${skyportal}/${skylink}`, defaults);
                expected(out).equalTo({
                  'name': "skynet",
                  'impl': "skynet",
                  'portal': skyportal,
                  'skylink': skylink
                });
              }
            });
            test("when skynet://, defaults must be used", () => {
              {
                const out = parser.parse(`skynet://`, defaults);
                expected(out).equalTo({
                  'name': "skynet",
                  'impl': "skynet",
                  'portal': defaults.skynet.portal,
                  'skylink': defaults.skynet.skylink
                });
              }
            });
            test("when conf string is invalid, error must be raised", () => {
              {
                const out = _core.dogma.peval(() => {
                  return parser.parse(`sky=skynet://${skyportal}/${skylink}/additional`, defaults);
                });
                expected(out).it(0).equalTo(false).it(1).toBe(TypeError).like("Invalid skynet configuration");
              }
            });
          }
        });
        suite("misc", () => {
          {
            test("when name not indicated, protocol used", () => {
              {
                const out = parser.parse("git://userName/repoName/branchName", defaults);
                expected(out).toHave({
                  'name': "git",
                  'impl': "git",
                  'user': "userName",
                  'repo': "repoName",
                  'branch': "branchName"
                });
              }
            });
            test("when invalid registry string, error must be raised", () => {
              {
                const rs = `skynet=skinet=${skyportal}/${skylink}`;
                const out = _core.dogma.peval(() => {
                  return parser.parse(rs, defaults);
                });
                expected(out).it(0).equalTo(false).it(1).equalTo(TypeError(`Invalid registry string: ${rs}.`));
              }
            });
            test("when impl not known, error must be raised", () => {
              {
                const out = _core.dogma.peval(() => {
                  return parser.parse("test=GIT://user/repo", defaults);
                });
                expected(out).it(0).equalTo(false).it(1).equalTo(TypeError("Unknown registry implementation: GIT."));
              }
            });
          }
        });
      }
    });
  }
});