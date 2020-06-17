<template>
  <div class="tip" id="tip_id" v-if="showWrap" :class="showContent ? 'fadein' : 'fadeout'">
    <span>{{text}}</span>
  </div>
</template>
<script>
export default {
  name: 'Toast',
  data(){
    return {
      showWrap: false
    }
  }
}
</script>
<style scoped>
.tip {
  z-index: 9999;
  position: fixed;
  top: 50vh;
  left: 0;
  width: 100%;
  text-align: center;
}
.tip span {
  margin: auto;
  font-size: 0.38rem;
  color: #000;
  background: rgba(245, 241, 241, 0.623);
  border-radius: 0.12rem;
  padding: 0.26rem 0.4rem;
  line-height: 1.4;
}
.fadein {
  animation: animate_in 0.25s;
}
.fadeout {
  animation: animate_out 0.25s;
  /* opacity: 0; */
}

@keyframes animate_in {
  0% {opacity: 0;}
  100% {opacity: 1;}
}
@keyframes animate_out {
  0% {opacity: 1;}
  100% {opacity: 0;}
}
</style>