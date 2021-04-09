var Benchmark = require("benchmark");
var suite = new Benchmark.Suite();

delete Intl.getCanonicalLocales;
delete Intl.Locale;
delete Intl.PluralRules;
delete Intl.NumberFormat;
delete Intl.DateTimeFormat;

// Polyfills required to use Intl with Hermes engine
require("@formatjs/intl-getcanonicallocales/polyfill");
require("@formatjs/intl-locale/polyfill");
require("@formatjs/intl-pluralrules/polyfill");
require("@formatjs/intl-pluralrules/locale-data/en");
require("@formatjs/intl-numberformat/polyfill");
require("@formatjs/intl-numberformat/locale-data/en");
require("@formatjs/intl-datetimeformat/polyfill");
require("@formatjs/intl-datetimeformat/locale-data/en");
require("@formatjs/intl-datetimeformat/add-golden-tz");

const dtf = new Intl.DateTimeFormat("en");

suite
  .add("With constructor", () => {
    const dtf = new Intl.DateTimeFormat("en");
    dtf.format(new Date());
  })
  .add("Without constructor", () => {
    dtf.format(new Date());
  })
  // add listeners
  .on("cycle", function (event) {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  
  .run();
