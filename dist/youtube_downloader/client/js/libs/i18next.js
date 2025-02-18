!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((e = e || self).i18next = t());
})(this, function () {
  "use strict";
  function e(t) {
    return (e =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(t);
  }
  function t(e, t, n) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = n),
      e
    );
  }
  function n(e) {
    for (var n = 1; n < arguments.length; n++) {
      var o = null != arguments[n] ? Object(arguments[n]) : {},
        i = Object.keys(o);
      "function" == typeof Object.getOwnPropertySymbols &&
        (i = i.concat(
          Object.getOwnPropertySymbols(o).filter(function (e) {
            return Object.getOwnPropertyDescriptor(o, e).enumerable;
          })
        )),
        i.forEach(function (n) {
          t(e, n, o[n]);
        });
    }
    return e;
  }
  function o(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }
  function i(e, t) {
    for (var n = 0; n < t.length; n++) {
      var o = t[n];
      (o.enumerable = o.enumerable || !1),
        (o.configurable = !0),
        "value" in o && (o.writable = !0),
        Object.defineProperty(e, o.key, o);
    }
  }
  function r(e, t, n) {
    return t && i(e.prototype, t), n && i(e, n), e;
  }
  function a(e) {
    if (void 0 === e)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return e;
  }
  function s(t, n) {
    return !n || ("object" !== e(n) && "function" != typeof n) ? a(t) : n;
  }
  function u(e) {
    return (u = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        })(e);
  }
  function l(e, t) {
    return (l =
      Object.setPrototypeOf ||
      function (e, t) {
        return (e.__proto__ = t), e;
      })(e, t);
  }
  function c(e, t) {
    if ("function" != typeof t && null !== t)
      throw new TypeError("Super expression must either be null or a function");
    (e.prototype = Object.create(t && t.prototype, {
      constructor: { value: e, writable: !0, configurable: !0 },
    })),
      t && l(e, t);
  }
  var p = {
      type: "logger",
      log: function (e) {
        this.output("log", e);
      },
      warn: function (e) {
        this.output("warn", e);
      },
      error: function (e) {
        this.output("error", e);
      },
      output: function (e, t) {
        console && console[e] && console[e].apply(console, t);
      },
    },
    f = new ((function () {
      function e(t) {
        var n =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        o(this, e), this.init(t, n);
      }
      return (
        r(e, [
          {
            key: "init",
            value: function (e) {
              var t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {};
              (this.prefix = t.prefix || "i18next:"),
                (this.logger = e || p),
                (this.options = t),
                (this.debug = t.debug);
            },
          },
          {
            key: "setDebug",
            value: function (e) {
              this.debug = e;
            },
          },
          {
            key: "log",
            value: function () {
              for (
                var e = arguments.length, t = new Array(e), n = 0;
                n < e;
                n++
              )
                t[n] = arguments[n];
              return this.forward(t, "log", "", !0);
            },
          },
          {
            key: "warn",
            value: function () {
              for (
                var e = arguments.length, t = new Array(e), n = 0;
                n < e;
                n++
              )
                t[n] = arguments[n];
              return this.forward(t, "warn", "", !0);
            },
          },
          {
            key: "error",
            value: function () {
              for (
                var e = arguments.length, t = new Array(e), n = 0;
                n < e;
                n++
              )
                t[n] = arguments[n];
              return this.forward(t, "error", "");
            },
          },
          {
            key: "deprecate",
            value: function () {
              for (
                var e = arguments.length, t = new Array(e), n = 0;
                n < e;
                n++
              )
                t[n] = arguments[n];
              return this.forward(t, "warn", "WARNING DEPRECATED: ", !0);
            },
          },
          {
            key: "forward",
            value: function (e, t, n, o) {
              return o && !this.debug
                ? null
                : ("string" == typeof e[0] &&
                    (e[0] = "".concat(n).concat(this.prefix, " ").concat(e[0])),
                  this.logger[t](e));
            },
          },
          {
            key: "create",
            value: function (t) {
              return new e(
                this.logger,
                n(
                  {},
                  { prefix: "".concat(this.prefix, ":").concat(t, ":") },
                  this.options
                )
              );
            },
          },
        ]),
        e
      );
    })())(),
    g = (function () {
      function e() {
        o(this, e), (this.observers = {});
      }
      return (
        r(e, [
          {
            key: "on",
            value: function (e, t) {
              var n = this;
              return (
                e.split(" ").forEach(function (e) {
                  (n.observers[e] = n.observers[e] || []),
                    n.observers[e].push(t);
                }),
                this
              );
            },
          },
          {
            key: "off",
            value: function (e, t) {
              this.observers[e] &&
                (t
                  ? (this.observers[e] = this.observers[e].filter(function (e) {
                      return e !== t;
                    }))
                  : delete this.observers[e]);
            },
          },
          {
            key: "emit",
            value: function (e) {
              for (
                var t = arguments.length,
                  n = new Array(t > 1 ? t - 1 : 0),
                  o = 1;
                o < t;
                o++
              )
                n[o - 1] = arguments[o];
              this.observers[e] &&
                [].concat(this.observers[e]).forEach(function (e) {
                  e.apply(void 0, n);
                });
              this.observers["*"] &&
                [].concat(this.observers["*"]).forEach(function (t) {
                  t.apply(t, [e].concat(n));
                });
            },
          },
        ]),
        e
      );
    })();
  function h() {
    var e,
      t,
      n = new Promise(function (n, o) {
        (e = n), (t = o);
      });
    return (n.resolve = e), (n.reject = t), n;
  }
  function d(e) {
    return null == e ? "" : "" + e;
  }
  function v(e, t, n) {
    function o(e) {
      return e && e.indexOf("###") > -1 ? e.replace(/###/g, ".") : e;
    }
    function i() {
      return !e || "string" == typeof e;
    }
    for (
      var r = "string" != typeof t ? [].concat(t) : t.split(".");
      r.length > 1;

    ) {
      if (i()) return {};
      var a = o(r.shift());
      !e[a] && n && (e[a] = new n()), (e = e[a]);
    }
    return i() ? {} : { obj: e, k: o(r.shift()) };
  }
  function y(e, t, n) {
    var o = v(e, t, Object);
    o.obj[o.k] = n;
  }
  function m(e, t) {
    var n = v(e, t),
      o = n.obj,
      i = n.k;
    if (o) return o[i];
  }
  function b(e, t, n) {
    var o = m(e, n);
    return void 0 !== o ? o : m(t, n);
  }
  function k(e) {
    return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }
  var x = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;",
  };
  function w(e) {
    return "string" == typeof e
      ? e.replace(/[&<>"'\/]/g, function (e) {
          return x[e];
        })
      : e;
  }
  var S =
      "undefined" != typeof window &&
      window.navigator &&
      window.navigator.userAgent &&
      window.navigator.userAgent.indexOf("MSIE") > -1,
    L = (function (e) {
      function t(e) {
        var n,
          i =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : { ns: ["translation"], defaultNS: "translation" };
        return (
          o(this, t),
          (n = s(this, u(t).call(this))),
          S && g.call(a(n)),
          (n.data = e || {}),
          (n.options = i),
          void 0 === n.options.keySeparator && (n.options.keySeparator = "."),
          n
        );
      }
      return (
        c(t, g),
        r(t, [
          {
            key: "addNamespaces",
            value: function (e) {
              this.options.ns.indexOf(e) < 0 && this.options.ns.push(e);
            },
          },
          {
            key: "removeNamespaces",
            value: function (e) {
              var t = this.options.ns.indexOf(e);
              t > -1 && this.options.ns.splice(t, 1);
            },
          },
          {
            key: "getResource",
            value: function (e, t, n) {
              var o =
                  arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : {},
                i =
                  void 0 !== o.keySeparator
                    ? o.keySeparator
                    : this.options.keySeparator,
                r = [e, t];
              return (
                n && "string" != typeof n && (r = r.concat(n)),
                n && "string" == typeof n && (r = r.concat(i ? n.split(i) : n)),
                e.indexOf(".") > -1 && (r = e.split(".")),
                m(this.data, r)
              );
            },
          },
          {
            key: "addResource",
            value: function (e, t, n, o) {
              var i =
                  arguments.length > 4 && void 0 !== arguments[4]
                    ? arguments[4]
                    : { silent: !1 },
                r = this.options.keySeparator;
              void 0 === r && (r = ".");
              var a = [e, t];
              n && (a = a.concat(r ? n.split(r) : n)),
                e.indexOf(".") > -1 && ((o = t), (t = (a = e.split("."))[1])),
                this.addNamespaces(t),
                y(this.data, a, o),
                i.silent || this.emit("added", e, t, n, o);
            },
          },
          {
            key: "addResources",
            value: function (e, t, n) {
              var o =
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : { silent: !1 };
              for (var i in n)
                ("string" != typeof n[i] &&
                  "[object Array]" !== Object.prototype.toString.apply(n[i])) ||
                  this.addResource(e, t, i, n[i], { silent: !0 });
              o.silent || this.emit("added", e, t, n);
            },
          },
          {
            key: "addResourceBundle",
            value: function (e, t, o, i, r) {
              var a =
                  arguments.length > 5 && void 0 !== arguments[5]
                    ? arguments[5]
                    : { silent: !1 },
                s = [e, t];
              e.indexOf(".") > -1 &&
                ((i = o), (o = t), (t = (s = e.split("."))[1])),
                this.addNamespaces(t);
              var u = m(this.data, s) || {};
              i
                ? (function e(t, n, o) {
                    for (var i in n)
                      "__proto__" !== i &&
                        "constructor" !== i &&
                        (i in t
                          ? "string" == typeof t[i] ||
                            t[i] instanceof String ||
                            "string" == typeof n[i] ||
                            n[i] instanceof String
                            ? o && (t[i] = n[i])
                            : e(t[i], n[i], o)
                          : (t[i] = n[i]));
                    return t;
                  })(u, o, r)
                : (u = n({}, u, o)),
                y(this.data, s, u),
                a.silent || this.emit("added", e, t, o);
            },
          },
          {
            key: "removeResourceBundle",
            value: function (e, t) {
              this.hasResourceBundle(e, t) && delete this.data[e][t],
                this.removeNamespaces(t),
                this.emit("removed", e, t);
            },
          },
          {
            key: "hasResourceBundle",
            value: function (e, t) {
              return void 0 !== this.getResource(e, t);
            },
          },
          {
            key: "getResourceBundle",
            value: function (e, t) {
              return (
                t || (t = this.options.defaultNS),
                "v1" === this.options.compatibilityAPI
                  ? n({}, {}, this.getResource(e, t))
                  : this.getResource(e, t)
              );
            },
          },
          {
            key: "getDataByLanguage",
            value: function (e) {
              return this.data[e];
            },
          },
          {
            key: "toJSON",
            value: function () {
              return this.data;
            },
          },
        ]),
        t
      );
    })(),
    O = {
      processors: {},
      addPostProcessor: function (e) {
        this.processors[e.name] = e;
      },
      handle: function (e, t, n, o, i) {
        var r = this;
        return (
          e.forEach(function (e) {
            r.processors[e] && (t = r.processors[e].process(t, n, o, i));
          }),
          t
        );
      },
    },
    R = {},
    C = (function (t) {
      function i(e) {
        var t,
          n,
          r,
          l,
          c =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return (
          o(this, i),
          (t = s(this, u(i).call(this))),
          S && g.call(a(t)),
          (n = [
            "resourceStore",
            "languageUtils",
            "pluralResolver",
            "interpolator",
            "backendConnector",
            "i18nFormat",
            "utils",
          ]),
          (r = e),
          (l = a(t)),
          n.forEach(function (e) {
            r[e] && (l[e] = r[e]);
          }),
          (t.options = c),
          void 0 === t.options.keySeparator && (t.options.keySeparator = "."),
          (t.logger = f.create("translator")),
          t
        );
      }
      return (
        c(i, g),
        r(i, [
          {
            key: "changeLanguage",
            value: function (e) {
              e && (this.language = e);
            },
          },
          {
            key: "exists",
            value: function (e) {
              var t =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : { interpolation: {} },
                n = this.resolve(e, t);
              return n && void 0 !== n.res;
            },
          },
          {
            key: "extractFromKey",
            value: function (e, t) {
              var n =
                void 0 !== t.nsSeparator
                  ? t.nsSeparator
                  : this.options.nsSeparator;
              void 0 === n && (n = ":");
              var o =
                  void 0 !== t.keySeparator
                    ? t.keySeparator
                    : this.options.keySeparator,
                i = t.ns || this.options.defaultNS;
              if (n && e.indexOf(n) > -1) {
                var r = e.match(this.interpolator.nestingRegexp);
                if (r && r.length > 0) return { key: e, namespaces: i };
                var a = e.split(n);
                (n !== o || (n === o && this.options.ns.indexOf(a[0]) > -1)) &&
                  (i = a.shift()),
                  (e = a.join(o));
              }
              return (
                "string" == typeof i && (i = [i]), { key: e, namespaces: i }
              );
            },
          },
          {
            key: "translate",
            value: function (t, o, i) {
              var r = this;
              if (
                ("object" !== e(o) &&
                  this.options.overloadTranslationOptionHandler &&
                  (o = this.options.overloadTranslationOptionHandler(
                    arguments
                  )),
                o || (o = {}),
                null == t)
              )
                return "";
              Array.isArray(t) || (t = [String(t)]);
              var a =
                  void 0 !== o.keySeparator
                    ? o.keySeparator
                    : this.options.keySeparator,
                s = this.extractFromKey(t[t.length - 1], o),
                u = s.key,
                l = s.namespaces,
                c = l[l.length - 1],
                p = o.lng || this.language,
                f =
                  o.appendNamespaceToCIMode ||
                  this.options.appendNamespaceToCIMode;
              if (p && "cimode" === p.toLowerCase()) {
                if (f) {
                  var g = o.nsSeparator || this.options.nsSeparator;
                  return c + g + u;
                }
                return u;
              }
              var h = this.resolve(t, o),
                d = h && h.res,
                v = (h && h.usedKey) || u,
                y = (h && h.exactUsedKey) || u,
                m = Object.prototype.toString.apply(d),
                b =
                  void 0 !== o.joinArrays
                    ? o.joinArrays
                    : this.options.joinArrays,
                k = !this.i18nFormat || this.i18nFormat.handleAsObject;
              if (
                k &&
                d &&
                "string" != typeof d &&
                "boolean" != typeof d &&
                "number" != typeof d &&
                [
                  "[object Number]",
                  "[object Function]",
                  "[object RegExp]",
                ].indexOf(m) < 0 &&
                ("string" != typeof b || "[object Array]" !== m)
              ) {
                if (!o.returnObjects && !this.options.returnObjects)
                  return (
                    this.logger.warn(
                      "accessing an object - but returnObjects options is not enabled!"
                    ),
                    this.options.returnedObjectHandler
                      ? this.options.returnedObjectHandler(v, d, o)
                      : "key '"
                          .concat(u, " (")
                          .concat(
                            this.language,
                            ")' returned an object instead of string."
                          )
                  );
                if (a) {
                  var x = "[object Array]" === m,
                    w = x ? [] : {},
                    S = x ? y : v;
                  for (var L in d)
                    if (Object.prototype.hasOwnProperty.call(d, L)) {
                      var O = "".concat(S).concat(a).concat(L);
                      (w[L] = this.translate(
                        O,
                        n({}, o, { joinArrays: !1, ns: l })
                      )),
                        w[L] === O && (w[L] = d[L]);
                    }
                  d = w;
                }
              } else if (k && "string" == typeof b && "[object Array]" === m)
                (d = d.join(b)) && (d = this.extendTranslation(d, t, o, i));
              else {
                var R = !1,
                  C = !1;
                if (!this.isValidLookup(d) && void 0 !== o.defaultValue) {
                  if (((R = !0), void 0 !== o.count)) {
                    var N = this.pluralResolver.getSuffix(p, o.count);
                    d = o["defaultValue".concat(N)];
                  }
                  d || (d = o.defaultValue);
                }
                this.isValidLookup(d) || ((C = !0), (d = u));
                var j =
                  o.defaultValue &&
                  o.defaultValue !== d &&
                  this.options.updateMissing;
                if (C || R || j) {
                  if (
                    (this.logger.log(
                      j ? "updateKey" : "missingKey",
                      p,
                      c,
                      u,
                      j ? o.defaultValue : d
                    ),
                    a)
                  ) {
                    var E = this.resolve(u, n({}, o, { keySeparator: !1 }));
                    E &&
                      E.res &&
                      this.logger.warn(
                        "Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format."
                      );
                  }
                  var P = [],
                    F = this.languageUtils.getFallbackCodes(
                      this.options.fallbackLng,
                      o.lng || this.language
                    );
                  if ("fallback" === this.options.saveMissingTo && F && F[0])
                    for (var V = 0; V < F.length; V++) P.push(F[V]);
                  else
                    "all" === this.options.saveMissingTo
                      ? (P = this.languageUtils.toResolveHierarchy(
                          o.lng || this.language
                        ))
                      : P.push(o.lng || this.language);
                  var T = function (e, t) {
                    r.options.missingKeyHandler
                      ? r.options.missingKeyHandler(
                          e,
                          c,
                          t,
                          j ? o.defaultValue : d,
                          j,
                          o
                        )
                      : r.backendConnector &&
                        r.backendConnector.saveMissing &&
                        r.backendConnector.saveMissing(
                          e,
                          c,
                          t,
                          j ? o.defaultValue : d,
                          j,
                          o
                        ),
                      r.emit("missingKey", e, c, t, d);
                  };
                  if (this.options.saveMissing) {
                    var A = void 0 !== o.count && "string" != typeof o.count;
                    this.options.saveMissingPlurals && A
                      ? P.forEach(function (e) {
                          r.pluralResolver
                            .getPluralFormsOfKey(e, u)
                            .forEach(function (t) {
                              return T([e], t);
                            });
                        })
                      : T(P, u);
                  }
                }
                (d = this.extendTranslation(d, t, o, h, i)),
                  C &&
                    d === u &&
                    this.options.appendNamespaceToMissingKey &&
                    (d = "".concat(c, ":").concat(u)),
                  C &&
                    this.options.parseMissingKeyHandler &&
                    (d = this.options.parseMissingKeyHandler(d));
              }
              return d;
            },
          },
          {
            key: "extendTranslation",
            value: function (e, t, o, i, r) {
              var a = this;
              if (this.i18nFormat && this.i18nFormat.parse)
                e = this.i18nFormat.parse(
                  e,
                  o,
                  i.usedLng,
                  i.usedNS,
                  i.usedKey,
                  { resolved: i }
                );
              else if (!o.skipInterpolation) {
                o.interpolation &&
                  this.interpolator.init(
                    n({}, o, {
                      interpolation: n(
                        {},
                        this.options.interpolation,
                        o.interpolation
                      ),
                    })
                  );
                var s,
                  u =
                    (o.interpolation && o.interpolation.skipOnVariables) ||
                    this.options.interpolation.skipOnVariables;
                if (u) {
                  var l = e.match(this.interpolator.nestingRegexp);
                  s = l && l.length;
                }
                var c =
                  o.replace && "string" != typeof o.replace ? o.replace : o;
                if (
                  (this.options.interpolation.defaultVariables &&
                    (c = n({}, this.options.interpolation.defaultVariables, c)),
                  (e = this.interpolator.interpolate(
                    e,
                    c,
                    o.lng || this.language,
                    o
                  )),
                  u)
                ) {
                  var p = e.match(this.interpolator.nestingRegexp);
                  s < (p && p.length) && (o.nest = !1);
                }
                !1 !== o.nest &&
                  (e = this.interpolator.nest(
                    e,
                    function () {
                      for (
                        var e = arguments.length, n = new Array(e), i = 0;
                        i < e;
                        i++
                      )
                        n[i] = arguments[i];
                      return r && r[0] === n[0] && !o.context
                        ? (a.logger.warn(
                            "It seems you are nesting recursively key: "
                              .concat(n[0], " in key: ")
                              .concat(t[0])
                          ),
                          null)
                        : a.translate.apply(a, n.concat([t]));
                    },
                    o
                  )),
                  o.interpolation && this.interpolator.reset();
              }
              var f = o.postProcess || this.options.postProcess,
                g = "string" == typeof f ? [f] : f;
              return (
                null != e &&
                  g &&
                  g.length &&
                  !1 !== o.applyPostProcessor &&
                  (e = O.handle(
                    g,
                    e,
                    t,
                    this.options && this.options.postProcessPassResolved
                      ? n({ i18nResolved: i }, o)
                      : o,
                    this
                  )),
                e
              );
            },
          },
          {
            key: "resolve",
            value: function (e) {
              var t,
                n,
                o,
                i,
                r,
                a = this,
                s =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {};
              return (
                "string" == typeof e && (e = [e]),
                e.forEach(function (e) {
                  if (!a.isValidLookup(t)) {
                    var u = a.extractFromKey(e, s),
                      l = u.key;
                    n = l;
                    var c = u.namespaces;
                    a.options.fallbackNS &&
                      (c = c.concat(a.options.fallbackNS));
                    var p = void 0 !== s.count && "string" != typeof s.count,
                      f =
                        void 0 !== s.context &&
                        "string" == typeof s.context &&
                        "" !== s.context,
                      g = s.lngs
                        ? s.lngs
                        : a.languageUtils.toResolveHierarchy(
                            s.lng || a.language,
                            s.fallbackLng
                          );
                    c.forEach(function (e) {
                      a.isValidLookup(t) ||
                        ((r = e),
                        !R["".concat(g[0], "-").concat(e)] &&
                          a.utils &&
                          a.utils.hasLoadedNamespace &&
                          !a.utils.hasLoadedNamespace(r) &&
                          ((R["".concat(g[0], "-").concat(e)] = !0),
                          a.logger.warn(
                            'key "'
                              .concat(n, '" for languages "')
                              .concat(
                                g.join(", "),
                                '" won\'t get resolved as namespace "'
                              )
                              .concat(r, '" was not yet loaded'),
                            "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!"
                          )),
                        g.forEach(function (n) {
                          if (!a.isValidLookup(t)) {
                            i = n;
                            var r,
                              u,
                              c = l,
                              g = [c];
                            if (a.i18nFormat && a.i18nFormat.addLookupKeys)
                              a.i18nFormat.addLookupKeys(g, l, n, e, s);
                            else
                              p && (r = a.pluralResolver.getSuffix(n, s.count)),
                                p && f && g.push(c + r),
                                f &&
                                  g.push(
                                    (c += ""
                                      .concat(a.options.contextSeparator)
                                      .concat(s.context))
                                  ),
                                p && g.push((c += r));
                            for (; (u = g.pop()); )
                              a.isValidLookup(t) ||
                                ((o = u), (t = a.getResource(n, e, u, s)));
                          }
                        }));
                    });
                  }
                }),
                { res: t, usedKey: n, exactUsedKey: o, usedLng: i, usedNS: r }
              );
            },
          },
          {
            key: "isValidLookup",
            value: function (e) {
              return !(
                void 0 === e ||
                (!this.options.returnNull && null === e) ||
                (!this.options.returnEmptyString && "" === e)
              );
            },
          },
          {
            key: "getResource",
            value: function (e, t, n) {
              var o =
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : {};
              return this.i18nFormat && this.i18nFormat.getResource
                ? this.i18nFormat.getResource(e, t, n, o)
                : this.resourceStore.getResource(e, t, n, o);
            },
          },
        ]),
        i
      );
    })();
  function N(e) {
    return e.charAt(0).toUpperCase() + e.slice(1);
  }
  var j = (function () {
      function e(t) {
        o(this, e),
          (this.options = t),
          (this.whitelist = this.options.supportedLngs || !1),
          (this.supportedLngs = this.options.supportedLngs || !1),
          (this.logger = f.create("languageUtils"));
      }
      return (
        r(e, [
          {
            key: "getScriptPartFromCode",
            value: function (e) {
              if (!e || e.indexOf("-") < 0) return null;
              var t = e.split("-");
              return 2 === t.length
                ? null
                : (t.pop(),
                  "x" === t[t.length - 1].toLowerCase()
                    ? null
                    : this.formatLanguageCode(t.join("-")));
            },
          },
          {
            key: "getLanguagePartFromCode",
            value: function (e) {
              if (!e || e.indexOf("-") < 0) return e;
              var t = e.split("-");
              return this.formatLanguageCode(t[0]);
            },
          },
          {
            key: "formatLanguageCode",
            value: function (e) {
              if ("string" == typeof e && e.indexOf("-") > -1) {
                var t = [
                    "hans",
                    "hant",
                    "latn",
                    "cyrl",
                    "cans",
                    "mong",
                    "arab",
                  ],
                  n = e.split("-");
                return (
                  this.options.lowerCaseLng
                    ? (n = n.map(function (e) {
                        return e.toLowerCase();
                      }))
                    : 2 === n.length
                    ? ((n[0] = n[0].toLowerCase()),
                      (n[1] = n[1].toUpperCase()),
                      t.indexOf(n[1].toLowerCase()) > -1 &&
                        (n[1] = N(n[1].toLowerCase())))
                    : 3 === n.length &&
                      ((n[0] = n[0].toLowerCase()),
                      2 === n[1].length && (n[1] = n[1].toUpperCase()),
                      "sgn" !== n[0] &&
                        2 === n[2].length &&
                        (n[2] = n[2].toUpperCase()),
                      t.indexOf(n[1].toLowerCase()) > -1 &&
                        (n[1] = N(n[1].toLowerCase())),
                      t.indexOf(n[2].toLowerCase()) > -1 &&
                        (n[2] = N(n[2].toLowerCase()))),
                  n.join("-")
                );
              }
              return this.options.cleanCode || this.options.lowerCaseLng
                ? e.toLowerCase()
                : e;
            },
          },
          {
            key: "isWhitelisted",
            value: function (e) {
              return (
                this.logger.deprecate(
                  "languageUtils.isWhitelisted",
                  'function "isWhitelisted" will be renamed to "isSupportedCode" in the next major - please make sure to rename it\'s usage asap.'
                ),
                this.isSupportedCode(e)
              );
            },
          },
          {
            key: "isSupportedCode",
            value: function (e) {
              return (
                ("languageOnly" === this.options.load ||
                  this.options.nonExplicitSupportedLngs) &&
                  (e = this.getLanguagePartFromCode(e)),
                !this.supportedLngs ||
                  !this.supportedLngs.length ||
                  this.supportedLngs.indexOf(e) > -1
              );
            },
          },
          {
            key: "getBestMatchFromCodes",
            value: function (e) {
              var t,
                n = this;
              return e
                ? (e.forEach(function (e) {
                    if (!t) {
                      var o = n.formatLanguageCode(e);
                      (n.options.supportedLngs && !n.isSupportedCode(o)) ||
                        (t = o);
                    }
                  }),
                  !t &&
                    this.options.supportedLngs &&
                    e.forEach(function (e) {
                      if (!t) {
                        var o = n.getLanguagePartFromCode(e);
                        if (n.isSupportedCode(o)) return (t = o);
                        t = n.options.supportedLngs.find(function (e) {
                          if (0 === e.indexOf(o)) return e;
                        });
                      }
                    }),
                  t || (t = this.getFallbackCodes(this.options.fallbackLng)[0]),
                  t)
                : null;
            },
          },
          {
            key: "getFallbackCodes",
            value: function (e, t) {
              if (!e) return [];
              if (
                ("function" == typeof e && (e = e(t)),
                "string" == typeof e && (e = [e]),
                "[object Array]" === Object.prototype.toString.apply(e))
              )
                return e;
              if (!t) return e.default || [];
              var n = e[t];
              return (
                n || (n = e[this.getScriptPartFromCode(t)]),
                n || (n = e[this.formatLanguageCode(t)]),
                n || (n = e[this.getLanguagePartFromCode(t)]),
                n || (n = e.default),
                n || []
              );
            },
          },
          {
            key: "toResolveHierarchy",
            value: function (e, t) {
              var n = this,
                o = this.getFallbackCodes(
                  t || this.options.fallbackLng || [],
                  e
                ),
                i = [],
                r = function (e) {
                  e &&
                    (n.isSupportedCode(e)
                      ? i.push(e)
                      : n.logger.warn(
                          "rejecting language code not found in supportedLngs: ".concat(
                            e
                          )
                        ));
                };
              return (
                "string" == typeof e && e.indexOf("-") > -1
                  ? ("languageOnly" !== this.options.load &&
                      r(this.formatLanguageCode(e)),
                    "languageOnly" !== this.options.load &&
                      "currentOnly" !== this.options.load &&
                      r(this.getScriptPartFromCode(e)),
                    "currentOnly" !== this.options.load &&
                      r(this.getLanguagePartFromCode(e)))
                  : "string" == typeof e && r(this.formatLanguageCode(e)),
                o.forEach(function (e) {
                  i.indexOf(e) < 0 && r(n.formatLanguageCode(e));
                }),
                i
              );
            },
          },
        ]),
        e
      );
    })(),
    E = [
      {
        lngs: [
          "ach",
          "ak",
          "am",
          "arn",
          "br",
          "fil",
          "gun",
          "ln",
          "mfe",
          "mg",
          "mi",
          "oc",
          "pt",
          "pt-BR",
          "tg",
          "ti",
          "tr",
          "uz",
          "wa",
        ],
        nr: [1, 2],
        fc: 1,
      },
      {
        lngs: [
          "af",
          "an",
          "ast",
          "az",
          "bg",
          "bn",
          "ca",
          "da",
          "de",
          "dev",
          "el",
          "en",
          "eo",
          "es",
          "et",
          "eu",
          "fi",
          "fo",
          "fur",
          "fy",
          "gl",
          "gu",
          "ha",
          "hi",
          "hu",
          "hy",
          "ia",
          "it",
          "kn",
          "ku",
          "lb",
          "mai",
          "ml",
          "mn",
          "mr",
          "nah",
          "nap",
          "nb",
          "ne",
          "nl",
          "nn",
          "no",
          "nso",
          "pa",
          "pap",
          "pms",
          "ps",
          "pt-PT",
          "rm",
          "sco",
          "se",
          "si",
          "so",
          "son",
          "sq",
          "sv",
          "sw",
          "ta",
          "te",
          "tk",
          "ur",
          "yo",
        ],
        nr: [1, 2],
        fc: 2,
      },
      {
        lngs: [
          "ay",
          "bo",
          "cgg",
          "fa",
          "ht",
          "id",
          "ja",
          "jbo",
          "ka",
          "kk",
          "km",
          "ko",
          "ky",
          "lo",
          "ms",
          "sah",
          "su",
          "th",
          "tt",
          "ug",
          "vi",
          "wo",
          "zh",
        ],
        nr: [1],
        fc: 3,
      },
      {
        lngs: ["be", "bs", "cnr", "dz", "hr", "ru", "sr", "uk"],
        nr: [1, 2, 5],
        fc: 4,
      },
      { lngs: ["ar"], nr: [0, 1, 2, 3, 11, 100], fc: 5 },
      { lngs: ["cs", "sk"], nr: [1, 2, 5], fc: 6 },
      { lngs: ["csb", "pl"], nr: [1, 2, 5], fc: 7 },
      { lngs: ["cy"], nr: [1, 2, 3, 8], fc: 8 },
      { lngs: ["fr"], nr: [1, 2], fc: 9 },
      { lngs: ["ga"], nr: [1, 2, 3, 7, 11], fc: 10 },
      { lngs: ["gd"], nr: [1, 2, 3, 20], fc: 11 },
      { lngs: ["is"], nr: [1, 2], fc: 12 },
      { lngs: ["jv"], nr: [0, 1], fc: 13 },
      { lngs: ["kw"], nr: [1, 2, 3, 4], fc: 14 },
      { lngs: ["lt"], nr: [1, 2, 10], fc: 15 },
      { lngs: ["lv"], nr: [1, 2, 0], fc: 16 },
      { lngs: ["mk"], nr: [1, 2], fc: 17 },
      { lngs: ["mnk"], nr: [0, 1, 2], fc: 18 },
      { lngs: ["mt"], nr: [1, 2, 11, 20], fc: 19 },
      { lngs: ["or"], nr: [2, 1], fc: 2 },
      { lngs: ["ro"], nr: [1, 2, 20], fc: 20 },
      { lngs: ["sl"], nr: [5, 1, 2, 3], fc: 21 },
      { lngs: ["he", "iw"], nr: [1, 2, 20, 21], fc: 22 },
    ],
    P = {
      1: function (e) {
        return Number(e > 1);
      },
      2: function (e) {
        return Number(1 != e);
      },
      3: function (e) {
        return 0;
      },
      4: function (e) {
        return Number(
          e % 10 == 1 && e % 100 != 11
            ? 0
            : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20)
            ? 1
            : 2
        );
      },
      5: function (e) {
        return Number(
          0 == e
            ? 0
            : 1 == e
            ? 1
            : 2 == e
            ? 2
            : e % 100 >= 3 && e % 100 <= 10
            ? 3
            : e % 100 >= 11
            ? 4
            : 5
        );
      },
      6: function (e) {
        return Number(1 == e ? 0 : e >= 2 && e <= 4 ? 1 : 2);
      },
      7: function (e) {
        return Number(
          1 == e
            ? 0
            : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20)
            ? 1
            : 2
        );
      },
      8: function (e) {
        return Number(1 == e ? 0 : 2 == e ? 1 : 8 != e && 11 != e ? 2 : 3);
      },
      9: function (e) {
        return Number(e >= 2);
      },
      10: function (e) {
        return Number(1 == e ? 0 : 2 == e ? 1 : e < 7 ? 2 : e < 11 ? 3 : 4);
      },
      11: function (e) {
        return Number(
          1 == e || 11 == e
            ? 0
            : 2 == e || 12 == e
            ? 1
            : e > 2 && e < 20
            ? 2
            : 3
        );
      },
      12: function (e) {
        return Number(e % 10 != 1 || e % 100 == 11);
      },
      13: function (e) {
        return Number(0 !== e);
      },
      14: function (e) {
        return Number(1 == e ? 0 : 2 == e ? 1 : 3 == e ? 2 : 3);
      },
      15: function (e) {
        return Number(
          e % 10 == 1 && e % 100 != 11
            ? 0
            : e % 10 >= 2 && (e % 100 < 10 || e % 100 >= 20)
            ? 1
            : 2
        );
      },
      16: function (e) {
        return Number(e % 10 == 1 && e % 100 != 11 ? 0 : 0 !== e ? 1 : 2);
      },
      17: function (e) {
        return Number(1 == e || (e % 10 == 1 && e % 100 != 11) ? 0 : 1);
      },
      18: function (e) {
        return Number(0 == e ? 0 : 1 == e ? 1 : 2);
      },
      19: function (e) {
        return Number(
          1 == e
            ? 0
            : 0 == e || (e % 100 > 1 && e % 100 < 11)
            ? 1
            : e % 100 > 10 && e % 100 < 20
            ? 2
            : 3
        );
      },
      20: function (e) {
        return Number(
          1 == e ? 0 : 0 == e || (e % 100 > 0 && e % 100 < 20) ? 1 : 2
        );
      },
      21: function (e) {
        return Number(
          e % 100 == 1
            ? 1
            : e % 100 == 2
            ? 2
            : e % 100 == 3 || e % 100 == 4
            ? 3
            : 0
        );
      },
      22: function (e) {
        return Number(
          1 == e ? 0 : 2 == e ? 1 : (e < 0 || e > 10) && e % 10 == 0 ? 2 : 3
        );
      },
    };
  var F = (function () {
      function e(t) {
        var n,
          i =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        o(this, e),
          (this.languageUtils = t),
          (this.options = i),
          (this.logger = f.create("pluralResolver")),
          (this.rules =
            ((n = {}),
            E.forEach(function (e) {
              e.lngs.forEach(function (t) {
                n[t] = { numbers: e.nr, plurals: P[e.fc] };
              });
            }),
            n));
      }
      return (
        r(e, [
          {
            key: "addRule",
            value: function (e, t) {
              this.rules[e] = t;
            },
          },
          {
            key: "getRule",
            value: function (e) {
              return (
                this.rules[e] ||
                this.rules[this.languageUtils.getLanguagePartFromCode(e)]
              );
            },
          },
          {
            key: "needsPlural",
            value: function (e) {
              var t = this.getRule(e);
              return t && t.numbers.length > 1;
            },
          },
          {
            key: "getPluralFormsOfKey",
            value: function (e, t) {
              var n = this,
                o = [],
                i = this.getRule(e);
              return i
                ? (i.numbers.forEach(function (i) {
                    var r = n.getSuffix(e, i);
                    o.push("".concat(t).concat(r));
                  }),
                  o)
                : o;
            },
          },
          {
            key: "getSuffix",
            value: function (e, t) {
              var n = this,
                o = this.getRule(e);
              if (o) {
                var i = o.noAbs ? o.plurals(t) : o.plurals(Math.abs(t)),
                  r = o.numbers[i];
                this.options.simplifyPluralSuffix &&
                  2 === o.numbers.length &&
                  1 === o.numbers[0] &&
                  (2 === r ? (r = "plural") : 1 === r && (r = ""));
                var a = function () {
                  return n.options.prepend && r.toString()
                    ? n.options.prepend + r.toString()
                    : r.toString();
                };
                return "v1" === this.options.compatibilityJSON
                  ? 1 === r
                    ? ""
                    : "number" == typeof r
                    ? "_plural_".concat(r.toString())
                    : a()
                  : "v2" === this.options.compatibilityJSON
                  ? a()
                  : this.options.simplifyPluralSuffix &&
                    2 === o.numbers.length &&
                    1 === o.numbers[0]
                  ? a()
                  : this.options.prepend && i.toString()
                  ? this.options.prepend + i.toString()
                  : i.toString();
              }
              return (
                this.logger.warn("no plural rule found for: ".concat(e)), ""
              );
            },
          },
        ]),
        e
      );
    })(),
    V = (function () {
      function e() {
        var t =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        o(this, e),
          (this.logger = f.create("interpolator")),
          (this.options = t),
          (this.format =
            (t.interpolation && t.interpolation.format) ||
            function (e) {
              return e;
            }),
          this.init(t);
      }
      return (
        r(e, [
          {
            key: "init",
            value: function () {
              var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {};
              e.interpolation || (e.interpolation = { escapeValue: !0 });
              var t = e.interpolation;
              (this.escape = void 0 !== t.escape ? t.escape : w),
                (this.escapeValue = void 0 === t.escapeValue || t.escapeValue),
                (this.useRawValueToEscape =
                  void 0 !== t.useRawValueToEscape && t.useRawValueToEscape),
                (this.prefix = t.prefix
                  ? k(t.prefix)
                  : t.prefixEscaped || "{{"),
                (this.suffix = t.suffix
                  ? k(t.suffix)
                  : t.suffixEscaped || "}}"),
                (this.formatSeparator = t.formatSeparator
                  ? t.formatSeparator
                  : t.formatSeparator || ","),
                (this.unescapePrefix = t.unescapeSuffix
                  ? ""
                  : t.unescapePrefix || "-"),
                (this.unescapeSuffix = this.unescapePrefix
                  ? ""
                  : t.unescapeSuffix || ""),
                (this.nestingPrefix = t.nestingPrefix
                  ? k(t.nestingPrefix)
                  : t.nestingPrefixEscaped || k("$t(")),
                (this.nestingSuffix = t.nestingSuffix
                  ? k(t.nestingSuffix)
                  : t.nestingSuffixEscaped || k(")")),
                (this.nestingOptionsSeparator = t.nestingOptionsSeparator
                  ? t.nestingOptionsSeparator
                  : t.nestingOptionsSeparator || ","),
                (this.maxReplaces = t.maxReplaces ? t.maxReplaces : 1e3),
                (this.alwaysFormat =
                  void 0 !== t.alwaysFormat && t.alwaysFormat),
                this.resetRegExp();
            },
          },
          {
            key: "reset",
            value: function () {
              this.options && this.init(this.options);
            },
          },
          {
            key: "resetRegExp",
            value: function () {
              var e = "".concat(this.prefix, "(.+?)").concat(this.suffix);
              this.regexp = new RegExp(e, "g");
              var t = ""
                .concat(this.prefix)
                .concat(this.unescapePrefix, "(.+?)")
                .concat(this.unescapeSuffix)
                .concat(this.suffix);
              this.regexpUnescape = new RegExp(t, "g");
              var n = ""
                .concat(this.nestingPrefix, "(.+?)")
                .concat(this.nestingSuffix);
              this.nestingRegexp = new RegExp(n, "g");
            },
          },
          {
            key: "interpolate",
            value: function (e, t, n, o) {
              var i,
                r,
                a,
                s = this,
                u =
                  (this.options &&
                    this.options.interpolation &&
                    this.options.interpolation.defaultVariables) ||
                  {};
              function l(e) {
                return e.replace(/\$/g, "$$$$");
              }
              var c = function (e) {
                if (e.indexOf(s.formatSeparator) < 0) {
                  var i = b(t, u, e);
                  return s.alwaysFormat ? s.format(i, void 0, n) : i;
                }
                var r = e.split(s.formatSeparator),
                  a = r.shift().trim(),
                  l = r.join(s.formatSeparator).trim();
                return s.format(b(t, u, a), l, n, o);
              };
              this.resetRegExp();
              var p =
                  (o && o.missingInterpolationHandler) ||
                  this.options.missingInterpolationHandler,
                f =
                  (o && o.interpolation && o.interpolation.skipOnVariables) ||
                  this.options.interpolation.skipOnVariables;
              return (
                [
                  {
                    regex: this.regexpUnescape,
                    safeValue: function (e) {
                      return l(e);
                    },
                  },
                  {
                    regex: this.regexp,
                    safeValue: function (e) {
                      return s.escapeValue ? l(s.escape(e)) : l(e);
                    },
                  },
                ].forEach(function (t) {
                  for (a = 0; (i = t.regex.exec(e)); ) {
                    if (void 0 === (r = c(i[1].trim())))
                      if ("function" == typeof p) {
                        var n = p(e, i, o);
                        r = "string" == typeof n ? n : "";
                      } else {
                        if (f) {
                          r = i[0];
                          continue;
                        }
                        s.logger.warn(
                          "missed to pass in variable "
                            .concat(i[1], " for interpolating ")
                            .concat(e)
                        ),
                          (r = "");
                      }
                    else
                      "string" == typeof r ||
                        s.useRawValueToEscape ||
                        (r = d(r));
                    if (
                      ((e = e.replace(i[0], t.safeValue(r))),
                      (t.regex.lastIndex = 0),
                      ++a >= s.maxReplaces)
                    )
                      break;
                  }
                }),
                e
              );
            },
          },
          {
            key: "nest",
            value: function (e, t) {
              var o,
                i,
                r = this,
                a =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : {},
                s = n({}, a);
              function u(e, t) {
                var o = this.nestingOptionsSeparator;
                if (e.indexOf(o) < 0) return e;
                var i = e.split(new RegExp("".concat(o, "[ ]*{"))),
                  r = "{".concat(i[1]);
                (e = i[0]),
                  (r = (r = this.interpolate(r, s)).replace(/'/g, '"'));
                try {
                  (s = JSON.parse(r)), t && (s = n({}, t, s));
                } catch (t) {
                  return (
                    this.logger.warn(
                      "failed parsing options string in nesting for key ".concat(
                        e
                      ),
                      t
                    ),
                    "".concat(e).concat(o).concat(r)
                  );
                }
                return delete s.defaultValue, e;
              }
              for (
                s.applyPostProcessor = !1, delete s.defaultValue;
                (o = this.nestingRegexp.exec(e));

              ) {
                var l = [],
                  c = !1;
                if (o[0].includes(this.formatSeparator) && !/{.*}/.test(o[1])) {
                  var p = o[1].split(this.formatSeparator).map(function (e) {
                    return e.trim();
                  });
                  (o[1] = p.shift()), (l = p), (c = !0);
                }
                if (
                  (i = t(u.call(this, o[1].trim(), s), s)) &&
                  o[0] === e &&
                  "string" != typeof i
                )
                  return i;
                "string" != typeof i && (i = d(i)),
                  i ||
                    (this.logger.warn(
                      "missed to resolve "
                        .concat(o[1], " for nesting ")
                        .concat(e)
                    ),
                    (i = "")),
                  c &&
                    (i = l.reduce(function (e, t) {
                      return r.format(e, t, a.lng, a);
                    }, i.trim())),
                  (e = e.replace(o[0], i)),
                  (this.regexp.lastIndex = 0);
              }
              return e;
            },
          },
        ]),
        e
      );
    })();
  var T = (function (e) {
    function t(e, n, i) {
      var r,
        l = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
      return (
        o(this, t),
        (r = s(this, u(t).call(this))),
        S && g.call(a(r)),
        (r.backend = e),
        (r.store = n),
        (r.services = i),
        (r.languageUtils = i.languageUtils),
        (r.options = l),
        (r.logger = f.create("backendConnector")),
        (r.state = {}),
        (r.queue = []),
        r.backend && r.backend.init && r.backend.init(i, l.backend, l),
        r
      );
    }
    return (
      c(t, g),
      r(t, [
        {
          key: "queueLoad",
          value: function (e, t, n, o) {
            var i = this,
              r = [],
              a = [],
              s = [],
              u = [];
            return (
              e.forEach(function (e) {
                var o = !0;
                t.forEach(function (t) {
                  var s = "".concat(e, "|").concat(t);
                  !n.reload && i.store.hasResourceBundle(e, t)
                    ? (i.state[s] = 2)
                    : i.state[s] < 0 ||
                      (1 === i.state[s]
                        ? a.indexOf(s) < 0 && a.push(s)
                        : ((i.state[s] = 1),
                          (o = !1),
                          a.indexOf(s) < 0 && a.push(s),
                          r.indexOf(s) < 0 && r.push(s),
                          u.indexOf(t) < 0 && u.push(t)));
                }),
                  o || s.push(e);
              }),
              (r.length || a.length) &&
                this.queue.push({
                  pending: a,
                  loaded: {},
                  errors: [],
                  callback: o,
                }),
              { toLoad: r, pending: a, toLoadLanguages: s, toLoadNamespaces: u }
            );
          },
        },
        {
          key: "loaded",
          value: function (e, t, n) {
            var o = e.split("|"),
              i = o[0],
              r = o[1];
            t && this.emit("failedLoading", i, r, t),
              n && this.store.addResourceBundle(i, r, n),
              (this.state[e] = t ? -1 : 2);
            var a = {};
            this.queue.forEach(function (n) {
              var o, s, u, l, c, p;
              (o = n.loaded),
                (s = r),
                (l = v(o, [i], Object)),
                (c = l.obj),
                (p = l.k),
                (c[p] = c[p] || []),
                u && (c[p] = c[p].concat(s)),
                u || c[p].push(s),
                (function (e, t) {
                  for (var n = e.indexOf(t); -1 !== n; )
                    e.splice(n, 1), (n = e.indexOf(t));
                })(n.pending, e),
                t && n.errors.push(t),
                0 !== n.pending.length ||
                  n.done ||
                  (Object.keys(n.loaded).forEach(function (e) {
                    a[e] || (a[e] = []),
                      n.loaded[e].length &&
                        n.loaded[e].forEach(function (t) {
                          a[e].indexOf(t) < 0 && a[e].push(t);
                        });
                  }),
                  (n.done = !0),
                  n.errors.length ? n.callback(n.errors) : n.callback());
            }),
              this.emit("loaded", a),
              (this.queue = this.queue.filter(function (e) {
                return !e.done;
              }));
          },
        },
        {
          key: "read",
          value: function (e, t, n) {
            var o = this,
              i =
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : 0,
              r =
                arguments.length > 4 && void 0 !== arguments[4]
                  ? arguments[4]
                  : 350,
              a = arguments.length > 5 ? arguments[5] : void 0;
            return e.length
              ? this.backend[n](e, t, function (s, u) {
                  s && u && i < 5
                    ? setTimeout(function () {
                        o.read.call(o, e, t, n, i + 1, 2 * r, a);
                      }, r)
                    : a(s, u);
                })
              : a(null, {});
          },
        },
        {
          key: "prepareLoading",
          value: function (e, t) {
            var n = this,
              o =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : {},
              i = arguments.length > 3 ? arguments[3] : void 0;
            if (!this.backend)
              return (
                this.logger.warn(
                  "No backend was added via i18next.use. Will not load resources."
                ),
                i && i()
              );
            "string" == typeof e &&
              (e = this.languageUtils.toResolveHierarchy(e)),
              "string" == typeof t && (t = [t]);
            var r = this.queueLoad(e, t, o, i);
            if (!r.toLoad.length) return r.pending.length || i(), null;
            r.toLoad.forEach(function (e) {
              n.loadOne(e);
            });
          },
        },
        {
          key: "load",
          value: function (e, t, n) {
            this.prepareLoading(e, t, {}, n);
          },
        },
        {
          key: "reload",
          value: function (e, t, n) {
            this.prepareLoading(e, t, { reload: !0 }, n);
          },
        },
        {
          key: "loadOne",
          value: function (e) {
            var t = this,
              n =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : "",
              o = e.split("|"),
              i = o[0],
              r = o[1];
            this.read(i, r, "read", void 0, void 0, function (o, a) {
              o &&
                t.logger.warn(
                  ""
                    .concat(n, "loading namespace ")
                    .concat(r, " for language ")
                    .concat(i, " failed"),
                  o
                ),
                !o &&
                  a &&
                  t.logger.log(
                    ""
                      .concat(n, "loaded namespace ")
                      .concat(r, " for language ")
                      .concat(i),
                    a
                  ),
                t.loaded(e, o, a);
            });
          },
        },
        {
          key: "saveMissing",
          value: function (e, t, o, i, r) {
            var a =
              arguments.length > 5 && void 0 !== arguments[5]
                ? arguments[5]
                : {};
            this.services.utils &&
            this.services.utils.hasLoadedNamespace &&
            !this.services.utils.hasLoadedNamespace(t)
              ? this.logger.warn(
                  'did not save key "'
                    .concat(o, '" as the namespace "')
                    .concat(t, '" was not yet loaded'),
                  "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!"
                )
              : null != o &&
                "" !== o &&
                (this.backend &&
                  this.backend.create &&
                  this.backend.create(
                    e,
                    t,
                    o,
                    i,
                    null,
                    n({}, a, { isUpdate: r })
                  ),
                e && e[0] && this.store.addResource(e[0], t, o, i));
          },
        },
      ]),
      t
    );
  })();
  function A(e) {
    return (
      "string" == typeof e.ns && (e.ns = [e.ns]),
      "string" == typeof e.fallbackLng && (e.fallbackLng = [e.fallbackLng]),
      "string" == typeof e.fallbackNS && (e.fallbackNS = [e.fallbackNS]),
      e.whitelist &&
        (e.whitelist &&
          e.whitelist.indexOf("cimode") < 0 &&
          (e.whitelist = e.whitelist.concat(["cimode"])),
        (e.supportedLngs = e.whitelist)),
      e.nonExplicitWhitelist &&
        (e.nonExplicitSupportedLngs = e.nonExplicitWhitelist),
      e.supportedLngs &&
        e.supportedLngs.indexOf("cimode") < 0 &&
        (e.supportedLngs = e.supportedLngs.concat(["cimode"])),
      e
    );
  }
  function U() {}
  return new ((function (t) {
    function i() {
      var e,
        t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        n = arguments.length > 1 ? arguments[1] : void 0;
      if (
        (o(this, i),
        (e = s(this, u(i).call(this))),
        S && g.call(a(e)),
        (e.options = A(t)),
        (e.services = {}),
        (e.logger = f),
        (e.modules = { external: [] }),
        n && !e.isInitialized && !t.isClone)
      ) {
        if (!e.options.initImmediate) return e.init(t, n), s(e, a(e));
        setTimeout(function () {
          e.init(t, n);
        }, 0);
      }
      return e;
    }
    return (
      c(i, g),
      r(i, [
        {
          key: "init",
          value: function () {
            var t = this,
              o =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              i = arguments.length > 1 ? arguments[1] : void 0;
            function r(e) {
              return e ? ("function" == typeof e ? new e() : e) : null;
            }
            if (
              ("function" == typeof o && ((i = o), (o = {})),
              o.whitelist &&
                !o.supportedLngs &&
                this.logger.deprecate(
                  "whitelist",
                  'option "whitelist" will be renamed to "supportedLngs" in the next major - please make sure to rename this option asap.'
                ),
              o.nonExplicitWhitelist &&
                !o.nonExplicitSupportedLngs &&
                this.logger.deprecate(
                  "whitelist",
                  'options "nonExplicitWhitelist" will be renamed to "nonExplicitSupportedLngs" in the next major - please make sure to rename this option asap.'
                ),
              (this.options = n(
                {},
                {
                  debug: !1,
                  initImmediate: !0,
                  ns: ["translation"],
                  defaultNS: ["translation"],
                  fallbackLng: ["dev"],
                  fallbackNS: !1,
                  whitelist: !1,
                  nonExplicitWhitelist: !1,
                  supportedLngs: !1,
                  nonExplicitSupportedLngs: !1,
                  load: "all",
                  preload: !1,
                  simplifyPluralSuffix: !0,
                  keySeparator: ".",
                  nsSeparator: ":",
                  pluralSeparator: "_",
                  contextSeparator: "_",
                  partialBundledLanguages: !1,
                  saveMissing: !1,
                  updateMissing: !1,
                  saveMissingTo: "fallback",
                  saveMissingPlurals: !0,
                  missingKeyHandler: !1,
                  missingInterpolationHandler: !1,
                  postProcess: !1,
                  postProcessPassResolved: !1,
                  returnNull: !0,
                  returnEmptyString: !0,
                  returnObjects: !1,
                  joinArrays: !1,
                  returnedObjectHandler: !1,
                  parseMissingKeyHandler: !1,
                  appendNamespaceToMissingKey: !1,
                  appendNamespaceToCIMode: !1,
                  overloadTranslationOptionHandler: function (t) {
                    var n = {};
                    if (
                      ("object" === e(t[1]) && (n = t[1]),
                      "string" == typeof t[1] && (n.defaultValue = t[1]),
                      "string" == typeof t[2] && (n.tDescription = t[2]),
                      "object" === e(t[2]) || "object" === e(t[3]))
                    ) {
                      var o = t[3] || t[2];
                      Object.keys(o).forEach(function (e) {
                        n[e] = o[e];
                      });
                    }
                    return n;
                  },
                  interpolation: {
                    escapeValue: !0,
                    format: function (e, t, n, o) {
                      return e;
                    },
                    prefix: "{{",
                    suffix: "}}",
                    formatSeparator: ",",
                    unescapePrefix: "-",
                    nestingPrefix: "$t(",
                    nestingSuffix: ")",
                    nestingOptionsSeparator: ",",
                    maxReplaces: 1e3,
                    skipOnVariables: !1,
                  },
                },
                this.options,
                A(o)
              )),
              (this.format = this.options.interpolation.format),
              i || (i = U),
              !this.options.isClone)
            ) {
              this.modules.logger
                ? f.init(r(this.modules.logger), this.options)
                : f.init(null, this.options);
              var a = new j(this.options);
              this.store = new L(this.options.resources, this.options);
              var s = this.services;
              (s.logger = f),
                (s.resourceStore = this.store),
                (s.languageUtils = a),
                (s.pluralResolver = new F(a, {
                  prepend: this.options.pluralSeparator,
                  compatibilityJSON: this.options.compatibilityJSON,
                  simplifyPluralSuffix: this.options.simplifyPluralSuffix,
                })),
                (s.interpolator = new V(this.options)),
                (s.utils = {
                  hasLoadedNamespace: this.hasLoadedNamespace.bind(this),
                }),
                (s.backendConnector = new T(
                  r(this.modules.backend),
                  s.resourceStore,
                  s,
                  this.options
                )),
                s.backendConnector.on("*", function (e) {
                  for (
                    var n = arguments.length,
                      o = new Array(n > 1 ? n - 1 : 0),
                      i = 1;
                    i < n;
                    i++
                  )
                    o[i - 1] = arguments[i];
                  t.emit.apply(t, [e].concat(o));
                }),
                this.modules.languageDetector &&
                  ((s.languageDetector = r(this.modules.languageDetector)),
                  s.languageDetector.init(
                    s,
                    this.options.detection,
                    this.options
                  )),
                this.modules.i18nFormat &&
                  ((s.i18nFormat = r(this.modules.i18nFormat)),
                  s.i18nFormat.init && s.i18nFormat.init(this)),
                (this.translator = new C(this.services, this.options)),
                this.translator.on("*", function (e) {
                  for (
                    var n = arguments.length,
                      o = new Array(n > 1 ? n - 1 : 0),
                      i = 1;
                    i < n;
                    i++
                  )
                    o[i - 1] = arguments[i];
                  t.emit.apply(t, [e].concat(o));
                }),
                this.modules.external.forEach(function (e) {
                  e.init && e.init(t);
                });
            }
            this.services.languageDetector ||
              this.options.lng ||
              this.logger.warn(
                "init: no languageDetector is used and no lng is defined"
              );
            [
              "getResource",
              "hasResourceBundle",
              "getResourceBundle",
              "getDataByLanguage",
            ].forEach(function (e) {
              t[e] = function () {
                var n;
                return (n = t.store)[e].apply(n, arguments);
              };
            });
            [
              "addResource",
              "addResources",
              "addResourceBundle",
              "removeResourceBundle",
            ].forEach(function (e) {
              t[e] = function () {
                var n;
                return (n = t.store)[e].apply(n, arguments), t;
              };
            });
            var u = h(),
              l = function () {
                t.changeLanguage(t.options.lng, function (e, n) {
                  (t.isInitialized = !0),
                    t.options.isClone || t.logger.log("initialized", t.options),
                    t.emit("initialized", t.options),
                    u.resolve(n),
                    i(e, n);
                });
              };
            return (
              this.options.resources || !this.options.initImmediate
                ? l()
                : setTimeout(l, 0),
              u
            );
          },
        },
        {
          key: "loadResources",
          value: function (e) {
            var t = this,
              n =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : U,
              o = "string" == typeof e ? e : this.language;
            if (
              ("function" == typeof e && (n = e),
              !this.options.resources || this.options.partialBundledLanguages)
            ) {
              if (o && "cimode" === o.toLowerCase()) return n();
              var i = [],
                r = function (e) {
                  e &&
                    t.services.languageUtils
                      .toResolveHierarchy(e)
                      .forEach(function (e) {
                        i.indexOf(e) < 0 && i.push(e);
                      });
                };
              if (o) r(o);
              else
                this.services.languageUtils
                  .getFallbackCodes(this.options.fallbackLng)
                  .forEach(function (e) {
                    return r(e);
                  });
              this.options.preload &&
                this.options.preload.forEach(function (e) {
                  return r(e);
                }),
                this.services.backendConnector.load(i, this.options.ns, n);
            } else n(null);
          },
        },
        {
          key: "reloadResources",
          value: function (e, t, n) {
            var o = h();
            return (
              e || (e = this.languages),
              t || (t = this.options.ns),
              n || (n = U),
              this.services.backendConnector.reload(e, t, function (e) {
                o.resolve(), n(e);
              }),
              o
            );
          },
        },
        {
          key: "use",
          value: function (e) {
            if (!e)
              throw new Error(
                "You are passing an undefined module! Please check the object you are passing to i18next.use()"
              );
            if (!e.type)
              throw new Error(
                "You are passing a wrong module! Please check the object you are passing to i18next.use()"
              );
            return (
              "backend" === e.type && (this.modules.backend = e),
              ("logger" === e.type || (e.log && e.warn && e.error)) &&
                (this.modules.logger = e),
              "languageDetector" === e.type &&
                (this.modules.languageDetector = e),
              "i18nFormat" === e.type && (this.modules.i18nFormat = e),
              "postProcessor" === e.type && O.addPostProcessor(e),
              "3rdParty" === e.type && this.modules.external.push(e),
              this
            );
          },
        },
        {
          key: "changeLanguage",
          value: function (e, t) {
            var n = this;
            this.isLanguageChangingTo = e;
            var o = h();
            this.emit("languageChanging", e);
            var i = function (e) {
              var i =
                "string" == typeof e
                  ? e
                  : n.services.languageUtils.getBestMatchFromCodes(e);
              i &&
                (n.language ||
                  ((n.language = i),
                  (n.languages = n.services.languageUtils.toResolveHierarchy(
                    i
                  ))),
                n.translator.language || n.translator.changeLanguage(i),
                n.services.languageDetector &&
                  n.services.languageDetector.cacheUserLanguage(i)),
                n.loadResources(i, function (e) {
                  !(function (e, i) {
                    i
                      ? ((n.language = i),
                        (n.languages = n.services.languageUtils.toResolveHierarchy(
                          i
                        )),
                        n.translator.changeLanguage(i),
                        (n.isLanguageChangingTo = void 0),
                        n.emit("languageChanged", i),
                        n.logger.log("languageChanged", i))
                      : (n.isLanguageChangingTo = void 0),
                      o.resolve(function () {
                        return n.t.apply(n, arguments);
                      }),
                      t &&
                        t(e, function () {
                          return n.t.apply(n, arguments);
                        });
                  })(e, i);
                });
            };
            return (
              e ||
              !this.services.languageDetector ||
              this.services.languageDetector.async
                ? !e &&
                  this.services.languageDetector &&
                  this.services.languageDetector.async
                  ? this.services.languageDetector.detect(i)
                  : i(e)
                : i(this.services.languageDetector.detect()),
              o
            );
          },
        },
        {
          key: "getFixedT",
          value: function (t, o) {
            var i = this,
              r = function t(o, r) {
                var a;
                if ("object" !== e(r)) {
                  for (
                    var s = arguments.length,
                      u = new Array(s > 2 ? s - 2 : 0),
                      l = 2;
                    l < s;
                    l++
                  )
                    u[l - 2] = arguments[l];
                  a = i.options.overloadTranslationOptionHandler(
                    [o, r].concat(u)
                  );
                } else a = n({}, r);
                return (
                  (a.lng = a.lng || t.lng),
                  (a.lngs = a.lngs || t.lngs),
                  (a.ns = a.ns || t.ns),
                  i.t(o, a)
                );
              };
            return (
              "string" == typeof t ? (r.lng = t) : (r.lngs = t), (r.ns = o), r
            );
          },
        },
        {
          key: "t",
          value: function () {
            var e;
            return (
              this.translator &&
              (e = this.translator).translate.apply(e, arguments)
            );
          },
        },
        {
          key: "exists",
          value: function () {
            var e;
            return (
              this.translator &&
              (e = this.translator).exists.apply(e, arguments)
            );
          },
        },
        {
          key: "setDefaultNamespace",
          value: function (e) {
            this.options.defaultNS = e;
          },
        },
        {
          key: "hasLoadedNamespace",
          value: function (e) {
            var t = this,
              n =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {};
            if (!this.isInitialized)
              return (
                this.logger.warn(
                  "hasLoadedNamespace: i18next was not initialized",
                  this.languages
                ),
                !1
              );
            if (!this.languages || !this.languages.length)
              return (
                this.logger.warn(
                  "hasLoadedNamespace: i18n.languages were undefined or empty",
                  this.languages
                ),
                !1
              );
            var o = this.languages[0],
              i = !!this.options && this.options.fallbackLng,
              r = this.languages[this.languages.length - 1];
            if ("cimode" === o.toLowerCase()) return !0;
            var a = function (e, n) {
              var o =
                t.services.backendConnector.state["".concat(e, "|").concat(n)];
              return -1 === o || 2 === o;
            };
            if (n.precheck) {
              var s = n.precheck(this, a);
              if (void 0 !== s) return s;
            }
            return (
              !!this.hasResourceBundle(o, e) ||
              !this.services.backendConnector.backend ||
              !(!a(o, e) || (i && !a(r, e)))
            );
          },
        },
        {
          key: "loadNamespaces",
          value: function (e, t) {
            var n = this,
              o = h();
            return this.options.ns
              ? ("string" == typeof e && (e = [e]),
                e.forEach(function (e) {
                  n.options.ns.indexOf(e) < 0 && n.options.ns.push(e);
                }),
                this.loadResources(function (e) {
                  o.resolve(), t && t(e);
                }),
                o)
              : (t && t(), Promise.resolve());
          },
        },
        {
          key: "loadLanguages",
          value: function (e, t) {
            var n = h();
            "string" == typeof e && (e = [e]);
            var o = this.options.preload || [],
              i = e.filter(function (e) {
                return o.indexOf(e) < 0;
              });
            return i.length
              ? ((this.options.preload = o.concat(i)),
                this.loadResources(function (e) {
                  n.resolve(), t && t(e);
                }),
                n)
              : (t && t(), Promise.resolve());
          },
        },
        {
          key: "dir",
          value: function (e) {
            if (
              (e ||
                (e =
                  this.languages && this.languages.length > 0
                    ? this.languages[0]
                    : this.language),
              !e)
            )
              return "rtl";
            return [
              "ar",
              "shu",
              "sqr",
              "ssh",
              "xaa",
              "yhd",
              "yud",
              "aao",
              "abh",
              "abv",
              "acm",
              "acq",
              "acw",
              "acx",
              "acy",
              "adf",
              "ads",
              "aeb",
              "aec",
              "afb",
              "ajp",
              "apc",
              "apd",
              "arb",
              "arq",
              "ars",
              "ary",
              "arz",
              "auz",
              "avl",
              "ayh",
              "ayl",
              "ayn",
              "ayp",
              "bbz",
              "pga",
              "he",
              "iw",
              "ps",
              "pbt",
              "pbu",
              "pst",
              "prp",
              "prd",
              "ug",
              "ur",
              "ydd",
              "yds",
              "yih",
              "ji",
              "yi",
              "hbo",
              "men",
              "xmn",
              "fa",
              "jpr",
              "peo",
              "pes",
              "prs",
              "dv",
              "sam",
            ].indexOf(this.services.languageUtils.getLanguagePartFromCode(e)) >=
              0
              ? "rtl"
              : "ltr";
          },
        },
        {
          key: "createInstance",
          value: function () {
            return new i(
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {},
              arguments.length > 1 ? arguments[1] : void 0
            );
          },
        },
        {
          key: "cloneInstance",
          value: function () {
            var e = this,
              t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              o =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : U,
              r = n({}, this.options, t, { isClone: !0 }),
              a = new i(r);
            return (
              ["store", "services", "language"].forEach(function (t) {
                a[t] = e[t];
              }),
              (a.services = n({}, this.services)),
              (a.services.utils = {
                hasLoadedNamespace: a.hasLoadedNamespace.bind(a),
              }),
              (a.translator = new C(a.services, a.options)),
              a.translator.on("*", function (e) {
                for (
                  var t = arguments.length,
                    n = new Array(t > 1 ? t - 1 : 0),
                    o = 1;
                  o < t;
                  o++
                )
                  n[o - 1] = arguments[o];
                a.emit.apply(a, [e].concat(n));
              }),
              a.init(r, o),
              (a.translator.options = a.options),
              (a.translator.backendConnector.services.utils = {
                hasLoadedNamespace: a.hasLoadedNamespace.bind(a),
              }),
              a
            );
          },
        },
      ]),
      i
    );
  })())();
});
