var pagesettingjson = webmakerdata.pagesetting.data.find(
  function(item) { return item.modulestatus && item.modulestatus.page; },
);
var backhtml = `<li class="modulex-menu__item"><a class="modulex-menu_link" href="${wxLangInternalHref('')}">@home@</a></li>`;
if (pagesettingjson) {
  for (var page of webmakerdata[pagesettingjson.path]?.data || []) {
    if (page.status === "play") {
      backhtml += `<li class="modulex-menu__item"><a class="modulex-menu_link" href="/${
        json.lang
      }/${page.path}/">${((page.name && (page.name[json.lang] != null ? page.name[json.lang] : page.name.tr)) || "")}</a></li>`;
    }
  }
}
var color = json.desing.color.replace(/#/g, "");

var f3Setting = (webmakerdata && webmakerdata.setting) || {};
var f3Mode = json.desing.contact_line;
var f3Parts = [];
if (f3Mode !== false && f3Mode !== "false" && f3Mode !== "" && f3Mode != null) {
  var f3Phone = typeof f3Setting.phone === "string" ? f3Setting.phone.trim() : "";
  var f3Email = typeof f3Setting.email === "string" ? f3Setting.email.trim() : "";
  if (f3Phone) f3Parts.push('<a href="tel:' + f3Phone.replace(/[^+\d]/g, "") + '" dir="ltr">' + f3Phone + "</a>");
  if (f3Email) f3Parts.push('<a href="mailto:' + f3Email + '">' + f3Email + "</a>");
}
var f3Contact = f3Parts.length
  ? '<div class="footer-contact">' + f3Parts.join('<span class="footer-contact__sep" aria-hidden="true">&middot;</span>') + "</div>"
  : "";
html = html.replace(/{{html}}/g, backhtml).replace(/#color#/g, color).replace(/{{contactline}}/g, f3Contact);
if (json.desing.logo_plate === true || json.desing.logo_plate === "true") {
  html = html.replace('class="footer-logo"', 'class="footer-logo footer-logo--plate"');
}

var f3Dark = json.desing.logoDark ? String(json.desing.logoDark) : "";
if (f3Dark) {
  html = html.replace('<img src="/img/{{logo}}"', '<img class="sv-logo-light" src="/img/{{logo}}"');
  html = html.replace("{{logodark}}", '<img class="sv-logo-dark" src="/img/' + f3Dark + '" height="60" alt="{{web-name}} Logo" />');
} else {
  html = html.replace("{{logodark}}", "");
}
