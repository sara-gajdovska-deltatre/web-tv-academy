/* prettier-ignore */ /* eslint:disable */
var Nd=Object.create;
var Ra = Object.defineProperty;
var Id = Object.getOwnPropertyDescriptor;
var Dd = Object.getOwnPropertyNames;
var Od = Object.getPrototypeOf,
  Pd = Object.prototype.hasOwnProperty;
var kd = (e) => Ra(e, "__esModule", { value: !0 });
var A = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var Fd = (e, t, r) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let n of Dd(t))
        !Pd.call(e, n) &&
          n !== "default" &&
          Ra(e, n, {
            get: () => t[n],
            enumerable: !(r = Id(t, n)) || r.enumerable,
          });
    return e;
  },
  Ze = (e) =>
    Fd(
      kd(
        Ra(
          e != null ? Nd(Od(e)) : {},
          "default",
          e && e.__esModule && "default" in e
            ? { get: () => e.default, enumerable: !0 }
            : { value: e, enumerable: !0 }
        )
      ),
      e
    );
var pu = A((Pa) => {
  "use strict";
  Object.defineProperty(Pa, "__esModule", { value: !0 });
  Pa.promisify = di;
  var cu = "__ES6-PROMISIFY--CUSTOM-ARGUMENTS__";
  function di(e) {
    if (typeof e != "function")
      throw new TypeError("Argument to promisify must be a function");
    var t = e[cu],
      r = di.Promise || Promise;
    if (typeof r != "function")
      throw new Error(
        "No Promise implementation found; do you need a polyfill?"
      );
    return function () {
      for (
        var n = this, a = arguments.length, s = new Array(a), o = 0;
        o < a;
        o++
      )
        s[o] = arguments[o];
      return new r(function (f, h) {
        s.push(function (c) {
          if (c) return h(c);
          for (
            var m = arguments.length, v = new Array(m > 1 ? m - 1 : 0), x = 1;
            x < m;
            x++
          )
            v[x - 1] = arguments[x];
          if (v.length === 1 || !t) return f(v[0]);
          var p = {};
          v.forEach(function (_, E) {
            var b = t[E];
            b && (p[b] = _);
          }),
            f(p);
        }),
          e.apply(n, s);
      });
    };
  }
  di.argumentNames = cu;
  di.Promise = void 0;
});
var ka = A((Iy, gu) => {
  "use strict";
  var du = process.platform === "win32",
    Ld = du ? /[^:]\\$/ : /.\/$/;
  gu.exports = function () {
    var e;
    return (
      du
        ? (e =
            process.env.TEMP ||
            process.env.TMP ||
            (process.env.SystemRoot || process.env.windir) + "\\temp")
        : (e =
            process.env.TMPDIR ||
            process.env.TMP ||
            process.env.TEMP ||
            "/tmp"),
      Ld.test(e) && (e = e.slice(0, -1)),
      e
    );
  };
});
var gi = A((Dy, $t) => {
  "use strict";
  var qd = require("path"),
    mu = require("fs"),
    Ud = require("crypto"),
    Md = ka(),
    zd = process.env.PEMJS_TMPDIR || Md();
  $t.exports.isNumber = function (e) {
    return Array.isArray(e) ? !1 : /^\d+$/g.test(e);
  };
  $t.exports.isHex = function (t) {
    return /^(0x){0,1}([0-9A-F]{1,40}|[0-9A-F]{1,40})$/gi.test(t);
  };
  $t.exports.toHex = function (t) {
    for (var r = "", n = 0; n < t.length; n++)
      r += "" + t.charCodeAt(n).toString(16);
    return r;
  };
  $t.exports.ciphers = [
    "aes128",
    "aes192",
    "aes256",
    "camellia128",
    "camellia192",
    "camellia256",
    "des",
    "des3",
    "idea",
  ];
  var Wd = $t.exports.ciphers;
  $t.exports.createPasswordFile = function (e, t, r) {
    if (
      !e ||
      !Object.prototype.hasOwnProperty.call(e, "password") ||
      !Object.prototype.hasOwnProperty.call(e, "passType") ||
      !/^(word|in|out)$/.test(e.passType)
    )
      return !1;
    var n = qd.join(zd, Ud.randomBytes(20).toString("hex"));
    return (
      r.push(n),
      (e.password = e.password.trim()),
      e.password === "" && (e.mustPass = !0),
      e.cipher && Wd.indexOf(e.cipher) !== -1 && t.push("-" + e.cipher),
      t.push("-pass" + e.passType),
      e.mustPass
        ? t.push("pass:" + e.password)
        : (mu.writeFileSync(n, e.password), t.push("file:" + n)),
      !0
    );
  };
  $t.exports.deleteTempFiles = function (e, t) {
    var r = [];
    if (typeof e == "string") r.push(e);
    else if (Array.isArray(e)) r = e;
    else
      return t(
        new Error(
          "Unexcepted files parameter type; only string or array supported"
        )
      );
    var n = function (a, s) {
      if (a.length) {
        var o = a.shift(),
          f = function (h) {
            return h && h.code === "ENOENT" ? n(a, s) : h ? s(h) : n(a, s);
          };
        if (o && typeof o == "string") mu.unlink(o, f);
        else return n(a, s);
      } else return s(null);
    };
    n(r, t);
  };
});
var _u = A((Oy, yu) => {
  yu.exports = wu;
  wu.sync = Hd;
  var vu = require("fs");
  function jd(e, t) {
    var r = t.pathExt !== void 0 ? t.pathExt : process.env.PATHEXT;
    if (!r || ((r = r.split(";")), r.indexOf("") !== -1)) return !0;
    for (var n = 0; n < r.length; n++) {
      var a = r[n].toLowerCase();
      if (a && e.substr(-a.length).toLowerCase() === a) return !0;
    }
    return !1;
  }
  function xu(e, t, r) {
    return !e.isSymbolicLink() && !e.isFile() ? !1 : jd(t, r);
  }
  function wu(e, t, r) {
    vu.stat(e, function (n, a) {
      r(n, n ? !1 : xu(a, e, t));
    });
  }
  function Hd(e, t) {
    return xu(vu.statSync(e), e, t);
  }
});
var Tu = A((Py, Su) => {
  Su.exports = bu;
  bu.sync = Vd;
  var Eu = require("fs");
  function bu(e, t, r) {
    Eu.stat(e, function (n, a) {
      r(n, n ? !1 : Au(a, t));
    });
  }
  function Vd(e, t) {
    return Au(Eu.statSync(e), t);
  }
  function Au(e, t) {
    return e.isFile() && Gd(e, t);
  }
  function Gd(e, t) {
    var r = e.mode,
      n = e.uid,
      a = e.gid,
      s = t.uid !== void 0 ? t.uid : process.getuid && process.getuid(),
      o = t.gid !== void 0 ? t.gid : process.getgid && process.getgid(),
      f = parseInt("100", 8),
      h = parseInt("010", 8),
      l = parseInt("001", 8),
      c = f | h,
      m =
        r & l || (r & h && a === o) || (r & f && n === s) || (r & c && s === 0);
    return m;
  }
});
var Cu = A((Fy, Ru) => {
  var ky = require("fs"),
    mi;
  process.platform === "win32" || global.TESTING_WINDOWS
    ? (mi = _u())
    : (mi = Tu());
  Ru.exports = Fa;
  Fa.sync = Zd;
  function Fa(e, t, r) {
    if ((typeof t == "function" && ((r = t), (t = {})), !r)) {
      if (typeof Promise != "function")
        throw new TypeError("callback not provided");
      return new Promise(function (n, a) {
        Fa(e, t || {}, function (s, o) {
          s ? a(s) : n(o);
        });
      });
    }
    mi(e, t || {}, function (n, a) {
      n &&
        (n.code === "EACCES" || (t && t.ignoreErrors)) &&
        ((n = null), (a = !1)),
        r(n, a);
    });
  }
  function Zd(e, t) {
    try {
      return mi.sync(e, t || {});
    } catch (r) {
      if ((t && t.ignoreErrors) || r.code === "EACCES") return !1;
      throw r;
    }
  }
});
var Fu = A((By, ku) => {
  var kr =
      process.platform === "win32" ||
      process.env.OSTYPE === "cygwin" ||
      process.env.OSTYPE === "msys",
    Nu = require("path"),
    Xd = kr ? ";" : ":",
    Iu = Cu(),
    Du = (e) => Object.assign(new Error(`not found: ${e}`), { code: "ENOENT" }),
    Ou = (e, t) => {
      let r = t.colon || Xd,
        n =
          e.match(/\//) || (kr && e.match(/\\/))
            ? [""]
            : [
                ...(kr ? [process.cwd()] : []),
                ...(t.path || process.env.PATH || "").split(r),
              ],
        a = kr ? t.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "",
        s = kr ? a.split(r) : [""];
      return (
        kr && e.indexOf(".") !== -1 && s[0] !== "" && s.unshift(""),
        { pathEnv: n, pathExt: s, pathExtExe: a }
      );
    },
    Pu = (e, t, r) => {
      typeof t == "function" && ((r = t), (t = {})), t || (t = {});
      let { pathEnv: n, pathExt: a, pathExtExe: s } = Ou(e, t),
        o = [],
        f = (l) =>
          new Promise((c, m) => {
            if (l === n.length) return t.all && o.length ? c(o) : m(Du(e));
            let v = n[l],
              x = /^".*"$/.test(v) ? v.slice(1, -1) : v,
              p = Nu.join(x, e),
              _ = !x && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + p : p;
            c(h(_, l, 0));
          }),
        h = (l, c, m) =>
          new Promise((v, x) => {
            if (m === a.length) return v(f(c + 1));
            let p = a[m];
            Iu(l + p, { pathExt: s }, (_, E) => {
              if (!_ && E)
                if (t.all) o.push(l + p);
                else return v(l + p);
              return v(h(l, c, m + 1));
            });
          });
      return r ? f(0).then((l) => r(null, l), r) : f(0);
    },
    Kd = (e, t) => {
      t = t || {};
      let { pathEnv: r, pathExt: n, pathExtExe: a } = Ou(e, t),
        s = [];
      for (let o = 0; o < r.length; o++) {
        let f = r[o],
          h = /^".*"$/.test(f) ? f.slice(1, -1) : f,
          l = Nu.join(h, e),
          c = !h && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + l : l;
        for (let m = 0; m < n.length; m++) {
          let v = c + n[m];
          try {
            if (Iu.sync(v, { pathExt: a }))
              if (t.all) s.push(v);
              else return v;
          } catch {}
        }
      }
      if (t.all && s.length) return s;
      if (t.nothrow) return null;
      throw Du(e);
    };
  ku.exports = Pu;
  Pu.sync = Kd;
});
var qa = A((Ly, Uu) => {
  var Yd = gi(),
    $d = require("child_process").spawn,
    Qd = require("path"),
    Jd = require("fs"),
    e0 = ka(),
    t0 = require("crypto"),
    r0 = Fu(),
    Bu = {},
    n0 = process.env.PEMJS_TMPDIR || e0();
  function Lu(e, t) {
    Bu[e] = t;
  }
  function qu(e) {
    return Bu[e] || null;
  }
  function i0(e, t, r, n) {
    !n && typeof r == "function" && ((n = r), (r = !1)),
      La(e, r, function (a, s, o, f) {
        var h, l;
        return a
          ? n(a)
          : ((h = o.match(new RegExp("\\-+BEGIN " + t + "\\-+$", "m")))
              ? (h = h.index)
              : (h = -1),
            t === "EC PARAMETERS" && (t = "EC PRIVATE KEY"),
            (l = o.match(new RegExp("^\\-+END " + t + "\\-+", "m")))
              ? (l = l.index + l[0].length)
              : (l = -1),
            h >= 0 && l >= 0
              ? n(null, o.substring(h, l))
              : n(
                  new Error(
                    t +
                      ` not found from openssl output:
---stdout---
` +
                      o +
                      `
---stderr---
` +
                      f +
                      `
code: ` +
                      s
                  )
                ));
      });
  }
  function a0(e, t, r) {
    !r && typeof t == "function" && ((r = t), (t = !1)),
      La(e, t, !0, function (n, a, s, o) {
        return n ? r(n) : r(null, s);
      });
  }
  function Ba(e, t, r) {
    var n = qu("pathOpenSSL") || process.env.OPENSSL_BIN || "openssl";
    s0(n, function (a) {
      if (a) return r(a);
      var s = $d(n, e),
        o = "",
        f = t ? Buffer.alloc(0) : "";
      s.stdout.on("data", function (v) {
        t ? (f = Buffer.concat([f, v])) : (f += v.toString("binary"));
      }),
        s.stderr.on("data", function (v) {
          o += v.toString("binary");
        });
      var h = 2,
        l = -1,
        c = !1,
        m = function (v) {
          if (!c) {
            if (v) return (c = !0), r(v);
            if (--h < 1)
              return (
                (c = !0),
                l
                  ? l === 2 && (o === "" || /depth lookup: unable to/.test(o))
                    ? r(null, l, f, o)
                    : r(
                        new Error(
                          "Invalid openssl exit code: " +
                            l +
                            `
% openssl ` +
                            e.join(" ") +
                            `
` +
                            o
                        ),
                        l
                      )
                  : r(null, l, f, o)
              );
          }
        };
      s.on("error", m),
        s.on("exit", function (v) {
          (l = v), m();
        }),
        s.on("close", function () {
          (f = t ? f : Buffer.from(f, "binary").toString("utf-8")),
            (o = Buffer.from(o, "binary").toString("utf-8")),
            m();
        });
    });
  }
  function La(e, t, r, n) {
    !n && typeof r == "function" && ((n = r), (r = !1));
    var a = [],
      s = [];
    if (t) {
      t = [].concat(t);
      var o, f;
      for (f = 0; f < e.length; f++)
        e[f] === "--TMPFILE--" &&
          ((o = Qd.join(n0, t0.randomBytes(20).toString("hex"))),
          a.push({ path: o, contents: t.shift() }),
          (e[f] = o),
          s.push(o));
    }
    var h;
    for (f = 0; f < a.length; f++)
      (h = a[f]), Jd.writeFileSync(h.path, h.contents);
    Ba(e, r, function (l, c, m, v) {
      Yd.deleteTempFiles(s, function (x) {
        n(l || x, c, m, v);
      });
    });
  }
  function s0(e, t) {
    r0(e, function (r) {
      if (r)
        return t(
          new Error("Could not find openssl on your system on this path: " + e)
        );
      t();
    });
  }
  Ba(["version"], !1, function (e, t, r, n) {
    var a =
        String(r) +
        `
` +
        String(n) +
        `
` +
        String(e),
      s = a.match(/^LibreSSL/i);
    Lu("openSslVersion", (s && s[0] ? "LibreSSL" : "openssl").toUpperCase());
  });
  Uu.exports = {
    exec: i0,
    execBinary: a0,
    spawn: Ba,
    spawnWrapper: La,
    set: Lu,
    get: qu,
  };
});
var Mu = A((qy, Jt) => {
  "use strict";
  var Qt = qa(),
    kt = gi();
  Jt.exports.PEM2DER = function (e, t, r, n) {
    !n && typeof r == "function" && ((n = r), (r = "x509"));
    var a = [r, "-outform", "der", "-in", e, "-out", t];
    Qt.spawnWrapper(a, !1, function (s, o) {
      s ? n(s) : n(null, o === 0);
    });
  };
  Jt.exports.DER2PEM = function (e, t, r, n) {
    !n && typeof r == "function" && ((n = r), (r = "x509"));
    var a = [r, "-inform", "der", "-in", e, "-out", t];
    Qt.spawnWrapper(a, !1, function (s, o) {
      s ? n(s) : n(null, o === 0);
    });
  };
  Jt.exports.PEM2P7B = function (e, t, r) {
    var n = ["crl2pkcs7", "-nocrl", "-certfile", e.cert, "-out", t];
    e.ca &&
      (Array.isArray(e.ca) || (e.ca = [e.ca]),
      e.ca.forEach(function (a) {
        n.push("-certfile"), n.push(a);
      })),
      Qt.spawnWrapper(n, !1, function (a, s) {
        a ? r(a) : r(null, s === 0);
      });
  };
  Jt.exports.P7B2PEM = function (e, t, r) {
    var n = ["pkcs7", "-print_certs", "-in", e, "-out", t];
    Qt.spawnWrapper(n, !1, function (a, s) {
      a ? r(a) : r(null, s === 0);
    });
  };
  Jt.exports.PEM2PFX = function (e, t, r, n) {
    var a = ["pkcs12", "-export", "-out", t, "-inkey", e.key, "-in", e.cert];
    e.ca &&
      (Array.isArray(e.ca) || (e.ca = [e.ca]),
      e.ca.forEach(function (o) {
        a.push("-certfile"), a.push(o);
      }));
    var s = [];
    kt.createPasswordFile({ cipher: "", password: r, passType: "in" }, a, s),
      kt.createPasswordFile({ cipher: "", password: r, passType: "out" }, a, s),
      Qt.spawnWrapper(a, !1, function (o, f) {
        function h(l) {
          l ? n(l) : n(null, f === 0);
        }
        kt.deleteTempFiles(s, function (l) {
          h(o || l);
        });
      });
  };
  Jt.exports.PFX2PEM = function (e, t, r, n) {
    var a = ["pkcs12", "-in", e, "-out", t, "-nodes"],
      s = [];
    kt.createPasswordFile({ cipher: "", password: r, passType: "in" }, a, s),
      kt.createPasswordFile({ cipher: "", password: r, passType: "out" }, a, s),
      Qt.spawnWrapper(a, !1, function (o, f) {
        function h(l) {
          l ? n(l) : n(null, f === 0);
        }
        kt.deleteTempFiles(s, function (l) {
          h(o || l);
        });
      });
  };
  Jt.exports.P7B2PFX = function (e, t, r, n) {
    var a = e.cert.replace(/\.[^.]+$/, ".cer"),
      s = ["pkcs7", "-print_certs", "-in", e.cert, "-out", a];
    Qt.spawnWrapper(s, !1, function (o, f) {
      if (o) n(o);
      else {
        var h = ["pkcs12", "-export", "-in", a, "-inkey", e.key, "-out", t];
        e.ca &&
          (Array.isArray(e.ca) || (e.ca = [e.ca]),
          e.ca.forEach(function (c) {
            h.push("-certfile"), h.push(c);
          }));
        var l = [a];
        kt.createPasswordFile(
          { cipher: "", password: r, passType: "in" },
          h,
          l
        ),
          kt.createPasswordFile(
            { cipher: "", password: r, passType: "out" },
            h,
            l
          ),
          Qt.spawnWrapper(h, !1, function (c, m) {
            function v(x) {
              x ? n(x) : n(null, m === 0);
            }
            kt.deleteTempFiles(l, function (x) {
              v(c || x);
            });
          });
      }
    });
  };
});
var Qu = A((Uy, Ee) => {
  "use strict";
  var { promisify: Me } = pu(),
    Ua = require("net"),
    pe = gi(),
    Ie = qa();
  Ee.exports.createPrivateKey = vi;
  Ee.exports.createDhparam = zu;
  Ee.exports.createEcparam = Wu;
  Ee.exports.createCSR = xi;
  Ee.exports.createCertificate = wi;
  Ee.exports.readCertificateInfo = Ma;
  Ee.exports.getPublicKey = ju;
  Ee.exports.getFingerprint = Gu;
  Ee.exports.getModulus = Hu;
  Ee.exports.getDhparamInfo = Vu;
  Ee.exports.createPkcs12 = Zu;
  Ee.exports.readPkcs12 = Xu;
  Ee.exports.verifySigningChain = $u;
  Ee.exports.checkCertificate = Ku;
  Ee.exports.checkPkcs12 = Yu;
  Ee.exports.config = g0;
  Ee.exports.convert = Mu();
  var o0 = "-----BEGIN PRIVATE KEY-----",
    u0 = "-----END PRIVATE KEY-----",
    f0 = "-----BEGIN RSA PRIVATE KEY-----",
    l0 = "-----END RSA PRIVATE KEY-----",
    h0 = "-----BEGIN ENCRYPTED PRIVATE KEY-----",
    c0 = "-----END ENCRYPTED PRIVATE KEY-----",
    p0 = "-----BEGIN CERTIFICATE-----",
    d0 = "-----END CERTIFICATE-----";
  function vi(e, t, r) {
    !r && !t && typeof e == "function"
      ? ((r = e), (e = void 0), (t = {}))
      : !r && e && typeof t == "function" && ((r = t), (t = {})),
      (e = Number(e) || 2048);
    var n = ["genrsa"],
      a = [];
    t &&
      t.cipher &&
      Number(pe.ciphers.indexOf(t.cipher)) !== -1 &&
      t.password &&
      pe.createPasswordFile(
        { cipher: t.cipher, password: t.password, passType: "out" },
        n,
        a
      ),
      n.push(e),
      Ie.exec(n, "RSA PRIVATE KEY", function (s, o) {
        function f(h) {
          if (h) return r(h);
          r(null, { key: o });
        }
        pe.deleteTempFiles(a, function (h) {
          f(s || h);
        });
      });
  }
  function zu(e, t) {
    !t && typeof e == "function" && ((t = e), (e = void 0)),
      (e = Number(e) || 512);
    var r = ["dhparam", "-outform", "PEM", e];
    Ie.exec(r, "DH PARAMETERS", function (n, a) {
      return n ? t(n) : t(null, { dhparam: a });
    });
  }
  function Wu(e, t, r, n) {
    !n && typeof r == "undefined" && !t && typeof e == "function"
      ? ((n = e), (e = void 0))
      : !n && typeof r == "undefined" && e && typeof t == "function"
      ? ((n = t), (t = void 0))
      : !n && typeof r == "function" && e && t && ((n = r), (r = void 0)),
      (e = e || "secp256k1"),
      (t = t || "explicit"),
      (r = r || !1);
    var a = ["ecparam", "-name", e, "-genkey", "-param_enc", t],
      s = "EC PARAMETERS";
    r && (a.push("-noout"), (s = "EC PRIVATE KEY")),
      Ie.exec(a, s, function (o, f) {
        return o ? n(o) : n(null, { ecparam: f });
      });
  }
  function xi(e, t) {
    if (
      (!t && typeof e == "function" && ((t = e), (e = void 0)),
      (e = e || {}),
      e.commonName &&
        (Ua.isIPv4(e.commonName) || Ua.isIPv6(e.commonName)) &&
        (e.altNames
          ? e.altNames.indexOf(e.commonName) === -1 &&
            (e.altNames = e.altNames.concat([e.commonName]))
          : (e.altNames = [e.commonName])),
      !e.clientKey)
    ) {
      vi(e.keyBitsize || 2048, function (h, l) {
        if (h) return t(h);
        (e.clientKey = l.key), xi(e, t);
      });
      return;
    }
    var r = ["req", "-new", "-" + (e.hash || "sha256")];
    e.csrConfigFile
      ? (r.push("-config"), r.push(e.csrConfigFile))
      : (r.push("-subj"), r.push(v0(e))),
      r.push("-key"),
      r.push("--TMPFILE--");
    var n = [e.clientKey],
      a = null;
    if (e.altNames && Array.isArray(e.altNames) && e.altNames.length) {
      r.push("-extensions"),
        r.push("v3_req"),
        r.push("-config"),
        r.push("--TMPFILE--");
      for (var s = [], o = 0; o < e.altNames.length; o++)
        s.push(
          (Ua.isIP(e.altNames[o]) ? "IP" : "DNS") +
            "." +
            (o + 1) +
            " = " +
            e.altNames[o]
        );
      n.push(
        (a = [
          "[req]",
          "req_extensions = v3_req",
          "distinguished_name = req_distinguished_name",
          "[v3_req]",
          "subjectAltName = @alt_names",
          "[alt_names]",
          s.join(`
`),
          "[req_distinguished_name]",
          "commonName = Common Name",
          "commonName_max = 64",
        ].join(`
`))
      );
    } else e.config && (a = e.config);
    var f = [];
    e.clientKeyPassword &&
      pe.createPasswordFile(
        { cipher: "", password: e.clientKeyPassword, passType: "in" },
        r,
        f
      ),
      Ie.exec(r, "CERTIFICATE REQUEST", n, function (h, l) {
        function c(m) {
          if (m) return t(m);
          t(null, { csr: l, config: a, clientKey: e.clientKey });
        }
        pe.deleteTempFiles(f, function (m) {
          c(h || m);
        });
      });
  }
  function wi(e, t) {
    if (
      (!t && typeof e == "function" && ((t = e), (e = void 0)),
      (e = e || {}),
      !e.csr)
    ) {
      xi(e, function (r, n) {
        if (r) return t(r);
        (e.csr = n.csr),
          (e.config = n.config),
          (e.clientKey = n.clientKey),
          wi(e, t);
      });
      return;
    }
    if ((e.clientKey || (e.clientKey = ""), !e.serviceKey))
      if (e.selfSigned) e.serviceKey = e.clientKey;
      else {
        vi(e.keyBitsize || 2048, function (r, n) {
          if (r) return t(r);
          (e.serviceKey = n.key), wi(e, t);
        });
        return;
      }
    Ma(e.csr, function (r, n) {
      if (r) return t(r);
      var a = [
          "x509",
          "-req",
          "-" + (e.hash || "sha256"),
          "-days",
          Number(e.days) || "365",
          "-in",
          "--TMPFILE--",
        ],
        s = [e.csr],
        o = [];
      if (
        (e.serviceCertificate
          ? (a.push("-CA"),
            a.push("--TMPFILE--"),
            a.push("-CAkey"),
            a.push("--TMPFILE--"),
            e.serial
              ? (a.push("-set_serial"),
                pe.isNumber(e.serial)
                  ? a.push(
                      "0x" +
                        (
                          "0000000000000000000000000000000000000000" +
                          e.serial.toString(16)
                        ).slice(-40)
                    )
                  : pe.isHex(e.serial)
                  ? (e.serial.startsWith("0x") &&
                      (e.serial = e.serial.substring(2, e.serial.length)),
                    a.push(
                      "0x" +
                        (
                          "0000000000000000000000000000000000000000" + e.serial
                        ).slice(-40)
                    ))
                  : a.push(
                      "0x" +
                        (
                          "0000000000000000000000000000000000000000" +
                          pe.toHex(e.serial)
                        ).slice(-40)
                    ))
              : (a.push("-CAcreateserial"),
                e.serialFile &&
                  (a.push("-CAserial"), a.push(e.serialFile + ".srl"))),
            e.serviceKeyPassword &&
              pe.createPasswordFile(
                { cipher: "", password: e.serviceKeyPassword, passType: "in" },
                a,
                o
              ),
            s.push(e.serviceCertificate),
            s.push(e.serviceKey))
          : (a.push("-signkey"),
            a.push("--TMPFILE--"),
            e.serviceKeyPassword &&
              pe.createPasswordFile(
                { cipher: "", password: e.serviceKeyPassword, passType: "in" },
                a,
                o
              ),
            s.push(e.serviceKey)),
        e.config)
      )
        a.push("-extensions"),
          a.push("v3_req"),
          a.push("-extfile"),
          a.push("--TMPFILE--"),
          s.push(e.config);
      else if (e.extFile) a.push("-extfile"), a.push(e.extFile);
      else {
        var f = [];
        if (n && n.san) {
          for (var h = 0; h < n.san.dns.length; h++)
            f.push("DNS." + (h + 1) + " = " + n.san.dns[h]);
          for (var l = 0; l < n.san.ip.length; l++)
            f.push("IP." + (l + 1) + " = " + n.san.ip[l]);
          for (var c = 0; c < n.san.email.length; c++)
            f.push("email." + (c + 1) + " = " + n.san.email[c]);
          a.push("-extensions"),
            a.push("v3_req"),
            a.push("-extfile"),
            a.push("--TMPFILE--"),
            s.push(
              [
                "[v3_req]",
                "subjectAltName = @alt_names",
                "[alt_names]",
                f.join(`
`),
              ].join(`
`)
            );
        }
      }
      e.clientKeyPassword &&
        pe.createPasswordFile(
          { cipher: "", password: e.clientKeyPassword, passType: "in" },
          a,
          o
        ),
        Ie.exec(a, "CERTIFICATE", s, function (m, v) {
          function x(p) {
            if (p) return t(p);
            var _ = {
              csr: e.csr,
              clientKey: e.clientKey,
              certificate: v,
              serviceKey: e.serviceKey,
            };
            return t(null, _);
          }
          pe.deleteTempFiles(o, function (p) {
            x(m || p);
          });
        });
    });
  }
  function ju(e, t) {
    !t && typeof e == "function" && ((t = e), (e = void 0)),
      (e = (e || "").toString());
    var r;
    e.match(/BEGIN(\sNEW)? CERTIFICATE REQUEST/)
      ? (r = ["req", "-in", "--TMPFILE--", "-pubkey", "-noout"])
      : e.match(/BEGIN RSA PRIVATE KEY/) || e.match(/BEGIN PRIVATE KEY/)
      ? (r = ["rsa", "-in", "--TMPFILE--", "-pubout"])
      : (r = ["x509", "-in", "--TMPFILE--", "-pubkey", "-noout"]),
      Ie.exec(r, "PUBLIC KEY", e, function (n, a) {
        return n ? t(n) : t(null, { publicKey: a });
      });
  }
  function Ma(e, t) {
    !t && typeof e == "function" && ((t = e), (e = void 0)),
      (e = (e || "").toString());
    var r = e.match(/BEGIN(\sNEW)? CERTIFICATE REQUEST/),
      n = r ? "req" : "x509",
      a = [
        n,
        "-noout",
        "-nameopt",
        "RFC2253,sep_multiline,space_eq,-esc_msb,utf8",
        "-text",
        "-in",
        "--TMPFILE--",
      ];
    Ie.spawnWrapper(a, e, function (s, o, f, h) {
      return s ? t(s) : h ? t(h) : m0(f, t);
    });
  }
  function Hu(e, t, r, n) {
    !n && !r && typeof t == "function"
      ? ((n = t), (t = void 0), (r = !1))
      : !n && r && typeof r == "function" && ((n = r), (r = !1)),
      r && r !== "md5" && (r = !1),
      (e = (Buffer.isBuffer(e) && e.toString()) || e);
    var a = "";
    e.match(/BEGIN(\sNEW)? CERTIFICATE REQUEST/)
      ? (a = "req")
      : e.match(/BEGIN RSA PRIVATE KEY/) || e.match(/BEGIN PRIVATE KEY/)
      ? (a = "rsa")
      : (a = "x509");
    var s = [a, "-noout", "-modulus", "-in", "--TMPFILE--"],
      o = [];
    t &&
      pe.createPasswordFile({ cipher: "", password: t, passType: "in" }, s, o),
      Ie.spawnWrapper(s, e, function (f, h, l, c) {
        function m(v) {
          if (v) return n(v);
          var x = l.match(/Modulus=([0-9a-fA-F]+)$/m);
          return x
            ? n(null, { modulus: r ? require(r)(x[1]) : x[1] })
            : n(new Error("No modulus"));
        }
        pe.deleteTempFiles(o, function (v) {
          m(f || v || c);
        });
      });
  }
  function Vu(e, t) {
    e = (Buffer.isBuffer(e) && e.toString()) || e;
    var r = ["dhparam", "-text", "-in", "--TMPFILE--"];
    Ie.spawnWrapper(r, e, function (n, a, s, o) {
      if (n) return t(n);
      if (o) return t(o);
      var f = {},
        h = s.match(/Parameters: \((\d+) bit\)/);
      h && (f.size = Number(h[1]));
      var l = "";
      return (
        s
          .split(
            `
`
          )
          .forEach(function (c) {
            /\s+([0-9a-f][0-9a-f]:)+[0-9a-f]?[0-9a-f]?/g.test(c) &&
              (l += c.trim());
          }),
        l && (f.prime = l),
        !h && !l ? t(new Error("No DH info found")) : t(null, f)
      );
    });
  }
  function g0(e) {
    Object.keys(e).forEach(function (t) {
      Ie.set(t, e[t]);
    });
  }
  function Gu(e, t, r) {
    !r && typeof t == "function" && ((r = t), (t = void 0)), (t = t || "sha1");
    var n = ["x509", "-in", "--TMPFILE--", "-fingerprint", "-noout", "-" + t];
    Ie.spawnWrapper(n, e, function (a, s, o, f) {
      if (a) return r(a);
      if (f) return r(f);
      var h = o.match(/Fingerprint=([0-9a-fA-F:]+)$/m);
      return h
        ? r(null, { fingerprint: h[1] })
        : r(new Error("No fingerprint"));
    });
  }
  function Zu(e, t, r, n, a) {
    !a && typeof n == "function" && ((a = n), (n = {}));
    var s = ["pkcs12", "-export"],
      o = [];
    n.cipher &&
      n.clientKeyPassword &&
      pe.createPasswordFile(
        { cipher: n.cipher, password: n.clientKeyPassword, passType: "in" },
        s,
        o
      ),
      pe.createPasswordFile(
        { cipher: "", password: r, passType: "word" },
        s,
        o
      ),
      s.push("-in"),
      s.push("--TMPFILE--"),
      s.push("-inkey"),
      s.push("--TMPFILE--");
    var f = [t, e];
    n.certFiles &&
      (f.push(n.certFiles.join("")),
      s.push("-certfile"),
      s.push("--TMPFILE--")),
      Ie.execBinary(s, f, function (h, l) {
        function c(m) {
          return m ? a(m) : a(null, { pkcs12: l });
        }
        pe.deleteTempFiles(o, function (m) {
          c(h || m);
        });
      });
  }
  function Xu(e, t, r) {
    !r && typeof t == "function" && ((r = t), (t = {})),
      (t.p12Password = t.p12Password || "");
    var n = [],
      a = [],
      s = ["pkcs12", "-in", e];
    pe.createPasswordFile(
      { cipher: "", password: t.p12Password, passType: "in" },
      s,
      a
    ),
      Buffer.isBuffer(e) && ((n = [e]), (s[2] = "--TMPFILE--")),
      t.clientKeyPassword
        ? pe.createPasswordFile(
            { cipher: "", password: t.clientKeyPassword, passType: "out" },
            s,
            a
          )
        : s.push("-nodes"),
      Ie.execBinary(s, n, function (o, f) {
        function h(l) {
          var c = {};
          if (
            (l &&
              l.message.indexOf("No such file or directory") !== -1 &&
              (l.code = "ENOENT"),
            !l)
          ) {
            var m = yi(f, p0, d0);
            if (
              ((c.cert = m.shift()),
              (c.ca = m),
              (c.key = yi(f, o0, u0).pop()),
              c.key)
            )
              return Ie.exec(
                ["rsa", "-in", "--TMPFILE--"],
                "RSA PRIVATE KEY",
                [c.key],
                function (v, x) {
                  return (c.key = x), r(v, c);
                }
              );
            t.clientKeyPassword
              ? (c.key = yi(f, h0, c0).pop())
              : (c.key = yi(f, f0, l0).pop());
          }
          return r(l, c);
        }
        pe.deleteTempFiles(a, function (l) {
          h(o || l);
        });
      });
  }
  function Ku(e, t, r) {
    var n,
      a = [];
    !r && typeof t == "function" && ((r = t), (t = void 0)),
      (e = (e || "").toString()),
      e.match(/BEGIN(\sNEW)? CERTIFICATE REQUEST/)
        ? (n = ["req", "-text", "-noout", "-verify", "-in", "--TMPFILE--"])
        : e.match(/BEGIN RSA PRIVATE KEY/) || e.match(/BEGIN PRIVATE KEY/)
        ? (n = ["rsa", "-noout", "-check", "-in", "--TMPFILE--"])
        : (n = ["x509", "-text", "-noout", "-in", "--TMPFILE--"]),
      t &&
        pe.createPasswordFile(
          { cipher: "", password: t, passType: "in" },
          n,
          a
        ),
      Ie.spawnWrapper(n, e, function (s, o, f, h) {
        function l(c) {
          if (c && c.toString().trim() !== "verify OK") return r(c);
          var m;
          switch (n[0]) {
            case "rsa":
              m = /^Rsa key ok$/i.test(f.trim());
              break;
            default:
              m = /Signature Algorithm/im.test(f);
              break;
          }
          r(null, m);
        }
        pe.deleteTempFiles(a, function (c) {
          l(s || c || h);
        });
      });
  }
  function Yu(e, t, r) {
    !r && typeof t == "function" && ((r = t), (t = ""));
    var n = [],
      a = [],
      s = ["pkcs12", "-info", "-in", e, "-noout", "-maciter", "-nodes"];
    pe.createPasswordFile({ cipher: "", password: t, passType: "in" }, s, a),
      Buffer.isBuffer(e) && ((n = [e]), (s[3] = "--TMPFILE--")),
      Ie.spawnWrapper(s, n, function (o, f, h, l) {
        function c(m) {
          if (m) return r(m);
          r(
            null,
            /MAC verified OK/im.test(l) ||
              (!/MAC verified OK/im.test(l) && !/Mac verify error/im.test(l))
          );
        }
        pe.deleteTempFiles(a, function (m) {
          c(o || m);
        });
      });
  }
  function $u(e, t, r) {
    !r && typeof t == "function" && ((r = t), (t = void 0)),
      Array.isArray(e) || (e = [e]),
      !Array.isArray(t) && t !== void 0 && t !== "" && (t = [t]);
    var n = [];
    t !== void 0 &&
      n.push(
        t.join(`
`)
      ),
      n.push(
        e.join(`
`)
      );
    var a = ["verify"];
    t !== void 0 && (a.push("-CAfile"), a.push("--TMPFILE--")),
      a.push("--TMPFILE--"),
      Ie.spawnWrapper(a, n, function (s, o, f, h) {
        if (s) return r(s);
        r(null, f.trim().slice(-4) === ": OK");
      });
  }
  function m0(e, t) {
    try {
      e = (e || "").toString();
      var r,
        n,
        a,
        s,
        o = { issuer: {} },
        f = {},
        h,
        l,
        c;
      if (
        ((r = e.match(/\s*Serial Number:\r?\n?\s*([^\r\n]*)\r?\n\s*\b/)) &&
          r.length > 1 &&
          (o.serial = r[1]),
        (n = e.match(
          /\s*Subject:\r?\n(\s*(([a-zA-Z0-9.]+)\s=\s[^\r\n]+\r?\n))*\s*\b/
        )) && n.length > 1)
      ) {
        if (((n = n[0]), (a = ht(n, /\s([a-zA-Z0-9.]+)\s=\s([^\r\n].*)/g)), a))
          for (c = 0; c < a.length; c++)
            (l = a[c][1].trim()),
              !(l.match("(C|ST|L|O|OU|CN|emailAddress|DC)") || l === "") &&
                (o[l] = a[c][2].trim());
        (a = n.match(/\sC\s=\s([^\r\n].*?)[\r\n]/)),
          (o.country = (a && a[1]) || ""),
          (a = n.match(/\sST\s=\s([^\r\n].*?)[\r\n]/)),
          (o.state = (a && a[1]) || ""),
          (a = n.match(/\sL\s=\s([^\r\n].*?)[\r\n]/)),
          (o.locality = (a && a[1]) || ""),
          (a = ht(n, /\sO\s=\s([^\r\n].*)/g)),
          (o.organization = a
            ? a.length > 1
              ? a
                  .sort(function (m, v) {
                    var x = m[1].toUpperCase(),
                      p = v[1].toUpperCase();
                    return p > x ? -1 : x > p ? 1 : 0;
                  })
                  .sort(function (m, v) {
                    return m[1].length - v[1].length;
                  })
                  .map(function (m) {
                    return m[1];
                  })
              : a[0][1]
            : ""),
          (a = ht(n, /\sOU\s=\s([^\r\n].*)/g)),
          (o.organizationUnit = a
            ? a.length > 1
              ? a
                  .sort(function (m, v) {
                    var x = m[1].toUpperCase(),
                      p = v[1].toUpperCase();
                    return p > x ? -1 : x > p ? 1 : 0;
                  })
                  .sort(function (m, v) {
                    return m[1].length - v[1].length;
                  })
                  .map(function (m) {
                    return m[1];
                  })
              : a[0][1]
            : ""),
          (a = ht(n, /\sCN\s=\s([^\r\n].*)/g)),
          (o.commonName = a
            ? a.length > 1
              ? a
                  .sort(function (m, v) {
                    var x = m[1].toUpperCase(),
                      p = v[1].toUpperCase();
                    return p > x ? -1 : x > p ? 1 : 0;
                  })
                  .sort(function (m, v) {
                    return m[1].length - v[1].length;
                  })
                  .map(function (m) {
                    return m[1];
                  })
              : a[0][1]
            : ""),
          (a = ht(n, /emailAddress\s=\s([^\r\n].*)/g)),
          (o.emailAddress = a
            ? a.length > 1
              ? a
                  .sort(function (m, v) {
                    var x = m[1].toUpperCase(),
                      p = v[1].toUpperCase();
                    return p > x ? -1 : x > p ? 1 : 0;
                  })
                  .sort(function (m, v) {
                    return m[1].length - v[1].length;
                  })
                  .map(function (m) {
                    return m[1];
                  })
              : a[0][1]
            : ""),
          (a = ht(n, /\sDC\s=\s([^\r\n].*)/g)),
          (o.dc = a
            ? a.length > 1
              ? a
                  .sort(function (m, v) {
                    var x = m[1].toUpperCase(),
                      p = v[1].toUpperCase();
                    return p > x ? -1 : x > p ? 1 : 0;
                  })
                  .sort(function (m, v) {
                    return m[1].length - v[1].length;
                  })
                  .map(function (m) {
                    return m[1];
                  })
              : a[0][1]
            : "");
      }
      if (
        (s = e.match(
          /\s*Issuer:\r?\n(\s*([a-zA-Z0-9.]+)\s=\s[^\r\n].*\r?\n)*\s*\b/
        )) &&
        s.length > 1
      ) {
        for (
          s = s[0], a = ht(s, /\s([a-zA-Z0-9.]+)\s=\s([^\r\n].*)/g), c = 0;
          c < a.length;
          c++
        )
          (l = a[c][1].toString()),
            !l.match("(C|ST|L|O|OU|CN|emailAddress|DC)") &&
              (o.issuer[l] = a[c][2].toString());
        (a = s.match(/\sC\s=\s([^\r\n].*?)[\r\n]/)),
          (o.issuer.country = (a && a[1]) || ""),
          (a = s.match(/\sST\s=\s([^\r\n].*?)[\r\n]/)),
          (o.issuer.state = (a && a[1]) || ""),
          (a = s.match(/\sL\s=\s([^\r\n].*?)[\r\n]/)),
          (o.issuer.locality = (a && a[1]) || ""),
          (a = ht(s, /\sO\s=\s([^\r\n].*)/g)),
          (o.issuer.organization = a
            ? a.length > 1
              ? a
                  .sort(function (m, v) {
                    var x = m[1].toUpperCase(),
                      p = v[1].toUpperCase();
                    return p > x ? -1 : x > p ? 1 : 0;
                  })
                  .sort(function (m, v) {
                    return m[1].length - v[1].length;
                  })
                  .map(function (m) {
                    return m[1];
                  })
              : a[0][1]
            : ""),
          (a = ht(s, /\sOU\s=\s([^\r\n].*)/g)),
          (o.issuer.organizationUnit = a
            ? a.length > 1
              ? a
                  .sort(function (m, v) {
                    var x = m[1].toUpperCase(),
                      p = v[1].toUpperCase();
                    return p > x ? -1 : x > p ? 1 : 0;
                  })
                  .sort(function (m, v) {
                    return m[1].length - v[1].length;
                  })
                  .map(function (m) {
                    return m[1];
                  })
              : a[0][1]
            : ""),
          (a = ht(s, /\sCN\s=\s([^\r\n].*)/g)),
          (o.issuer.commonName = a
            ? a.length > 1
              ? a
                  .sort(function (m, v) {
                    var x = m[1].toUpperCase(),
                      p = v[1].toUpperCase();
                    return p > x ? -1 : x > p ? 1 : 0;
                  })
                  .sort(function (m, v) {
                    return m[1].length - v[1].length;
                  })
                  .map(function (m) {
                    return m[1];
                  })
              : a[0][1]
            : ""),
          (a = ht(s, /\sDC\s=\s([^\r\n].*)/g)),
          (o.issuer.dc = a
            ? a.length > 1
              ? a
                  .sort(function (m, v) {
                    var x = m[1].toUpperCase(),
                      p = v[1].toUpperCase();
                    return p > x ? -1 : x > p ? 1 : 0;
                  })
                  .sort(function (m, v) {
                    return m[1].length - v[1].length;
                  })
                  .map(function (m) {
                    return m[1];
                  })
              : a[0][1]
            : "");
      }
      (h = e.match(/X509v3 Subject Alternative Name: \r?\n([^\r\n]*)\r?\n/)) &&
        h.length > 1 &&
        ((h =
          h[1].trim() +
          `
`),
        (o.san = {}),
        (a = za("DNS:([^,\\r\\n].*?)[,\\r\\n\\s]", h)),
        (o.san.dns = a || ""),
        (a = za("IP Address:([^,\\r\\n].*?)[,\\r\\n\\s]", h)),
        (o.san.ip = a || ""),
        (a = za("email:([^,\\r\\n].*?)[,\\r\\n\\s]", h)),
        (o.san.email = a || "")),
        (a = e.match(/Not Before\s?:\s?([^\r\n]*)\r?\n/)) &&
          a.length > 1 &&
          (f.start = Date.parse((a && a[1]) || "")),
        (a = e.match(/Not After\s?:\s?([^\r\n]*)\r?\n/)) &&
          a.length > 1 &&
          (f.end = Date.parse((a && a[1]) || "")),
        f.start && f.end && (o.validity = f),
        (a = e.match(/Signature Algorithm: ([^\r\n]*)\r?\n/)) &&
          a.length > 1 &&
          (o.signatureAlgorithm = (a && a[1]) || ""),
        (a = e.match(/Public[ -]Key: ([^\r\n]*)\r?\n/)) &&
          a.length > 1 &&
          (o.publicKeySize = ((a && a[1]) || "").replace(/[()]/g, "")),
        (a = e.match(/Public Key Algorithm: ([^\r\n]*)\r?\n/)) &&
          a.length > 1 &&
          (o.publicKeyAlgorithm = (a && a[1]) || ""),
        t(null, o);
    } catch (m) {
      t(m);
    }
  }
  function ht(e, t) {
    var r = [];
    return (
      e.replace(t, function () {
        var n = [].slice.call(arguments, 0),
          a = n.splice(-2);
        (n.index = a[0]), (n.input = a[1]), r.push(n);
      }),
      r.length ? r : null
    );
  }
  function za(e, t) {
    for (
      var r = new RegExp(e, "g"), n = t.match(r) || [], a = [], s, o, f = 0;
      f < n.length;
      f++
    )
      (s = new RegExp(e)), (o = n[f].match(s)), a.push(o[1]);
    return a;
  }
  function v0(e) {
    e = e || {};
    var t = {
        C: e.country || e.C,
        ST: e.state || e.ST,
        L: e.locality || e.L,
        O: e.organization || e.O,
        OU: e.organizationUnit || e.OU,
        CN: e.commonName || e.CN || "localhost",
        DC: e.dc || e.DC || "",
        emailAddress: e.emailAddress,
      },
      r = Object.keys(t).map(function (n) {
        if (t[n])
          if (typeof t[n] == "object" && t[n].length >= 1) {
            var a = "";
            return (
              t[n].map(function (s) {
                a += "/" + n + "=" + s.replace(/[^\w .*\-,@']+/g, " ").trim();
              }),
              a
            );
          } else
            return "/" + n + "=" + t[n].replace(/[^\w .*\-,@']+/g, " ").trim();
      });
    return r.join("");
  }
  function yi(e, t, r) {
    Buffer.isBuffer(e) && (e = e.toString("utf8"));
    var n = [];
    if (!e) return n;
    for (var a = e.indexOf(t); a !== -1; ) {
      e = e.substring(a);
      var s = e.indexOf(r);
      if (s === -1) break;
      (s += r.length), n.push(e.substring(0, s)), (a = e.indexOf(t, s));
    }
    return n;
  }
  Ee.exports.promisified = {
    createPrivateKey: Me(vi),
    createDhparam: Me(zu),
    createEcparam: Me(Wu),
    createCSR: Me(xi),
    createCertificate: Me(wi),
    readCertificateInfo: Me(Ma),
    getPublicKey: Me(ju),
    getFingerprint: Me(Gu),
    getModulus: Me(Hu),
    getDhparamInfo: Me(Vu),
    createPkcs12: Me(Zu),
    readPkcs12: Me(Xu),
    verifySigningChain: Me($u),
    checkCertificate: Me(Ku),
    checkPkcs12: Me(Yu),
  };
});
var yn = A((My, Wa) => {
  "use strict";
  typeof process == "undefined" ||
  !process.version ||
  process.version.indexOf("v0.") === 0 ||
  (process.version.indexOf("v1.") === 0 &&
    process.version.indexOf("v1.8.") !== 0)
    ? (Wa.exports = { nextTick: x0 })
    : (Wa.exports = process);
  function x0(e, t, r, n) {
    if (typeof e != "function")
      throw new TypeError('"callback" argument must be a function');
    var a = arguments.length,
      s,
      o;
    switch (a) {
      case 0:
      case 1:
        return process.nextTick(e);
      case 2:
        return process.nextTick(function () {
          e.call(null, t);
        });
      case 3:
        return process.nextTick(function () {
          e.call(null, t, r);
        });
      case 4:
        return process.nextTick(function () {
          e.call(null, t, r, n);
        });
      default:
        for (s = new Array(a - 1), o = 0; o < s.length; ) s[o++] = arguments[o];
        return process.nextTick(function () {
          e.apply(null, s);
        });
    }
  }
});
var ef = A((zy, Ju) => {
  var w0 = {}.toString;
  Ju.exports =
    Array.isArray ||
    function (e) {
      return w0.call(e) == "[object Array]";
    };
});
var ja = A((Wy, tf) => {
  tf.exports = require("stream");
});
var _n = A((Ha, nf) => {
  var _i = require("buffer"),
    Ft = _i.Buffer;
  function rf(e, t) {
    for (var r in e) t[r] = e[r];
  }
  Ft.from && Ft.alloc && Ft.allocUnsafe && Ft.allocUnsafeSlow
    ? (nf.exports = _i)
    : (rf(_i, Ha), (Ha.Buffer = Fr));
  function Fr(e, t, r) {
    return Ft(e, t, r);
  }
  rf(Ft, Fr);
  Fr.from = function (e, t, r) {
    if (typeof e == "number")
      throw new TypeError("Argument must not be a number");
    return Ft(e, t, r);
  };
  Fr.alloc = function (e, t, r) {
    if (typeof e != "number") throw new TypeError("Argument must be a number");
    var n = Ft(e);
    return (
      t !== void 0
        ? typeof r == "string"
          ? n.fill(t, r)
          : n.fill(t)
        : n.fill(0),
      n
    );
  };
  Fr.allocUnsafe = function (e) {
    if (typeof e != "number") throw new TypeError("Argument must be a number");
    return Ft(e);
  };
  Fr.allocUnsafeSlow = function (e) {
    if (typeof e != "number") throw new TypeError("Argument must be a number");
    return _i.SlowBuffer(e);
  };
});
var Br = A((Fe) => {
  function y0(e) {
    return Array.isArray ? Array.isArray(e) : Ei(e) === "[object Array]";
  }
  Fe.isArray = y0;
  function _0(e) {
    return typeof e == "boolean";
  }
  Fe.isBoolean = _0;
  function E0(e) {
    return e === null;
  }
  Fe.isNull = E0;
  function b0(e) {
    return e == null;
  }
  Fe.isNullOrUndefined = b0;
  function A0(e) {
    return typeof e == "number";
  }
  Fe.isNumber = A0;
  function S0(e) {
    return typeof e == "string";
  }
  Fe.isString = S0;
  function T0(e) {
    return typeof e == "symbol";
  }
  Fe.isSymbol = T0;
  function R0(e) {
    return e === void 0;
  }
  Fe.isUndefined = R0;
  function C0(e) {
    return Ei(e) === "[object RegExp]";
  }
  Fe.isRegExp = C0;
  function N0(e) {
    return typeof e == "object" && e !== null;
  }
  Fe.isObject = N0;
  function I0(e) {
    return Ei(e) === "[object Date]";
  }
  Fe.isDate = I0;
  function D0(e) {
    return Ei(e) === "[object Error]" || e instanceof Error;
  }
  Fe.isError = D0;
  function O0(e) {
    return typeof e == "function";
  }
  Fe.isFunction = O0;
  function P0(e) {
    return (
      e === null ||
      typeof e == "boolean" ||
      typeof e == "number" ||
      typeof e == "string" ||
      typeof e == "symbol" ||
      typeof e == "undefined"
    );
  }
  Fe.isPrimitive = P0;
  Fe.isBuffer = Buffer.isBuffer;
  function Ei(e) {
    return Object.prototype.toString.call(e);
  }
});
var af = A((Hy, Va) => {
  typeof Object.create == "function"
    ? (Va.exports = function (t, r) {
        r &&
          ((t.super_ = r),
          (t.prototype = Object.create(r.prototype, {
            constructor: {
              value: t,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          })));
      })
    : (Va.exports = function (t, r) {
        if (r) {
          t.super_ = r;
          var n = function () {};
          (n.prototype = r.prototype),
            (t.prototype = new n()),
            (t.prototype.constructor = t);
        }
      });
});
var Lr = A((Vy, Za) => {
  try {
    if (((Ga = require("util")), typeof Ga.inherits != "function")) throw "";
    Za.exports = Ga.inherits;
  } catch {
    Za.exports = af();
  }
  var Ga;
});
var of = A((Gy, Xa) => {
  "use strict";
  function k0(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }
  var sf = _n().Buffer,
    En = require("util");
  function F0(e, t, r) {
    e.copy(t, r);
  }
  Xa.exports = (function () {
    function e() {
      k0(this, e), (this.head = null), (this.tail = null), (this.length = 0);
    }
    return (
      (e.prototype.push = function (r) {
        var n = { data: r, next: null };
        this.length > 0 ? (this.tail.next = n) : (this.head = n),
          (this.tail = n),
          ++this.length;
      }),
      (e.prototype.unshift = function (r) {
        var n = { data: r, next: this.head };
        this.length === 0 && (this.tail = n), (this.head = n), ++this.length;
      }),
      (e.prototype.shift = function () {
        if (this.length !== 0) {
          var r = this.head.data;
          return (
            this.length === 1
              ? (this.head = this.tail = null)
              : (this.head = this.head.next),
            --this.length,
            r
          );
        }
      }),
      (e.prototype.clear = function () {
        (this.head = this.tail = null), (this.length = 0);
      }),
      (e.prototype.join = function (r) {
        if (this.length === 0) return "";
        for (var n = this.head, a = "" + n.data; (n = n.next); )
          a += r + n.data;
        return a;
      }),
      (e.prototype.concat = function (r) {
        if (this.length === 0) return sf.alloc(0);
        if (this.length === 1) return this.head.data;
        for (var n = sf.allocUnsafe(r >>> 0), a = this.head, s = 0; a; )
          F0(a.data, n, s), (s += a.data.length), (a = a.next);
        return n;
      }),
      e
    );
  })();
  En &&
    En.inspect &&
    En.inspect.custom &&
    (Xa.exports.prototype[En.inspect.custom] = function () {
      var e = En.inspect({ length: this.length });
      return this.constructor.name + " " + e;
    });
});
var Ka = A((Zy, lf) => {
  "use strict";
  var uf = yn();
  function B0(e, t) {
    var r = this,
      n = this._readableState && this._readableState.destroyed,
      a = this._writableState && this._writableState.destroyed;
    return n || a
      ? (t
          ? t(e)
          : e &&
            (!this._writableState || !this._writableState.errorEmitted) &&
            uf.nextTick(ff, this, e),
        this)
      : (this._readableState && (this._readableState.destroyed = !0),
        this._writableState && (this._writableState.destroyed = !0),
        this._destroy(e || null, function (s) {
          !t && s
            ? (uf.nextTick(ff, r, s),
              r._writableState && (r._writableState.errorEmitted = !0))
            : t && t(s);
        }),
        this);
  }
  function L0() {
    this._readableState &&
      ((this._readableState.destroyed = !1),
      (this._readableState.reading = !1),
      (this._readableState.ended = !1),
      (this._readableState.endEmitted = !1)),
      this._writableState &&
        ((this._writableState.destroyed = !1),
        (this._writableState.ended = !1),
        (this._writableState.ending = !1),
        (this._writableState.finished = !1),
        (this._writableState.errorEmitted = !1));
  }
  function ff(e, t) {
    e.emit("error", t);
  }
  lf.exports = { destroy: B0, undestroy: L0 };
});
var cf = A((Xy, hf) => {
  hf.exports = require("util").deprecate;
});
var $a = A((Ky, yf) => {
  "use strict";
  var mr = yn();
  yf.exports = _e;
  function pf(e) {
    var t = this;
    (this.next = null),
      (this.entry = null),
      (this.finish = function () {
        tg(t, e);
      });
  }
  var q0 =
      !process.browser &&
      ["v0.10", "v0.9."].indexOf(process.version.slice(0, 5)) > -1
        ? setImmediate
        : mr.nextTick,
    qr;
  _e.WritableState = bn;
  var df = Object.create(Br());
  df.inherits = Lr();
  var U0 = { deprecate: cf() },
    gf = ja(),
    bi = _n().Buffer,
    M0 = global.Uint8Array || function () {};
  function z0(e) {
    return bi.from(e);
  }
  function W0(e) {
    return bi.isBuffer(e) || e instanceof M0;
  }
  var mf = Ka();
  df.inherits(_e, gf);
  function j0() {}
  function bn(e, t) {
    (qr = qr || vr()), (e = e || {});
    var r = t instanceof qr;
    (this.objectMode = !!e.objectMode),
      r && (this.objectMode = this.objectMode || !!e.writableObjectMode);
    var n = e.highWaterMark,
      a = e.writableHighWaterMark,
      s = this.objectMode ? 16 : 16 * 1024;
    n || n === 0
      ? (this.highWaterMark = n)
      : r && (a || a === 0)
      ? (this.highWaterMark = a)
      : (this.highWaterMark = s),
      (this.highWaterMark = Math.floor(this.highWaterMark)),
      (this.finalCalled = !1),
      (this.needDrain = !1),
      (this.ending = !1),
      (this.ended = !1),
      (this.finished = !1),
      (this.destroyed = !1);
    var o = e.decodeStrings === !1;
    (this.decodeStrings = !o),
      (this.defaultEncoding = e.defaultEncoding || "utf8"),
      (this.length = 0),
      (this.writing = !1),
      (this.corked = 0),
      (this.sync = !0),
      (this.bufferProcessing = !1),
      (this.onwrite = function (f) {
        Y0(t, f);
      }),
      (this.writecb = null),
      (this.writelen = 0),
      (this.bufferedRequest = null),
      (this.lastBufferedRequest = null),
      (this.pendingcb = 0),
      (this.prefinished = !1),
      (this.errorEmitted = !1),
      (this.bufferedRequestCount = 0),
      (this.corkedRequestsFree = new pf(this));
  }
  bn.prototype.getBuffer = function () {
    for (var t = this.bufferedRequest, r = []; t; ) r.push(t), (t = t.next);
    return r;
  };
  (function () {
    try {
      Object.defineProperty(bn.prototype, "buffer", {
        get: U0.deprecate(
          function () {
            return this.getBuffer();
          },
          "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.",
          "DEP0003"
        ),
      });
    } catch {}
  })();
  var Ai;
  typeof Symbol == "function" &&
  Symbol.hasInstance &&
  typeof Function.prototype[Symbol.hasInstance] == "function"
    ? ((Ai = Function.prototype[Symbol.hasInstance]),
      Object.defineProperty(_e, Symbol.hasInstance, {
        value: function (e) {
          return Ai.call(this, e)
            ? !0
            : this !== _e
            ? !1
            : e && e._writableState instanceof bn;
        },
      }))
    : (Ai = function (e) {
        return e instanceof this;
      });
  function _e(e) {
    if (((qr = qr || vr()), !Ai.call(_e, this) && !(this instanceof qr)))
      return new _e(e);
    (this._writableState = new bn(e, this)),
      (this.writable = !0),
      e &&
        (typeof e.write == "function" && (this._write = e.write),
        typeof e.writev == "function" && (this._writev = e.writev),
        typeof e.destroy == "function" && (this._destroy = e.destroy),
        typeof e.final == "function" && (this._final = e.final)),
      gf.call(this);
  }
  _e.prototype.pipe = function () {
    this.emit("error", new Error("Cannot pipe, not readable"));
  };
  function H0(e, t) {
    var r = new Error("write after end");
    e.emit("error", r), mr.nextTick(t, r);
  }
  function V0(e, t, r, n) {
    var a = !0,
      s = !1;
    return (
      r === null
        ? (s = new TypeError("May not write null values to stream"))
        : typeof r != "string" &&
          r !== void 0 &&
          !t.objectMode &&
          (s = new TypeError("Invalid non-string/buffer chunk")),
      s && (e.emit("error", s), mr.nextTick(n, s), (a = !1)),
      a
    );
  }
  _e.prototype.write = function (e, t, r) {
    var n = this._writableState,
      a = !1,
      s = !n.objectMode && W0(e);
    return (
      s && !bi.isBuffer(e) && (e = z0(e)),
      typeof t == "function" && ((r = t), (t = null)),
      s ? (t = "buffer") : t || (t = n.defaultEncoding),
      typeof r != "function" && (r = j0),
      n.ended
        ? H0(this, r)
        : (s || V0(this, n, e, r)) &&
          (n.pendingcb++, (a = Z0(this, n, s, e, t, r))),
      a
    );
  };
  _e.prototype.cork = function () {
    var e = this._writableState;
    e.corked++;
  };
  _e.prototype.uncork = function () {
    var e = this._writableState;
    e.corked &&
      (e.corked--,
      !e.writing &&
        !e.corked &&
        !e.finished &&
        !e.bufferProcessing &&
        e.bufferedRequest &&
        xf(this, e));
  };
  _e.prototype.setDefaultEncoding = function (t) {
    if (
      (typeof t == "string" && (t = t.toLowerCase()),
      !(
        [
          "hex",
          "utf8",
          "utf-8",
          "ascii",
          "binary",
          "base64",
          "ucs2",
          "ucs-2",
          "utf16le",
          "utf-16le",
          "raw",
        ].indexOf((t + "").toLowerCase()) > -1
      ))
    )
      throw new TypeError("Unknown encoding: " + t);
    return (this._writableState.defaultEncoding = t), this;
  };
  function G0(e, t, r) {
    return (
      !e.objectMode &&
        e.decodeStrings !== !1 &&
        typeof t == "string" &&
        (t = bi.from(t, r)),
      t
    );
  }
  Object.defineProperty(_e.prototype, "writableHighWaterMark", {
    enumerable: !1,
    get: function () {
      return this._writableState.highWaterMark;
    },
  });
  function Z0(e, t, r, n, a, s) {
    if (!r) {
      var o = G0(t, n, a);
      n !== o && ((r = !0), (a = "buffer"), (n = o));
    }
    var f = t.objectMode ? 1 : n.length;
    t.length += f;
    var h = t.length < t.highWaterMark;
    if ((h || (t.needDrain = !0), t.writing || t.corked)) {
      var l = t.lastBufferedRequest;
      (t.lastBufferedRequest = {
        chunk: n,
        encoding: a,
        isBuf: r,
        callback: s,
        next: null,
      }),
        l
          ? (l.next = t.lastBufferedRequest)
          : (t.bufferedRequest = t.lastBufferedRequest),
        (t.bufferedRequestCount += 1);
    } else Ya(e, t, !1, f, n, a, s);
    return h;
  }
  function Ya(e, t, r, n, a, s, o) {
    (t.writelen = n),
      (t.writecb = o),
      (t.writing = !0),
      (t.sync = !0),
      r ? e._writev(a, t.onwrite) : e._write(a, s, t.onwrite),
      (t.sync = !1);
  }
  function X0(e, t, r, n, a) {
    --t.pendingcb,
      r
        ? (mr.nextTick(a, n),
          mr.nextTick(An, e, t),
          (e._writableState.errorEmitted = !0),
          e.emit("error", n))
        : (a(n),
          (e._writableState.errorEmitted = !0),
          e.emit("error", n),
          An(e, t));
  }
  function K0(e) {
    (e.writing = !1),
      (e.writecb = null),
      (e.length -= e.writelen),
      (e.writelen = 0);
  }
  function Y0(e, t) {
    var r = e._writableState,
      n = r.sync,
      a = r.writecb;
    if ((K0(r), t)) X0(e, r, n, t, a);
    else {
      var s = wf(r);
      !s && !r.corked && !r.bufferProcessing && r.bufferedRequest && xf(e, r),
        n ? q0(vf, e, r, s, a) : vf(e, r, s, a);
    }
  }
  function vf(e, t, r, n) {
    r || $0(e, t), t.pendingcb--, n(), An(e, t);
  }
  function $0(e, t) {
    t.length === 0 && t.needDrain && ((t.needDrain = !1), e.emit("drain"));
  }
  function xf(e, t) {
    t.bufferProcessing = !0;
    var r = t.bufferedRequest;
    if (e._writev && r && r.next) {
      var n = t.bufferedRequestCount,
        a = new Array(n),
        s = t.corkedRequestsFree;
      s.entry = r;
      for (var o = 0, f = !0; r; )
        (a[o] = r), r.isBuf || (f = !1), (r = r.next), (o += 1);
      (a.allBuffers = f),
        Ya(e, t, !0, t.length, a, "", s.finish),
        t.pendingcb++,
        (t.lastBufferedRequest = null),
        s.next
          ? ((t.corkedRequestsFree = s.next), (s.next = null))
          : (t.corkedRequestsFree = new pf(t)),
        (t.bufferedRequestCount = 0);
    } else {
      for (; r; ) {
        var h = r.chunk,
          l = r.encoding,
          c = r.callback,
          m = t.objectMode ? 1 : h.length;
        if (
          (Ya(e, t, !1, m, h, l, c),
          (r = r.next),
          t.bufferedRequestCount--,
          t.writing)
        )
          break;
      }
      r === null && (t.lastBufferedRequest = null);
    }
    (t.bufferedRequest = r), (t.bufferProcessing = !1);
  }
  _e.prototype._write = function (e, t, r) {
    r(new Error("_write() is not implemented"));
  };
  _e.prototype._writev = null;
  _e.prototype.end = function (e, t, r) {
    var n = this._writableState;
    typeof e == "function"
      ? ((r = e), (e = null), (t = null))
      : typeof t == "function" && ((r = t), (t = null)),
      e != null && this.write(e, t),
      n.corked && ((n.corked = 1), this.uncork()),
      !n.ending && !n.finished && eg(this, n, r);
  };
  function wf(e) {
    return (
      e.ending &&
      e.length === 0 &&
      e.bufferedRequest === null &&
      !e.finished &&
      !e.writing
    );
  }
  function Q0(e, t) {
    e._final(function (r) {
      t.pendingcb--,
        r && e.emit("error", r),
        (t.prefinished = !0),
        e.emit("prefinish"),
        An(e, t);
    });
  }
  function J0(e, t) {
    !t.prefinished &&
      !t.finalCalled &&
      (typeof e._final == "function"
        ? (t.pendingcb++, (t.finalCalled = !0), mr.nextTick(Q0, e, t))
        : ((t.prefinished = !0), e.emit("prefinish")));
  }
  function An(e, t) {
    var r = wf(t);
    return (
      r &&
        (J0(e, t), t.pendingcb === 0 && ((t.finished = !0), e.emit("finish"))),
      r
    );
  }
  function eg(e, t, r) {
    (t.ending = !0),
      An(e, t),
      r && (t.finished ? mr.nextTick(r) : e.once("finish", r)),
      (t.ended = !0),
      (e.writable = !1);
  }
  function tg(e, t, r) {
    var n = e.entry;
    for (e.entry = null; n; ) {
      var a = n.callback;
      t.pendingcb--, a(r), (n = n.next);
    }
    t.corkedRequestsFree
      ? (t.corkedRequestsFree.next = e)
      : (t.corkedRequestsFree = e);
  }
  Object.defineProperty(_e.prototype, "destroyed", {
    get: function () {
      return this._writableState === void 0
        ? !1
        : this._writableState.destroyed;
    },
    set: function (e) {
      !this._writableState || (this._writableState.destroyed = e);
    },
  });
  _e.prototype.destroy = mf.destroy;
  _e.prototype._undestroy = mf.undestroy;
  _e.prototype._destroy = function (e, t) {
    this.end(), t(e);
  };
});
var vr = A((Yy, Af) => {
  "use strict";
  var _f = yn(),
    rg =
      Object.keys ||
      function (e) {
        var t = [];
        for (var r in e) t.push(r);
        return t;
      };
  Af.exports = Bt;
  var Ef = Object.create(Br());
  Ef.inherits = Lr();
  var bf = es(),
    Qa = $a();
  Ef.inherits(Bt, bf);
  for (Ja = rg(Qa.prototype), Si = 0; Si < Ja.length; Si++)
    (Ti = Ja[Si]), Bt.prototype[Ti] || (Bt.prototype[Ti] = Qa.prototype[Ti]);
  var Ja, Ti, Si;
  function Bt(e) {
    if (!(this instanceof Bt)) return new Bt(e);
    bf.call(this, e),
      Qa.call(this, e),
      e && e.readable === !1 && (this.readable = !1),
      e && e.writable === !1 && (this.writable = !1),
      (this.allowHalfOpen = !0),
      e && e.allowHalfOpen === !1 && (this.allowHalfOpen = !1),
      this.once("end", ng);
  }
  Object.defineProperty(Bt.prototype, "writableHighWaterMark", {
    enumerable: !1,
    get: function () {
      return this._writableState.highWaterMark;
    },
  });
  function ng() {
    this.allowHalfOpen || this._writableState.ended || _f.nextTick(ig, this);
  }
  function ig(e) {
    e.end();
  }
  Object.defineProperty(Bt.prototype, "destroyed", {
    get: function () {
      return this._readableState === void 0 || this._writableState === void 0
        ? !1
        : this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function (e) {
      this._readableState === void 0 ||
        this._writableState === void 0 ||
        ((this._readableState.destroyed = e),
        (this._writableState.destroyed = e));
    },
  });
  Bt.prototype._destroy = function (e, t) {
    this.push(null), this.end(), _f.nextTick(t, e);
  };
});
var ns = A((Tf) => {
  "use strict";
  var ts = _n().Buffer,
    Sf =
      ts.isEncoding ||
      function (e) {
        switch (((e = "" + e), e && e.toLowerCase())) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
          case "raw":
            return !0;
          default:
            return !1;
        }
      };
  function ag(e) {
    if (!e) return "utf8";
    for (var t; ; )
      switch (e) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return e;
        default:
          if (t) return;
          (e = ("" + e).toLowerCase()), (t = !0);
      }
  }
  function sg(e) {
    var t = ag(e);
    if (typeof t != "string" && (ts.isEncoding === Sf || !Sf(e)))
      throw new Error("Unknown encoding: " + e);
    return t || e;
  }
  Tf.StringDecoder = Sn;
  function Sn(e) {
    this.encoding = sg(e);
    var t;
    switch (this.encoding) {
      case "utf16le":
        (this.text = cg), (this.end = pg), (t = 4);
        break;
      case "utf8":
        (this.fillLast = fg), (t = 4);
        break;
      case "base64":
        (this.text = dg), (this.end = gg), (t = 3);
        break;
      default:
        (this.write = mg), (this.end = vg);
        return;
    }
    (this.lastNeed = 0),
      (this.lastTotal = 0),
      (this.lastChar = ts.allocUnsafe(t));
  }
  Sn.prototype.write = function (e) {
    if (e.length === 0) return "";
    var t, r;
    if (this.lastNeed) {
      if (((t = this.fillLast(e)), t === void 0)) return "";
      (r = this.lastNeed), (this.lastNeed = 0);
    } else r = 0;
    return r < e.length ? (t ? t + this.text(e, r) : this.text(e, r)) : t || "";
  };
  Sn.prototype.end = hg;
  Sn.prototype.text = lg;
  Sn.prototype.fillLast = function (e) {
    if (this.lastNeed <= e.length)
      return (
        e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed),
        this.lastChar.toString(this.encoding, 0, this.lastTotal)
      );
    e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length),
      (this.lastNeed -= e.length);
  };
  function rs(e) {
    return e <= 127
      ? 0
      : e >> 5 == 6
      ? 2
      : e >> 4 == 14
      ? 3
      : e >> 3 == 30
      ? 4
      : e >> 6 == 2
      ? -1
      : -2;
  }
  function og(e, t, r) {
    var n = t.length - 1;
    if (n < r) return 0;
    var a = rs(t[n]);
    return a >= 0
      ? (a > 0 && (e.lastNeed = a - 1), a)
      : --n < r || a === -2
      ? 0
      : ((a = rs(t[n])),
        a >= 0
          ? (a > 0 && (e.lastNeed = a - 2), a)
          : --n < r || a === -2
          ? 0
          : ((a = rs(t[n])),
            a >= 0
              ? (a > 0 && (a === 2 ? (a = 0) : (e.lastNeed = a - 3)), a)
              : 0));
  }
  function ug(e, t, r) {
    if ((t[0] & 192) != 128) return (e.lastNeed = 0), "\uFFFD";
    if (e.lastNeed > 1 && t.length > 1) {
      if ((t[1] & 192) != 128) return (e.lastNeed = 1), "\uFFFD";
      if (e.lastNeed > 2 && t.length > 2 && (t[2] & 192) != 128)
        return (e.lastNeed = 2), "\uFFFD";
    }
  }
  function fg(e) {
    var t = this.lastTotal - this.lastNeed,
      r = ug(this, e, t);
    if (r !== void 0) return r;
    if (this.lastNeed <= e.length)
      return (
        e.copy(this.lastChar, t, 0, this.lastNeed),
        this.lastChar.toString(this.encoding, 0, this.lastTotal)
      );
    e.copy(this.lastChar, t, 0, e.length), (this.lastNeed -= e.length);
  }
  function lg(e, t) {
    var r = og(this, e, t);
    if (!this.lastNeed) return e.toString("utf8", t);
    this.lastTotal = r;
    var n = e.length - (r - this.lastNeed);
    return e.copy(this.lastChar, 0, n), e.toString("utf8", t, n);
  }
  function hg(e) {
    var t = e && e.length ? this.write(e) : "";
    return this.lastNeed ? t + "\uFFFD" : t;
  }
  function cg(e, t) {
    if ((e.length - t) % 2 == 0) {
      var r = e.toString("utf16le", t);
      if (r) {
        var n = r.charCodeAt(r.length - 1);
        if (n >= 55296 && n <= 56319)
          return (
            (this.lastNeed = 2),
            (this.lastTotal = 4),
            (this.lastChar[0] = e[e.length - 2]),
            (this.lastChar[1] = e[e.length - 1]),
            r.slice(0, -1)
          );
      }
      return r;
    }
    return (
      (this.lastNeed = 1),
      (this.lastTotal = 2),
      (this.lastChar[0] = e[e.length - 1]),
      e.toString("utf16le", t, e.length - 1)
    );
  }
  function pg(e) {
    var t = e && e.length ? this.write(e) : "";
    if (this.lastNeed) {
      var r = this.lastTotal - this.lastNeed;
      return t + this.lastChar.toString("utf16le", 0, r);
    }
    return t;
  }
  function dg(e, t) {
    var r = (e.length - t) % 3;
    return r === 0
      ? e.toString("base64", t)
      : ((this.lastNeed = 3 - r),
        (this.lastTotal = 3),
        r === 1
          ? (this.lastChar[0] = e[e.length - 1])
          : ((this.lastChar[0] = e[e.length - 2]),
            (this.lastChar[1] = e[e.length - 1])),
        e.toString("base64", t, e.length - r));
  }
  function gg(e) {
    var t = e && e.length ? this.write(e) : "";
    return this.lastNeed
      ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed)
      : t;
  }
  function mg(e) {
    return e.toString(this.encoding);
  }
  function vg(e) {
    return e && e.length ? this.write(e) : "";
  }
});
var es = A((Jy, qf) => {
  "use strict";
  var Ur = yn();
  qf.exports = ce;
  var xg = ef(),
    Tn;
  ce.ReadableState = If;
  var Qy = require("events").EventEmitter,
    Rf = function (e, t) {
      return e.listeners(t).length;
    },
    is = ja(),
    Rn = _n().Buffer,
    wg = global.Uint8Array || function () {};
  function yg(e) {
    return Rn.from(e);
  }
  function _g(e) {
    return Rn.isBuffer(e) || e instanceof wg;
  }
  var Cf = Object.create(Br());
  Cf.inherits = Lr();
  var as = require("util"),
    ae = void 0;
  as && as.debuglog ? (ae = as.debuglog("stream")) : (ae = function () {});
  var Eg = of(),
    Nf = Ka(),
    Mr;
  Cf.inherits(ce, is);
  var ss = ["error", "close", "destroy", "pause", "resume"];
  function bg(e, t, r) {
    if (typeof e.prependListener == "function") return e.prependListener(t, r);
    !e._events || !e._events[t]
      ? e.on(t, r)
      : xg(e._events[t])
      ? e._events[t].unshift(r)
      : (e._events[t] = [r, e._events[t]]);
  }
  function If(e, t) {
    (Tn = Tn || vr()), (e = e || {});
    var r = t instanceof Tn;
    (this.objectMode = !!e.objectMode),
      r && (this.objectMode = this.objectMode || !!e.readableObjectMode);
    var n = e.highWaterMark,
      a = e.readableHighWaterMark,
      s = this.objectMode ? 16 : 16 * 1024;
    n || n === 0
      ? (this.highWaterMark = n)
      : r && (a || a === 0)
      ? (this.highWaterMark = a)
      : (this.highWaterMark = s),
      (this.highWaterMark = Math.floor(this.highWaterMark)),
      (this.buffer = new Eg()),
      (this.length = 0),
      (this.pipes = null),
      (this.pipesCount = 0),
      (this.flowing = null),
      (this.ended = !1),
      (this.endEmitted = !1),
      (this.reading = !1),
      (this.sync = !0),
      (this.needReadable = !1),
      (this.emittedReadable = !1),
      (this.readableListening = !1),
      (this.resumeScheduled = !1),
      (this.destroyed = !1),
      (this.defaultEncoding = e.defaultEncoding || "utf8"),
      (this.awaitDrain = 0),
      (this.readingMore = !1),
      (this.decoder = null),
      (this.encoding = null),
      e.encoding &&
        (Mr || (Mr = ns().StringDecoder),
        (this.decoder = new Mr(e.encoding)),
        (this.encoding = e.encoding));
  }
  function ce(e) {
    if (((Tn = Tn || vr()), !(this instanceof ce))) return new ce(e);
    (this._readableState = new If(e, this)),
      (this.readable = !0),
      e &&
        (typeof e.read == "function" && (this._read = e.read),
        typeof e.destroy == "function" && (this._destroy = e.destroy)),
      is.call(this);
  }
  Object.defineProperty(ce.prototype, "destroyed", {
    get: function () {
      return this._readableState === void 0
        ? !1
        : this._readableState.destroyed;
    },
    set: function (e) {
      !this._readableState || (this._readableState.destroyed = e);
    },
  });
  ce.prototype.destroy = Nf.destroy;
  ce.prototype._undestroy = Nf.undestroy;
  ce.prototype._destroy = function (e, t) {
    this.push(null), t(e);
  };
  ce.prototype.push = function (e, t) {
    var r = this._readableState,
      n;
    return (
      r.objectMode
        ? (n = !0)
        : typeof e == "string" &&
          ((t = t || r.defaultEncoding),
          t !== r.encoding && ((e = Rn.from(e, t)), (t = "")),
          (n = !0)),
      Df(this, e, t, !1, n)
    );
  };
  ce.prototype.unshift = function (e) {
    return Df(this, e, null, !0, !1);
  };
  function Df(e, t, r, n, a) {
    var s = e._readableState;
    if (t === null) (s.reading = !1), Rg(e, s);
    else {
      var o;
      a || (o = Ag(s, t)),
        o
          ? e.emit("error", o)
          : s.objectMode || (t && t.length > 0)
          ? (typeof t != "string" &&
              !s.objectMode &&
              Object.getPrototypeOf(t) !== Rn.prototype &&
              (t = yg(t)),
            n
              ? s.endEmitted
                ? e.emit("error", new Error("stream.unshift() after end event"))
                : os(e, s, t, !0)
              : s.ended
              ? e.emit("error", new Error("stream.push() after EOF"))
              : ((s.reading = !1),
                s.decoder && !r
                  ? ((t = s.decoder.write(t)),
                    s.objectMode || t.length !== 0 ? os(e, s, t, !1) : Ff(e, s))
                  : os(e, s, t, !1)))
          : n || (s.reading = !1);
    }
    return Sg(s);
  }
  function os(e, t, r, n) {
    t.flowing && t.length === 0 && !t.sync
      ? (e.emit("data", r), e.read(0))
      : ((t.length += t.objectMode ? 1 : r.length),
        n ? t.buffer.unshift(r) : t.buffer.push(r),
        t.needReadable && Ri(e)),
      Ff(e, t);
  }
  function Ag(e, t) {
    var r;
    return (
      !_g(t) &&
        typeof t != "string" &&
        t !== void 0 &&
        !e.objectMode &&
        (r = new TypeError("Invalid non-string/buffer chunk")),
      r
    );
  }
  function Sg(e) {
    return (
      !e.ended &&
      (e.needReadable || e.length < e.highWaterMark || e.length === 0)
    );
  }
  ce.prototype.isPaused = function () {
    return this._readableState.flowing === !1;
  };
  ce.prototype.setEncoding = function (e) {
    return (
      Mr || (Mr = ns().StringDecoder),
      (this._readableState.decoder = new Mr(e)),
      (this._readableState.encoding = e),
      this
    );
  };
  var Of = 8388608;
  function Tg(e) {
    return (
      e >= Of
        ? (e = Of)
        : (e--,
          (e |= e >>> 1),
          (e |= e >>> 2),
          (e |= e >>> 4),
          (e |= e >>> 8),
          (e |= e >>> 16),
          e++),
      e
    );
  }
  function Pf(e, t) {
    return e <= 0 || (t.length === 0 && t.ended)
      ? 0
      : t.objectMode
      ? 1
      : e !== e
      ? t.flowing && t.length
        ? t.buffer.head.data.length
        : t.length
      : (e > t.highWaterMark && (t.highWaterMark = Tg(e)),
        e <= t.length ? e : t.ended ? t.length : ((t.needReadable = !0), 0));
  }
  ce.prototype.read = function (e) {
    ae("read", e), (e = parseInt(e, 10));
    var t = this._readableState,
      r = e;
    if (
      (e !== 0 && (t.emittedReadable = !1),
      e === 0 && t.needReadable && (t.length >= t.highWaterMark || t.ended))
    )
      return (
        ae("read: emitReadable", t.length, t.ended),
        t.length === 0 && t.ended ? fs(this) : Ri(this),
        null
      );
    if (((e = Pf(e, t)), e === 0 && t.ended))
      return t.length === 0 && fs(this), null;
    var n = t.needReadable;
    ae("need readable", n),
      (t.length === 0 || t.length - e < t.highWaterMark) &&
        ((n = !0), ae("length less than watermark", n)),
      t.ended || t.reading
        ? ((n = !1), ae("reading or ended", n))
        : n &&
          (ae("do read"),
          (t.reading = !0),
          (t.sync = !0),
          t.length === 0 && (t.needReadable = !0),
          this._read(t.highWaterMark),
          (t.sync = !1),
          t.reading || (e = Pf(r, t)));
    var a;
    return (
      e > 0 ? (a = Bf(e, t)) : (a = null),
      a === null ? ((t.needReadable = !0), (e = 0)) : (t.length -= e),
      t.length === 0 &&
        (t.ended || (t.needReadable = !0), r !== e && t.ended && fs(this)),
      a !== null && this.emit("data", a),
      a
    );
  };
  function Rg(e, t) {
    if (!t.ended) {
      if (t.decoder) {
        var r = t.decoder.end();
        r &&
          r.length &&
          (t.buffer.push(r), (t.length += t.objectMode ? 1 : r.length));
      }
      (t.ended = !0), Ri(e);
    }
  }
  function Ri(e) {
    var t = e._readableState;
    (t.needReadable = !1),
      t.emittedReadable ||
        (ae("emitReadable", t.flowing),
        (t.emittedReadable = !0),
        t.sync ? Ur.nextTick(kf, e) : kf(e));
  }
  function kf(e) {
    ae("emit readable"), e.emit("readable"), us(e);
  }
  function Ff(e, t) {
    t.readingMore || ((t.readingMore = !0), Ur.nextTick(Cg, e, t));
  }
  function Cg(e, t) {
    for (
      var r = t.length;
      !t.reading &&
      !t.flowing &&
      !t.ended &&
      t.length < t.highWaterMark &&
      (ae("maybeReadMore read 0"), e.read(0), r !== t.length);

    )
      r = t.length;
    t.readingMore = !1;
  }
  ce.prototype._read = function (e) {
    this.emit("error", new Error("_read() is not implemented"));
  };
  ce.prototype.pipe = function (e, t) {
    var r = this,
      n = this._readableState;
    switch (n.pipesCount) {
      case 0:
        n.pipes = e;
        break;
      case 1:
        n.pipes = [n.pipes, e];
        break;
      default:
        n.pipes.push(e);
        break;
    }
    (n.pipesCount += 1), ae("pipe count=%d opts=%j", n.pipesCount, t);
    var a =
        (!t || t.end !== !1) && e !== process.stdout && e !== process.stderr,
      s = a ? f : E;
    n.endEmitted ? Ur.nextTick(s) : r.once("end", s), e.on("unpipe", o);
    function o(b, W) {
      ae("onunpipe"),
        b === r && W && W.hasUnpiped === !1 && ((W.hasUnpiped = !0), c());
    }
    function f() {
      ae("onend"), e.end();
    }
    var h = Ng(r);
    e.on("drain", h);
    var l = !1;
    function c() {
      ae("cleanup"),
        e.removeListener("close", p),
        e.removeListener("finish", _),
        e.removeListener("drain", h),
        e.removeListener("error", x),
        e.removeListener("unpipe", o),
        r.removeListener("end", f),
        r.removeListener("end", E),
        r.removeListener("data", v),
        (l = !0),
        n.awaitDrain &&
          (!e._writableState || e._writableState.needDrain) &&
          h();
    }
    var m = !1;
    r.on("data", v);
    function v(b) {
      ae("ondata"), (m = !1);
      var W = e.write(b);
      W === !1 &&
        !m &&
        (((n.pipesCount === 1 && n.pipes === e) ||
          (n.pipesCount > 1 && Lf(n.pipes, e) !== -1)) &&
          !l &&
          (ae("false write response, pause", r._readableState.awaitDrain),
          r._readableState.awaitDrain++,
          (m = !0)),
        r.pause());
    }
    function x(b) {
      ae("onerror", b),
        E(),
        e.removeListener("error", x),
        Rf(e, "error") === 0 && e.emit("error", b);
    }
    bg(e, "error", x);
    function p() {
      e.removeListener("finish", _), E();
    }
    e.once("close", p);
    function _() {
      ae("onfinish"), e.removeListener("close", p), E();
    }
    e.once("finish", _);
    function E() {
      ae("unpipe"), r.unpipe(e);
    }
    return e.emit("pipe", r), n.flowing || (ae("pipe resume"), r.resume()), e;
  };
  function Ng(e) {
    return function () {
      var t = e._readableState;
      ae("pipeOnDrain", t.awaitDrain),
        t.awaitDrain && t.awaitDrain--,
        t.awaitDrain === 0 && Rf(e, "data") && ((t.flowing = !0), us(e));
    };
  }
  ce.prototype.unpipe = function (e) {
    var t = this._readableState,
      r = { hasUnpiped: !1 };
    if (t.pipesCount === 0) return this;
    if (t.pipesCount === 1)
      return e && e !== t.pipes
        ? this
        : (e || (e = t.pipes),
          (t.pipes = null),
          (t.pipesCount = 0),
          (t.flowing = !1),
          e && e.emit("unpipe", this, r),
          this);
    if (!e) {
      var n = t.pipes,
        a = t.pipesCount;
      (t.pipes = null), (t.pipesCount = 0), (t.flowing = !1);
      for (var s = 0; s < a; s++) n[s].emit("unpipe", this, r);
      return this;
    }
    var o = Lf(t.pipes, e);
    return o === -1
      ? this
      : (t.pipes.splice(o, 1),
        (t.pipesCount -= 1),
        t.pipesCount === 1 && (t.pipes = t.pipes[0]),
        e.emit("unpipe", this, r),
        this);
  };
  ce.prototype.on = function (e, t) {
    var r = is.prototype.on.call(this, e, t);
    if (e === "data") this._readableState.flowing !== !1 && this.resume();
    else if (e === "readable") {
      var n = this._readableState;
      !n.endEmitted &&
        !n.readableListening &&
        ((n.readableListening = n.needReadable = !0),
        (n.emittedReadable = !1),
        n.reading ? n.length && Ri(this) : Ur.nextTick(Ig, this));
    }
    return r;
  };
  ce.prototype.addListener = ce.prototype.on;
  function Ig(e) {
    ae("readable nexttick read 0"), e.read(0);
  }
  ce.prototype.resume = function () {
    var e = this._readableState;
    return e.flowing || (ae("resume"), (e.flowing = !0), Dg(this, e)), this;
  };
  function Dg(e, t) {
    t.resumeScheduled || ((t.resumeScheduled = !0), Ur.nextTick(Og, e, t));
  }
  function Og(e, t) {
    t.reading || (ae("resume read 0"), e.read(0)),
      (t.resumeScheduled = !1),
      (t.awaitDrain = 0),
      e.emit("resume"),
      us(e),
      t.flowing && !t.reading && e.read(0);
  }
  ce.prototype.pause = function () {
    return (
      ae("call pause flowing=%j", this._readableState.flowing),
      this._readableState.flowing !== !1 &&
        (ae("pause"), (this._readableState.flowing = !1), this.emit("pause")),
      this
    );
  };
  function us(e) {
    var t = e._readableState;
    for (ae("flow", t.flowing); t.flowing && e.read() !== null; );
  }
  ce.prototype.wrap = function (e) {
    var t = this,
      r = this._readableState,
      n = !1;
    e.on("end", function () {
      if ((ae("wrapped end"), r.decoder && !r.ended)) {
        var o = r.decoder.end();
        o && o.length && t.push(o);
      }
      t.push(null);
    }),
      e.on("data", function (o) {
        if (
          (ae("wrapped data"),
          r.decoder && (o = r.decoder.write(o)),
          !(r.objectMode && o == null) && !(!r.objectMode && (!o || !o.length)))
        ) {
          var f = t.push(o);
          f || ((n = !0), e.pause());
        }
      });
    for (var a in e)
      this[a] === void 0 &&
        typeof e[a] == "function" &&
        (this[a] = (function (o) {
          return function () {
            return e[o].apply(e, arguments);
          };
        })(a));
    for (var s = 0; s < ss.length; s++)
      e.on(ss[s], this.emit.bind(this, ss[s]));
    return (
      (this._read = function (o) {
        ae("wrapped _read", o), n && ((n = !1), e.resume());
      }),
      this
    );
  };
  Object.defineProperty(ce.prototype, "readableHighWaterMark", {
    enumerable: !1,
    get: function () {
      return this._readableState.highWaterMark;
    },
  });
  ce._fromList = Bf;
  function Bf(e, t) {
    if (t.length === 0) return null;
    var r;
    return (
      t.objectMode
        ? (r = t.buffer.shift())
        : !e || e >= t.length
        ? (t.decoder
            ? (r = t.buffer.join(""))
            : t.buffer.length === 1
            ? (r = t.buffer.head.data)
            : (r = t.buffer.concat(t.length)),
          t.buffer.clear())
        : (r = Pg(e, t.buffer, t.decoder)),
      r
    );
  }
  function Pg(e, t, r) {
    var n;
    return (
      e < t.head.data.length
        ? ((n = t.head.data.slice(0, e)), (t.head.data = t.head.data.slice(e)))
        : e === t.head.data.length
        ? (n = t.shift())
        : (n = r ? kg(e, t) : Fg(e, t)),
      n
    );
  }
  function kg(e, t) {
    var r = t.head,
      n = 1,
      a = r.data;
    for (e -= a.length; (r = r.next); ) {
      var s = r.data,
        o = e > s.length ? s.length : e;
      if (
        (o === s.length ? (a += s) : (a += s.slice(0, e)), (e -= o), e === 0)
      ) {
        o === s.length
          ? (++n, r.next ? (t.head = r.next) : (t.head = t.tail = null))
          : ((t.head = r), (r.data = s.slice(o)));
        break;
      }
      ++n;
    }
    return (t.length -= n), a;
  }
  function Fg(e, t) {
    var r = Rn.allocUnsafe(e),
      n = t.head,
      a = 1;
    for (n.data.copy(r), e -= n.data.length; (n = n.next); ) {
      var s = n.data,
        o = e > s.length ? s.length : e;
      if ((s.copy(r, r.length - e, 0, o), (e -= o), e === 0)) {
        o === s.length
          ? (++a, n.next ? (t.head = n.next) : (t.head = t.tail = null))
          : ((t.head = n), (n.data = s.slice(o)));
        break;
      }
      ++a;
    }
    return (t.length -= a), r;
  }
  function fs(e) {
    var t = e._readableState;
    if (t.length > 0)
      throw new Error('"endReadable()" called on non-empty stream');
    t.endEmitted || ((t.ended = !0), Ur.nextTick(Bg, t, e));
  }
  function Bg(e, t) {
    !e.endEmitted &&
      e.length === 0 &&
      ((e.endEmitted = !0), (t.readable = !1), t.emit("end"));
  }
  function Lf(e, t) {
    for (var r = 0, n = e.length; r < n; r++) if (e[r] === t) return r;
    return -1;
  }
});
var ls = A((e1, zf) => {
  "use strict";
  zf.exports = Lt;
  var Ci = vr(),
    Uf = Object.create(Br());
  Uf.inherits = Lr();
  Uf.inherits(Lt, Ci);
  function Lg(e, t) {
    var r = this._transformState;
    r.transforming = !1;
    var n = r.writecb;
    if (!n)
      return this.emit(
        "error",
        new Error("write callback called multiple times")
      );
    (r.writechunk = null), (r.writecb = null), t != null && this.push(t), n(e);
    var a = this._readableState;
    (a.reading = !1),
      (a.needReadable || a.length < a.highWaterMark) &&
        this._read(a.highWaterMark);
  }
  function Lt(e) {
    if (!(this instanceof Lt)) return new Lt(e);
    Ci.call(this, e),
      (this._transformState = {
        afterTransform: Lg.bind(this),
        needTransform: !1,
        transforming: !1,
        writecb: null,
        writechunk: null,
        writeencoding: null,
      }),
      (this._readableState.needReadable = !0),
      (this._readableState.sync = !1),
      e &&
        (typeof e.transform == "function" && (this._transform = e.transform),
        typeof e.flush == "function" && (this._flush = e.flush)),
      this.on("prefinish", qg);
  }
  function qg() {
    var e = this;
    typeof this._flush == "function"
      ? this._flush(function (t, r) {
          Mf(e, t, r);
        })
      : Mf(this, null, null);
  }
  Lt.prototype.push = function (e, t) {
    return (
      (this._transformState.needTransform = !1),
      Ci.prototype.push.call(this, e, t)
    );
  };
  Lt.prototype._transform = function (e, t, r) {
    throw new Error("_transform() is not implemented");
  };
  Lt.prototype._write = function (e, t, r) {
    var n = this._transformState;
    if (
      ((n.writecb = r),
      (n.writechunk = e),
      (n.writeencoding = t),
      !n.transforming)
    ) {
      var a = this._readableState;
      (n.needTransform || a.needReadable || a.length < a.highWaterMark) &&
        this._read(a.highWaterMark);
    }
  };
  Lt.prototype._read = function (e) {
    var t = this._transformState;
    t.writechunk !== null && t.writecb && !t.transforming
      ? ((t.transforming = !0),
        this._transform(t.writechunk, t.writeencoding, t.afterTransform))
      : (t.needTransform = !0);
  };
  Lt.prototype._destroy = function (e, t) {
    var r = this;
    Ci.prototype._destroy.call(this, e, function (n) {
      t(n), r.emit("close");
    });
  };
  function Mf(e, t, r) {
    if (t) return e.emit("error", t);
    if ((r != null && e.push(r), e._writableState.length))
      throw new Error("Calling transform done when ws.length != 0");
    if (e._transformState.transforming)
      throw new Error("Calling transform done when still transforming");
    return e.push(null);
  }
});
var Vf = A((t1, Hf) => {
  "use strict";
  Hf.exports = Cn;
  var Wf = ls(),
    jf = Object.create(Br());
  jf.inherits = Lr();
  jf.inherits(Cn, Wf);
  function Cn(e) {
    if (!(this instanceof Cn)) return new Cn(e);
    Wf.call(this, e);
  }
  Cn.prototype._transform = function (e, t, r) {
    r(null, e);
  };
});
var hs = A((De, Ni) => {
  var bt = require("stream");
  process.env.READABLE_STREAM === "disable" && bt
    ? ((Ni.exports = bt),
      (De = Ni.exports = bt.Readable),
      (De.Readable = bt.Readable),
      (De.Writable = bt.Writable),
      (De.Duplex = bt.Duplex),
      (De.Transform = bt.Transform),
      (De.PassThrough = bt.PassThrough),
      (De.Stream = bt))
    : ((De = Ni.exports = es()),
      (De.Stream = bt || De),
      (De.Readable = De),
      (De.Writable = $a()),
      (De.Duplex = vr()),
      (De.Transform = ls()),
      (De.PassThrough = Vf()));
});
var qt = A((Je) => {
  "use strict";
  Je.base64 = !0;
  Je.array = !0;
  Je.string = !0;
  Je.arraybuffer =
    typeof ArrayBuffer != "undefined" && typeof Uint8Array != "undefined";
  Je.nodebuffer = typeof Buffer != "undefined";
  Je.uint8array = typeof Uint8Array != "undefined";
  if (typeof ArrayBuffer == "undefined") Je.blob = !1;
  else {
    cs = new ArrayBuffer(0);
    try {
      Je.blob = new Blob([cs], { type: "application/zip" }).size === 0;
    } catch {
      try {
        (Gf =
          self.BlobBuilder ||
          self.WebKitBlobBuilder ||
          self.MozBlobBuilder ||
          self.MSBlobBuilder),
          (ps = new Gf()),
          ps.append(cs),
          (Je.blob = ps.getBlob("application/zip").size === 0);
      } catch {
        Je.blob = !1;
      }
    }
  }
  var cs, Gf, ps;
  try {
    Je.nodestream = !!hs().Readable;
  } catch {
    Je.nodestream = !1;
  }
});
var gs = A((ds) => {
  "use strict";
  var Ug = ge(),
    Mg = qt(),
    At = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  ds.encode = function (e) {
    for (
      var t = [],
        r,
        n,
        a,
        s,
        o,
        f,
        h,
        l = 0,
        c = e.length,
        m = c,
        v = Ug.getTypeOf(e) !== "string";
      l < e.length;

    )
      (m = c - l),
        v
          ? ((r = e[l++]), (n = l < c ? e[l++] : 0), (a = l < c ? e[l++] : 0))
          : ((r = e.charCodeAt(l++)),
            (n = l < c ? e.charCodeAt(l++) : 0),
            (a = l < c ? e.charCodeAt(l++) : 0)),
        (s = r >> 2),
        (o = ((r & 3) << 4) | (n >> 4)),
        (f = m > 1 ? ((n & 15) << 2) | (a >> 6) : 64),
        (h = m > 2 ? a & 63 : 64),
        t.push(At.charAt(s) + At.charAt(o) + At.charAt(f) + At.charAt(h));
    return t.join("");
  };
  ds.decode = function (e) {
    var t,
      r,
      n,
      a,
      s,
      o,
      f,
      h = 0,
      l = 0,
      c = "data:";
    if (e.substr(0, c.length) === c)
      throw new Error("Invalid base64 input, it looks like a data url.");
    e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    var m = (e.length * 3) / 4;
    if (
      (e.charAt(e.length - 1) === At.charAt(64) && m--,
      e.charAt(e.length - 2) === At.charAt(64) && m--,
      m % 1 != 0)
    )
      throw new Error("Invalid base64 input, bad content length.");
    var v;
    for (
      Mg.uint8array ? (v = new Uint8Array(m | 0)) : (v = new Array(m | 0));
      h < e.length;

    )
      (a = At.indexOf(e.charAt(h++))),
        (s = At.indexOf(e.charAt(h++))),
        (o = At.indexOf(e.charAt(h++))),
        (f = At.indexOf(e.charAt(h++))),
        (t = (a << 2) | (s >> 4)),
        (r = ((s & 15) << 4) | (o >> 2)),
        (n = ((o & 3) << 6) | f),
        (v[l++] = t),
        o !== 64 && (v[l++] = r),
        f !== 64 && (v[l++] = n);
    return v;
  };
});
var Nn = A((i1, Zf) => {
  "use strict";
  Zf.exports = {
    isNode: typeof Buffer != "undefined",
    newBufferFrom: function (e, t) {
      if (Buffer.from && Buffer.from !== Uint8Array.from)
        return Buffer.from(e, t);
      if (typeof e == "number")
        throw new Error('The "data" argument must not be a number');
      return new Buffer(e, t);
    },
    allocBuffer: function (e) {
      if (Buffer.alloc) return Buffer.alloc(e);
      var t = new Buffer(e);
      return t.fill(0), t;
    },
    isBuffer: function (e) {
      return Buffer.isBuffer(e);
    },
    isStream: function (e) {
      return (
        e &&
        typeof e.on == "function" &&
        typeof e.pause == "function" &&
        typeof e.resume == "function"
      );
    },
  };
});
var Kf = A((a1, Xf) => {
  "use strict";
  Xf.exports =
    typeof setImmediate == "function"
      ? setImmediate
      : function () {
          var t = [].slice.apply(arguments);
          t.splice(1, 0, 0), setTimeout.apply(null, t);
        };
});
var Jf = A((s1, Qf) => {
  "use strict";
  var Yf = global.MutationObserver || global.WebKitMutationObserver,
    zr;
  process.browser
    ? Yf
      ? ((ms = 0),
        ($f = new Yf(Dn)),
        (vs = global.document.createTextNode("")),
        $f.observe(vs, { characterData: !0 }),
        (zr = function () {
          vs.data = ms = ++ms % 2;
        }))
      : !global.setImmediate && typeof global.MessageChannel != "undefined"
      ? ((xs = new global.MessageChannel()),
        (xs.port1.onmessage = Dn),
        (zr = function () {
          xs.port2.postMessage(0);
        }))
      : "document" in global &&
        "onreadystatechange" in global.document.createElement("script")
      ? (zr = function () {
          var e = global.document.createElement("script");
          (e.onreadystatechange = function () {
            Dn(),
              (e.onreadystatechange = null),
              e.parentNode.removeChild(e),
              (e = null);
          }),
            global.document.documentElement.appendChild(e);
        })
      : (zr = function () {
          setTimeout(Dn, 0);
        })
    : (zr = function () {
        process.nextTick(Dn);
      });
  var ms,
    $f,
    vs,
    xs,
    ws,
    In = [];
  function Dn() {
    ws = !0;
    for (var e, t, r = In.length; r; ) {
      for (t = In, In = [], e = -1; ++e < r; ) t[e]();
      r = In.length;
    }
    ws = !1;
  }
  Qf.exports = zg;
  function zg(e) {
    In.push(e) === 1 && !ws && zr();
  }
});
var sl = A((o1, al) => {
  "use strict";
  var el = Jf();
  function Wr() {}
  var Be = {},
    tl = ["REJECTED"],
    ys = ["FULFILLED"],
    rl = ["PENDING"];
  process.browser || (On = ["UNHANDLED"]);
  var On;
  al.exports = er;
  function er(e) {
    if (typeof e != "function")
      throw new TypeError("resolver must be a function");
    (this.state = rl),
      (this.queue = []),
      (this.outcome = void 0),
      process.browser || (this.handled = On),
      e !== Wr && nl(this, e);
  }
  er.prototype.finally = function (e) {
    if (typeof e != "function") return this;
    var t = this.constructor;
    return this.then(r, n);
    function r(a) {
      function s() {
        return a;
      }
      return t.resolve(e()).then(s);
    }
    function n(a) {
      function s() {
        throw a;
      }
      return t.resolve(e()).then(s);
    }
  };
  er.prototype.catch = function (e) {
    return this.then(null, e);
  };
  er.prototype.then = function (e, t) {
    if (
      (typeof e != "function" && this.state === ys) ||
      (typeof t != "function" && this.state === tl)
    )
      return this;
    var r = new this.constructor(Wr);
    if (
      (process.browser || (this.handled === On && (this.handled = null)),
      this.state !== rl)
    ) {
      var n = this.state === ys ? e : t;
      _s(r, n, this.outcome);
    } else this.queue.push(new Pn(r, e, t));
    return r;
  };
  function Pn(e, t, r) {
    (this.promise = e),
      typeof t == "function" &&
        ((this.onFulfilled = t),
        (this.callFulfilled = this.otherCallFulfilled)),
      typeof r == "function" &&
        ((this.onRejected = r), (this.callRejected = this.otherCallRejected));
  }
  Pn.prototype.callFulfilled = function (e) {
    Be.resolve(this.promise, e);
  };
  Pn.prototype.otherCallFulfilled = function (e) {
    _s(this.promise, this.onFulfilled, e);
  };
  Pn.prototype.callRejected = function (e) {
    Be.reject(this.promise, e);
  };
  Pn.prototype.otherCallRejected = function (e) {
    _s(this.promise, this.onRejected, e);
  };
  function _s(e, t, r) {
    el(function () {
      var n;
      try {
        n = t(r);
      } catch (a) {
        return Be.reject(e, a);
      }
      n === e
        ? Be.reject(e, new TypeError("Cannot resolve promise with itself"))
        : Be.resolve(e, n);
    });
  }
  Be.resolve = function (e, t) {
    var r = il(Wg, t);
    if (r.status === "error") return Be.reject(e, r.value);
    var n = r.value;
    if (n) nl(e, n);
    else {
      (e.state = ys), (e.outcome = t);
      for (var a = -1, s = e.queue.length; ++a < s; )
        e.queue[a].callFulfilled(t);
    }
    return e;
  };
  Be.reject = function (e, t) {
    (e.state = tl),
      (e.outcome = t),
      process.browser ||
        (e.handled === On &&
          el(function () {
            e.handled === On && process.emit("unhandledRejection", t, e);
          }));
    for (var r = -1, n = e.queue.length; ++r < n; ) e.queue[r].callRejected(t);
    return e;
  };
  function Wg(e) {
    var t = e && e.then;
    if (
      e &&
      (typeof e == "object" || typeof e == "function") &&
      typeof t == "function"
    )
      return function () {
        t.apply(e, arguments);
      };
  }
  function nl(e, t) {
    var r = !1;
    function n(f) {
      r || ((r = !0), Be.reject(e, f));
    }
    function a(f) {
      r || ((r = !0), Be.resolve(e, f));
    }
    function s() {
      t(a, n);
    }
    var o = il(s);
    o.status === "error" && n(o.value);
  }
  function il(e, t) {
    var r = {};
    try {
      (r.value = e(t)), (r.status = "success");
    } catch (n) {
      (r.status = "error"), (r.value = n);
    }
    return r;
  }
  er.resolve = jg;
  function jg(e) {
    return e instanceof this ? e : Be.resolve(new this(Wr), e);
  }
  er.reject = Hg;
  function Hg(e) {
    var t = new this(Wr);
    return Be.reject(t, e);
  }
  er.all = Vg;
  function Vg(e) {
    var t = this;
    if (Object.prototype.toString.call(e) !== "[object Array]")
      return this.reject(new TypeError("must be an array"));
    var r = e.length,
      n = !1;
    if (!r) return this.resolve([]);
    for (var a = new Array(r), s = 0, o = -1, f = new this(Wr); ++o < r; )
      h(e[o], o);
    return f;
    function h(l, c) {
      t.resolve(l).then(m, function (v) {
        n || ((n = !0), Be.reject(f, v));
      });
      function m(v) {
        (a[c] = v), ++s === r && !n && ((n = !0), Be.resolve(f, a));
      }
    }
  }
  er.race = Gg;
  function Gg(e) {
    var t = this;
    if (Object.prototype.toString.call(e) !== "[object Array]")
      return this.reject(new TypeError("must be an array"));
    var r = e.length,
      n = !1;
    if (!r) return this.resolve([]);
    for (var a = -1, s = new this(Wr); ++a < r; ) o(e[a]);
    return s;
    function o(f) {
      t.resolve(f).then(
        function (h) {
          n || ((n = !0), Be.resolve(s, h));
        },
        function (h) {
          n || ((n = !0), Be.reject(s, h));
        }
      );
    }
  }
});
var jr = A((u1, ol) => {
  "use strict";
  var Es = null;
  typeof Promise != "undefined" ? (Es = Promise) : (Es = sl());
  ol.exports = { Promise: Es };
});
var ge = A((be) => {
  "use strict";
  var tr = qt(),
    Zg = gs(),
    Hr = Nn(),
    Xg = Kf(),
    bs = jr();
  function Kg(e) {
    var t = null;
    return (
      tr.uint8array
        ? (t = new Uint8Array(e.length))
        : (t = new Array(e.length)),
      Ii(e, t)
    );
  }
  be.newBlob = function (e, t) {
    be.checkSupport("blob");
    try {
      return new Blob([e], { type: t });
    } catch {
      try {
        var r =
            self.BlobBuilder ||
            self.WebKitBlobBuilder ||
            self.MozBlobBuilder ||
            self.MSBlobBuilder,
          n = new r();
        return n.append(e), n.getBlob(t);
      } catch {
        throw new Error("Bug : can't construct the Blob.");
      }
    }
  };
  function kn(e) {
    return e;
  }
  function Ii(e, t) {
    for (var r = 0; r < e.length; ++r) t[r] = e.charCodeAt(r) & 255;
    return t;
  }
  var Di = {
    stringifyByChunk: function (e, t, r) {
      var n = [],
        a = 0,
        s = e.length;
      if (s <= r) return String.fromCharCode.apply(null, e);
      for (; a < s; )
        t === "array" || t === "nodebuffer"
          ? n.push(
              String.fromCharCode.apply(null, e.slice(a, Math.min(a + r, s)))
            )
          : n.push(
              String.fromCharCode.apply(null, e.subarray(a, Math.min(a + r, s)))
            ),
          (a += r);
      return n.join("");
    },
    stringifyByChar: function (e) {
      for (var t = "", r = 0; r < e.length; r++) t += String.fromCharCode(e[r]);
      return t;
    },
    applyCanBeUsed: {
      uint8array: (function () {
        try {
          return (
            tr.uint8array &&
            String.fromCharCode.apply(null, new Uint8Array(1)).length === 1
          );
        } catch {
          return !1;
        }
      })(),
      nodebuffer: (function () {
        try {
          return (
            tr.nodebuffer &&
            String.fromCharCode.apply(null, Hr.allocBuffer(1)).length === 1
          );
        } catch {
          return !1;
        }
      })(),
    },
  };
  function Fn(e) {
    var t = 65536,
      r = be.getTypeOf(e),
      n = !0;
    if (
      (r === "uint8array"
        ? (n = Di.applyCanBeUsed.uint8array)
        : r === "nodebuffer" && (n = Di.applyCanBeUsed.nodebuffer),
      n)
    )
      for (; t > 1; )
        try {
          return Di.stringifyByChunk(e, r, t);
        } catch {
          t = Math.floor(t / 2);
        }
    return Di.stringifyByChar(e);
  }
  be.applyFromCharCode = Fn;
  function Oi(e, t) {
    for (var r = 0; r < e.length; r++) t[r] = e[r];
    return t;
  }
  var rr = {};
  rr.string = {
    string: kn,
    array: function (e) {
      return Ii(e, new Array(e.length));
    },
    arraybuffer: function (e) {
      return rr.string.uint8array(e).buffer;
    },
    uint8array: function (e) {
      return Ii(e, new Uint8Array(e.length));
    },
    nodebuffer: function (e) {
      return Ii(e, Hr.allocBuffer(e.length));
    },
  };
  rr.array = {
    string: Fn,
    array: kn,
    arraybuffer: function (e) {
      return new Uint8Array(e).buffer;
    },
    uint8array: function (e) {
      return new Uint8Array(e);
    },
    nodebuffer: function (e) {
      return Hr.newBufferFrom(e);
    },
  };
  rr.arraybuffer = {
    string: function (e) {
      return Fn(new Uint8Array(e));
    },
    array: function (e) {
      return Oi(new Uint8Array(e), new Array(e.byteLength));
    },
    arraybuffer: kn,
    uint8array: function (e) {
      return new Uint8Array(e);
    },
    nodebuffer: function (e) {
      return Hr.newBufferFrom(new Uint8Array(e));
    },
  };
  rr.uint8array = {
    string: Fn,
    array: function (e) {
      return Oi(e, new Array(e.length));
    },
    arraybuffer: function (e) {
      return e.buffer;
    },
    uint8array: kn,
    nodebuffer: function (e) {
      return Hr.newBufferFrom(e);
    },
  };
  rr.nodebuffer = {
    string: Fn,
    array: function (e) {
      return Oi(e, new Array(e.length));
    },
    arraybuffer: function (e) {
      return rr.nodebuffer.uint8array(e).buffer;
    },
    uint8array: function (e) {
      return Oi(e, new Uint8Array(e.length));
    },
    nodebuffer: kn,
  };
  be.transformTo = function (e, t) {
    if ((t || (t = ""), !e)) return t;
    be.checkSupport(e);
    var r = be.getTypeOf(t),
      n = rr[r][e](t);
    return n;
  };
  be.getTypeOf = function (e) {
    if (typeof e == "string") return "string";
    if (Object.prototype.toString.call(e) === "[object Array]") return "array";
    if (tr.nodebuffer && Hr.isBuffer(e)) return "nodebuffer";
    if (tr.uint8array && e instanceof Uint8Array) return "uint8array";
    if (tr.arraybuffer && e instanceof ArrayBuffer) return "arraybuffer";
  };
  be.checkSupport = function (e) {
    var t = tr[e.toLowerCase()];
    if (!t) throw new Error(e + " is not supported by this platform");
  };
  be.MAX_VALUE_16BITS = 65535;
  be.MAX_VALUE_32BITS = -1;
  be.pretty = function (e) {
    var t = "",
      r,
      n;
    for (n = 0; n < (e || "").length; n++)
      (r = e.charCodeAt(n)),
        (t += "\\x" + (r < 16 ? "0" : "") + r.toString(16).toUpperCase());
    return t;
  };
  be.delay = function (e, t, r) {
    Xg(function () {
      e.apply(r || null, t || []);
    });
  };
  be.inherits = function (e, t) {
    var r = function () {};
    (r.prototype = t.prototype), (e.prototype = new r());
  };
  be.extend = function () {
    var e = {},
      t,
      r;
    for (t = 0; t < arguments.length; t++)
      for (r in arguments[t])
        arguments[t].hasOwnProperty(r) &&
          typeof e[r] == "undefined" &&
          (e[r] = arguments[t][r]);
    return e;
  };
  be.prepareContent = function (e, t, r, n, a) {
    var s = bs.Promise.resolve(t).then(function (o) {
      var f =
        tr.blob &&
        (o instanceof Blob ||
          ["[object File]", "[object Blob]"].indexOf(
            Object.prototype.toString.call(o)
          ) !== -1);
      return f && typeof FileReader != "undefined"
        ? new bs.Promise(function (h, l) {
            var c = new FileReader();
            (c.onload = function (m) {
              h(m.target.result);
            }),
              (c.onerror = function (m) {
                l(m.target.error);
              }),
              c.readAsArrayBuffer(o);
          })
        : o;
    });
    return s.then(function (o) {
      var f = be.getTypeOf(o);
      return f
        ? (f === "arraybuffer"
            ? (o = be.transformTo("uint8array", o))
            : f === "string" &&
              (a ? (o = Zg.decode(o)) : r && n !== !0 && (o = Kg(o))),
          o)
        : bs.Promise.reject(
            new Error(
              "Can't read the data of '" +
                e +
                "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"
            )
          );
    });
  };
});
var et = A((l1, fl) => {
  "use strict";
  function ul(e) {
    (this.name = e || "default"),
      (this.streamInfo = {}),
      (this.generatedError = null),
      (this.extraStreamInfo = {}),
      (this.isPaused = !0),
      (this.isFinished = !1),
      (this.isLocked = !1),
      (this._listeners = { data: [], end: [], error: [] }),
      (this.previous = null);
  }
  ul.prototype = {
    push: function (e) {
      this.emit("data", e);
    },
    end: function () {
      if (this.isFinished) return !1;
      this.flush();
      try {
        this.emit("end"), this.cleanUp(), (this.isFinished = !0);
      } catch (e) {
        this.emit("error", e);
      }
      return !0;
    },
    error: function (e) {
      return this.isFinished
        ? !1
        : (this.isPaused
            ? (this.generatedError = e)
            : ((this.isFinished = !0),
              this.emit("error", e),
              this.previous && this.previous.error(e),
              this.cleanUp()),
          !0);
    },
    on: function (e, t) {
      return this._listeners[e].push(t), this;
    },
    cleanUp: function () {
      (this.streamInfo = this.generatedError = this.extraStreamInfo = null),
        (this._listeners = []);
    },
    emit: function (e, t) {
      if (this._listeners[e])
        for (var r = 0; r < this._listeners[e].length; r++)
          this._listeners[e][r].call(this, t);
    },
    pipe: function (e) {
      return e.registerPrevious(this);
    },
    registerPrevious: function (e) {
      if (this.isLocked)
        throw new Error("The stream '" + this + "' has already been used.");
      (this.streamInfo = e.streamInfo),
        this.mergeStreamInfo(),
        (this.previous = e);
      var t = this;
      return (
        e.on("data", function (r) {
          t.processChunk(r);
        }),
        e.on("end", function () {
          t.end();
        }),
        e.on("error", function (r) {
          t.error(r);
        }),
        this
      );
    },
    pause: function () {
      return this.isPaused || this.isFinished
        ? !1
        : ((this.isPaused = !0), this.previous && this.previous.pause(), !0);
    },
    resume: function () {
      if (!this.isPaused || this.isFinished) return !1;
      this.isPaused = !1;
      var e = !1;
      return (
        this.generatedError && (this.error(this.generatedError), (e = !0)),
        this.previous && this.previous.resume(),
        !e
      );
    },
    flush: function () {},
    processChunk: function (e) {
      this.push(e);
    },
    withStreamInfo: function (e, t) {
      return (this.extraStreamInfo[e] = t), this.mergeStreamInfo(), this;
    },
    mergeStreamInfo: function () {
      for (var e in this.extraStreamInfo)
        !this.extraStreamInfo.hasOwnProperty(e) ||
          (this.streamInfo[e] = this.extraStreamInfo[e]);
    },
    lock: function () {
      if (this.isLocked)
        throw new Error("The stream '" + this + "' has already been used.");
      (this.isLocked = !0), this.previous && this.previous.lock();
    },
    toString: function () {
      var e = "Worker " + this.name;
      return this.previous ? this.previous + " -> " + e : e;
    },
  };
  fl.exports = ul;
});
var wr = A((nr) => {
  "use strict";
  var Vr = ge(),
    xr = qt(),
    Yg = Nn(),
    Pi = et(),
    Bn = new Array(256);
  for (Ut = 0; Ut < 256; Ut++)
    Bn[Ut] =
      Ut >= 252
        ? 6
        : Ut >= 248
        ? 5
        : Ut >= 240
        ? 4
        : Ut >= 224
        ? 3
        : Ut >= 192
        ? 2
        : 1;
  var Ut;
  Bn[254] = Bn[254] = 1;
  var $g = function (e) {
      var t,
        r,
        n,
        a,
        s,
        o = e.length,
        f = 0;
      for (a = 0; a < o; a++)
        (r = e.charCodeAt(a)),
          (r & 64512) == 55296 &&
            a + 1 < o &&
            ((n = e.charCodeAt(a + 1)),
            (n & 64512) == 56320 &&
              ((r = 65536 + ((r - 55296) << 10) + (n - 56320)), a++)),
          (f += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4);
      for (
        xr.uint8array ? (t = new Uint8Array(f)) : (t = new Array(f)),
          s = 0,
          a = 0;
        s < f;
        a++
      )
        (r = e.charCodeAt(a)),
          (r & 64512) == 55296 &&
            a + 1 < o &&
            ((n = e.charCodeAt(a + 1)),
            (n & 64512) == 56320 &&
              ((r = 65536 + ((r - 55296) << 10) + (n - 56320)), a++)),
          r < 128
            ? (t[s++] = r)
            : r < 2048
            ? ((t[s++] = 192 | (r >>> 6)), (t[s++] = 128 | (r & 63)))
            : r < 65536
            ? ((t[s++] = 224 | (r >>> 12)),
              (t[s++] = 128 | ((r >>> 6) & 63)),
              (t[s++] = 128 | (r & 63)))
            : ((t[s++] = 240 | (r >>> 18)),
              (t[s++] = 128 | ((r >>> 12) & 63)),
              (t[s++] = 128 | ((r >>> 6) & 63)),
              (t[s++] = 128 | (r & 63)));
      return t;
    },
    Qg = function (e, t) {
      var r;
      for (
        t = t || e.length, t > e.length && (t = e.length), r = t - 1;
        r >= 0 && (e[r] & 192) == 128;

      )
        r--;
      return r < 0 || r === 0 ? t : r + Bn[e[r]] > t ? r : t;
    },
    Jg = function (e) {
      var t,
        r,
        n,
        a,
        s,
        o = e.length,
        f = new Array(o * 2);
      for (n = 0, r = 0; r < o; ) {
        if (((a = e[r++]), a < 128)) {
          f[n++] = a;
          continue;
        }
        if (((s = Bn[a]), s > 4)) {
          (f[n++] = 65533), (r += s - 1);
          continue;
        }
        for (a &= s === 2 ? 31 : s === 3 ? 15 : 7; s > 1 && r < o; )
          (a = (a << 6) | (e[r++] & 63)), s--;
        if (s > 1) {
          f[n++] = 65533;
          continue;
        }
        a < 65536
          ? (f[n++] = a)
          : ((a -= 65536),
            (f[n++] = 55296 | ((a >> 10) & 1023)),
            (f[n++] = 56320 | (a & 1023)));
      }
      return (
        f.length !== n &&
          (f.subarray ? (f = f.subarray(0, n)) : (f.length = n)),
        Vr.applyFromCharCode(f)
      );
    };
  nr.utf8encode = function (t) {
    return xr.nodebuffer ? Yg.newBufferFrom(t, "utf-8") : $g(t);
  };
  nr.utf8decode = function (t) {
    return xr.nodebuffer
      ? Vr.transformTo("nodebuffer", t).toString("utf-8")
      : ((t = Vr.transformTo(xr.uint8array ? "uint8array" : "array", t)),
        Jg(t));
  };
  function ki() {
    Pi.call(this, "utf-8 decode"), (this.leftOver = null);
  }
  Vr.inherits(ki, Pi);
  ki.prototype.processChunk = function (e) {
    var t = Vr.transformTo(xr.uint8array ? "uint8array" : "array", e.data);
    if (this.leftOver && this.leftOver.length) {
      if (xr.uint8array) {
        var r = t;
        (t = new Uint8Array(r.length + this.leftOver.length)),
          t.set(this.leftOver, 0),
          t.set(r, this.leftOver.length);
      } else t = this.leftOver.concat(t);
      this.leftOver = null;
    }
    var n = Qg(t),
      a = t;
    n !== t.length &&
      (xr.uint8array
        ? ((a = t.subarray(0, n)), (this.leftOver = t.subarray(n, t.length)))
        : ((a = t.slice(0, n)), (this.leftOver = t.slice(n, t.length)))),
      this.push({ data: nr.utf8decode(a), meta: e.meta });
  };
  ki.prototype.flush = function () {
    this.leftOver &&
      this.leftOver.length &&
      (this.push({ data: nr.utf8decode(this.leftOver), meta: {} }),
      (this.leftOver = null));
  };
  nr.Utf8DecodeWorker = ki;
  function As() {
    Pi.call(this, "utf-8 encode");
  }
  Vr.inherits(As, Pi);
  As.prototype.processChunk = function (e) {
    this.push({ data: nr.utf8encode(e.data), meta: e.meta });
  };
  nr.Utf8EncodeWorker = As;
});
var pl = A((c1, cl) => {
  "use strict";
  var ll = et(),
    hl = ge();
  function Ss(e) {
    ll.call(this, "ConvertWorker to " + e), (this.destType = e);
  }
  hl.inherits(Ss, ll);
  Ss.prototype.processChunk = function (e) {
    this.push({ data: hl.transformTo(this.destType, e.data), meta: e.meta });
  };
  cl.exports = Ss;
});
var ml = A((p1, gl) => {
  "use strict";
  var dl = hs().Readable,
    em = ge();
  em.inherits(Ts, dl);
  function Ts(e, t, r) {
    dl.call(this, t), (this._helper = e);
    var n = this;
    e.on("data", function (a, s) {
      n.push(a) || n._helper.pause(), r && r(s);
    })
      .on("error", function (a) {
        n.emit("error", a);
      })
      .on("end", function () {
        n.push(null);
      });
  }
  Ts.prototype._read = function () {
    this._helper.resume();
  };
  gl.exports = Ts;
});
var Rs = A((d1, wl) => {
  "use strict";
  var yr = ge(),
    tm = pl(),
    rm = et(),
    nm = gs(),
    im = qt(),
    am = jr(),
    vl = null;
  if (im.nodestream)
    try {
      vl = ml();
    } catch {}
  function sm(e, t, r) {
    switch (e) {
      case "blob":
        return yr.newBlob(yr.transformTo("arraybuffer", t), r);
      case "base64":
        return nm.encode(t);
      default:
        return yr.transformTo(e, t);
    }
  }
  function om(e, t) {
    var r,
      n = 0,
      a = null,
      s = 0;
    for (r = 0; r < t.length; r++) s += t[r].length;
    switch (e) {
      case "string":
        return t.join("");
      case "array":
        return Array.prototype.concat.apply([], t);
      case "uint8array":
        for (a = new Uint8Array(s), r = 0; r < t.length; r++)
          a.set(t[r], n), (n += t[r].length);
        return a;
      case "nodebuffer":
        return Buffer.concat(t);
      default:
        throw new Error("concat : unsupported type '" + e + "'");
    }
  }
  function um(e, t) {
    return new am.Promise(function (r, n) {
      var a = [],
        s = e._internalType,
        o = e._outputType,
        f = e._mimeType;
      e.on("data", function (h, l) {
        a.push(h), t && t(l);
      })
        .on("error", function (h) {
          (a = []), n(h);
        })
        .on("end", function () {
          try {
            var h = sm(o, om(s, a), f);
            r(h);
          } catch (l) {
            n(l);
          }
          a = [];
        })
        .resume();
    });
  }
  function xl(e, t, r) {
    var n = t;
    switch (t) {
      case "blob":
      case "arraybuffer":
        n = "uint8array";
        break;
      case "base64":
        n = "string";
        break;
    }
    try {
      (this._internalType = n),
        (this._outputType = t),
        (this._mimeType = r),
        yr.checkSupport(n),
        (this._worker = e.pipe(new tm(n))),
        e.lock();
    } catch (a) {
      (this._worker = new rm("error")), this._worker.error(a);
    }
  }
  xl.prototype = {
    accumulate: function (e) {
      return um(this, e);
    },
    on: function (e, t) {
      var r = this;
      return (
        e === "data"
          ? this._worker.on(e, function (n) {
              t.call(r, n.data, n.meta);
            })
          : this._worker.on(e, function () {
              yr.delay(t, arguments, r);
            }),
        this
      );
    },
    resume: function () {
      return yr.delay(this._worker.resume, [], this._worker), this;
    },
    pause: function () {
      return this._worker.pause(), this;
    },
    toNodejsStream: function (e) {
      if ((yr.checkSupport("nodestream"), this._outputType !== "nodebuffer"))
        throw new Error(this._outputType + " is not supported by this method");
      return new vl(this, { objectMode: this._outputType !== "nodebuffer" }, e);
    },
  };
  wl.exports = xl;
});
var Cs = A((ct) => {
  "use strict";
  ct.base64 = !1;
  ct.binary = !1;
  ct.dir = !1;
  ct.createFolders = !0;
  ct.date = null;
  ct.compression = null;
  ct.compressionOptions = null;
  ct.comment = null;
  ct.unixPermissions = null;
  ct.dosPermissions = null;
});
var Ns = A((m1, yl) => {
  "use strict";
  var Fi = ge(),
    Bi = et(),
    fm = 16 * 1024;
  function Gr(e) {
    Bi.call(this, "DataWorker");
    var t = this;
    (this.dataIsReady = !1),
      (this.index = 0),
      (this.max = 0),
      (this.data = null),
      (this.type = ""),
      (this._tickScheduled = !1),
      e.then(
        function (r) {
          (t.dataIsReady = !0),
            (t.data = r),
            (t.max = (r && r.length) || 0),
            (t.type = Fi.getTypeOf(r)),
            t.isPaused || t._tickAndRepeat();
        },
        function (r) {
          t.error(r);
        }
      );
  }
  Fi.inherits(Gr, Bi);
  Gr.prototype.cleanUp = function () {
    Bi.prototype.cleanUp.call(this), (this.data = null);
  };
  Gr.prototype.resume = function () {
    return Bi.prototype.resume.call(this)
      ? (!this._tickScheduled &&
          this.dataIsReady &&
          ((this._tickScheduled = !0), Fi.delay(this._tickAndRepeat, [], this)),
        !0)
      : !1;
  };
  Gr.prototype._tickAndRepeat = function () {
    (this._tickScheduled = !1),
      !(this.isPaused || this.isFinished) &&
        (this._tick(),
        this.isFinished ||
          (Fi.delay(this._tickAndRepeat, [], this),
          (this._tickScheduled = !0)));
  };
  Gr.prototype._tick = function () {
    if (this.isPaused || this.isFinished) return !1;
    var e = fm,
      t = null,
      r = Math.min(this.max, this.index + e);
    if (this.index >= this.max) return this.end();
    switch (this.type) {
      case "string":
        t = this.data.substring(this.index, r);
        break;
      case "uint8array":
        t = this.data.subarray(this.index, r);
        break;
      case "array":
      case "nodebuffer":
        t = this.data.slice(this.index, r);
        break;
    }
    return (
      (this.index = r),
      this.push({
        data: t,
        meta: { percent: this.max ? (this.index / this.max) * 100 : 0 },
      })
    );
  };
  yl.exports = Gr;
});
var Li = A((v1, El) => {
  "use strict";
  var lm = ge();
  function hm() {
    for (var e, t = [], r = 0; r < 256; r++) {
      e = r;
      for (var n = 0; n < 8; n++) e = e & 1 ? 3988292384 ^ (e >>> 1) : e >>> 1;
      t[r] = e;
    }
    return t;
  }
  var _l = hm();
  function cm(e, t, r, n) {
    var a = _l,
      s = n + r;
    e = e ^ -1;
    for (var o = n; o < s; o++) e = (e >>> 8) ^ a[(e ^ t[o]) & 255];
    return e ^ -1;
  }
  function pm(e, t, r, n) {
    var a = _l,
      s = n + r;
    e = e ^ -1;
    for (var o = n; o < s; o++) e = (e >>> 8) ^ a[(e ^ t.charCodeAt(o)) & 255];
    return e ^ -1;
  }
  El.exports = function (t, r) {
    if (typeof t == "undefined" || !t.length) return 0;
    var n = lm.getTypeOf(t) !== "string";
    return n ? cm(r | 0, t, t.length, 0) : pm(r | 0, t, t.length, 0);
  };
});
var Ds = A((x1, Al) => {
  "use strict";
  var bl = et(),
    dm = Li(),
    gm = ge();
  function Is() {
    bl.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
  }
  gm.inherits(Is, bl);
  Is.prototype.processChunk = function (e) {
    (this.streamInfo.crc32 = dm(e.data, this.streamInfo.crc32 || 0)),
      this.push(e);
  };
  Al.exports = Is;
});
var Tl = A((w1, Sl) => {
  "use strict";
  var mm = ge(),
    Os = et();
  function Ps(e) {
    Os.call(this, "DataLengthProbe for " + e),
      (this.propName = e),
      this.withStreamInfo(e, 0);
  }
  mm.inherits(Ps, Os);
  Ps.prototype.processChunk = function (e) {
    if (e) {
      var t = this.streamInfo[this.propName] || 0;
      this.streamInfo[this.propName] = t + e.data.length;
    }
    Os.prototype.processChunk.call(this, e);
  };
  Sl.exports = Ps;
});
var qi = A((y1, Nl) => {
  "use strict";
  var Rl = jr(),
    Cl = Ns(),
    vm = Ds(),
    ks = Tl();
  function Fs(e, t, r, n, a) {
    (this.compressedSize = e),
      (this.uncompressedSize = t),
      (this.crc32 = r),
      (this.compression = n),
      (this.compressedContent = a);
  }
  Fs.prototype = {
    getContentWorker: function () {
      var e = new Cl(Rl.Promise.resolve(this.compressedContent))
          .pipe(this.compression.uncompressWorker())
          .pipe(new ks("data_length")),
        t = this;
      return (
        e.on("end", function () {
          if (this.streamInfo.data_length !== t.uncompressedSize)
            throw new Error("Bug : uncompressed data size mismatch");
        }),
        e
      );
    },
    getCompressedWorker: function () {
      return new Cl(Rl.Promise.resolve(this.compressedContent))
        .withStreamInfo("compressedSize", this.compressedSize)
        .withStreamInfo("uncompressedSize", this.uncompressedSize)
        .withStreamInfo("crc32", this.crc32)
        .withStreamInfo("compression", this.compression);
    },
  };
  Fs.createWorkerFrom = function (e, t, r) {
    return e
      .pipe(new vm())
      .pipe(new ks("uncompressedSize"))
      .pipe(t.compressWorker(r))
      .pipe(new ks("compressedSize"))
      .withStreamInfo("compression", t);
  };
  Nl.exports = Fs;
});
var Pl = A((_1, Ol) => {
  "use strict";
  var xm = Rs(),
    wm = Ns(),
    Bs = wr(),
    Ls = qi(),
    Il = et(),
    qs = function (e, t, r) {
      (this.name = e),
        (this.dir = r.dir),
        (this.date = r.date),
        (this.comment = r.comment),
        (this.unixPermissions = r.unixPermissions),
        (this.dosPermissions = r.dosPermissions),
        (this._data = t),
        (this._dataBinary = r.binary),
        (this.options = {
          compression: r.compression,
          compressionOptions: r.compressionOptions,
        });
    };
  qs.prototype = {
    internalStream: function (e) {
      var t = null,
        r = "string";
      try {
        if (!e) throw new Error("No output type specified.");
        r = e.toLowerCase();
        var n = r === "string" || r === "text";
        (r === "binarystring" || r === "text") && (r = "string"),
          (t = this._decompressWorker());
        var a = !this._dataBinary;
        a && !n && (t = t.pipe(new Bs.Utf8EncodeWorker())),
          !a && n && (t = t.pipe(new Bs.Utf8DecodeWorker()));
      } catch (s) {
        (t = new Il("error")), t.error(s);
      }
      return new xm(t, r, "");
    },
    async: function (e, t) {
      return this.internalStream(e).accumulate(t);
    },
    nodeStream: function (e, t) {
      return this.internalStream(e || "nodebuffer").toNodejsStream(t);
    },
    _compressWorker: function (e, t) {
      if (this._data instanceof Ls && this._data.compression.magic === e.magic)
        return this._data.getCompressedWorker();
      var r = this._decompressWorker();
      return (
        this._dataBinary || (r = r.pipe(new Bs.Utf8EncodeWorker())),
        Ls.createWorkerFrom(r, e, t)
      );
    },
    _decompressWorker: function () {
      return this._data instanceof Ls
        ? this._data.getContentWorker()
        : this._data instanceof Il
        ? this._data
        : new wm(this._data);
    },
  };
  var Dl = [
      "asText",
      "asBinary",
      "asNodeBuffer",
      "asUint8Array",
      "asArrayBuffer",
    ],
    ym = function () {
      throw new Error(
        "This method has been removed in JSZip 3.0, please check the upgrade guide."
      );
    };
  for (Ui = 0; Ui < Dl.length; Ui++) qs.prototype[Dl[Ui]] = ym;
  var Ui;
  Ol.exports = qs;
});
var Mt = A((ze) => {
  "use strict";
  var _m =
    typeof Uint8Array != "undefined" &&
    typeof Uint16Array != "undefined" &&
    typeof Int32Array != "undefined";
  function Em(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }
  ze.assign = function (e) {
    for (var t = Array.prototype.slice.call(arguments, 1); t.length; ) {
      var r = t.shift();
      if (!!r) {
        if (typeof r != "object") throw new TypeError(r + "must be non-object");
        for (var n in r) Em(r, n) && (e[n] = r[n]);
      }
    }
    return e;
  };
  ze.shrinkBuf = function (e, t) {
    return e.length === t
      ? e
      : e.subarray
      ? e.subarray(0, t)
      : ((e.length = t), e);
  };
  var bm = {
      arraySet: function (e, t, r, n, a) {
        if (t.subarray && e.subarray) {
          e.set(t.subarray(r, r + n), a);
          return;
        }
        for (var s = 0; s < n; s++) e[a + s] = t[r + s];
      },
      flattenChunks: function (e) {
        var t, r, n, a, s, o;
        for (n = 0, t = 0, r = e.length; t < r; t++) n += e[t].length;
        for (o = new Uint8Array(n), a = 0, t = 0, r = e.length; t < r; t++)
          (s = e[t]), o.set(s, a), (a += s.length);
        return o;
      },
    },
    Am = {
      arraySet: function (e, t, r, n, a) {
        for (var s = 0; s < n; s++) e[a + s] = t[r + s];
      },
      flattenChunks: function (e) {
        return [].concat.apply([], e);
      },
    };
  ze.setTyped = function (e) {
    e
      ? ((ze.Buf8 = Uint8Array),
        (ze.Buf16 = Uint16Array),
        (ze.Buf32 = Int32Array),
        ze.assign(ze, bm))
      : ((ze.Buf8 = Array),
        (ze.Buf16 = Array),
        (ze.Buf32 = Array),
        ze.assign(ze, Am));
  };
  ze.setTyped(_m);
});
var rh = A((Kr) => {
  "use strict";
  var Sm = Mt(),
    Tm = 4,
    kl = 0,
    Fl = 1,
    Rm = 2;
  function Zr(e) {
    for (var t = e.length; --t >= 0; ) e[t] = 0;
  }
  var Cm = 0,
    Bl = 1,
    Nm = 2,
    Im = 3,
    Dm = 258,
    Us = 29,
    Ln = 256,
    qn = Ln + 1 + Us,
    Xr = 30,
    Ms = 19,
    Ll = 2 * qn + 1,
    _r = 15,
    zs = 16,
    Om = 7,
    Ws = 256,
    ql = 16,
    Ul = 17,
    Ml = 18,
    js = [
      0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5,
      5, 5, 5, 0,
    ],
    Mi = [
      0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10,
      11, 11, 12, 12, 13, 13,
    ],
    Pm = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
    zl = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
    km = 512,
    zt = new Array((qn + 2) * 2);
  Zr(zt);
  var Un = new Array(Xr * 2);
  Zr(Un);
  var Mn = new Array(km);
  Zr(Mn);
  var zn = new Array(Dm - Im + 1);
  Zr(zn);
  var Hs = new Array(Us);
  Zr(Hs);
  var zi = new Array(Xr);
  Zr(zi);
  function Vs(e, t, r, n, a) {
    (this.static_tree = e),
      (this.extra_bits = t),
      (this.extra_base = r),
      (this.elems = n),
      (this.max_length = a),
      (this.has_stree = e && e.length);
  }
  var Wl, jl, Hl;
  function Gs(e, t) {
    (this.dyn_tree = e), (this.max_code = 0), (this.stat_desc = t);
  }
  function Vl(e) {
    return e < 256 ? Mn[e] : Mn[256 + (e >>> 7)];
  }
  function Wn(e, t) {
    (e.pending_buf[e.pending++] = t & 255),
      (e.pending_buf[e.pending++] = (t >>> 8) & 255);
  }
  function Ye(e, t, r) {
    e.bi_valid > zs - r
      ? ((e.bi_buf |= (t << e.bi_valid) & 65535),
        Wn(e, e.bi_buf),
        (e.bi_buf = t >> (zs - e.bi_valid)),
        (e.bi_valid += r - zs))
      : ((e.bi_buf |= (t << e.bi_valid) & 65535), (e.bi_valid += r));
  }
  function St(e, t, r) {
    Ye(e, r[t * 2], r[t * 2 + 1]);
  }
  function Gl(e, t) {
    var r = 0;
    do (r |= e & 1), (e >>>= 1), (r <<= 1);
    while (--t > 0);
    return r >>> 1;
  }
  function Fm(e) {
    e.bi_valid === 16
      ? (Wn(e, e.bi_buf), (e.bi_buf = 0), (e.bi_valid = 0))
      : e.bi_valid >= 8 &&
        ((e.pending_buf[e.pending++] = e.bi_buf & 255),
        (e.bi_buf >>= 8),
        (e.bi_valid -= 8));
  }
  function Bm(e, t) {
    var r = t.dyn_tree,
      n = t.max_code,
      a = t.stat_desc.static_tree,
      s = t.stat_desc.has_stree,
      o = t.stat_desc.extra_bits,
      f = t.stat_desc.extra_base,
      h = t.stat_desc.max_length,
      l,
      c,
      m,
      v,
      x,
      p,
      _ = 0;
    for (v = 0; v <= _r; v++) e.bl_count[v] = 0;
    for (r[e.heap[e.heap_max] * 2 + 1] = 0, l = e.heap_max + 1; l < Ll; l++)
      (c = e.heap[l]),
        (v = r[r[c * 2 + 1] * 2 + 1] + 1),
        v > h && ((v = h), _++),
        (r[c * 2 + 1] = v),
        !(c > n) &&
          (e.bl_count[v]++,
          (x = 0),
          c >= f && (x = o[c - f]),
          (p = r[c * 2]),
          (e.opt_len += p * (v + x)),
          s && (e.static_len += p * (a[c * 2 + 1] + x)));
    if (_ !== 0) {
      do {
        for (v = h - 1; e.bl_count[v] === 0; ) v--;
        e.bl_count[v]--, (e.bl_count[v + 1] += 2), e.bl_count[h]--, (_ -= 2);
      } while (_ > 0);
      for (v = h; v !== 0; v--)
        for (c = e.bl_count[v]; c !== 0; )
          (m = e.heap[--l]),
            !(m > n) &&
              (r[m * 2 + 1] !== v &&
                ((e.opt_len += (v - r[m * 2 + 1]) * r[m * 2]),
                (r[m * 2 + 1] = v)),
              c--);
    }
  }
  function Zl(e, t, r) {
    var n = new Array(_r + 1),
      a = 0,
      s,
      o;
    for (s = 1; s <= _r; s++) n[s] = a = (a + r[s - 1]) << 1;
    for (o = 0; o <= t; o++) {
      var f = e[o * 2 + 1];
      f !== 0 && (e[o * 2] = Gl(n[f]++, f));
    }
  }
  function Lm() {
    var e,
      t,
      r,
      n,
      a,
      s = new Array(_r + 1);
    for (r = 0, n = 0; n < Us - 1; n++)
      for (Hs[n] = r, e = 0; e < 1 << js[n]; e++) zn[r++] = n;
    for (zn[r - 1] = n, a = 0, n = 0; n < 16; n++)
      for (zi[n] = a, e = 0; e < 1 << Mi[n]; e++) Mn[a++] = n;
    for (a >>= 7; n < Xr; n++)
      for (zi[n] = a << 7, e = 0; e < 1 << (Mi[n] - 7); e++) Mn[256 + a++] = n;
    for (t = 0; t <= _r; t++) s[t] = 0;
    for (e = 0; e <= 143; ) (zt[e * 2 + 1] = 8), e++, s[8]++;
    for (; e <= 255; ) (zt[e * 2 + 1] = 9), e++, s[9]++;
    for (; e <= 279; ) (zt[e * 2 + 1] = 7), e++, s[7]++;
    for (; e <= 287; ) (zt[e * 2 + 1] = 8), e++, s[8]++;
    for (Zl(zt, qn + 1, s), e = 0; e < Xr; e++)
      (Un[e * 2 + 1] = 5), (Un[e * 2] = Gl(e, 5));
    (Wl = new Vs(zt, js, Ln + 1, qn, _r)),
      (jl = new Vs(Un, Mi, 0, Xr, _r)),
      (Hl = new Vs(new Array(0), Pm, 0, Ms, Om));
  }
  function Xl(e) {
    var t;
    for (t = 0; t < qn; t++) e.dyn_ltree[t * 2] = 0;
    for (t = 0; t < Xr; t++) e.dyn_dtree[t * 2] = 0;
    for (t = 0; t < Ms; t++) e.bl_tree[t * 2] = 0;
    (e.dyn_ltree[Ws * 2] = 1),
      (e.opt_len = e.static_len = 0),
      (e.last_lit = e.matches = 0);
  }
  function Kl(e) {
    e.bi_valid > 8
      ? Wn(e, e.bi_buf)
      : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf),
      (e.bi_buf = 0),
      (e.bi_valid = 0);
  }
  function qm(e, t, r, n) {
    Kl(e),
      n && (Wn(e, r), Wn(e, ~r)),
      Sm.arraySet(e.pending_buf, e.window, t, r, e.pending),
      (e.pending += r);
  }
  function Yl(e, t, r, n) {
    var a = t * 2,
      s = r * 2;
    return e[a] < e[s] || (e[a] === e[s] && n[t] <= n[r]);
  }
  function Zs(e, t, r) {
    for (
      var n = e.heap[r], a = r << 1;
      a <= e.heap_len &&
      (a < e.heap_len && Yl(t, e.heap[a + 1], e.heap[a], e.depth) && a++,
      !Yl(t, n, e.heap[a], e.depth));

    )
      (e.heap[r] = e.heap[a]), (r = a), (a <<= 1);
    e.heap[r] = n;
  }
  function $l(e, t, r) {
    var n,
      a,
      s = 0,
      o,
      f;
    if (e.last_lit !== 0)
      do
        (n =
          (e.pending_buf[e.d_buf + s * 2] << 8) |
          e.pending_buf[e.d_buf + s * 2 + 1]),
          (a = e.pending_buf[e.l_buf + s]),
          s++,
          n === 0
            ? St(e, a, t)
            : ((o = zn[a]),
              St(e, o + Ln + 1, t),
              (f = js[o]),
              f !== 0 && ((a -= Hs[o]), Ye(e, a, f)),
              n--,
              (o = Vl(n)),
              St(e, o, r),
              (f = Mi[o]),
              f !== 0 && ((n -= zi[o]), Ye(e, n, f)));
      while (s < e.last_lit);
    St(e, Ws, t);
  }
  function Xs(e, t) {
    var r = t.dyn_tree,
      n = t.stat_desc.static_tree,
      a = t.stat_desc.has_stree,
      s = t.stat_desc.elems,
      o,
      f,
      h = -1,
      l;
    for (e.heap_len = 0, e.heap_max = Ll, o = 0; o < s; o++)
      r[o * 2] !== 0
        ? ((e.heap[++e.heap_len] = h = o), (e.depth[o] = 0))
        : (r[o * 2 + 1] = 0);
    for (; e.heap_len < 2; )
      (l = e.heap[++e.heap_len] = h < 2 ? ++h : 0),
        (r[l * 2] = 1),
        (e.depth[l] = 0),
        e.opt_len--,
        a && (e.static_len -= n[l * 2 + 1]);
    for (t.max_code = h, o = e.heap_len >> 1; o >= 1; o--) Zs(e, r, o);
    l = s;
    do
      (o = e.heap[1]),
        (e.heap[1] = e.heap[e.heap_len--]),
        Zs(e, r, 1),
        (f = e.heap[1]),
        (e.heap[--e.heap_max] = o),
        (e.heap[--e.heap_max] = f),
        (r[l * 2] = r[o * 2] + r[f * 2]),
        (e.depth[l] = (e.depth[o] >= e.depth[f] ? e.depth[o] : e.depth[f]) + 1),
        (r[o * 2 + 1] = r[f * 2 + 1] = l),
        (e.heap[1] = l++),
        Zs(e, r, 1);
    while (e.heap_len >= 2);
    (e.heap[--e.heap_max] = e.heap[1]), Bm(e, t), Zl(r, h, e.bl_count);
  }
  function Ql(e, t, r) {
    var n,
      a = -1,
      s,
      o = t[0 * 2 + 1],
      f = 0,
      h = 7,
      l = 4;
    for (
      o === 0 && ((h = 138), (l = 3)), t[(r + 1) * 2 + 1] = 65535, n = 0;
      n <= r;
      n++
    )
      (s = o),
        (o = t[(n + 1) * 2 + 1]),
        !(++f < h && s === o) &&
          (f < l
            ? (e.bl_tree[s * 2] += f)
            : s !== 0
            ? (s !== a && e.bl_tree[s * 2]++, e.bl_tree[ql * 2]++)
            : f <= 10
            ? e.bl_tree[Ul * 2]++
            : e.bl_tree[Ml * 2]++,
          (f = 0),
          (a = s),
          o === 0
            ? ((h = 138), (l = 3))
            : s === o
            ? ((h = 6), (l = 3))
            : ((h = 7), (l = 4)));
  }
  function Jl(e, t, r) {
    var n,
      a = -1,
      s,
      o = t[0 * 2 + 1],
      f = 0,
      h = 7,
      l = 4;
    for (o === 0 && ((h = 138), (l = 3)), n = 0; n <= r; n++)
      if (((s = o), (o = t[(n + 1) * 2 + 1]), !(++f < h && s === o))) {
        if (f < l)
          do St(e, s, e.bl_tree);
          while (--f != 0);
        else
          s !== 0
            ? (s !== a && (St(e, s, e.bl_tree), f--),
              St(e, ql, e.bl_tree),
              Ye(e, f - 3, 2))
            : f <= 10
            ? (St(e, Ul, e.bl_tree), Ye(e, f - 3, 3))
            : (St(e, Ml, e.bl_tree), Ye(e, f - 11, 7));
        (f = 0),
          (a = s),
          o === 0
            ? ((h = 138), (l = 3))
            : s === o
            ? ((h = 6), (l = 3))
            : ((h = 7), (l = 4));
      }
  }
  function Um(e) {
    var t;
    for (
      Ql(e, e.dyn_ltree, e.l_desc.max_code),
        Ql(e, e.dyn_dtree, e.d_desc.max_code),
        Xs(e, e.bl_desc),
        t = Ms - 1;
      t >= 3 && e.bl_tree[zl[t] * 2 + 1] === 0;
      t--
    );
    return (e.opt_len += 3 * (t + 1) + 5 + 5 + 4), t;
  }
  function Mm(e, t, r, n) {
    var a;
    for (Ye(e, t - 257, 5), Ye(e, r - 1, 5), Ye(e, n - 4, 4), a = 0; a < n; a++)
      Ye(e, e.bl_tree[zl[a] * 2 + 1], 3);
    Jl(e, e.dyn_ltree, t - 1), Jl(e, e.dyn_dtree, r - 1);
  }
  function zm(e) {
    var t = 4093624447,
      r;
    for (r = 0; r <= 31; r++, t >>>= 1)
      if (t & 1 && e.dyn_ltree[r * 2] !== 0) return kl;
    if (
      e.dyn_ltree[9 * 2] !== 0 ||
      e.dyn_ltree[10 * 2] !== 0 ||
      e.dyn_ltree[13 * 2] !== 0
    )
      return Fl;
    for (r = 32; r < Ln; r++) if (e.dyn_ltree[r * 2] !== 0) return Fl;
    return kl;
  }
  var eh = !1;
  function Wm(e) {
    eh || (Lm(), (eh = !0)),
      (e.l_desc = new Gs(e.dyn_ltree, Wl)),
      (e.d_desc = new Gs(e.dyn_dtree, jl)),
      (e.bl_desc = new Gs(e.bl_tree, Hl)),
      (e.bi_buf = 0),
      (e.bi_valid = 0),
      Xl(e);
  }
  function th(e, t, r, n) {
    Ye(e, (Cm << 1) + (n ? 1 : 0), 3), qm(e, t, r, !0);
  }
  function jm(e) {
    Ye(e, Bl << 1, 3), St(e, Ws, zt), Fm(e);
  }
  function Hm(e, t, r, n) {
    var a,
      s,
      o = 0;
    e.level > 0
      ? (e.strm.data_type === Rm && (e.strm.data_type = zm(e)),
        Xs(e, e.l_desc),
        Xs(e, e.d_desc),
        (o = Um(e)),
        (a = (e.opt_len + 3 + 7) >>> 3),
        (s = (e.static_len + 3 + 7) >>> 3),
        s <= a && (a = s))
      : (a = s = r + 5),
      r + 4 <= a && t !== -1
        ? th(e, t, r, n)
        : e.strategy === Tm || s === a
        ? (Ye(e, (Bl << 1) + (n ? 1 : 0), 3), $l(e, zt, Un))
        : (Ye(e, (Nm << 1) + (n ? 1 : 0), 3),
          Mm(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, o + 1),
          $l(e, e.dyn_ltree, e.dyn_dtree)),
      Xl(e),
      n && Kl(e);
  }
  function Vm(e, t, r) {
    return (
      (e.pending_buf[e.d_buf + e.last_lit * 2] = (t >>> 8) & 255),
      (e.pending_buf[e.d_buf + e.last_lit * 2 + 1] = t & 255),
      (e.pending_buf[e.l_buf + e.last_lit] = r & 255),
      e.last_lit++,
      t === 0
        ? e.dyn_ltree[r * 2]++
        : (e.matches++,
          t--,
          e.dyn_ltree[(zn[r] + Ln + 1) * 2]++,
          e.dyn_dtree[Vl(t) * 2]++),
      e.last_lit === e.lit_bufsize - 1
    );
  }
  Kr._tr_init = Wm;
  Kr._tr_stored_block = th;
  Kr._tr_flush_block = Hm;
  Kr._tr_tally = Vm;
  Kr._tr_align = jm;
});
var Ks = A((A1, nh) => {
  "use strict";
  function Gm(e, t, r, n) {
    for (
      var a = (e & 65535) | 0, s = ((e >>> 16) & 65535) | 0, o = 0;
      r !== 0;

    ) {
      (o = r > 2e3 ? 2e3 : r), (r -= o);
      do (a = (a + t[n++]) | 0), (s = (s + a) | 0);
      while (--o);
      (a %= 65521), (s %= 65521);
    }
    return a | (s << 16) | 0;
  }
  nh.exports = Gm;
});
var Ys = A((S1, ih) => {
  "use strict";
  function Zm() {
    for (var e, t = [], r = 0; r < 256; r++) {
      e = r;
      for (var n = 0; n < 8; n++) e = e & 1 ? 3988292384 ^ (e >>> 1) : e >>> 1;
      t[r] = e;
    }
    return t;
  }
  var Xm = Zm();
  function Km(e, t, r, n) {
    var a = Xm,
      s = n + r;
    e ^= -1;
    for (var o = n; o < s; o++) e = (e >>> 8) ^ a[(e ^ t[o]) & 255];
    return e ^ -1;
  }
  ih.exports = Km;
});
var Wi = A((T1, ah) => {
  "use strict";
  ah.exports = {
    2: "need dictionary",
    1: "stream end",
    0: "",
    "-1": "file error",
    "-2": "stream error",
    "-3": "data error",
    "-4": "insufficient memory",
    "-5": "buffer error",
    "-6": "incompatible version",
  };
});
var dh = A((Ct) => {
  "use strict";
  var We = Mt(),
    at = rh(),
    sh = Ks(),
    ir = Ys(),
    Ym = Wi(),
    Er = 0,
    $m = 1,
    Qm = 3,
    ar = 4,
    oh = 5,
    Tt = 0,
    uh = 1,
    st = -2,
    Jm = -3,
    $s = -5,
    ev = -1,
    tv = 1,
    ji = 2,
    rv = 3,
    nv = 4,
    iv = 0,
    av = 2,
    Hi = 8,
    sv = 9,
    ov = 15,
    uv = 8,
    fv = 29,
    lv = 256,
    Qs = lv + 1 + fv,
    hv = 30,
    cv = 19,
    pv = 2 * Qs + 1,
    dv = 15,
    ee = 3,
    sr = 258,
    pt = sr + ee + 1,
    gv = 32,
    Vi = 42,
    Js = 69,
    Gi = 73,
    Zi = 91,
    Xi = 103,
    br = 113,
    jn = 666,
    Ae = 1,
    Hn = 2,
    Ar = 3,
    Yr = 4,
    mv = 3;
  function or(e, t) {
    return (e.msg = Ym[t]), t;
  }
  function fh(e) {
    return (e << 1) - (e > 4 ? 9 : 0);
  }
  function ur(e) {
    for (var t = e.length; --t >= 0; ) e[t] = 0;
  }
  function fr(e) {
    var t = e.state,
      r = t.pending;
    r > e.avail_out && (r = e.avail_out),
      r !== 0 &&
        (We.arraySet(e.output, t.pending_buf, t.pending_out, r, e.next_out),
        (e.next_out += r),
        (t.pending_out += r),
        (e.total_out += r),
        (e.avail_out -= r),
        (t.pending -= r),
        t.pending === 0 && (t.pending_out = 0));
  }
  function Oe(e, t) {
    at._tr_flush_block(
      e,
      e.block_start >= 0 ? e.block_start : -1,
      e.strstart - e.block_start,
      t
    ),
      (e.block_start = e.strstart),
      fr(e.strm);
  }
  function ne(e, t) {
    e.pending_buf[e.pending++] = t;
  }
  function Vn(e, t) {
    (e.pending_buf[e.pending++] = (t >>> 8) & 255),
      (e.pending_buf[e.pending++] = t & 255);
  }
  function vv(e, t, r, n) {
    var a = e.avail_in;
    return (
      a > n && (a = n),
      a === 0
        ? 0
        : ((e.avail_in -= a),
          We.arraySet(t, e.input, e.next_in, a, r),
          e.state.wrap === 1
            ? (e.adler = sh(e.adler, t, a, r))
            : e.state.wrap === 2 && (e.adler = ir(e.adler, t, a, r)),
          (e.next_in += a),
          (e.total_in += a),
          a)
    );
  }
  function lh(e, t) {
    var r = e.max_chain_length,
      n = e.strstart,
      a,
      s,
      o = e.prev_length,
      f = e.nice_match,
      h = e.strstart > e.w_size - pt ? e.strstart - (e.w_size - pt) : 0,
      l = e.window,
      c = e.w_mask,
      m = e.prev,
      v = e.strstart + sr,
      x = l[n + o - 1],
      p = l[n + o];
    e.prev_length >= e.good_match && (r >>= 2),
      f > e.lookahead && (f = e.lookahead);
    do
      if (
        ((a = t),
        !(
          l[a + o] !== p ||
          l[a + o - 1] !== x ||
          l[a] !== l[n] ||
          l[++a] !== l[n + 1]
        ))
      ) {
        (n += 2), a++;
        do;
        while (
          l[++n] === l[++a] &&
          l[++n] === l[++a] &&
          l[++n] === l[++a] &&
          l[++n] === l[++a] &&
          l[++n] === l[++a] &&
          l[++n] === l[++a] &&
          l[++n] === l[++a] &&
          l[++n] === l[++a] &&
          n < v
        );
        if (((s = sr - (v - n)), (n = v - sr), s > o)) {
          if (((e.match_start = t), (o = s), s >= f)) break;
          (x = l[n + o - 1]), (p = l[n + o]);
        }
      }
    while ((t = m[t & c]) > h && --r != 0);
    return o <= e.lookahead ? o : e.lookahead;
  }
  function Sr(e) {
    var t = e.w_size,
      r,
      n,
      a,
      s,
      o;
    do {
      if (
        ((s = e.window_size - e.lookahead - e.strstart),
        e.strstart >= t + (t - pt))
      ) {
        We.arraySet(e.window, e.window, t, t, 0),
          (e.match_start -= t),
          (e.strstart -= t),
          (e.block_start -= t),
          (n = e.hash_size),
          (r = n);
        do (a = e.head[--r]), (e.head[r] = a >= t ? a - t : 0);
        while (--n);
        (n = t), (r = n);
        do (a = e.prev[--r]), (e.prev[r] = a >= t ? a - t : 0);
        while (--n);
        s += t;
      }
      if (e.strm.avail_in === 0) break;
      if (
        ((n = vv(e.strm, e.window, e.strstart + e.lookahead, s)),
        (e.lookahead += n),
        e.lookahead + e.insert >= ee)
      )
        for (
          o = e.strstart - e.insert,
            e.ins_h = e.window[o],
            e.ins_h =
              ((e.ins_h << e.hash_shift) ^ e.window[o + 1]) & e.hash_mask;
          e.insert &&
          ((e.ins_h =
            ((e.ins_h << e.hash_shift) ^ e.window[o + ee - 1]) & e.hash_mask),
          (e.prev[o & e.w_mask] = e.head[e.ins_h]),
          (e.head[e.ins_h] = o),
          o++,
          e.insert--,
          !(e.lookahead + e.insert < ee));

        );
    } while (e.lookahead < pt && e.strm.avail_in !== 0);
  }
  function xv(e, t) {
    var r = 65535;
    for (r > e.pending_buf_size - 5 && (r = e.pending_buf_size - 5); ; ) {
      if (e.lookahead <= 1) {
        if ((Sr(e), e.lookahead === 0 && t === Er)) return Ae;
        if (e.lookahead === 0) break;
      }
      (e.strstart += e.lookahead), (e.lookahead = 0);
      var n = e.block_start + r;
      if (
        ((e.strstart === 0 || e.strstart >= n) &&
          ((e.lookahead = e.strstart - n),
          (e.strstart = n),
          Oe(e, !1),
          e.strm.avail_out === 0)) ||
        (e.strstart - e.block_start >= e.w_size - pt &&
          (Oe(e, !1), e.strm.avail_out === 0))
      )
        return Ae;
    }
    return (
      (e.insert = 0),
      t === ar
        ? (Oe(e, !0), e.strm.avail_out === 0 ? Ar : Yr)
        : (e.strstart > e.block_start && (Oe(e, !1), e.strm.avail_out === 0),
          Ae)
    );
  }
  function eo(e, t) {
    for (var r, n; ; ) {
      if (e.lookahead < pt) {
        if ((Sr(e), e.lookahead < pt && t === Er)) return Ae;
        if (e.lookahead === 0) break;
      }
      if (
        ((r = 0),
        e.lookahead >= ee &&
          ((e.ins_h =
            ((e.ins_h << e.hash_shift) ^ e.window[e.strstart + ee - 1]) &
            e.hash_mask),
          (r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
          (e.head[e.ins_h] = e.strstart)),
        r !== 0 &&
          e.strstart - r <= e.w_size - pt &&
          (e.match_length = lh(e, r)),
        e.match_length >= ee)
      )
        if (
          ((n = at._tr_tally(
            e,
            e.strstart - e.match_start,
            e.match_length - ee
          )),
          (e.lookahead -= e.match_length),
          e.match_length <= e.max_lazy_match && e.lookahead >= ee)
        ) {
          e.match_length--;
          do
            e.strstart++,
              (e.ins_h =
                ((e.ins_h << e.hash_shift) ^ e.window[e.strstart + ee - 1]) &
                e.hash_mask),
              (r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
              (e.head[e.ins_h] = e.strstart);
          while (--e.match_length != 0);
          e.strstart++;
        } else
          (e.strstart += e.match_length),
            (e.match_length = 0),
            (e.ins_h = e.window[e.strstart]),
            (e.ins_h =
              ((e.ins_h << e.hash_shift) ^ e.window[e.strstart + 1]) &
              e.hash_mask);
      else
        (n = at._tr_tally(e, 0, e.window[e.strstart])),
          e.lookahead--,
          e.strstart++;
      if (n && (Oe(e, !1), e.strm.avail_out === 0)) return Ae;
    }
    return (
      (e.insert = e.strstart < ee - 1 ? e.strstart : ee - 1),
      t === ar
        ? (Oe(e, !0), e.strm.avail_out === 0 ? Ar : Yr)
        : e.last_lit && (Oe(e, !1), e.strm.avail_out === 0)
        ? Ae
        : Hn
    );
  }
  function $r(e, t) {
    for (var r, n, a; ; ) {
      if (e.lookahead < pt) {
        if ((Sr(e), e.lookahead < pt && t === Er)) return Ae;
        if (e.lookahead === 0) break;
      }
      if (
        ((r = 0),
        e.lookahead >= ee &&
          ((e.ins_h =
            ((e.ins_h << e.hash_shift) ^ e.window[e.strstart + ee - 1]) &
            e.hash_mask),
          (r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
          (e.head[e.ins_h] = e.strstart)),
        (e.prev_length = e.match_length),
        (e.prev_match = e.match_start),
        (e.match_length = ee - 1),
        r !== 0 &&
          e.prev_length < e.max_lazy_match &&
          e.strstart - r <= e.w_size - pt &&
          ((e.match_length = lh(e, r)),
          e.match_length <= 5 &&
            (e.strategy === tv ||
              (e.match_length === ee && e.strstart - e.match_start > 4096)) &&
            (e.match_length = ee - 1)),
        e.prev_length >= ee && e.match_length <= e.prev_length)
      ) {
        (a = e.strstart + e.lookahead - ee),
          (n = at._tr_tally(
            e,
            e.strstart - 1 - e.prev_match,
            e.prev_length - ee
          )),
          (e.lookahead -= e.prev_length - 1),
          (e.prev_length -= 2);
        do
          ++e.strstart <= a &&
            ((e.ins_h =
              ((e.ins_h << e.hash_shift) ^ e.window[e.strstart + ee - 1]) &
              e.hash_mask),
            (r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
            (e.head[e.ins_h] = e.strstart));
        while (--e.prev_length != 0);
        if (
          ((e.match_available = 0),
          (e.match_length = ee - 1),
          e.strstart++,
          n && (Oe(e, !1), e.strm.avail_out === 0))
        )
          return Ae;
      } else if (e.match_available) {
        if (
          ((n = at._tr_tally(e, 0, e.window[e.strstart - 1])),
          n && Oe(e, !1),
          e.strstart++,
          e.lookahead--,
          e.strm.avail_out === 0)
        )
          return Ae;
      } else (e.match_available = 1), e.strstart++, e.lookahead--;
    }
    return (
      e.match_available &&
        ((n = at._tr_tally(e, 0, e.window[e.strstart - 1])),
        (e.match_available = 0)),
      (e.insert = e.strstart < ee - 1 ? e.strstart : ee - 1),
      t === ar
        ? (Oe(e, !0), e.strm.avail_out === 0 ? Ar : Yr)
        : e.last_lit && (Oe(e, !1), e.strm.avail_out === 0)
        ? Ae
        : Hn
    );
  }
  function wv(e, t) {
    for (var r, n, a, s, o = e.window; ; ) {
      if (e.lookahead <= sr) {
        if ((Sr(e), e.lookahead <= sr && t === Er)) return Ae;
        if (e.lookahead === 0) break;
      }
      if (
        ((e.match_length = 0),
        e.lookahead >= ee &&
          e.strstart > 0 &&
          ((a = e.strstart - 1),
          (n = o[a]),
          n === o[++a] && n === o[++a] && n === o[++a]))
      ) {
        s = e.strstart + sr;
        do;
        while (
          n === o[++a] &&
          n === o[++a] &&
          n === o[++a] &&
          n === o[++a] &&
          n === o[++a] &&
          n === o[++a] &&
          n === o[++a] &&
          n === o[++a] &&
          a < s
        );
        (e.match_length = sr - (s - a)),
          e.match_length > e.lookahead && (e.match_length = e.lookahead);
      }
      if (
        (e.match_length >= ee
          ? ((r = at._tr_tally(e, 1, e.match_length - ee)),
            (e.lookahead -= e.match_length),
            (e.strstart += e.match_length),
            (e.match_length = 0))
          : ((r = at._tr_tally(e, 0, e.window[e.strstart])),
            e.lookahead--,
            e.strstart++),
        r && (Oe(e, !1), e.strm.avail_out === 0))
      )
        return Ae;
    }
    return (
      (e.insert = 0),
      t === ar
        ? (Oe(e, !0), e.strm.avail_out === 0 ? Ar : Yr)
        : e.last_lit && (Oe(e, !1), e.strm.avail_out === 0)
        ? Ae
        : Hn
    );
  }
  function yv(e, t) {
    for (var r; ; ) {
      if (e.lookahead === 0 && (Sr(e), e.lookahead === 0)) {
        if (t === Er) return Ae;
        break;
      }
      if (
        ((e.match_length = 0),
        (r = at._tr_tally(e, 0, e.window[e.strstart])),
        e.lookahead--,
        e.strstart++,
        r && (Oe(e, !1), e.strm.avail_out === 0))
      )
        return Ae;
    }
    return (
      (e.insert = 0),
      t === ar
        ? (Oe(e, !0), e.strm.avail_out === 0 ? Ar : Yr)
        : e.last_lit && (Oe(e, !1), e.strm.avail_out === 0)
        ? Ae
        : Hn
    );
  }
  function Rt(e, t, r, n, a) {
    (this.good_length = e),
      (this.max_lazy = t),
      (this.nice_length = r),
      (this.max_chain = n),
      (this.func = a);
  }
  var Qr;
  Qr = [
    new Rt(0, 0, 0, 0, xv),
    new Rt(4, 4, 8, 4, eo),
    new Rt(4, 5, 16, 8, eo),
    new Rt(4, 6, 32, 32, eo),
    new Rt(4, 4, 16, 16, $r),
    new Rt(8, 16, 32, 32, $r),
    new Rt(8, 16, 128, 128, $r),
    new Rt(8, 32, 128, 256, $r),
    new Rt(32, 128, 258, 1024, $r),
    new Rt(32, 258, 258, 4096, $r),
  ];
  function _v(e) {
    (e.window_size = 2 * e.w_size),
      ur(e.head),
      (e.max_lazy_match = Qr[e.level].max_lazy),
      (e.good_match = Qr[e.level].good_length),
      (e.nice_match = Qr[e.level].nice_length),
      (e.max_chain_length = Qr[e.level].max_chain),
      (e.strstart = 0),
      (e.block_start = 0),
      (e.lookahead = 0),
      (e.insert = 0),
      (e.match_length = e.prev_length = ee - 1),
      (e.match_available = 0),
      (e.ins_h = 0);
  }
  function Ev() {
    (this.strm = null),
      (this.status = 0),
      (this.pending_buf = null),
      (this.pending_buf_size = 0),
      (this.pending_out = 0),
      (this.pending = 0),
      (this.wrap = 0),
      (this.gzhead = null),
      (this.gzindex = 0),
      (this.method = Hi),
      (this.last_flush = -1),
      (this.w_size = 0),
      (this.w_bits = 0),
      (this.w_mask = 0),
      (this.window = null),
      (this.window_size = 0),
      (this.prev = null),
      (this.head = null),
      (this.ins_h = 0),
      (this.hash_size = 0),
      (this.hash_bits = 0),
      (this.hash_mask = 0),
      (this.hash_shift = 0),
      (this.block_start = 0),
      (this.match_length = 0),
      (this.prev_match = 0),
      (this.match_available = 0),
      (this.strstart = 0),
      (this.match_start = 0),
      (this.lookahead = 0),
      (this.prev_length = 0),
      (this.max_chain_length = 0),
      (this.max_lazy_match = 0),
      (this.level = 0),
      (this.strategy = 0),
      (this.good_match = 0),
      (this.nice_match = 0),
      (this.dyn_ltree = new We.Buf16(pv * 2)),
      (this.dyn_dtree = new We.Buf16((2 * hv + 1) * 2)),
      (this.bl_tree = new We.Buf16((2 * cv + 1) * 2)),
      ur(this.dyn_ltree),
      ur(this.dyn_dtree),
      ur(this.bl_tree),
      (this.l_desc = null),
      (this.d_desc = null),
      (this.bl_desc = null),
      (this.bl_count = new We.Buf16(dv + 1)),
      (this.heap = new We.Buf16(2 * Qs + 1)),
      ur(this.heap),
      (this.heap_len = 0),
      (this.heap_max = 0),
      (this.depth = new We.Buf16(2 * Qs + 1)),
      ur(this.depth),
      (this.l_buf = 0),
      (this.lit_bufsize = 0),
      (this.last_lit = 0),
      (this.d_buf = 0),
      (this.opt_len = 0),
      (this.static_len = 0),
      (this.matches = 0),
      (this.insert = 0),
      (this.bi_buf = 0),
      (this.bi_valid = 0);
  }
  function hh(e) {
    var t;
    return !e || !e.state
      ? or(e, st)
      : ((e.total_in = e.total_out = 0),
        (e.data_type = av),
        (t = e.state),
        (t.pending = 0),
        (t.pending_out = 0),
        t.wrap < 0 && (t.wrap = -t.wrap),
        (t.status = t.wrap ? Vi : br),
        (e.adler = t.wrap === 2 ? 0 : 1),
        (t.last_flush = Er),
        at._tr_init(t),
        Tt);
  }
  function ch(e) {
    var t = hh(e);
    return t === Tt && _v(e.state), t;
  }
  function bv(e, t) {
    return !e || !e.state || e.state.wrap !== 2
      ? st
      : ((e.state.gzhead = t), Tt);
  }
  function ph(e, t, r, n, a, s) {
    if (!e) return st;
    var o = 1;
    if (
      (t === ev && (t = 6),
      n < 0 ? ((o = 0), (n = -n)) : n > 15 && ((o = 2), (n -= 16)),
      a < 1 ||
        a > sv ||
        r !== Hi ||
        n < 8 ||
        n > 15 ||
        t < 0 ||
        t > 9 ||
        s < 0 ||
        s > nv)
    )
      return or(e, st);
    n === 8 && (n = 9);
    var f = new Ev();
    return (
      (e.state = f),
      (f.strm = e),
      (f.wrap = o),
      (f.gzhead = null),
      (f.w_bits = n),
      (f.w_size = 1 << f.w_bits),
      (f.w_mask = f.w_size - 1),
      (f.hash_bits = a + 7),
      (f.hash_size = 1 << f.hash_bits),
      (f.hash_mask = f.hash_size - 1),
      (f.hash_shift = ~~((f.hash_bits + ee - 1) / ee)),
      (f.window = new We.Buf8(f.w_size * 2)),
      (f.head = new We.Buf16(f.hash_size)),
      (f.prev = new We.Buf16(f.w_size)),
      (f.lit_bufsize = 1 << (a + 6)),
      (f.pending_buf_size = f.lit_bufsize * 4),
      (f.pending_buf = new We.Buf8(f.pending_buf_size)),
      (f.d_buf = 1 * f.lit_bufsize),
      (f.l_buf = (1 + 2) * f.lit_bufsize),
      (f.level = t),
      (f.strategy = s),
      (f.method = r),
      ch(e)
    );
  }
  function Av(e, t) {
    return ph(e, t, Hi, ov, uv, iv);
  }
  function Sv(e, t) {
    var r, n, a, s;
    if (!e || !e.state || t > oh || t < 0) return e ? or(e, st) : st;
    if (
      ((n = e.state),
      !e.output ||
        (!e.input && e.avail_in !== 0) ||
        (n.status === jn && t !== ar))
    )
      return or(e, e.avail_out === 0 ? $s : st);
    if (((n.strm = e), (r = n.last_flush), (n.last_flush = t), n.status === Vi))
      if (n.wrap === 2)
        (e.adler = 0),
          ne(n, 31),
          ne(n, 139),
          ne(n, 8),
          n.gzhead
            ? (ne(
                n,
                (n.gzhead.text ? 1 : 0) +
                  (n.gzhead.hcrc ? 2 : 0) +
                  (n.gzhead.extra ? 4 : 0) +
                  (n.gzhead.name ? 8 : 0) +
                  (n.gzhead.comment ? 16 : 0)
              ),
              ne(n, n.gzhead.time & 255),
              ne(n, (n.gzhead.time >> 8) & 255),
              ne(n, (n.gzhead.time >> 16) & 255),
              ne(n, (n.gzhead.time >> 24) & 255),
              ne(
                n,
                n.level === 9 ? 2 : n.strategy >= ji || n.level < 2 ? 4 : 0
              ),
              ne(n, n.gzhead.os & 255),
              n.gzhead.extra &&
                n.gzhead.extra.length &&
                (ne(n, n.gzhead.extra.length & 255),
                ne(n, (n.gzhead.extra.length >> 8) & 255)),
              n.gzhead.hcrc &&
                (e.adler = ir(e.adler, n.pending_buf, n.pending, 0)),
              (n.gzindex = 0),
              (n.status = Js))
            : (ne(n, 0),
              ne(n, 0),
              ne(n, 0),
              ne(n, 0),
              ne(n, 0),
              ne(
                n,
                n.level === 9 ? 2 : n.strategy >= ji || n.level < 2 ? 4 : 0
              ),
              ne(n, mv),
              (n.status = br));
      else {
        var o = (Hi + ((n.w_bits - 8) << 4)) << 8,
          f = -1;
        n.strategy >= ji || n.level < 2
          ? (f = 0)
          : n.level < 6
          ? (f = 1)
          : n.level === 6
          ? (f = 2)
          : (f = 3),
          (o |= f << 6),
          n.strstart !== 0 && (o |= gv),
          (o += 31 - (o % 31)),
          (n.status = br),
          Vn(n, o),
          n.strstart !== 0 && (Vn(n, e.adler >>> 16), Vn(n, e.adler & 65535)),
          (e.adler = 1);
      }
    if (n.status === Js)
      if (n.gzhead.extra) {
        for (
          a = n.pending;
          n.gzindex < (n.gzhead.extra.length & 65535) &&
          !(
            n.pending === n.pending_buf_size &&
            (n.gzhead.hcrc &&
              n.pending > a &&
              (e.adler = ir(e.adler, n.pending_buf, n.pending - a, a)),
            fr(e),
            (a = n.pending),
            n.pending === n.pending_buf_size)
          );

        )
          ne(n, n.gzhead.extra[n.gzindex] & 255), n.gzindex++;
        n.gzhead.hcrc &&
          n.pending > a &&
          (e.adler = ir(e.adler, n.pending_buf, n.pending - a, a)),
          n.gzindex === n.gzhead.extra.length &&
            ((n.gzindex = 0), (n.status = Gi));
      } else n.status = Gi;
    if (n.status === Gi)
      if (n.gzhead.name) {
        a = n.pending;
        do {
          if (
            n.pending === n.pending_buf_size &&
            (n.gzhead.hcrc &&
              n.pending > a &&
              (e.adler = ir(e.adler, n.pending_buf, n.pending - a, a)),
            fr(e),
            (a = n.pending),
            n.pending === n.pending_buf_size)
          ) {
            s = 1;
            break;
          }
          n.gzindex < n.gzhead.name.length
            ? (s = n.gzhead.name.charCodeAt(n.gzindex++) & 255)
            : (s = 0),
            ne(n, s);
        } while (s !== 0);
        n.gzhead.hcrc &&
          n.pending > a &&
          (e.adler = ir(e.adler, n.pending_buf, n.pending - a, a)),
          s === 0 && ((n.gzindex = 0), (n.status = Zi));
      } else n.status = Zi;
    if (n.status === Zi)
      if (n.gzhead.comment) {
        a = n.pending;
        do {
          if (
            n.pending === n.pending_buf_size &&
            (n.gzhead.hcrc &&
              n.pending > a &&
              (e.adler = ir(e.adler, n.pending_buf, n.pending - a, a)),
            fr(e),
            (a = n.pending),
            n.pending === n.pending_buf_size)
          ) {
            s = 1;
            break;
          }
          n.gzindex < n.gzhead.comment.length
            ? (s = n.gzhead.comment.charCodeAt(n.gzindex++) & 255)
            : (s = 0),
            ne(n, s);
        } while (s !== 0);
        n.gzhead.hcrc &&
          n.pending > a &&
          (e.adler = ir(e.adler, n.pending_buf, n.pending - a, a)),
          s === 0 && (n.status = Xi);
      } else n.status = Xi;
    if (
      (n.status === Xi &&
        (n.gzhead.hcrc
          ? (n.pending + 2 > n.pending_buf_size && fr(e),
            n.pending + 2 <= n.pending_buf_size &&
              (ne(n, e.adler & 255),
              ne(n, (e.adler >> 8) & 255),
              (e.adler = 0),
              (n.status = br)))
          : (n.status = br)),
      n.pending !== 0)
    ) {
      if ((fr(e), e.avail_out === 0)) return (n.last_flush = -1), Tt;
    } else if (e.avail_in === 0 && fh(t) <= fh(r) && t !== ar) return or(e, $s);
    if (n.status === jn && e.avail_in !== 0) return or(e, $s);
    if (
      e.avail_in !== 0 ||
      n.lookahead !== 0 ||
      (t !== Er && n.status !== jn)
    ) {
      var h =
        n.strategy === ji
          ? yv(n, t)
          : n.strategy === rv
          ? wv(n, t)
          : Qr[n.level].func(n, t);
      if (((h === Ar || h === Yr) && (n.status = jn), h === Ae || h === Ar))
        return e.avail_out === 0 && (n.last_flush = -1), Tt;
      if (
        h === Hn &&
        (t === $m
          ? at._tr_align(n)
          : t !== oh &&
            (at._tr_stored_block(n, 0, 0, !1),
            t === Qm &&
              (ur(n.head),
              n.lookahead === 0 &&
                ((n.strstart = 0), (n.block_start = 0), (n.insert = 0)))),
        fr(e),
        e.avail_out === 0)
      )
        return (n.last_flush = -1), Tt;
    }
    return t !== ar
      ? Tt
      : n.wrap <= 0
      ? uh
      : (n.wrap === 2
          ? (ne(n, e.adler & 255),
            ne(n, (e.adler >> 8) & 255),
            ne(n, (e.adler >> 16) & 255),
            ne(n, (e.adler >> 24) & 255),
            ne(n, e.total_in & 255),
            ne(n, (e.total_in >> 8) & 255),
            ne(n, (e.total_in >> 16) & 255),
            ne(n, (e.total_in >> 24) & 255))
          : (Vn(n, e.adler >>> 16), Vn(n, e.adler & 65535)),
        fr(e),
        n.wrap > 0 && (n.wrap = -n.wrap),
        n.pending !== 0 ? Tt : uh);
  }
  function Tv(e) {
    var t;
    return !e || !e.state
      ? st
      : ((t = e.state.status),
        t !== Vi &&
        t !== Js &&
        t !== Gi &&
        t !== Zi &&
        t !== Xi &&
        t !== br &&
        t !== jn
          ? or(e, st)
          : ((e.state = null), t === br ? or(e, Jm) : Tt));
  }
  function Rv(e, t) {
    var r = t.length,
      n,
      a,
      s,
      o,
      f,
      h,
      l,
      c;
    if (
      !e ||
      !e.state ||
      ((n = e.state),
      (o = n.wrap),
      o === 2 || (o === 1 && n.status !== Vi) || n.lookahead)
    )
      return st;
    for (
      o === 1 && (e.adler = sh(e.adler, t, r, 0)),
        n.wrap = 0,
        r >= n.w_size &&
          (o === 0 &&
            (ur(n.head), (n.strstart = 0), (n.block_start = 0), (n.insert = 0)),
          (c = new We.Buf8(n.w_size)),
          We.arraySet(c, t, r - n.w_size, n.w_size, 0),
          (t = c),
          (r = n.w_size)),
        f = e.avail_in,
        h = e.next_in,
        l = e.input,
        e.avail_in = r,
        e.next_in = 0,
        e.input = t,
        Sr(n);
      n.lookahead >= ee;

    ) {
      (a = n.strstart), (s = n.lookahead - (ee - 1));
      do
        (n.ins_h =
          ((n.ins_h << n.hash_shift) ^ n.window[a + ee - 1]) & n.hash_mask),
          (n.prev[a & n.w_mask] = n.head[n.ins_h]),
          (n.head[n.ins_h] = a),
          a++;
      while (--s);
      (n.strstart = a), (n.lookahead = ee - 1), Sr(n);
    }
    return (
      (n.strstart += n.lookahead),
      (n.block_start = n.strstart),
      (n.insert = n.lookahead),
      (n.lookahead = 0),
      (n.match_length = n.prev_length = ee - 1),
      (n.match_available = 0),
      (e.next_in = h),
      (e.input = l),
      (e.avail_in = f),
      (n.wrap = o),
      Tt
    );
  }
  Ct.deflateInit = Av;
  Ct.deflateInit2 = ph;
  Ct.deflateReset = ch;
  Ct.deflateResetKeep = hh;
  Ct.deflateSetHeader = bv;
  Ct.deflate = Sv;
  Ct.deflateEnd = Tv;
  Ct.deflateSetDictionary = Rv;
  Ct.deflateInfo = "pako deflate (from Nodeca project)";
});
var to = A((Jr) => {
  "use strict";
  var Ki = Mt(),
    gh = !0,
    mh = !0;
  try {
    String.fromCharCode.apply(null, [0]);
  } catch {
    gh = !1;
  }
  try {
    String.fromCharCode.apply(null, new Uint8Array(1));
  } catch {
    mh = !1;
  }
  var Gn = new Ki.Buf8(256);
  for (Wt = 0; Wt < 256; Wt++)
    Gn[Wt] =
      Wt >= 252
        ? 6
        : Wt >= 248
        ? 5
        : Wt >= 240
        ? 4
        : Wt >= 224
        ? 3
        : Wt >= 192
        ? 2
        : 1;
  var Wt;
  Gn[254] = Gn[254] = 1;
  Jr.string2buf = function (e) {
    var t,
      r,
      n,
      a,
      s,
      o = e.length,
      f = 0;
    for (a = 0; a < o; a++)
      (r = e.charCodeAt(a)),
        (r & 64512) == 55296 &&
          a + 1 < o &&
          ((n = e.charCodeAt(a + 1)),
          (n & 64512) == 56320 &&
            ((r = 65536 + ((r - 55296) << 10) + (n - 56320)), a++)),
        (f += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4);
    for (t = new Ki.Buf8(f), s = 0, a = 0; s < f; a++)
      (r = e.charCodeAt(a)),
        (r & 64512) == 55296 &&
          a + 1 < o &&
          ((n = e.charCodeAt(a + 1)),
          (n & 64512) == 56320 &&
            ((r = 65536 + ((r - 55296) << 10) + (n - 56320)), a++)),
        r < 128
          ? (t[s++] = r)
          : r < 2048
          ? ((t[s++] = 192 | (r >>> 6)), (t[s++] = 128 | (r & 63)))
          : r < 65536
          ? ((t[s++] = 224 | (r >>> 12)),
            (t[s++] = 128 | ((r >>> 6) & 63)),
            (t[s++] = 128 | (r & 63)))
          : ((t[s++] = 240 | (r >>> 18)),
            (t[s++] = 128 | ((r >>> 12) & 63)),
            (t[s++] = 128 | ((r >>> 6) & 63)),
            (t[s++] = 128 | (r & 63)));
    return t;
  };
  function vh(e, t) {
    if (t < 65534 && ((e.subarray && mh) || (!e.subarray && gh)))
      return String.fromCharCode.apply(null, Ki.shrinkBuf(e, t));
    for (var r = "", n = 0; n < t; n++) r += String.fromCharCode(e[n]);
    return r;
  }
  Jr.buf2binstring = function (e) {
    return vh(e, e.length);
  };
  Jr.binstring2buf = function (e) {
    for (var t = new Ki.Buf8(e.length), r = 0, n = t.length; r < n; r++)
      t[r] = e.charCodeAt(r);
    return t;
  };
  Jr.buf2string = function (e, t) {
    var r,
      n,
      a,
      s,
      o = t || e.length,
      f = new Array(o * 2);
    for (n = 0, r = 0; r < o; ) {
      if (((a = e[r++]), a < 128)) {
        f[n++] = a;
        continue;
      }
      if (((s = Gn[a]), s > 4)) {
        (f[n++] = 65533), (r += s - 1);
        continue;
      }
      for (a &= s === 2 ? 31 : s === 3 ? 15 : 7; s > 1 && r < o; )
        (a = (a << 6) | (e[r++] & 63)), s--;
      if (s > 1) {
        f[n++] = 65533;
        continue;
      }
      a < 65536
        ? (f[n++] = a)
        : ((a -= 65536),
          (f[n++] = 55296 | ((a >> 10) & 1023)),
          (f[n++] = 56320 | (a & 1023)));
    }
    return vh(f, n);
  };
  Jr.utf8border = function (e, t) {
    var r;
    for (
      t = t || e.length, t > e.length && (t = e.length), r = t - 1;
      r >= 0 && (e[r] & 192) == 128;

    )
      r--;
    return r < 0 || r === 0 ? t : r + Gn[e[r]] > t ? r : t;
  };
});
var ro = A((N1, xh) => {
  "use strict";
  function Cv() {
    (this.input = null),
      (this.next_in = 0),
      (this.avail_in = 0),
      (this.total_in = 0),
      (this.output = null),
      (this.next_out = 0),
      (this.avail_out = 0),
      (this.total_out = 0),
      (this.msg = ""),
      (this.state = null),
      (this.data_type = 2),
      (this.adler = 0);
  }
  xh.exports = Cv;
});
var Eh = A((Kn) => {
  "use strict";
  var Zn = dh(),
    Xn = Mt(),
    no = to(),
    io = Wi(),
    Nv = ro(),
    wh = Object.prototype.toString,
    Iv = 0,
    ao = 4,
    en = 0,
    yh = 1,
    _h = 2,
    Dv = -1,
    Ov = 0,
    Pv = 8;
  function Tr(e) {
    if (!(this instanceof Tr)) return new Tr(e);
    this.options = Xn.assign(
      {
        level: Dv,
        method: Pv,
        chunkSize: 16384,
        windowBits: 15,
        memLevel: 8,
        strategy: Ov,
        to: "",
      },
      e || {}
    );
    var t = this.options;
    t.raw && t.windowBits > 0
      ? (t.windowBits = -t.windowBits)
      : t.gzip && t.windowBits > 0 && t.windowBits < 16 && (t.windowBits += 16),
      (this.err = 0),
      (this.msg = ""),
      (this.ended = !1),
      (this.chunks = []),
      (this.strm = new Nv()),
      (this.strm.avail_out = 0);
    var r = Zn.deflateInit2(
      this.strm,
      t.level,
      t.method,
      t.windowBits,
      t.memLevel,
      t.strategy
    );
    if (r !== en) throw new Error(io[r]);
    if ((t.header && Zn.deflateSetHeader(this.strm, t.header), t.dictionary)) {
      var n;
      if (
        (typeof t.dictionary == "string"
          ? (n = no.string2buf(t.dictionary))
          : wh.call(t.dictionary) === "[object ArrayBuffer]"
          ? (n = new Uint8Array(t.dictionary))
          : (n = t.dictionary),
        (r = Zn.deflateSetDictionary(this.strm, n)),
        r !== en)
      )
        throw new Error(io[r]);
      this._dict_set = !0;
    }
  }
  Tr.prototype.push = function (e, t) {
    var r = this.strm,
      n = this.options.chunkSize,
      a,
      s;
    if (this.ended) return !1;
    (s = t === ~~t ? t : t === !0 ? ao : Iv),
      typeof e == "string"
        ? (r.input = no.string2buf(e))
        : wh.call(e) === "[object ArrayBuffer]"
        ? (r.input = new Uint8Array(e))
        : (r.input = e),
      (r.next_in = 0),
      (r.avail_in = r.input.length);
    do {
      if (
        (r.avail_out === 0 &&
          ((r.output = new Xn.Buf8(n)), (r.next_out = 0), (r.avail_out = n)),
        (a = Zn.deflate(r, s)),
        a !== yh && a !== en)
      )
        return this.onEnd(a), (this.ended = !0), !1;
      (r.avail_out === 0 || (r.avail_in === 0 && (s === ao || s === _h))) &&
        (this.options.to === "string"
          ? this.onData(no.buf2binstring(Xn.shrinkBuf(r.output, r.next_out)))
          : this.onData(Xn.shrinkBuf(r.output, r.next_out)));
    } while ((r.avail_in > 0 || r.avail_out === 0) && a !== yh);
    return s === ao
      ? ((a = Zn.deflateEnd(this.strm)),
        this.onEnd(a),
        (this.ended = !0),
        a === en)
      : (s === _h && (this.onEnd(en), (r.avail_out = 0)), !0);
  };
  Tr.prototype.onData = function (e) {
    this.chunks.push(e);
  };
  Tr.prototype.onEnd = function (e) {
    e === en &&
      (this.options.to === "string"
        ? (this.result = this.chunks.join(""))
        : (this.result = Xn.flattenChunks(this.chunks))),
      (this.chunks = []),
      (this.err = e),
      (this.msg = this.strm.msg);
  };
  function so(e, t) {
    var r = new Tr(t);
    if ((r.push(e, !0), r.err)) throw r.msg || io[r.err];
    return r.result;
  }
  function kv(e, t) {
    return (t = t || {}), (t.raw = !0), so(e, t);
  }
  function Fv(e, t) {
    return (t = t || {}), (t.gzip = !0), so(e, t);
  }
  Kn.Deflate = Tr;
  Kn.deflate = so;
  Kn.deflateRaw = kv;
  Kn.gzip = Fv;
});
var Ah = A((D1, bh) => {
  "use strict";
  var Yi = 30,
    Bv = 12;
  bh.exports = function (t, r) {
    var n,
      a,
      s,
      o,
      f,
      h,
      l,
      c,
      m,
      v,
      x,
      p,
      _,
      E,
      b,
      W,
      U,
      S,
      T,
      H,
      j,
      q,
      V,
      G,
      D;
    (n = t.state),
      (a = t.next_in),
      (G = t.input),
      (s = a + (t.avail_in - 5)),
      (o = t.next_out),
      (D = t.output),
      (f = o - (r - t.avail_out)),
      (h = o + (t.avail_out - 257)),
      (l = n.dmax),
      (c = n.wsize),
      (m = n.whave),
      (v = n.wnext),
      (x = n.window),
      (p = n.hold),
      (_ = n.bits),
      (E = n.lencode),
      (b = n.distcode),
      (W = (1 << n.lenbits) - 1),
      (U = (1 << n.distbits) - 1);
    e: do {
      _ < 15 && ((p += G[a++] << _), (_ += 8), (p += G[a++] << _), (_ += 8)),
        (S = E[p & W]);
      t: for (;;) {
        if (
          ((T = S >>> 24),
          (p >>>= T),
          (_ -= T),
          (T = (S >>> 16) & 255),
          T === 0)
        )
          D[o++] = S & 65535;
        else if (T & 16) {
          (H = S & 65535),
            (T &= 15),
            T &&
              (_ < T && ((p += G[a++] << _), (_ += 8)),
              (H += p & ((1 << T) - 1)),
              (p >>>= T),
              (_ -= T)),
            _ < 15 &&
              ((p += G[a++] << _), (_ += 8), (p += G[a++] << _), (_ += 8)),
            (S = b[p & U]);
          r: for (;;) {
            if (
              ((T = S >>> 24),
              (p >>>= T),
              (_ -= T),
              (T = (S >>> 16) & 255),
              T & 16)
            ) {
              if (
                ((j = S & 65535),
                (T &= 15),
                _ < T &&
                  ((p += G[a++] << _),
                  (_ += 8),
                  _ < T && ((p += G[a++] << _), (_ += 8))),
                (j += p & ((1 << T) - 1)),
                j > l)
              ) {
                (t.msg = "invalid distance too far back"), (n.mode = Yi);
                break e;
              }
              if (((p >>>= T), (_ -= T), (T = o - f), j > T)) {
                if (((T = j - T), T > m && n.sane)) {
                  (t.msg = "invalid distance too far back"), (n.mode = Yi);
                  break e;
                }
                if (((q = 0), (V = x), v === 0)) {
                  if (((q += c - T), T < H)) {
                    H -= T;
                    do D[o++] = x[q++];
                    while (--T);
                    (q = o - j), (V = D);
                  }
                } else if (v < T) {
                  if (((q += c + v - T), (T -= v), T < H)) {
                    H -= T;
                    do D[o++] = x[q++];
                    while (--T);
                    if (((q = 0), v < H)) {
                      (T = v), (H -= T);
                      do D[o++] = x[q++];
                      while (--T);
                      (q = o - j), (V = D);
                    }
                  }
                } else if (((q += v - T), T < H)) {
                  H -= T;
                  do D[o++] = x[q++];
                  while (--T);
                  (q = o - j), (V = D);
                }
                for (; H > 2; )
                  (D[o++] = V[q++]),
                    (D[o++] = V[q++]),
                    (D[o++] = V[q++]),
                    (H -= 3);
                H && ((D[o++] = V[q++]), H > 1 && (D[o++] = V[q++]));
              } else {
                q = o - j;
                do
                  (D[o++] = D[q++]),
                    (D[o++] = D[q++]),
                    (D[o++] = D[q++]),
                    (H -= 3);
                while (H > 2);
                H && ((D[o++] = D[q++]), H > 1 && (D[o++] = D[q++]));
              }
            } else if ((T & 64) == 0) {
              S = b[(S & 65535) + (p & ((1 << T) - 1))];
              continue r;
            } else {
              (t.msg = "invalid distance code"), (n.mode = Yi);
              break e;
            }
            break;
          }
        } else if ((T & 64) == 0) {
          S = E[(S & 65535) + (p & ((1 << T) - 1))];
          continue t;
        } else if (T & 32) {
          n.mode = Bv;
          break e;
        } else {
          (t.msg = "invalid literal/length code"), (n.mode = Yi);
          break e;
        }
        break;
      }
    } while (a < s && o < h);
    (H = _ >> 3),
      (a -= H),
      (_ -= H << 3),
      (p &= (1 << _) - 1),
      (t.next_in = a),
      (t.next_out = o),
      (t.avail_in = a < s ? 5 + (s - a) : 5 - (a - s)),
      (t.avail_out = o < h ? 257 + (h - o) : 257 - (o - h)),
      (n.hold = p),
      (n.bits = _);
  };
});
var Dh = A((O1, Ih) => {
  "use strict";
  var Sh = Mt(),
    tn = 15,
    Th = 852,
    Rh = 592,
    Ch = 0,
    oo = 1,
    Nh = 2,
    Lv = [
      3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59,
      67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0,
    ],
    qv = [
      16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19,
      19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78,
    ],
    Uv = [
      1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513,
      769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0,
    ],
    Mv = [
      16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23,
      24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64,
    ];
  Ih.exports = function (t, r, n, a, s, o, f, h) {
    var l = h.bits,
      c = 0,
      m = 0,
      v = 0,
      x = 0,
      p = 0,
      _ = 0,
      E = 0,
      b = 0,
      W = 0,
      U = 0,
      S,
      T,
      H,
      j,
      q,
      V = null,
      G = 0,
      D,
      ue = new Sh.Buf16(tn + 1),
      Se = new Sh.Buf16(tn + 1),
      Te = null,
      qe = 0,
      re,
      oe,
      Ce;
    for (c = 0; c <= tn; c++) ue[c] = 0;
    for (m = 0; m < a; m++) ue[r[n + m]]++;
    for (p = l, x = tn; x >= 1 && ue[x] === 0; x--);
    if ((p > x && (p = x), x === 0))
      return (
        (s[o++] = (1 << 24) | (64 << 16) | 0),
        (s[o++] = (1 << 24) | (64 << 16) | 0),
        (h.bits = 1),
        0
      );
    for (v = 1; v < x && ue[v] === 0; v++);
    for (p < v && (p = v), b = 1, c = 1; c <= tn; c++)
      if (((b <<= 1), (b -= ue[c]), b < 0)) return -1;
    if (b > 0 && (t === Ch || x !== 1)) return -1;
    for (Se[1] = 0, c = 1; c < tn; c++) Se[c + 1] = Se[c] + ue[c];
    for (m = 0; m < a; m++) r[n + m] !== 0 && (f[Se[r[n + m]]++] = m);
    if (
      (t === Ch
        ? ((V = Te = f), (D = 19))
        : t === oo
        ? ((V = Lv), (G -= 257), (Te = qv), (qe -= 257), (D = 256))
        : ((V = Uv), (Te = Mv), (D = -1)),
      (U = 0),
      (m = 0),
      (c = v),
      (q = o),
      (_ = p),
      (E = 0),
      (H = -1),
      (W = 1 << p),
      (j = W - 1),
      (t === oo && W > Th) || (t === Nh && W > Rh))
    )
      return 1;
    for (;;) {
      (re = c - E),
        f[m] < D
          ? ((oe = 0), (Ce = f[m]))
          : f[m] > D
          ? ((oe = Te[qe + f[m]]), (Ce = V[G + f[m]]))
          : ((oe = 32 + 64), (Ce = 0)),
        (S = 1 << (c - E)),
        (T = 1 << _),
        (v = T);
      do (T -= S), (s[q + (U >> E) + T] = (re << 24) | (oe << 16) | Ce | 0);
      while (T !== 0);
      for (S = 1 << (c - 1); U & S; ) S >>= 1;
      if ((S !== 0 ? ((U &= S - 1), (U += S)) : (U = 0), m++, --ue[c] == 0)) {
        if (c === x) break;
        c = r[n + f[m]];
      }
      if (c > p && (U & j) !== H) {
        for (
          E === 0 && (E = p), q += v, _ = c - E, b = 1 << _;
          _ + E < x && ((b -= ue[_ + E]), !(b <= 0));

        )
          _++, (b <<= 1);
        if (((W += 1 << _), (t === oo && W > Th) || (t === Nh && W > Rh)))
          return 1;
        (H = U & j), (s[H] = (p << 24) | (_ << 16) | (q - o) | 0);
      }
    }
    return (
      U !== 0 && (s[q + U] = ((c - E) << 24) | (64 << 16) | 0), (h.bits = p), 0
    );
  };
});
var cc = A((dt) => {
  "use strict";
  var tt = Mt(),
    uo = Ks(),
    Nt = Ys(),
    zv = Ah(),
    Yn = Dh(),
    Wv = 0,
    Oh = 1,
    Ph = 2,
    kh = 4,
    jv = 5,
    $i = 6,
    Rr = 0,
    Hv = 1,
    Vv = 2,
    ot = -2,
    Fh = -3,
    fo = -4,
    Gv = -5,
    Bh = 8,
    Lh = 1,
    qh = 2,
    Uh = 3,
    Mh = 4,
    zh = 5,
    Wh = 6,
    jh = 7,
    Hh = 8,
    Vh = 9,
    Gh = 10,
    Qi = 11,
    jt = 12,
    lo = 13,
    Zh = 14,
    ho = 15,
    Xh = 16,
    Kh = 17,
    Yh = 18,
    $h = 19,
    Ji = 20,
    ea = 21,
    Qh = 22,
    Jh = 23,
    ec = 24,
    tc = 25,
    rc = 26,
    co = 27,
    nc = 28,
    ic = 29,
    de = 30,
    po = 31,
    Zv = 32,
    Xv = 852,
    Kv = 592,
    Yv = 15,
    $v = Yv;
  function ac(e) {
    return (
      ((e >>> 24) & 255) +
      ((e >>> 8) & 65280) +
      ((e & 65280) << 8) +
      ((e & 255) << 24)
    );
  }
  function Qv() {
    (this.mode = 0),
      (this.last = !1),
      (this.wrap = 0),
      (this.havedict = !1),
      (this.flags = 0),
      (this.dmax = 0),
      (this.check = 0),
      (this.total = 0),
      (this.head = null),
      (this.wbits = 0),
      (this.wsize = 0),
      (this.whave = 0),
      (this.wnext = 0),
      (this.window = null),
      (this.hold = 0),
      (this.bits = 0),
      (this.length = 0),
      (this.offset = 0),
      (this.extra = 0),
      (this.lencode = null),
      (this.distcode = null),
      (this.lenbits = 0),
      (this.distbits = 0),
      (this.ncode = 0),
      (this.nlen = 0),
      (this.ndist = 0),
      (this.have = 0),
      (this.next = null),
      (this.lens = new tt.Buf16(320)),
      (this.work = new tt.Buf16(288)),
      (this.lendyn = null),
      (this.distdyn = null),
      (this.sane = 0),
      (this.back = 0),
      (this.was = 0);
  }
  function sc(e) {
    var t;
    return !e || !e.state
      ? ot
      : ((t = e.state),
        (e.total_in = e.total_out = t.total = 0),
        (e.msg = ""),
        t.wrap && (e.adler = t.wrap & 1),
        (t.mode = Lh),
        (t.last = 0),
        (t.havedict = 0),
        (t.dmax = 32768),
        (t.head = null),
        (t.hold = 0),
        (t.bits = 0),
        (t.lencode = t.lendyn = new tt.Buf32(Xv)),
        (t.distcode = t.distdyn = new tt.Buf32(Kv)),
        (t.sane = 1),
        (t.back = -1),
        Rr);
  }
  function oc(e) {
    var t;
    return !e || !e.state
      ? ot
      : ((t = e.state), (t.wsize = 0), (t.whave = 0), (t.wnext = 0), sc(e));
  }
  function uc(e, t) {
    var r, n;
    return !e ||
      !e.state ||
      ((n = e.state),
      t < 0 ? ((r = 0), (t = -t)) : ((r = (t >> 4) + 1), t < 48 && (t &= 15)),
      t && (t < 8 || t > 15))
      ? ot
      : (n.window !== null && n.wbits !== t && (n.window = null),
        (n.wrap = r),
        (n.wbits = t),
        oc(e));
  }
  function fc(e, t) {
    var r, n;
    return e
      ? ((n = new Qv()),
        (e.state = n),
        (n.window = null),
        (r = uc(e, t)),
        r !== Rr && (e.state = null),
        r)
      : ot;
  }
  function Jv(e) {
    return fc(e, $v);
  }
  var lc = !0,
    go,
    mo;
  function ex(e) {
    if (lc) {
      var t;
      for (go = new tt.Buf32(512), mo = new tt.Buf32(32), t = 0; t < 144; )
        e.lens[t++] = 8;
      for (; t < 256; ) e.lens[t++] = 9;
      for (; t < 280; ) e.lens[t++] = 7;
      for (; t < 288; ) e.lens[t++] = 8;
      for (Yn(Oh, e.lens, 0, 288, go, 0, e.work, { bits: 9 }), t = 0; t < 32; )
        e.lens[t++] = 5;
      Yn(Ph, e.lens, 0, 32, mo, 0, e.work, { bits: 5 }), (lc = !1);
    }
    (e.lencode = go), (e.lenbits = 9), (e.distcode = mo), (e.distbits = 5);
  }
  function hc(e, t, r, n) {
    var a,
      s = e.state;
    return (
      s.window === null &&
        ((s.wsize = 1 << s.wbits),
        (s.wnext = 0),
        (s.whave = 0),
        (s.window = new tt.Buf8(s.wsize))),
      n >= s.wsize
        ? (tt.arraySet(s.window, t, r - s.wsize, s.wsize, 0),
          (s.wnext = 0),
          (s.whave = s.wsize))
        : ((a = s.wsize - s.wnext),
          a > n && (a = n),
          tt.arraySet(s.window, t, r - n, a, s.wnext),
          (n -= a),
          n
            ? (tt.arraySet(s.window, t, r - n, n, 0),
              (s.wnext = n),
              (s.whave = s.wsize))
            : ((s.wnext += a),
              s.wnext === s.wsize && (s.wnext = 0),
              s.whave < s.wsize && (s.whave += a))),
      0
    );
  }
  function tx(e, t) {
    var r,
      n,
      a,
      s,
      o,
      f,
      h,
      l,
      c,
      m,
      v,
      x,
      p,
      _,
      E = 0,
      b,
      W,
      U,
      S,
      T,
      H,
      j,
      q,
      V = new tt.Buf8(4),
      G,
      D,
      ue = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
    if (!e || !e.state || !e.output || (!e.input && e.avail_in !== 0))
      return ot;
    (r = e.state),
      r.mode === jt && (r.mode = lo),
      (o = e.next_out),
      (a = e.output),
      (h = e.avail_out),
      (s = e.next_in),
      (n = e.input),
      (f = e.avail_in),
      (l = r.hold),
      (c = r.bits),
      (m = f),
      (v = h),
      (q = Rr);
    e: for (;;)
      switch (r.mode) {
        case Lh:
          if (r.wrap === 0) {
            r.mode = lo;
            break;
          }
          for (; c < 16; ) {
            if (f === 0) break e;
            f--, (l += n[s++] << c), (c += 8);
          }
          if (r.wrap & 2 && l === 35615) {
            (r.check = 0),
              (V[0] = l & 255),
              (V[1] = (l >>> 8) & 255),
              (r.check = Nt(r.check, V, 2, 0)),
              (l = 0),
              (c = 0),
              (r.mode = qh);
            break;
          }
          if (
            ((r.flags = 0),
            r.head && (r.head.done = !1),
            !(r.wrap & 1) || (((l & 255) << 8) + (l >> 8)) % 31)
          ) {
            (e.msg = "incorrect header check"), (r.mode = de);
            break;
          }
          if ((l & 15) !== Bh) {
            (e.msg = "unknown compression method"), (r.mode = de);
            break;
          }
          if (((l >>>= 4), (c -= 4), (j = (l & 15) + 8), r.wbits === 0))
            r.wbits = j;
          else if (j > r.wbits) {
            (e.msg = "invalid window size"), (r.mode = de);
            break;
          }
          (r.dmax = 1 << j),
            (e.adler = r.check = 1),
            (r.mode = l & 512 ? Gh : jt),
            (l = 0),
            (c = 0);
          break;
        case qh:
          for (; c < 16; ) {
            if (f === 0) break e;
            f--, (l += n[s++] << c), (c += 8);
          }
          if (((r.flags = l), (r.flags & 255) !== Bh)) {
            (e.msg = "unknown compression method"), (r.mode = de);
            break;
          }
          if (r.flags & 57344) {
            (e.msg = "unknown header flags set"), (r.mode = de);
            break;
          }
          r.head && (r.head.text = (l >> 8) & 1),
            r.flags & 512 &&
              ((V[0] = l & 255),
              (V[1] = (l >>> 8) & 255),
              (r.check = Nt(r.check, V, 2, 0))),
            (l = 0),
            (c = 0),
            (r.mode = Uh);
        case Uh:
          for (; c < 32; ) {
            if (f === 0) break e;
            f--, (l += n[s++] << c), (c += 8);
          }
          r.head && (r.head.time = l),
            r.flags & 512 &&
              ((V[0] = l & 255),
              (V[1] = (l >>> 8) & 255),
              (V[2] = (l >>> 16) & 255),
              (V[3] = (l >>> 24) & 255),
              (r.check = Nt(r.check, V, 4, 0))),
            (l = 0),
            (c = 0),
            (r.mode = Mh);
        case Mh:
          for (; c < 16; ) {
            if (f === 0) break e;
            f--, (l += n[s++] << c), (c += 8);
          }
          r.head && ((r.head.xflags = l & 255), (r.head.os = l >> 8)),
            r.flags & 512 &&
              ((V[0] = l & 255),
              (V[1] = (l >>> 8) & 255),
              (r.check = Nt(r.check, V, 2, 0))),
            (l = 0),
            (c = 0),
            (r.mode = zh);
        case zh:
          if (r.flags & 1024) {
            for (; c < 16; ) {
              if (f === 0) break e;
              f--, (l += n[s++] << c), (c += 8);
            }
            (r.length = l),
              r.head && (r.head.extra_len = l),
              r.flags & 512 &&
                ((V[0] = l & 255),
                (V[1] = (l >>> 8) & 255),
                (r.check = Nt(r.check, V, 2, 0))),
              (l = 0),
              (c = 0);
          } else r.head && (r.head.extra = null);
          r.mode = Wh;
        case Wh:
          if (
            r.flags & 1024 &&
            ((x = r.length),
            x > f && (x = f),
            x &&
              (r.head &&
                ((j = r.head.extra_len - r.length),
                r.head.extra || (r.head.extra = new Array(r.head.extra_len)),
                tt.arraySet(r.head.extra, n, s, x, j)),
              r.flags & 512 && (r.check = Nt(r.check, n, x, s)),
              (f -= x),
              (s += x),
              (r.length -= x)),
            r.length)
          )
            break e;
          (r.length = 0), (r.mode = jh);
        case jh:
          if (r.flags & 2048) {
            if (f === 0) break e;
            x = 0;
            do
              (j = n[s + x++]),
                r.head &&
                  j &&
                  r.length < 65536 &&
                  (r.head.name += String.fromCharCode(j));
            while (j && x < f);
            if (
              (r.flags & 512 && (r.check = Nt(r.check, n, x, s)),
              (f -= x),
              (s += x),
              j)
            )
              break e;
          } else r.head && (r.head.name = null);
          (r.length = 0), (r.mode = Hh);
        case Hh:
          if (r.flags & 4096) {
            if (f === 0) break e;
            x = 0;
            do
              (j = n[s + x++]),
                r.head &&
                  j &&
                  r.length < 65536 &&
                  (r.head.comment += String.fromCharCode(j));
            while (j && x < f);
            if (
              (r.flags & 512 && (r.check = Nt(r.check, n, x, s)),
              (f -= x),
              (s += x),
              j)
            )
              break e;
          } else r.head && (r.head.comment = null);
          r.mode = Vh;
        case Vh:
          if (r.flags & 512) {
            for (; c < 16; ) {
              if (f === 0) break e;
              f--, (l += n[s++] << c), (c += 8);
            }
            if (l !== (r.check & 65535)) {
              (e.msg = "header crc mismatch"), (r.mode = de);
              break;
            }
            (l = 0), (c = 0);
          }
          r.head && ((r.head.hcrc = (r.flags >> 9) & 1), (r.head.done = !0)),
            (e.adler = r.check = 0),
            (r.mode = jt);
          break;
        case Gh:
          for (; c < 32; ) {
            if (f === 0) break e;
            f--, (l += n[s++] << c), (c += 8);
          }
          (e.adler = r.check = ac(l)), (l = 0), (c = 0), (r.mode = Qi);
        case Qi:
          if (r.havedict === 0)
            return (
              (e.next_out = o),
              (e.avail_out = h),
              (e.next_in = s),
              (e.avail_in = f),
              (r.hold = l),
              (r.bits = c),
              Vv
            );
          (e.adler = r.check = 1), (r.mode = jt);
        case jt:
          if (t === jv || t === $i) break e;
        case lo:
          if (r.last) {
            (l >>>= c & 7), (c -= c & 7), (r.mode = co);
            break;
          }
          for (; c < 3; ) {
            if (f === 0) break e;
            f--, (l += n[s++] << c), (c += 8);
          }
          switch (((r.last = l & 1), (l >>>= 1), (c -= 1), l & 3)) {
            case 0:
              r.mode = Zh;
              break;
            case 1:
              if ((ex(r), (r.mode = Ji), t === $i)) {
                (l >>>= 2), (c -= 2);
                break e;
              }
              break;
            case 2:
              r.mode = Kh;
              break;
            case 3:
              (e.msg = "invalid block type"), (r.mode = de);
          }
          (l >>>= 2), (c -= 2);
          break;
        case Zh:
          for (l >>>= c & 7, c -= c & 7; c < 32; ) {
            if (f === 0) break e;
            f--, (l += n[s++] << c), (c += 8);
          }
          if ((l & 65535) != ((l >>> 16) ^ 65535)) {
            (e.msg = "invalid stored block lengths"), (r.mode = de);
            break;
          }
          if (
            ((r.length = l & 65535), (l = 0), (c = 0), (r.mode = ho), t === $i)
          )
            break e;
        case ho:
          r.mode = Xh;
        case Xh:
          if (((x = r.length), x)) {
            if ((x > f && (x = f), x > h && (x = h), x === 0)) break e;
            tt.arraySet(a, n, s, x, o),
              (f -= x),
              (s += x),
              (h -= x),
              (o += x),
              (r.length -= x);
            break;
          }
          r.mode = jt;
          break;
        case Kh:
          for (; c < 14; ) {
            if (f === 0) break e;
            f--, (l += n[s++] << c), (c += 8);
          }
          if (
            ((r.nlen = (l & 31) + 257),
            (l >>>= 5),
            (c -= 5),
            (r.ndist = (l & 31) + 1),
            (l >>>= 5),
            (c -= 5),
            (r.ncode = (l & 15) + 4),
            (l >>>= 4),
            (c -= 4),
            r.nlen > 286 || r.ndist > 30)
          ) {
            (e.msg = "too many length or distance symbols"), (r.mode = de);
            break;
          }
          (r.have = 0), (r.mode = Yh);
        case Yh:
          for (; r.have < r.ncode; ) {
            for (; c < 3; ) {
              if (f === 0) break e;
              f--, (l += n[s++] << c), (c += 8);
            }
            (r.lens[ue[r.have++]] = l & 7), (l >>>= 3), (c -= 3);
          }
          for (; r.have < 19; ) r.lens[ue[r.have++]] = 0;
          if (
            ((r.lencode = r.lendyn),
            (r.lenbits = 7),
            (G = { bits: r.lenbits }),
            (q = Yn(Wv, r.lens, 0, 19, r.lencode, 0, r.work, G)),
            (r.lenbits = G.bits),
            q)
          ) {
            (e.msg = "invalid code lengths set"), (r.mode = de);
            break;
          }
          (r.have = 0), (r.mode = $h);
        case $h:
          for (; r.have < r.nlen + r.ndist; ) {
            for (
              ;
              (E = r.lencode[l & ((1 << r.lenbits) - 1)]),
                (b = E >>> 24),
                (W = (E >>> 16) & 255),
                (U = E & 65535),
                !(b <= c);

            ) {
              if (f === 0) break e;
              f--, (l += n[s++] << c), (c += 8);
            }
            if (U < 16) (l >>>= b), (c -= b), (r.lens[r.have++] = U);
            else {
              if (U === 16) {
                for (D = b + 2; c < D; ) {
                  if (f === 0) break e;
                  f--, (l += n[s++] << c), (c += 8);
                }
                if (((l >>>= b), (c -= b), r.have === 0)) {
                  (e.msg = "invalid bit length repeat"), (r.mode = de);
                  break;
                }
                (j = r.lens[r.have - 1]),
                  (x = 3 + (l & 3)),
                  (l >>>= 2),
                  (c -= 2);
              } else if (U === 17) {
                for (D = b + 3; c < D; ) {
                  if (f === 0) break e;
                  f--, (l += n[s++] << c), (c += 8);
                }
                (l >>>= b),
                  (c -= b),
                  (j = 0),
                  (x = 3 + (l & 7)),
                  (l >>>= 3),
                  (c -= 3);
              } else {
                for (D = b + 7; c < D; ) {
                  if (f === 0) break e;
                  f--, (l += n[s++] << c), (c += 8);
                }
                (l >>>= b),
                  (c -= b),
                  (j = 0),
                  (x = 11 + (l & 127)),
                  (l >>>= 7),
                  (c -= 7);
              }
              if (r.have + x > r.nlen + r.ndist) {
                (e.msg = "invalid bit length repeat"), (r.mode = de);
                break;
              }
              for (; x--; ) r.lens[r.have++] = j;
            }
          }
          if (r.mode === de) break;
          if (r.lens[256] === 0) {
            (e.msg = "invalid code -- missing end-of-block"), (r.mode = de);
            break;
          }
          if (
            ((r.lenbits = 9),
            (G = { bits: r.lenbits }),
            (q = Yn(Oh, r.lens, 0, r.nlen, r.lencode, 0, r.work, G)),
            (r.lenbits = G.bits),
            q)
          ) {
            (e.msg = "invalid literal/lengths set"), (r.mode = de);
            break;
          }
          if (
            ((r.distbits = 6),
            (r.distcode = r.distdyn),
            (G = { bits: r.distbits }),
            (q = Yn(Ph, r.lens, r.nlen, r.ndist, r.distcode, 0, r.work, G)),
            (r.distbits = G.bits),
            q)
          ) {
            (e.msg = "invalid distances set"), (r.mode = de);
            break;
          }
          if (((r.mode = Ji), t === $i)) break e;
        case Ji:
          r.mode = ea;
        case ea:
          if (f >= 6 && h >= 258) {
            (e.next_out = o),
              (e.avail_out = h),
              (e.next_in = s),
              (e.avail_in = f),
              (r.hold = l),
              (r.bits = c),
              zv(e, v),
              (o = e.next_out),
              (a = e.output),
              (h = e.avail_out),
              (s = e.next_in),
              (n = e.input),
              (f = e.avail_in),
              (l = r.hold),
              (c = r.bits),
              r.mode === jt && (r.back = -1);
            break;
          }
          for (
            r.back = 0;
            (E = r.lencode[l & ((1 << r.lenbits) - 1)]),
              (b = E >>> 24),
              (W = (E >>> 16) & 255),
              (U = E & 65535),
              !(b <= c);

          ) {
            if (f === 0) break e;
            f--, (l += n[s++] << c), (c += 8);
          }
          if (W && (W & 240) == 0) {
            for (
              S = b, T = W, H = U;
              (E = r.lencode[H + ((l & ((1 << (S + T)) - 1)) >> S)]),
                (b = E >>> 24),
                (W = (E >>> 16) & 255),
                (U = E & 65535),
                !(S + b <= c);

            ) {
              if (f === 0) break e;
              f--, (l += n[s++] << c), (c += 8);
            }
            (l >>>= S), (c -= S), (r.back += S);
          }
          if (((l >>>= b), (c -= b), (r.back += b), (r.length = U), W === 0)) {
            r.mode = rc;
            break;
          }
          if (W & 32) {
            (r.back = -1), (r.mode = jt);
            break;
          }
          if (W & 64) {
            (e.msg = "invalid literal/length code"), (r.mode = de);
            break;
          }
          (r.extra = W & 15), (r.mode = Qh);
        case Qh:
          if (r.extra) {
            for (D = r.extra; c < D; ) {
              if (f === 0) break e;
              f--, (l += n[s++] << c), (c += 8);
            }
            (r.length += l & ((1 << r.extra) - 1)),
              (l >>>= r.extra),
              (c -= r.extra),
              (r.back += r.extra);
          }
          (r.was = r.length), (r.mode = Jh);
        case Jh:
          for (
            ;
            (E = r.distcode[l & ((1 << r.distbits) - 1)]),
              (b = E >>> 24),
              (W = (E >>> 16) & 255),
              (U = E & 65535),
              !(b <= c);

          ) {
            if (f === 0) break e;
            f--, (l += n[s++] << c), (c += 8);
          }
          if ((W & 240) == 0) {
            for (
              S = b, T = W, H = U;
              (E = r.distcode[H + ((l & ((1 << (S + T)) - 1)) >> S)]),
                (b = E >>> 24),
                (W = (E >>> 16) & 255),
                (U = E & 65535),
                !(S + b <= c);

            ) {
              if (f === 0) break e;
              f--, (l += n[s++] << c), (c += 8);
            }
            (l >>>= S), (c -= S), (r.back += S);
          }
          if (((l >>>= b), (c -= b), (r.back += b), W & 64)) {
            (e.msg = "invalid distance code"), (r.mode = de);
            break;
          }
          (r.offset = U), (r.extra = W & 15), (r.mode = ec);
        case ec:
          if (r.extra) {
            for (D = r.extra; c < D; ) {
              if (f === 0) break e;
              f--, (l += n[s++] << c), (c += 8);
            }
            (r.offset += l & ((1 << r.extra) - 1)),
              (l >>>= r.extra),
              (c -= r.extra),
              (r.back += r.extra);
          }
          if (r.offset > r.dmax) {
            (e.msg = "invalid distance too far back"), (r.mode = de);
            break;
          }
          r.mode = tc;
        case tc:
          if (h === 0) break e;
          if (((x = v - h), r.offset > x)) {
            if (((x = r.offset - x), x > r.whave && r.sane)) {
              (e.msg = "invalid distance too far back"), (r.mode = de);
              break;
            }
            x > r.wnext
              ? ((x -= r.wnext), (p = r.wsize - x))
              : (p = r.wnext - x),
              x > r.length && (x = r.length),
              (_ = r.window);
          } else (_ = a), (p = o - r.offset), (x = r.length);
          x > h && (x = h), (h -= x), (r.length -= x);
          do a[o++] = _[p++];
          while (--x);
          r.length === 0 && (r.mode = ea);
          break;
        case rc:
          if (h === 0) break e;
          (a[o++] = r.length), h--, (r.mode = ea);
          break;
        case co:
          if (r.wrap) {
            for (; c < 32; ) {
              if (f === 0) break e;
              f--, (l |= n[s++] << c), (c += 8);
            }
            if (
              ((v -= h),
              (e.total_out += v),
              (r.total += v),
              v &&
                (e.adler = r.check =
                  r.flags
                    ? Nt(r.check, a, v, o - v)
                    : uo(r.check, a, v, o - v)),
              (v = h),
              (r.flags ? l : ac(l)) !== r.check)
            ) {
              (e.msg = "incorrect data check"), (r.mode = de);
              break;
            }
            (l = 0), (c = 0);
          }
          r.mode = nc;
        case nc:
          if (r.wrap && r.flags) {
            for (; c < 32; ) {
              if (f === 0) break e;
              f--, (l += n[s++] << c), (c += 8);
            }
            if (l !== (r.total & 4294967295)) {
              (e.msg = "incorrect length check"), (r.mode = de);
              break;
            }
            (l = 0), (c = 0);
          }
          r.mode = ic;
        case ic:
          q = Hv;
          break e;
        case de:
          q = Fh;
          break e;
        case po:
          return fo;
        case Zv:
        default:
          return ot;
      }
    return (
      (e.next_out = o),
      (e.avail_out = h),
      (e.next_in = s),
      (e.avail_in = f),
      (r.hold = l),
      (r.bits = c),
      (r.wsize ||
        (v !== e.avail_out && r.mode < de && (r.mode < co || t !== kh))) &&
      hc(e, e.output, e.next_out, v - e.avail_out)
        ? ((r.mode = po), fo)
        : ((m -= e.avail_in),
          (v -= e.avail_out),
          (e.total_in += m),
          (e.total_out += v),
          (r.total += v),
          r.wrap &&
            v &&
            (e.adler = r.check =
              r.flags
                ? Nt(r.check, a, v, e.next_out - v)
                : uo(r.check, a, v, e.next_out - v)),
          (e.data_type =
            r.bits +
            (r.last ? 64 : 0) +
            (r.mode === jt ? 128 : 0) +
            (r.mode === Ji || r.mode === ho ? 256 : 0)),
          ((m === 0 && v === 0) || t === kh) && q === Rr && (q = Gv),
          q)
    );
  }
  function rx(e) {
    if (!e || !e.state) return ot;
    var t = e.state;
    return t.window && (t.window = null), (e.state = null), Rr;
  }
  function nx(e, t) {
    var r;
    return !e || !e.state || ((r = e.state), (r.wrap & 2) == 0)
      ? ot
      : ((r.head = t), (t.done = !1), Rr);
  }
  function ix(e, t) {
    var r = t.length,
      n,
      a,
      s;
    return !e || !e.state || ((n = e.state), n.wrap !== 0 && n.mode !== Qi)
      ? ot
      : n.mode === Qi && ((a = 1), (a = uo(a, t, r, 0)), a !== n.check)
      ? Fh
      : ((s = hc(e, t, r, r)),
        s ? ((n.mode = po), fo) : ((n.havedict = 1), Rr));
  }
  dt.inflateReset = oc;
  dt.inflateReset2 = uc;
  dt.inflateResetKeep = sc;
  dt.inflateInit = Jv;
  dt.inflateInit2 = fc;
  dt.inflate = tx;
  dt.inflateEnd = rx;
  dt.inflateGetHeader = nx;
  dt.inflateSetDictionary = ix;
  dt.inflateInfo = "pako inflate (from Nodeca project)";
});
var vo = A((k1, pc) => {
  "use strict";
  pc.exports = {
    Z_NO_FLUSH: 0,
    Z_PARTIAL_FLUSH: 1,
    Z_SYNC_FLUSH: 2,
    Z_FULL_FLUSH: 3,
    Z_FINISH: 4,
    Z_BLOCK: 5,
    Z_TREES: 6,
    Z_OK: 0,
    Z_STREAM_END: 1,
    Z_NEED_DICT: 2,
    Z_ERRNO: -1,
    Z_STREAM_ERROR: -2,
    Z_DATA_ERROR: -3,
    Z_BUF_ERROR: -5,
    Z_NO_COMPRESSION: 0,
    Z_BEST_SPEED: 1,
    Z_BEST_COMPRESSION: 9,
    Z_DEFAULT_COMPRESSION: -1,
    Z_FILTERED: 1,
    Z_HUFFMAN_ONLY: 2,
    Z_RLE: 3,
    Z_FIXED: 4,
    Z_DEFAULT_STRATEGY: 0,
    Z_BINARY: 0,
    Z_TEXT: 1,
    Z_UNKNOWN: 2,
    Z_DEFLATED: 8,
  };
});
var gc = A((F1, dc) => {
  "use strict";
  function ax() {
    (this.text = 0),
      (this.time = 0),
      (this.xflags = 0),
      (this.os = 0),
      (this.extra = null),
      (this.extra_len = 0),
      (this.name = ""),
      (this.comment = ""),
      (this.hcrc = 0),
      (this.done = !1);
  }
  dc.exports = ax;
});
var vc = A((Qn) => {
  "use strict";
  var rn = cc(),
    $n = Mt(),
    ta = to(),
    ye = vo(),
    xo = Wi(),
    sx = ro(),
    ox = gc(),
    mc = Object.prototype.toString;
  function Cr(e) {
    if (!(this instanceof Cr)) return new Cr(e);
    this.options = $n.assign(
      { chunkSize: 16384, windowBits: 0, to: "" },
      e || {}
    );
    var t = this.options;
    t.raw &&
      t.windowBits >= 0 &&
      t.windowBits < 16 &&
      ((t.windowBits = -t.windowBits),
      t.windowBits === 0 && (t.windowBits = -15)),
      t.windowBits >= 0 &&
        t.windowBits < 16 &&
        !(e && e.windowBits) &&
        (t.windowBits += 32),
      t.windowBits > 15 &&
        t.windowBits < 48 &&
        (t.windowBits & 15) == 0 &&
        (t.windowBits |= 15),
      (this.err = 0),
      (this.msg = ""),
      (this.ended = !1),
      (this.chunks = []),
      (this.strm = new sx()),
      (this.strm.avail_out = 0);
    var r = rn.inflateInit2(this.strm, t.windowBits);
    if (r !== ye.Z_OK) throw new Error(xo[r]);
    if (
      ((this.header = new ox()),
      rn.inflateGetHeader(this.strm, this.header),
      t.dictionary &&
        (typeof t.dictionary == "string"
          ? (t.dictionary = ta.string2buf(t.dictionary))
          : mc.call(t.dictionary) === "[object ArrayBuffer]" &&
            (t.dictionary = new Uint8Array(t.dictionary)),
        t.raw &&
          ((r = rn.inflateSetDictionary(this.strm, t.dictionary)),
          r !== ye.Z_OK)))
    )
      throw new Error(xo[r]);
  }
  Cr.prototype.push = function (e, t) {
    var r = this.strm,
      n = this.options.chunkSize,
      a = this.options.dictionary,
      s,
      o,
      f,
      h,
      l,
      c = !1;
    if (this.ended) return !1;
    (o = t === ~~t ? t : t === !0 ? ye.Z_FINISH : ye.Z_NO_FLUSH),
      typeof e == "string"
        ? (r.input = ta.binstring2buf(e))
        : mc.call(e) === "[object ArrayBuffer]"
        ? (r.input = new Uint8Array(e))
        : (r.input = e),
      (r.next_in = 0),
      (r.avail_in = r.input.length);
    do {
      if (
        (r.avail_out === 0 &&
          ((r.output = new $n.Buf8(n)), (r.next_out = 0), (r.avail_out = n)),
        (s = rn.inflate(r, ye.Z_NO_FLUSH)),
        s === ye.Z_NEED_DICT &&
          a &&
          (s = rn.inflateSetDictionary(this.strm, a)),
        s === ye.Z_BUF_ERROR && c === !0 && ((s = ye.Z_OK), (c = !1)),
        s !== ye.Z_STREAM_END && s !== ye.Z_OK)
      )
        return this.onEnd(s), (this.ended = !0), !1;
      r.next_out &&
        (r.avail_out === 0 ||
          s === ye.Z_STREAM_END ||
          (r.avail_in === 0 && (o === ye.Z_FINISH || o === ye.Z_SYNC_FLUSH))) &&
        (this.options.to === "string"
          ? ((f = ta.utf8border(r.output, r.next_out)),
            (h = r.next_out - f),
            (l = ta.buf2string(r.output, f)),
            (r.next_out = h),
            (r.avail_out = n - h),
            h && $n.arraySet(r.output, r.output, f, h, 0),
            this.onData(l))
          : this.onData($n.shrinkBuf(r.output, r.next_out))),
        r.avail_in === 0 && r.avail_out === 0 && (c = !0);
    } while ((r.avail_in > 0 || r.avail_out === 0) && s !== ye.Z_STREAM_END);
    return (
      s === ye.Z_STREAM_END && (o = ye.Z_FINISH),
      o === ye.Z_FINISH
        ? ((s = rn.inflateEnd(this.strm)),
          this.onEnd(s),
          (this.ended = !0),
          s === ye.Z_OK)
        : (o === ye.Z_SYNC_FLUSH && (this.onEnd(ye.Z_OK), (r.avail_out = 0)),
          !0)
    );
  };
  Cr.prototype.onData = function (e) {
    this.chunks.push(e);
  };
  Cr.prototype.onEnd = function (e) {
    e === ye.Z_OK &&
      (this.options.to === "string"
        ? (this.result = this.chunks.join(""))
        : (this.result = $n.flattenChunks(this.chunks))),
      (this.chunks = []),
      (this.err = e),
      (this.msg = this.strm.msg);
  };
  function wo(e, t) {
    var r = new Cr(t);
    if ((r.push(e, !0), r.err)) throw r.msg || xo[r.err];
    return r.result;
  }
  function ux(e, t) {
    return (t = t || {}), (t.raw = !0), wo(e, t);
  }
  Qn.Inflate = Cr;
  Qn.inflate = wo;
  Qn.inflateRaw = ux;
  Qn.ungzip = wo;
});
var yc = A((L1, wc) => {
  "use strict";
  var fx = Mt().assign,
    lx = Eh(),
    hx = vc(),
    cx = vo(),
    xc = {};
  fx(xc, lx, hx, cx);
  wc.exports = xc;
});
var Ec = A((na) => {
  "use strict";
  var px =
      typeof Uint8Array != "undefined" &&
      typeof Uint16Array != "undefined" &&
      typeof Uint32Array != "undefined",
    dx = yc(),
    _c = ge(),
    ra = et(),
    gx = px ? "uint8array" : "array";
  na.magic = "\b\0";
  function Nr(e, t) {
    ra.call(this, "FlateWorker/" + e),
      (this._pako = null),
      (this._pakoAction = e),
      (this._pakoOptions = t),
      (this.meta = {});
  }
  _c.inherits(Nr, ra);
  Nr.prototype.processChunk = function (e) {
    (this.meta = e.meta),
      this._pako === null && this._createPako(),
      this._pako.push(_c.transformTo(gx, e.data), !1);
  };
  Nr.prototype.flush = function () {
    ra.prototype.flush.call(this),
      this._pako === null && this._createPako(),
      this._pako.push([], !0);
  };
  Nr.prototype.cleanUp = function () {
    ra.prototype.cleanUp.call(this), (this._pako = null);
  };
  Nr.prototype._createPako = function () {
    this._pako = new dx[this._pakoAction]({
      raw: !0,
      level: this._pakoOptions.level || -1,
    });
    var e = this;
    this._pako.onData = function (t) {
      e.push({ data: t, meta: e.meta });
    };
  };
  na.compressWorker = function (e) {
    return new Nr("Deflate", e);
  };
  na.uncompressWorker = function () {
    return new Nr("Inflate", {});
  };
});
var _o = A((yo) => {
  "use strict";
  var bc = et();
  yo.STORE = {
    magic: "\0\0",
    compressWorker: function (e) {
      return new bc("STORE compression");
    },
    uncompressWorker: function () {
      return new bc("STORE decompression");
    },
  };
  yo.DEFLATE = Ec();
});
var Eo = A((Ir) => {
  "use strict";
  Ir.LOCAL_FILE_HEADER = "PK";
  Ir.CENTRAL_FILE_HEADER = "PK";
  Ir.CENTRAL_DIRECTORY_END = "PK";
  Ir.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07";
  Ir.ZIP64_CENTRAL_DIRECTORY_END = "PK";
  Ir.DATA_DESCRIPTOR = "PK\x07\b";
});
var Rc = A((z1, Tc) => {
  "use strict";
  var nn = ge(),
    an = et(),
    bo = wr(),
    Ac = Li(),
    ia = Eo(),
    le = function (e, t) {
      var r = "",
        n;
      for (n = 0; n < t; n++)
        (r += String.fromCharCode(e & 255)), (e = e >>> 8);
      return r;
    },
    mx = function (e, t) {
      var r = e;
      return e || (r = t ? 16893 : 33204), (r & 65535) << 16;
    },
    vx = function (e, t) {
      return (e || 0) & 63;
    },
    Sc = function (e, t, r, n, a, s) {
      var o = e.file,
        f = e.compression,
        h = s !== bo.utf8encode,
        l = nn.transformTo("string", s(o.name)),
        c = nn.transformTo("string", bo.utf8encode(o.name)),
        m = o.comment,
        v = nn.transformTo("string", s(m)),
        x = nn.transformTo("string", bo.utf8encode(m)),
        p = c.length !== o.name.length,
        _ = x.length !== m.length,
        E,
        b,
        W = "",
        U = "",
        S = "",
        T = o.dir,
        H = o.date,
        j = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
      (!t || r) &&
        ((j.crc32 = e.crc32),
        (j.compressedSize = e.compressedSize),
        (j.uncompressedSize = e.uncompressedSize));
      var q = 0;
      t && (q |= 8), !h && (p || _) && (q |= 2048);
      var V = 0,
        G = 0;
      T && (V |= 16),
        a === "UNIX"
          ? ((G = 798), (V |= mx(o.unixPermissions, T)))
          : ((G = 20), (V |= vx(o.dosPermissions, T))),
        (E = H.getUTCHours()),
        (E = E << 6),
        (E = E | H.getUTCMinutes()),
        (E = E << 5),
        (E = E | (H.getUTCSeconds() / 2)),
        (b = H.getUTCFullYear() - 1980),
        (b = b << 4),
        (b = b | (H.getUTCMonth() + 1)),
        (b = b << 5),
        (b = b | H.getUTCDate()),
        p &&
          ((U = le(1, 1) + le(Ac(l), 4) + c),
          (W += "up" + le(U.length, 2) + U)),
        _ &&
          ((S = le(1, 1) + le(Ac(v), 4) + x),
          (W += "uc" + le(S.length, 2) + S));
      var D = "";
      (D += `
\0`),
        (D += le(q, 2)),
        (D += f.magic),
        (D += le(E, 2)),
        (D += le(b, 2)),
        (D += le(j.crc32, 4)),
        (D += le(j.compressedSize, 4)),
        (D += le(j.uncompressedSize, 4)),
        (D += le(l.length, 2)),
        (D += le(W.length, 2));
      var ue = ia.LOCAL_FILE_HEADER + D + l + W,
        Se =
          ia.CENTRAL_FILE_HEADER +
          le(G, 2) +
          D +
          le(v.length, 2) +
          "\0\0\0\0" +
          le(V, 4) +
          le(n, 4) +
          l +
          W +
          v;
      return { fileRecord: ue, dirRecord: Se };
    },
    xx = function (e, t, r, n, a) {
      var s = "",
        o = nn.transformTo("string", a(n));
      return (
        (s =
          ia.CENTRAL_DIRECTORY_END +
          "\0\0\0\0" +
          le(e, 2) +
          le(e, 2) +
          le(t, 4) +
          le(r, 4) +
          le(o.length, 2) +
          o),
        s
      );
    },
    wx = function (e) {
      var t = "";
      return (
        (t =
          ia.DATA_DESCRIPTOR +
          le(e.crc32, 4) +
          le(e.compressedSize, 4) +
          le(e.uncompressedSize, 4)),
        t
      );
    };
  function gt(e, t, r, n) {
    an.call(this, "ZipFileWorker"),
      (this.bytesWritten = 0),
      (this.zipComment = t),
      (this.zipPlatform = r),
      (this.encodeFileName = n),
      (this.streamFiles = e),
      (this.accumulate = !1),
      (this.contentBuffer = []),
      (this.dirRecords = []),
      (this.currentSourceOffset = 0),
      (this.entriesCount = 0),
      (this.currentFile = null),
      (this._sources = []);
  }
  nn.inherits(gt, an);
  gt.prototype.push = function (e) {
    var t = e.meta.percent || 0,
      r = this.entriesCount,
      n = this._sources.length;
    this.accumulate
      ? this.contentBuffer.push(e)
      : ((this.bytesWritten += e.data.length),
        an.prototype.push.call(this, {
          data: e.data,
          meta: {
            currentFile: this.currentFile,
            percent: r ? (t + 100 * (r - n - 1)) / r : 100,
          },
        }));
  };
  gt.prototype.openedSource = function (e) {
    (this.currentSourceOffset = this.bytesWritten),
      (this.currentFile = e.file.name);
    var t = this.streamFiles && !e.file.dir;
    if (t) {
      var r = Sc(
        e,
        t,
        !1,
        this.currentSourceOffset,
        this.zipPlatform,
        this.encodeFileName
      );
      this.push({ data: r.fileRecord, meta: { percent: 0 } });
    } else this.accumulate = !0;
  };
  gt.prototype.closedSource = function (e) {
    this.accumulate = !1;
    var t = this.streamFiles && !e.file.dir,
      r = Sc(
        e,
        t,
        !0,
        this.currentSourceOffset,
        this.zipPlatform,
        this.encodeFileName
      );
    if ((this.dirRecords.push(r.dirRecord), t))
      this.push({ data: wx(e), meta: { percent: 100 } });
    else
      for (
        this.push({ data: r.fileRecord, meta: { percent: 0 } });
        this.contentBuffer.length;

      )
        this.push(this.contentBuffer.shift());
    this.currentFile = null;
  };
  gt.prototype.flush = function () {
    for (var e = this.bytesWritten, t = 0; t < this.dirRecords.length; t++)
      this.push({ data: this.dirRecords[t], meta: { percent: 100 } });
    var r = this.bytesWritten - e,
      n = xx(
        this.dirRecords.length,
        r,
        e,
        this.zipComment,
        this.encodeFileName
      );
    this.push({ data: n, meta: { percent: 100 } });
  };
  gt.prototype.prepareNextSource = function () {
    (this.previous = this._sources.shift()),
      this.openedSource(this.previous.streamInfo),
      this.isPaused ? this.previous.pause() : this.previous.resume();
  };
  gt.prototype.registerPrevious = function (e) {
    this._sources.push(e);
    var t = this;
    return (
      e.on("data", function (r) {
        t.processChunk(r);
      }),
      e.on("end", function () {
        t.closedSource(t.previous.streamInfo),
          t._sources.length ? t.prepareNextSource() : t.end();
      }),
      e.on("error", function (r) {
        t.error(r);
      }),
      this
    );
  };
  gt.prototype.resume = function () {
    if (!an.prototype.resume.call(this)) return !1;
    if (!this.previous && this._sources.length)
      return this.prepareNextSource(), !0;
    if (!this.previous && !this._sources.length && !this.generatedError)
      return this.end(), !0;
  };
  gt.prototype.error = function (e) {
    var t = this._sources;
    if (!an.prototype.error.call(this, e)) return !1;
    for (var r = 0; r < t.length; r++)
      try {
        t[r].error(e);
      } catch {}
    return !0;
  };
  gt.prototype.lock = function () {
    an.prototype.lock.call(this);
    for (var e = this._sources, t = 0; t < e.length; t++) e[t].lock();
  };
  Tc.exports = gt;
});
var Nc = A((Cc) => {
  "use strict";
  var yx = _o(),
    _x = Rc(),
    Ex = function (e, t) {
      var r = e || t,
        n = yx[r];
      if (!n) throw new Error(r + " is not a valid compression method !");
      return n;
    };
  Cc.generateWorker = function (e, t, r) {
    var n = new _x(t.streamFiles, r, t.platform, t.encodeFileName),
      a = 0;
    try {
      e.forEach(function (s, o) {
        a++;
        var f = Ex(o.options.compression, t.compression),
          h = o.options.compressionOptions || t.compressionOptions || {},
          l = o.dir,
          c = o.date;
        o._compressWorker(f, h)
          .withStreamInfo("file", {
            name: s,
            dir: l,
            date: c,
            comment: o.comment || "",
            unixPermissions: o.unixPermissions,
            dosPermissions: o.dosPermissions,
          })
          .pipe(n);
      }),
        (n.entriesCount = a);
    } catch (s) {
      n.error(s);
    }
    return n;
  };
});
var Dc = A((j1, Ic) => {
  "use strict";
  var bx = ge(),
    aa = et();
  function Jn(e, t) {
    aa.call(this, "Nodejs stream input adapter for " + e),
      (this._upstreamEnded = !1),
      this._bindStream(t);
  }
  bx.inherits(Jn, aa);
  Jn.prototype._bindStream = function (e) {
    var t = this;
    (this._stream = e),
      e.pause(),
      e
        .on("data", function (r) {
          t.push({ data: r, meta: { percent: 0 } });
        })
        .on("error", function (r) {
          t.isPaused ? (this.generatedError = r) : t.error(r);
        })
        .on("end", function () {
          t.isPaused ? (t._upstreamEnded = !0) : t.end();
        });
  };
  Jn.prototype.pause = function () {
    return aa.prototype.pause.call(this) ? (this._stream.pause(), !0) : !1;
  };
  Jn.prototype.resume = function () {
    return aa.prototype.resume.call(this)
      ? (this._upstreamEnded ? this.end() : this._stream.resume(), !0)
      : !1;
  };
  Ic.exports = Jn;
});
var zc = A((H1, Mc) => {
  "use strict";
  var Ax = wr(),
    ei = ge(),
    Oc = et(),
    Sx = Rs(),
    Pc = Cs(),
    kc = qi(),
    Tx = Pl(),
    Rx = Nc(),
    Fc = Nn(),
    Cx = Dc(),
    Bc = function (e, t, r) {
      var n = ei.getTypeOf(t),
        a,
        s = ei.extend(r || {}, Pc);
      (s.date = s.date || new Date()),
        s.compression !== null && (s.compression = s.compression.toUpperCase()),
        typeof s.unixPermissions == "string" &&
          (s.unixPermissions = parseInt(s.unixPermissions, 8)),
        s.unixPermissions && s.unixPermissions & 16384 && (s.dir = !0),
        s.dosPermissions && s.dosPermissions & 16 && (s.dir = !0),
        s.dir && (e = Lc(e)),
        s.createFolders && (a = Nx(e)) && qc.call(this, a, !0);
      var o = n === "string" && s.binary === !1 && s.base64 === !1;
      (!r || typeof r.binary == "undefined") && (s.binary = !o);
      var f = t instanceof kc && t.uncompressedSize === 0;
      (f || s.dir || !t || t.length === 0) &&
        ((s.base64 = !1),
        (s.binary = !0),
        (t = ""),
        (s.compression = "STORE"),
        (n = "string"));
      var h = null;
      t instanceof kc || t instanceof Oc
        ? (h = t)
        : Fc.isNode && Fc.isStream(t)
        ? (h = new Cx(e, t))
        : (h = ei.prepareContent(
            e,
            t,
            s.binary,
            s.optimizedBinaryString,
            s.base64
          ));
      var l = new Tx(e, h, s);
      this.files[e] = l;
    },
    Nx = function (e) {
      e.slice(-1) === "/" && (e = e.substring(0, e.length - 1));
      var t = e.lastIndexOf("/");
      return t > 0 ? e.substring(0, t) : "";
    },
    Lc = function (e) {
      return e.slice(-1) !== "/" && (e += "/"), e;
    },
    qc = function (e, t) {
      return (
        (t = typeof t != "undefined" ? t : Pc.createFolders),
        (e = Lc(e)),
        this.files[e] || Bc.call(this, e, null, { dir: !0, createFolders: t }),
        this.files[e]
      );
    };
  function Uc(e) {
    return Object.prototype.toString.call(e) === "[object RegExp]";
  }
  var Ix = {
    load: function () {
      throw new Error(
        "This method has been removed in JSZip 3.0, please check the upgrade guide."
      );
    },
    forEach: function (e) {
      var t, r, n;
      for (t in this.files)
        !this.files.hasOwnProperty(t) ||
          ((n = this.files[t]),
          (r = t.slice(this.root.length, t.length)),
          r && t.slice(0, this.root.length) === this.root && e(r, n));
    },
    filter: function (e) {
      var t = [];
      return (
        this.forEach(function (r, n) {
          e(r, n) && t.push(n);
        }),
        t
      );
    },
    file: function (e, t, r) {
      if (arguments.length === 1)
        if (Uc(e)) {
          var n = e;
          return this.filter(function (s, o) {
            return !o.dir && n.test(s);
          });
        } else {
          var a = this.files[this.root + e];
          return a && !a.dir ? a : null;
        }
      else (e = this.root + e), Bc.call(this, e, t, r);
      return this;
    },
    folder: function (e) {
      if (!e) return this;
      if (Uc(e))
        return this.filter(function (a, s) {
          return s.dir && e.test(a);
        });
      var t = this.root + e,
        r = qc.call(this, t),
        n = this.clone();
      return (n.root = r.name), n;
    },
    remove: function (e) {
      e = this.root + e;
      var t = this.files[e];
      if (
        (t || (e.slice(-1) !== "/" && (e += "/"), (t = this.files[e])),
        t && !t.dir)
      )
        delete this.files[e];
      else
        for (
          var r = this.filter(function (a, s) {
              return s.name.slice(0, e.length) === e;
            }),
            n = 0;
          n < r.length;
          n++
        )
          delete this.files[r[n].name];
      return this;
    },
    generate: function (e) {
      throw new Error(
        "This method has been removed in JSZip 3.0, please check the upgrade guide."
      );
    },
    generateInternalStream: function (e) {
      var t,
        r = {};
      try {
        if (
          ((r = ei.extend(e || {}, {
            streamFiles: !1,
            compression: "STORE",
            compressionOptions: null,
            type: "",
            platform: "DOS",
            comment: null,
            mimeType: "application/zip",
            encodeFileName: Ax.utf8encode,
          })),
          (r.type = r.type.toLowerCase()),
          (r.compression = r.compression.toUpperCase()),
          r.type === "binarystring" && (r.type = "string"),
          !r.type)
        )
          throw new Error("No output type specified.");
        ei.checkSupport(r.type),
          (r.platform === "darwin" ||
            r.platform === "freebsd" ||
            r.platform === "linux" ||
            r.platform === "sunos") &&
            (r.platform = "UNIX"),
          r.platform === "win32" && (r.platform = "DOS");
        var n = r.comment || this.comment || "";
        t = Rx.generateWorker(this, r, n);
      } catch (a) {
        (t = new Oc("error")), t.error(a);
      }
      return new Sx(t, r.type || "string", r.mimeType);
    },
    generateAsync: function (e, t) {
      return this.generateInternalStream(e).accumulate(t);
    },
    generateNodeStream: function (e, t) {
      return (
        (e = e || {}),
        e.type || (e.type = "nodebuffer"),
        this.generateInternalStream(e).toNodejsStream(t)
      );
    },
  };
  Mc.exports = Ix;
});
var Ao = A((V1, jc) => {
  "use strict";
  var Dx = ge();
  function Wc(e) {
    (this.data = e),
      (this.length = e.length),
      (this.index = 0),
      (this.zero = 0);
  }
  Wc.prototype = {
    checkOffset: function (e) {
      this.checkIndex(this.index + e);
    },
    checkIndex: function (e) {
      if (this.length < this.zero + e || e < 0)
        throw new Error(
          "End of data reached (data length = " +
            this.length +
            ", asked index = " +
            e +
            "). Corrupted zip ?"
        );
    },
    setIndex: function (e) {
      this.checkIndex(e), (this.index = e);
    },
    skip: function (e) {
      this.setIndex(this.index + e);
    },
    byteAt: function (e) {},
    readInt: function (e) {
      var t = 0,
        r;
      for (this.checkOffset(e), r = this.index + e - 1; r >= this.index; r--)
        t = (t << 8) + this.byteAt(r);
      return (this.index += e), t;
    },
    readString: function (e) {
      return Dx.transformTo("string", this.readData(e));
    },
    readData: function (e) {},
    lastIndexOfSignature: function (e) {},
    readAndCheckSignature: function (e) {},
    readDate: function () {
      var e = this.readInt(4);
      return new Date(
        Date.UTC(
          ((e >> 25) & 127) + 1980,
          ((e >> 21) & 15) - 1,
          (e >> 16) & 31,
          (e >> 11) & 31,
          (e >> 5) & 63,
          (e & 31) << 1
        )
      );
    },
  };
  jc.exports = Wc;
});
var So = A((G1, Vc) => {
  "use strict";
  var Hc = Ao(),
    Ox = ge();
  function sn(e) {
    Hc.call(this, e);
    for (var t = 0; t < this.data.length; t++) e[t] = e[t] & 255;
  }
  Ox.inherits(sn, Hc);
  sn.prototype.byteAt = function (e) {
    return this.data[this.zero + e];
  };
  sn.prototype.lastIndexOfSignature = function (e) {
    for (
      var t = e.charCodeAt(0),
        r = e.charCodeAt(1),
        n = e.charCodeAt(2),
        a = e.charCodeAt(3),
        s = this.length - 4;
      s >= 0;
      --s
    )
      if (
        this.data[s] === t &&
        this.data[s + 1] === r &&
        this.data[s + 2] === n &&
        this.data[s + 3] === a
      )
        return s - this.zero;
    return -1;
  };
  sn.prototype.readAndCheckSignature = function (e) {
    var t = e.charCodeAt(0),
      r = e.charCodeAt(1),
      n = e.charCodeAt(2),
      a = e.charCodeAt(3),
      s = this.readData(4);
    return t === s[0] && r === s[1] && n === s[2] && a === s[3];
  };
  sn.prototype.readData = function (e) {
    if ((this.checkOffset(e), e === 0)) return [];
    var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
    return (this.index += e), t;
  };
  Vc.exports = sn;
});
var Xc = A((Z1, Zc) => {
  "use strict";
  var Gc = Ao(),
    Px = ge();
  function on(e) {
    Gc.call(this, e);
  }
  Px.inherits(on, Gc);
  on.prototype.byteAt = function (e) {
    return this.data.charCodeAt(this.zero + e);
  };
  on.prototype.lastIndexOfSignature = function (e) {
    return this.data.lastIndexOf(e) - this.zero;
  };
  on.prototype.readAndCheckSignature = function (e) {
    var t = this.readData(4);
    return e === t;
  };
  on.prototype.readData = function (e) {
    this.checkOffset(e);
    var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
    return (this.index += e), t;
  };
  Zc.exports = on;
});
var Ro = A((X1, Yc) => {
  "use strict";
  var Kc = So(),
    kx = ge();
  function To(e) {
    Kc.call(this, e);
  }
  kx.inherits(To, Kc);
  To.prototype.readData = function (e) {
    if ((this.checkOffset(e), e === 0)) return new Uint8Array(0);
    var t = this.data.subarray(
      this.zero + this.index,
      this.zero + this.index + e
    );
    return (this.index += e), t;
  };
  Yc.exports = To;
});
var Jc = A((K1, Qc) => {
  "use strict";
  var $c = Ro(),
    Fx = ge();
  function Co(e) {
    $c.call(this, e);
  }
  Fx.inherits(Co, $c);
  Co.prototype.readData = function (e) {
    this.checkOffset(e);
    var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
    return (this.index += e), t;
  };
  Qc.exports = Co;
});
var No = A((Y1, tp) => {
  "use strict";
  var sa = ge(),
    ep = qt(),
    Bx = So(),
    Lx = Xc(),
    qx = Jc(),
    Ux = Ro();
  tp.exports = function (e) {
    var t = sa.getTypeOf(e);
    return (
      sa.checkSupport(t),
      t === "string" && !ep.uint8array
        ? new Lx(e)
        : t === "nodebuffer"
        ? new qx(e)
        : ep.uint8array
        ? new Ux(sa.transformTo("uint8array", e))
        : new Bx(sa.transformTo("array", e))
    );
  };
});
var ap = A(($1, ip) => {
  "use strict";
  var Io = No(),
    lr = ge(),
    Mx = qi(),
    rp = Li(),
    oa = wr(),
    ua = _o(),
    zx = qt(),
    Wx = 0,
    jx = 3,
    Hx = function (e) {
      for (var t in ua)
        if (!!ua.hasOwnProperty(t) && ua[t].magic === e) return ua[t];
      return null;
    };
  function np(e, t) {
    (this.options = e), (this.loadOptions = t);
  }
  np.prototype = {
    isEncrypted: function () {
      return (this.bitFlag & 1) == 1;
    },
    useUTF8: function () {
      return (this.bitFlag & 2048) == 2048;
    },
    readLocalPart: function (e) {
      var t, r;
      if (
        (e.skip(22),
        (this.fileNameLength = e.readInt(2)),
        (r = e.readInt(2)),
        (this.fileName = e.readData(this.fileNameLength)),
        e.skip(r),
        this.compressedSize === -1 || this.uncompressedSize === -1)
      )
        throw new Error(
          "Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)"
        );
      if (((t = Hx(this.compressionMethod)), t === null))
        throw new Error(
          "Corrupted zip : compression " +
            lr.pretty(this.compressionMethod) +
            " unknown (inner file : " +
            lr.transformTo("string", this.fileName) +
            ")"
        );
      this.decompressed = new Mx(
        this.compressedSize,
        this.uncompressedSize,
        this.crc32,
        t,
        e.readData(this.compressedSize)
      );
    },
    readCentralPart: function (e) {
      (this.versionMadeBy = e.readInt(2)),
        e.skip(2),
        (this.bitFlag = e.readInt(2)),
        (this.compressionMethod = e.readString(2)),
        (this.date = e.readDate()),
        (this.crc32 = e.readInt(4)),
        (this.compressedSize = e.readInt(4)),
        (this.uncompressedSize = e.readInt(4));
      var t = e.readInt(2);
      if (
        ((this.extraFieldsLength = e.readInt(2)),
        (this.fileCommentLength = e.readInt(2)),
        (this.diskNumberStart = e.readInt(2)),
        (this.internalFileAttributes = e.readInt(2)),
        (this.externalFileAttributes = e.readInt(4)),
        (this.localHeaderOffset = e.readInt(4)),
        this.isEncrypted())
      )
        throw new Error("Encrypted zip are not supported");
      e.skip(t),
        this.readExtraFields(e),
        this.parseZIP64ExtraField(e),
        (this.fileComment = e.readData(this.fileCommentLength));
    },
    processAttributes: function () {
      (this.unixPermissions = null), (this.dosPermissions = null);
      var e = this.versionMadeBy >> 8;
      (this.dir = !!(this.externalFileAttributes & 16)),
        e === Wx && (this.dosPermissions = this.externalFileAttributes & 63),
        e === jx &&
          (this.unixPermissions = (this.externalFileAttributes >> 16) & 65535),
        !this.dir && this.fileNameStr.slice(-1) === "/" && (this.dir = !0);
    },
    parseZIP64ExtraField: function (e) {
      if (!!this.extraFields[1]) {
        var t = Io(this.extraFields[1].value);
        this.uncompressedSize === lr.MAX_VALUE_32BITS &&
          (this.uncompressedSize = t.readInt(8)),
          this.compressedSize === lr.MAX_VALUE_32BITS &&
            (this.compressedSize = t.readInt(8)),
          this.localHeaderOffset === lr.MAX_VALUE_32BITS &&
            (this.localHeaderOffset = t.readInt(8)),
          this.diskNumberStart === lr.MAX_VALUE_32BITS &&
            (this.diskNumberStart = t.readInt(4));
      }
    },
    readExtraFields: function (e) {
      var t = e.index + this.extraFieldsLength,
        r,
        n,
        a;
      for (this.extraFields || (this.extraFields = {}); e.index + 4 < t; )
        (r = e.readInt(2)),
          (n = e.readInt(2)),
          (a = e.readData(n)),
          (this.extraFields[r] = { id: r, length: n, value: a });
      e.setIndex(t);
    },
    handleUTF8: function () {
      var e = zx.uint8array ? "uint8array" : "array";
      if (this.useUTF8())
        (this.fileNameStr = oa.utf8decode(this.fileName)),
          (this.fileCommentStr = oa.utf8decode(this.fileComment));
      else {
        var t = this.findExtraFieldUnicodePath();
        if (t !== null) this.fileNameStr = t;
        else {
          var r = lr.transformTo(e, this.fileName);
          this.fileNameStr = this.loadOptions.decodeFileName(r);
        }
        var n = this.findExtraFieldUnicodeComment();
        if (n !== null) this.fileCommentStr = n;
        else {
          var a = lr.transformTo(e, this.fileComment);
          this.fileCommentStr = this.loadOptions.decodeFileName(a);
        }
      }
    },
    findExtraFieldUnicodePath: function () {
      var e = this.extraFields[28789];
      if (e) {
        var t = Io(e.value);
        return t.readInt(1) !== 1 || rp(this.fileName) !== t.readInt(4)
          ? null
          : oa.utf8decode(t.readData(e.length - 5));
      }
      return null;
    },
    findExtraFieldUnicodeComment: function () {
      var e = this.extraFields[25461];
      if (e) {
        var t = Io(e.value);
        return t.readInt(1) !== 1 || rp(this.fileComment) !== t.readInt(4)
          ? null
          : oa.utf8decode(t.readData(e.length - 5));
      }
      return null;
    },
  };
  ip.exports = np;
});
var up = A((J1, op) => {
  "use strict";
  var Vx = No(),
    Ht = ge(),
    mt = Eo(),
    Gx = ap(),
    Q1 = wr(),
    Zx = qt();
  function sp(e) {
    (this.files = []), (this.loadOptions = e);
  }
  sp.prototype = {
    checkSignature: function (e) {
      if (!this.reader.readAndCheckSignature(e)) {
        this.reader.index -= 4;
        var t = this.reader.readString(4);
        throw new Error(
          "Corrupted zip or bug: unexpected signature (" +
            Ht.pretty(t) +
            ", expected " +
            Ht.pretty(e) +
            ")"
        );
      }
    },
    isSignature: function (e, t) {
      var r = this.reader.index;
      this.reader.setIndex(e);
      var n = this.reader.readString(4),
        a = n === t;
      return this.reader.setIndex(r), a;
    },
    readBlockEndOfCentral: function () {
      (this.diskNumber = this.reader.readInt(2)),
        (this.diskWithCentralDirStart = this.reader.readInt(2)),
        (this.centralDirRecordsOnThisDisk = this.reader.readInt(2)),
        (this.centralDirRecords = this.reader.readInt(2)),
        (this.centralDirSize = this.reader.readInt(4)),
        (this.centralDirOffset = this.reader.readInt(4)),
        (this.zipCommentLength = this.reader.readInt(2));
      var e = this.reader.readData(this.zipCommentLength),
        t = Zx.uint8array ? "uint8array" : "array",
        r = Ht.transformTo(t, e);
      this.zipComment = this.loadOptions.decodeFileName(r);
    },
    readBlockZip64EndOfCentral: function () {
      (this.zip64EndOfCentralSize = this.reader.readInt(8)),
        this.reader.skip(4),
        (this.diskNumber = this.reader.readInt(4)),
        (this.diskWithCentralDirStart = this.reader.readInt(4)),
        (this.centralDirRecordsOnThisDisk = this.reader.readInt(8)),
        (this.centralDirRecords = this.reader.readInt(8)),
        (this.centralDirSize = this.reader.readInt(8)),
        (this.centralDirOffset = this.reader.readInt(8)),
        (this.zip64ExtensibleData = {});
      for (var e = this.zip64EndOfCentralSize - 44, t = 0, r, n, a; t < e; )
        (r = this.reader.readInt(2)),
          (n = this.reader.readInt(4)),
          (a = this.reader.readData(n)),
          (this.zip64ExtensibleData[r] = { id: r, length: n, value: a });
    },
    readBlockZip64EndOfCentralLocator: function () {
      if (
        ((this.diskWithZip64CentralDirStart = this.reader.readInt(4)),
        (this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8)),
        (this.disksCount = this.reader.readInt(4)),
        this.disksCount > 1)
      )
        throw new Error("Multi-volumes zip are not supported");
    },
    readLocalFiles: function () {
      var e, t;
      for (e = 0; e < this.files.length; e++)
        (t = this.files[e]),
          this.reader.setIndex(t.localHeaderOffset),
          this.checkSignature(mt.LOCAL_FILE_HEADER),
          t.readLocalPart(this.reader),
          t.handleUTF8(),
          t.processAttributes();
    },
    readCentralDir: function () {
      var e;
      for (
        this.reader.setIndex(this.centralDirOffset);
        this.reader.readAndCheckSignature(mt.CENTRAL_FILE_HEADER);

      )
        (e = new Gx({ zip64: this.zip64 }, this.loadOptions)),
          e.readCentralPart(this.reader),
          this.files.push(e);
      if (
        this.centralDirRecords !== this.files.length &&
        this.centralDirRecords !== 0 &&
        this.files.length === 0
      )
        throw new Error(
          "Corrupted zip or bug: expected " +
            this.centralDirRecords +
            " records in central dir, got " +
            this.files.length
        );
    },
    readEndOfCentral: function () {
      var e = this.reader.lastIndexOfSignature(mt.CENTRAL_DIRECTORY_END);
      if (e < 0) {
        var t = !this.isSignature(0, mt.LOCAL_FILE_HEADER);
        throw t
          ? new Error(
              "Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html"
            )
          : new Error("Corrupted zip: can't find end of central directory");
      }
      this.reader.setIndex(e);
      var r = e;
      if (
        (this.checkSignature(mt.CENTRAL_DIRECTORY_END),
        this.readBlockEndOfCentral(),
        this.diskNumber === Ht.MAX_VALUE_16BITS ||
          this.diskWithCentralDirStart === Ht.MAX_VALUE_16BITS ||
          this.centralDirRecordsOnThisDisk === Ht.MAX_VALUE_16BITS ||
          this.centralDirRecords === Ht.MAX_VALUE_16BITS ||
          this.centralDirSize === Ht.MAX_VALUE_32BITS ||
          this.centralDirOffset === Ht.MAX_VALUE_32BITS)
      ) {
        if (
          ((this.zip64 = !0),
          (e = this.reader.lastIndexOfSignature(
            mt.ZIP64_CENTRAL_DIRECTORY_LOCATOR
          )),
          e < 0)
        )
          throw new Error(
            "Corrupted zip: can't find the ZIP64 end of central directory locator"
          );
        if (
          (this.reader.setIndex(e),
          this.checkSignature(mt.ZIP64_CENTRAL_DIRECTORY_LOCATOR),
          this.readBlockZip64EndOfCentralLocator(),
          !this.isSignature(
            this.relativeOffsetEndOfZip64CentralDir,
            mt.ZIP64_CENTRAL_DIRECTORY_END
          ) &&
            ((this.relativeOffsetEndOfZip64CentralDir =
              this.reader.lastIndexOfSignature(mt.ZIP64_CENTRAL_DIRECTORY_END)),
            this.relativeOffsetEndOfZip64CentralDir < 0))
        )
          throw new Error(
            "Corrupted zip: can't find the ZIP64 end of central directory"
          );
        this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),
          this.checkSignature(mt.ZIP64_CENTRAL_DIRECTORY_END),
          this.readBlockZip64EndOfCentral();
      }
      var n = this.centralDirOffset + this.centralDirSize;
      this.zip64 && ((n += 20), (n += 12 + this.zip64EndOfCentralSize));
      var a = r - n;
      if (a > 0)
        this.isSignature(r, mt.CENTRAL_FILE_HEADER) || (this.reader.zero = a);
      else if (a < 0)
        throw new Error("Corrupted zip: missing " + Math.abs(a) + " bytes.");
    },
    prepareReader: function (e) {
      this.reader = Vx(e);
    },
    load: function (e) {
      this.prepareReader(e),
        this.readEndOfCentral(),
        this.readCentralDir(),
        this.readLocalFiles();
    },
  };
  op.exports = sp;
});
var cp = A((e_, hp) => {
  "use strict";
  var fp = ge(),
    fa = jr(),
    Xx = wr(),
    Kx = up(),
    Yx = Ds(),
    lp = Nn();
  function $x(e) {
    return new fa.Promise(function (t, r) {
      var n = e.decompressed.getContentWorker().pipe(new Yx());
      n.on("error", function (a) {
        r(a);
      })
        .on("end", function () {
          n.streamInfo.crc32 !== e.decompressed.crc32
            ? r(new Error("Corrupted zip : CRC32 mismatch"))
            : t();
        })
        .resume();
    });
  }
  hp.exports = function (e, t) {
    var r = this;
    return (
      (t = fp.extend(t || {}, {
        base64: !1,
        checkCRC32: !1,
        optimizedBinaryString: !1,
        createFolders: !1,
        decodeFileName: Xx.utf8decode,
      })),
      lp.isNode && lp.isStream(e)
        ? fa.Promise.reject(
            new Error("JSZip can't accept a stream when loading a zip file.")
          )
        : fp
            .prepareContent(
              "the loaded zip file",
              e,
              !0,
              t.optimizedBinaryString,
              t.base64
            )
            .then(function (n) {
              var a = new Kx(t);
              return a.load(n), a;
            })
            .then(function (a) {
              var s = [fa.Promise.resolve(a)],
                o = a.files;
              if (t.checkCRC32)
                for (var f = 0; f < o.length; f++) s.push($x(o[f]));
              return fa.Promise.all(s);
            })
            .then(function (a) {
              for (var s = a.shift(), o = s.files, f = 0; f < o.length; f++) {
                var h = o[f];
                r.file(h.fileNameStr, h.decompressed, {
                  binary: !0,
                  optimizedBinaryString: !0,
                  date: h.date,
                  dir: h.dir,
                  comment: h.fileCommentStr.length ? h.fileCommentStr : null,
                  unixPermissions: h.unixPermissions,
                  dosPermissions: h.dosPermissions,
                  createFolders: t.createFolders,
                });
              }
              return s.zipComment.length && (r.comment = s.zipComment), r;
            })
    );
  };
});
var dp = A((t_, pp) => {
  "use strict";
  function ut() {
    if (!(this instanceof ut)) return new ut();
    if (arguments.length)
      throw new Error(
        "The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide."
      );
    (this.files = {}),
      (this.comment = null),
      (this.root = ""),
      (this.clone = function () {
        var e = new ut();
        for (var t in this) typeof this[t] != "function" && (e[t] = this[t]);
        return e;
      });
  }
  ut.prototype = zc();
  ut.prototype.loadAsync = cp();
  ut.support = qt();
  ut.defaults = Cs();
  ut.version = "3.6.0";
  ut.loadAsync = function (e, t) {
    return new ut().loadAsync(e, t);
  };
  ut.external = jr();
  pp.exports = ut;
});
var ti = A((Do) => {
  var Qx = typeof Do == "undefined" ? {} : Do;
  (function (e) {
    "use strict";
    function t(i) {
      var u = Array.prototype.slice,
        d = i.length,
        w = function (g, O) {
          return function () {
            return O.apply(this, g.concat(u.call(arguments)));
          };
        },
        y = function () {
          var g = u.call(arguments);
          return g.length < d
            ? w(g, y)
            : i.apply(this, u.apply(arguments, [0, d]));
        };
      return y;
    }
    var r = t(function (i, u) {
        for (var d = 0; d < u.length; d += 1) i(u[d], d, u);
      }),
      n = t(function (i, u, d) {
        var w = u;
        return (
          r(function (y, g) {
            w = i(w, y, g);
          }, d),
          w
        );
      }),
      a = t(function (i, u) {
        var d = new Array(u.length);
        return (
          r(function (w, y) {
            d[y] = i(w);
          }, u),
          d
        );
      }),
      s = t(function (i, u) {
        var d = [];
        return (
          r(function (w, y) {
            i(w, y) && d.push(w);
          }, u),
          d
        );
      });
    function o() {
      if (arguments.length === 0)
        throw new Error("compose requires at least one argument");
      var i = Array.prototype.slice.call(arguments).reverse(),
        u = i[0],
        d = i.slice(1);
      return function () {
        return n(
          function (w, y) {
            return y(w);
          },
          u.apply(null, arguments),
          d
        );
      };
    }
    var f = t(function (i, u) {
      for (var d = 0; d < i.length; d += 1) if (i[d] === u) return !0;
      return !1;
    });
    function h(i) {
      return function () {
        return i;
      };
    }
    var l = t(function (i, u) {
      return u[i];
    });
    function c(i) {
      return i.toString();
    }
    var m = t(function (i, u) {
        return u.join(i);
      }),
      v = t(function (i, u, d) {
        return i + d + u;
      });
    function x(i) {
      for (var u = Object(i), d = 1; d < arguments.length; d++) {
        var w = arguments[d];
        if (w != null)
          for (var y in w)
            Object.prototype.hasOwnProperty.call(w, y) && (u[y] = w[y]);
      }
      return u;
    }
    (p.prototype = new Object()),
      (p.prototype.constructor = p),
      (p.superclass = Object.prototype);
    function p() {
      this.init();
    }
    (p.prototype.init = function () {
      (this.reduceActions = []),
        (this.reduceActions[3] = function (i) {
          return new T(i[0], i[2]);
        }),
        (this.reduceActions[5] = function (i) {
          return new H(i[0], i[2]);
        }),
        (this.reduceActions[7] = function (i) {
          return new j(i[0], i[2]);
        }),
        (this.reduceActions[8] = function (i) {
          return new q(i[0], i[2]);
        }),
        (this.reduceActions[10] = function (i) {
          return new V(i[0], i[2]);
        }),
        (this.reduceActions[11] = function (i) {
          return new G(i[0], i[2]);
        }),
        (this.reduceActions[12] = function (i) {
          return new D(i[0], i[2]);
        }),
        (this.reduceActions[13] = function (i) {
          return new ue(i[0], i[2]);
        }),
        (this.reduceActions[15] = function (i) {
          return new Se(i[0], i[2]);
        }),
        (this.reduceActions[16] = function (i) {
          return new Te(i[0], i[2]);
        }),
        (this.reduceActions[18] = function (i) {
          return new qe(i[0], i[2]);
        }),
        (this.reduceActions[19] = function (i) {
          return new re(i[0], i[2]);
        }),
        (this.reduceActions[20] = function (i) {
          return new oe(i[0], i[2]);
        }),
        (this.reduceActions[22] = function (i) {
          return new U(i[1]);
        }),
        (this.reduceActions[24] = function (i) {
          return new Ce(i[0], i[2]);
        }),
        (this.reduceActions[25] = function (i) {
          return new J(void 0, void 0, i[0]);
        }),
        (this.reduceActions[27] = function (i) {
          return (i[0].locationPath = i[2]), i[0];
        }),
        (this.reduceActions[28] = function (i) {
          return (
            (i[0].locationPath = i[2]),
            i[0].locationPath.steps.unshift(
              new C(C.DESCENDANTORSELF, N.nodeTest, [])
            ),
            i[0]
          );
        }),
        (this.reduceActions[29] = function (i) {
          return new J(i[0], [], void 0);
        }),
        (this.reduceActions[30] = function (i) {
          return k.instance_of(i[0], J)
            ? (i[0].filterPredicates == null && (i[0].filterPredicates = []),
              i[0].filterPredicates.push(i[1]),
              i[0])
            : new J(i[0], [i[1]], void 0);
        }),
        (this.reduceActions[32] = function (i) {
          return i[1];
        }),
        (this.reduceActions[33] = function (i) {
          return new B(i[0]);
        }),
        (this.reduceActions[34] = function (i) {
          return new L(i[0]);
        }),
        (this.reduceActions[36] = function (i) {
          return new Dt(i[0], []);
        }),
        (this.reduceActions[37] = function (i) {
          return new Dt(i[0], i[2]);
        }),
        (this.reduceActions[38] = function (i) {
          return [i[0]];
        }),
        (this.reduceActions[39] = function (i) {
          return i[2].unshift(i[0]), i[2];
        }),
        (this.reduceActions[43] = function (i) {
          return new Zt(!0, []);
        }),
        (this.reduceActions[44] = function (i) {
          return (i[1].absolute = !0), i[1];
        }),
        (this.reduceActions[46] = function (i) {
          return new Zt(!1, [i[0]]);
        }),
        (this.reduceActions[47] = function (i) {
          return i[0].steps.push(i[2]), i[0];
        }),
        (this.reduceActions[49] = function (i) {
          return new C(i[0], i[1], []);
        }),
        (this.reduceActions[50] = function (i) {
          return new C(C.CHILD, i[0], []);
        }),
        (this.reduceActions[51] = function (i) {
          return new C(i[0], i[1], i[2]);
        }),
        (this.reduceActions[52] = function (i) {
          return new C(C.CHILD, i[0], i[1]);
        }),
        (this.reduceActions[54] = function (i) {
          return [i[0]];
        }),
        (this.reduceActions[55] = function (i) {
          return i[1].unshift(i[0]), i[1];
        }),
        (this.reduceActions[56] = function (i) {
          return i[0] == "ancestor"
            ? C.ANCESTOR
            : i[0] == "ancestor-or-self"
            ? C.ANCESTORORSELF
            : i[0] == "attribute"
            ? C.ATTRIBUTE
            : i[0] == "child"
            ? C.CHILD
            : i[0] == "descendant"
            ? C.DESCENDANT
            : i[0] == "descendant-or-self"
            ? C.DESCENDANTORSELF
            : i[0] == "following"
            ? C.FOLLOWING
            : i[0] == "following-sibling"
            ? C.FOLLOWINGSIBLING
            : i[0] == "namespace"
            ? C.NAMESPACE
            : i[0] == "parent"
            ? C.PARENT
            : i[0] == "preceding"
            ? C.PRECEDING
            : i[0] == "preceding-sibling"
            ? C.PRECEDINGSIBLING
            : i[0] == "self"
            ? C.SELF
            : -1;
        }),
        (this.reduceActions[57] = function (i) {
          return C.ATTRIBUTE;
        }),
        (this.reduceActions[59] = function (i) {
          return i[0] == "comment"
            ? N.commentTest
            : i[0] == "text"
            ? N.textTest
            : i[0] == "processing-instruction"
            ? N.anyPiTest
            : i[0] == "node"
            ? N.nodeTest
            : new N(-1, void 0);
        }),
        (this.reduceActions[60] = function (i) {
          return new N.PITest(i[2]);
        }),
        (this.reduceActions[61] = function (i) {
          return i[1];
        }),
        (this.reduceActions[63] = function (i) {
          return (
            (i[1].absolute = !0),
            i[1].steps.unshift(new C(C.DESCENDANTORSELF, N.nodeTest, [])),
            i[1]
          );
        }),
        (this.reduceActions[64] = function (i) {
          return (
            i[0].steps.push(new C(C.DESCENDANTORSELF, N.nodeTest, [])),
            i[0].steps.push(i[2]),
            i[0]
          );
        }),
        (this.reduceActions[65] = function (i) {
          return new C(C.SELF, N.nodeTest, []);
        }),
        (this.reduceActions[66] = function (i) {
          return new C(C.PARENT, N.nodeTest, []);
        }),
        (this.reduceActions[67] = function (i) {
          return new Xt(i[1]);
        }),
        (this.reduceActions[68] = function (i) {
          return N.nameTestAny;
        }),
        (this.reduceActions[69] = function (i) {
          return new N.NameTestPrefixAny(i[0].split(":")[0]);
        }),
        (this.reduceActions[70] = function (i) {
          return new N.NameTestQName(i[0]);
        });
    }),
      (p.actionTable = [
        " s s        sssssssss    s ss  s  ss",
        "                 s                  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "                rrrrr               ",
        " s s        sssssssss    s ss  s  ss",
        "rs  rrrrrrrr s  sssssrrrrrr  rrs rs ",
        " s s        sssssssss    s ss  s  ss",
        "                            s       ",
        "                            s       ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "  s                                 ",
        "                            s       ",
        " s           s  sssss          s  s ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "a                                   ",
        "r       s                    rr  r  ",
        "r      sr                    rr  r  ",
        "r   s  rr            s       rr  r  ",
        "r   rssrr            rss     rr  r  ",
        "r   rrrrr            rrrss   rr  r  ",
        "r   rrrrrsss         rrrrr   rr  r  ",
        "r   rrrrrrrr         rrrrr   rr  r  ",
        "r   rrrrrrrr         rrrrrs  rr  r  ",
        "r   rrrrrrrr         rrrrrr  rr  r  ",
        "r   rrrrrrrr         rrrrrr  rr  r  ",
        "r  srrrrrrrr         rrrrrrs rr sr  ",
        "r  srrrrrrrr         rrrrrrs rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r   rrrrrrrr         rrrrrr  rr  r  ",
        "r   rrrrrrrr         rrrrrr  rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "                sssss               ",
        "r  rrrrrrrrr         rrrrrrr rr sr  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "                             s      ",
        "r  srrrrrrrr         rrrrrrs rr  r  ",
        "r   rrrrrrrr         rrrrr   rr  r  ",
        "              s                     ",
        "                             s      ",
        "                rrrrr               ",
        " s s        sssssssss    s sss s  ss",
        "r  srrrrrrrr         rrrrrrs rr  r  ",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss      ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s           s  sssss          s  s ",
        " s           s  sssss          s  s ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        " s           s  sssss          s  s ",
        " s           s  sssss          s  s ",
        "r  rrrrrrrrr         rrrrrrr rr sr  ",
        "r  rrrrrrrrr         rrrrrrr rr sr  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "                             s      ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "                             rr     ",
        "                             s      ",
        "                             rs     ",
        "r      sr                    rr  r  ",
        "r   s  rr            s       rr  r  ",
        "r   rssrr            rss     rr  r  ",
        "r   rssrr            rss     rr  r  ",
        "r   rrrrr            rrrss   rr  r  ",
        "r   rrrrr            rrrss   rr  r  ",
        "r   rrrrr            rrrss   rr  r  ",
        "r   rrrrr            rrrss   rr  r  ",
        "r   rrrrrsss         rrrrr   rr  r  ",
        "r   rrrrrsss         rrrrr   rr  r  ",
        "r   rrrrrrrr         rrrrr   rr  r  ",
        "r   rrrrrrrr         rrrrr   rr  r  ",
        "r   rrrrrrrr         rrrrr   rr  r  ",
        "r   rrrrrrrr         rrrrrr  rr  r  ",
        "                                 r  ",
        "                                 s  ",
        "r  srrrrrrrr         rrrrrrs rr  r  ",
        "r  srrrrrrrr         rrrrrrs rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        " s s        sssssssss    s ss  s  ss",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "                             r      ",
      ]),
      (p.actionTableNumber = [
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        "                 J                  ",
        "a  aaaaaaaaa         aaaaaaa aa  a  ",
        "                YYYYY               ",
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        `K1  KKKKKKKK .  +*)('KKKKKK  KK# K" `,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        "                            N       ",
        "                            O       ",
        "e  eeeeeeeee         eeeeeee ee ee  ",
        "f  fffffffff         fffffff ff ff  ",
        "d  ddddddddd         ddddddd dd dd  ",
        "B  BBBBBBBBB         BBBBBBB BB BB  ",
        "A  AAAAAAAAA         AAAAAAA AA AA  ",
        "  P                                 ",
        "                            Q       ",
        ` 1           .  +*)('          #  " `,
        "b  bbbbbbbbb         bbbbbbb bb  b  ",
        "                                    ",
        "!       S                    !!  !  ",
        '"      T"                    ""  "  ',
        "$   V  $$            U       $$  $  ",
        "&   &ZY&&            &XW     &&  &  ",
        ")   )))))            )))\\[   ))  )  ",
        ".   ....._^]         .....   ..  .  ",
        "1   11111111         11111   11  1  ",
        "5   55555555         55555`  55  5  ",
        "7   77777777         777777  77  7  ",
        "9   99999999         999999  99  9  ",
        ":  c::::::::         ::::::b :: a:  ",
        "I  fIIIIIIII         IIIIIIe II  I  ",
        "=  =========         ======= == ==  ",
        "?  ?????????         ??????? ?? ??  ",
        "C  CCCCCCCCC         CCCCCCC CC CC  ",
        "J   JJJJJJJJ         JJJJJJ  JJ  J  ",
        "M   MMMMMMMM         MMMMMM  MM  M  ",
        "N  NNNNNNNNN         NNNNNNN NN  N  ",
        "P  PPPPPPPPP         PPPPPPP PP  P  ",
        "                +*)('               ",
        "R  RRRRRRRRR         RRRRRRR RR aR  ",
        "U  UUUUUUUUU         UUUUUUU UU  U  ",
        "Z  ZZZZZZZZZ         ZZZZZZZ ZZ ZZ  ",
        "c  ccccccccc         ccccccc cc cc  ",
        "                             j      ",
        "L  fLLLLLLLL         LLLLLLe LL  L  ",
        "6   66666666         66666   66  6  ",
        "              k                     ",
        "                             l      ",
        "                XXXXX               ",
        ` 1 0        /.-,+*)('    & %$m #  "!`,
        "_  f________         ______e __  _  ",
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('      %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1           .  +*)('          #  " `,
        ` 1           .  +*)('          #  " `,
        ">  >>>>>>>>>         >>>>>>> >> >>  ",
        ` 1           .  +*)('          #  " `,
        ` 1           .  +*)('          #  " `,
        "Q  QQQQQQQQQ         QQQQQQQ QQ aQ  ",
        "V  VVVVVVVVV         VVVVVVV VV aV  ",
        "T  TTTTTTTTT         TTTTTTT TT  T  ",
        "@  @@@@@@@@@         @@@@@@@ @@ @@  ",
        "                             \x87      ",
        "[  [[[[[[[[[         [[[[[[[ [[ [[  ",
        "D  DDDDDDDDD         DDDDDDD DD DD  ",
        "                             HH     ",
        "                             \x88      ",
        "                             F\x89     ",
        "#      T#                    ##  #  ",
        "%   V  %%            U       %%  %  ",
        "'   'ZY''            'XW     ''  '  ",
        "(   (ZY((            (XW     ((  (  ",
        "+   +++++            +++\\[   ++  +  ",
        "*   *****            ***\\[   **  *  ",
        "-   -----            ---\\[   --  -  ",
        ",   ,,,,,            ,,,\\[   ,,  ,  ",
        "0   00000_^]         00000   00  0  ",
        "/   /////_^]         /////   //  /  ",
        "2   22222222         22222   22  2  ",
        "3   33333333         33333   33  3  ",
        "4   44444444         44444   44  4  ",
        "8   88888888         888888  88  8  ",
        "                                 ^  ",
        "                                 \x8A  ",
        ";  f;;;;;;;;         ;;;;;;e ;;  ;  ",
        "<  f<<<<<<<<         <<<<<<e <<  <  ",
        "O  OOOOOOOOO         OOOOOOO OO  O  ",
        "`  `````````         ``````` ``  `  ",
        "S  SSSSSSSSS         SSSSSSS SS  S  ",
        "W  WWWWWWWWW         WWWWWWW WW  W  ",
        "\\  \\\\\\\\\\\\\\\\\\         \\\\\\\\\\\\\\ \\\\ \\\\  ",
        "E  EEEEEEEEE         EEEEEEE EE EE  ",
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        "]  ]]]]]]]]]         ]]]]]]] ]] ]]  ",
        "                             G      ",
      ]),
      (p.gotoTable = [
        "3456789:;<=>?@ AB  CDEFGH IJ ",
        "                             ",
        "                             ",
        "                             ",
        "L456789:;<=>?@ AB  CDEFGH IJ ",
        "            M        EFGH IJ ",
        "       N;<=>?@ AB  CDEFGH IJ ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "            S        EFGH IJ ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "              e              ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                        h  J ",
        "              i          j   ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "o456789:;<=>?@ ABpqCDEFGH IJ ",
        "                             ",
        "  r6789:;<=>?@ AB  CDEFGH IJ ",
        "   s789:;<=>?@ AB  CDEFGH IJ ",
        "    t89:;<=>?@ AB  CDEFGH IJ ",
        "    u89:;<=>?@ AB  CDEFGH IJ ",
        "     v9:;<=>?@ AB  CDEFGH IJ ",
        "     w9:;<=>?@ AB  CDEFGH IJ ",
        "     x9:;<=>?@ AB  CDEFGH IJ ",
        "     y9:;<=>?@ AB  CDEFGH IJ ",
        "      z:;<=>?@ AB  CDEFGH IJ ",
        "      {:;<=>?@ AB  CDEFGH IJ ",
        "       |;<=>?@ AB  CDEFGH IJ ",
        "       };<=>?@ AB  CDEFGH IJ ",
        "       ~;<=>?@ AB  CDEFGH IJ ",
        "         \x7F=>?@ AB  CDEFGH IJ ",
        "\x80456789:;<=>?@ AB  CDEFGH IJ\x81",
        "            \x82        EFGH IJ ",
        "            \x83        EFGH IJ ",
        "                             ",
        "                     \x84 GH IJ ",
        "                     \x85 GH IJ ",
        "              i          \x86   ",
        "              i          \x87   ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "o456789:;<=>?@ AB\x8CqCDEFGH IJ ",
        "                             ",
        "                             ",
      ]),
      (p.productions = [
        [1, 1, 2],
        [2, 1, 3],
        [3, 1, 4],
        [3, 3, 3, -9, 4],
        [4, 1, 5],
        [4, 3, 4, -8, 5],
        [5, 1, 6],
        [5, 3, 5, -22, 6],
        [5, 3, 5, -5, 6],
        [6, 1, 7],
        [6, 3, 6, -23, 7],
        [6, 3, 6, -24, 7],
        [6, 3, 6, -6, 7],
        [6, 3, 6, -7, 7],
        [7, 1, 8],
        [7, 3, 7, -25, 8],
        [7, 3, 7, -26, 8],
        [8, 1, 9],
        [8, 3, 8, -12, 9],
        [8, 3, 8, -11, 9],
        [8, 3, 8, -10, 9],
        [9, 1, 10],
        [9, 2, -26, 9],
        [10, 1, 11],
        [10, 3, 10, -27, 11],
        [11, 1, 12],
        [11, 1, 13],
        [11, 3, 13, -28, 14],
        [11, 3, 13, -4, 14],
        [13, 1, 15],
        [13, 2, 13, 16],
        [15, 1, 17],
        [15, 3, -29, 2, -30],
        [15, 1, -15],
        [15, 1, -16],
        [15, 1, 18],
        [18, 3, -13, -29, -30],
        [18, 4, -13, -29, 19, -30],
        [19, 1, 20],
        [19, 3, 20, -31, 19],
        [20, 1, 2],
        [12, 1, 14],
        [12, 1, 21],
        [21, 1, -28],
        [21, 2, -28, 14],
        [21, 1, 22],
        [14, 1, 23],
        [14, 3, 14, -28, 23],
        [14, 1, 24],
        [23, 2, 25, 26],
        [23, 1, 26],
        [23, 3, 25, 26, 27],
        [23, 2, 26, 27],
        [23, 1, 28],
        [27, 1, 16],
        [27, 2, 16, 27],
        [25, 2, -14, -3],
        [25, 1, -32],
        [26, 1, 29],
        [26, 3, -20, -29, -30],
        [26, 4, -21, -29, -15, -30],
        [16, 3, -33, 30, -34],
        [30, 1, 2],
        [22, 2, -4, 14],
        [24, 3, 14, -4, 23],
        [28, 1, -35],
        [28, 1, -2],
        [17, 2, -36, -18],
        [29, 1, -17],
        [29, 1, -19],
        [29, 1, -18],
      ]),
      (p.DOUBLEDOT = 2),
      (p.DOUBLECOLON = 3),
      (p.DOUBLESLASH = 4),
      (p.NOTEQUAL = 5),
      (p.LESSTHANOREQUAL = 6),
      (p.GREATERTHANOREQUAL = 7),
      (p.AND = 8),
      (p.OR = 9),
      (p.MOD = 10),
      (p.DIV = 11),
      (p.MULTIPLYOPERATOR = 12),
      (p.FUNCTIONNAME = 13),
      (p.AXISNAME = 14),
      (p.LITERAL = 15),
      (p.NUMBER = 16),
      (p.ASTERISKNAMETEST = 17),
      (p.QNAME = 18),
      (p.NCNAMECOLONASTERISK = 19),
      (p.NODETYPE = 20),
      (p.PROCESSINGINSTRUCTIONWITHLITERAL = 21),
      (p.EQUALS = 22),
      (p.LESSTHAN = 23),
      (p.GREATERTHAN = 24),
      (p.PLUS = 25),
      (p.MINUS = 26),
      (p.BAR = 27),
      (p.SLASH = 28),
      (p.LEFTPARENTHESIS = 29),
      (p.RIGHTPARENTHESIS = 30),
      (p.COMMA = 31),
      (p.AT = 32),
      (p.LEFTBRACKET = 33),
      (p.RIGHTBRACKET = 34),
      (p.DOT = 35),
      (p.DOLLAR = 36),
      (p.prototype.tokenize = function (i) {
        for (var u = [], d = [], w = i + "\0", y = 0, g = w.charAt(y++); ; ) {
          for (
            ;
            g == " " ||
            g == "	" ||
            g == "\r" ||
            g ==
              `
`;

          )
            g = w.charAt(y++);
          if (g == "\0" || y >= w.length) break;
          if (g == "(") {
            u.push(p.LEFTPARENTHESIS), d.push(g), (g = w.charAt(y++));
            continue;
          }
          if (g == ")") {
            u.push(p.RIGHTPARENTHESIS), d.push(g), (g = w.charAt(y++));
            continue;
          }
          if (g == "[") {
            u.push(p.LEFTBRACKET), d.push(g), (g = w.charAt(y++));
            continue;
          }
          if (g == "]") {
            u.push(p.RIGHTBRACKET), d.push(g), (g = w.charAt(y++));
            continue;
          }
          if (g == "@") {
            u.push(p.AT), d.push(g), (g = w.charAt(y++));
            continue;
          }
          if (g == ",") {
            u.push(p.COMMA), d.push(g), (g = w.charAt(y++));
            continue;
          }
          if (g == "|") {
            u.push(p.BAR), d.push(g), (g = w.charAt(y++));
            continue;
          }
          if (g == "+") {
            u.push(p.PLUS), d.push(g), (g = w.charAt(y++));
            continue;
          }
          if (g == "-") {
            u.push(p.MINUS), d.push(g), (g = w.charAt(y++));
            continue;
          }
          if (g == "=") {
            u.push(p.EQUALS), d.push(g), (g = w.charAt(y++));
            continue;
          }
          if (g == "$") {
            u.push(p.DOLLAR), d.push(g), (g = w.charAt(y++));
            continue;
          }
          if (g == ".") {
            if (((g = w.charAt(y++)), g == ".")) {
              u.push(p.DOUBLEDOT), d.push(".."), (g = w.charAt(y++));
              continue;
            }
            if (g >= "0" && g <= "9") {
              var O = "." + g;
              for (g = w.charAt(y++); g >= "0" && g <= "9"; )
                (O += g), (g = w.charAt(y++));
              u.push(p.NUMBER), d.push(O);
              continue;
            }
            u.push(p.DOT), d.push(".");
            continue;
          }
          if (g == "'" || g == '"') {
            for (var K = g, Z = ""; y < w.length && (g = w.charAt(y)) !== K; )
              (Z += g), (y += 1);
            if (g !== K)
              throw _t.fromMessage("Unterminated string literal: " + K + Z);
            (y += 1), u.push(p.LITERAL), d.push(Z), (g = w.charAt(y++));
            continue;
          }
          if (g >= "0" && g <= "9") {
            var O = g;
            for (g = w.charAt(y++); g >= "0" && g <= "9"; )
              (O += g), (g = w.charAt(y++));
            if (g == "." && w.charAt(y) >= "0" && w.charAt(y) <= "9")
              for (
                O += g, O += w.charAt(y++), g = w.charAt(y++);
                g >= "0" && g <= "9";

              )
                (O += g), (g = w.charAt(y++));
            u.push(p.NUMBER), d.push(O);
            continue;
          }
          if (g == "*") {
            if (u.length > 0) {
              var P = u[u.length - 1];
              if (
                P != p.AT &&
                P != p.DOUBLECOLON &&
                P != p.LEFTPARENTHESIS &&
                P != p.LEFTBRACKET &&
                P != p.AND &&
                P != p.OR &&
                P != p.MOD &&
                P != p.DIV &&
                P != p.MULTIPLYOPERATOR &&
                P != p.SLASH &&
                P != p.DOUBLESLASH &&
                P != p.BAR &&
                P != p.PLUS &&
                P != p.MINUS &&
                P != p.EQUALS &&
                P != p.NOTEQUAL &&
                P != p.LESSTHAN &&
                P != p.LESSTHANOREQUAL &&
                P != p.GREATERTHAN &&
                P != p.GREATERTHANOREQUAL
              ) {
                u.push(p.MULTIPLYOPERATOR), d.push(g), (g = w.charAt(y++));
                continue;
              }
            }
            u.push(p.ASTERISKNAMETEST), d.push(g), (g = w.charAt(y++));
            continue;
          }
          if (g == ":" && w.charAt(y) == ":") {
            u.push(p.DOUBLECOLON), d.push("::"), y++, (g = w.charAt(y++));
            continue;
          }
          if (g == "/") {
            if (((g = w.charAt(y++)), g == "/")) {
              u.push(p.DOUBLESLASH), d.push("//"), (g = w.charAt(y++));
              continue;
            }
            u.push(p.SLASH), d.push("/");
            continue;
          }
          if (g == "!" && w.charAt(y) == "=") {
            u.push(p.NOTEQUAL), d.push("!="), y++, (g = w.charAt(y++));
            continue;
          }
          if (g == "<") {
            if (w.charAt(y) == "=") {
              u.push(p.LESSTHANOREQUAL), d.push("<="), y++, (g = w.charAt(y++));
              continue;
            }
            u.push(p.LESSTHAN), d.push("<"), (g = w.charAt(y++));
            continue;
          }
          if (g == ">") {
            if (w.charAt(y) == "=") {
              u.push(p.GREATERTHANOREQUAL),
                d.push(">="),
                y++,
                (g = w.charAt(y++));
              continue;
            }
            u.push(p.GREATERTHAN), d.push(">"), (g = w.charAt(y++));
            continue;
          }
          if (g == "_" || k.isLetter(g.charCodeAt(0))) {
            var $ = g;
            for (g = w.charAt(y++); k.isNCNameChar(g.charCodeAt(0)); )
              ($ += g), (g = w.charAt(y++));
            if (u.length > 0) {
              var P = u[u.length - 1];
              if (
                P != p.AT &&
                P != p.DOUBLECOLON &&
                P != p.LEFTPARENTHESIS &&
                P != p.LEFTBRACKET &&
                P != p.AND &&
                P != p.OR &&
                P != p.MOD &&
                P != p.DIV &&
                P != p.MULTIPLYOPERATOR &&
                P != p.SLASH &&
                P != p.DOUBLESLASH &&
                P != p.BAR &&
                P != p.PLUS &&
                P != p.MINUS &&
                P != p.EQUALS &&
                P != p.NOTEQUAL &&
                P != p.LESSTHAN &&
                P != p.LESSTHANOREQUAL &&
                P != p.GREATERTHAN &&
                P != p.GREATERTHANOREQUAL
              ) {
                if ($ == "and") {
                  u.push(p.AND), d.push($);
                  continue;
                }
                if ($ == "or") {
                  u.push(p.OR), d.push($);
                  continue;
                }
                if ($ == "mod") {
                  u.push(p.MOD), d.push($);
                  continue;
                }
                if ($ == "div") {
                  u.push(p.DIV), d.push($);
                  continue;
                }
              }
            }
            if (g == ":") {
              if (w.charAt(y) == "*") {
                u.push(p.NCNAMECOLONASTERISK),
                  d.push($ + ":*"),
                  y++,
                  (g = w.charAt(y++));
                continue;
              }
              if (w.charAt(y) == "_" || k.isLetter(w.charCodeAt(y))) {
                for (
                  $ += ":", g = w.charAt(y++);
                  k.isNCNameChar(g.charCodeAt(0));

                )
                  ($ += g), (g = w.charAt(y++));
                if (g == "(") {
                  u.push(p.FUNCTIONNAME), d.push($);
                  continue;
                }
                u.push(p.QNAME), d.push($);
                continue;
              }
              if (w.charAt(y) == ":") {
                u.push(p.AXISNAME), d.push($);
                continue;
              }
            }
            if (g == "(") {
              if ($ == "comment" || $ == "text" || $ == "node") {
                u.push(p.NODETYPE), d.push($);
                continue;
              }
              if ($ == "processing-instruction") {
                w.charAt(y) == ")"
                  ? u.push(p.NODETYPE)
                  : u.push(p.PROCESSINGINSTRUCTIONWITHLITERAL),
                  d.push($);
                continue;
              }
              u.push(p.FUNCTIONNAME), d.push($);
              continue;
            }
            u.push(p.QNAME), d.push($);
            continue;
          }
          throw new Error("Unexpected character " + g);
        }
        return u.push(1), d.push("[EOF]"), [u, d];
      }),
      (p.SHIFT = "s"),
      (p.REDUCE = "r"),
      (p.ACCEPT = "a"),
      (p.prototype.parse = function (i) {
        var u,
          d,
          w = this.tokenize(i);
        if (w != null) {
          (u = w[0]), (d = w[1]);
          var y = 0,
            g = [],
            O = [],
            K = [],
            i,
            Z,
            P;
          for (g.push(0), O.push(1), K.push("_S"), Z = u[y], P = d[y++]; ; )
            switch (((i = g[g.length - 1]), p.actionTable[i].charAt(Z - 1))) {
              case p.SHIFT:
                O.push(-Z),
                  K.push(P),
                  g.push(p.actionTableNumber[i].charCodeAt(Z - 1) - 32),
                  (Z = u[y]),
                  (P = d[y++]);
                break;
              case p.REDUCE:
                for (
                  var $ =
                      p.productions[
                        p.actionTableNumber[i].charCodeAt(Z - 1) - 32
                      ][1],
                    Ne = [],
                    nt = 0;
                  nt < $;
                  nt++
                )
                  O.pop(), Ne.unshift(K.pop()), g.pop();
                var Et = g[g.length - 1];
                O.push(
                  p.productions[
                    p.actionTableNumber[i].charCodeAt(Z - 1) - 32
                  ][0]
                ),
                  this.reduceActions[
                    p.actionTableNumber[i].charCodeAt(Z - 1) - 32
                  ] == null
                    ? K.push(Ne[0])
                    : K.push(
                        this.reduceActions[
                          p.actionTableNumber[i].charCodeAt(Z - 1) - 32
                        ](Ne)
                      ),
                  g.push(
                    p.gotoTable[Et].charCodeAt(
                      p.productions[
                        p.actionTableNumber[i].charCodeAt(Z - 1) - 32
                      ][0] - 2
                    ) - 33
                  );
                break;
              case p.ACCEPT:
                return new _(K.pop());
              default:
                throw new Error("XPath parse error");
            }
        }
      }),
      (_.prototype = new Object()),
      (_.prototype.constructor = _),
      (_.superclass = Object.prototype);
    function _(i) {
      this.expression = i;
    }
    _.prototype.toString = function () {
      return this.expression.toString();
    };
    function E(i, u, d) {
      u in i || (i[u] = d);
    }
    (_.prototype.evaluate = function (i) {
      return (
        (i.contextNode = i.expressionContextNode),
        (i.contextSize = 1),
        (i.contextPosition = 1),
        i.isHtml &&
          (E(i, "caseInsensitive", !0),
          E(i, "allowAnyNamespaceForNoPrefix", !0)),
        E(i, "caseInsensitive", !1),
        this.expression.evaluate(i)
      );
    }),
      (_.XML_NAMESPACE_URI = "http://www.w3.org/XML/1998/namespace"),
      (_.XMLNS_NAMESPACE_URI = "http://www.w3.org/2000/xmlns/"),
      (b.prototype = new Object()),
      (b.prototype.constructor = b),
      (b.superclass = Object.prototype);
    function b() {}
    (b.prototype.init = function () {}),
      (b.prototype.toString = function () {
        return "<Expression>";
      }),
      (b.prototype.evaluate = function (i) {
        throw new Error("Could not evaluate expression.");
      }),
      (W.prototype = new b()),
      (W.prototype.constructor = W),
      (W.superclass = b.prototype);
    function W(i) {
      arguments.length > 0 && this.init(i);
    }
    (W.prototype.init = function (i) {
      this.rhs = i;
    }),
      (U.prototype = new W()),
      (U.prototype.constructor = U),
      (U.superclass = W.prototype);
    function U(i) {
      arguments.length > 0 && this.init(i);
    }
    (U.prototype.init = function (i) {
      U.superclass.init.call(this, i);
    }),
      (U.prototype.evaluate = function (i) {
        return this.rhs.evaluate(i).number().negate();
      }),
      (U.prototype.toString = function () {
        return "-" + this.rhs.toString();
      }),
      (S.prototype = new b()),
      (S.prototype.constructor = S),
      (S.superclass = b.prototype);
    function S(i, u) {
      arguments.length > 0 && this.init(i, u);
    }
    (S.prototype.init = function (i, u) {
      (this.lhs = i), (this.rhs = u);
    }),
      (T.prototype = new S()),
      (T.prototype.constructor = T),
      (T.superclass = S.prototype);
    function T(i, u) {
      arguments.length > 0 && this.init(i, u);
    }
    (T.prototype.init = function (i, u) {
      T.superclass.init.call(this, i, u);
    }),
      (T.prototype.toString = function () {
        return "(" + this.lhs.toString() + " or " + this.rhs.toString() + ")";
      }),
      (T.prototype.evaluate = function (i) {
        var u = this.lhs.evaluate(i).bool();
        return u.booleanValue() ? u : this.rhs.evaluate(i).bool();
      }),
      (H.prototype = new S()),
      (H.prototype.constructor = H),
      (H.superclass = S.prototype);
    function H(i, u) {
      arguments.length > 0 && this.init(i, u);
    }
    (H.prototype.init = function (i, u) {
      H.superclass.init.call(this, i, u);
    }),
      (H.prototype.toString = function () {
        return "(" + this.lhs.toString() + " and " + this.rhs.toString() + ")";
      }),
      (H.prototype.evaluate = function (i) {
        var u = this.lhs.evaluate(i).bool();
        return u.booleanValue() ? this.rhs.evaluate(i).bool() : u;
      }),
      (j.prototype = new S()),
      (j.prototype.constructor = j),
      (j.superclass = S.prototype);
    function j(i, u) {
      arguments.length > 0 && this.init(i, u);
    }
    (j.prototype.init = function (i, u) {
      j.superclass.init.call(this, i, u);
    }),
      (j.prototype.toString = function () {
        return "(" + this.lhs.toString() + " = " + this.rhs.toString() + ")";
      }),
      (j.prototype.evaluate = function (i) {
        return this.lhs.evaluate(i).equals(this.rhs.evaluate(i));
      }),
      (q.prototype = new S()),
      (q.prototype.constructor = q),
      (q.superclass = S.prototype);
    function q(i, u) {
      arguments.length > 0 && this.init(i, u);
    }
    (q.prototype.init = function (i, u) {
      q.superclass.init.call(this, i, u);
    }),
      (q.prototype.toString = function () {
        return "(" + this.lhs.toString() + " != " + this.rhs.toString() + ")";
      }),
      (q.prototype.evaluate = function (i) {
        return this.lhs.evaluate(i).notequal(this.rhs.evaluate(i));
      }),
      (V.prototype = new S()),
      (V.prototype.constructor = V),
      (V.superclass = S.prototype);
    function V(i, u) {
      arguments.length > 0 && this.init(i, u);
    }
    (V.prototype.init = function (i, u) {
      V.superclass.init.call(this, i, u);
    }),
      (V.prototype.evaluate = function (i) {
        return this.lhs.evaluate(i).lessthan(this.rhs.evaluate(i));
      }),
      (V.prototype.toString = function () {
        return "(" + this.lhs.toString() + " < " + this.rhs.toString() + ")";
      }),
      (G.prototype = new S()),
      (G.prototype.constructor = G),
      (G.superclass = S.prototype);
    function G(i, u) {
      arguments.length > 0 && this.init(i, u);
    }
    (G.prototype.init = function (i, u) {
      G.superclass.init.call(this, i, u);
    }),
      (G.prototype.evaluate = function (i) {
        return this.lhs.evaluate(i).greaterthan(this.rhs.evaluate(i));
      }),
      (G.prototype.toString = function () {
        return "(" + this.lhs.toString() + " > " + this.rhs.toString() + ")";
      }),
      (D.prototype = new S()),
      (D.prototype.constructor = D),
      (D.superclass = S.prototype);
    function D(i, u) {
      arguments.length > 0 && this.init(i, u);
    }
    (D.prototype.init = function (i, u) {
      D.superclass.init.call(this, i, u);
    }),
      (D.prototype.evaluate = function (i) {
        return this.lhs.evaluate(i).lessthanorequal(this.rhs.evaluate(i));
      }),
      (D.prototype.toString = function () {
        return "(" + this.lhs.toString() + " <= " + this.rhs.toString() + ")";
      }),
      (ue.prototype = new S()),
      (ue.prototype.constructor = ue),
      (ue.superclass = S.prototype);
    function ue(i, u) {
      arguments.length > 0 && this.init(i, u);
    }
    (ue.prototype.init = function (i, u) {
      ue.superclass.init.call(this, i, u);
    }),
      (ue.prototype.evaluate = function (i) {
        return this.lhs.evaluate(i).greaterthanorequal(this.rhs.evaluate(i));
      }),
      (ue.prototype.toString = function () {
        return "(" + this.lhs.toString() + " >= " + this.rhs.toString() + ")";
      }),
      (Se.prototype = new S()),
      (Se.prototype.constructor = Se),
      (Se.superclass = S.prototype);
    function Se(i, u) {
      arguments.length > 0 && this.init(i, u);
    }
    (Se.prototype.init = function (i, u) {
      Se.superclass.init.call(this, i, u);
    }),
      (Se.prototype.evaluate = function (i) {
        return this.lhs
          .evaluate(i)
          .number()
          .plus(this.rhs.evaluate(i).number());
      }),
      (Se.prototype.toString = function () {
        return "(" + this.lhs.toString() + " + " + this.rhs.toString() + ")";
      }),
      (Te.prototype = new S()),
      (Te.prototype.constructor = Te),
      (Te.superclass = S.prototype);
    function Te(i, u) {
      arguments.length > 0 && this.init(i, u);
    }
    (Te.prototype.init = function (i, u) {
      Te.superclass.init.call(this, i, u);
    }),
      (Te.prototype.evaluate = function (i) {
        return this.lhs
          .evaluate(i)
          .number()
          .minus(this.rhs.evaluate(i).number());
      }),
      (Te.prototype.toString = function () {
        return "(" + this.lhs.toString() + " - " + this.rhs.toString() + ")";
      }),
      (qe.prototype = new S()),
      (qe.prototype.constructor = qe),
      (qe.superclass = S.prototype);
    function qe(i, u) {
      arguments.length > 0 && this.init(i, u);
    }
    (qe.prototype.init = function (i, u) {
      qe.superclass.init.call(this, i, u);
    }),
      (qe.prototype.evaluate = function (i) {
        return this.lhs
          .evaluate(i)
          .number()
          .multiply(this.rhs.evaluate(i).number());
      }),
      (qe.prototype.toString = function () {
        return "(" + this.lhs.toString() + " * " + this.rhs.toString() + ")";
      }),
      (re.prototype = new S()),
      (re.prototype.constructor = re),
      (re.superclass = S.prototype);
    function re(i, u) {
      arguments.length > 0 && this.init(i, u);
    }
    (re.prototype.init = function (i, u) {
      re.superclass.init.call(this, i, u);
    }),
      (re.prototype.evaluate = function (i) {
        return this.lhs.evaluate(i).number().div(this.rhs.evaluate(i).number());
      }),
      (re.prototype.toString = function () {
        return "(" + this.lhs.toString() + " div " + this.rhs.toString() + ")";
      }),
      (oe.prototype = new S()),
      (oe.prototype.constructor = oe),
      (oe.superclass = S.prototype);
    function oe(i, u) {
      arguments.length > 0 && this.init(i, u);
    }
    (oe.prototype.init = function (i, u) {
      oe.superclass.init.call(this, i, u);
    }),
      (oe.prototype.evaluate = function (i) {
        return this.lhs.evaluate(i).number().mod(this.rhs.evaluate(i).number());
      }),
      (oe.prototype.toString = function () {
        return "(" + this.lhs.toString() + " mod " + this.rhs.toString() + ")";
      }),
      (Ce.prototype = new S()),
      (Ce.prototype.constructor = Ce),
      (Ce.superclass = S.prototype);
    function Ce(i, u) {
      arguments.length > 0 && this.init(i, u);
    }
    (Ce.prototype.init = function (i, u) {
      Ce.superclass.init.call(this, i, u);
    }),
      (Ce.prototype.evaluate = function (i) {
        return this.lhs
          .evaluate(i)
          .nodeset()
          .union(this.rhs.evaluate(i).nodeset());
      }),
      (Ce.prototype.toString = function () {
        return a(c, [this.lhs, this.rhs]).join(" | ");
      }),
      (J.prototype = new b()),
      (J.prototype.constructor = J),
      (J.superclass = b.prototype);
    function J(i, u, d) {
      arguments.length > 0 && this.init(i, u, d);
    }
    J.prototype.init = function (i, u, d) {
      J.superclass.init.call(this),
        (this.filter = i),
        (this.filterPredicates = u),
        (this.locationPath = d);
    };
    function wd(i) {
      for (; i && i.parentNode; ) i = i.parentNode;
      return i;
    }
    (J.applyPredicates = function (i, u, d) {
      return n(
        function (w, y) {
          var g = u.extend({ contextSize: w.length });
          return s(function (O, K) {
            return J.predicateMatches(
              y,
              g.extend({ contextNode: O, contextPosition: K + 1 })
            );
          }, w);
        },
        d,
        i
      );
    }),
      (J.getRoot = function (i, u) {
        var d = u[0];
        if (d.nodeType === 9) return d;
        if (i.virtualRoot) return i.virtualRoot;
        var w = d.ownerDocument;
        if (w) return w;
        for (var y = d; y.parentNode != null; ) y = y.parentNode;
        return y;
      }),
      (J.applyStep = function (i, u, d) {
        var w = this,
          y = [];
        switch (((u.contextNode = d), i.axis)) {
          case C.ANCESTOR:
            if (u.contextNode === u.virtualRoot) break;
            var g;
            for (
              u.contextNode.nodeType == 2
                ? (g = J.getOwnerElement(u.contextNode))
                : (g = u.contextNode.parentNode);
              g != null &&
              (i.nodeTest.matches(g, u) && y.push(g), g !== u.virtualRoot);

            )
              g = g.parentNode;
            break;
          case C.ANCESTORORSELF:
            for (
              var g = u.contextNode;
              g != null &&
              (i.nodeTest.matches(g, u) && y.push(g), g !== u.virtualRoot);
              g = g.nodeType == 2 ? J.getOwnerElement(g) : g.parentNode
            );
            break;
          case C.ATTRIBUTE:
            var O = u.contextNode.attributes;
            if (O != null)
              for (var K = 0; K < O.length; K++) {
                var g = O.item(K);
                i.nodeTest.matches(g, u) && y.push(g);
              }
            break;
          case C.CHILD:
            for (var g = u.contextNode.firstChild; g != null; g = g.nextSibling)
              i.nodeTest.matches(g, u) && y.push(g);
            break;
          case C.DESCENDANT:
            for (var Z = [u.contextNode.firstChild]; Z.length > 0; )
              for (var g = Z.pop(); g != null; )
                i.nodeTest.matches(g, u) && y.push(g),
                  g.firstChild != null
                    ? (Z.push(g.nextSibling), (g = g.firstChild))
                    : (g = g.nextSibling);
            break;
          case C.DESCENDANTORSELF:
            i.nodeTest.matches(u.contextNode, u) && y.push(u.contextNode);
            for (var Z = [u.contextNode.firstChild]; Z.length > 0; )
              for (var g = Z.pop(); g != null; )
                i.nodeTest.matches(g, u) && y.push(g),
                  g.firstChild != null
                    ? (Z.push(g.nextSibling), (g = g.firstChild))
                    : (g = g.nextSibling);
            break;
          case C.FOLLOWING:
            if (u.contextNode === u.virtualRoot) break;
            var Z = [];
            u.contextNode.firstChild != null
              ? Z.unshift(u.contextNode.firstChild)
              : Z.unshift(u.contextNode.nextSibling);
            for (
              var g = u.contextNode.parentNode;
              g != null && g.nodeType != 9 && g !== u.virtualRoot;
              g = g.parentNode
            )
              Z.unshift(g.nextSibling);
            do
              for (var g = Z.pop(); g != null; )
                i.nodeTest.matches(g, u) && y.push(g),
                  g.firstChild != null
                    ? (Z.push(g.nextSibling), (g = g.firstChild))
                    : (g = g.nextSibling);
            while (Z.length > 0);
            break;
          case C.FOLLOWINGSIBLING:
            if (u.contextNode === u.virtualRoot) break;
            for (
              var g = u.contextNode.nextSibling;
              g != null;
              g = g.nextSibling
            )
              i.nodeTest.matches(g, u) && y.push(g);
            break;
          case C.NAMESPACE:
            var P = {};
            if (u.contextNode.nodeType == 1) {
              (P.xml = _.XML_NAMESPACE_URI), (P.xmlns = _.XMLNS_NAMESPACE_URI);
              for (
                var g = u.contextNode;
                g != null && g.nodeType == 1;
                g = g.parentNode
              )
                for (var K = 0; K < g.attributes.length; K++) {
                  var $ = g.attributes.item(K),
                    Ne = String($.name);
                  if (Ne == "xmlns") P[""] == null && (P[""] = $.value);
                  else if (Ne.length > 6 && Ne.substring(0, 6) == "xmlns:") {
                    var nt = Ne.substring(6, Ne.length);
                    P[nt] == null && (P[nt] = $.value);
                  }
                }
              for (var nt in P) {
                var Et = new Ot(nt, P[nt], u.contextNode);
                i.nodeTest.matches(Et, u) && y.push(Et);
              }
            }
            break;
          case C.PARENT:
            (g = null),
              u.contextNode !== u.virtualRoot &&
                (u.contextNode.nodeType == 2
                  ? (g = J.getOwnerElement(u.contextNode))
                  : (g = u.contextNode.parentNode)),
              g != null && i.nodeTest.matches(g, u) && y.push(g);
            break;
          case C.PRECEDING:
            var Z;
            u.virtualRoot != null
              ? (Z = [u.virtualRoot])
              : (Z = [wd(u.contextNode)]);
            e: for (; Z.length > 0; )
              for (var g = Z.pop(); g != null; ) {
                if (g == u.contextNode) break e;
                i.nodeTest.matches(g, u) && y.unshift(g),
                  g.firstChild != null
                    ? (Z.push(g.nextSibling), (g = g.firstChild))
                    : (g = g.nextSibling);
              }
            break;
          case C.PRECEDINGSIBLING:
            if (u.contextNode === u.virtualRoot) break;
            for (
              var g = u.contextNode.previousSibling;
              g != null;
              g = g.previousSibling
            )
              i.nodeTest.matches(g, u) && y.push(g);
            break;
          case C.SELF:
            i.nodeTest.matches(u.contextNode, u) && y.push(u.contextNode);
            break;
          default:
        }
        return y;
      }),
      (J.applySteps = function (i, u, d) {
        return n(
          function (w, y) {
            return [].concat.apply(
              [],
              a(function (g) {
                return J.applyPredicates(y.predicates, u, J.applyStep(y, u, g));
              }, w)
            );
          },
          d,
          i
        );
      }),
      (J.prototype.applyFilter = function (i, u) {
        if (!this.filter) return { nodes: [i.contextNode] };
        var d = this.filter.evaluate(i);
        if (!k.instance_of(d, I)) {
          if (
            (this.filterPredicates != null &&
              this.filterPredicates.length > 0) ||
            this.locationPath != null
          )
            throw new Error(
              "Path expression filter must evaluate to a nodeset if predicates or location path are used"
            );
          return { nonNodes: d };
        }
        return {
          nodes: J.applyPredicates(
            this.filterPredicates || [],
            u,
            d.toUnsortedArray()
          ),
        };
      }),
      (J.applyLocationPath = function (i, u, d) {
        if (!i) return d;
        var w = i.absolute ? [J.getRoot(u, d)] : d;
        return J.applySteps(i.steps, u, w);
      }),
      (J.prototype.evaluate = function (i) {
        var u = x(new yt(), i),
          d = this.applyFilter(i, u);
        if ("nonNodes" in d) return d.nonNodes;
        var w = new I();
        return (
          w.addArray(J.applyLocationPath(this.locationPath, u, d.nodes)), w
        );
      }),
      (J.predicateMatches = function (i, u) {
        var d = i.evaluate(u);
        return k.instance_of(d, L)
          ? u.contextPosition == d.numberValue()
          : d.booleanValue();
      }),
      (J.predicateString = o(v("[", "]"), c)),
      (J.predicatesString = o(m(""), a(J.predicateString))),
      (J.prototype.toString = function () {
        if (this.filter != null) {
          var i = c(this.filter);
          return k.instance_of(this.filter, B)
            ? v("'", "'", i)
            : this.filterPredicates != null && this.filterPredicates.length
            ? v("(", ")", i) + J.predicatesString(this.filterPredicates)
            : this.locationPath != null
            ? i + (this.locationPath.absolute ? "" : "/") + c(this.locationPath)
            : i;
        }
        return c(this.locationPath);
      }),
      (J.getOwnerElement = function (i) {
        if (i.ownerElement) return i.ownerElement;
        try {
          if (i.selectSingleNode) return i.selectSingleNode("..");
        } catch {}
        for (
          var u = i.nodeType == 9 ? i : i.ownerDocument,
            d = u.getElementsByTagName("*"),
            w = 0;
          w < d.length;
          w++
        )
          for (var y = d.item(w), g = y.attributes, O = 0; O < g.length; O++) {
            var K = g.item(O);
            if (K === i) return y;
          }
        return null;
      }),
      (Zt.prototype = new Object()),
      (Zt.prototype.constructor = Zt),
      (Zt.superclass = Object.prototype);
    function Zt(i, u) {
      arguments.length > 0 && this.init(i, u);
    }
    (Zt.prototype.init = function (i, u) {
      (this.absolute = i), (this.steps = u);
    }),
      (Zt.prototype.toString = function () {
        return (this.absolute ? "/" : "") + a(c, this.steps).join("/");
      }),
      (C.prototype = new Object()),
      (C.prototype.constructor = C),
      (C.superclass = Object.prototype);
    function C(i, u, d) {
      arguments.length > 0 && this.init(i, u, d);
    }
    (C.prototype.init = function (i, u, d) {
      (this.axis = i), (this.nodeTest = u), (this.predicates = d);
    }),
      (C.prototype.toString = function () {
        return (
          C.STEPNAMES[this.axis] +
          "::" +
          this.nodeTest.toString() +
          J.predicatesString(this.predicates)
        );
      }),
      (C.ANCESTOR = 0),
      (C.ANCESTORORSELF = 1),
      (C.ATTRIBUTE = 2),
      (C.CHILD = 3),
      (C.DESCENDANT = 4),
      (C.DESCENDANTORSELF = 5),
      (C.FOLLOWING = 6),
      (C.FOLLOWINGSIBLING = 7),
      (C.NAMESPACE = 8),
      (C.PARENT = 9),
      (C.PRECEDING = 10),
      (C.PRECEDINGSIBLING = 11),
      (C.SELF = 12),
      (C.STEPNAMES = n(
        function (i, u) {
          return (i[u[0]] = u[1]), i;
        },
        {},
        [
          [C.ANCESTOR, "ancestor"],
          [C.ANCESTORORSELF, "ancestor-or-self"],
          [C.ATTRIBUTE, "attribute"],
          [C.CHILD, "child"],
          [C.DESCENDANT, "descendant"],
          [C.DESCENDANTORSELF, "descendant-or-self"],
          [C.FOLLOWING, "following"],
          [C.FOLLOWINGSIBLING, "following-sibling"],
          [C.NAMESPACE, "namespace"],
          [C.PARENT, "parent"],
          [C.PRECEDING, "preceding"],
          [C.PRECEDINGSIBLING, "preceding-sibling"],
          [C.SELF, "self"],
        ]
      )),
      (N.prototype = new Object()),
      (N.prototype.constructor = N),
      (N.superclass = Object.prototype);
    function N(i, u) {
      arguments.length > 0 && this.init(i, u);
    }
    (N.prototype.init = function (i, u) {
      (this.type = i), (this.value = u);
    }),
      (N.prototype.toString = function () {
        return "<unknown nodetest type>";
      }),
      (N.prototype.matches = function (i, u) {
        console.warn("unknown node test type");
      }),
      (N.NAMETESTANY = 0),
      (N.NAMETESTPREFIXANY = 1),
      (N.NAMETESTQNAME = 2),
      (N.COMMENT = 3),
      (N.TEXT = 4),
      (N.PI = 5),
      (N.NODE = 6),
      (N.isNodeType = function (i) {
        return o(f(i), l("nodeType"));
      }),
      (N.makeNodeTestType = function (i, u, d) {
        var w = d || function () {};
        (w.prototype = new N(u.type)), (w.prototype.constructor = i);
        for (var y in u) w.prototype[y] = u[y];
        return w;
      }),
      (N.makeNodeTypeTest = function (i, u, d) {
        return new (N.makeNodeTestType(i, {
          matches: N.isNodeType(u),
          toString: h(d),
        }))();
      }),
      (N.hasPrefix = function (i) {
        return i.prefix || (i.nodeName || i.tagName).indexOf(":") !== -1;
      }),
      (N.isElementOrAttribute = N.isNodeType([1, 2])),
      (N.nameSpaceMatches = function (i, u, d) {
        var w = d.namespaceURI || "";
        if (!i)
          return !w || (u.allowAnyNamespaceForNoPrefix && !N.hasPrefix(d));
        var y = u.namespaceResolver.getNamespace(i, u.expressionContextNode);
        if (y == null) throw new Error("Cannot resolve QName " + i);
        return y === w;
      }),
      (N.localNameMatches = function (i, u, d) {
        var w = d.localName || d.nodeName;
        return u.caseInsensitive
          ? i.toLowerCase() === w.toLowerCase()
          : i === w;
      }),
      (N.NameTestPrefixAny = N.makeNodeTestType(
        N.NAMETESTPREFIXANY,
        {
          matches: function (i, u) {
            return (
              N.isElementOrAttribute(i) && N.nameSpaceMatches(this.prefix, u, i)
            );
          },
          toString: function () {
            return this.prefix + ":*";
          },
        },
        function (i) {
          this.prefix = i;
        }
      )),
      (N.NameTestQName = N.makeNodeTestType(
        N.NAMETESTQNAME,
        {
          matches: function (i, u) {
            return (
              N.isNodeType([1, 2, Ot.XPATH_NAMESPACE_NODE])(i) &&
              N.nameSpaceMatches(this.prefix, u, i) &&
              N.localNameMatches(this.localName, u, i)
            );
          },
          toString: function () {
            return this.name;
          },
        },
        function (i) {
          var u = i.split(":");
          (this.name = i),
            (this.prefix = u.length > 1 ? u[0] : null),
            (this.localName = u[u.length > 1 ? 1 : 0]);
        }
      )),
      (N.PITest = N.makeNodeTestType(
        N.PI,
        {
          matches: function (i, u) {
            return (
              N.isNodeType([7])(i) && (i.target || i.nodeName) === this.name
            );
          },
          toString: function () {
            return v('processing-instruction("', '")', this.name);
          },
        },
        function (i) {
          this.name = i;
        }
      )),
      (N.nameTestAny = N.makeNodeTypeTest(
        N.NAMETESTANY,
        [1, 2, Ot.XPATH_NAMESPACE_NODE],
        "*"
      )),
      (N.textTest = N.makeNodeTypeTest(N.TEXT, [3, 4], "text()")),
      (N.commentTest = N.makeNodeTypeTest(N.COMMENT, [8], "comment()")),
      (N.nodeTest = N.makeNodeTypeTest(
        N.NODE,
        [1, 2, 3, 4, 7, 8, 9],
        "node()"
      )),
      (N.anyPiTest = N.makeNodeTypeTest(N.PI, [7], "processing-instruction()")),
      (Xt.prototype = new b()),
      (Xt.prototype.constructor = Xt),
      (Xt.superclass = b.prototype);
    function Xt(i) {
      arguments.length > 0 && this.init(i);
    }
    (Xt.prototype.init = function (i) {
      this.variable = i;
    }),
      (Xt.prototype.toString = function () {
        return "$" + this.variable;
      }),
      (Xt.prototype.evaluate = function (i) {
        var u = k.resolveQName(
          this.variable,
          i.namespaceResolver,
          i.contextNode,
          !1
        );
        if (u[0] == null) throw new Error("Cannot resolve QName " + fn);
        var d = i.variableResolver.getVariable(u[1], u[0]);
        if (!d) throw _t.fromMessage("Undeclared variable: " + this.toString());
        return d;
      }),
      (Dt.prototype = new b()),
      (Dt.prototype.constructor = Dt),
      (Dt.superclass = b.prototype);
    function Dt(i, u) {
      arguments.length > 0 && this.init(i, u);
    }
    (Dt.prototype.init = function (i, u) {
      (this.functionName = i), (this.arguments = u);
    }),
      (Dt.prototype.toString = function () {
        for (
          var i = this.functionName + "(", u = 0;
          u < this.arguments.length;
          u++
        )
          u > 0 && (i += ", "), (i += this.arguments[u].toString());
        return i + ")";
      }),
      (Dt.prototype.evaluate = function (i) {
        var u = rt.getFunctionFromContext(this.functionName, i);
        if (!u) throw new Error("Unknown function " + this.functionName);
        var d = [i].concat(this.arguments);
        return u.apply(i.functionResolver.thisArg, d);
      });
    var ve = new Object();
    (ve.equals = function (i, u) {
      return i.equals(u);
    }),
      (ve.notequal = function (i, u) {
        return i.notequal(u);
      }),
      (ve.lessthan = function (i, u) {
        return i.lessthan(u);
      }),
      (ve.greaterthan = function (i, u) {
        return i.greaterthan(u);
      }),
      (ve.lessthanorequal = function (i, u) {
        return i.lessthanorequal(u);
      }),
      (ve.greaterthanorequal = function (i, u) {
        return i.greaterthanorequal(u);
      }),
      (B.prototype = new b()),
      (B.prototype.constructor = B),
      (B.superclass = b.prototype);
    function B(i) {
      arguments.length > 0 && this.init(i);
    }
    (B.prototype.init = function (i) {
      this.str = String(i);
    }),
      (B.prototype.toString = function () {
        return this.str;
      }),
      (B.prototype.evaluate = function (i) {
        return this;
      }),
      (B.prototype.string = function () {
        return this;
      }),
      (B.prototype.number = function () {
        return new L(this.str);
      }),
      (B.prototype.bool = function () {
        return new F(this.str);
      }),
      (B.prototype.nodeset = function () {
        throw new Error("Cannot convert string to nodeset");
      }),
      (B.prototype.stringValue = function () {
        return this.str;
      }),
      (B.prototype.numberValue = function () {
        return this.number().numberValue();
      }),
      (B.prototype.booleanValue = function () {
        return this.bool().booleanValue();
      }),
      (B.prototype.equals = function (i) {
        return k.instance_of(i, F)
          ? this.bool().equals(i)
          : k.instance_of(i, L)
          ? this.number().equals(i)
          : k.instance_of(i, I)
          ? i.compareWithString(this, ve.equals)
          : new F(this.str == i.str);
      }),
      (B.prototype.notequal = function (i) {
        return k.instance_of(i, F)
          ? this.bool().notequal(i)
          : k.instance_of(i, L)
          ? this.number().notequal(i)
          : k.instance_of(i, I)
          ? i.compareWithString(this, ve.notequal)
          : new F(this.str != i.str);
      }),
      (B.prototype.lessthan = function (i) {
        return this.number().lessthan(i);
      }),
      (B.prototype.greaterthan = function (i) {
        return this.number().greaterthan(i);
      }),
      (B.prototype.lessthanorequal = function (i) {
        return this.number().lessthanorequal(i);
      }),
      (B.prototype.greaterthanorequal = function (i) {
        return this.number().greaterthanorequal(i);
      }),
      (L.prototype = new b()),
      (L.prototype.constructor = L),
      (L.superclass = b.prototype);
    function L(i) {
      arguments.length > 0 && this.init(i);
    }
    (L.prototype.init = function (i) {
      this.num = typeof i == "string" ? this.parse(i) : Number(i);
    }),
      (L.prototype.numberFormat = /^\s*-?[0-9]*\.?[0-9]+\s*$/),
      (L.prototype.parse = function (i) {
        return this.numberFormat.test(i) ? parseFloat(i) : Number.NaN;
      });
    function yd(i) {
      for (
        var u = i.split("e-"),
          d = u[0].replace(".", ""),
          w = Number(u[1]),
          y = 0;
        y < w - 1;
        y += 1
      )
        d = "0" + d;
      return "0." + d;
    }
    function _d(i) {
      for (
        var u = i.split("e"),
          d = u[0].replace(".", ""),
          w = Number(u[1]),
          y = w + 1 - d.length,
          g = 0;
        g < y;
        g += 1
      )
        d += "0";
      return d;
    }
    (L.prototype.toString = function () {
      var i = this.num.toString();
      return i.indexOf("e-") !== -1 ? yd(i) : i.indexOf("e") !== -1 ? _d(i) : i;
    }),
      (L.prototype.evaluate = function (i) {
        return this;
      }),
      (L.prototype.string = function () {
        return new B(this.toString());
      }),
      (L.prototype.number = function () {
        return this;
      }),
      (L.prototype.bool = function () {
        return new F(this.num);
      }),
      (L.prototype.nodeset = function () {
        throw new Error("Cannot convert number to nodeset");
      }),
      (L.prototype.stringValue = function () {
        return this.string().stringValue();
      }),
      (L.prototype.numberValue = function () {
        return this.num;
      }),
      (L.prototype.booleanValue = function () {
        return this.bool().booleanValue();
      }),
      (L.prototype.negate = function () {
        return new L(-this.num);
      }),
      (L.prototype.equals = function (i) {
        return k.instance_of(i, F)
          ? this.bool().equals(i)
          : k.instance_of(i, B)
          ? this.equals(i.number())
          : k.instance_of(i, I)
          ? i.compareWithNumber(this, ve.equals)
          : new F(this.num == i.num);
      }),
      (L.prototype.notequal = function (i) {
        return k.instance_of(i, F)
          ? this.bool().notequal(i)
          : k.instance_of(i, B)
          ? this.notequal(i.number())
          : k.instance_of(i, I)
          ? i.compareWithNumber(this, ve.notequal)
          : new F(this.num != i.num);
      }),
      (L.prototype.lessthan = function (i) {
        return k.instance_of(i, I)
          ? i.compareWithNumber(this, ve.greaterthan)
          : k.instance_of(i, F) || k.instance_of(i, B)
          ? this.lessthan(i.number())
          : new F(this.num < i.num);
      }),
      (L.prototype.greaterthan = function (i) {
        return k.instance_of(i, I)
          ? i.compareWithNumber(this, ve.lessthan)
          : k.instance_of(i, F) || k.instance_of(i, B)
          ? this.greaterthan(i.number())
          : new F(this.num > i.num);
      }),
      (L.prototype.lessthanorequal = function (i) {
        return k.instance_of(i, I)
          ? i.compareWithNumber(this, ve.greaterthanorequal)
          : k.instance_of(i, F) || k.instance_of(i, B)
          ? this.lessthanorequal(i.number())
          : new F(this.num <= i.num);
      }),
      (L.prototype.greaterthanorequal = function (i) {
        return k.instance_of(i, I)
          ? i.compareWithNumber(this, ve.lessthanorequal)
          : k.instance_of(i, F) || k.instance_of(i, B)
          ? this.greaterthanorequal(i.number())
          : new F(this.num >= i.num);
      }),
      (L.prototype.plus = function (i) {
        return new L(this.num + i.num);
      }),
      (L.prototype.minus = function (i) {
        return new L(this.num - i.num);
      }),
      (L.prototype.multiply = function (i) {
        return new L(this.num * i.num);
      }),
      (L.prototype.div = function (i) {
        return new L(this.num / i.num);
      }),
      (L.prototype.mod = function (i) {
        return new L(this.num % i.num);
      }),
      (F.prototype = new b()),
      (F.prototype.constructor = F),
      (F.superclass = b.prototype);
    function F(i) {
      arguments.length > 0 && this.init(i);
    }
    (F.prototype.init = function (i) {
      this.b = Boolean(i);
    }),
      (F.prototype.toString = function () {
        return this.b.toString();
      }),
      (F.prototype.evaluate = function (i) {
        return this;
      }),
      (F.prototype.string = function () {
        return new B(this.b);
      }),
      (F.prototype.number = function () {
        return new L(this.b);
      }),
      (F.prototype.bool = function () {
        return this;
      }),
      (F.prototype.nodeset = function () {
        throw new Error("Cannot convert boolean to nodeset");
      }),
      (F.prototype.stringValue = function () {
        return this.string().stringValue();
      }),
      (F.prototype.numberValue = function () {
        return this.number().numberValue();
      }),
      (F.prototype.booleanValue = function () {
        return this.b;
      }),
      (F.prototype.not = function () {
        return new F(!this.b);
      }),
      (F.prototype.equals = function (i) {
        return k.instance_of(i, B) || k.instance_of(i, L)
          ? this.equals(i.bool())
          : k.instance_of(i, I)
          ? i.compareWithBoolean(this, ve.equals)
          : new F(this.b == i.b);
      }),
      (F.prototype.notequal = function (i) {
        return k.instance_of(i, B) || k.instance_of(i, L)
          ? this.notequal(i.bool())
          : k.instance_of(i, I)
          ? i.compareWithBoolean(this, ve.notequal)
          : new F(this.b != i.b);
      }),
      (F.prototype.lessthan = function (i) {
        return this.number().lessthan(i);
      }),
      (F.prototype.greaterthan = function (i) {
        return this.number().greaterthan(i);
      }),
      (F.prototype.lessthanorequal = function (i) {
        return this.number().lessthanorequal(i);
      }),
      (F.prototype.greaterthanorequal = function (i) {
        return this.number().greaterthanorequal(i);
      }),
      (F.true_ = new F(!0)),
      (F.false_ = new F(!1)),
      (Ve.prototype = new Object()),
      (Ve.prototype.constructor = Ve),
      (Ve.superclass = Object.prototype);
    function Ve(i) {
      this.init(i);
    }
    (Ve.prototype.init = function (i) {
      (this.left = null),
        (this.right = null),
        (this.node = i),
        (this.depth = 1);
    }),
      (Ve.prototype.balance = function () {
        var i = this.left == null ? 0 : this.left.depth,
          u = this.right == null ? 0 : this.right.depth;
        if (i > u + 1) {
          var d = this.left.left == null ? 0 : this.left.left.depth,
            w = this.left.right == null ? 0 : this.left.right.depth;
          d < w && this.left.rotateRR(), this.rotateLL();
        } else if (i + 1 < u) {
          var y = this.right.right == null ? 0 : this.right.right.depth,
            g = this.right.left == null ? 0 : this.right.left.depth;
          g > y && this.right.rotateLL(), this.rotateRR();
        }
      }),
      (Ve.prototype.rotateLL = function () {
        var i = this.node,
          u = this.right;
        (this.node = this.left.node),
          (this.right = this.left),
          (this.left = this.left.left),
          (this.right.left = this.right.right),
          (this.right.right = u),
          (this.right.node = i),
          this.right.updateInNewLocation(),
          this.updateInNewLocation();
      }),
      (Ve.prototype.rotateRR = function () {
        var i = this.node,
          u = this.left;
        (this.node = this.right.node),
          (this.left = this.right),
          (this.right = this.right.right),
          (this.left.right = this.left.left),
          (this.left.left = u),
          (this.left.node = i),
          this.left.updateInNewLocation(),
          this.updateInNewLocation();
      }),
      (Ve.prototype.updateInNewLocation = function () {
        this.getDepthFromChildren();
      }),
      (Ve.prototype.getDepthFromChildren = function () {
        (this.depth = this.node == null ? 0 : 1),
          this.left != null && (this.depth = this.left.depth + 1),
          this.right != null &&
            this.depth <= this.right.depth &&
            (this.depth = this.right.depth + 1);
      });
    function Ed(i, u) {
      if (i === u) return 0;
      if (i.compareDocumentPosition) {
        var d = i.compareDocumentPosition(u);
        return d & 1 || d & 10 ? 1 : d & 20 ? -1 : 0;
      }
      for (
        var w = 0, y = 0, g = i;
        g != null;
        g = g.parentNode || g.ownerElement
      )
        w++;
      for (var O = u; O != null; O = O.parentNode || O.ownerElement) y++;
      if (w > y) {
        for (; w > y; ) (i = i.parentNode || i.ownerElement), w--;
        if (i === u) return 1;
      } else if (y > w) {
        for (; y > w; ) (u = u.parentNode || u.ownerElement), y--;
        if (i === u) return -1;
      }
      for (
        var K = i.parentNode || i.ownerElement,
          Z = u.parentNode || u.ownerElement;
        K !== Z;

      )
        (i = K),
          (u = Z),
          (K = i.parentNode || i.ownerElement),
          (Z = u.parentNode || u.ownerElement);
      var P = k.isAttribute(i),
        $ = k.isAttribute(u);
      if (P && !$) return -1;
      if (!P && $) return 1;
      if (K)
        for (
          var Ne = P ? K.attributes : K.childNodes, nt = Ne.length, Et = 0;
          Et < nt;
          Et += 1
        ) {
          var Pr = Ne[Et];
          if (Pr === i) return -1;
          if (Pr === u) return 1;
        }
      throw new Error("Unexpected: could not determine node order");
    }
    (Ve.prototype.add = function (i) {
      if (i === this.node) return !1;
      var u = Ed(i, this.node),
        d = !1;
      return (
        u == -1
          ? this.left == null
            ? ((this.left = new Ve(i)), (d = !0))
            : ((d = this.left.add(i)), d && this.balance())
          : u == 1 &&
            (this.right == null
              ? ((this.right = new Ve(i)), (d = !0))
              : ((d = this.right.add(i)), d && this.balance())),
        d && this.getDepthFromChildren(),
        d
      );
    }),
      (I.prototype = new b()),
      (I.prototype.constructor = I),
      (I.superclass = b.prototype);
    function I() {
      this.init();
    }
    (I.prototype.init = function () {
      (this.tree = null), (this.nodes = []), (this.size = 0);
    }),
      (I.prototype.toString = function () {
        var i = this.first();
        return i == null ? "" : this.stringForNode(i);
      }),
      (I.prototype.evaluate = function (i) {
        return this;
      }),
      (I.prototype.string = function () {
        return new B(this.toString());
      }),
      (I.prototype.stringValue = function () {
        return this.toString();
      }),
      (I.prototype.number = function () {
        return new L(this.string());
      }),
      (I.prototype.numberValue = function () {
        return Number(this.string());
      }),
      (I.prototype.bool = function () {
        return new F(this.booleanValue());
      }),
      (I.prototype.booleanValue = function () {
        return !!this.size;
      }),
      (I.prototype.nodeset = function () {
        return this;
      }),
      (I.prototype.stringForNode = function (i) {
        return i.nodeType == 9 || i.nodeType == 1 || i.nodeType === 11
          ? this.stringForContainerNode(i)
          : i.nodeType === 2
          ? i.value || i.nodeValue
          : i.isNamespaceNode
          ? i.namespace
          : i.nodeValue;
      }),
      (I.prototype.stringForContainerNode = function (i) {
        for (var u = "", d = i.firstChild; d != null; d = d.nextSibling) {
          var w = d.nodeType;
          (w === 1 || w === 3 || w === 4 || w === 9 || w === 11) &&
            (u += this.stringForNode(d));
        }
        return u;
      }),
      (I.prototype.buildTree = function () {
        if (!this.tree && this.nodes.length) {
          this.tree = new Ve(this.nodes[0]);
          for (var i = 1; i < this.nodes.length; i += 1)
            this.tree.add(this.nodes[i]);
        }
        return this.tree;
      }),
      (I.prototype.first = function () {
        var i = this.buildTree();
        if (i == null) return null;
        for (; i.left != null; ) i = i.left;
        return i.node;
      }),
      (I.prototype.add = function (i) {
        for (var u = 0; u < this.nodes.length; u += 1)
          if (i === this.nodes[u]) return;
        (this.tree = null), this.nodes.push(i), (this.size += 1);
      }),
      (I.prototype.addArray = function (i) {
        var u = this;
        r(function (d) {
          u.add(d);
        }, i);
      }),
      (I.prototype.toArray = function () {
        var i = [];
        return this.toArrayRec(this.buildTree(), i), i;
      }),
      (I.prototype.toArrayRec = function (i, u) {
        i != null &&
          (this.toArrayRec(i.left, u),
          u.push(i.node),
          this.toArrayRec(i.right, u));
      }),
      (I.prototype.toUnsortedArray = function () {
        return this.nodes.slice();
      }),
      (I.prototype.compareWithString = function (i, u) {
        for (var d = this.toUnsortedArray(), w = 0; w < d.length; w++) {
          var y = d[w],
            g = new B(this.stringForNode(y)),
            O = u(g, i);
          if (O.booleanValue()) return O;
        }
        return new F(!1);
      }),
      (I.prototype.compareWithNumber = function (i, u) {
        for (var d = this.toUnsortedArray(), w = 0; w < d.length; w++) {
          var y = d[w],
            g = new L(this.stringForNode(y)),
            O = u(g, i);
          if (O.booleanValue()) return O;
        }
        return new F(!1);
      }),
      (I.prototype.compareWithBoolean = function (i, u) {
        return u(this.bool(), i);
      }),
      (I.prototype.compareWithNodeSet = function (i, u) {
        for (
          var d = this.toUnsortedArray(),
            w = function (K, Z) {
              return u(Z, K);
            },
            y = 0;
          y < d.length;
          y++
        ) {
          var g = new B(this.stringForNode(d[y])),
            O = i.compareWithString(g, w);
          if (O.booleanValue()) return O;
        }
        return new F(!1);
      }),
      (I.compareWith = t(function (i, u) {
        return k.instance_of(u, B)
          ? this.compareWithString(u, i)
          : k.instance_of(u, L)
          ? this.compareWithNumber(u, i)
          : k.instance_of(u, F)
          ? this.compareWithBoolean(u, i)
          : this.compareWithNodeSet(u, i);
      })),
      (I.prototype.equals = I.compareWith(ve.equals)),
      (I.prototype.notequal = I.compareWith(ve.notequal)),
      (I.prototype.lessthan = I.compareWith(ve.lessthan)),
      (I.prototype.greaterthan = I.compareWith(ve.greaterthan)),
      (I.prototype.lessthanorequal = I.compareWith(ve.lessthanorequal)),
      (I.prototype.greaterthanorequal = I.compareWith(ve.greaterthanorequal)),
      (I.prototype.union = function (i) {
        var u = new I();
        return (
          u.addArray(this.toUnsortedArray()), u.addArray(i.toUnsortedArray()), u
        );
      }),
      (Ot.prototype = new Object()),
      (Ot.prototype.constructor = Ot),
      (Ot.superclass = Object.prototype);
    function Ot(i, u, d) {
      (this.isXPathNamespace = !0),
        (this.ownerDocument = d.ownerDocument),
        (this.nodeName = "#namespace"),
        (this.prefix = i),
        (this.localName = i),
        (this.namespaceURI = u),
        (this.nodeValue = u),
        (this.ownerElement = d),
        (this.nodeType = Ot.XPATH_NAMESPACE_NODE);
    }
    (Ot.prototype.toString = function () {
      return '{ "' + this.prefix + '", "' + this.namespaceURI + '" }';
    }),
      (yt.prototype = new Object()),
      (yt.prototype.constructor = yt),
      (yt.superclass = Object.prototype);
    function yt(i, u, d) {
      (this.variableResolver = i != null ? i : new Kt()),
        (this.namespaceResolver = u != null ? u : new Pt()),
        (this.functionResolver = d != null ? d : new rt());
    }
    (yt.prototype.extend = function (i) {
      return x(new yt(), this, i);
    }),
      (Kt.prototype = new Object()),
      (Kt.prototype.constructor = Kt),
      (Kt.superclass = Object.prototype);
    function Kt() {}
    (Kt.prototype.getVariable = function (i, u) {
      return null;
    }),
      (rt.prototype = new Object()),
      (rt.prototype.constructor = rt),
      (rt.superclass = Object.prototype);
    function rt(i) {
      (this.thisArg = i != null ? i : M),
        (this.functions = new Object()),
        this.addStandardFunctions();
    }
    (rt.prototype.addStandardFunctions = function () {
      (this.functions["{}last"] = M.last),
        (this.functions["{}position"] = M.position),
        (this.functions["{}count"] = M.count),
        (this.functions["{}id"] = M.id),
        (this.functions["{}local-name"] = M.localName),
        (this.functions["{}namespace-uri"] = M.namespaceURI),
        (this.functions["{}name"] = M.name),
        (this.functions["{}string"] = M.string),
        (this.functions["{}concat"] = M.concat),
        (this.functions["{}starts-with"] = M.startsWith),
        (this.functions["{}contains"] = M.contains),
        (this.functions["{}substring-before"] = M.substringBefore),
        (this.functions["{}substring-after"] = M.substringAfter),
        (this.functions["{}substring"] = M.substring),
        (this.functions["{}string-length"] = M.stringLength),
        (this.functions["{}normalize-space"] = M.normalizeSpace),
        (this.functions["{}translate"] = M.translate),
        (this.functions["{}boolean"] = M.boolean_),
        (this.functions["{}not"] = M.not),
        (this.functions["{}true"] = M.true_),
        (this.functions["{}false"] = M.false_),
        (this.functions["{}lang"] = M.lang),
        (this.functions["{}number"] = M.number),
        (this.functions["{}sum"] = M.sum),
        (this.functions["{}floor"] = M.floor),
        (this.functions["{}ceiling"] = M.ceiling),
        (this.functions["{}round"] = M.round);
    }),
      (rt.prototype.addFunction = function (i, u, d) {
        this.functions["{" + i + "}" + u] = d;
      }),
      (rt.getFunctionFromContext = function (i, u) {
        var d = k.resolveQName(i, u.namespaceResolver, u.contextNode, !1);
        if (d[0] === null) throw new Error("Cannot resolve QName " + name);
        return u.functionResolver.getFunction(d[1], d[0]);
      }),
      (rt.prototype.getFunction = function (i, u) {
        return this.functions["{" + u + "}" + i];
      }),
      (Pt.prototype = new Object()),
      (Pt.prototype.constructor = Pt),
      (Pt.superclass = Object.prototype);
    function Pt() {}
    Pt.prototype.getNamespace = function (i, u) {
      if (i == "xml") return _.XML_NAMESPACE_URI;
      if (i == "xmlns") return _.XMLNS_NAMESPACE_URI;
      for (
        u.nodeType == 9
          ? (u = u.documentElement)
          : u.nodeType == 2
          ? (u = J.getOwnerElement(u))
          : u.nodeType != 1 && (u = u.parentNode);
        u != null && u.nodeType == 1;

      ) {
        for (var d = u.attributes, w = 0; w < d.length; w++) {
          var y = d.item(w),
            g = y.name || y.nodeName;
          if ((g === "xmlns" && i === "") || g === "xmlns:" + i)
            return String(y.value || y.nodeValue);
        }
        u = u.parentNode;
      }
      return null;
    };
    var M = new Object();
    (M.last = function (i) {
      if (arguments.length != 1) throw new Error("Function last expects ()");
      return new L(i.contextSize);
    }),
      (M.position = function (i) {
        if (arguments.length != 1)
          throw new Error("Function position expects ()");
        return new L(i.contextPosition);
      }),
      (M.count = function () {
        var i = arguments[0],
          u;
        if (
          arguments.length != 2 ||
          !k.instance_of((u = arguments[1].evaluate(i)), I)
        )
          throw new Error("Function count expects (node-set)");
        return new L(u.size);
      }),
      (M.id = function () {
        var i = arguments[0],
          u;
        if (arguments.length != 2)
          throw new Error("Function id expects (object)");
        (u = arguments[1].evaluate(i)),
          k.instance_of(u, I)
            ? (u = u.toArray().join(" "))
            : (u = u.stringValue());
        for (
          var d = u.split(/[\x0d\x0a\x09\x20]+/),
            w = 0,
            y = new I(),
            g =
              i.contextNode.nodeType == 9
                ? i.contextNode
                : i.contextNode.ownerDocument,
            O = 0;
          O < d.length;
          O++
        ) {
          var K;
          g.getElementById
            ? (K = g.getElementById(d[O]))
            : (K = k.getElementById(g, d[O])),
            K != null && (y.add(K), w++);
        }
        return y;
      }),
      (M.localName = function (i, u) {
        var d;
        if (arguments.length == 1) d = i.contextNode;
        else if (arguments.length == 2) d = u.evaluate(i).first();
        else throw new Error("Function local-name expects (node-set?)");
        return d == null
          ? new B("")
          : new B(d.localName || d.baseName || d.target || d.nodeName || "");
      }),
      (M.namespaceURI = function () {
        var i = arguments[0],
          u;
        if (arguments.length == 1) u = i.contextNode;
        else if (arguments.length == 2) u = arguments[1].evaluate(i).first();
        else throw new Error("Function namespace-uri expects (node-set?)");
        return u == null ? new B("") : new B(u.namespaceURI);
      }),
      (M.name = function () {
        var i = arguments[0],
          u;
        if (arguments.length == 1) u = i.contextNode;
        else if (arguments.length == 2) u = arguments[1].evaluate(i).first();
        else throw new Error("Function name expects (node-set?)");
        return u == null
          ? new B("")
          : u.nodeType == 1
          ? new B(u.nodeName)
          : u.nodeType == 2
          ? new B(u.name || u.nodeName)
          : u.nodeType === 7
          ? new B(u.target || u.nodeName)
          : u.localName == null
          ? new B("")
          : new B(u.localName);
      }),
      (M.string = function () {
        var i = arguments[0];
        if (arguments.length == 1)
          return new B(I.prototype.stringForNode(i.contextNode));
        if (arguments.length == 2) return arguments[1].evaluate(i).string();
        throw new Error("Function string expects (object?)");
      }),
      (M.concat = function (i) {
        if (arguments.length < 3)
          throw new Error(
            "Function concat expects (string, string[, string]*)"
          );
        for (var u = "", d = 1; d < arguments.length; d++)
          u += arguments[d].evaluate(i).stringValue();
        return new B(u);
      }),
      (M.startsWith = function () {
        var i = arguments[0];
        if (arguments.length != 3)
          throw new Error("Function startsWith expects (string, string)");
        var u = arguments[1].evaluate(i).stringValue(),
          d = arguments[2].evaluate(i).stringValue();
        return new F(u.substring(0, d.length) == d);
      }),
      (M.contains = function () {
        var i = arguments[0];
        if (arguments.length != 3)
          throw new Error("Function contains expects (string, string)");
        var u = arguments[1].evaluate(i).stringValue(),
          d = arguments[2].evaluate(i).stringValue();
        return new F(u.indexOf(d) !== -1);
      }),
      (M.substringBefore = function () {
        var i = arguments[0];
        if (arguments.length != 3)
          throw new Error("Function substring-before expects (string, string)");
        var u = arguments[1].evaluate(i).stringValue(),
          d = arguments[2].evaluate(i).stringValue();
        return new B(u.substring(0, u.indexOf(d)));
      }),
      (M.substringAfter = function () {
        var i = arguments[0];
        if (arguments.length != 3)
          throw new Error("Function substring-after expects (string, string)");
        var u = arguments[1].evaluate(i).stringValue(),
          d = arguments[2].evaluate(i).stringValue();
        if (d.length == 0) return new B(u);
        var w = u.indexOf(d);
        return w == -1 ? new B("") : new B(u.substring(w + d.length));
      }),
      (M.substring = function () {
        var i = arguments[0];
        if (!(arguments.length == 3 || arguments.length == 4))
          throw new Error(
            "Function substring expects (string, number, number?)"
          );
        var u = arguments[1].evaluate(i).stringValue(),
          d = Math.round(arguments[2].evaluate(i).numberValue()) - 1,
          w =
            arguments.length == 4
              ? d + Math.round(arguments[3].evaluate(i).numberValue())
              : void 0;
        return new B(u.substring(d, w));
      }),
      (M.stringLength = function () {
        var i = arguments[0],
          u;
        if (arguments.length == 1) u = I.prototype.stringForNode(i.contextNode);
        else if (arguments.length == 2)
          u = arguments[1].evaluate(i).stringValue();
        else throw new Error("Function string-length expects (string?)");
        return new L(u.length);
      }),
      (M.normalizeSpace = function () {
        var i = arguments[0],
          u;
        if (arguments.length == 1) u = I.prototype.stringForNode(i.contextNode);
        else if (arguments.length == 2)
          u = arguments[1].evaluate(i).stringValue();
        else throw new Error("Function normalize-space expects (string?)");
        for (var d = 0, w = u.length - 1; k.isSpace(u.charCodeAt(w)); ) w--;
        for (var y = ""; d <= w && k.isSpace(u.charCodeAt(d)); ) d++;
        for (; d <= w; )
          if (k.isSpace(u.charCodeAt(d)))
            for (y += " "; d <= w && k.isSpace(u.charCodeAt(d)); ) d++;
          else (y += u.charAt(d)), d++;
        return new B(y);
      }),
      (M.translate = function (i, u, d, w) {
        if (arguments.length != 4)
          throw new Error(
            "Function translate expects (string, string, string)"
          );
        var y = u.evaluate(i).stringValue(),
          g = d.evaluate(i).stringValue(),
          O = w.evaluate(i).stringValue(),
          K = n(
            function (P, $, Ne) {
              return $ in P || (P[$] = Ne > O.length ? "" : O[Ne]), P;
            },
            {},
            g
          ),
          Z = m(
            "",
            a(function (P) {
              return P in K ? K[P] : P;
            }, y)
          );
        return new B(Z);
      }),
      (M.boolean_ = function () {
        var i = arguments[0];
        if (arguments.length != 2)
          throw new Error("Function boolean expects (object)");
        return arguments[1].evaluate(i).bool();
      }),
      (M.not = function (i, u) {
        if (arguments.length != 2)
          throw new Error("Function not expects (object)");
        return u.evaluate(i).bool().not();
      }),
      (M.true_ = function () {
        if (arguments.length != 1) throw new Error("Function true expects ()");
        return F.true_;
      }),
      (M.false_ = function () {
        if (arguments.length != 1) throw new Error("Function false expects ()");
        return F.false_;
      }),
      (M.lang = function () {
        var i = arguments[0];
        if (arguments.length != 2)
          throw new Error("Function lang expects (string)");
        for (
          var u, d = i.contextNode;
          d != null && d.nodeType != 9;
          d = d.parentNode
        ) {
          var w = d.getAttributeNS(_.XML_NAMESPACE_URI, "lang");
          if (w != null) {
            u = String(w);
            break;
          }
        }
        if (u == null) return F.false_;
        var y = arguments[1].evaluate(i).stringValue();
        return new F(
          u.substring(0, y.length) == y &&
            (u.length == y.length || u.charAt(y.length) == "-")
        );
      }),
      (M.number = function () {
        var i = arguments[0];
        if (!(arguments.length == 1 || arguments.length == 2))
          throw new Error("Function number expects (object?)");
        return arguments.length == 1
          ? new L(I.prototype.stringForNode(i.contextNode))
          : arguments[1].evaluate(i).number();
      }),
      (M.sum = function () {
        var i = arguments[0],
          u;
        if (
          arguments.length != 2 ||
          !k.instance_of((u = arguments[1].evaluate(i)), I)
        )
          throw new Error("Function sum expects (node-set)");
        u = u.toUnsortedArray();
        for (var d = 0, w = 0; w < u.length; w++)
          d += new L(I.prototype.stringForNode(u[w])).numberValue();
        return new L(d);
      }),
      (M.floor = function () {
        var i = arguments[0];
        if (arguments.length != 2)
          throw new Error("Function floor expects (number)");
        return new L(Math.floor(arguments[1].evaluate(i).numberValue()));
      }),
      (M.ceiling = function () {
        var i = arguments[0];
        if (arguments.length != 2)
          throw new Error("Function ceiling expects (number)");
        return new L(Math.ceil(arguments[1].evaluate(i).numberValue()));
      }),
      (M.round = function () {
        var i = arguments[0];
        if (arguments.length != 2)
          throw new Error("Function round expects (number)");
        return new L(Math.round(arguments[1].evaluate(i).numberValue()));
      });
    var k = new Object();
    (k.isAttribute = function (i) {
      return i && (i.nodeType === 2 || i.ownerElement);
    }),
      (k.splitQName = function (i) {
        var u = i.indexOf(":");
        return u == -1 ? [null, i] : [i.substring(0, u), i.substring(u + 1)];
      }),
      (k.resolveQName = function (i, u, d, w) {
        var y = k.splitQName(i);
        return (
          y[0] != null
            ? (y[0] = u.getNamespace(y[0], d))
            : w
            ? ((y[0] = u.getNamespace("", d)), y[0] == null && (y[0] = ""))
            : (y[0] = ""),
          y
        );
      }),
      (k.isSpace = function (i) {
        return i == 9 || i == 13 || i == 10 || i == 32;
      }),
      (k.isLetter = function (i) {
        return (
          (i >= 65 && i <= 90) ||
          (i >= 97 && i <= 122) ||
          (i >= 192 && i <= 214) ||
          (i >= 216 && i <= 246) ||
          (i >= 248 && i <= 255) ||
          (i >= 256 && i <= 305) ||
          (i >= 308 && i <= 318) ||
          (i >= 321 && i <= 328) ||
          (i >= 330 && i <= 382) ||
          (i >= 384 && i <= 451) ||
          (i >= 461 && i <= 496) ||
          (i >= 500 && i <= 501) ||
          (i >= 506 && i <= 535) ||
          (i >= 592 && i <= 680) ||
          (i >= 699 && i <= 705) ||
          i == 902 ||
          (i >= 904 && i <= 906) ||
          i == 908 ||
          (i >= 910 && i <= 929) ||
          (i >= 931 && i <= 974) ||
          (i >= 976 && i <= 982) ||
          i == 986 ||
          i == 988 ||
          i == 990 ||
          i == 992 ||
          (i >= 994 && i <= 1011) ||
          (i >= 1025 && i <= 1036) ||
          (i >= 1038 && i <= 1103) ||
          (i >= 1105 && i <= 1116) ||
          (i >= 1118 && i <= 1153) ||
          (i >= 1168 && i <= 1220) ||
          (i >= 1223 && i <= 1224) ||
          (i >= 1227 && i <= 1228) ||
          (i >= 1232 && i <= 1259) ||
          (i >= 1262 && i <= 1269) ||
          (i >= 1272 && i <= 1273) ||
          (i >= 1329 && i <= 1366) ||
          i == 1369 ||
          (i >= 1377 && i <= 1414) ||
          (i >= 1488 && i <= 1514) ||
          (i >= 1520 && i <= 1522) ||
          (i >= 1569 && i <= 1594) ||
          (i >= 1601 && i <= 1610) ||
          (i >= 1649 && i <= 1719) ||
          (i >= 1722 && i <= 1726) ||
          (i >= 1728 && i <= 1742) ||
          (i >= 1744 && i <= 1747) ||
          i == 1749 ||
          (i >= 1765 && i <= 1766) ||
          (i >= 2309 && i <= 2361) ||
          i == 2365 ||
          (i >= 2392 && i <= 2401) ||
          (i >= 2437 && i <= 2444) ||
          (i >= 2447 && i <= 2448) ||
          (i >= 2451 && i <= 2472) ||
          (i >= 2474 && i <= 2480) ||
          i == 2482 ||
          (i >= 2486 && i <= 2489) ||
          (i >= 2524 && i <= 2525) ||
          (i >= 2527 && i <= 2529) ||
          (i >= 2544 && i <= 2545) ||
          (i >= 2565 && i <= 2570) ||
          (i >= 2575 && i <= 2576) ||
          (i >= 2579 && i <= 2600) ||
          (i >= 2602 && i <= 2608) ||
          (i >= 2610 && i <= 2611) ||
          (i >= 2613 && i <= 2614) ||
          (i >= 2616 && i <= 2617) ||
          (i >= 2649 && i <= 2652) ||
          i == 2654 ||
          (i >= 2674 && i <= 2676) ||
          (i >= 2693 && i <= 2699) ||
          i == 2701 ||
          (i >= 2703 && i <= 2705) ||
          (i >= 2707 && i <= 2728) ||
          (i >= 2730 && i <= 2736) ||
          (i >= 2738 && i <= 2739) ||
          (i >= 2741 && i <= 2745) ||
          i == 2749 ||
          i == 2784 ||
          (i >= 2821 && i <= 2828) ||
          (i >= 2831 && i <= 2832) ||
          (i >= 2835 && i <= 2856) ||
          (i >= 2858 && i <= 2864) ||
          (i >= 2866 && i <= 2867) ||
          (i >= 2870 && i <= 2873) ||
          i == 2877 ||
          (i >= 2908 && i <= 2909) ||
          (i >= 2911 && i <= 2913) ||
          (i >= 2949 && i <= 2954) ||
          (i >= 2958 && i <= 2960) ||
          (i >= 2962 && i <= 2965) ||
          (i >= 2969 && i <= 2970) ||
          i == 2972 ||
          (i >= 2974 && i <= 2975) ||
          (i >= 2979 && i <= 2980) ||
          (i >= 2984 && i <= 2986) ||
          (i >= 2990 && i <= 2997) ||
          (i >= 2999 && i <= 3001) ||
          (i >= 3077 && i <= 3084) ||
          (i >= 3086 && i <= 3088) ||
          (i >= 3090 && i <= 3112) ||
          (i >= 3114 && i <= 3123) ||
          (i >= 3125 && i <= 3129) ||
          (i >= 3168 && i <= 3169) ||
          (i >= 3205 && i <= 3212) ||
          (i >= 3214 && i <= 3216) ||
          (i >= 3218 && i <= 3240) ||
          (i >= 3242 && i <= 3251) ||
          (i >= 3253 && i <= 3257) ||
          i == 3294 ||
          (i >= 3296 && i <= 3297) ||
          (i >= 3333 && i <= 3340) ||
          (i >= 3342 && i <= 3344) ||
          (i >= 3346 && i <= 3368) ||
          (i >= 3370 && i <= 3385) ||
          (i >= 3424 && i <= 3425) ||
          (i >= 3585 && i <= 3630) ||
          i == 3632 ||
          (i >= 3634 && i <= 3635) ||
          (i >= 3648 && i <= 3653) ||
          (i >= 3713 && i <= 3714) ||
          i == 3716 ||
          (i >= 3719 && i <= 3720) ||
          i == 3722 ||
          i == 3725 ||
          (i >= 3732 && i <= 3735) ||
          (i >= 3737 && i <= 3743) ||
          (i >= 3745 && i <= 3747) ||
          i == 3749 ||
          i == 3751 ||
          (i >= 3754 && i <= 3755) ||
          (i >= 3757 && i <= 3758) ||
          i == 3760 ||
          (i >= 3762 && i <= 3763) ||
          i == 3773 ||
          (i >= 3776 && i <= 3780) ||
          (i >= 3904 && i <= 3911) ||
          (i >= 3913 && i <= 3945) ||
          (i >= 4256 && i <= 4293) ||
          (i >= 4304 && i <= 4342) ||
          i == 4352 ||
          (i >= 4354 && i <= 4355) ||
          (i >= 4357 && i <= 4359) ||
          i == 4361 ||
          (i >= 4363 && i <= 4364) ||
          (i >= 4366 && i <= 4370) ||
          i == 4412 ||
          i == 4414 ||
          i == 4416 ||
          i == 4428 ||
          i == 4430 ||
          i == 4432 ||
          (i >= 4436 && i <= 4437) ||
          i == 4441 ||
          (i >= 4447 && i <= 4449) ||
          i == 4451 ||
          i == 4453 ||
          i == 4455 ||
          i == 4457 ||
          (i >= 4461 && i <= 4462) ||
          (i >= 4466 && i <= 4467) ||
          i == 4469 ||
          i == 4510 ||
          i == 4520 ||
          i == 4523 ||
          (i >= 4526 && i <= 4527) ||
          (i >= 4535 && i <= 4536) ||
          i == 4538 ||
          (i >= 4540 && i <= 4546) ||
          i == 4587 ||
          i == 4592 ||
          i == 4601 ||
          (i >= 7680 && i <= 7835) ||
          (i >= 7840 && i <= 7929) ||
          (i >= 7936 && i <= 7957) ||
          (i >= 7960 && i <= 7965) ||
          (i >= 7968 && i <= 8005) ||
          (i >= 8008 && i <= 8013) ||
          (i >= 8016 && i <= 8023) ||
          i == 8025 ||
          i == 8027 ||
          i == 8029 ||
          (i >= 8031 && i <= 8061) ||
          (i >= 8064 && i <= 8116) ||
          (i >= 8118 && i <= 8124) ||
          i == 8126 ||
          (i >= 8130 && i <= 8132) ||
          (i >= 8134 && i <= 8140) ||
          (i >= 8144 && i <= 8147) ||
          (i >= 8150 && i <= 8155) ||
          (i >= 8160 && i <= 8172) ||
          (i >= 8178 && i <= 8180) ||
          (i >= 8182 && i <= 8188) ||
          i == 8486 ||
          (i >= 8490 && i <= 8491) ||
          i == 8494 ||
          (i >= 8576 && i <= 8578) ||
          (i >= 12353 && i <= 12436) ||
          (i >= 12449 && i <= 12538) ||
          (i >= 12549 && i <= 12588) ||
          (i >= 44032 && i <= 55203) ||
          (i >= 19968 && i <= 40869) ||
          i == 12295 ||
          (i >= 12321 && i <= 12329)
        );
      }),
      (k.isNCNameChar = function (i) {
        return (
          (i >= 48 && i <= 57) ||
          (i >= 1632 && i <= 1641) ||
          (i >= 1776 && i <= 1785) ||
          (i >= 2406 && i <= 2415) ||
          (i >= 2534 && i <= 2543) ||
          (i >= 2662 && i <= 2671) ||
          (i >= 2790 && i <= 2799) ||
          (i >= 2918 && i <= 2927) ||
          (i >= 3047 && i <= 3055) ||
          (i >= 3174 && i <= 3183) ||
          (i >= 3302 && i <= 3311) ||
          (i >= 3430 && i <= 3439) ||
          (i >= 3664 && i <= 3673) ||
          (i >= 3792 && i <= 3801) ||
          (i >= 3872 && i <= 3881) ||
          i == 46 ||
          i == 45 ||
          i == 95 ||
          k.isLetter(i) ||
          (i >= 768 && i <= 837) ||
          (i >= 864 && i <= 865) ||
          (i >= 1155 && i <= 1158) ||
          (i >= 1425 && i <= 1441) ||
          (i >= 1443 && i <= 1465) ||
          (i >= 1467 && i <= 1469) ||
          i == 1471 ||
          (i >= 1473 && i <= 1474) ||
          i == 1476 ||
          (i >= 1611 && i <= 1618) ||
          i == 1648 ||
          (i >= 1750 && i <= 1756) ||
          (i >= 1757 && i <= 1759) ||
          (i >= 1760 && i <= 1764) ||
          (i >= 1767 && i <= 1768) ||
          (i >= 1770 && i <= 1773) ||
          (i >= 2305 && i <= 2307) ||
          i == 2364 ||
          (i >= 2366 && i <= 2380) ||
          i == 2381 ||
          (i >= 2385 && i <= 2388) ||
          (i >= 2402 && i <= 2403) ||
          (i >= 2433 && i <= 2435) ||
          i == 2492 ||
          i == 2494 ||
          i == 2495 ||
          (i >= 2496 && i <= 2500) ||
          (i >= 2503 && i <= 2504) ||
          (i >= 2507 && i <= 2509) ||
          i == 2519 ||
          (i >= 2530 && i <= 2531) ||
          i == 2562 ||
          i == 2620 ||
          i == 2622 ||
          i == 2623 ||
          (i >= 2624 && i <= 2626) ||
          (i >= 2631 && i <= 2632) ||
          (i >= 2635 && i <= 2637) ||
          (i >= 2672 && i <= 2673) ||
          (i >= 2689 && i <= 2691) ||
          i == 2748 ||
          (i >= 2750 && i <= 2757) ||
          (i >= 2759 && i <= 2761) ||
          (i >= 2763 && i <= 2765) ||
          (i >= 2817 && i <= 2819) ||
          i == 2876 ||
          (i >= 2878 && i <= 2883) ||
          (i >= 2887 && i <= 2888) ||
          (i >= 2891 && i <= 2893) ||
          (i >= 2902 && i <= 2903) ||
          (i >= 2946 && i <= 2947) ||
          (i >= 3006 && i <= 3010) ||
          (i >= 3014 && i <= 3016) ||
          (i >= 3018 && i <= 3021) ||
          i == 3031 ||
          (i >= 3073 && i <= 3075) ||
          (i >= 3134 && i <= 3140) ||
          (i >= 3142 && i <= 3144) ||
          (i >= 3146 && i <= 3149) ||
          (i >= 3157 && i <= 3158) ||
          (i >= 3202 && i <= 3203) ||
          (i >= 3262 && i <= 3268) ||
          (i >= 3270 && i <= 3272) ||
          (i >= 3274 && i <= 3277) ||
          (i >= 3285 && i <= 3286) ||
          (i >= 3330 && i <= 3331) ||
          (i >= 3390 && i <= 3395) ||
          (i >= 3398 && i <= 3400) ||
          (i >= 3402 && i <= 3405) ||
          i == 3415 ||
          i == 3633 ||
          (i >= 3636 && i <= 3642) ||
          (i >= 3655 && i <= 3662) ||
          i == 3761 ||
          (i >= 3764 && i <= 3769) ||
          (i >= 3771 && i <= 3772) ||
          (i >= 3784 && i <= 3789) ||
          (i >= 3864 && i <= 3865) ||
          i == 3893 ||
          i == 3895 ||
          i == 3897 ||
          i == 3902 ||
          i == 3903 ||
          (i >= 3953 && i <= 3972) ||
          (i >= 3974 && i <= 3979) ||
          (i >= 3984 && i <= 3989) ||
          i == 3991 ||
          (i >= 3993 && i <= 4013) ||
          (i >= 4017 && i <= 4023) ||
          i == 4025 ||
          (i >= 8400 && i <= 8412) ||
          i == 8417 ||
          (i >= 12330 && i <= 12335) ||
          i == 12441 ||
          i == 12442 ||
          i == 183 ||
          i == 720 ||
          i == 721 ||
          i == 903 ||
          i == 1600 ||
          i == 3654 ||
          i == 3782 ||
          i == 12293 ||
          (i >= 12337 && i <= 12341) ||
          (i >= 12445 && i <= 12446) ||
          (i >= 12540 && i <= 12542)
        );
      }),
      (k.coalesceText = function (i) {
        for (var u = i.firstChild; u != null; u = u.nextSibling)
          if (u.nodeType == 3 || u.nodeType == 4) {
            var d = u.nodeValue,
              w = u;
            for (
              u = u.nextSibling;
              u != null && (u.nodeType == 3 || u.nodeType == 4);

            ) {
              d += u.nodeValue;
              var y = u;
              (u = u.nextSibling), y.parentNode.removeChild(y);
            }
            if (w.nodeType == 4) {
              var g = w.parentNode;
              if (w.nextSibling == null)
                g.removeChild(w),
                  g.appendChild(g.ownerDocument.createTextNode(d));
              else {
                var O = w.nextSibling;
                g.removeChild(w),
                  g.insertBefore(g.ownerDocument.createTextNode(d), O);
              }
            } else w.nodeValue = d;
            if (u == null) break;
          } else u.nodeType == 1 && k.coalesceText(u);
      }),
      (k.instance_of = function (i, u) {
        for (; i != null; ) {
          if (i.constructor === u) return !0;
          if (i === Object) return !1;
          i = i.constructor.superclass;
        }
        return !1;
      }),
      (k.getElementById = function (i, u) {
        if (
          i.nodeType == 1 &&
          (i.getAttribute("id") == u || i.getAttributeNS(null, "id") == u)
        )
          return i;
        for (var d = i.firstChild; d != null; d = d.nextSibling) {
          var w = k.getElementById(d, u);
          if (w != null) return w;
        }
        return null;
      });
    var _t = (function () {
      function i(d, w) {
        var y = w ? ": " + w.toString() : "";
        switch (d) {
          case u.INVALID_EXPRESSION_ERR:
            return "Invalid expression" + y;
          case u.TYPE_ERR:
            return "Type error" + y;
        }
        return null;
      }
      function u(d, w, y) {
        var g = Error.call(this, i(d, w) || y);
        return (g.code = d), (g.exception = w), g;
      }
      return (
        (u.prototype = Object.create(Error.prototype)),
        (u.prototype.constructor = u),
        (u.superclass = Error),
        (u.prototype.toString = function () {
          return this.message;
        }),
        (u.fromMessage = function (d, w) {
          return new u(null, w, d);
        }),
        (u.INVALID_EXPRESSION_ERR = 51),
        (u.TYPE_ERR = 52),
        u
      );
    })();
    (lt.prototype = {}),
      (lt.prototype.constructor = lt),
      (lt.superclass = Object.prototype);
    function lt(i, u, d) {
      (this.xpath = d.parse(i)),
        (this.context = new yt()),
        (this.context.namespaceResolver = new Dr(u));
    }
    (lt.getOwnerDocument = function (i) {
      return i.nodeType === 9 ? i : i.ownerDocument;
    }),
      (lt.detectHtmlDom = function (i) {
        if (!i) return !1;
        var u = lt.getOwnerDocument(i);
        try {
          return u.implementation.hasFeature("HTML", "2.0");
        } catch {
          return !0;
        }
      }),
      (lt.prototype.evaluate = function (i, u, d) {
        (this.context.expressionContextNode = i),
          (this.context.caseInsensitive = lt.detectHtmlDom(i));
        var w = this.xpath.evaluate(this.context);
        return new Y(w, u);
      }),
      (Dr.prototype = {}),
      (Dr.prototype.constructor = Dr),
      (Dr.superclass = Object.prototype);
    function Dr(i) {
      this.xpathNSResolver = i;
    }
    (Dr.prototype.getNamespace = function (i, u) {
      return this.xpathNSResolver == null
        ? null
        : this.xpathNSResolver.lookupNamespaceURI(i);
    }),
      (Or.prototype = {}),
      (Or.prototype.constructor = Or),
      (Or.superclass = Object.prototype);
    function Or(i) {
      (this.node = i), (this.namespaceResolver = new Pt());
    }
    (Or.prototype.lookupNamespaceURI = function (i) {
      return this.namespaceResolver.getNamespace(i, this.node);
    }),
      (Y.prototype = {}),
      (Y.prototype.constructor = Y),
      (Y.superclass = Object.prototype);
    function Y(i, u) {
      switch (
        (u == Y.ANY_TYPE &&
          (i.constructor === B
            ? (u = Y.STRING_TYPE)
            : i.constructor === L
            ? (u = Y.NUMBER_TYPE)
            : i.constructor === F
            ? (u = Y.BOOLEAN_TYPE)
            : i.constructor === I && (u = Y.UNORDERED_NODE_ITERATOR_TYPE)),
        (this.resultType = u),
        u)
      ) {
        case Y.NUMBER_TYPE:
          this.numberValue = i.numberValue();
          return;
        case Y.STRING_TYPE:
          this.stringValue = i.stringValue();
          return;
        case Y.BOOLEAN_TYPE:
          this.booleanValue = i.booleanValue();
          return;
        case Y.ANY_UNORDERED_NODE_TYPE:
        case Y.FIRST_ORDERED_NODE_TYPE:
          if (i.constructor === I) {
            this.singleNodeValue = i.first();
            return;
          }
          break;
        case Y.UNORDERED_NODE_ITERATOR_TYPE:
        case Y.ORDERED_NODE_ITERATOR_TYPE:
          if (i.constructor === I) {
            (this.invalidIteratorState = !1),
              (this.nodes = i.toArray()),
              (this.iteratorIndex = 0);
            return;
          }
          break;
        case Y.UNORDERED_NODE_SNAPSHOT_TYPE:
        case Y.ORDERED_NODE_SNAPSHOT_TYPE:
          if (i.constructor === I) {
            (this.nodes = i.toArray()),
              (this.snapshotLength = this.nodes.length);
            return;
          }
          break;
      }
      throw new _t(_t.TYPE_ERR);
    }
    (Y.prototype.iterateNext = function () {
      if (
        this.resultType != Y.UNORDERED_NODE_ITERATOR_TYPE &&
        this.resultType != Y.ORDERED_NODE_ITERATOR_TYPE
      )
        throw new _t(_t.TYPE_ERR);
      return this.nodes[this.iteratorIndex++];
    }),
      (Y.prototype.snapshotItem = function (i) {
        if (
          this.resultType != Y.UNORDERED_NODE_SNAPSHOT_TYPE &&
          this.resultType != Y.ORDERED_NODE_SNAPSHOT_TYPE
        )
          throw new _t(_t.TYPE_ERR);
        return this.nodes[i];
      }),
      (Y.ANY_TYPE = 0),
      (Y.NUMBER_TYPE = 1),
      (Y.STRING_TYPE = 2),
      (Y.BOOLEAN_TYPE = 3),
      (Y.UNORDERED_NODE_ITERATOR_TYPE = 4),
      (Y.ORDERED_NODE_ITERATOR_TYPE = 5),
      (Y.UNORDERED_NODE_SNAPSHOT_TYPE = 6),
      (Y.ORDERED_NODE_SNAPSHOT_TYPE = 7),
      (Y.ANY_UNORDERED_NODE_TYPE = 8),
      (Y.FIRST_ORDERED_NODE_TYPE = 9);
    function nu(i, u) {
      (i.createExpression = function (d, w) {
        try {
          return new lt(d, w, u);
        } catch (y) {
          throw new _t(_t.INVALID_EXPRESSION_ERR, y);
        }
      }),
        (i.createNSResolver = function (d) {
          return new Or(d);
        }),
        (i.evaluate = function (d, w, y, g, O) {
          if (g < 0 || g > 9)
            throw {
              code: 0,
              toString: function () {
                return "Request type not supported";
              },
            };
          return i.createExpression(d, y, u).evaluate(w, g, O);
        });
    }
    try {
      var iu = !0;
      try {
        document.implementation &&
          document.implementation.hasFeature &&
          document.implementation.hasFeature("XPath", null) &&
          (iu = !1);
      } catch {}
      iu && nu(document, new p());
    } catch {}
    nu(e, new p()),
      (function () {
        var i = new p(),
          u = new Pt(),
          d = new rt(),
          w = new Kt();
        function y(R) {
          return {
            getNamespace: function (te, Ge) {
              var Yt = R(te, Ge);
              return Yt || u.getNamespace(te, Ge);
            },
          };
        }
        function g(R) {
          return y(R.getNamespace.bind(R));
        }
        function O(R) {
          return y(function (te) {
            return R[te];
          });
        }
        function K(R) {
          return R && typeof R.getNamespace == "function"
            ? g(R)
            : typeof R == "function"
            ? y(R)
            : typeof R == "object"
            ? O(R)
            : u;
        }
        function Z(R) {
          if (
            R === null ||
            typeof R == "undefined" ||
            R instanceof B ||
            R instanceof F ||
            R instanceof L ||
            R instanceof I
          )
            return R;
          switch (typeof R) {
            case "string":
              return new B(R);
            case "boolean":
              return new F(R);
            case "number":
              return new L(R);
          }
          var te = new I();
          return te.addArray([].concat(R)), te;
        }
        function P(R) {
          return function (te) {
            var Ge = Array.prototype.slice
                .call(arguments, 1)
                .map(function (Cd) {
                  return Cd.evaluate(te);
                }),
              Yt = R.apply(this, [].concat(te, Ge));
            return Z(Yt);
          };
        }
        function $(R) {
          return {
            getFunction: function (te, Ge) {
              var Yt = R(te, Ge);
              return Yt ? P(Yt) : d.getFunction(te, Ge);
            },
          };
        }
        function Ne(R) {
          return $(R.getFunction.bind(R));
        }
        function nt(R) {
          return $(function (te) {
            return R[te];
          });
        }
        function Et(R) {
          return R && typeof R.getFunction == "function"
            ? Ne(R)
            : typeof R == "function"
            ? $(R)
            : typeof R == "object"
            ? nt(R)
            : d;
        }
        function Pr(R) {
          return {
            getVariable: function (te, Ge) {
              var Yt = R(te, Ge);
              return Z(Yt);
            },
          };
        }
        function bd(R) {
          if (R) {
            if (typeof R.getVariable == "function")
              return Pr(R.getVariable.bind(R));
            if (typeof R == "function") return Pr(R);
            if (typeof R == "object")
              return Pr(function (te) {
                return R[te];
              });
          }
          return w;
        }
        function au(R, te, Ge) {
          R in Ge && (te[R] = Ge[R]);
        }
        function Ad(R) {
          var te = new yt();
          return (
            R
              ? ((te.namespaceResolver = K(R.namespaces)),
                (te.functionResolver = Et(R.functions)),
                (te.variableResolver = bd(R.variables)),
                (te.expressionContextNode = R.node),
                au("allowAnyNamespaceForNoPrefix", te, R),
                au("isHtml", te, R))
              : (te.namespaceResolver = u),
            te
          );
        }
        function Sd(R, te) {
          var Ge = Ad(te);
          return R.evaluate(Ge);
        }
        var Td = {
          evaluate: function (R) {
            return Sd(this.expression, R);
          },
          evaluateNumber: function (R) {
            return this.evaluate(R).numberValue();
          },
          evaluateString: function (R) {
            return this.evaluate(R).stringValue();
          },
          evaluateBoolean: function (R) {
            return this.evaluate(R).booleanValue();
          },
          evaluateNodeSet: function (R) {
            return this.evaluate(R).nodeset();
          },
          select: function (R) {
            return this.evaluateNodeSet(R).toArray();
          },
          select1: function (R) {
            return this.select(R)[0];
          },
        };
        function Rd(R) {
          var te = i.parse(R);
          return Object.create(Td, { expression: { value: te } });
        }
        e.parse = Rd;
      })(),
      (e.XPath = _),
      (e.XPathParser = p),
      (e.XPathResult = Y),
      (e.Step = C),
      (e.NodeTest = N),
      (e.BarOperation = Ce),
      (e.NamespaceResolver = Pt),
      (e.FunctionResolver = rt),
      (e.VariableResolver = Kt),
      (e.Utilities = k),
      (e.XPathContext = yt),
      (e.XNodeSet = I),
      (e.XBoolean = F),
      (e.XString = B),
      (e.XNumber = L),
      (e.select = function (i, u, d) {
        return e.selectWithResolver(i, u, null, d);
      }),
      (e.useNamespaces = function (i) {
        var u = {
          mappings: i || {},
          lookupNamespaceURI: function (d) {
            return this.mappings[d];
          },
        };
        return function (d, w, y) {
          return e.selectWithResolver(d, w, u, y);
        };
      }),
      (e.selectWithResolver = function (i, u, d, w) {
        var y = new lt(i, d, new p()),
          g = Y.ANY_TYPE,
          O = y.evaluate(u, g, null);
        return (
          O.resultType == Y.STRING_TYPE
            ? (O = O.stringValue)
            : O.resultType == Y.NUMBER_TYPE
            ? (O = O.numberValue)
            : O.resultType == Y.BOOLEAN_TYPE
            ? (O = O.booleanValue)
            : ((O = O.nodes), w && (O = O[0])),
          O
        );
      }),
      (e.select1 = function (i, u) {
        return e.select(i, u, !0);
      });
  })(Qx);
});
var bp = A((Ep) => {
  var Oo =
      /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,
    gp = new RegExp(
      "[\\-\\.0-9" +
        Oo.source.slice(1, -1) +
        "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"
    ),
    mp = new RegExp(
      "^" + Oo.source + gp.source + "*(?::" + Oo.source + gp.source + "*)?$"
    ),
    ri = 0,
    hr = 1,
    un = 2,
    ni = 3,
    ln = 4,
    hn = 5,
    ii = 6,
    la = 7;
  function vp() {}
  vp.prototype = {
    parse: function (e, t, r) {
      var n = this.domBuilder;
      n.startDocument(),
        yp(t, (t = {})),
        Jx(e, t, r, n, this.errorHandler),
        n.endDocument();
    },
  };
  function Jx(e, t, r, n, a) {
    function s(re) {
      if (re > 65535) {
        re -= 65536;
        var oe = 55296 + (re >> 10),
          Ce = 56320 + (re & 1023);
        return String.fromCharCode(oe, Ce);
      } else return String.fromCharCode(re);
    }
    function o(re) {
      var oe = re.slice(1, -1);
      return oe in r
        ? r[oe]
        : oe.charAt(0) === "#"
        ? s(parseInt(oe.substr(1).replace("x", "0x")))
        : (a.error("entity not found:" + re), re);
    }
    function f(re) {
      if (re > _) {
        var oe = e.substring(_, re).replace(/&#?\w+;/g, o);
        v && h(_), n.characters(oe, 0, re - _), (_ = re);
      }
    }
    function h(re, oe) {
      for (; re >= c && (oe = m.exec(e)); )
        (l = oe.index), (c = l + oe[0].length), v.lineNumber++;
      v.columnNumber = re - l + 1;
    }
    for (
      var l = 0,
        c = 0,
        m = /.*(?:\r\n?|\n)|.*$/g,
        v = n.locator,
        x = [{ currentNSMap: t }],
        p = {},
        _ = 0;
      ;

    ) {
      try {
        var E = e.indexOf("<", _);
        if (E < 0) {
          if (!e.substr(_).match(/^\s*$/)) {
            var b = n.doc,
              W = b.createTextNode(e.substr(_));
            b.appendChild(W), (n.currentElement = W);
          }
          return;
        }
        switch ((E > _ && f(E), e.charAt(E + 1))) {
          case "/":
            var U = e.indexOf(">", E + 3),
              S = e.substring(E + 2, U),
              T = x.pop();
            U < 0
              ? ((S = e.substring(E + 2).replace(/[\s<].*/, "")),
                a.error("end tag name: " + S + " is not complete:" + T.tagName),
                (U = E + 1 + S.length))
              : S.match(/\s</) &&
                ((S = S.replace(/[\s<].*/, "")),
                a.error("end tag name: " + S + " maybe not complete"),
                (U = E + 1 + S.length));
            var H = T.localNSMap,
              j = T.tagName == S,
              q =
                j || (T.tagName && T.tagName.toLowerCase() == S.toLowerCase());
            if (q) {
              if ((n.endElement(T.uri, T.localName, S), H))
                for (var V in H) n.endPrefixMapping(V);
              j ||
                a.fatalError(
                  "end tag name: " +
                    S +
                    " is not match the current start tagName:" +
                    T.tagName
                );
            } else x.push(T);
            U++;
            break;
          case "?":
            v && h(E), (U = iw(e, E, n));
            break;
          case "!":
            v && h(E), (U = nw(e, E, n, a));
            break;
          default:
            v && h(E);
            var G = new _p(),
              D = x[x.length - 1].currentNSMap,
              U = ew(e, E, G, D, o, a),
              ue = G.length;
            if (
              (!G.closed &&
                rw(e, U, G.tagName, p) &&
                ((G.closed = !0),
                r.nbsp || a.warning("unclosed xml attribute")),
              v && ue)
            ) {
              for (var Se = xp(v, {}), Te = 0; Te < ue; Te++) {
                var qe = G[Te];
                h(qe.offset), (qe.locator = xp(v, {}));
              }
              (n.locator = Se), wp(G, n, D) && x.push(G), (n.locator = v);
            } else wp(G, n, D) && x.push(G);
            G.uri === "http://www.w3.org/1999/xhtml" && !G.closed
              ? (U = tw(e, U, G.tagName, o, n))
              : U++;
        }
      } catch (re) {
        a.error("element parse error: " + re), (U = -1);
      }
      U > _ ? (_ = U) : f(Math.max(E, _) + 1);
    }
  }
  function xp(e, t) {
    return (t.lineNumber = e.lineNumber), (t.columnNumber = e.columnNumber), t;
  }
  function ew(e, t, r, n, a, s) {
    for (var o, f, h = ++t, l = ri; ; ) {
      var c = e.charAt(h);
      switch (c) {
        case "=":
          if (l === hr) (o = e.slice(t, h)), (l = ni);
          else if (l === un) l = ni;
          else throw new Error("attribute equal must after attrName");
          break;
        case "'":
        case '"':
          if (l === ni || l === hr)
            if (
              (l === hr &&
                (s.warning('attribute value must after "="'),
                (o = e.slice(t, h))),
              (t = h + 1),
              (h = e.indexOf(c, t)),
              h > 0)
            )
              (f = e.slice(t, h).replace(/&#?\w+;/g, a)),
                r.add(o, f, t - 1),
                (l = hn);
            else throw new Error("attribute value no end '" + c + "' match");
          else if (l == ln)
            (f = e.slice(t, h).replace(/&#?\w+;/g, a)),
              r.add(o, f, t),
              s.warning('attribute "' + o + '" missed start quot(' + c + ")!!"),
              (t = h + 1),
              (l = hn);
          else throw new Error('attribute value must after "="');
          break;
        case "/":
          switch (l) {
            case ri:
              r.setTagName(e.slice(t, h));
            case hn:
            case ii:
            case la:
              (l = la), (r.closed = !0);
            case ln:
            case hr:
            case un:
              break;
            default:
              throw new Error("attribute invalid close char('/')");
          }
          break;
        case "":
          return (
            s.error("unexpected end of input"),
            l == ri && r.setTagName(e.slice(t, h)),
            h
          );
        case ">":
          switch (l) {
            case ri:
              r.setTagName(e.slice(t, h));
            case hn:
            case ii:
            case la:
              break;
            case ln:
            case hr:
              (f = e.slice(t, h)),
                f.slice(-1) === "/" && ((r.closed = !0), (f = f.slice(0, -1)));
            case un:
              l === un && (f = o),
                l == ln
                  ? (s.warning('attribute "' + f + '" missed quot(")!!'),
                    r.add(o, f.replace(/&#?\w+;/g, a), t))
                  : ((n[""] !== "http://www.w3.org/1999/xhtml" ||
                      !f.match(/^(?:disabled|checked|selected)$/i)) &&
                      s.warning(
                        'attribute "' +
                          f +
                          '" missed value!! "' +
                          f +
                          '" instead!!'
                      ),
                    r.add(f, f, t));
              break;
            case ni:
              throw new Error("attribute value missed!!");
          }
          return h;
        case "\x80":
          c = " ";
        default:
          if (c <= " ")
            switch (l) {
              case ri:
                r.setTagName(e.slice(t, h)), (l = ii);
                break;
              case hr:
                (o = e.slice(t, h)), (l = un);
                break;
              case ln:
                var f = e.slice(t, h).replace(/&#?\w+;/g, a);
                s.warning('attribute "' + f + '" missed quot(")!!'),
                  r.add(o, f, t);
              case hn:
                l = ii;
                break;
            }
          else
            switch (l) {
              case un:
                var m = r.tagName;
                (n[""] !== "http://www.w3.org/1999/xhtml" ||
                  !o.match(/^(?:disabled|checked|selected)$/i)) &&
                  s.warning(
                    'attribute "' +
                      o +
                      '" missed value!! "' +
                      o +
                      '" instead2!!'
                  ),
                  r.add(o, o, t),
                  (t = h),
                  (l = hr);
                break;
              case hn:
                s.warning('attribute space is required"' + o + '"!!');
              case ii:
                (l = hr), (t = h);
                break;
              case ni:
                (l = ln), (t = h);
                break;
              case la:
                throw new Error(
                  "elements closed character '/' and '>' must be connected to"
                );
            }
      }
      h++;
    }
  }
  function wp(e, t, r) {
    for (var n = e.tagName, a = null, s = e.length; s--; ) {
      var o = e[s],
        f = o.qName,
        h = o.value,
        v = f.indexOf(":");
      if (v > 0)
        var l = (o.prefix = f.slice(0, v)),
          c = f.slice(v + 1),
          m = l === "xmlns" && c;
      else (c = f), (l = null), (m = f === "xmlns" && "");
      (o.localName = c),
        m !== !1 &&
          (a == null && ((a = {}), yp(r, (r = {}))),
          (r[m] = a[m] = h),
          (o.uri = "http://www.w3.org/2000/xmlns/"),
          t.startPrefixMapping(m, h));
    }
    for (var s = e.length; s--; ) {
      o = e[s];
      var l = o.prefix;
      l &&
        (l === "xml" && (o.uri = "http://www.w3.org/XML/1998/namespace"),
        l !== "xmlns" && (o.uri = r[l || ""]));
    }
    var v = n.indexOf(":");
    v > 0
      ? ((l = e.prefix = n.slice(0, v)), (c = e.localName = n.slice(v + 1)))
      : ((l = null), (c = e.localName = n));
    var x = (e.uri = r[l || ""]);
    if ((t.startElement(x, c, n, e), e.closed)) {
      if ((t.endElement(x, c, n), a)) for (l in a) t.endPrefixMapping(l);
    } else return (e.currentNSMap = r), (e.localNSMap = a), !0;
  }
  function tw(e, t, r, n, a) {
    if (/^(?:script|textarea)$/i.test(r)) {
      var s = e.indexOf("</" + r + ">", t),
        o = e.substring(t + 1, s);
      if (/[&<]/.test(o))
        return /^script$/i.test(r)
          ? (a.characters(o, 0, o.length), s)
          : ((o = o.replace(/&#?\w+;/g, n)), a.characters(o, 0, o.length), s);
    }
    return t + 1;
  }
  function rw(e, t, r, n) {
    var a = n[r];
    return (
      a == null &&
        ((a = e.lastIndexOf("</" + r + ">")),
        a < t && (a = e.lastIndexOf("</" + r)),
        (n[r] = a)),
      a < t
    );
  }
  function yp(e, t) {
    for (var r in e) t[r] = e[r];
  }
  function nw(e, t, r, n) {
    var a = e.charAt(t + 2);
    switch (a) {
      case "-":
        if (e.charAt(t + 3) === "-") {
          var s = e.indexOf("-->", t + 4);
          return s > t
            ? (r.comment(e, t + 4, s - t - 4), s + 3)
            : (n.error("Unclosed comment"), -1);
        } else return -1;
      default:
        if (e.substr(t + 3, 6) == "CDATA[") {
          var s = e.indexOf("]]>", t + 9);
          return (
            r.startCDATA(),
            r.characters(e, t + 9, s - t - 9),
            r.endCDATA(),
            s + 3
          );
        }
        var o = aw(e, t),
          f = o.length;
        if (f > 1 && /!doctype/i.test(o[0][0])) {
          var h = o[1][0],
            l = f > 3 && /^public$/i.test(o[2][0]) && o[3][0],
            c = f > 4 && o[4][0],
            m = o[f - 1];
          return (
            r.startDTD(
              h,
              l && l.replace(/^(['"])(.*?)\1$/, "$2"),
              c && c.replace(/^(['"])(.*?)\1$/, "$2")
            ),
            r.endDTD(),
            m.index + m[0].length
          );
        }
    }
    return -1;
  }
  function iw(e, t, r) {
    var n = e.indexOf("?>", t);
    if (n) {
      var a = e.substring(t, n).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
      if (a) {
        var s = a[0].length;
        return r.processingInstruction(a[1], a[2]), n + 2;
      } else return -1;
    }
    return -1;
  }
  function _p(e) {}
  _p.prototype = {
    setTagName: function (e) {
      if (!mp.test(e)) throw new Error("invalid tagName:" + e);
      this.tagName = e;
    },
    add: function (e, t, r) {
      if (!mp.test(e)) throw new Error("invalid attribute:" + e);
      this[this.length++] = { qName: e, value: t, offset: r };
    },
    length: 0,
    getLocalName: function (e) {
      return this[e].localName;
    },
    getLocator: function (e) {
      return this[e].locator;
    },
    getQName: function (e) {
      return this[e].qName;
    },
    getURI: function (e) {
      return this[e].uri;
    },
    getValue: function (e) {
      return this[e].value;
    },
  };
  function ha(e, t) {
    return (e.__proto__ = t), e;
  }
  ha({}, ha.prototype) instanceof ha ||
    (ha = function (e, t) {
      function r() {}
      (r.prototype = t), (r = new r());
      for (t in e) r[t] = e[t];
      return r;
    });
  function aw(e, t) {
    var r,
      n = [],
      a = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
    for (a.lastIndex = t, a.exec(e); (r = a.exec(e)); )
      if ((n.push(r), r[1])) return n;
  }
  Ep.XMLReader = vp;
});
var jo = A((Wo) => {
  function ai(e, t) {
    for (var r in e) t[r] = e[r];
  }
  function $e(e, t) {
    var r = e.prototype;
    if (Object.create) {
      var n = Object.create(t.prototype);
      r.__proto__ = n;
    }
    if (!(r instanceof t)) {
      let s = function () {};
      var a = s;
      (s.prototype = t.prototype),
        (s = new s()),
        ai(r, s),
        (e.prototype = r = s);
    }
    r.constructor != e &&
      (typeof e != "function" && console.error("unknow Class:" + e),
      (r.constructor = e));
  }
  var sw = "http://www.w3.org/1999/xhtml",
    Qe = {},
    It = (Qe.ELEMENT_NODE = 1),
    cn = (Qe.ATTRIBUTE_NODE = 2),
    ca = (Qe.TEXT_NODE = 3),
    Ap = (Qe.CDATA_SECTION_NODE = 4),
    Sp = (Qe.ENTITY_REFERENCE_NODE = 5),
    ow = (Qe.ENTITY_NODE = 6),
    Tp = (Qe.PROCESSING_INSTRUCTION_NODE = 7),
    Rp = (Qe.COMMENT_NODE = 8),
    Cp = (Qe.DOCUMENT_NODE = 9),
    Np = (Qe.DOCUMENT_TYPE_NODE = 10),
    Vt = (Qe.DOCUMENT_FRAGMENT_NODE = 11),
    uw = (Qe.NOTATION_NODE = 12),
    Le = {},
    Re = {},
    i_ = (Le.INDEX_SIZE_ERR = ((Re[1] = "Index size error"), 1)),
    a_ = (Le.DOMSTRING_SIZE_ERR = ((Re[2] = "DOMString size error"), 2)),
    fw = (Le.HIERARCHY_REQUEST_ERR = ((Re[3] = "Hierarchy request error"), 3)),
    s_ = (Le.WRONG_DOCUMENT_ERR = ((Re[4] = "Wrong document"), 4)),
    o_ = (Le.INVALID_CHARACTER_ERR = ((Re[5] = "Invalid character"), 5)),
    u_ = (Le.NO_DATA_ALLOWED_ERR = ((Re[6] = "No data allowed"), 6)),
    f_ = (Le.NO_MODIFICATION_ALLOWED_ERR =
      ((Re[7] = "No modification allowed"), 7)),
    lw = (Le.NOT_FOUND_ERR = ((Re[8] = "Not found"), 8)),
    l_ = (Le.NOT_SUPPORTED_ERR = ((Re[9] = "Not supported"), 9)),
    Ip = (Le.INUSE_ATTRIBUTE_ERR = ((Re[10] = "Attribute in use"), 10)),
    h_ = (Le.INVALID_STATE_ERR = ((Re[11] = "Invalid state"), 11)),
    c_ = (Le.SYNTAX_ERR = ((Re[12] = "Syntax error"), 12)),
    p_ = (Le.INVALID_MODIFICATION_ERR =
      ((Re[13] = "Invalid modification"), 13)),
    d_ = (Le.NAMESPACE_ERR = ((Re[14] = "Invalid namespace"), 14)),
    g_ = (Le.INVALID_ACCESS_ERR = ((Re[15] = "Invalid access"), 15));
  function pn(e, t) {
    if (t instanceof Error) var r = t;
    else
      (r = this),
        Error.call(this, Re[e]),
        (this.message = Re[e]),
        Error.captureStackTrace && Error.captureStackTrace(this, pn);
    return (r.code = e), t && (this.message = this.message + ": " + t), r;
  }
  pn.prototype = Error.prototype;
  ai(Le, pn);
  function cr() {}
  cr.prototype = {
    length: 0,
    item: function (e) {
      return this[e] || null;
    },
    toString: function (e, t) {
      for (var r = [], n = 0; n < this.length; n++) gn(this[n], r, e, t);
      return r.join("");
    },
  };
  function si(e, t) {
    (this._node = e), (this._refresh = t), Po(this);
  }
  function Po(e) {
    var t = e._node._inc || e._node.ownerDocument._inc;
    if (e._inc != t) {
      var r = e._refresh(e._node);
      Vp(e, "length", r.length), ai(r, e), (e._inc = t);
    }
  }
  si.prototype.item = function (e) {
    return Po(this), this[e];
  };
  $e(si, cr);
  function pa() {}
  function Dp(e, t) {
    for (var r = e.length; r--; ) if (e[r] === t) return r;
  }
  function Op(e, t, r, n) {
    if ((n ? (t[Dp(t, n)] = r) : (t[t.length++] = r), e)) {
      r.ownerElement = e;
      var a = e.ownerDocument;
      a && (n && Bp(a, e, n), hw(a, e, r));
    }
  }
  function Pp(e, t, r) {
    var n = Dp(t, r);
    if (n >= 0) {
      for (var a = t.length - 1; n < a; ) t[n] = t[++n];
      if (((t.length = a), e)) {
        var s = e.ownerDocument;
        s && (Bp(s, e, r), (r.ownerElement = null));
      }
    } else throw pn(lw, new Error(e.tagName + "@" + r));
  }
  pa.prototype = {
    length: 0,
    item: cr.prototype.item,
    getNamedItem: function (e) {
      for (var t = this.length; t--; ) {
        var r = this[t];
        if (r.nodeName == e) return r;
      }
    },
    setNamedItem: function (e) {
      var t = e.ownerElement;
      if (t && t != this._ownerElement) throw new pn(Ip);
      var r = this.getNamedItem(e.nodeName);
      return Op(this._ownerElement, this, e, r), r;
    },
    setNamedItemNS: function (e) {
      var t = e.ownerElement,
        r;
      if (t && t != this._ownerElement) throw new pn(Ip);
      return (
        (r = this.getNamedItemNS(e.namespaceURI, e.localName)),
        Op(this._ownerElement, this, e, r),
        r
      );
    },
    removeNamedItem: function (e) {
      var t = this.getNamedItem(e);
      return Pp(this._ownerElement, this, t), t;
    },
    removeNamedItemNS: function (e, t) {
      var r = this.getNamedItemNS(e, t);
      return Pp(this._ownerElement, this, r), r;
    },
    getNamedItemNS: function (e, t) {
      for (var r = this.length; r--; ) {
        var n = this[r];
        if (n.localName == t && n.namespaceURI == e) return n;
      }
      return null;
    },
  };
  function kp(e) {
    if (((this._features = {}), e)) for (var t in e) this._features = e[t];
  }
  kp.prototype = {
    hasFeature: function (e, t) {
      var r = this._features[e.toLowerCase()];
      return !!(r && (!t || t in r));
    },
    createDocument: function (e, t, r) {
      var n = new oi();
      if (
        ((n.implementation = this),
        (n.childNodes = new cr()),
        (n.doctype = r),
        r && n.appendChild(r),
        t)
      ) {
        var a = n.createElementNS(e, t);
        n.appendChild(a);
      }
      return n;
    },
    createDocumentType: function (e, t, r) {
      var n = new qo();
      return (
        (n.name = e), (n.nodeName = e), (n.publicId = t), (n.systemId = r), n
      );
    },
  };
  function je() {}
  je.prototype = {
    firstChild: null,
    lastChild: null,
    previousSibling: null,
    nextSibling: null,
    attributes: null,
    parentNode: null,
    childNodes: null,
    ownerDocument: null,
    nodeValue: null,
    namespaceURI: null,
    prefix: null,
    localName: null,
    insertBefore: function (e, t) {
      return qp(this, e, t);
    },
    replaceChild: function (e, t) {
      this.insertBefore(e, t), t && this.removeChild(t);
    },
    removeChild: function (e) {
      return Lp(this, e);
    },
    appendChild: function (e) {
      return this.insertBefore(e, null);
    },
    hasChildNodes: function () {
      return this.firstChild != null;
    },
    cloneNode: function (e) {
      return zo(this.ownerDocument || this, this, e);
    },
    normalize: function () {
      for (var e = this.firstChild; e; ) {
        var t = e.nextSibling;
        t && t.nodeType == ca && e.nodeType == ca
          ? (this.removeChild(t), e.appendData(t.data))
          : (e.normalize(), (e = t));
      }
    },
    isSupported: function (e, t) {
      return this.ownerDocument.implementation.hasFeature(e, t);
    },
    hasAttributes: function () {
      return this.attributes.length > 0;
    },
    lookupPrefix: function (e) {
      for (var t = this; t; ) {
        var r = t._nsMap;
        if (r) {
          for (var n in r) if (r[n] == e) return n;
        }
        t = t.nodeType == cn ? t.ownerDocument : t.parentNode;
      }
      return null;
    },
    lookupNamespaceURI: function (e) {
      for (var t = this; t; ) {
        var r = t._nsMap;
        if (r && e in r) return r[e];
        t = t.nodeType == cn ? t.ownerDocument : t.parentNode;
      }
      return null;
    },
    isDefaultNamespace: function (e) {
      var t = this.lookupPrefix(e);
      return t == null;
    },
  };
  function Fp(e) {
    return (
      (e == "<" && "&lt;") ||
      (e == ">" && "&gt;") ||
      (e == "&" && "&amp;") ||
      (e == '"' && "&quot;") ||
      "&#" + e.charCodeAt() + ";"
    );
  }
  ai(Qe, je);
  ai(Qe, je.prototype);
  function da(e, t) {
    if (t(e)) return !0;
    if ((e = e.firstChild))
      do if (da(e, t)) return !0;
      while ((e = e.nextSibling));
  }
  function oi() {}
  function hw(e, t, r) {
    e && e._inc++;
    var n = r.namespaceURI;
    n == "http://www.w3.org/2000/xmlns/" &&
      (t._nsMap[r.prefix ? r.localName : ""] = r.value);
  }
  function Bp(e, t, r, n) {
    e && e._inc++;
    var a = r.namespaceURI;
    a == "http://www.w3.org/2000/xmlns/" &&
      delete t._nsMap[r.prefix ? r.localName : ""];
  }
  function ko(e, t, r) {
    if (e && e._inc) {
      e._inc++;
      var n = t.childNodes;
      if (r) n[n.length++] = r;
      else {
        for (var a = t.firstChild, s = 0; a; )
          (n[s++] = a), (a = a.nextSibling);
        n.length = s;
      }
    }
  }
  function Lp(e, t) {
    var r = t.previousSibling,
      n = t.nextSibling;
    return (
      r ? (r.nextSibling = n) : (e.firstChild = n),
      n ? (n.previousSibling = r) : (e.lastChild = r),
      ko(e.ownerDocument, e),
      t
    );
  }
  function qp(e, t, r) {
    var n = t.parentNode;
    if ((n && n.removeChild(t), t.nodeType === Vt)) {
      var a = t.firstChild;
      if (a == null) return t;
      var s = t.lastChild;
    } else a = s = t;
    var o = r ? r.previousSibling : e.lastChild;
    (a.previousSibling = o),
      (s.nextSibling = r),
      o ? (o.nextSibling = a) : (e.firstChild = a),
      r == null ? (e.lastChild = s) : (r.previousSibling = s);
    do a.parentNode = e;
    while (a !== s && (a = a.nextSibling));
    return (
      ko(e.ownerDocument || e, e),
      t.nodeType == Vt && (t.firstChild = t.lastChild = null),
      t
    );
  }
  function cw(e, t) {
    var r = t.parentNode;
    if (r) {
      var n = e.lastChild;
      r.removeChild(t);
      var n = e.lastChild;
    }
    var n = e.lastChild;
    return (
      (t.parentNode = e),
      (t.previousSibling = n),
      (t.nextSibling = null),
      n ? (n.nextSibling = t) : (e.firstChild = t),
      (e.lastChild = t),
      ko(e.ownerDocument, e, t),
      t
    );
  }
  oi.prototype = {
    nodeName: "#document",
    nodeType: Cp,
    doctype: null,
    documentElement: null,
    _inc: 1,
    insertBefore: function (e, t) {
      if (e.nodeType == Vt) {
        for (var r = e.firstChild; r; ) {
          var n = r.nextSibling;
          this.insertBefore(r, t), (r = n);
        }
        return e;
      }
      return (
        this.documentElement == null &&
          e.nodeType == It &&
          (this.documentElement = e),
        qp(this, e, t),
        (e.ownerDocument = this),
        e
      );
    },
    removeChild: function (e) {
      return (
        this.documentElement == e && (this.documentElement = null), Lp(this, e)
      );
    },
    importNode: function (e, t) {
      return Hp(this, e, t);
    },
    getElementById: function (e) {
      var t = null;
      return (
        da(this.documentElement, function (r) {
          if (r.nodeType == It && r.getAttribute("id") == e) return (t = r), !0;
        }),
        t
      );
    },
    createElement: function (e) {
      var t = new dn();
      (t.ownerDocument = this),
        (t.nodeName = e),
        (t.tagName = e),
        (t.childNodes = new cr());
      var r = (t.attributes = new pa());
      return (r._ownerElement = t), t;
    },
    createDocumentFragment: function () {
      var e = new ma();
      return (e.ownerDocument = this), (e.childNodes = new cr()), e;
    },
    createTextNode: function (e) {
      var t = new Fo();
      return (t.ownerDocument = this), t.appendData(e), t;
    },
    createComment: function (e) {
      var t = new Bo();
      return (t.ownerDocument = this), t.appendData(e), t;
    },
    createCDATASection: function (e) {
      var t = new Lo();
      return (t.ownerDocument = this), t.appendData(e), t;
    },
    createProcessingInstruction: function (e, t) {
      var r = new Mo();
      return (
        (r.ownerDocument = this),
        (r.tagName = r.target = e),
        (r.nodeValue = r.data = t),
        r
      );
    },
    createAttribute: function (e) {
      var t = new ga();
      return (
        (t.ownerDocument = this),
        (t.name = e),
        (t.nodeName = e),
        (t.localName = e),
        (t.specified = !0),
        t
      );
    },
    createEntityReference: function (e) {
      var t = new Uo();
      return (t.ownerDocument = this), (t.nodeName = e), t;
    },
    createElementNS: function (e, t) {
      var r = new dn(),
        n = t.split(":"),
        a = (r.attributes = new pa());
      return (
        (r.childNodes = new cr()),
        (r.ownerDocument = this),
        (r.nodeName = t),
        (r.tagName = t),
        (r.namespaceURI = e),
        n.length == 2
          ? ((r.prefix = n[0]), (r.localName = n[1]))
          : (r.localName = t),
        (a._ownerElement = r),
        r
      );
    },
    createAttributeNS: function (e, t) {
      var r = new ga(),
        n = t.split(":");
      return (
        (r.ownerDocument = this),
        (r.nodeName = t),
        (r.name = t),
        (r.namespaceURI = e),
        (r.specified = !0),
        n.length == 2
          ? ((r.prefix = n[0]), (r.localName = n[1]))
          : (r.localName = t),
        r
      );
    },
  };
  $e(oi, je);
  function dn() {
    this._nsMap = {};
  }
  dn.prototype = {
    nodeType: It,
    hasAttribute: function (e) {
      return this.getAttributeNode(e) != null;
    },
    getAttribute: function (e) {
      var t = this.getAttributeNode(e);
      return (t && t.value) || "";
    },
    getAttributeNode: function (e) {
      return this.attributes.getNamedItem(e);
    },
    setAttribute: function (e, t) {
      var r = this.ownerDocument.createAttribute(e);
      (r.value = r.nodeValue = "" + t), this.setAttributeNode(r);
    },
    removeAttribute: function (e) {
      var t = this.getAttributeNode(e);
      t && this.removeAttributeNode(t);
    },
    appendChild: function (e) {
      return e.nodeType === Vt ? this.insertBefore(e, null) : cw(this, e);
    },
    setAttributeNode: function (e) {
      return this.attributes.setNamedItem(e);
    },
    setAttributeNodeNS: function (e) {
      return this.attributes.setNamedItemNS(e);
    },
    removeAttributeNode: function (e) {
      return this.attributes.removeNamedItem(e.nodeName);
    },
    removeAttributeNS: function (e, t) {
      var r = this.getAttributeNodeNS(e, t);
      r && this.removeAttributeNode(r);
    },
    hasAttributeNS: function (e, t) {
      return this.getAttributeNodeNS(e, t) != null;
    },
    getAttributeNS: function (e, t) {
      var r = this.getAttributeNodeNS(e, t);
      return (r && r.value) || "";
    },
    setAttributeNS: function (e, t, r) {
      var n = this.ownerDocument.createAttributeNS(e, t);
      (n.value = n.nodeValue = "" + r), this.setAttributeNode(n);
    },
    getAttributeNodeNS: function (e, t) {
      return this.attributes.getNamedItemNS(e, t);
    },
    getElementsByTagName: function (e) {
      return new si(this, function (t) {
        var r = [];
        return (
          da(t, function (n) {
            n !== t &&
              n.nodeType == It &&
              (e === "*" || n.tagName == e) &&
              r.push(n);
          }),
          r
        );
      });
    },
    getElementsByTagNameNS: function (e, t) {
      return new si(this, function (r) {
        var n = [];
        return (
          da(r, function (a) {
            a !== r &&
              a.nodeType === It &&
              (e === "*" || a.namespaceURI === e) &&
              (t === "*" || a.localName == t) &&
              n.push(a);
          }),
          n
        );
      });
    },
  };
  oi.prototype.getElementsByTagName = dn.prototype.getElementsByTagName;
  oi.prototype.getElementsByTagNameNS = dn.prototype.getElementsByTagNameNS;
  $e(dn, je);
  function ga() {}
  ga.prototype.nodeType = cn;
  $e(ga, je);
  function ui() {}
  ui.prototype = {
    data: "",
    substringData: function (e, t) {
      return this.data.substring(e, e + t);
    },
    appendData: function (e) {
      (e = this.data + e),
        (this.nodeValue = this.data = e),
        (this.length = e.length);
    },
    insertData: function (e, t) {
      this.replaceData(e, 0, t);
    },
    appendChild: function (e) {
      throw new Error(Re[fw]);
    },
    deleteData: function (e, t) {
      this.replaceData(e, t, "");
    },
    replaceData: function (e, t, r) {
      var n = this.data.substring(0, e),
        a = this.data.substring(e + t);
      (r = n + r + a),
        (this.nodeValue = this.data = r),
        (this.length = r.length);
    },
  };
  $e(ui, je);
  function Fo() {}
  Fo.prototype = {
    nodeName: "#text",
    nodeType: ca,
    splitText: function (e) {
      var t = this.data,
        r = t.substring(e);
      (t = t.substring(0, e)),
        (this.data = this.nodeValue = t),
        (this.length = t.length);
      var n = this.ownerDocument.createTextNode(r);
      return (
        this.parentNode && this.parentNode.insertBefore(n, this.nextSibling), n
      );
    },
  };
  $e(Fo, ui);
  function Bo() {}
  Bo.prototype = { nodeName: "#comment", nodeType: Rp };
  $e(Bo, ui);
  function Lo() {}
  Lo.prototype = { nodeName: "#cdata-section", nodeType: Ap };
  $e(Lo, ui);
  function qo() {}
  qo.prototype.nodeType = Np;
  $e(qo, je);
  function Up() {}
  Up.prototype.nodeType = uw;
  $e(Up, je);
  function Mp() {}
  Mp.prototype.nodeType = ow;
  $e(Mp, je);
  function Uo() {}
  Uo.prototype.nodeType = Sp;
  $e(Uo, je);
  function ma() {}
  ma.prototype.nodeName = "#document-fragment";
  ma.prototype.nodeType = Vt;
  $e(ma, je);
  function Mo() {}
  Mo.prototype.nodeType = Tp;
  $e(Mo, je);
  function zp() {}
  zp.prototype.serializeToString = function (e, t, r) {
    return Wp.call(e, t, r);
  };
  je.prototype.toString = Wp;
  function Wp(e, t) {
    var r = [],
      n = this.nodeType == 9 ? this.documentElement : this,
      a = n.prefix,
      s = n.namespaceURI;
    if (s && a == null) {
      var a = n.lookupPrefix(s);
      if (a == null) var o = [{ namespace: s, prefix: null }];
    }
    return gn(this, r, e, t, o), r.join("");
  }
  function jp(e, t, r) {
    var n = e.prefix || "",
      a = e.namespaceURI;
    if (
      (!n && !a) ||
      (n === "xml" && a === "http://www.w3.org/XML/1998/namespace") ||
      a == "http://www.w3.org/2000/xmlns/"
    )
      return !1;
    for (var s = r.length; s--; ) {
      var o = r[s];
      if (o.prefix == n) return o.namespace != a;
    }
    return !0;
  }
  function gn(e, t, r, n, a) {
    if (n)
      if (((e = n(e)), e)) {
        if (typeof e == "string") {
          t.push(e);
          return;
        }
      } else return;
    switch (e.nodeType) {
      case It:
        a || (a = []);
        var s = a.length,
          o = e.attributes,
          f = o.length,
          h = e.firstChild,
          l = e.tagName;
        (r = sw === e.namespaceURI || r), t.push("<", l);
        for (var c = 0; c < f; c++) {
          var m = o.item(c);
          m.prefix == "xmlns"
            ? a.push({ prefix: m.localName, namespace: m.value })
            : m.nodeName == "xmlns" &&
              a.push({ prefix: "", namespace: m.value });
        }
        for (var c = 0; c < f; c++) {
          var m = o.item(c);
          if (jp(m, r, a)) {
            var v = m.prefix || "",
              x = m.namespaceURI,
              p = v ? " xmlns:" + v : " xmlns";
            t.push(p, '="', x, '"'), a.push({ prefix: v, namespace: x });
          }
          gn(m, t, r, n, a);
        }
        if (jp(e, r, a)) {
          var v = e.prefix || "",
            x = e.namespaceURI,
            p = v ? " xmlns:" + v : " xmlns";
          t.push(p, '="', x, '"'), a.push({ prefix: v, namespace: x });
        }
        if (h || (r && !/^(?:meta|link|img|br|hr|input)$/i.test(l))) {
          if ((t.push(">"), r && /^script$/i.test(l)))
            for (; h; )
              h.data ? t.push(h.data) : gn(h, t, r, n, a), (h = h.nextSibling);
          else for (; h; ) gn(h, t, r, n, a), (h = h.nextSibling);
          t.push("</", l, ">");
        } else t.push("/>");
        return;
      case Cp:
      case Vt:
        for (var h = e.firstChild; h; ) gn(h, t, r, n, a), (h = h.nextSibling);
        return;
      case cn:
        return t.push(" ", e.name, '="', e.value.replace(/[<&"]/g, Fp), '"');
      case ca:
        return t.push(e.data.replace(/[<&]/g, Fp));
      case Ap:
        return t.push("<![CDATA[", e.data, "]]>");
      case Rp:
        return t.push("<!--", e.data, "-->");
      case Np:
        var _ = e.publicId,
          E = e.systemId;
        if ((t.push("<!DOCTYPE ", e.name), _))
          t.push(' PUBLIC "', _),
            E && E != "." && t.push('" "', E),
            t.push('">');
        else if (E && E != ".") t.push(' SYSTEM "', E, '">');
        else {
          var b = e.internalSubset;
          b && t.push(" [", b, "]"), t.push(">");
        }
        return;
      case Tp:
        return t.push("<?", e.target, " ", e.data, "?>");
      case Sp:
        return t.push("&", e.nodeName, ";");
      default:
        t.push("??", e.nodeName);
    }
  }
  function Hp(e, t, r) {
    var n;
    switch (t.nodeType) {
      case It:
        (n = t.cloneNode(!1)), (n.ownerDocument = e);
      case Vt:
        break;
      case cn:
        r = !0;
        break;
    }
    if (
      (n || (n = t.cloneNode(!1)),
      (n.ownerDocument = e),
      (n.parentNode = null),
      r)
    )
      for (var a = t.firstChild; a; )
        n.appendChild(Hp(e, a, r)), (a = a.nextSibling);
    return n;
  }
  function zo(e, t, r) {
    var n = new t.constructor();
    for (var a in t) {
      var s = t[a];
      typeof s != "object" && s != n[a] && (n[a] = s);
    }
    switch (
      (t.childNodes && (n.childNodes = new cr()),
      (n.ownerDocument = e),
      n.nodeType)
    ) {
      case It:
        var o = t.attributes,
          f = (n.attributes = new pa()),
          h = o.length;
        f._ownerElement = n;
        for (var l = 0; l < h; l++) n.setAttributeNode(zo(e, o.item(l), !0));
        break;
      case cn:
        r = !0;
    }
    if (r)
      for (var c = t.firstChild; c; )
        n.appendChild(zo(e, c, r)), (c = c.nextSibling);
    return n;
  }
  function Vp(e, t, r) {
    e[t] = r;
  }
  try {
    if (Object.defineProperty) {
      let e = function (t) {
        switch (t.nodeType) {
          case It:
          case Vt:
            var r = [];
            for (t = t.firstChild; t; )
              t.nodeType !== 7 && t.nodeType !== 8 && r.push(e(t)),
                (t = t.nextSibling);
            return r.join("");
          default:
            return t.nodeValue;
        }
      };
      (m_ = e),
        Object.defineProperty(si.prototype, "length", {
          get: function () {
            return Po(this), this.$$length;
          },
        }),
        Object.defineProperty(je.prototype, "textContent", {
          get: function () {
            return e(this);
          },
          set: function (t) {
            switch (this.nodeType) {
              case It:
              case Vt:
                for (; this.firstChild; ) this.removeChild(this.firstChild);
                (t || String(t)) &&
                  this.appendChild(this.ownerDocument.createTextNode(t));
                break;
              default:
                (this.data = t), (this.value = t), (this.nodeValue = t);
            }
          },
        }),
        (Vp = function (t, r, n) {
          t["$$" + r] = n;
        });
    }
  } catch {}
  var m_;
  Wo.DOMImplementation = kp;
  Wo.XMLSerializer = zp;
});
var Xp = A((ya) => {
  function Gp(e) {
    this.options = e || { locator: {} };
  }
  Gp.prototype.parseFromString = function (e, t) {
    var r = this.options,
      n = new dw(),
      a = r.domBuilder || new va(),
      s = r.errorHandler,
      o = r.locator,
      f = r.xmlns || {},
      h = { lt: "<", gt: ">", amp: "&", quot: '"', apos: "'" };
    return (
      o && a.setDocumentLocator(o),
      (n.errorHandler = pw(s, a, o)),
      (n.domBuilder = r.domBuilder || a),
      /\/x?html?$/.test(t) &&
        ((h.nbsp = "\xA0"),
        (h.copy = "\xA9"),
        (f[""] = "http://www.w3.org/1999/xhtml")),
      (f.xml = f.xml || "http://www.w3.org/XML/1998/namespace"),
      e ? n.parse(e, f, h) : n.errorHandler.error("invalid doc source"),
      a.doc
    );
  };
  function pw(e, t, r) {
    if (!e) {
      if (t instanceof va) return t;
      e = t;
    }
    var n = {},
      a = e instanceof Function;
    r = r || {};
    function s(o) {
      var f = e[o];
      !f &&
        a &&
        (f =
          e.length == 2
            ? function (h) {
                e(o, h);
              }
            : e),
        (n[o] =
          (f &&
            function (h) {
              f("[xmldom " + o + "]	" + h + xa(r));
            }) ||
          function () {});
    }
    return s("warning"), s("error"), s("fatalError"), n;
  }
  function va() {
    this.cdata = !1;
  }
  function mn(e, t) {
    (t.lineNumber = e.lineNumber), (t.columnNumber = e.columnNumber);
  }
  va.prototype = {
    startDocument: function () {
      (this.doc = new gw().createDocument(null, null, null)),
        this.locator && (this.doc.documentURI = this.locator.systemId);
    },
    startElement: function (e, t, r, n) {
      var a = this.doc,
        s = a.createElementNS(e, r || t),
        o = n.length;
      wa(this, s),
        (this.currentElement = s),
        this.locator && mn(this.locator, s);
      for (var f = 0; f < o; f++) {
        var e = n.getURI(f),
          h = n.getValue(f),
          r = n.getQName(f),
          l = a.createAttributeNS(e, r);
        this.locator && mn(n.getLocator(f), l),
          (l.value = l.nodeValue = h),
          s.setAttributeNode(l);
      }
    },
    endElement: function (e, t, r) {
      var n = this.currentElement,
        a = n.tagName;
      this.currentElement = n.parentNode;
    },
    startPrefixMapping: function (e, t) {},
    endPrefixMapping: function (e) {},
    processingInstruction: function (e, t) {
      var r = this.doc.createProcessingInstruction(e, t);
      this.locator && mn(this.locator, r), wa(this, r);
    },
    ignorableWhitespace: function (e, t, r) {},
    characters: function (e, t, r) {
      if (((e = Zp.apply(this, arguments)), e)) {
        if (this.cdata) var n = this.doc.createCDATASection(e);
        else var n = this.doc.createTextNode(e);
        this.currentElement
          ? this.currentElement.appendChild(n)
          : /^\s*$/.test(e) && this.doc.appendChild(n),
          this.locator && mn(this.locator, n);
      }
    },
    skippedEntity: function (e) {},
    endDocument: function () {
      this.doc.normalize();
    },
    setDocumentLocator: function (e) {
      (this.locator = e) && (e.lineNumber = 0);
    },
    comment: function (e, t, r) {
      e = Zp.apply(this, arguments);
      var n = this.doc.createComment(e);
      this.locator && mn(this.locator, n), wa(this, n);
    },
    startCDATA: function () {
      this.cdata = !0;
    },
    endCDATA: function () {
      this.cdata = !1;
    },
    startDTD: function (e, t, r) {
      var n = this.doc.implementation;
      if (n && n.createDocumentType) {
        var a = n.createDocumentType(e, t, r);
        this.locator && mn(this.locator, a), wa(this, a);
      }
    },
    warning: function (e) {
      console.warn("[xmldom warning]	" + e, xa(this.locator));
    },
    error: function (e) {
      console.error("[xmldom error]	" + e, xa(this.locator));
    },
    fatalError: function (e) {
      throw (console.error("[xmldom fatalError]	" + e, xa(this.locator)), e);
    },
  };
  function xa(e) {
    if (e)
      return (
        `
@` +
        (e.systemId || "") +
        "#[line:" +
        e.lineNumber +
        ",col:" +
        e.columnNumber +
        "]"
      );
  }
  function Zp(e, t, r) {
    return typeof e == "string"
      ? e.substr(t, r)
      : e.length >= t + r || t
      ? new java.lang.String(e, t, r) + ""
      : e;
  }
  "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(
    /\w+/g,
    function (e) {
      va.prototype[e] = function () {
        return null;
      };
    }
  );
  function wa(e, t) {
    e.currentElement ? e.currentElement.appendChild(t) : e.doc.appendChild(t);
  }
  var dw = bp().XMLReader,
    gw = (ya.DOMImplementation = jo().DOMImplementation);
  ya.XMLSerializer = jo().XMLSerializer;
  ya.DOMParser = Gp;
});
var fi = A((vn) => {
  var mw = ti().select;
  function vw(e, t, r) {
    for (var n = 0; n < e.attributes.length; n++) {
      var a = e.attributes[n];
      if (yw(a, t, r) || _w(a, t, r, e)) return a;
    }
    return null;
  }
  function xw(e, t) {
    var r = mw(t, e);
    if (r.length == 0) throw "could not find xpath " + t;
    return r[0];
  }
  function ww(e, t, r) {
    e = e.documentElement || e;
    for (var n = [], a = 0; a < e.childNodes.length; a++) {
      var s = e.childNodes[a];
      s.localName == t && (s.namespaceURI == r || !r) && n.push(s);
    }
    return n;
  }
  function yw(e, t, r) {
    return e.localName == t && (e.namespaceURI == r || !r);
  }
  function _w(e, t, r, n) {
    return e.localName == t && ((!e.namespaceURI && n.namespaceURI == r) || !r);
  }
  var Ew = {
      "&": "&amp;",
      "<": "&lt;",
      '"': "&quot;",
      "\r": "&#xD;",
      "\n": "&#xA;",
      "	": "&#x9;",
    },
    bw = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\r": "&#xD;" };
  function Aw(e) {
    return e
      .replace(/[\r\n\t ]+/g, " ")
      .replace(/([&<"\r\n\t])/g, function (t, r) {
        return Ew[r];
      });
  }
  function Sw(e) {
    return e
      .replace(
        /\r\n?/g,
        `
`
      )
      .replace(/([&<>\r])/g, function (t, r) {
        return bw[r];
      });
  }
  vn.findAttr = vw;
  vn.findChilds = ww;
  vn.encodeSpecialCharactersInAttribute = Aw;
  vn.encodeSpecialCharactersInText = Sw;
  vn.findFirst = xw;
});
var Kp = A((_a) => {
  var Ho = fi();
  _a.C14nCanonicalization = vt;
  _a.C14nCanonicalizationWithComments = xn;
  function vt() {
    this.includeComments = !1;
  }
  vt.prototype.attrCompare = function (e, t) {
    if (!e.namespaceURI && t.namespaceURI) return -1;
    if (!t.namespaceURI && e.namespaceURI) return 1;
    var r = e.namespaceURI + e.localName,
      n = t.namespaceURI + t.localName;
    return r === n ? 0 : r < n ? -1 : 1;
  };
  vt.prototype.nsCompare = function (e, t) {
    var r = e.prefix,
      n = t.prefix;
    return r == n ? 0 : r.localeCompare(n);
  };
  vt.prototype.renderAttrs = function (e, t) {
    var r,
      n,
      a,
      s = [],
      o = [];
    if (e.nodeType === 8) return this.renderComment(e);
    if (e.attributes)
      for (n = 0; n < e.attributes.length; ++n)
        (a = e.attributes[n]), a.name.indexOf("xmlns") !== 0 && o.push(a);
    o.sort(this.attrCompare);
    for (r in o)
      !o.hasOwnProperty(r) ||
        ((a = o[r]),
        s.push(
          " ",
          a.name,
          '="',
          Ho.encodeSpecialCharactersInAttribute(a.value),
          '"'
        ));
    return s.join("");
  };
  vt.prototype.renderNs = function (e, t, r, n, a) {
    var s,
      o,
      f,
      h,
      l = [],
      c = r,
      m = [],
      v = e.namespaceURI || "";
    if (
      (e.prefix
        ? t.indexOf(e.prefix) == -1 &&
          (m.push({
            prefix: e.prefix,
            namespaceURI: e.namespaceURI || n[e.prefix],
          }),
          t.push(e.prefix))
        : r != v && ((c = e.namespaceURI), l.push(' xmlns="', c, '"')),
      e.attributes)
    )
      for (o = 0; o < e.attributes.length; ++o)
        (h = e.attributes[o]),
          h.prefix === "xmlns" &&
            t.indexOf(h.localName) === -1 &&
            (m.push({ prefix: h.localName, namespaceURI: h.value }),
            t.push(h.localName)),
          h.prefix &&
            t.indexOf(h.prefix) == -1 &&
            h.prefix != "xmlns" &&
            h.prefix != "xml" &&
            (m.push({ prefix: h.prefix, namespaceURI: h.namespaceURI }),
            t.push(h.prefix));
    if (Array.isArray(a) && a.length > 0) {
      for (var x in a)
        if (!!a.hasOwnProperty(x)) {
          var p = !1;
          for (var _ in m)
            m[_].prefix === a[x].prefix &&
              m[_].namespaceURI === a[x].namespaceURI &&
              (p = !0);
          p || m.push(a[x]);
        }
    }
    m.sort(this.nsCompare);
    for (s in m)
      !m.hasOwnProperty(s) ||
        ((f = m[s]), l.push(" xmlns:", f.prefix, '="', f.namespaceURI, '"'));
    return { rendered: l.join(""), newDefaultNs: c };
  };
  vt.prototype.processInner = function (e, t, r, n, a) {
    if (e.nodeType === 8) return this.renderComment(e);
    if (e.data) return Ho.encodeSpecialCharactersInText(e.data);
    var s,
      o,
      f = this.renderNs(e, t, r, n, a),
      h = [
        "<",
        e.tagName,
        f.rendered,
        this.renderAttrs(e, f.newDefaultNs),
        ">",
      ];
    for (s = 0; s < e.childNodes.length; ++s)
      (o = t.slice(0)),
        h.push(this.processInner(e.childNodes[s], o, f.newDefaultNs, n, []));
    return h.push("</", e.tagName, ">"), h.join("");
  };
  vt.prototype.renderComment = function (e) {
    if (!this.includeComments) return "";
    var t = e.ownerDocument === e.parentNode,
      r = null,
      n = null;
    if (t) {
      for (var a = e, s = e; a !== null; ) {
        if (a === e.ownerDocument.documentElement) {
          r = !0;
          break;
        }
        a = a.nextSibling;
      }
      for (; s !== null; ) {
        if (s === e.ownerDocument.documentElement) {
          n = !0;
          break;
        }
        s = s.previousSibling;
      }
    }
    return (
      (n
        ? `
`
        : "") +
      "<!--" +
      Ho.encodeSpecialCharactersInText(e.data) +
      "-->" +
      (r
        ? `
`
        : "")
    );
  };
  vt.prototype.process = function (e, t) {
    t = t || {};
    var r = t.defaultNs || "",
      n = t.defaultNsForPrefix || {},
      a = t.ancestorNamespaces || [],
      s = this.processInner(e, [], r, n, a);
    return s;
  };
  vt.prototype.getAlgorithmName = function () {
    return "http://www.w3.org/TR/2001/REC-xml-c14n-20010315";
  };
  _a.C14nCanonicalizationWithComments = xn;
  function xn() {
    vt.call(this), (this.includeComments = !0);
  }
  xn.prototype = Object.create(vt.prototype);
  xn.prototype.constructor = xn;
  xn.prototype.getAlgorithmName = function () {
    return "http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments";
  };
});
var Yp = A((Ea) => {
  var Vo = fi();
  Ea.ExclusiveCanonicalization = xt;
  Ea.ExclusiveCanonicalizationWithComments = wn;
  function xt() {
    this.includeComments = !1;
  }
  xt.prototype.attrCompare = function (e, t) {
    if (!e.namespaceURI && t.namespaceURI) return -1;
    if (!t.namespaceURI && e.namespaceURI) return 1;
    var r = e.namespaceURI + e.localName,
      n = t.namespaceURI + t.localName;
    return r === n ? 0 : r < n ? -1 : 1;
  };
  xt.prototype.nsCompare = function (e, t) {
    var r = e.prefix,
      n = t.prefix;
    return r == n ? 0 : r.localeCompare(n);
  };
  xt.prototype.renderAttrs = function (e, t) {
    var r,
      n,
      a,
      s = [],
      o = [];
    if (e.nodeType === 8) return this.renderComment(e);
    if (e.attributes)
      for (n = 0; n < e.attributes.length; ++n)
        (a = e.attributes[n]), a.name.indexOf("xmlns") !== 0 && o.push(a);
    o.sort(this.attrCompare);
    for (r in o)
      !o.hasOwnProperty(r) ||
        ((a = o[r]),
        s.push(
          " ",
          a.name,
          '="',
          Vo.encodeSpecialCharactersInAttribute(a.value),
          '"'
        ));
    return s.join("");
  };
  function Go(e, t, r) {
    var n = !1;
    return (
      e.forEach(function (a) {
        a.prefix === t && a.namespaceURI === r && (n = !0);
      }),
      n
    );
  }
  xt.prototype.renderNs = function (e, t, r, n, a) {
    var s,
      o,
      f,
      h,
      l = [],
      c = r,
      m = [],
      v = e.namespaceURI || "";
    if (
      (e.prefix
        ? Go(t, e.prefix, e.namespaceURI || n[e.prefix]) ||
          (m.push({
            prefix: e.prefix,
            namespaceURI: e.namespaceURI || n[e.prefix],
          }),
          t.push({
            prefix: e.prefix,
            namespaceURI: e.namespaceURI || n[e.prefix],
          }))
        : r != v && ((c = e.namespaceURI), l.push(' xmlns="', c, '"')),
      e.attributes)
    )
      for (o = 0; o < e.attributes.length; ++o)
        (h = e.attributes[o]),
          h.prefix &&
            !Go(t, h.localName, h.value) &&
            a.indexOf(h.localName) >= 0 &&
            (m.push({ prefix: h.localName, namespaceURI: h.value }),
            t.push({ prefix: h.localName, namespaceURI: h.value })),
          h.prefix &&
            !Go(t, h.prefix, h.namespaceURI) &&
            h.prefix != "xmlns" &&
            h.prefix != "xml" &&
            (m.push({ prefix: h.prefix, namespaceURI: h.namespaceURI }),
            t.push({ prefix: h.prefix, namespaceURI: h.namespaceURI }));
    m.sort(this.nsCompare);
    for (s in m)
      !m.hasOwnProperty(s) ||
        ((f = m[s]), l.push(" xmlns:", f.prefix, '="', f.namespaceURI, '"'));
    return { rendered: l.join(""), newDefaultNs: c };
  };
  xt.prototype.processInner = function (e, t, r, n, a) {
    if (e.nodeType === 8) return this.renderComment(e);
    if (e.data) return Vo.encodeSpecialCharactersInText(e.data);
    var s,
      o,
      f = this.renderNs(e, t, r, n, a),
      h = [
        "<",
        e.tagName,
        f.rendered,
        this.renderAttrs(e, f.newDefaultNs),
        ">",
      ];
    for (s = 0; s < e.childNodes.length; ++s)
      (o = t.slice(0)),
        h.push(this.processInner(e.childNodes[s], o, f.newDefaultNs, n, a));
    return h.push("</", e.tagName, ">"), h.join("");
  };
  xt.prototype.renderComment = function (e) {
    if (!this.includeComments) return "";
    var t = e.ownerDocument === e.parentNode,
      r = null,
      n = null;
    if (t) {
      for (var a = e, s = e; a !== null; ) {
        if (a === e.ownerDocument.documentElement) {
          r = !0;
          break;
        }
        a = a.nextSibling;
      }
      for (; s !== null; ) {
        if (s === e.ownerDocument.documentElement) {
          n = !0;
          break;
        }
        s = s.previousSibling;
      }
    }
    return (
      (n
        ? `
`
        : "") +
      "<!--" +
      Vo.encodeSpecialCharactersInText(e.data) +
      "-->" +
      (r
        ? `
`
        : "")
    );
  };
  xt.prototype.process = function (e, t) {
    t = t || {};
    var r = t.inclusiveNamespacesPrefixList || [],
      n = t.defaultNs || "",
      a = t.defaultNsForPrefix || {};
    r instanceof Array || (r = r.split(" "));
    var s = this.processInner(e, [], n, a, r);
    return s;
  };
  xt.prototype.getAlgorithmName = function () {
    return "http://www.w3.org/2001/10/xml-exc-c14n#";
  };
  Ea.ExclusiveCanonicalizationWithComments = wn;
  function wn() {
    xt.call(this), (this.includeComments = !0);
  }
  wn.prototype = Object.create(xt.prototype);
  wn.prototype.constructor = wn;
  wn.prototype.getAlgorithmName = function () {
    return "http://www.w3.org/2001/10/xml-exc-c14n#WithComments";
  };
});
var ed = A((Jp) => {
  var $p = ti(),
    Qp = fi();
  Jp.EnvelopedSignature = Zo;
  function Zo() {}
  Zo.prototype.process = function (e, t) {
    if (t.signatureNode == null) {
      var r = $p.select(
        "./*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']",
        e
      )[0];
      return r && r.parentNode.removeChild(r), e;
    }
    var n = t.signatureNode,
      a = Qp.findFirst(n, ".//*[local-name(.)='SignatureValue']/text()").data,
      s = $p.select(
        ".//*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']",
        e
      );
    for (var o in s)
      if (!!s.hasOwnProperty(o)) {
        var r = s[o],
          f = Qp.findFirst(
            r,
            ".//*[local-name(.)='SignatureValue']/text()"
          ).data;
        a === f && r.parentNode.removeChild(r);
      }
    return e;
  };
  Zo.prototype.getAlgorithmName = function () {
    return "http://www.w3.org/2000/09/xmldsig#enveloped-signature";
  };
});
var ad = A((Ko) => {
  var Gt = ti(),
    li = Xp().DOMParser,
    ft = fi(),
    td = Kp(),
    rd = Yp(),
    Tw = ed().EnvelopedSignature,
    wt = require("crypto"),
    Rw = require("fs");
  Ko.SignedXml = se;
  Ko.FileKeyInfo = Cw;
  function Cw(e) {
    (this.file = e),
      (this.getKeyInfo = function (t, r) {
        return (
          (r = r || ""),
          (r = r && r + ":"),
          "<" + r + "X509Data></" + r + "X509Data>"
        );
      }),
      (this.getKey = function (t) {
        return Rw.readFileSync(this.file);
      });
  }
  function Nw() {
    (this.getHash = function (e) {
      var t = wt.createHash("sha1");
      t.update(e, "utf8");
      var r = t.digest("base64");
      return r;
    }),
      (this.getAlgorithmName = function () {
        return "http://www.w3.org/2000/09/xmldsig#sha1";
      });
  }
  function Iw() {
    (this.getHash = function (e) {
      var t = wt.createHash("sha256");
      t.update(e, "utf8");
      var r = t.digest("base64");
      return r;
    }),
      (this.getAlgorithmName = function () {
        return "http://www.w3.org/2001/04/xmlenc#sha256";
      });
  }
  function Dw() {
    (this.getHash = function (e) {
      var t = wt.createHash("sha512");
      t.update(e, "utf8");
      var r = t.digest("base64");
      return r;
    }),
      (this.getAlgorithmName = function () {
        return "http://www.w3.org/2001/04/xmlenc#sha512";
      });
  }
  function Ow() {
    (this.getSignature = function (e, t) {
      var r = wt.createSign("RSA-SHA1");
      r.update(e);
      var n = r.sign(t, "base64");
      return n;
    }),
      (this.verifySignature = function (e, t, r) {
        var n = wt.createVerify("RSA-SHA1");
        n.update(e);
        var a = n.verify(t, r, "base64");
        return a;
      }),
      (this.getAlgorithmName = function () {
        return "http://www.w3.org/2000/09/xmldsig#rsa-sha1";
      });
  }
  function Pw() {
    (this.getSignature = function (e, t) {
      var r = wt.createSign("RSA-SHA256");
      r.update(e);
      var n = r.sign(t, "base64");
      return n;
    }),
      (this.verifySignature = function (e, t, r) {
        var n = wt.createVerify("RSA-SHA256");
        n.update(e);
        var a = n.verify(t, r, "base64");
        return a;
      }),
      (this.getAlgorithmName = function () {
        return "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256";
      });
  }
  function kw() {
    (this.getSignature = function (e, t) {
      var r = wt.createSign("RSA-SHA512");
      r.update(e);
      var n = r.sign(t, "base64");
      return n;
    }),
      (this.verifySignature = function (e, t, r) {
        var n = wt.createVerify("RSA-SHA512");
        n.update(e);
        var a = n.verify(t, r, "base64");
        return a;
      }),
      (this.getAlgorithmName = function () {
        return "http://www.w3.org/2001/04/xmldsig-more#rsa-sha512";
      });
  }
  function Fw() {
    (this.verifySignature = function (e, t, r) {
      var n = wt.createHmac("SHA1", t);
      n.update(e);
      var a = n.digest("base64");
      return a === r;
    }),
      (this.getAlgorithmName = function () {
        return "http://www.w3.org/2000/09/xmldsig#hmac-sha1";
      }),
      (this.getSignature = function (e, t) {
        var r = wt.createHmac("SHA1", t);
        r.update(e);
        var n = r.digest("base64");
        return n;
      });
  }
  function Xo(e, t) {
    var r = Gt.select(t, e);
    if (!Array.isArray(r) || r.length < 1) return [];
    for (var n = nd(r[0]), a = [], s = 0; s < n.length; s++) {
      var o = !0;
      for (var f in a)
        if (a[f].prefix === n[s].prefix) {
          o = !1;
          break;
        }
      o && a.push(n[s]);
    }
    for (var h = [], l = r[0].attributes, c = 0; c < a.length; c++) {
      for (var m = !0, v = 0; v < l.length; v++) {
        var x = l[v].nodeName;
        if (x.search(/^xmlns:/) !== -1) {
          var p = x.replace(/^xmlns:/, "");
          if (a[c].prefix === p) {
            m = !1;
            break;
          }
        }
      }
      m && h.push(a[c]);
    }
    return h;
  }
  function nd(e, t) {
    t || (t = []);
    var r = e.parentNode;
    if (!r) return t;
    if (r.attributes && r.attributes.length > 0)
      for (var n = 0; n < r.attributes.length; n++) {
        var a = r.attributes[n];
        a &&
          a.nodeName &&
          a.nodeName.search(/^xmlns:/) !== -1 &&
          t.push({
            prefix: a.nodeName.replace(/^xmlns:/, ""),
            namespaceURI: a.nodeValue,
          });
      }
    return nd(r, t);
  }
  function se(e, t) {
    (this.options = t || {}),
      (this.idMode = e),
      (this.references = []),
      (this.id = 0),
      (this.signingKey = null),
      (this.signatureAlgorithm =
        this.options.signatureAlgorithm ||
        "http://www.w3.org/2000/09/xmldsig#rsa-sha1"),
      (this.keyInfoProvider = null),
      (this.canonicalizationAlgorithm =
        this.options.canonicalizationAlgorithm ||
        "http://www.w3.org/2001/10/xml-exc-c14n#"),
      (this.signedXml = ""),
      (this.signatureXml = ""),
      (this.signatureNode = null),
      (this.signatureValue = ""),
      (this.originalXmlWithIds = ""),
      (this.validationErrors = []),
      (this.keyInfo = null),
      (this.idAttributes = ["Id", "ID", "id"]),
      this.options.idAttribute &&
        this.idAttributes.splice(0, 0, this.options.idAttribute),
      (this.implicitTransforms = this.options.implicitTransforms || []);
  }
  se.CanonicalizationAlgorithms = {
    "http://www.w3.org/TR/2001/REC-xml-c14n-20010315": td.C14nCanonicalization,
    "http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments":
      td.C14nCanonicalizationWithComments,
    "http://www.w3.org/2001/10/xml-exc-c14n#": rd.ExclusiveCanonicalization,
    "http://www.w3.org/2001/10/xml-exc-c14n#WithComments":
      rd.ExclusiveCanonicalizationWithComments,
    "http://www.w3.org/2000/09/xmldsig#enveloped-signature": Tw,
  };
  se.HashAlgorithms = {
    "http://www.w3.org/2000/09/xmldsig#sha1": Nw,
    "http://www.w3.org/2001/04/xmlenc#sha256": Iw,
    "http://www.w3.org/2001/04/xmlenc#sha512": Dw,
  };
  se.SignatureAlgorithms = {
    "http://www.w3.org/2000/09/xmldsig#rsa-sha1": Ow,
    "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256": Pw,
    "http://www.w3.org/2001/04/xmldsig-more#rsa-sha512": kw,
    "http://www.w3.org/2000/09/xmldsig#hmac-sha1": Fw,
  };
  se.defaultNsForPrefix = { ds: "http://www.w3.org/2000/09/xmldsig#" };
  se.findAncestorNs = Xo;
  se.prototype.checkSignature = function (e) {
    if (
      ((this.validationErrors = []),
      (this.signedXml = e),
      !this.keyInfoProvider)
    )
      throw new Error(
        "cannot validate signature since no key info resolver was provided"
      );
    if (
      ((this.signingKey = this.keyInfoProvider.getKey(this.keyInfo)),
      !this.signingKey)
    )
      throw new Error(
        "key info provider could not resolve key info " + this.keyInfo
      );
    var t = new li().parseFromString(e);
    return !(!this.validateReferences(t) || !this.validateSignatureValue(t));
  };
  se.prototype.validateSignatureValue = function (e) {
    var t = ft.findChilds(this.signatureNode, "SignedInfo");
    if (t.length == 0)
      throw new Error("could not find SignedInfo element in the message");
    var r = [];
    if (
      this.canonicalizationAlgorithm ===
        "http://www.w3.org/TR/2001/REC-xml-c14n-20010315" ||
      this.canonicalizationAlgorithm ===
        "http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments"
    ) {
      if (!e || typeof e != "object")
        throw new Error(
          "When canonicalization method is non-exclusive, whole xml dom must be provided as an argument"
        );
      r = Xo(e, "//*[local-name()='SignedInfo']");
    }
    var n = { ancestorNamespaces: r },
      a = this.getCanonXml([this.canonicalizationAlgorithm], t[0], n),
      s = this.findSignatureAlgorithm(this.signatureAlgorithm),
      o = s.verifySignature(a, this.signingKey, this.signatureValue);
    return (
      o ||
        this.validationErrors.push(
          "invalid signature: the signature value " +
            this.signatureValue +
            " is incorrect"
        ),
      o
    );
  };
  se.prototype.findSignatureAlgorithm = function (e) {
    var t = se.SignatureAlgorithms[e];
    if (t) return new t();
    throw new Error("signature algorithm '" + e + "' is not supported");
  };
  se.prototype.findCanonicalizationAlgorithm = function (e) {
    var t = se.CanonicalizationAlgorithms[e];
    if (t) return new t();
    throw new Error("canonicalization algorithm '" + e + "' is not supported");
  };
  se.prototype.findHashAlgorithm = function (e) {
    var t = se.HashAlgorithms[e];
    if (t) return new t();
    throw new Error("hash algorithm '" + e + "' is not supported");
  };
  se.prototype.validateReferences = function (e) {
    for (var t in this.references)
      if (!!this.references.hasOwnProperty(t)) {
        var r = this.references[t],
          n = r.uri[0] == "#" ? r.uri.substring(1) : r.uri,
          a = [],
          s;
        if (n == "") a = Gt.select("//*", e);
        else {
          if (n.indexOf("'") != -1)
            throw new Error("Cannot validate a uri with quotes inside it");
          var o = 0;
          for (var f in this.idAttributes)
            if (!!this.idAttributes.hasOwnProperty(f)) {
              var h =
                  "//*[@*[local-name(.)='" +
                  this.idAttributes[f] +
                  "']='" +
                  n +
                  "']",
                l = Gt.select(h, e);
              (o += l.length), l.length > 0 && ((a = l), (s = h));
            }
          if (o > 1)
            throw new Error(
              "Cannot validate a document which contains multiple elements with the same value for the ID / Id / Id attributes, in order to prevent signature wrapping attack."
            );
        }
        if (a.length == 0)
          return (
            this.validationErrors.push(
              "invalid signature: the signature refernces an element with uri " +
                r.uri +
                " but could not find such element in the xml"
            ),
            !1
          );
        if (Array.isArray(r.transforms)) {
          var c = !1;
          for (var m in r.transforms)
            if (
              !!r.transforms.hasOwnProperty(m) &&
              (r.transforms[m] ===
                "http://www.w3.org/TR/2001/REC-xml-c14n-20010315" ||
                r.transforms[m] ===
                  "http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments")
            ) {
              c = !0;
              break;
            }
          c && (r.ancestorNamespaces = Xo(e, s));
        }
        var v = {
            inclusiveNamespacesPrefixList: r.inclusiveNamespacesPrefixList,
            ancestorNamespaces: r.ancestorNamespaces,
          },
          x = this.getCanonXml(r.transforms, a[0], v),
          p = this.findHashAlgorithm(r.digestAlgorithm),
          _ = p.getHash(x);
        if (!id(_, r.digestValue) && r.inclusiveNamespacesPrefixList) {
          var E =
              r.inclusiveNamespacesPrefixList instanceof Array
                ? r.inclusiveNamespacesPrefixList
                : r.inclusiveNamespacesPrefixList.split(" "),
            b = {
              xs: "http://www.w3.org/2001/XMLSchema",
              xsi: "http://www.w3.org/2001/XMLSchema-instance",
              saml: "urn:oasis:names:tc:SAML:2.0:assertion",
            };
          if (
            (E.forEach(function (W) {
              b[W] &&
                a[0].setAttributeNS(
                  "http://www.w3.org/2000/xmlns/",
                  "xmlns:" + W,
                  b[W]
                );
            }),
            (x = this.getCanonXml(r.transforms, a[0], {
              inclusiveNamespacesPrefixList: r.inclusiveNamespacesPrefixList,
            })),
            (_ = p.getHash(x)),
            _ === r.digestValue)
          )
            return !0;
        }
        if (!id(_, r.digestValue))
          return (
            this.validationErrors.push(
              "invalid signature: for uri " +
                r.uri +
                " calculated digest is " +
                _ +
                " but the xml to validate supplies digest " +
                r.digestValue
            ),
            !1
          );
      }
    return !0;
  };
  function id(e, t) {
    var r,
      n,
      a = /^v(\d+)/.exec(process.version)[1];
    if (
      (+a >= 6
        ? ((r = Buffer.from(e, "base64")), (n = Buffer.from(t, "base64")))
        : ((r = new Buffer(e, "base64")), (n = new Buffer(t, "base64"))),
      typeof r.equals == "function")
    )
      return r.equals(n);
    if (r.length !== n.length) return !1;
    for (var s = 0; s < r.length; s++) if (r[s] !== n[s]) return !1;
    return !0;
  }
  se.prototype.loadSignature = function (e) {
    typeof e == "string"
      ? (this.signatureNode = e = new li().parseFromString(e))
      : (this.signatureNode = e),
      (this.signatureXml = e.toString());
    var t = Gt.select(
      ".//*[local-name(.)='CanonicalizationMethod']/@Algorithm",
      e
    );
    if (t.length == 0)
      throw new Error(
        "could not find CanonicalizationMethod/@Algorithm element"
      );
    (this.canonicalizationAlgorithm = t[0].value),
      (this.signatureAlgorithm = ft.findFirst(
        e,
        ".//*[local-name(.)='SignatureMethod']/@Algorithm"
      ).value),
      (this.references = []);
    var r = Gt.select(
      ".//*[local-name(.)='SignedInfo']/*[local-name(.)='Reference']",
      e
    );
    if (r.length == 0) throw new Error("could not find any Reference elements");
    for (var n in r) !r.hasOwnProperty(n) || this.loadReference(r[n]);
    (this.signatureValue = ft
      .findFirst(e, ".//*[local-name(.)='SignatureValue']/text()")
      .data.replace(/\r?\n/g, "")),
      (this.keyInfo = Gt.select(".//*[local-name(.)='KeyInfo']", e));
  };
  se.prototype.loadReference = function (e) {
    var t = ft.findChilds(e, "DigestMethod");
    if (t.length == 0)
      throw new Error(
        "could not find DigestMethod in reference " + e.toString()
      );
    var r = t[0],
      n = ft.findAttr(r, "Algorithm");
    if (!n)
      throw new Error(
        "could not find Algorithm attribute in node " + r.toString()
      );
    var a = n.value;
    if (((t = ft.findChilds(e, "DigestValue")), t.length == 0))
      throw new Error(
        "could not find DigestValue node in reference " + e.toString()
      );
    if (t[0].childNodes.length == 0 || !t[0].firstChild.data)
      throw new Error(
        "could not find the value of DigestValue in " + t[0].toString()
      );
    var s = t[0].firstChild.data,
      o = [],
      f;
    if (((t = ft.findChilds(e, "Transforms")), t.length != 0)) {
      var h = t[0],
        l = ft.findChilds(h, "Transform");
      for (var c in l)
        if (!!l.hasOwnProperty(c)) {
          var m = l[c];
          o.push(ft.findAttr(m, "Algorithm").value);
        }
      var v = Gt.select("//*[local-name(.)='InclusiveNamespaces']", h);
      v.length > 0 && (f = v[0].getAttribute("PrefixList"));
    }
    var x =
      Array.isArray(this.implicitTransforms) &&
      this.implicitTransforms.length > 0;
    x &&
      this.implicitTransforms.forEach(function (p) {
        o.push(p);
      }),
      (o.length === 0 ||
        o[o.length - 1] ===
          "http://www.w3.org/2000/09/xmldsig#enveloped-signature") &&
        o.push("http://www.w3.org/TR/2001/REC-xml-c14n-20010315"),
      this.addReference(null, o, a, ft.findAttr(e, "URI").value, s, f, !1);
  };
  se.prototype.addReference = function (e, t, r, n, a, s, o) {
    this.references.push({
      xpath: e,
      transforms: t || ["http://www.w3.org/2001/10/xml-exc-c14n#"],
      digestAlgorithm: r || "http://www.w3.org/2000/09/xmldsig#sha1",
      uri: n,
      digestValue: a,
      inclusiveNamespacesPrefixList: s,
      isEmptyUri: o,
    });
  };
  se.prototype.computeSignature = function (e, t) {
    var r = new li().parseFromString(e),
      n = "xmlns",
      a = [],
      s,
      o,
      f,
      h,
      l = ["append", "prepend", "before", "after"];
    if (
      ((t = t || {}),
      (f = t.prefix),
      (o = t.attrs || {}),
      (s = t.location || {}),
      (existingPrefixes = t.existingPrefixes || {}),
      (s.reference = s.reference || "/*"),
      (s.action = s.action || "append"),
      l.indexOf(s.action) === -1)
    )
      throw new Error(
        "location.action option has an invalid action: " +
          s.action +
          ", must be any of the following values: " +
          l.join(", ")
      );
    f ? ((n += ":" + f), (h = f + ":")) : (h = ""),
      Object.keys(o).forEach(function (_) {
        _ !== "xmlns" && _ !== n && a.push(_ + '="' + o[_] + '"');
      }),
      a.push(n + '="http://www.w3.org/2000/09/xmldsig#"'),
      (this.signatureXml = "<" + h + "Signature " + a.join(" ") + ">");
    var c = this.createSignedInfo(r, f);
    (this.signatureXml += c),
      (this.signatureXml += this.createSignature(c, f)),
      (this.signatureXml += this.getKeyInfo(f)),
      (this.signatureXml += "</" + h + "Signature>"),
      (this.originalXmlWithIds = r.toString());
    var m = "";
    Object.keys(existingPrefixes).forEach(function (_) {
      m += "xmlns:" + _ + '="' + existingPrefixes[_] + '" ';
    });
    var v = "<Dummy " + m + ">" + this.signatureXml + "</Dummy>",
      e = new li().parseFromString(v),
      x = e.documentElement.firstChild,
      p = Gt.select(s.reference, r);
    if (!p || p.length === 0)
      throw new Error(
        "the following xpath cannot be used because it was not found: " +
          s.reference
      );
    (p = p[0]),
      s.action === "append"
        ? p.appendChild(x)
        : s.action === "prepend"
        ? p.insertBefore(x, p.firstChild)
        : s.action === "before"
        ? p.parentNode.insertBefore(x, p)
        : s.action === "after" && p.parentNode.insertBefore(x, p.nextSibling),
      (this.signedXml = r.toString());
  };
  se.prototype.getKeyInfo = function (e) {
    var t = "",
      r;
    return (
      (r = e || ""),
      (r = r && r + ":"),
      this.keyInfoProvider &&
        ((t += "<" + r + "KeyInfo>"),
        (t += this.keyInfoProvider.getKeyInfo(this.signingKey, e)),
        (t += "</" + r + "KeyInfo>")),
      t
    );
  };
  se.prototype.createReferences = function (e, t) {
    var r = "";
    (t = t || ""), (t = t && t + ":");
    for (var n in this.references)
      if (!!this.references.hasOwnProperty(n)) {
        var a = this.references[n],
          s = Gt.select(a.xpath, e);
        if (s.length == 0)
          throw new Error(
            "the following xpath cannot be signed because it was not found: " +
              a.xpath
          );
        for (var o in s)
          if (!!s.hasOwnProperty(o)) {
            var f = s[o];
            if (a.isEmptyUri) r += "<" + t + 'Reference URI="">';
            else {
              var h = this.ensureHasId(f);
              (a.uri = h), (r += "<" + t + 'Reference URI="#' + h + '">');
            }
            r += "<" + t + "Transforms>";
            for (var l in a.transforms)
              if (!!a.transforms.hasOwnProperty(l)) {
                var c = a.transforms[l],
                  m = this.findCanonicalizationAlgorithm(c);
                r +=
                  "<" +
                  t +
                  'Transform Algorithm="' +
                  m.getAlgorithmName() +
                  '" />';
              }
            var v = this.getCanonXml(a.transforms, f),
              x = this.findHashAlgorithm(a.digestAlgorithm);
            r +=
              "</" +
              t +
              "Transforms><" +
              t +
              'DigestMethod Algorithm="' +
              x.getAlgorithmName() +
              '" /><' +
              t +
              "DigestValue>" +
              x.getHash(v) +
              "</" +
              t +
              "DigestValue></" +
              t +
              "Reference>";
          }
      }
    return r;
  };
  se.prototype.getCanonXml = function (e, t, r) {
    (r = r || {}),
      (r.defaultNsForPrefix = r.defaultNsForPrefix || se.defaultNsForPrefix),
      (r.signatureNode = this.signatureNode);
    var n = t.cloneNode(!0);
    for (var a in e)
      if (!!e.hasOwnProperty(a)) {
        var s = this.findCanonicalizationAlgorithm(e[a]);
        n = s.process(n, r);
      }
    return n.toString();
  };
  se.prototype.ensureHasId = function (e) {
    var t;
    if (this.idMode == "wssecurity")
      t = ft.findAttr(
        e,
        "Id",
        "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd"
      );
    else
      for (var r in this.idAttributes)
        if (
          !!this.idAttributes.hasOwnProperty(r) &&
          ((t = ft.findAttr(e, this.idAttributes[r], null)), t)
        )
          break;
    if (t) return t.value;
    var n = "_" + this.id++;
    return (
      this.idMode == "wssecurity"
        ? (e.setAttributeNS(
            "http://www.w3.org/2000/xmlns/",
            "xmlns:wsu",
            "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd"
          ),
          e.setAttributeNS(
            "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd",
            "wsu:Id",
            n
          ))
        : e.setAttribute("Id", n),
      n
    );
  };
  se.prototype.createSignedInfo = function (e, t) {
    var r = this.findCanonicalizationAlgorithm(this.canonicalizationAlgorithm),
      n = this.findSignatureAlgorithm(this.signatureAlgorithm),
      a;
    (a = t || ""), (a = a && a + ":");
    var s = "<" + a + "SignedInfo>";
    return (
      (s +=
        "<" +
        a +
        'CanonicalizationMethod Algorithm="' +
        r.getAlgorithmName() +
        '" /><' +
        a +
        'SignatureMethod Algorithm="' +
        n.getAlgorithmName() +
        '" />'),
      (s += this.createReferences(e, t)),
      (s += "</" + a + "SignedInfo>"),
      s
    );
  };
  se.prototype.createSignature = function (e, t) {
    var r = "xmlns";
    t ? ((r += ":" + t), (t += ":")) : (t = "");
    var n =
        "<" +
        t +
        "Signature " +
        r +
        '="http://www.w3.org/2000/09/xmldsig#">' +
        e +
        "</" +
        t +
        "Signature>",
      a = new li().parseFromString(n),
      s = a.documentElement.firstChild,
      o = new this.findCanonicalizationAlgorithm(
        this.canonicalizationAlgorithm
      ),
      f = o.process(s),
      h = this.findSignatureAlgorithm(this.signatureAlgorithm);
    return (
      (this.signatureValue = h.getSignature(f, this.signingKey)),
      "<" +
        t +
        "SignatureValue>" +
        this.signatureValue +
        "</" +
        t +
        "SignatureValue>"
    );
  };
  se.prototype.getSignatureXml = function () {
    return this.signatureXml;
  };
  se.prototype.getOriginalXmlWithIds = function () {
    return this.originalXmlWithIds;
  };
  se.prototype.getSignedXml = function () {
    return this.signedXml;
  };
});
var sd = A((A_, Yo) => {
  var Bw = ti().select;
  Yo.exports = ad();
  Yo.exports.xpath = function (e, t) {
    return Bw(t, e);
  };
});
var pd = A((cE, ru) => {
  var Lw = require("fs"),
    qw = require("path");
  function ld(e) {
    console.log(`[dotenv][DEBUG] ${e}`);
  }
  var hd = `
`,
    Uw = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/,
    Mw = /\\n/g;
  function cd(e, t) {
    let r = Boolean(t && t.debug),
      n = {};
    return (
      e
        .toString()
        .split(hd)
        .forEach(function (a, s) {
          let o = a.match(Uw);
          if (o != null) {
            let f = o[1],
              h = o[2] || "",
              l = h.length - 1,
              c = h[0] === '"' && h[l] === '"';
            (h[0] === "'" && h[l] === "'") || c
              ? ((h = h.substring(1, l)), c && (h = h.replace(Mw, hd)))
              : (h = h.trim()),
              (n[f] = h);
          } else r && ld(`did not match key and value when parsing line ${s + 1}: ${a}`);
        }),
      n
    );
  }
  function zw(e) {
    let t = qw.resolve(process.cwd(), ".env"),
      r = "utf8",
      n = !1;
    e &&
      (e.path != null && (t = e.path),
      e.encoding != null && (r = e.encoding),
      e.debug != null && (n = !0));
    try {
      let a = cd(Lw.readFileSync(t, { encoding: r }), { debug: n });
      return (
        Object.keys(a).forEach(function (s) {
          process.env.hasOwnProperty(s)
            ? n &&
              ld(
                `"${s}" is already defined in \`process.env\` and will not be overwritten`
              )
            : (process.env[s] = a[s]);
        }),
        { parsed: a }
      );
    } catch (a) {
      return { error: a };
    }
  }
  ru.exports.config = zw;
  ru.exports.parse = cd;
});
var Xe = ((x) => (
  (x.Capability = "capability"),
  (x.Connect = "connect"),
  (x.Debug = "debug"),
  (x.Exists = "exists"),
  (x.Install = "install"),
  (x.RmFile = "rmfile"),
  (x.Run = "run"),
  (x.Sysinfo = "sysinfo"),
  (x.Uninstall = "uninstall"),
  (x.GetAppId = "getappid"),
  (x.Unpack = "unpack"),
  (x.Sign = "sign"),
  (x.Pack = "pack"),
  x
))(Xe || {});
function hi(e) {
  return e === "getappid" || e === "unpack" || e === "sign" || e === "pack";
}
var ci = ((r) => ((r.Repack = "--sign"), (r.Clean = "--clean"), r))(ci || {});
var Ca = class {
  constructor(t, r, n, a, s, o) {
    (this.ip = t),
      (this.command = r),
      (this.arg1 = n),
      (this.arg2 = a),
      (this.sign = s),
      (this.clean = o);
  }
};
var Na = Ze(require("net"));
function su() {
  let e = Bd(),
    t = e[0];
  (0, Na.isIP)(t) ||
    ((t = (0, Na.isIP)(process.env.TIZEN_IP) ? process.env.TIZEN_IP : null),
    e.unshift(t));
  let r = ou(e, ci.Repack),
    n = ou(e, ci.Clean),
    a = e[1],
    s = e[2] ? e[2] : "",
    o = e[3] ? e[3] : "";
  return !a || (!t && !hi(a)) ? null : new Ca(t, a, s, o, r, n);
}
function Bd() {
  let e = process.env.TIZENTOOL_ARGS;
  return e && e.length && e.indexOf(",") > 0
    ? JSON.parse(e)
    : Array.from(process.argv).slice(2);
}
function ou(e, t) {
  let r = e.indexOf(t);
  return r > -1 ? (e.splice(r, 1), !0) : !1;
}
var he = ((r) => ((r.Debug = "DEBUG"), (r.Info = "INFO"), r))(he || {});
var uu = Ze(require("path"));
function Ia() {
  let e = uu.dirname(process.argv[1]);
  return (
    process.argv.forEach((t) => {
      t.startsWith("--app-path=") && (e = t.substr(11));
    }),
    e
  );
}
function Q(e, t = he.Info) {
  z(e, t), process.env.TIZENTOOL_ARGS ? console.log("<EOS>") : process.exit(0);
}
function z(e, t = he.Info) {
  (t == he.Info || process.env.LOG_LEVEL == t) && console.log(e);
}
function fu() {
  z(`
Usage:`),
    z("tizentool [remote_ip] command arg1"),
    z("TIZEN_IP=remote_ip tizentool command arg1"),
    z(`
WGT processing:`),
    z('tizentool getappid "path/to/tizen.wgt"'),
    z('tizentool sign "path/to/tizen.wgt" "path/to/signed-tizen.wgt"'),
    z('tizentool unpack "path/to/tizen.wgt" "target/folder"'),
    z('tizentool pack "target/folder" "path/to/signed-tizen.wgt" [--sign]'),
    z(`
Device operations:`),
    z('tizentool 10.2.1.254 debug "path/to/tizen.wgt" [--sign]'),
    z("tizentool 10.2.1.254 debug Clkwtp8Hwq.AppName"),
    z('tizentool 10.2.1.254 run "path/to/tizen.wgt" [--sign]'),
    z("tizentool 10.2.1.254 run Clkwtp8Hwq.AppName"),
    z('tizentool 10.2.1.254 install "path/to/tizen.wgt" [--sign] [--clean]'),
    z("tizentool 10.2.1.254 uninstall Clkwtp8Hwq.AppName"),
    z('tizentool 10.2.1.254 uninstall "path/to/tizen.wgt"'),
    Q('tizentool 10.2.1.254 rmfile "/remote/path/to/tizen.wgt"');
}
var lu = Ze(require("net"));
var X = ((o) => (
  (o.Close = "CLSE"),
  (o.Connection = "CNXN"),
  (o.None = ""),
  (o.Ok = "OKAY"),
  (o.Open = "OPEN"),
  (o.Write = "WRTE"),
  o
))(X || {});
var pi = class {
  constructor(t) {
    this.writeClose = !1;
    (this.type = this.parseType(t)), (this.data = this.parseData(t));
  }
  get isClose() {
    return this.type == X.Close || this.writeClose;
  }
  get message() {
    return this.data.toString();
  }
  parseData(t) {
    return (
      this.type != X.Write ||
        !t.slice(t.length - 24, t.length - 20).equals(Buffer.from("CLSE")) ||
        (this.writeClose = !0),
      t
    );
  }
  parseType(t) {
    let r = t.slice(0, 4).toString();
    return r == "CNXN"
      ? X.Connection
      : r == "OPEN"
      ? X.Open
      : r == "WRTE"
      ? X.Write
      : r == "OKAY"
      ? X.Ok
      : r == "CLSE"
      ? X.Close
      : X.Write;
  }
};
var Ue = class {
  static intToBytes(t) {
    let r = new Uint8Array([
        (t & 4278190080) >> 24,
        (t & 16711680) >> 16,
        (t & 65280) >> 8,
        t & 255,
      ]),
      n = Buffer.from(r.buffer);
    return Ue.reverseHex(n);
  }
  static bufferXor(t) {
    let r = [];
    for (let n = 0; n < t.length; n++) r.push(t[n] ^ 255);
    return Buffer.from(r);
  }
  static checkSum(t) {
    let r = 0;
    for (let n = 0; n < t.length; n++) r += t[n];
    return r;
  }
  static reverseHex(t) {
    return Buffer.from(
      t.toString("hex").match(/.{2}/g).reverse().join(""),
      "hex"
    );
  }
};
var we = ((s) => (
  (s.Close = "CLSE"),
  (s.Connection = "CNXN"),
  (s.Ok = "OKAY"),
  (s.Open = "OPEN"),
  (s.Write = "WRTE"),
  s
))(we || {});
var Da = class {
  constructor() {
    (this.openCount = Buffer.from("0001", "hex")),
      (this.responseCounter = Buffer.from("0101", "hex"));
  }
  createRequest(t, r, n, a = !0) {
    t == we.Open && this.incrementOpen();
    let s = this.getRequestData(r, n),
      o = Buffer.concat([
        Buffer.from(t, "ascii"),
        this.openCount,
        this.getConnectionAttributes(t),
        this.getRequestLength(s, a),
        this.getRequestCheckSum(s),
        this.getRequestTypeXor(t),
        s,
      ]);
    return a && (o = Buffer.concat([o, Buffer.from("\0", "binary")])), o;
  }
  setResponseCounter(t) {
    this.responseCounter = t;
  }
  getConnectionAttributes(t) {
    return t == we.Connection
      ? Buffer.from("100000000400", "hex")
      : Buffer.concat([
          Buffer.from("0000", "hex"),
          this.responseCounter,
          Buffer.from("0000", "hex"),
        ]);
  }
  getRequestLength(t, r) {
    let n = r ? 1 : 0,
      a = t != null && t.length > 0 ? t.length + n : 0;
    return Ue.intToBytes(a);
  }
  getRequestCheckSum(t) {
    return Ue.intToBytes(Ue.checkSum(t));
  }
  getRequestData(t, r) {
    return !t && !r
      ? Buffer.from("")
      : t
      ? r
        ? Buffer.concat([Buffer.from(t), Buffer.from(" "), r])
        : Buffer.from(t)
      : r;
  }
  getRequestTypeXor(t) {
    return Ue.bufferXor(Buffer.from(t));
  }
  incrementOpen() {
    this.openCount[0]++ == 255 && this.openCount[1]++;
  }
};
var hu = Ze(require("timers"));
var Oa = class {
  constructor(t) {
    this.port = 26101;
    this.queue = [];
    this.autopop = !0;
    this.autopopInterval = 5e3;
    this.lastAction = 0;
    this.retries = 0;
    this.popCheck = () => {
      !this.autopop ||
        !this.lastAction ||
        this.lastAction + this.autopopInterval > Date.now() ||
        ((this.lastAction = Date.now()),
        z(
          "No action in " + this.autopopInterval + "ms, auto popping.",
          he.Debug
        ),
        this.pop());
    };
    this.onConnected = () => {
      z("Connected"), this.pop();
    };
    this.onClosed = () => {
      Q("Connection closed, did you set up developer mode?");
    };
    this.onData = (t) => {
      let r = new pi(t);
      z("<- " + r.type + " length: " + r.data.length, he.Debug),
        this.receive(r);
    };
    this.onOkTimeout = () => {
      if (++this.retries > 1) {
        z("OK retries exceeded, assuming OKAY.", he.Debug);
        let t = Buffer.from([
            79, 75, 65, 89, 31, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            176, 180, 190, 166,
          ]),
          r = new pi(t);
        this.onReceiveEnd(r);
      } else
        z("OK timeout, try again...", he.Debug), this.send(this.retryBuffer);
    };
    this.onCloseTimeout = () => {
      z("CLSE timeout, pop", he.Debug), this.pop();
    };
    (this.ip = t),
      (this.sdb = new Da()),
      (this.popChecker = (0, hu.setInterval)(this.popCheck, 1e3));
  }
  send(t) {
    clearTimeout(this.okTimeout),
      clearTimeout(this.closeTimeout),
      (this.lastAction = Date.now());
    let r = t.toString().substring(0, 4),
      n = t.length < 200 ? t.toString().slice(24) : "";
    z("-> " + r + " " + n + " length: " + t.length, he.Debug),
      this.socket.write(t),
      r === we.Ok &&
        ((this.retryBuffer = t),
        (this.okTimeout = setTimeout(this.onOkTimeout, 3e3)));
  }
  connect() {
    z("Connecting to " + this.ip + ":" + this.port),
      (this.socket = new lu.Socket()),
      this.socket.connect(this.port, this.ip, this.onConnected),
      this.socket.on("data", this.onData),
      this.socket.on("error", this.onError),
      this.socket.on("close", this.onClosed);
  }
  clear() {
    z("Clearing queue!", he.Debug), (this.queue = []);
  }
  disableAutopop() {
    z("Disabling autopop!", he.Debug), (this.autopop = !1);
  }
  enableAutopop() {
    z("Enabling autopop!", he.Debug), (this.autopop = !0);
  }
  request(t) {
    this.queue.push(t);
  }
  pop() {
    if (!this.queue.length) {
      (this.currentRequest = null), Q("Popped, queue empty", he.Debug);
      return;
    }
    this.currentRequest = this.queue.shift();
    let t = this.sdb.createRequest(
      this.currentRequest.type,
      this.currentRequest.command,
      this.currentRequest.data,
      this.currentRequest.nullable
    );
    this.send(t),
      this.currentRequest != null &&
        this.currentRequest.end != null &&
        this.currentRequest.end == X.None &&
        this.pop();
  }
  receive(t) {
    (this.lastAction = Date.now()),
      t.type == X.Write
        ? this.onReceiveWrite(t.data)
        : t.type == X.Ok && this.onReceiveOkay(t.data),
      this.onReceiveEnd(t);
  }
  onError() {
    Q(
      "Can't connect to " +
        this.ip +
        `:
- did you set up developer mode?
- make sure Studio/sdb is not connected already.`
    );
  }
  onReceiveWrite(t) {
    z(t.toString().slice(24), he.Debug);
  }
  onReceiveOkay(t) {
    this.sdb.setResponseCounter(t.slice(4, 6));
  }
  onReceiveEnd(t) {
    if (
      ((this.retryBuffer = void 0),
      clearTimeout(this.okTimeout),
      clearTimeout(this.closeTimeout),
      this.currentRequest != null && this.currentRequest.responseCallback)
    )
      this.currentRequest.responseCallback(t);
    else {
      let r = this.currentRequest && this.currentRequest.end;
      !r || r === t.type
        ? this.pop()
        : r === X.Close &&
          (this.closeTimeout = setTimeout(this.onCloseTimeout, 5e3));
    }
  }
};
var Aa = Ze(require("fs"));
var fe = ((E) => (
  (E.Applist = "shell:0 vd_applist"),
  (E.ApplistLegacy = "shell:0 applist"),
  (E.Capability = "capability:"),
  (E.Debug = "shell:0 debug"),
  (E.Dummy = ""),
  (E.Execute = "shell:0 was_execute"),
  (E.GetAppInstallPath = "shell:0 getappinstallpath"),
  (E.GetVmName = "shell:0 getvmname"),
  (E.Host = "host::"),
  (E.Install = "shell:0 vd_appinstall"),
  (E.ListShowControl = "shell:0 list_showcontrol"),
  (E.Mkdir = "shell:0 mkdir"),
  (E.RmFile = "shell:0 rmfile"),
  (E.Sync = "sync:"),
  (E.Sysinfo = "sysinfo:"),
  (E.Uninstall = "shell:0 vd_appuninstall"),
  E
))(fe || {});
var ke = class {
  constructor(t, r, n, a, s) {
    this.nullable = !0;
    (this.type = t),
      (this.command = r),
      (this.data = n),
      (this.end = a),
      (this.responseCallback = s);
  }
};
var it = class extends ke {
  constructor(t, r) {
    super(we.Ok, fe.Dummy, null, t, r);
    this.nullable = !1;
  }
};
var Ke = class extends ke {
  constructor(t, r, n, a) {
    super(we.Open, t, r, n, a);
  }
};
var od = Ze(require("crypto")),
  Pe = Ze(require("fs")),
  $o = Ze(Qu()),
  ba = Ze(dp());
var ud = Ze(sd());
var pr = class {
    static getApplicationId(t) {
      let r = pr.APPLICATION_ID_REGEX.exec(t);
      return r ? r[1] : null;
    }
    static getApplicationPath(t) {
      let r = pr.APPLICATION_PATH_REGEX.exec(t);
      return !r || r.length < 3 ? null : r[2];
    }
    static getCapability(t) {
      let r = [],
        n = t.split(/\r?\n/);
      for (let a of n) {
        let s = pr.CAPABILITY_REGEX.exec(a);
        s && r.push([s[1], s[2]]);
      }
      return r;
    }
    static getDebugPort(t) {
      let r = pr.PORT_REGEX.exec(t);
      return r && r.length > 1 ? parseInt(r[1]) : null;
    }
    static getDeviceName(t) {
      return pr.DEVICE_NAME_REGEX.exec(t)[1];
    }
    static isWgtPath(t) {
      return t.indexOf(pr.WGT_SUFFIX) > -1;
    }
  },
  He = pr;
(He.APPLICATION_ID_REGEX = /application id="([0-9a-zA-Z\.]+)"/),
  (He.APPLICATION_PATH_REGEX = /(.)+ ([\/|a-z]+)/),
  (He.CAPABILITY_REGEX = /([a-z_]+)\:((.)+)/),
  (He.DEVICE_NAME_REGEX = /::((.)+)::/),
  (He.PORT_REGEX = /port: ((\d)+)/),
  (He.WGT_SUFFIX = ".wgt");
var ie = class {
    static async getAppId(t) {
      Pe.existsSync(t) || Q(`Invalid path ${t}`);
      let r = new ba.default();
      try {
        let s = Pe.readFileSync(t);
        await r.loadAsync(s);
      } catch {
        Q(`Invalid package ${t}`);
      }
      let n = r.files["config.xml"];
      n || Q(`Invalid package ${t}: missing config.xml`);
      let a = await n.async("text");
      return He.getApplicationId(a.toString());
    }
    static async extract(t, r = !1) {
      let n = [];
      Pe.existsSync(t) || Q("Invalid path " + t + ", exiting.");
      let a = new ba.default();
      try {
        let s = Pe.readFileSync(t);
        await a.loadAsync(s);
      } catch {
        Q(`Invalid package ${t}`);
      }
      return (
        await Promise.all(
          a
            .filter((s, o) =>
              !r && ie.EXTRACT_FILE_IGNORE.indexOf(s) > -1 ? !1 : !o.dir
            )
            .map(async (s) => {
              let o = s.name,
                f = await s.async("nodebuffer");
              n.push([o, f]);
            })
        ),
        n
      );
    }
    static sign(t, r) {
      let n = ie.getXmlReferenceList(t),
        a = Pe.readFileSync(
          ie.ASSETS_DIR + "/" + ie.AUTHOR_SIGNATURE_FILE
        ).toString();
      a = a.replace(
        "{reference}",
        n.join(`
`)
      );
      let s = ie.getXmlSignedInto(a),
        o = new ud.SignedXml();
      (o.signatureAlgorithm = ie.SIGNATURE_ALGORITHM),
        (o.canonicalizationAlgorithm = ie.CANONICALIZATION_ALGORITHM),
        new Promise((f, h) => {
          Pe.existsSync(process.env.REACT_APP_CERT_AUTHOR_PATH) ||
            Q(
              "Invalid author certificate path, set valid CERT_AUTHOR_PATH in .env file."
            );
          let l = Pe.readFileSync(process.env.CERT_AUTHOR_PATH);
          $o.readPkcs12(
            l,
            { p12Password: process.env.REACT_APP_CERT_AUTHOR_PASS },
            (c, m) => {
              c &&
                (z("Author certificate file error, probably wrong password."),
                Q(c, he.Debug)),
                (o.signingKey = m.key);
              let v = o.createSignature(s, "");
              (v = v.substring(16, v.lastIndexOf("<"))),
                (a = a.replace("{signature}", ie.getChunked(v)));
              let x = m.cert.toString();
              x = x.substring(
                x.indexOf(`
`) + 1,
                x.lastIndexOf(`
`)
              );
              let p = m.ca.toString();
              (p = p.substring(
                p.indexOf(`
`) + 1,
                p.lastIndexOf(`
`)
              )),
                (a = a.replace("{cert}", ie.getChunked(x))),
                (a = a.replace("{ca}", ie.getChunked(p)));
              let _ = [ie.AUTHOR_SIGNATURE_FILE, Buffer.from(a)];
              t.push(_), c ? h(c) : f(_);
            }
          );
        }).then((f) => {
          Pe.existsSync(process.env.REACT_APP_CERT_DISTRIBUTOR_PATH) ||
            Q(
              "Invalid distributor certificate path, set valid CERT_DISTRIBUTOR_PATH in .env file."
            );
          let h = Pe.readFileSync(process.env.REACT_APP_CERT_DISTRIBUTOR_PATH);
          $o.readPkcs12(
            h,
            { p12Password: process.env.REACT_APP_CERT_DISTRIBUTOR_PASS },
            (l, c) => {
              l &&
                (z(
                  "Distributor certificate file error, probably wrong password."
                ),
                Q(l, he.Debug)),
                (o.signingKey = c.key);
              let m = ie.getXmlReference(f),
                v = Pe.readFileSync(
                  ie.ASSETS_DIR + "/" + ie.SIGNATURE_FILE
                ).toString();
              v = v.replace(
                "{reference}",
                m +
                  `
` +
                  n.join(`
`)
              );
              let x = ie.getXmlSignedInto(v),
                p = o.createSignature(x, "");
              (p = p.substring(16, p.lastIndexOf("<"))),
                (v = v.replace("{signature}", ie.getChunked(p)));
              let _ = c.cert.toString();
              _ = _.substring(
                _.indexOf(`
`) + 1,
                _.lastIndexOf(`
`)
              );
              let E = c.ca.toString();
              (E = E.substring(
                E.indexOf(`
`) + 1,
                E.lastIndexOf(`
`)
              )),
                (v = v.replace("{cert}", ie.getChunked(_))),
                (v = v.replace("{ca}", ie.getChunked(E))),
                t.push([ie.SIGNATURE_FILE, Buffer.from(v)]),
                r();
            }
          );
        });
    }
    static async repack(t, r) {
      let n = await ie.extract(t);
      ie.sign(n, () => {
        ie.zip(n, r);
      });
    }
    static zip(t, r) {
      let n = new ba.default();
      for (let s of t) n.file(s[0], s[1]);
      let a = ie.TMP_DIR + "/" + ie.REPACKED_WGT;
      Pe.existsSync(ie.TMP_DIR) || Pe.mkdirSync(ie.TMP_DIR),
        n
          .generateNodeStream({
            type: "nodebuffer",
            streamFiles: !0,
            compression: "DEFLATE",
          })
          .pipe(Pe.createWriteStream(a))
          .on("finish", () => r(a));
    }
    static getChunked(t) {
      return t.replace(/\s+/g, "").match(new RegExp(".{1,76}", "g")).join(`
`);
    }
    static getXmlReferenceList(t) {
      let r = [];
      for (let n of t) r.push(ie.getXmlReference(n));
      return r;
    }
    static getXmlSignedInto(t) {
      return t.substring(
        t.indexOf("<SignedInfo>"),
        t.indexOf("</SignedInfo>") + "</SignedInfo>".length
      );
    }
    static getXmlReference(t) {
      let r = ie.getHash(t[1]),
        n = encodeURIComponent(t[0]);
      return (
        '<Reference URI="' +
        n +
        `">
<DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"></DigestMethod>
<DigestValue>` +
        r +
        `</DigestValue>
</Reference>`
      );
    }
    static getHash(t) {
      return od.createHash("sha256").update(t).digest("base64");
    }
    static getWgtName(t) {
      return t.lastIndexOf("/") >= 0 ? t.substring(t.lastIndexOf("/") + 1) : t;
    }
  },
  me = ie;
(me.ASSETS_DIR = Ia() + "/assets"),
  (me.AUTHOR_SIGNATURE_FILE = "author-signature.xml"),
  (me.CANONICALIZATION_ALGORITHM = "http://www.w3.org/2001/10/xml-exc-c14n#"),
  (me.SIGNATURE_ALGORITHM =
    "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"),
  (me.SIGNATURE_FILE = "signature1.xml"),
  (me.REPACKED_WGT = "repacked.wgt"),
  (me.TMP_DIR = Ia() + "/tmp"),
  (me.EXTRACT_FILE_IGNORE = [ie.AUTHOR_SIGNATURE_FILE, ie.SIGNATURE_FILE]);
var Sa = class {
    constructor(t, r, n) {
      (this.client = t), (this.path = r), (this.remotePath = n);
    }
    send() {
      let t = this.readContents();
      this.createRequests(t);
    }
    createRequests(t) {
      this.client.request(
        new Ke(fe.Mkdir, Buffer.from('"' + this.remotePath + '"'), X.Close)
      ),
        this.client.request(
          new Ke(
            fe.ListShowControl,
            Buffer.from('"' + this.remotePath + '/"'),
            X.Close
          )
        ),
        this.client.request(new Ke(fe.Sync, null, X.Ok)),
        this.client.request(this.createSendRequest());
      let r = this.createDataRequests(t);
      for (let n of r) this.client.request(n);
      this.client.request(new it(X.None)),
        this.client.request(
          new ke(
            we.Write,
            fe.Dummy,
            Buffer.concat([Buffer.from("QUIT"), Buffer.from("000000", "hex")]),
            X.Ok
          )
        );
    }
    createSendRequest() {
      let t = Buffer.from(
          this.remotePath + "/" + me.getWgtName(this.path) + ",493"
        ),
        r = Buffer.concat([Buffer.from("SEND"), Ue.intToBytes(t.length), t]),
        n = new ke(we.Write, fe.Dummy, r, X.Ok);
      return (n.nullable = !1), n;
    }
    createDataRequests(t) {
      let r = [];
      for (let s = 0; s < t.length; s += Sa.PART_LENGTH) {
        let o = t.slice(s, s + Sa.PART_LENGTH),
          f = Ue.intToBytes(o.length),
          h = Buffer.concat([Buffer.from("DATA"), f, o]),
          l = new ke(we.Write, fe.Dummy, h, X.Ok);
        (l.nullable = !1), r.push(l);
      }
      let n = Ue.intToBytes(t.length),
        a = new ke(
          we.Write,
          fe.Dummy,
          Buffer.concat([Buffer.from("DONE"), n]),
          X.Ok
        );
      return (a.nullable = !1), r.push(a), r;
    }
    readContents() {
      return (
        Aa.existsSync(this.path) || Q("Invalid .wgt package path."),
        Aa.readFileSync(this.path)
      );
    }
  },
  dr = Sa;
dr.PART_LENGTH = 65536;
var Qo = class extends dr {
  createDataRequests(t) {
    let r = [];
    for (let s = 0; s < t.length; s += dr.PART_LENGTH) {
      let o = t.slice(s, s + dr.PART_LENGTH),
        f = Ue.intToBytes(o.length),
        h = Buffer.concat([Buffer.from("DATA"), f, o]);
      for (let l = 0; l < h.length; l += 4096) {
        let c = h.slice(l, l + 4096),
          m = new ke(we.Write, fe.Dummy, c, X.Ok);
        (m.nullable = !1), r.push(m);
      }
    }
    let n = Ue.intToBytes(t.length),
      a = new ke(
        we.Write,
        fe.Dummy,
        Buffer.concat([Buffer.from("DONE"), n]),
        X.Ok
      );
    return (a.nullable = !1), r.push(a), r;
  }
};
var Jo = class {
  static create(t, r, n, a) {
    return a.major < 3 ? new Qo(t, r, n) : new dr(t, r, n);
  }
};
var fd = Ze(require("timers"));
var eu = class {
  constructor(t) {
    let r = t.split(".");
    (this.major = parseInt(r[0])),
      (this.minor = parseInt(r[1])),
      (this.hotfix = parseInt(r[2]) || 0),
      (this.full = t);
  }
  toString() {
    return this.full;
  }
};
var tu = class {
  constructor(t) {
    this.capabilities = [];
    this.capabilityTimestamp = 0;
    this.deviceName = "";
    this.installPath = "";
    this.writeResponse = "";
    this.capabilityCheck = () => {
      this.capabilities.length > 0 ||
        this.capabilityTimestamp + 1e4 > Date.now() ||
        (z("Trying again..."), this.capability());
    };
    this.onConnectResponse = (t) => {
      t.type === X.Connection &&
        ((this.deviceName = He.getDeviceName(t.message)),
        z("Device name: " + this.deviceName),
        z("Getting device capability..."),
        this.capability(),
        (this.retryCapability = (0, fd.setInterval)(
          this.capabilityCheck,
          1e3
        )));
    };
    this.onOpenCapabilitiesResponse = (t) => {
      this.isConnected ||
        ((t.type === X.Ok || t.type === X.Write) &&
          this.tryParseCapabilities(t.message)) ||
        this.request(new it(null, this.onCapabilityResponse));
    };
    this.onCapabilityResponse = (t) => {
      if (
        !(this.isConnected || (t.type !== X.Write && t.type !== X.Close)) &&
        !this.tryParseCapabilities(t.message)
      ) {
        this.request(new it(null, this.onCapabilityResponse)), this.pop();
        return;
      }
    };
    this.onInstallGetAppInstallPathResponse = () => {
      let t = this.input.arg1;
      this.input.sign
        ? (z("Repacking .wgt file..."), me.repack(t, this.onInstallWgtReady))
        : this.onInstallWgtReady(t);
    };
    this.onInstallWgtReady = (t) => {
      z("Sending file to the device and installing..."),
        Jo.create(
          this.client,
          t,
          this.installPath,
          this.platformVersion
        ).send(),
        this.client.disableAutopop();
      let r =
          this.appId + ' "' + this.installPath + "/" + me.getWgtName(t) + '"',
        n = new ke(
          we.Open,
          fe.Install,
          Buffer.from(r),
          null,
          this.onInstallResponse
        );
      this.request(n), this.pop();
    };
    this.onInstallExists = (t) => {
      t ? this.uninstall(this.onInstallPrepared) : this.onInstallPrepared();
    };
    this.onInstallPrepared = () => {
      this.getInstallPath(this.onInstallGetAppInstallPathResponse);
    };
    this.onInstallResponse = (t) => {
      if (
        (z("."), t.data ? (this.writeResponse += t.message) : z(t), t.isClose)
      ) {
        if (this.writeResponse.indexOf("failed") >= 0) {
          let r =
            "Installation failed, check whether you have correct package or certificate.";
          this.input.sign &&
            (r += `
Or try to run tizentool with --sign`),
            Q(r);
        }
        if (this.writeResponse.indexOf("install completed") >= 0)
          return (
            (this.writeResponse = ""),
            this.client.enableAutopop(),
            z("Installation successful."),
            this.rmfile()
          );
      }
      this.request(new it(null, this.onInstallResponse)), this.pop();
    };
    this.onRmfileAppPathResponse = () => {
      z("Removing installation package..."),
        this.request(
          new Ke(
            fe.RmFile,
            Buffer.from(
              this.installPath + "/" + me.getWgtName(this.input.arg1)
            ),
            null,
            this.onRmfileResponse
          )
        );
    };
    this.onRmfileResponse = (t) => {
      !t.isClose ||
        (this.client.clear(),
        this.installCallback
          ? this.installCallback()
          : Q("Installation package removed successfully."));
    };
    this.onDebugPrepared = () => {
      z("Starting debugger... (note: may not work if app is already running)");
      let t =
        this.platformVersion.major < 4
          ? '"' + this.appId + '" "302"'
          : '"' + this.appId + '"';
      this.request(
        new Ke(fe.Debug, Buffer.from(t), null, this.onDebugResponse)
      );
    };
    this.onDebugResponse = (t) => {
      if (t.type !== X.Write && t.type !== X.Close) {
        this.request(new it(null, this.onDebugResponse)), this.pop();
        return;
      }
      t.message.indexOf("failed") > -1 &&
        Q("Debugging failed, invalid package/appId?");
      let r = He.getDebugPort(t.message) || "7011";
      this.platformVersion.major < 3
        ? Q(`Debugging started at: http://${this.client.ip}:${r}
Open debugger in a Webkit browser like Safari.`)
        : r !== "7011" &&
          Q(`Debugging started at: http://${this.client.ip}:${r}
Open debugger in a Chromium browser supporting Web Components v0 (Chromium < 80).`),
        this.request(new it(null, this.onDebugResponse)),
        this.pop();
    };
    this.onRunPrepared = () => {
      let t =
        this.platformVersion.major < 4
          ? '"' + this.appId + '" "302"'
          : '"' + this.appId + '"';
      this.request(
        new Ke(fe.Execute, Buffer.from(t), null, this.onRunResponse)
      );
    };
    this.onRunResponse = (t) => {
      t.isClose && Q("Application started."),
        t.message.indexOf("failed") > -1 &&
          Q("Run failed, invalid package/appId?"),
        this.request(new it(null, this.onRunResponse)),
        this.pop();
    };
    (this.input = t), (this.client = new Oa(this.input.ip)), this.connect();
  }
  connect() {
    this.client.connect(),
      this.request(
        new ke(we.Connection, fe.Host, null, X.Close, this.onConnectResponse)
      );
  }
  async connected() {
    if (((this.isConnected = !0), this.input.command == Xe.RmFile))
      this.rmfile();
    else if (this.input.command == Xe.Sysinfo) this.sysinfo();
    else {
      let t = this.input.arg1;
      (this.isWgt = He.isWgtPath(t)),
        this.isWgt ? await this.getAppId(t) : (this.appId = t),
        this.input.command == Xe.Exists
          ? this.exists()
          : this.input.command == Xe.Install
          ? this.install()
          : this.input.command == Xe.Uninstall
          ? this.uninstall()
          : this.input.command == Xe.Run
          ? this.run()
          : this.input.command == Xe.Debug
          ? this.debug()
          : z("Invalid command");
    }
    this.pop();
  }
  capability() {
    (this.capabilityTimestamp = Date.now()),
      this.request(
        new Ke(fe.Capability, null, X.Ok, this.onOpenCapabilitiesResponse)
      ),
      this.pop();
  }
  exists(t) {
    let r = this.platformVersion.major < 4 ? fe.ApplistLegacy : fe.Applist;
    this.request(new Ke(r, null, null, this.onExistsResponse.bind(this, t)));
  }
  install() {
    this.input.clean
      ? this.exists(this.onInstallExists)
      : this.onInstallPrepared();
  }
  uninstall(t) {
    z("Uninstalling " + this.appId + "..."),
      this.client.clear(),
      this.client.disableAutopop(),
      this.request(
        new Ke(
          fe.Uninstall,
          Buffer.from('"' + this.appId + '"'),
          null,
          this.onUninstallResponse.bind(this, t)
        )
      ),
      t && this.pop();
  }
  debug() {
    this.isWgt
      ? ((this.installCallback = this.onDebugPrepared), this.install())
      : this.onDebugPrepared();
  }
  run() {
    this.isWgt
      ? ((this.installCallback = this.onRunPrepared), this.install())
      : this.onRunPrepared();
  }
  rmfile() {
    this.getInstallPath(this.onRmfileAppPathResponse);
  }
  sysinfo() {
    this.request(new Ke(fe.Sysinfo, null, X.Close));
  }
  pop() {
    this.client.pop();
  }
  request(t) {
    this.client.request(t);
  }
  getCapability(t) {
    for (let r of this.capabilities) if (r[0] == t) return r[1];
    return null;
  }
  async getAppId(t) {
    if (!this.appId) {
      try {
        this.appId = await me.getAppId(t);
      } catch (r) {
        Q(r);
      }
      z("Application ID: " + this.appId);
    }
  }
  getInstallPath(t) {
    if (this.installPath) {
      t && t();
      return;
    }
    this.request(
      new Ke(fe.GetAppInstallPath, null, null, (r) => {
        if (r.type !== X.Write && r.type !== X.Ok && r.type !== X.Close) return;
        let n = this.getCapability("sdk_toolpath");
        n || (n = He.getApplicationPath(r.message)),
          n || Q("Could not get sdk_toolpath or application path, exiting."),
          (this.installPath = n + "/tmp"),
          z("Installation path: " + this.installPath),
          t && t();
      })
    );
  }
  onExistsResponse(t, r) {
    if (r.isClose) {
      this.writeResponse
        .split(/app_id.*=/g)
        .map((s) => /^(.*)[-]+/.exec(s))
        .shift();
      let a = this.writeResponse.indexOf(this.appId) > -1;
      a
        ? z("Application " + this.appId + " IS already installed.")
        : z("Application " + this.appId + " is NOT installed."),
        (this.writeResponse = ""),
        t && t(a);
      return;
    }
    (this.writeResponse += r.message),
      this.request(new it(X.Write, this.onExistsResponse.bind(this, t))),
      this.pop();
  }
  tryParseCapabilities(t) {
    return (
      (this.capabilities = He.getCapability(t)),
      this.capabilities.length
        ? (clearTimeout(this.retryCapability),
          (this.platformVersion = new eu(
            this.getCapability("platform_version")
          )),
          (this.platformVersion == null || !this.platformVersion.major) &&
            Q("Could not parse platform version, exiting."),
          z("Platform version: " + this.platformVersion.toString()),
          this.connected(),
          !0)
        : !1
    );
  }
  onUninstallResponse(t, r) {
    if (r.isClose) {
      if (
        (this.client.enableAutopop(),
        z("Application succesfully uninstalled"),
        t)
      )
        return t();
      Q("No uninstall callback", he.Debug);
    }
    this.request(new it(null, this.onUninstallResponse.bind(this, t))),
      this.pop();
  }
};
var xd = Ze(pd());
var gr = Ze(require("path"));
var xe = Ze(require("fs"));
function dd(e) {
  e.command === Xe.GetAppId
    ? Gw(e)
    : e.command === Xe.Unpack
    ? Hw(e)
    : e.command === Xe.Sign
    ? jw(e)
    : e.command === Xe.Pack && Ww(e);
}
function Ww(e) {
  let t = e.arg1;
  (0, xe.existsSync)(t)
    ? (0, xe.statSync)(t).isDirectory() ||
      Q(`Source must be a directory '${t}'`)
    : Q(`Source must be an existing directory '${t}'`);
  let r = [];
  md(t, r, !e.sign);
  let n = e.arg2;
  e.sign
    ? me.sign(r, () => {
        gd(r, n);
      })
    : gd(r, n);
}
function gd(e, t) {
  me.zip(e, (r) => {
    vd(r, t);
  });
}
function md(e, t, r, n) {
  (0, xe.readdirSync)(gr.resolve(e)).forEach((a) => {
    let s = gr.resolve(e, a),
      o = n ? gr.join(n, a) : a;
    (0, xe.statSync)(s).isDirectory()
      ? md(s, t, r, o)
      : (r || !me.EXTRACT_FILE_IGNORE.includes(a)) &&
        (z("Add " + o, he.Debug), t.push([o, (0, xe.readFileSync)(s)]));
  });
}
function jw(e) {
  me.repack(e.arg1, (t) => {
    let r = e.arg2;
    vd(t, r);
  });
}
function vd(e, t) {
  t || Q(e),
    (0, xe.existsSync)(t) &&
      ((0, xe.statSync)(t).isDirectory() &&
        Q(`Can not replace target directory '${t}'
${e}`),
      (0, xe.unlinkSync)(t)),
    (0, xe.renameSync)(e, t),
    Q(t);
}
async function Hw(e) {
  let t = await me.extract(e.arg1, !0),
    r = gr.resolve(e.arg2);
  (0, xe.existsSync)(r) && Q(`Target path exists: ${e.arg2}`),
    (0, xe.mkdirSync)(r),
    t.forEach((n) => {
      let [a, s] = n;
      Vw(r, a),
        z("Extract " + a, he.Debug),
        (0, xe.writeFileSync)(gr.join(r, a), s);
    });
}
function Vw(e, t) {
  let r = t.split("/");
  r.pop();
  let n = e;
  for (; r.length; )
    (n = gr.join(n, r.shift())), (0, xe.existsSync)(n) || (0, xe.mkdirSync)(n);
}
async function Gw(e) {
  let t = await me.getAppId(e.arg1);
  Q(t);
}
xd.config({ path: ".env" });
var Ta = su();
Ta || fu();
hi(Ta.command) ? dd(Ta) : new tu(Ta);
