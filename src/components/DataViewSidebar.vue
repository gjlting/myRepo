<template>
  <vs-sidebar
    parent="body"
    default-index="1"
    color="primary"
    class="sidebarx"
    spacer
    :click-not-close="clickNotClose"
    v-model="sideBarActive"
    :typeSlidebarInfo="typeSlidebarInfo"
    :position-right="positionRight"
  >
    <div>{{typeSlidebarInfo.title}}</div>
    <div>
      <slot name="content"></slot>
    </div>
    <div>
      <slot name="footer"></slot>
      <vs-button :disabled="!formValid" @click="submitData">更新</vs-button>
      <vs-button @click="sideBarActive = false">取消</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
// @ is an alias to /src

export default {
  name: "DataViewSidebar",
  data() {
    return {};
  },
  props: {
    active: {
      type: Boolean,
      default: true
    },
    typeSlidebarInfo: {
      type: Object,
    },
    positionRight: {
      type: Boolean,
      default: true
    },
    clickNotClose: {
      type: Boolean,
      default: false
    },
    formValid: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    sideBarActive: {
      get() {
        return this.active
      },
      set(val) {
        if (!val) {
          this.$emit('closeSidebar')
        }
      }
    }
  },
  methods: {
    submitData() {
        this.$validator.validateAll().then(() => {
          this.$emit('submitData')
        })
      },
  }
};
</script>
<style scoped>
</style>
