/* درسیار من — اپلیکیشن آفلاین (Vanilla JS) */
(function () {
  "use strict";

  var DATA = window.__DARSYAR_DATA__ || [];
  var app = document.getElementById("app");

  /* ---------- ابزارها ---------- */
  var FA = "۰۱۲۳۴۵۶۷۸۹";
  function toFa(v) {
    return String(v).replace(/[0-9]/g, function (d) { return FA[+d]; });
  }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  var GRADS = {
    blue: "linear-gradient(135deg,#38bdf8,#2563eb)",
    green: "linear-gradient(135deg,#34d399,#16a34a)",
    purple: "linear-gradient(135deg,#a78bfa,#9333ea)",
    orange: "linear-gradient(135deg,#fbbf24,#f97316)",
    teal: "linear-gradient(135deg,#2dd4bf,#0891b2)",
    pink: "linear-gradient(135deg,#f472b6,#f43f5e)",
    amber: "linear-gradient(135deg,#facc15,#f59e0b)",
    red: "linear-gradient(135deg,#f87171,#e11d48)"
  };
  var SOFTS = {
    blue: "#EFF6FF", green: "#ECFDF5", purple: "#F5F3FF", orange: "#FFF7ED",
    teal: "#ECFEFF", pink: "#FFF1F2", amber: "#FFFBEB", red: "#FEF2F2"
  };
  var TEXTS = {
    blue: "#2563EB", green: "#16A34A", purple: "#9333EA", orange: "#EA580C",
    teal: "#0891B2", pink: "#E11D48", amber: "#D97706", red: "#DC2626"
  };
  var GRADE_COLORS = ["blue", "green", "purple"];

  /* ---------- آیکون‌ها (SVG) ---------- */
  function svg(p, size, w) {
    return '<svg width="' + (size || 22) + '" height="' + (size || 22) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (w || 2) + '" stroke-linecap="round" stroke-linejoin="round">' + p + "</svg>";
  }
  var I = {
    book: svg('<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>'),
    cap: svg('<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>'),
    file: svg('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>'),
    bot: svg('<rect width="16" height="12" x="4" y="8" rx="3"/><path d="M12 8V4M8 4h8"/><path d="M9 13h.01M15 13h.01"/><path d="M9 16h6"/>', 20),
    bot2: svg('<rect width="16" height="12" x="4" y="8" rx="3"/><path d="M12 8V4M8 4h8"/><path d="M9 13h.01M15 13h.01"/><path d="M9 16h6"/>', 22),
    bell: svg('<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>', 19),
    menu: svg('<line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/>', 19),
    back: svg('<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>', 20),
    chev: svg('<path d="m15 18-6-6 6-6"/>', 20),
    send: svg('<path d="m18 2-7 7"/><path d="m22 2-7 7-2-5 9-2z"/><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/>', 20, 1.8),
    home: svg('<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>', 19),
    grid: svg('<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>', 19),
    dots: svg('<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>', 19),
    gear: svg('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.08a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.08a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>', 18),
    bulb: svg('<path d="M9 18h6M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5"/>', 18),
    q: svg('<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>', 18),
    fq: svg('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9.5 12.5a2.5 2.5 0 0 1 4.6 1.3c0 1.7-2.1 2.2-2.1 2.2"/><path d="M12 19h.01"/>', 18),
    layers: svg('<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>', 18),
    spark: svg('<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/>', 18),
    globe: svg('<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>', 18),
    x: svg('<path d="M18 6 6 18M6 6l12 12"/>', 10, 2.4)
  };

  /* ---------- وضعیت ---------- */
  var state = { view: "home", grade: null, book: null, chapter: "all", tab: "answer" };
  var stack = [];
  var chat = {
    messages: [{ role: "bot", content: "سلام! من راهنمای درسیار هستم.\nهر سوال درسی از پایه‌های هفتم تا نهم داری بپرس؛ اگر جواب سوالت را در بخش کمک درسی پیدا نکردی، همین‌جا از من بپرس." }],
    sending: false,
    ctx: null
  };

  function getServerUrl() {
    try { return localStorage.getItem("darsyar-url") || ""; } catch (e) { return ""; }
  }
  function setServerUrl(v) {
    try { localStorage.setItem("darsyar-url", v); } catch (e) {}
  }

  function go(data) {
    stack.push(JSON.stringify(state));
    for (var k in data) state[k] = data[k];
    render();
    try { history.pushState({ i: stack.length }, ""); } catch (e) {}
  }
  window.onpopstate = function () {
    if (stack.length) {
      state = JSON.parse(stack.pop());
      render();
    }
  };

  /* ---------- داده کمکی ---------- */
  function findGrade(n) {
    for (var i = 0; i < DATA.length; i++) if (DATA[i].number === n) return DATA[i];
    return null;
  }
  function counts(book) {
    var a = 0, n = 0, e = 0;
    book.chapters.forEach(function (c) {
      c.contents.forEach(function (it) {
        if (it.type === "answer") a++;
        else if (it.type === "note") n++;
        else e++;
      });
    });
    return { a: a, n: n, e: e };
  }

  /* ---------- هدر و نویگیشن ---------- */
  function topbar(titleHtml, rightBtn) {
    return '<header class="topbar">' +
      '<button class="iconbtn" onclick="DY.goHome()" aria-label="خانه">' + I.home + "</button>" +
      '<div class="title"><span class="t">' + titleHtml + "</span></div>" +
      (rightBtn || '<button class="iconbtn" aria-label="اعلان‌ها">' + I.bell + '<span class="dot"></span></button>') +
      "</header>";
  }
  function bottomnav(active) {
    var items = [
      { k: "home", label: "انتخاب پایه", ic: I.grid },
      { k: "grade", label: "درس من", ic: I.book },
      { k: "chat", label: "راهنمای هوشمند", ic: I.bot },
      { k: "more", label: "بیشتر", ic: I.dots }
    ];
    return '<nav class="bottomnav"><div class="nav-in">' +
      items.map(function (t) {
        return '<button class="navbtn' + (t.k === active ? " on" : "") + '" onclick="DY.nav(\'' + t.k + '\')">' + t.ic + "<span>" + t.label + "</span></button>";
      }).join("") +
      "</div></nav>";
  }

  /* ---------- ویوها ---------- */
  function renderHome() {
    var cards = DATA.map(function (g, i) {
      var c = GRADE_COLORS[i] || "blue";
      var ic = i === 0 ? I.book : i === 1 ? I.cap : I.file;
      return '<button class="card" onclick="DY.openGrade(' + g.number + ')">' +
        '<span class="grade-icon" style="background:' + GRADS[c] + '">' + ic + "</span>" +
        '<span class="grade-info"><b>' + g.name + "</b><small>" + g.subtitle + "</small>" +
        '<span class="grade-bar" style="background:' + GRADS[c] + '"></span></span>' +
        '<span class="badge" style="background:' + SOFTS[c] + ";color:" + TEXTS[c] + '">پایه ' + toFa(g.number) + "</span></button>";
    }).join("");

    var last = null;
    try { last = Number(localStorage.getItem("darsyar-grade")) || null; } catch (e) {}
    var lastCard = "";
    if (last && findGrade(last)) {
      lastCard = '<button class="card" style="background:linear-gradient(105deg,#ecfdf5,#fff);border-color:#d1fae5" onclick="DY.openGrade(' + last + ')">' +
        '<span class="grade-icon" style="background:' + GRADS.green + '">' + I.cap + "</span>" +
        '<span class="grade-info"><b>ادامه تحصیل در ' + findGrade(last).name + "</b><small>کتاب‌های درسی آماده مطالعه</small></span>" +
        '<span class="chev">' + I.chev + "</span></button>";
    }

    app.innerHTML =
      topbar('<b>درسیار من</b><small>همراه تحصیلی پایه‌های هفتم تا نهم</small>') +
      '<main class="pad">' +
      '<section class="hero"><div style="flex:1"><h2>پایه تحصیلی خود را انتخاب کنید</h2>' +
      "<p>برای شروع یادگیری، پایه مورد نظر خود را انتخاب کنید و به جواب سوالات، نکات مهم و سوالات امتحانی دسترسی داشته باشید</p></div>" +
      '<img src="img/hero.png" alt="کلاه فارغ‌التحصیلی روی کتاب‌ها"></section>' +
      (lastCard ? '<div style="height:12px"></div>' + lastCard : "") +
      '<div class="section-title">' + I.book + "<span>انتخاب پایه</span></div>" +
      cards +
      '<section class="ai-card" style="margin-top:16px"><div style="flex:1"><h3>نیاز به کمک داری؟</h3>' +
      "<p>اگر جواب سوالت را در بخش کمک درسی پیدا نکردی، همین‌جا از دستیار هوشمند بپرس؛ پاسخ مناسب پایه‌های هفتم تا نهم می‌گیری.</p>" +
      '<button class="pill-btn" onclick="DY.openChat(null)">راهنمای درسیار <span>' + I.chev + '</span></button></div>' +
      '<img src="img/robot.png" alt="ربات دستیار درسیار"></section>' +
      "</main>" +
      bottomnav("home");
  }

  function renderGrade() {
    var g = findGrade(state.grade);
    if (!g) { renderHome(); return; }
    try { localStorage.setItem("darsyar-grade", String(g.number)); } catch (e) {}

    var totalCh = 0, totalIt = 0;
    g.books.forEach(function (b) {
      var c = counts(b);
      totalCh += b.chapters.length;
      totalIt += c.a + c.n + c.e;
    });

    var color = GRADE_COLORS[DATA.indexOf(g)] || "blue";
    var books = g.books.map(function (b) {
      var c = counts(b);
      return '<button class="card" onclick="DY.openBook(' + b.id + ')">' +
        '<span class="cover" style="background:' + GRADS[b.color] + '"><small>' + b.subject + "</small><b>" + b.title + "</b></span>" +
        '<span class="binfo"><b class="t">' + b.title + "</b><p>" + b.description + '</p>' +
        '<span class="chips">' +
        '<span style="background:#ECFDF5;color:#16A34A">' + toFa(c.a) + " جواب سوال</span>" +
        '<span style="background:#FFFBEB;color:#D97706">' + toFa(c.n) + " نکته</span>" +
        '<span style="background:#F5F3FF;color:#9333EA">' + toFa(c.e) + " سوال امتحانی</span></span></span>" +
        '<span class="chev">' + I.chev + "</span></button>";
    }).join("");

    app.innerHTML =
      '<header class="gheader"><div class="row"><div>' +
      '<div class="hi">سلام، آماده یادگیری هستی؟</div><h1>' + g.name + '</h1><div class="sub">' + g.subtitle + "</div></div>" +
      '<button class="iconbtn plain" onclick="DY.goHome()">' + I.back + "</button></div></header>" +
      '<div class="stats">' +
      '<div class="st"><span style="color:#2563EB">' + I.globe + "</span><b>" + toFa(g.books.length) + "</b><span>کتاب درسی</span></div>" +
      '<div class="st"><span style="color:#16A34A">' + I.layers + "</span><b>" + toFa(totalCh) + "</b><span>فصل آماده</span></div>" +
      '<div class="st"><span style="color:#D97706">' + I.spark + "</span><b>" + toFa(totalIt) + "</b><span>پاسخ و نکته</span></div>" +
      "</div>" +
      '<main class="pad" style="padding-top:0"><div class="section-title" style="justify-content:space-between;margin-top:4px"><span>کتاب‌های ' + g.name + '</span><span class="badge" style="background:#EFF6FF;color:#2563EB">' + toFa(g.books.length) + " کتاب</span></div>" +
      books +
      '<button class="ai-cta" onclick="DY.openChat(' + g.number + ')">' +
      '<span class="l"><span class="bot-ic">' + I.bot2 + "</span><span><b>سوالی داری؟ از درسیار بپرس</b><small>دستیار هوشمند مخصوص پایه " + toFa(g.number) + "</small></span></span>" +
      '<span class="go">بپرس</span></button>' +
      "</main>" +
      bottomnav("grade");
  }

  function renderBook() {
    var g = findGrade(state.grade);
    var book = null;
    if (g) g.books.forEach(function (b) { if (b.id === state.book) book = b; });
    if (!g || !book) { renderHome(); return; }

    var c = counts(book);
    var color = book.color;

    var chaptersHtml = '<button class="chip' + (state.chapter === "all" ? " on" : "") + '" onclick="DY.setChapter(\'all\')">همه فصل‌ها</button>';
    book.chapters.forEach(function (ch) {
      chaptersHtml += '<button class="chip' + (state.chapter === ch.number ? " on" : "") + '" onclick="DY.setChapter(' + ch.number + ')"><small>فصل ' + toFa(ch.number) + "</small>" + esc(ch.title) + "</button>";
    });

    function tabBtn(t) {
      var meta = {
        answer: { label: "جواب سوالات", ic: I.q, bg: "#10B981", cnt: c.a },
        note: { label: "نکات مهم", ic: I.bulb, bg: "#F59E0B", cnt: c.n },
        exam: { label: "سوالات امتحانی", ic: I.fq, bg: "#8B5CF6", cnt: c.e }
      }[t];
      var on = state.tab === t;
      return '<button class="tab' + (on ? " on" : "") + '" style="' + (on ? "background:" + meta.bg + ";border-color:" + meta.bg : "") + '" onclick="DY.setTab(\'' + t + '\')">' +
        '<span style="' + (on ? "color:#fff" : "color:" + meta.bg) + '">' + meta.ic + "</span>" + meta.label +
        '<span class="cnt" style="' + (on ? "" : "background:" + SOFTS[color] + ";color:" + TEXTS[color]) + '">' + toFa(meta.cnt) + "</span></button>";
    }

    var tabMeta = {
      answer: { label: "جواب سوال", ic: I.q, soft: "#ECFDF5", txt: "#059669" },
      note: { label: "نکته مهم", ic: I.bulb, soft: "#FFFBEB", txt: "#D97706" },
      exam: { label: "سوال امتحانی", ic: I.fq, soft: "#F5F3FF", txt: "#7C3AED" }
    }[state.tab];

    var visible = state.chapter === "all" ? book.chapters : book.chapters.filter(function (ch) { return ch.number === state.chapter; });
    var body = "";
    var empty = true;
    visible.forEach(function (ch) {
      var items = ch.contents.filter(function (it) { return it.type === state.tab; });
      if (!items.length) return;
      empty = false;
      body += '<div class="chhead"><h3>فصل ' + toFa(ch.number) + ": " + esc(ch.title) + "</h3><span>صفحات " + ch.pages + "</span></div>";
      items.forEach(function (it) {
        body += '<article class="content-card"><div class="content-head">' +
          '<span class="tag" style="background:' + tabMeta.soft + ";color:" + tabMeta.txt + '">' + tabMeta.ic + tabMeta.label + "</span>" +
          (it.pageRef ? '<span class="page-ref">' + esc(it.pageRef) + "</span>" : "") +
          "</div><h4>" + esc(it.title) + "</h4>";
        if (state.tab === "exam") {
          body += "<details><summary>مشاهده پاسخ تشریحی</summary><div class=\"body\">" + esc(it.body) + "</div></details>";
        } else {
          body += '<div class="body">' + esc(it.body) + "</div>";
        }
        body += "</article>";
      });
    });
    if (empty) body = '<div class="empty">فعلاً محتوایی در این بخش ثبت نشده است.</div>';

    app.innerHTML =
      '<header class="gheader" style="background:' + GRADS[color] + '"><div class="row"><div style="flex:1">' +
      '<div class="hi">' + g.name + '</div><h1 style="font-size:19px">' + book.title + '</h1><div class="sub">' + book.description + "</div></div>" +
      '<button class="iconbtn plain" onclick="DY.backToGrade()">' + I.back + "</button></div></header>" +
      '<div class="stats">' +
      '<div class="st"><span style="color:#64748B">' + I.layers + "</span><b>" + toFa(book.chapters.length) + "</b><span>فصل</span></div>" +
      '<div class="st"><span style="color:#059669">' + I.q + "</span><b>" + toFa(c.a) + "</b><span>جواب سوال</span></div>" +
      '<div class="st"><span style="color:#D97706">' + I.bulb + "</span><b>" + toFa(c.n) + "</b><span>نکته مهم</span></div>" +
      '<div class="st"><span style="color:#7C3AED">' + I.fq + "</span><b>" + toFa(c.e) + "</b><span>سوال امتحانی</span></div>" +
      "</div>" +
      '<main class="pad" style="padding-top:0">' +
      '<div class="chapters">' + chaptersHtml + "</div>" +
      '<div class="tabs">' + tabBtn("answer") + tabBtn("note") + tabBtn("exam") + "</div>" +
      body +
      '<button class="ai-cta" onclick="DY.openChat(' + g.number + ", '" + esc(book.subject) + '\')">' +
      '<span class="l"><span class="bot-ic">' + I.bot2 + "</span><span><b>جواب سوالت را پیدا نکردی؟</b><small>همین سوال را از دستیار هوشمند درسیار بپرس</small></span></span>" +
      '<span class="go">بپرس</span></button>' +
      "</main>" +
      bottomnav("grade");
  }

  function renderChat() {
    var url = getServerUrl();
    var msgs = chat.messages.map(function (m) {
      if (m.role === "me") {
        return '<div class="msg me"><div class="bubble">' + esc(m.content) + "</div></div>";
      }
      return '<div class="msg bot"><span class="av">' + I.bot + '</span><div class="bubble">' + esc(m.content) + "</div></div>";
    }).join("");

    var typing = chat.sending ? '<div class="msg bot"><span class="av">' + I.bot + '</span><span class="bubble typing"><i></i><i></i><i></i></span></div>' : "";

    var suggests = "";
    if (chat.messages.length <= 1 && !chat.sending) {
      suggests = '<div style="display:flex;flex-direction:column;gap:8px"><div style="text-align:center;font-size:10.5px;color:#94a3b8">می‌توانی با این سوال‌ها شروع کنی:</div>' +
        ['معادله ساده x + ۵ = ۱۲ را چطور حل کنم؟', "برای امتحان علوم چطور بهتر درس بخوانم؟", "قواعد عربی پایه هفتم را ساده توضیح بده"]
          .map(function (s) { return '<button class="suggest" onclick="DY.suggest(\'' + s.replace(/'/g, "\\'") + '\')">' + s + "</button>"; }).join("") + "</div>";
    }

    var ctxChip = chat.ctx ? '<div class="ctx-chip">درس مرتبط: ' + (chat.ctx.subject ? chat.ctx.subject + " " : "") + "پایه " + toFa(chat.ctx.grade) +
      '<button onclick="DY.clearCtx()">' + I.x + "</button></div>" : "";

    app.innerHTML =
      '<header class="topbar">' +
      '<button class="iconbtn" onclick="DY.goHome()">' + I.back + "</button>" +
      '<div class="title"><span style="width:38px;height:38px;border-radius:12px;background:#2563eb;color:#fff;display:flex;align-items:center;justify-content:center">' + I.bot2 + '</span><span class="t"><b>راهنمای درسیار</b><small>دستیار هوشمند پایه‌های هفتم تا نهم</small></span></div>' +
      '<button class="iconbtn" onclick="DY.toggleUrl()" aria-label="تنظیمات سرور">' + I.gear + "</button>" +
      "</header>" + ctxChip +
      '<div id="url-row" class="url-row" style="display:none">' +
      '<input id="url-input" placeholder="http://آدرس-سرور" value="' + esc(url) + '">' +
      '<button class="save" onclick="DY.saveUrl()">ذخیره</button></div>' +
      '<div class="chat-wrap" id="chat-wrap">' + msgs + typing + suggests + "</div>" +
      '<div class="chatbar"><div class="in">' +
      '<input id="chat-input" placeholder="' + (chat.sending ? "درسیار در حال نوشتن است..." : "سوال درسی خودت را بنویس...") + '" onkeydown="DY.key(event)">' +
      '<button class="send" onclick="DY.send()" ' + (chat.sending ? "disabled" : "") + ">" + I.send + "</button>" +
      "</div></div>";

    var w = document.getElementById("chat-wrap");
    if (w) w.scrollTop = w.scrollHeight;
  }

  function render() {
    if (state.view === "grade") renderGrade();
    else if (state.view === "book") renderBook();
    else if (state.view === "chat") renderChat();
    else renderHome();
    window.scrollTo(0, 0);
  }

  /* ---------- رویدادها ---------- */
  var DY = {
    goHome: function () { go({ view: "home" }); },
    backToGrade: function () { go({ view: "grade" }); },
    nav: function (k) {
      if (k === "home") DY.goHome();
      else if (k === "grade") {
        var last = null;
        try { last = Number(localStorage.getItem("darsyar-grade")) || null; } catch (e) {}
        if (last && findGrade(last)) go({ view: "grade", grade: last });
        else go({ view: "home" });
      } else if (k === "chat") DY.openChat(null);
      else alert("درسیار من — نسخه ۱٫۰٫۰\nکمک درسی متوسطه اول");
    },
    openGrade: function (n) { go({ view: "grade", grade: n }); },
    openBook: function (id) { go({ view: "book", book: id, chapter: "all", tab: "answer" }); },
    setChapter: function (n) { state.chapter = n; render(); },
    setTab: function (t) { state.tab = t; render(); },
    openChat: function (grade, subject) {
      if (grade) chat.ctx = { grade: grade, subject: subject || null };
      go({ view: "chat" });
    },
    clearCtx: function () { chat.ctx = null; render(); },
    toggleUrl: function () {
      var r = document.getElementById("url-row");
      if (r) r.style.display = r.style.display === "none" ? "flex" : "none";
    },
    saveUrl: function () {
      var v = document.getElementById("url-input").value.trim().replace(/\/+$/, "");
      setServerUrl(v);
      render();
    },
    key: function (e) { if (e.key === "Enter") DY.send(); },
    suggest: function (s) {
      var inp = document.getElementById("chat-input");
      if (inp) { inp.value = s; DY.send(); }
    },
    send: function () {
      var inp = document.getElementById("chat-input");
      if (!inp) return;
      var text = inp.value.trim();
      if (!text || chat.sending) return;

      chat.messages.push({ role: "me", content: text });
      inp.value = "";
      chat.sending = true;
      renderChat();

      var url = getServerUrl();
      var finish = function (reply) {
        chat.messages.push({ role: "bot", content: reply });
        chat.sending = false;
        renderChat();
      };

      if (!url) {
        setTimeout(function () {
          finish("برای استفاده از دستیار هوشمند، با دکمه چرخ‌دنده بالای صفحه آدرس سرور (نسخه وب درسیار) را وارد کن.\nتا آن موقع می‌توانی از بخش کمک درسی، جواب سوالات، نکات مهم و سوالات امتحانی را بدون اینترنت ببینی.");
        }, 400);
        return;
      }

      var payload = {
        messages: chat.messages.map(function (m) { return { role: m.role === "me" ? "user" : "assistant", content: m.content }; }),
        context: chat.ctx ? { grade: chat.ctx.grade, subject: chat.ctx.subject } : undefined
      };

      fetch(url + "/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (r) { return r.json(); })
        .then(function (d) { finish(d.reply || "پاسخی دریافت نشد؛ دوباره تلاش کن."); })
        .catch(function () {
          finish("ارتباط با سرور برقرار نشد؛ اتصال اینترنت و آدرس سرور (چرخ‌دنده بالای صفحه) را بررسی کن.");
        });
    }
  };
  window.DY = DY;

  render();
})();
