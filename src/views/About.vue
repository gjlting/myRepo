<template>
  <div class="about">
    <p>{{$t('aboutPage')}}</p>
    <vs-input
      type="search"
      icon="search"
      icon-after="true"
      placeholder="搜索"
      v-model="typeSearchValue"
    />
    <vs-button @click="editType()" color="primary" type="filled">Open Sidebar</vs-button>
    <v-tree class="topLevel" ref="tree" :data="typeTreeData" :tpl="typeTpl" :radio="true"></v-tree>
    <data-view-sidebar
      @closeSidebar="active = false"
      :typeSlidebarInfo="typeSlidebarInfo"
      :active="active"
      :position-right="positionRight"
      :formValid="isFormValid"
      @submitData="submitData"
    >
      <template slot="content" v-if="active">
        <vs-input :label="name" v-model="typeSlidebarInfo.name" name="Name" v-validate="'required|min:1'"></vs-input>
        <span>{{ errors.first('Name') }}</span>
      </template>
    </data-view-sidebar>
  </div>
</template>
<script>
import { VTree } from "vue-tree-halower";
import "vue-tree-halower/dist/halower-tree.min.css"; // 你可以自定义树的样式
import assetapi from "@/api/assetapi.js";
export default {
  name: "About",
  components: {
    VTree
  },
  data() {
    return {
      name: '名称',
      typeTreeData: [],
      typeSearchValue: "",
      typeSlidebarInfo: {
        title: "",
        name: ""
      },
      copyNode: {},
      active: false,
      positionRight: true,
      selectId: ""
    };
  },
  computed: {
    isFormValid() {
      let flag = !this.errors.first('Name') && this.typeSlidebarInfo.name != ''
      console.log(this.errors)
      console.log(flag)
      return flag;
    },
  },
  mounted() {
    this.getTypeList();
  },
  methods: {
    addTitle(data) {
      data.map(item => {
        this.$set(item, "title", item.label);
        if (item.children && item.children.length > 0)
          this.addTitle(item.children);
      });
    },
    getTypeList() {
      this.$tools.ajax(assetapi.type, "get").then(data => {
        this.typeTreeData = data;
        if (data.length > 0) {
          this.addTitle(this.typeTreeData);
        }
      });
    },
    typeTpl(...args) {
      let { 0: node } = args;
      let titleClass = node.selected
        ? "node-title node-selected"
        : "node-title";
      if (node.searched) titleClass += " node-searched";
      return (
        <span class="tr">
          <span
            class={titleClass}
            domPropsInnerHTML={node.title}
            onClick={() => {
              this.selectType(node);
            }}
          ></span>
        </span>
      );
    },
    // 点击选择 Type 事件
    selectType(node) {
      console.log(node);
      // if(node.selected) node.selected = false;
      this.selectId = node.selected ? "" : node.id;
      if (this.$refs.tree) {
        this.$refs.tree.nodeSelected(node);
      }
      this.copyNode = node;
    },
    // 编辑或添加后，选择原有的 zone
    getNode(node, id) {
      node.forEach(item => {
        if (item.id == id) {
          this.copyNode = item;
          return true;
        } else {
          item.children && this.getNode(item.children, id);
        }
      });
    },
    editType() {
      // 阻止冒泡
      var event = window.event || arguments.callee.caller.arguments[0];
      event.stopPropagation();
      // eslint-disable-next-line no-console
      console.log(typeof this.selectId);
      if(!this.selectId){
        this.$vs.notify({
          position: 'top-center',
          time: 3000,
          color: 'warning',
          text: '请选择一项进行操作'
        });
        return
      }
      if (this.$tools.selected(this.selectId)) {
        this.active = true;
        this.typeSlidebarInfo.title = this.$t("editType");
        this.typeSlidebarInfo.name = this.copyNode.title;
        this.type = "edit";
      }
    },
    // 编辑或添加的提交事件
    submitData() {
      let params = {
        type: this.copyNode.id,
        alias: this.typeSlidebarInfo.name
      }
      this.$tools.ajax(assetapi.renameType, 'post', params).then(() => {
        console.log(this)
        this.$vs.notify({
          position: 'top-center',
          time: 3000,
          color: 'success',
          text: this.$t('updateMsg')
        });
        this.active = false;
        this.selectId=''
        this.copyNode={}
        // this.getTypeAlias(this.selectId);
        this.getTypeList(this.selectId);
      })
    },
  }
};
</script>
<style lang="scss">
.vs-input--icon {
  top: 5px;
}
.halo-tree {
  li {
    position: relative;
    padding-right: 0;
    &::after {
      border-top: none;
    }
  }

  &.topLevel {
    // max-height: 800px;
    // overflow-y: auto;

    .node-title {
      border: 1px solid #626262;

      &.node-selected {
        background: rgba(var(--vs-primary), 0.08);
        border: 1px solid #7367f0;
        color: #7367f0;
        // background-color: red;
      }
    }

    .tr {
      display: inline-flex;
      justify-content: space-between;
      align-items: center;

      .btn-group {
        position: absolute;
        right: 0px;
        padding: 3px 6px;

        button {
          padding: 0 !important;
          vertical-align: middle;

          // &:first-child {
          //   margin-right: 10px !important;
          // }
        }
      }
    }
  }

  &.topLevel > li {
    padding: 0;
    margin-top: 10px;

    &::before,
    &::after {
      display: none;
    }
  }
}
</style>
