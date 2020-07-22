<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
import { Validator } from "vee-validate";
import openapi from "@/api/openapi.js";
export default {
  watch: {
    "$i18n.locale"(val) {
      // 切换中英文
      Validator.localize(val);
    }
  },
  data() {
    return {
      isRouterAlive: true,
      roleList: []
    };
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
        // alert('reload page')
      });
    },
    getUsers() {
      // eslint-disable-next-line no-console
      console.log(openapi.Member)
      this.$tools.ajax(openapi.Role,'get').then((data) => {
        this.roleList = data.data
      })
    }
  }
};
</script>
<style lang="less">
html body {
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.dynamic-image-editor{
  height: 100px;
  margin: 20px;
}
.dynamic-image-editor .ql-container{
    border-radius: 5px;
    border-top: 1px solid #ccc !important;
  }
.dynamic-image-editor  .ql-editor {
    min-height: 50px;
    border-radius: 3px;
  }
.quillWrapper .ql-snow.ql-toolbar {
    display: none;
  }
</style>
