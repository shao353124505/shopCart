import Vue from "vue";
import VueI18n from "vue-i18n";
import zh from "../lang/zh";
import en from "../lang/en";

Vue.use(VueI18n);

// const messages = {
//   en: Object.assign(en, enLocale),
//   zh: Object.assign(zh, zhLocale)
// }

const i18n = new VueI18n({
  locale: localStorage.getItem("locale") || "zh",
  messages: {
    en,
    zh
  }
});

export default i18n;
