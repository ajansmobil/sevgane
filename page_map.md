# WebYapar sayfa haritası

> **Otomatik:** `talimatlar/web/dogrula.js` her tam koşu sonunda (hata/uyarı olsa da) bu dosyayı yazar/günceller. ELO ajan bağlamında proje kökündeki `page_map.md` — sayfa/modül yapısı için **birincil özet**; tam metin `lib/session/queue.js` ile sistem istemine eklenir (çok uzunsa kısaltma notu verilir).

**Veri kökü:** `D:/matrix/public/data/proje/yunus/web`
**Proje adı (özet):** web
**Aktif diller (tr önde):** tr

## Sayfalar (kategori listesi + `page/<id>/index.json`)

| Sayfa id | Kategori json | path (slug) | status | modulestatus (satır) | detay dosyası |
| --- | --- | --- | --- | --- | --- |
| `yvi9dlb59o` | `page.json` | kurumsal | play |  | `page/yvi9dlb59o/index.json` |
| `hs54qzyeyo` | `page.json` | services | play |  | `page/hs54qzyeyo/index.json` |
| `xnzu5au0ag` | `page.json` | iletisim | play |  | `page/xnzu5au0ag/index.json` |
| `hakkimizda` | `kurumsal.json` | hakkimizda | play |  | `page/hakkimizda/index.json` |
| `misyon` | `kurumsal.json` | misyon | play |  | `page/misyon/index.json` |
| `vizyon` | `kurumsal.json` | vizyon | play |  | `page/vizyon/index.json` |
| `kalitepolitikamiz` | `kurumsal.json` | kalite-politikamiz | play |  | `page/kalitepolitikamiz/index.json` |
| `gizlilikpolitikasi` | `kurumsal.json` | gizlilik-politikasi | play |  | `page/gizlilikpolitikasi/index.json` |
| `kisiselveriler` | `kurumsal.json` | kisisel-veriler | play |  | `page/kisiselveriler/index.json` |
| `kullanicahaklari` | `kurumsal.json` | kullanici-haklari | play |  | `page/kullanicahaklari/index.json` |
| `yasaluyari` | `kurumsal.json` | yasal-uyari | play |  | `page/yasaluyari/index.json` |
| `web-gelistirme` | `services.json` | web-gelistirme | play |  | `page/web-gelistirme/index.json` |
| `mobil-uygulama` | `services.json` | mobil-uygulama-gelistirme | play |  | `page/mobil-uygulama/index.json` |
| `yapay-zeka` | `services.json` | yapay-zeka-cozumleri | play |  | `page/yapay-zeka/index.json` |
| `backend-mimari` | `services.json` | backend-sistem-mimarisi | play |  | `page/backend-mimari/index.json` |
| `devops` | `services.json` | devops-altyapi | play |  | `page/devops/index.json` |
| `bilgi-guvenligi` | `services.json` | bilgi-guvenligi-iso-27001 | play |  | `page/bilgi-guvenligi/index.json` |
| `it-danismanlik` | `services.json` | it-danismanlik | play |  | `page/it-danismanlik/index.json` |
| `pazaryeri` | `services.json` | pazaryeri-entegrasyonlari | play |  | `page/pazaryeri/index.json` |

## Modüller (`modules.json`)

| id | local | path |
| --- | --- | --- |
| vey1el | header | menu-2 |
| k4t90c | header | slider |
| fhxr98 | body | contact-3 |
| bi4hta | body | map |
| tp5jo4 | body | page-desing-5 |
| txt39m | footer | footer-1 |
| z51zay | body | page-column |

## Şablon (`desing.json`) modül kimlikleri

- **header:** `vey1el`, `k4t90c`
- **headerdefault:** `vey1el`
- **body:** `z51zay`
- **footer:** `txt39m`
- **footerdefault:** `txt39m`

## Notlar

- Bu dosya **yapı özetidir**; DIL/SEO/R kuralları `dogrula.js` çıktısında denetlenir.
- Liste satırı ile `page/<id>/index.json` birleşimi render sırasında `Object.assign` ile uyumludur (`kurallar.md` / müfettiş akışı).
