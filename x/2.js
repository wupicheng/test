/**
 * Created by wupic on 2015/9/25.
 */
/*! 5435 2013-12-3 20:13:23 */
(function () {
    if (typeof __JSON_ !== "object") {
        __JSON_ = {};
        (function () {
            function f(n) {
                return n < 10 ? "0" + n : n
            }

            var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"}, rep;

            function quote(string) {
                escapable.lastIndex = 0;
                return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
                    var c = meta[a];
                    return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                }) + '"' : '"' + string + '"'
            }

            function str(key, holder) {
                var i, k, v, length, mind = gap, partial, value = holder[key];
                if (typeof rep === "function") {
                    value = rep.call(holder, key, value)
                }
                switch (typeof value) {
                    case"string":
                        return quote(value);
                    case"number":
                        return isFinite(value) ? String(value) : "null";
                    case"boolean":
                    case"null":
                        return String(value);
                    case"object":
                        if (!value) {
                            return"null"
                        }
                        gap += indent;
                        partial = [];
                        if (Object.prototype.toString.apply(value) === "[object Array]") {
                            length = value.length;
                            for (i = 0; i < length; i += 1) {
                                partial[i] = str(i, value) || "null"
                            }
                            v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                            gap = mind;
                            return v
                        }
                        if (rep && typeof rep === "object") {
                            length = rep.length;
                            for (i = 0; i < length; i += 1) {
                                if (typeof rep[i] === "string") {
                                    k = rep[i];
                                    v = str(k, value);
                                    if (v) {
                                        partial.push(quote(k) + (gap ? ": " : ":") + v)
                                    }
                                }
                            }
                        } else {
                            for (k in value) {
                                if (Object.prototype.hasOwnProperty.call(value, k)) {
                                    v = str(k, value);
                                    if (v) {
                                        partial.push(quote(k) + (gap ? ": " : ":") + v)
                                    }
                                }
                            }
                        }
                        v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
                        gap = mind;
                        return v
                }
            }

            if (typeof __JSON_.stringify !== "function") {
                __JSON_.stringify = function (value, replacer, space) {
                    var i;
                    gap = "";
                    indent = "";
                    if (typeof space === "number") {
                        for (i = 0; i < space; i += 1) {
                            indent += " "
                        }
                    } else {
                        if (typeof space === "string") {
                            indent = space
                        }
                    }
                    rep = replacer;
                    if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                        return"__JSON_.stringify \u5bf9\u8c61\u65e0\u6cd5\u88ab\u8f6c\u4e3a\u004a\u0053\u004f\u004e\u5b57\u7b26\u4e32"
                    }
                    return str("", {"": value})
                }
            }
            if (typeof __JSON_.parse !== "function") {
                __JSON_.parse = function (text, reviver) {
                    var j;

                    function walk(holder, key) {
                        var k, v, value = holder[key];
                        if (value && typeof value === "object") {
                            for (k in value) {
                                if (Object.prototype.hasOwnProperty.call(value, k)) {
                                    v = walk(value, k);
                                    if (v !== undefined) {
                                        value[k] = v
                                    } else {
                                        delete value[k]
                                    }
                                }
                            }
                        }
                        return reviver.call(holder, key, value)
                    }

                    text = String(text);
                    cx.lastIndex = 0;
                    if (cx.test(text)) {
                        text = text.replace(cx, function (a) {
                            return"\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                        })
                    }
                    if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                        if (text === "") {
                            return text
                        }
                        try {
                            j = eval("(" + text + ")")
                        } catch (e) {
                            return text
                        }
                        return typeof reviver === "function" ? walk({"": j}, "") : j
                    }
                    throw new SyntaxError("__JSON_.parse");
                    return text
                }
            }
        }())
    }
})();
(function () {
    var a = function () {
        if (a._cb) {
            a._cb.call(d)
        } else {
            d.go()
        }
    };
    var e = "baiduSC_yaq4d3elabjnvmijccc1zuo3o4yeizck";
    var d = window[e];
    if (d && !d.go && d.callback) {
        if (d.pop) {
            a.pop = d.pop
        }
        a._cb = d.callback;
        d = null
    }
    var b = "http://s.wenzhang.baidu.com";
    var c = "http://wenzhang.baidu.com";
    if (!d) {
        d = window[e] = {BAIDUSC_ENTER_CSS: b + "/css/pjt/content_ex/page/bookmark.css", BASE_URL: c, STATIC_URL: b, TPL_URL: c + "/content_ex", listenClick: function () {
            d.addEvent(document, "click", function (f) {
                if (d.humanClick) {
                    d.exit()
                }
                d.humanClick = false
            });
            d.addEvent(document, "mousedown", function (f) {
                d.humanClick = true
            })
        }, addEvent: function (h, g, f) {
            if (h.addEventListener) {
                h.addEventListener(g, f, false)
            } else {
                if (h.attachEvent) {
                    h[g + f] = function () {
                        return f.call(h, window.event)
                    };
                    h.attachEvent("on" + g, h[g + f])
                }
            }
            return f
        }, activity: {snapshot: {}, pic: {}, res: {}, article: {}}, clearIframes: function () {
            var h = d.ePanel.getElementsByTagName("iframe");
            var g, f;
            for (g = 0, f = h.length; g < f; ++g) {
                if (h[g].className !== "baiduSC_yaq4d3elabjnvmijccc1zuo3o4yeizck_select") {
                    h[g].src = "about:blank"
                }
            }
        }, buildPanel: function () {
            if (!d.ePanel) {
                d.ePanel = document.createElement("div");
                d.ePanel.innerHTML = '<div id="' + e + '_yinying" class="' + e + '_yinying"></div>';
                d.ePanel.className = e;
                d.ePanel.style.display = "none";
                d.ePanel.id = e;
                document.body.appendChild(d.ePanel);
                d.eYinying = document.getElementById(e + "_yinying")
            }
        }, intent: {go: function (g, f) {
            d.intent.show(g, f)
        }, show: function (j, k) {
            d.ePanel.style.display = "block";
            var h, f;
            var g = d.ePanel.childNodes;
            for (h = 0, f = g.length; h < f; ++h) {
                if (g[h].nodeType === 1) {
                    g[h].style.display = "none"
                }
            }
            d.eYinying.style.display = "block";
            var m = j.render(k);
            setTimeout(function () {
                d.ePanel.className += ""
            }, 100);
            d.intent.eAct = m
        }}, ActivityLogin: (function () {
            var f = function (g) {
                var h = {}, i = {};
                var j = function () {
                    h.buildIframe()
                };
                h.buildIframe = function () {
                    var k;
                    if (!i.dom) {
                        k = document.createElement("iframe");
                        k.className = e + "_login";
                        k.frameBorder = "0";
                        d.ePanel.appendChild(k)
                    }
                    i.dom = k
                };
                i.render = function (k) {
                    i.dom.src = d.TPL_URL + "/login?show=content_ex&q=" + encodeURIComponent(__JSON_.stringify(k));
                    i.dom.style.display = "block";
                    d.setPanelTopCenter({width: 400, height: 430}, i.dom);
                    i.dom.style.display = "block";
                    return i.dom
                };
                i.getWindow = function () {
                    return i.dom.contentWindow
                };
                j();
                return i
            };
            return f
        }()), ActivitySelectFlow: (function () {
            var f = function () {
                var g = {}, h = {};
                var i = function () {
                    g.buildIframe()
                };
                g.buildIframe = function () {
                    if (!h.dom) {
                        var j;
                        j = document.createElement("iframe");
                        j.className = e + "_select";
                        j.frameBorder = "0";
                        d.ePanel.appendChild(j);
                        h.dom = j;
                        h.dom.src = d.TPL_URL + "/index"
                    }
                };
                h.render = function () {
                    d.setPanelTopCenter({width: 400, height: 96}, h.dom);
                    d.clearIframes();
                    h.dom.style.display = "block";
                    return h.dom
                };
                i();
                return h
            };
            return f
        }()), ActivityPicSelect: (function () {
            var f = function (g) {
                var h = {}, i = {};
                var j = function () {
                    h.buildIframe()
                };
                h.buildIframe = function () {
                    var k;
                    if (!i.dom) {
                        k = document.createElement("iframe");
                        k.className = e + "_pic";
                        k.frameBorder = "0";
                        d.ePanel.appendChild(k)
                    }
                    i.dom = k
                };
                i.render = function (k) {
                    k = k || {};
                    if (!k.noRenew) {
                        i.dom.src = d.TPL_URL + "/image"
                    }
                    i.dom.style.display = "block";
                    d.setPanelTopCenter({width: "100%", height: 650}, i.dom);
                    d.setBodyOverflow();
                    return i.dom
                };
                i.getWindow = function () {
                    return i.dom.contentWindow
                };
                j();
                return i
            };
            return f
        }()), ActivitySnapshotFetch: (function () {
            var f = function (g) {
                var h = {}, i = {};
                var j = function () {
                    h.buildIframe()
                };
                h.buildIframe = function () {
                    var k;
                    if (!i.dom) {
                        k = document.createElement("iframe");
                        k.className = e + "_snapshot";
                        k.frameBorder = "0";
                        d.ePanel.appendChild(k)
                    }
                    i.dom = k
                };
                i.render = function (k) {
                    k = k || {};
                    if (!k.noRenew) {
                        i.dom.src = d.TPL_URL + "/snapshot";
                        i.data = i.getSnapshotData();
                        i.sendData()
                    } else {
                        i.sendData()
                    }
                    d.setPanelTopCenter({width: 850, height: 90}, i.dom);
                    i.dom.style.display = "block";
                    return i.dom
                };
                i.getSnapshotData = function () {
                    var m = function (t) {
                        var v = {};
                        var u = t.slice(0, t.indexOf("?"));
                        u = u.slice(u.indexOf("//") + 2);
                        if (u.lastIndexOf("/")) {
                            v.dir = u.slice(u.indexOf("/"), u.lastIndexOf("/") + 1)
                        } else {
                            v.dir = ""
                        }
                        return v
                    };
                    var k = document.getElementsByTagName("base");
                    if (!k.length) {
                        var q = document.createElement("base");
                        q.href = location.protocol + "//" + location.host + m(location.href).dir;
                        var p = document.getElementsByTagName("head")[0];
                        if (p.firstChild) {
                            p.insertBefore(q, p.firstChild)
                        } else {
                            p.appendChild(q)
                        }
                    }
                    var n = "", s = "";
                    if (document.doctype) {
                        n = "<!DOCTYPE ";
                        if (document.doctype.name) {
                            n += document.doctype.name + " "
                        }
                        if (document.doctype.publicId) {
                            n += 'PUBLIC "' + document.doctype.publicId + '" '
                        }
                        if (document.doctype.systemId) {
                            n += '"' + document.doctype.systemId + '" '
                        }
                        n += ">"
                    }
                    var l = document.documentElement;
                    if (l.outerHTML) {
                        s = l.outerHTML
                    } else {
                        s = '<html id="' + l.id ? l.id : '" class="' + l.className ? l.className : '">' + l.innerHTML + "</html>"
                    }
                    var o = document.getElementById("baiduSC_yaq4d3elabjnvmijccc1zuo3o4yeizck_css");
                    var r = document.getElementById("baiduSC_yaq4d3elabjnvmijccc1zuo3o4yeizck");
                    if (o && o.outerHTML) {
                        s = s.replace(o.outerHTML, "")
                    }
                    if (r && r.outerHTML) {
                        s = s.replace(r.outerHTML, "")
                    }
                    return{cmd: "PUSH_SNAPSHOT_CONTENT", bdstoken: d.bdstoken, sRefer: location.href, sDoctype: n, sHtml: n + s, sFrom: d.form, sTitle: document.title}
                };
                i.getWindow = function () {
                    return i.dom.contentWindow
                };
                i.sendData = function (k) {
                    i.data.bdstoken = d.bdstoken;
                    k = k || i.data;
                    d.cross_msg.postMessage(d.activity.snapshot.fetch.getWindow(), k)
                };
                j();
                return i
            };
            return f
        }()), ActivityResFetch: (function () {
            var f = function (g) {
                var h = {}, i = {};
                var j = function () {
                    h.buildIframe()
                };
                h.buildIframe = function () {
                    var k;
                    if (!i.dom) {
                        k = document.createElement("iframe");
                        k.className = e + "_res";
                        k.frameBorder = "0";
                        d.ePanel.appendChild(k)
                    }
                    i.dom = k
                };
                i.render = function (k) {
                    k = k || {};
                    if (!k.noRenew) {
                        i.dom.src = d.TPL_URL + "/res"
                    }
                    d.setPanelTopCenter({width: "100%", height: 330}, i.dom);
                    d.setBodyOverflow();
                    i.dom.style.display = "block";
                    return i.dom
                };
                i.getResData = function () {
                    return{cmd: "PUSH_RES_CONTENT", sRefer: location.href, sTitle: document.title, sFrom: d.form}
                };
                i.getWindow = function () {
                    return i.dom.contentWindow
                };
                i.sendData = function (k) {
                    k = k || i.getResData();
                    d.cross_msg.postMessage(d.activity.res.fetch.getWindow(), k)
                };
                j();
                return i
            };
            return f
        }()), ActivityArticleFetch: (function () {
            var f = function (g) {
                var h = {}, i = {};
                var j = function () {
                    h.buildIframe()
                };
                h.buildIframe = function () {
                    var k;
                    if (!i.dom) {
                        k = document.createElement("iframe");
                        k.className = e + "_pic";
                        k.frameBorder = "0";
                        d.ePanel.appendChild(k)
                    }
                    i.dom = k
                };
                i.getWindow = function () {
                    return i.dom.contentWindow
                };
                h.getContent = function (t) {
                    i.bPageReady = false;
                    i.oRet = null;
                    var s = "4o8yrhx7-zm1d-agju-my5x-yh0u3au0rwqq" + Math.random();
                    var n = document.createElement("iframe");
                    var l = +new Date();
                    window[s] = function (u) {
                        var v = +new Date() - l;
                        u.iSaveArticleCost = v;
                        t(u);
                        setTimeout(function () {
                            document.body.removeChild(n)
                        }, 500)
                    };
                    if (window.$soucang) {
                        if (window.$soucang.bookmarkletTimer) {
                            return
                        }
                    } else {
                        window.$soucang = {}
                    }
                    function q(u) {
                        u.document = window.document;
                        u.version = "1.0.0";
                        u.win = window;
                        u.paths = {main: "http://localhost/", bcang: "http://wenzhang.baidu.com/"};
                        u.versioning = {};
                        u.$_cs = false
                    }

                    function o(u) {
                        if (document.readyState != "complete" && u < 30) {
                            setTimeout(function () {
                                o(u + 1)
                            }, 100);
                            return
                        }
                        q(window.$soucang)
                    }

                    o(0);
                    switch (true) {
                        case ((window.$soucang) && !(window.$visibly)):
                            window.$visibly = window.$soucang;
                            break;
                        case ((window.$visibly) && !(window.$soucang)):
                            window.$soucang = window.$visibly;
                            break
                    }
                    if (!document.readyState) {
                        q(window.$soucang)
                    }
                    var r = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html id="html" xmlns="http://www.w3.org/1999/xhtml"><head></head><body id="body"><div id="allContent"></div><script type="text/javascript">document.domain="' + document.domain + '";var sNameCallback = "' + s + '";<\/script><script type="text/javascript" src="' + d.STATIC_URL + '/js/pjt/content_ex/common/fetchArticle/jq.js"><\/script><script type="text/javascript" src="' + d.STATIC_URL + '/js/pjt/content_ex/common/fetchArticle/a.js"><\/script><script type="text/javascript" src="' + d.STATIC_URL + '/js/pjt/content_ex/common/fetchArticle/f.js"><\/script><!-- <script type="text/javascript">alert(document.domain);<\/script> --></body></html>';
                    document.domain = document.domain;
                    n.className = "baiduSC_fetch";
                    n.frameBorder = "0";
                    n.style.visibility = "hidden";
                    n.style.width = "1px";
                    n.style.height = "1px";
                    var m = navigator.userAgent.indexOf("MSIE") !== -1;
                    var p = function () {
                        var u = (n.contentDocument || n.contentWindow.document);
                        u.open();
                        u.write(r);
                        u.close()
                    };
                    if (m) {
                        n.src = "javascript:'<script>window.onload=function(){ document.write(\\'<script>document.domain=\\\"" + document.domain + "\\\";var canAccess = true;<\\\\/script>\\');  document.close();};<\/script>'";
                        document.body.appendChild(n);
                        var k = setInterval(function () {
                            if (n.contentWindow.canAccess) {
                                clearInterval(k);
                                p()
                            }
                        }, 1000)
                    } else {
                        document.body.appendChild(n);
                        p()
                    }
                };
                i.sendRet = function (k) {
                    k = k || i.oRet;
                    if (i.bPageReady && i.oRet) {
                        d.cross_msg.postMessage(i.getWindow(), {cmd: "PUSH_ARTICLE_CONTENT", bdstoken: d.bdstoken, sFrom: d.form, sRefer: location.href, oRet: i.oRet})
                    }
                };
                i.render = function (k) {
                    k = k || {};
                    if (!k.noRenew) {
                        i.dom.src = d.TPL_URL + "/article";
                        h.getContent(function (l) {
                            i.oRet = l;
                            i.sendRet(l)
                        })
                    } else {
                        i.sendRet()
                    }
                    d.setPanelTopCenter({width: 850, height: 90}, i.dom);
                    i.dom.style.display = "block";
                    return i.dom
                };
                j();
                return i
            };
            return f
        }()), setBodyOverflow: function () {
            var g = document.getElementsByTagName("body")[0];
            var f = document.documentElement;
            d.bodyOverflowProperty = g.style.overflow;
            d.htmlOverflowProperty = f.style.overflow;
            g.style.overflow = "hidden";
            f.style.overflow = "hidden"
        }, resetBodyOverflow: function () {
            var g = document.getElementsByTagName("body")[0];
            var f = document.documentElement;
            d.bodyOverflowProperty !== undefined && (g.style.overflow = d.bodyOverflowProperty);
            d.htmlOverflowProperty !== undefined && (f.style.overflow = d.htmlOverflowProperty)
        }, fullPanel: function (f) {
            f = f || d.intent.eAct;
            d.setBodyOverflow();
            d.ePanel.style.width = "";
            d.ePanel.style.left = "";
            d.ePanel.style.marginLeft = "";
            d.ePanel.style.width = "100%";
            d.ePanel.style.height = "100%";
            f.style.width = "100%";
            f.style.height = "100%"
        }, setPanelTopCenter: function (f, g) {
            g = g || d.intent.eAct;
            d.resetBodyOverflow();
            if (f.width) {
                if (f.width === "100%") {
                    d.ePanel.style.left = "0";
                    d.ePanel.style.marginLeft = "0px";
                    d.ePanel.style.width = "100%";
                    g.style.width = "100%";
                    g.style.marginLeft = "0px";
                    d.eYinying.style.left = "50%"
                } else {
                    g.style.width = f.width + "px";
                    d.ePanel.style.left = "50%";
                    g.style.marginLeft = (-f.width / 2) + "px";
                    d.eYinying.style.marginLeft = "-713px";
                    d.ePanel.style.width = "1px";
                    d.eYinying.style.left = "0"
                }
            }
            if (f.height) {
                g.style.height = f.height + "px";
                d.ePanel.style.height = "1px"
            }
        }, exit: function () {
            d.ePanel.style.display = "none";
            d.resetBodyOverflow()
        }, loadCss: function (h) {
            var g = document.createElement("link");
            g.type = "text/css";
            g.rel = "stylesheet";
            g.media = "all";
            g.id = "baiduSC_yaq4d3elabjnvmijccc1zuo3o4yeizck_css";
            g.href = h;
            var f = document.getElementsByTagName("body")[0];
            f.firstChild ? f.insertBefore(g, f.firstChild) : f.appendChild(g)
        }, goLogin: function (f) {
            if (!d.activity.login) {
                d.activity.login = d.ActivityLogin()
            }
            d.activity.login.okCallback = function (g) {
                g(f)
            };
            d.intent.go(d.activity.login, f)
        }, cross_msg: (function () {
            var g = 0, l, k;
            var j = {};
            var i = function () {
                if (window.postMessage) {
                    if (window.addEventListener) {
                        window.addEventListener("message", f, false)
                    } else {
                        if (window.attachEvent) {
                            window.attachEvent("onmessage", f)
                        }
                    }
                } else {
                    h(window, "name")
                }
            };
            var h = function (m, q) {
                var p = "";

                function n(r) {
                    var s = r.split("^").pop().split("&");
                    return{domain: s[0], data: window.unescape(s[1])}
                }

                function o() {
                    var r = m[q];
                    if (r != p) {
                        p = r;
                        f(n(r))
                    }
                }

                l = setInterval(o, 1000 / 20)
            };
            var f = function (m) {
                m = __JSON_.parse(unescape(m.data));
                k && k({timeStamp: m.timeStamp, origin: m.origin, data: m.data})
            };
            i();
            j.postMessage = function (p, m, o) {
                o = o || "*";
                if (!p) {
                    return
                }
                if (typeof p != "object") {
                    return
                }
                var n = {data: m, origin: location.protocol + "//" + location.host, timeStamp: +new Date()};
                var n = __JSON_.stringify(n);
                n = escape(n);
                if (window.postMessage) {
                    p.postMessage(n, o)
                } else {
                    p.name = (new Date()).getTime() + (g++) + "^" + document.domain + "&" + n
                }
            };
            j.listenMessage = function (m) {
                k = m
            };
            return j
        }()), removeJs: function () {
            var g = document.getElementsByTagName("script");
            var j, h;
            var f = [];
            var k = "";
            for (j = 0, h = g.length; j < h; ++j) {
                if (g[j].byebj || d.isBookmarkJs(g[j].src)) {
                    f.push(g[j]);
                    k = g[j].src
                }
            }
            if (f.length > 0) {
                d.form = d.parseUrl("?s", k) || d.parseUrl("?client", k)
            }
            for (j = 0, h = f.length; j < h; ++j) {
                f[j].parentNode.removeChild(f[j])
            }
        }, isBookmarkJs: function (f) {
            return f && f.indexOf(b + "/js/pjt/content_ex/page/bookmark.js") > -1
        }, parseUrl: (function () {
            function f(g) {
                return !isNaN(parseFloat(g)) && isFinite(g)
            }

            return function (t, h) {
                var g = h || window.location.toString();
                if (!t) {
                    return g
                } else {
                    t = t.toString()
                }
                if (g.substring(0, 2) === "//") {
                    g = "http:" + g
                } else {
                    if (g.split("://").length === 1) {
                        g = "http://" + g
                    }
                }
                h = g.split("/");
                var l = {auth: ""}, s = h[2].split("@");
                if (s.length === 1) {
                    s = s[0].split(":")
                } else {
                    l.auth = s[0];
                    s = s[1].split(":")
                }
                l.protocol = h[0];
                l.hostname = s[0];
                l.port = (s[1] || ((l.protocol.split(":")[0].toLowerCase() === "https") ? "443" : "80"));
                l.pathname = ((h.length > 3 ? "/" : "") + h.slice(3, h.length).join("/").split("?")[0].split("#")[0]);
                var j = l.pathname;
                if (j.charAt(j.length - 1) === "/") {
                    j = j.substring(0, j.length - 1)
                }
                var o = l.hostname, p = o.split("."), q = j.split("/");
                if (t === "hostname") {
                    return o
                } else {
                    if (t === "domain") {
                        if (/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(o)) {
                            return o
                        }
                        return p.slice(-2).join(".")
                    } else {
                        if (t === "sub") {
                            return p.slice(0, p.length - 2).join(".")
                        } else {
                            if (t === "port") {
                                return l.port
                            } else {
                                if (t === "protocol") {
                                    return l.protocol.split(":")[0]
                                } else {
                                    if (t === "auth") {
                                        return l.auth
                                    } else {
                                        if (t === "user") {
                                            return l.auth.split(":")[0]
                                        } else {
                                            if (t === "pass") {
                                                return l.auth.split(":")[1] || ""
                                            } else {
                                                if (t === "path") {
                                                    return l.pathname
                                                } else {
                                                    if (t.charAt(0) === ".") {
                                                        t = t.substring(1);
                                                        if (f(t)) {
                                                            t = parseInt(t, 10);
                                                            return p[t < 0 ? p.length + t : t - 1] || ""
                                                        }
                                                    } else {
                                                        if (f(t)) {
                                                            t = parseInt(t, 10);
                                                            return q[t < 0 ? q.length + t : t] || ""
                                                        } else {
                                                            if (t === "file") {
                                                                return q.slice(-1)[0]
                                                            } else {
                                                                if (t === "filename") {
                                                                    return q.slice(-1)[0].split(".")[0]
                                                                } else {
                                                                    if (t === "fileext") {
                                                                        return q.slice(-1)[0].split(".")[1] || ""
                                                                    } else {
                                                                        if (t.charAt(0) === "?" || t.charAt(0) === "#") {
                                                                            var m = g, k = null;
                                                                            if (t.charAt(0) === "?") {
                                                                                m = (m.split("?")[1] || "").split("#")[0]
                                                                            } else {
                                                                                if (t.charAt(0) === "#") {
                                                                                    m = (m.split("#")[1] || "")
                                                                                }
                                                                            }
                                                                            if (!t.charAt(1)) {
                                                                                return m
                                                                            }
                                                                            t = t.substring(1);
                                                                            m = m.split("&");
                                                                            for (var n = 0, r = m.length; n < r; n++) {
                                                                                k = m[n].split("=");
                                                                                if (k[0] === t) {
                                                                                    return k[1] || ""
                                                                                }
                                                                            }
                                                                            return null
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return""
            }
        })(), checkUrlSame: function (h, f) {
            var i = h.indexOf("#");
            var g = f.indexOf("#");
            h = i > 0 ? h.slice(0, i) : h;
            f = g > 0 ? f.slice(0, g) : f;
            return h == f
        }, go: function (f) {
            f = f || {};
            switch (f.type) {
                case"article":
                    if (f && f.url) {
                        var g = f.url.indexOf("://");
                        if (g == -1 || g > 9) {
                            f.url = "http://" + f.url
                        }
                        if (d.checkUrlSame(location.href, f.url)) {
                        } else {
                            d.goThirdUrl(f);
                            break
                        }
                    }
                    d.cross_msg.postMessage(parent, {cmd: "GO_SAVE_TEXT"});
                    break;
                case"pic":
                    d.cross_msg.postMessage(parent, {cmd: "GO_SAVE_PIC"});
                    break;
                default:
                    d.goIndex()
            }
        }, goThirdUrl: function (f) {
            var g = d.BASE_URL + "/third/add?iu=" + encodeURIComponent(f.url) + "&it=" + encodeURIComponent(f.title) + "&fr=" + encodeURIComponent(d.form);
            open(g, "baiduSC_third_add", "alwaysRaised=yes,height=520,width=800,menubar=no,scrollbars=no,toolbar=no,z-look=yes")
        }, goIndex: function () {
            if (!d.activity.selectFlow) {
                d.activity.selectFlow = d.ActivitySelectFlow()
            }
            setTimeout(function () {
                d.intent.go(d.activity.selectFlow)
            }, 50)
        }};
        d.listenClick();
        d.loadCss(d.BAIDUSC_ENTER_CSS);
        d.buildPanel();
        d.cross_msg.listenMessage(function (g) {
            if (g.data.cmd === "GO_SAVE_PIC") {
                if (!d.activity.pic.select) {
                    d.activity.pic.select = d.ActivityPicSelect()
                }
                d.intent.go(d.activity.pic.select)
            } else {
                if (g.data.cmd === "GO_SAVE_TEXT") {
                    if (!d.activity.article.fetch) {
                        d.activity.article.fetch = d.ActivityArticleFetch()
                    }
                    d.intent.go(d.activity.article.fetch)
                } else {
                    if (g.data.cmd === "GO_SAVE_PAGE") {
                        if (!d.activity.snapshot.fetch) {
                            d.activity.snapshot.fetch = d.ActivitySnapshotFetch()
                        }
                        d.intent.go(d.activity.snapshot.fetch)
                    } else {
                        if (g.data.cmd === "GO_SAVE_RES") {
                            if (!d.activity.res.fetch) {
                                d.activity.res.fetch = d.ActivityResFetch()
                            }
                            d.intent.go(d.activity.res.fetch)
                        } else {
                            if (g.data.cmd === "GO_LOGIN") {
                                d.goLogin(g.data.okCallbackData)
                            } else {
                                if (g.data.cmd === "LOGIN_OK") {
                                    d.bdstoken = g.data.bdstoken;
                                    d.activity.login.okCallback(function (i) {
                                        switch (i.srcSign) {
                                            case"pic_select_c":
                                                d.intent.go(d.activity.pic.select, {noRenew: true});
                                                if (d.activity.pic.select) {
                                                    d.cross_msg.postMessage(d.activity.pic.select.getWindow(), {cmd: "SET_BDSTOKEN", bdstoken: d.bdstoken})
                                                }
                                                break;
                                            case"article_save_c":
                                                d.intent.go(d.activity.article.fetch, {noRenew: true});
                                                if (d.activity.article.fetch) {
                                                    d.cross_msg.postMessage(d.activity.article.fetch.getWindow(), {cmd: "SET_BDSTOKEN", bdstoken: d.bdstoken})
                                                }
                                                break;
                                            case"res_list_c":
                                                d.intent.go(d.activity.res.fetch);
                                                if (d.activity.res.fetch) {
                                                    d.cross_msg.postMessage(d.activity.res.fetch.getWindow(), {cmd: "SET_BDSTOKEN", bdstoken: d.bdstoken})
                                                }
                                                break;
                                            case"snapshot_save_c":
                                                d.intent.go(d.activity.snapshot.fetch, {noRenew: true});
                                                if (d.activity.snapshot.fetch) {
                                                    d.cross_msg.postMessage(d.activity.snapshot.fetch.getWindow(), {cmd: "SET_BDSTOKEN", bdstoken: d.bdstoken})
                                                }
                                                break
                                        }
                                    })
                                } else {
                                    if (g.data.cmd === "ARTICLE_PAGE_READY") {
                                        d.activity.article.fetch.bPageReady = true;
                                        d.activity.article.fetch.sendRet()
                                    } else {
                                        if (g.data.cmd === "SNAPSHOT_PAGE_READY") {
                                            d.activity.snapshot.fetch.bPageReady = true;
                                            d.activity.snapshot.fetch.sendData()
                                        } else {
                                            if (g.data.cmd === "RES_PAGE_READY") {
                                                d.activity.res.fetch.bPageReady = true;
                                                d.activity.res.fetch.sendData()
                                            } else {
                                                if (g.data.cmd === "PIC_PAGE_READY") {
                                                    var k = document.getElementsByTagName("img");
                                                    var h = [];
                                                    var j, f;
                                                    for (j = 0, f = k.length; j < f; ++j) {
                                                        h.push(k[j].src)
                                                    }
                                                    d.cross_msg.postMessage(d.activity.pic.select.getWindow(), {cmd: "PUSH_PIC_LIST", aImgSrc: h, sFrom: d.form, bdstoken: d.bdstoken, sRefer: location.href, sTitle: document.title})
                                                } else {
                                                    if (g.data.cmd === "CLOSE_IFRAME") {
                                                        d.exit()
                                                    } else {
                                                        if (g.data.cmd === "BDSTOKEN") {
                                                            d.bdstoken = g.data.value
                                                        } else {
                                                            if (g.data.cmd === "SET_IFRAME_TOPCENTER") {
                                                                d.setPanelTopCenter({width: g.data.width, height: g.data.height})
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
    }
    d.removeJs();
    a()
}());