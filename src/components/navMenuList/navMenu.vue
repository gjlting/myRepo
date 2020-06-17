<template>
  <div class="navMenu">
    <router-link :to="navMenuItem.path">{{$t(navMenuItem.pathname)}}</router-link>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "navMenu",
  props: {
    navMenuItem: {
      type: Object
    }
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
  color: #666;
}
.router-link-active {
  color: blue;
  text-decoration: none;
}
</style>
