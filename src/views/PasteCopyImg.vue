<template>
  <div>
    <vue-editor class="dynamic-image-editor" v-model="editor" userCustomImageHandler @imageAdded="handleImageAdd">

    </vue-editor>
    
  </div>
</template>

<script>
// @ is an alias to /src
import { VueEditor } from 'vue2-editor'
export default {
  name: "PasteCopyImg",
  data() {
    return {
      editor: ''
    };
  },
  components: {VueEditor},
  methods: {
    // handleImageAdded(file, Editor, cursorLocation, resetUploader) {
    handleImageAdded(file) {
      let formData = new FormData()
      formData.append('file', file)

    }

  }
};
</script>
<style scoped>
.dynamic-image-editor{
  width: 150%;
  height: 100px;
  margin-left: 20px;
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
