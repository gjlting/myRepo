<template>
  <div class="home">
    <div class="header">
      <div>
        <nav-menu
          class="navMenu"
          v-for="(navMenuItem, index) in navMenuList"
          :key="index"
          :navMenuItem="navMenuItem"
        ></nav-menu>
      </div>
      <hello-world></hello-world>
    </div>
    <router-view style="height:calc(100)" />
    <!-- <div class="footer">{{$t('footer')}}</div> -->
  </div>
</template>

<script>
// @ is an alias to /src
import NavMenu from "../components/navMenuList/navMenu";
import navMenuList from "../components/navMenuList/navMenuList";
import HelloWorld from "../components/HelloWorld";
export default {
  name: "Home",
  data() {
    return {
      navMenuList: navMenuList
    };
  },
  components: {
    NavMenu,
    HelloWorld
  }
};
</script>
<style scoped>
.home {
  height: 100%;
}
.header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}
.navMenu {
  display: inline-block;
  margin: 10px;
}
.footer {
  width: 100%;
  height: 100px;
  line-height: 100px;
  background: black;
  position: absolute;
  bottom: 0;
  color: white;
}
</style>

