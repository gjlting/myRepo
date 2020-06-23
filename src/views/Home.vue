<template>
  <div class="home">
    {{$t('home')}}
    <div>
      <span @click.stop="addNewIndex()" class="container">
        <feather-icon icon="PlusIcon" />
        {{$t('add')}}
      </span>
    </div>
    <vs-popup :title="add" :active.sync="isAddIndex">
      <div>
        <div class="container">
          <vs-input v-model="newIndex.label" :placeholder="inputName" class="label"></vs-input>
          <span @click.stop="appendChild(newIndex, {label:'', inputType:'Value',range:{min:'',max:''},children:[]})">
            <feather-icon icon="PlusIcon" svg-classes="w-5 h-5" />
          </span>
        </div>
        <div class="child" v-if="hasChildren(newIndex.children)">
          <div v-for="(item, index) in newIndex.children" :key="index" class="item">
            <div class="container">
              <vs-input v-model="item.label" :placeholder="inputName" class="label"></vs-input>
              <span @click.stop="appendChild(newIndex.children[index], {label:'', inputType:'Value',range:{min:'',max:''}})">
              <feather-icon icon="PlusIcon" svg-classes="w-5 h-5" />
            </span>
            </div>
            <v-select
              v-if="item.inputType"
              v-model="item.inputType"
              label="label"
              class="select"
              :reduce="typesOptions => typesOptions.value"
              :options="typeOptions"
            />
            <div class="container" v-if="item.range && item.inputType=='Value'">
              <vs-input type="number" name="min" v-model="item.range.min" :placeholder="$t('min')" class="label" />
              <span class="line">-</span>
              <vs-input
                type="number"
                v-model="item.range.max"
                name="max"
                v-validate="{'required':true,'compareNum':item.range.min}"
                :placeholder="$t('max')"
              />
              <span>{{errors.first('max')}}</span>
            </div>
            <div class="child" v-if="hasChildren(item.children)">
              <div v-for="(child, ind) in item.children" :key="ind" class="item">
                <div class="container">
                  <vs-input v-model="child.label" :placeholder="inputName" class="label"></vs-input>
                  <!-- <span @click.stop="appendChild(child.children[index], {label:'', inputType:'Value',range:{min:'',max:''},children:[]})">
                    <feather-icon icon="PlusIcon" svg-classes="w-5 h-5" />
                  </span> -->
                </div>
                <v-select
                  v-model="child.inputType"
                  label="label"
                  class="select"
                  :reduce="typesOptions => typesOptions.value"
                  :options="typeOptions"
                />
                <div class="container" v-if="child.range && child.inputType=='Value'">
                  <vs-input type="number" name="min" v-model="child.range.min" :placeholder="$t('min')" class="label" />
                  <span class="line">-</span>
                  <vs-input
                    type="number"
                    v-model="child.range.max"
                    name="max"
                    v-validate="{'required':true,'compareNum':child.range.min}"
                    :placeholder="$t('max')"
                  />
                  <span>{{errors.first('max')}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <v-select
          v-else
          v-model="newIndex.inputType"
          label="label"
          class="select"
          :reduce="typesOptions => typesOptions.value"
          :options="typeOptions"
        />
        <div class="container" v-if="newIndex.inputType=='Value'">
          <vs-input type="number" v-if="newIndex.range!=undefined" name="min" v-model="newIndex.range.min" :placeholder="$t('min')" />
          <span class="line">-</span>
          <vs-input
            type="number"
            class="label"
            v-model="newIndex.range.max"
            name="max"
            v-validate="{'required':true,'compareNum':newIndex.range.min}"
            :placeholder="$t('max')"
          />
          <span>{{errors.first('max')}}</span>
        </div>
        <vs-button class="btn" type="border" @click="createIndex">{{$t('ok')}}</vs-button>
      </div>
    </vs-popup>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  data() {
    return {
      add: "添加",
      inputName: "请输入名称",
      isAddIndex: false,
      typeOptions: [
        { label: this.$t('status'), value: "Status" },
        { label: this.$t('value'), value: "Value" }
      ],
      newIndex: {
        label: "",
        inputType: "Value",
        range: { min: '', max: '' },
        children: []
      }
    };
  },
  methods: {
    addNewIndex() {
      this.isAddIndex = true;
      this.newIndex = { label: "", inputType: 'Value', range: {min:'',max:''}, children: [] };
      console.log(this.newIndex)
    },
    hasChildren(object) {
      let res = false;
      if (typeof object == "object") {
        if (object.length > 0) {
          res = true;
        }
      }
      return res;
    },
    createIndex() {
      this.addIndex = false;
      if (!this.operating) {
        this.data.children.push(this.newIndex);
      } else {
        this.data.children[this.currentIndex] = this.newIndex;
      }
    },
    Obj(){
      let obj = {
        label: '',
        inputType: 'Value',
        range: {
          min: '',
          max: ''
        },
        children: []
      }
      return obj
    },
    appendChild(object) {
      delete object.inputType
      let item = new this.Obj()
      object.children = [...object.children, item]
      console.log(this.newIndex)
    }
  }
};
</script>
<style lang="scss">
// @import "@/assets/scss/vuexy/extraComponents/tree.scss";
.child {
  margin: 0 0 10px 28px;
  padding: 20px;
  border: 1px solid #ccc;
}
.item {
  margin-bottom: 20px
}
.label, .select, .btn{
  padding-bottom: 10px;
}
.select {
  width: 160px;
}
.line {
  display: inline-block;
  padding: 0 10px;
}
.container {
  display: flex;
  align-items: center;
}
.popWindow {
  padding: 20px;
}
.vs__clear {
  display: none;
}
</style>
