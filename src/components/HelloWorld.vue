<template>
  <div class="hello">
    <p @click="updateLocale()">{{ $t('switchLanguage')}}</p>
    <!-- <p>{{ $i18n.locale }}</p> -->
    <p>{{ getCurrentLocaleData.lang }}</p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  inject: ["reload"],
  data() {
    return {};
  },
  computed: {
    // I18N
    getCurrentLocaleData() {
      const locale = this.$i18n.locale;
      if (locale == "zh") {
        return {
          flag: "us",
          lang: "English"
        };
      } else {
        return {
          flag: "zh",
          lang: "中文"
        };
      }
    }
  },
  methods: {
    updateLocale() {
      let locale = localStorage.getItem("locale");
      if (locale === "zh") {
        this.$i18n.locale = "en";
      } else if (locale === "en") {
        this.$i18n.locale = "zh";
      }
      localStorage.setItem("locale", this.$i18n.locale);
      this.reload();
    },
    ssss(){
      alert('122')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
