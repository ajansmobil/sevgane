
try {
  var svL = json.lang || "tr";
  var svD = json.desing || {};
  var svTx = function (o) { return o[svL] || o.tr || o.en || ""; };
  var svEsc = function (s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  };
  var SVT = {
    projects: { tr: "Projeler", en: "Projects", ar: "المشاريع", de: "Projekte", es: "Proyectos" },
    skills: { tr: "Yetkinlikler", en: "Expertise", ar: "الخبرات", de: "Kompetenzen", es: "Competencias" },
    cv: { tr: "Özgeçmiş", en: "Résumé", ar: "السيرة الذاتية", de: "Lebenslauf", es: "Currículum" },
    certs: { tr: "Sertifikalar", en: "Certificates", ar: "الشهادات", de: "Zertifikate", es: "Certificados" },
    blog: { tr: "Blog", en: "Blog", ar: "المدونة", de: "Blog", es: "Blog" },
    contact: { tr: "İletişim", en: "Contact", ar: "تواصل", de: "Kontakt", es: "Contacto" },
    cta: { tr: "Görüşme planla", en: "Book a call", ar: "احجز مكالمة", de: "Gespräch vereinbaren", es: "Agendar una llamada" },
    ai: { tr: "Yapay zekâ", en: "AI", ar: "الذكاء الاصطناعي", de: "KI", es: "IA" },
    sw: { tr: "Yazılım", en: "Software", ar: "البرمجيات", de: "Software", es: "Software" },
    design: { tr: "Mimari ve tasarım", en: "Architecture & design", ar: "الهندسة والتصميم", de: "Architektur & Design", es: "Arquitectura y diseño" },
    sec: { tr: "Siber güvenlik ve ISO", en: "Cybersecurity & ISO", ar: "الأمن السيبراني وISO", de: "Cybersicherheit & ISO", es: "Ciberseguridad e ISO" },
    pm: { tr: "Proje yönetimi", en: "Project management", ar: "إدارة المشاريع", de: "Projektmanagement", es: "Gestión de proyectos" },
    all: { tr: "Tüm hizmetler", en: "All services", ar: "كل الخدمات", de: "Alle Leistungen", es: "Todos los servicios" },
    menu: { tr: "Menü", en: "Menu", ar: "القائمة", de: "Menü", es: "Menú" },
    openMenu: { tr: "Menüyü aç", en: "Open menu", ar: "فتح القائمة", de: "Menü öffnen", es: "Abrir menú" },
    closeMenu: { tr: "Menüyü kapat", en: "Close menu", ar: "إغلاق القائمة", de: "Menü schließen", es: "Cerrar menú" },
    main: { tr: "Ana gezinti", en: "Main navigation", ar: "التنقل الرئيسي", de: "Hauptnavigation", es: "Navegación principal" },
    langLbl: { tr: "Dil", en: "Language", ar: "اللغة", de: "Sprache", es: "Idioma" },
    theme: { tr: "Açık / koyu tema", en: "Light / dark theme", ar: "السمة الفاتحة / الداكنة", de: "Helles / dunkles Design", es: "Tema claro / oscuro" },
    themeShort: { tr: "Tema", en: "Theme", ar: "السمة", de: "Design", es: "Tema" }
  };
  var SVLANG = { tr: "Türkçe", en: "English", ar: "العربية", de: "Deutsch", es: "Español" };

  var svRows = [];
  var svPs = webmakerdata.pagesetting.data.find(function (i) { return i.modulestatus && i.modulestatus.page; });
  if (svPs && webmakerdata[svPs.path]) svRows = webmakerdata[svPs.path].data || [];
  var svSlug = function (it) {
    var n = it.pathnext;
    if (n != null && String(n).trim() !== "") return String(n).trim();
    return it.path != null ? String(it.path) : "";
  };
  var svById = {};
  svRows.forEach(function (r) { if (r && r.status === "play") svById[r.id] = r; });

  var svSlugOf = { "yapay-zeka": "yapay-zeka-cozumleri", "web-gelistirme": "web-gelistirme", "backend-mimari": "backend-sistem-mimarisi", "bilgi-guvenligi": "bilgi-guvenligi-iso-27001", "be41z2rac6": "sss", "gizlilikpolitikasi": "gizlilik-politikasi", "cerez-politikasi": "cerez-politikasi", "kisiselveriler": "kisisel-veriler", "kullanicahaklari": "kullanici-haklari", "yasaluyari": "yasal-uyari" };
  Object.keys(svSlugOf).forEach(function (k) { if (!svById[k]) svById[k] = { id: k, path: svSlugOf[k], status: "play" }; });
  var svCur = svSlug(page || {});
  var svHref = function (id) { return svById[id] ? wxLangInternalHref(svSlug(svById[id])) : ""; };
  var svIsCur = function (id) { return !!svById[id] && svSlug(svById[id]) === svCur; };

  var skillsSub = [
    ["yapay-zeka", "ai"], ["web-gelistirme", "sw"], ["backend-mimari", "design"], ["bilgi-guvenligi", "sec"], ["cjkjno5l57", "pm"]
  ].filter(function (x) { return svById[x[0]]; });
  var cvSub = [["ssih4bmxzd", "cv"], ["gs6oawb05w", "certs"]].filter(function (x) { return svById[x[0]]; });

  var chev = '<svg class="svh-chev" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 9l6 6 6-6"/></svg>';
  var svLink = function (id, key, extra) {
    var h = svHref(id);
    if (!h) return "";
    var cur = svIsCur(id);
    return '<a class="svh-link' + (extra ? " " + extra : "") + '" href="' + h + '"' + (cur ? ' aria-current="page"' : "") + ">" + svEsc(svTx(SVT[key])) + "</a>";
  };
  var svGroup = function (key, subs, allLink) {
    if (!subs.length) return "";
    var anyCur = subs.some(function (x) { return svIsCur(x[0]); }) || (allLink && svIsCur("hs54qzyeyo") && key === "skills");
    var gid = "svh-g-" + key;
    var items = subs.map(function (x) {
      return "<li>" + svLink(x[0], x[1], "svh-sublink") + "</li>";
    }).join("");
    if (allLink && svHref("hs54qzyeyo")) items += '<li class="svh-sub-all">' + svLink("hs54qzyeyo", "all", "svh-sublink") + "</li>";
    return '<li class="svh-item svh-has-sub' + (anyCur ? " svh-branch-active" : "") + '">' +
      '<button type="button" class="svh-link svh-sub-btn" aria-expanded="false" aria-controls="' + gid + '"' + (anyCur ? ' data-current="true"' : "") + ">" +
      "<span>" + svEsc(svTx(SVT[key])) + "</span>" + chev + "</button>" +
      '<ul class="svh-sub" id="' + gid + '">' + items + "</ul></li>";
  };
  var navItems = "";
  var lp = svLink("qbiz7pjmu9", "projects");
  if (lp) navItems += '<li class="svh-item">' + lp + "</li>";
  navItems += svGroup("skills", skillsSub, true);
  navItems += svGroup("cv", cvSub, false);
  var lb = svLink("tc41vihvbd", "blog");
  if (lb) navItems += '<li class="svh-item">' + lb + "</li>";
  var lc = svLink("xnzu5au0ag", "contact");
  if (lc) navItems += '<li class="svh-item">' + lc + "</li>";

  var ctaHref = svHref("xnzu5au0ag") || wxLangInternalHref("");
  var cta = '<a class="svh-cta" href="' + ctaHref + '">' + svEsc(svTx(SVT.cta)) + "</a>";

  var langs = [];
  var langRaw = typeof wmLangHtml === "function" ? wmLangHtml({ style: "text" }) : "";
  var re = /<li class="([^"]*)"><a href="([^"]*)" hreflang="([^"]*)"/g, mm;
  while ((mm = re.exec(langRaw))) langs.push({ code: mm[3], href: mm[2], active: /wm-lang-active/.test(mm[1]) });
  var langDrop = "", langChips = "";
  if (langs.length > 1) {
    var curCode = (langs.filter(function (l) { return l.active; })[0] || { code: svL }).code;
    var li = langs.map(function (l) {
      return "<li><a" + (l.active ? ' aria-current="true"' : "") + ' href="' + l.href + '" hreflang="' + l.code + '" lang="' + l.code + '"><span class="svh-lcode">' +
        l.code.toUpperCase() + "</span><span>" + svEsc(SVLANG[l.code] || l.code) + "</span></a></li>";
    }).join("");
    langDrop = '<div class="svh-lang"><button type="button" class="svh-lang-btn" aria-expanded="false" aria-haspopup="true" aria-label="' + svEsc(svTx(SVT.langLbl)) + '">' +
      '<span class="svh-lang-code">' + curCode.toUpperCase() + "</span>" + chev + '</button><ul class="svh-lang-list">' + li + "</ul></div>";
    langChips = '<div class="svh-chips" role="group" aria-label="' + svEsc(svTx(SVT.langLbl)) + '">' + langs.map(function (l) {
      return '<a class="svh-chip"' + (l.active ? ' aria-current="true"' : "") + ' href="' + l.href + '" hreflang="' + l.code + '" lang="' + l.code + '">' + l.code.toUpperCase() + "</a>";
    }).join("") + "</div>";
  }

  var SUN = '<svg class="sv-ico-sun" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
  var MOON = '<svg class="sv-ico-moon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  var themeLbl = svEsc(svTx(SVT.theme));
  var themeBtn = '<button type="button" class="sv-theme-btn svh-theme" data-sv-theme aria-label="' + themeLbl + '" title="' + themeLbl + '">' + SUN + MOON + "</button>";
  var themeRow = '<button type="button" class="svh-theme-row" data-sv-theme aria-label="' + themeLbl + '"><span class="svh-theme-ico">' + SUN + MOON + "</span><span>" + svEsc(svTx(SVT.themeShort)) + "</span></button>";

  var sname = webmakerdata.setting && webmakerdata.setting.name;
  var siteName = sname ? (typeof sname === "string" ? sname : sname[svL] || sname.tr || sname.en || "") : "";
  var logoLight = svD.logoimg ? String(svD.logoimg) : webmakerdata.setting && webmakerdata.setting.logo ? String(webmakerdata.setting.logo) : "logo.svg";
  var logoDark = svD.logoDark ? String(svD.logoDark) : "";
  var logoHtml = '<img class="svh-logo-img' + (logoDark ? " sv-logo-light" : "") + '" src="/img/' + svEsc(logoLight) + '" alt="' + svEsc(siteName) + '" height="44" decoding="async" />';
  if (logoDark) logoHtml += '<img class="svh-logo-img sv-logo-dark" src="/img/' + svEsc(logoDark) + '" alt="' + svEsc(siteName) + '" height="44" decoding="async" />';

  var burger = '<button type="button" class="svh-burger" aria-expanded="false" aria-controls="svh-panel" aria-label="' + svEsc(svTx(SVT.openMenu)) +
    '" data-open="' + svEsc(svTx(SVT.openMenu)) + '" data-close="' + svEsc(svTx(SVT.closeMenu)) + '"><span class="svh-burger-box" aria-hidden="true"><i></i><i></i><i></i></span></button>';

  var out = '<div class="svh" id="svh">' +
    '<div class="svh-bar">' +
    '<a class="svh-logo" href="' + wxLangInternalHref("") + '">' + logoHtml + "</a>" +
    '<div class="svh-panel" id="svh-panel">' +
    '<nav class="svh-nav" aria-label="' + svEsc(svTx(SVT.main)) + '"><ul class="svh-list">' + navItems + "</ul></nav>" +
    '<div class="svh-panel-foot">' + cta + langChips + themeRow + "</div>" +
    "</div>" +
    '<div class="svh-tools">' + langDrop + themeBtn + cta.replace('class="svh-cta"', 'class="svh-cta svh-cta-bar"') + "</div>" +
    burger +
    "</div></div>";
  html = html.replace("{{svh}}", function () { return out; });
} catch (error) {
  console.log("sevgane header back.js", error);
}
