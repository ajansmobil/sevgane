
try {
  var fL = json.lang || "tr";
  var fD = json.desing || {};
  var fS = webmakerdata.setting || {};
  var fTx = function (o) { return o[fL] || o.tr || o.en || ""; };
  var fEsc = function (s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  };
  var FT = {
    tagline: { tr: "AI projeleri için proje lideri ve ekip kaptanı · uzaktan", en: "Project lead and team captain for AI projects · remote", ar: "قائد مشاريع وقبطان فريق لمشاريع الذكاء الاصطناعي · عن بُعد", de: "Projektleiter und Teamkapitän für KI-Projekte · remote", es: "Líder de proyecto y capitán de equipo para proyectos de IA · remoto" },
    nav: { tr: "Gezinti", en: "Navigate", ar: "التنقل", de: "Navigation", es: "Navegación" },
    skills: { tr: "Yetkinlikler", en: "Expertise", ar: "الخبرات", de: "Kompetenzen", es: "Competencias" },
    contact: { tr: "İletişim", en: "Contact", ar: "تواصل", de: "Kontakt", es: "Contacto" },
    projects: { tr: "Projeler", en: "Projects", ar: "المشاريع", de: "Projekte", es: "Proyectos" },
    services: { tr: "Hizmetlerim", en: "Services", ar: "الخدمات", de: "Leistungen", es: "Servicios" },
    cv: { tr: "Özgeçmiş", en: "Résumé", ar: "السيرة الذاتية", de: "Lebenslauf", es: "Currículum" },
    certs: { tr: "Sertifikalar", en: "Certificates", ar: "الشهادات", de: "Zertifikate", es: "Certificados" },
    blog: { tr: "Blog", en: "Blog", ar: "المدونة", de: "Blog", es: "Blog" },
    faq: { tr: "Sıkça sorulan sorular", en: "FAQ", ar: "الأسئلة الشائعة", de: "Häufige Fragen", es: "Preguntas frecuentes" },
    contactPage: { tr: "İletişim", en: "Contact", ar: "تواصل", de: "Kontakt", es: "Contacto" },
    ai: { tr: "Yapay zekâ", en: "AI", ar: "الذكاء الاصطناعي", de: "KI", es: "IA" },
    sw: { tr: "Yazılım", en: "Software", ar: "البرمجيات", de: "Software", es: "Software" },
    design: { tr: "Mimari ve tasarım", en: "Architecture & design", ar: "الهندسة والتصميم", de: "Architektur & Design", es: "Arquitectura y diseño" },
    sec: { tr: "Siber güvenlik ve ISO", en: "Cybersecurity & ISO", ar: "الأمن السيبراني وISO", de: "Cybersicherheit & ISO", es: "Ciberseguridad e ISO" },
    pm: { tr: "Proje yönetimi", en: "Project management", ar: "إدارة المشاريع", de: "Projektmanagement", es: "Gestión de proyectos" },
    wa: { tr: "WhatsApp ile yaz", en: "Message on WhatsApp", ar: "راسلني على WhatsApp", de: "Nachricht per WhatsApp", es: "Escribir por WhatsApp" },
    loc: { tr: "Uzaktan · Avrupa, Kuzey Amerika, Körfez saat dilimleri", en: "Remote · Europe, North America, Gulf time zones", ar: "عن بُعد · مناطق أوروبا وأمريكا الشمالية والخليج الزمنية", de: "Remote · Zeitzonen Europa, Nordamerika, Golfregion", es: "Remoto · husos horarios de Europa, Norteamérica y el Golfo" },
    privacy: { tr: "Gizlilik", en: "Privacy", ar: "الخصوصية", de: "Datenschutz", es: "Privacidad" },
    cookies: { tr: "Çerez", en: "Cookies", ar: "ملفات الارتباط", de: "Cookies", es: "Cookies" },
    kvkk: { tr: "KVKK", en: "KVKK", ar: "KVKK", de: "KVKK", es: "KVKK" },
    rights: { tr: "Kullanıcı hakları", en: "User rights", ar: "حقوق المستخدم", de: "Nutzerrechte", es: "Derechos del usuario" },
    legal: { tr: "Yasal uyarı", en: "Legal notice", ar: "إشعار قانوني", de: "Rechtlicher Hinweis", es: "Aviso legal" },
    lang: { tr: "Dil", en: "Language", ar: "اللغة", de: "Sprache", es: "Idioma" },
    social: { tr: "Sosyal bağlantılar", en: "Social links", ar: "روابط التواصل", de: "Soziale Netzwerke", es: "Redes sociales" }
  };

  var fRows = [];
  var fPs = webmakerdata.pagesetting.data.find(function (i) { return i.modulestatus && i.modulestatus.page; });
  if (fPs && webmakerdata[fPs.path]) fRows = webmakerdata[fPs.path].data || [];
  var fSlug = function (it) {
    var n = it.pathnext;
    if (n != null && String(n).trim() !== "") return String(n).trim();
    return it.path != null ? String(it.path) : "";
  };
  var fById = {};
  fRows.forEach(function (r) { if (r && r.status === "play") fById[r.id] = r; });

  var fSlugOf = { "yapay-zeka": "yapay-zeka-cozumleri", "web-gelistirme": "web-gelistirme", "backend-mimari": "backend-sistem-mimarisi", "bilgi-guvenligi": "bilgi-guvenligi-iso-27001", "be41z2rac6": "sss", "gizlilikpolitikasi": "gizlilik-politikasi", "cerez-politikasi": "cerez-politikasi", "kisiselveriler": "kisisel-veriler", "kullanicahaklari": "kullanici-haklari", "yasaluyari": "yasal-uyari" };
  Object.keys(fSlugOf).forEach(function (k) { if (!fById[k]) fById[k] = { id: k, path: fSlugOf[k], status: "play" }; });
  var fCur = fSlug(page || {});
  var fLink = function (id, key) {
    var r = fById[id];
    if (!r) return "";
    var cur = fSlug(r) === fCur;
    return '<li><a href="' + wxLangInternalHref(fSlug(r)) + '"' + (cur ? ' aria-current="page"' : "") + ">" + fEsc(fTx(FT[key])) + "</a></li>";
  };
  var colNav = [["qbiz7pjmu9", "projects"], ["hs54qzyeyo", "services"], ["ssih4bmxzd", "cv"], ["gs6oawb05w", "certs"], ["tc41vihvbd", "blog"], ["be41z2rac6", "faq"], ["xnzu5au0ag", "contactPage"]]
    .map(function (x) { return fLink(x[0], x[1]); }).join("");
  var colSkills = [["yapay-zeka", "ai"], ["web-gelistirme", "sw"], ["backend-mimari", "design"], ["bilgi-guvenligi", "sec"], ["cjkjno5l57", "pm"]]
    .map(function (x) { return fLink(x[0], x[1]); }).join("");
  var legal = [["gizlilikpolitikasi", "privacy"], ["cerez-politikasi", "cookies"], ["kisiselveriler", "kvkk"], ["kullanicahaklari", "rights"], ["yasaluyari", "legal"]]
    .map(function (x) { return fLink(x[0], x[1]); }).join("");

  var fSn = fS.name;
  var fName = fSn ? (typeof fSn === "string" ? fSn : fSn[fL] || fSn.tr || fSn.en || "") : "";
  var fLogo = fS.logo ? String(fS.logo) : "logo.png";
  var fDark = fD.logoDark ? String(fD.logoDark) : "";
  var logoHtml = '<img class="svf-logo-img' + (fDark ? " sv-logo-light" : "") + '" src="/img/' + fEsc(fLogo) + '" height="48" alt="' + fEsc(fName) + '" loading="lazy" decoding="async" />';
  if (fDark) logoHtml += '<img class="svf-logo-img sv-logo-dark" src="/img/' + fEsc(fDark) + '" height="48" alt="' + fEsc(fName) + '" loading="lazy" decoding="async" />';

  var social = fS.social || {};
  var liUrl = social.linkedin || "https://linkedin.com/in/yunusevgane";
  var ghUrl = "https://github.com/yunusevgane";
  var waUrl = social.whatsapp || "";
  var IC_LI = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3V9.75zm6.5 0h3.83v1.54h.06c.53-.95 1.84-1.95 3.78-1.95 4.04 0 4.78 2.52 4.78 5.8V21h-4v-5.1c0-1.22-.02-2.78-1.8-2.78-1.8 0-2.07 1.3-2.07 2.69V21h-4V9.75z"/></svg>';
  var IC_GH = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"/></svg>';
  var IC_WA = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12.04 2a9.9 9.9 0 0 0-8.46 15.04L2 22l5.1-1.34A9.9 9.9 0 1 0 12.04 2zm0 1.8a8.1 8.1 0 1 1-4.13 15.07l-.3-.18-3.02.8.81-2.94-.2-.31A8.1 8.1 0 0 1 12.04 3.8zm-3.1 3.9c-.18 0-.46.07-.7.33-.24.26-.92.9-.92 2.2 0 1.3.94 2.55 1.07 2.72.13.18 1.83 2.9 4.5 3.95 2.22.87 2.67.7 3.15.65.48-.04 1.55-.63 1.77-1.24.22-.61.22-1.14.15-1.24-.07-.11-.24-.17-.5-.3-.27-.13-1.55-.77-1.79-.86-.24-.09-.41-.13-.59.13-.17.26-.68.86-.83 1.03-.15.18-.3.2-.57.07-.26-.13-1.1-.4-2.1-1.3-.77-.69-1.3-1.55-1.45-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.3.4-.46.13-.15.17-.26.26-.44.09-.17.04-.33-.02-.46-.07-.13-.59-1.43-.81-1.96-.21-.51-.43-.44-.59-.45h-.5z"/></svg>';

  var socialHtml = '<ul class="svf-social" aria-label="' + fEsc(fTx(FT.social)) + '">' +
    '<li><a href="' + fEsc(liUrl) + '" target="_blank" rel="noopener noreferrer me" aria-label="LinkedIn" title="LinkedIn">' + IC_LI + "</a></li>" +
    '<li><a href="' + fEsc(ghUrl) + '" target="_blank" rel="noopener noreferrer me" aria-label="GitHub" title="GitHub">' + IC_GH + "</a></li></ul>";

  var email = typeof fS.email === "string" && fS.email.trim() ? fS.email.trim() : "yunus@sevgane.com";
  var contactHtml = '<ul class="svf-contact">' +
    '<li><a href="mailto:' + fEsc(email) + '" dir="ltr">' + fEsc(email) + "</a></li>" +
    (waUrl ? '<li><a href="' + fEsc(waUrl) + '" target="_blank" rel="noopener noreferrer"><span class="svf-ic">' + IC_WA + "</span>" + fEsc(fTx(FT.wa)) + "</a></li>" : "") +
    '<li class="svf-loc">' + fEsc(fTx(FT.loc)) + "</li></ul>";

  var langRaw = typeof wmLangHtml === "function" ? wmLangHtml({ style: "text" }) : "";
  var lre = /<li class="([^"]*)"><a href="([^"]*)" hreflang="([^"]*)"/g, lm, chips = "";
  while ((lm = lre.exec(langRaw))) {
    chips += '<a class="svf-chip"' + (/wm-lang-active/.test(lm[1]) ? ' aria-current="true"' : "") + ' href="' + lm[2] + '" hreflang="' + lm[3] + '" lang="' + lm[3] + '">' + lm[3].toUpperCase() + "</a>";
  }
  var langHtml = chips ? '<div class="svf-langs" role="group" aria-label="' + fEsc(fTx(FT.lang)) + '">' + chips + "</div>" : "";

  var out = '<footer class="svf">' +
    '<div class="svf-inner">' +
    '<div class="svf-cols">' +
    '<div class="svf-col svf-brand"><a class="svf-logo" href="' + wxLangInternalHref("") + '">' + logoHtml + "</a>" +
    '<p class="svf-tag">' + fEsc(fTx(FT.tagline)) + "</p>" + socialHtml + "</div>" +
    '<nav class="svf-col" aria-labelledby="svf-h-nav"><h2 class="svf-h" id="svf-h-nav">' + fEsc(fTx(FT.nav)) + '</h2><ul class="svf-links">' + colNav + "</ul></nav>" +
    '<nav class="svf-col" aria-labelledby="svf-h-skills"><h2 class="svf-h" id="svf-h-skills">' + fEsc(fTx(FT.skills)) + '</h2><ul class="svf-links">' + colSkills + "</ul></nav>" +
    '<div class="svf-col"><h2 class="svf-h">' + fEsc(fTx(FT.contact)) + "</h2>" + contactHtml + "</div>" +
    "</div>" +
    '<div class="svf-bottom"><p class="svf-copy">&copy; 2026 ' + fEsc(fName.split(" —")[0] || "Yunus Sevğane") + '</p><ul class="svf-legal">' + legal + "</ul>" + langHtml + "</div>" +
    "</div></footer>";
  html = html.replace("{{svf}}", function () { return out; });
} catch (error) {
  console.log("sevgane footer back.js", error);
}
