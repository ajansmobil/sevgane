try {
  var wxPublicSlug = function (it) {
    if (!it) return "";
    var n = it.pathnext;
    if (n != null && String(n).trim() !== "") return String(n).trim();
    return it.path != null ? String(it.path) : "";
  };

  var menu2ItemLabel = function (it) {
    if (!it || !it.name) return "";
    if (typeof it.name === "string") return it.name;
    return it.name[json.lang] || it.name.tr || it.name.en || "";
  };

  var menu2ResolveBucketKey = function (parentItem) {
    var tryKey = function (key) {
      if (!key || !webmakerdata[key] || !webmakerdata[key].data || !webmakerdata[key].data.length) {
        return "";
      }
      return key;
    };
    var fromPath = tryKey(parentItem.path);
    if (fromPath) return fromPath;
    var fromId = tryKey(parentItem.id);
    if (fromId) return fromId;
    var pnext = parentItem.pathnext;
    if (pnext != null && String(pnext).trim() !== "" && webmakerdata.pagesetting && webmakerdata.pagesetting.data) {
      var slug = String(pnext).trim();
      var psRows = webmakerdata.pagesetting.data;
      for (var pi = 0; pi < psRows.length; pi++) {
        var catRow = psRows[pi];
        if (!catRow || !catRow.path || catRow.path === "page" || catRow.path === "category") continue;
        var bucket = webmakerdata[catRow.path];
        if (!bucket || !bucket.data || !bucket.data.length) continue;
        for (var di = 0; di < bucket.data.length; di++) {
          var row = bucket.data[di];
          if (row && (row.path === slug || row.pathnext === slug)) {
            return catRow.path;
          }
        }
      }
    }
    return parentItem.path != null ? String(parentItem.path) : "";
  };

  var menu2CollectSubPages = function (parentItem) {
    var out = [];
    var seen = {};
    var pushSub = function (sub) {
      if (!sub || sub.status !== "play") return;
      var key = (sub.id != null ? String(sub.id) : "") || (sub.path != null ? String(sub.path) : "");
      if (!key || seen[key]) return;
      seen[key] = true;
      out.push(sub);
    };
    var readBucket = function (bucketKey) {
      if (!bucketKey || !webmakerdata[bucketKey] || !webmakerdata[bucketKey].data) return;
      var arr = webmakerdata[bucketKey].data;
      for (var i = 0; i < arr.length; i++) {
        pushSub(arr[i]);
      }
    };
    var bucketKey = menu2ResolveBucketKey(parentItem);
    if (bucketKey) {
      readBucket(bucketKey);
    }
    var pagesettingForCat = webmakerdata.pagesetting.data.find(
      function (item) { return item.modulestatus && item.modulestatus.page; }
    );
    if (pagesettingForCat && parentItem.id) {
      var rootList = webmakerdata[pagesettingForCat.path].data;
      for (var j = 0; j < rootList.length; j++) {
        var pg = rootList[j];
        if (pg.status === "play" && pg.category === parentItem.id) {
          pushSub(pg);
        }
      }
    }
    return out;
  };

  var menu2BuildDropdown = function (parentItem, currentSlug) {
    var subs = menu2CollectSubPages(parentItem);
    if (!subs.length) return "";
    var inner = "";
    for (var s = 0; s < subs.length; s++) {
      var sub = subs[s];
      var subSlug = wxPublicSlug(sub);
      var subActive = currentSlug === subSlug ? ' class="modulex-menu-list-active"' : "";
      inner += "<a" + subActive + ' href="' + wxLangInternalHref(subSlug) + '">' + menu2ItemLabel(sub) + "</a>";
    }
    return '<div class="dropdown-content-modulex">' + inner + "</div>";
  };

  var menu2BranchActive = function (parentItem, currentSlug) {
    if (wxPublicSlug(parentItem) === currentSlug) return true;
    var subs = menu2CollectSubPages(parentItem);
    for (var i = 0; i < subs.length; i++) {
      if (wxPublicSlug(subs[i]) === currentSlug) return true;
    }
    return false;
  };

  var pagesettingjson = webmakerdata.pagesetting.data.find(
    function (item) { return item.modulestatus && item.modulestatus.page; }
  );
  var currentPagePath = wxPublicSlug(page);
  var backhtml = '<a href="' + wxLangInternalHref("") + '">@home@</a>';

  if (pagesettingjson) {
    for (var iterator of webmakerdata[pagesettingjson.path].data) {
      if (iterator.status == "play" && iterator.category == "") {
        var parentSlug = wxPublicSlug(iterator);
        var dropdownHtml = menu2BuildDropdown(iterator, currentPagePath);
        var isActive = menu2BranchActive(iterator, currentPagePath);
        var linkActive = parentSlug === currentPagePath;

        if (dropdownHtml !== "") {
          var wrapClass = "modulexmenulist-menu";
          if (isActive) {
            wrapClass += " dropdown-content-active-modulex";
          }
          var linkClass = linkActive || isActive ? ' class="modulex-menu-list-active"' : "";
          backhtml +=
            '<div class="' +
            wrapClass +
            '"><a' +
            linkClass +
            ' href="' +
            wxLangInternalHref(parentSlug) +
            '">' +
            menu2ItemLabel(iterator) +
            "</a>" +
            dropdownHtml +
            "</div>";
        } else {
          if (linkActive || isActive) {
            backhtml +=
              '<a class="modulex-menu-list-active" href="' +
              wxLangInternalHref(parentSlug) +
              '">' +
              menu2ItemLabel(iterator) +
              "</a>";
          } else {
            backhtml +=
              '<a href="' + wxLangInternalHref(parentSlug) + '">' + menu2ItemLabel(iterator) + "</a>";
          }
        }
      }
    }
    html = html.replace(new RegExp("{{html}}", "g"), backhtml);
  }

  langhtml = wmLangHtml({ style: "text" });


  if (!langhtml) html = html.replace(/<details class="modulex-lang-top">[\s\S]*?<\/details>\s*/, "");
  html = html.replace(new RegExp("{{langhtml}}", "g"), langhtml);


  var m2LangRenk = json.desing ? json.desing.langcolor : "";
  if (langhtml && (!m2LangRenk || /^currentcolor$/i.test(String(m2LangRenk))) && typeof wmOkunurRenk === "function") {
    var m2Okunur = wmOkunurRenk([json.desing.color, json.desing.bgcolor], json.desing.langbg);
    if (m2Okunur) html = html.replace(/--langcolor--/g, function () { return m2Okunur; });
  }

  if (json.desing && json.desing.tekSatir) html = html.replace('<div class="modulex">', '<div class="modulex modulex-teksatir">');




  var menu2Logo =
    json.desing && json.desing.logoimgs && json.desing.logoimgs[json.lang]
      ? String(json.desing.logoimgs[json.lang])
      : json.desing && json.desing.logoimg
      ? String(json.desing.logoimg)
      : webmakerdata.setting && webmakerdata.setting.logo
      ? String(webmakerdata.setting.logo)
      : "logo.svg";
  html = html.replace(new RegExp("{{logo}}", "g"), menu2Logo);


  var menu2LogoDark = json.desing && json.desing.logoDark ? String(json.desing.logoDark) : "";
  if (menu2LogoDark) {
    html = html.replace('class="modulexbodylogo"', 'class="modulexbodylogo sv-logo-light"');
    html = html.replace("{{logodark}}", '<img src="/img/' + menu2LogoDark + '?v={{random}}" alt="{{web-name}} Logo" class="modulexbodylogo sv-logo-dark" loading="lazy" />');
  } else {
    html = html.replace("{{logodark}}", "");
  }

  var menu2ThemeLabels = { tr: "Açık / koyu tema", en: "Light / dark theme", ar: "السمة الفاتحة / الداكنة", de: "Helles / dunkles Design", es: "Tema claro / oscuro" };
  html = html.replace(/{{themeLabel}}/g, menu2ThemeLabels[json.lang] || menu2ThemeLabels.en);
  if (webmakerdata.setting && webmakerdata.setting.name) {
    var menu2SiteName = menu2ItemLabel({ name: webmakerdata.setting.name });
    if (menu2SiteName) {
      html = html.replace(new RegExp("{{web-name}}", "g"), menu2SiteName);
    }
  }
} catch (error) {
  console.log("menu-2 back.js", error);
}
