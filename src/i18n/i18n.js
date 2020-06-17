import Vue from 'vue'
import VueI18n from 'vue-i18n'
import i18nData from './i18nData'

Vue.use(VueI18n)

export default new VueI18n({
  locale: localStorage.getItem('locale')?localStorage.getItem('locale'):'zh', // set default locale
  messages: i18nData,
})