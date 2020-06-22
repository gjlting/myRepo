<template>
  <div>
    <vx-card class="page-card">
      <div class="flex items-center pt-3">
        <div class="flex items-center cursor-pointer text-primary mr-5" @click="$router.go(-1)">
          <feather-icon icon="ArrowLeftIcon" svg-classes="w-5 h-5" />
          <span>{{$t('back')}}</span>
        </div>
        <div class="flex items-center cursor-pointer text-primary mr-5"  @click="SaveTemplate()">
          <feather-icon class="mr-1" icon="SaveIcon" svg-classes="w-4 h-4" />
          <span>{{$t('save')}}</span>
        </div>
        <div class="flex items-center cursor-pointer text-primary mr-5" @click="preview=true">
          <feather-icon class="mr-1" icon="EyeIcon" svg-classes="w-4 h-4" />
          <span>{{$t('preview')}}</span>
        </div>
        <!-- <vs-button @click="SaveTemplate()" class="mr-3" type="border">{{$t('save')}}</vs-button>
        <vs-button type="border">{{$t('preview')}}</vs-button> -->
      </div>
      <div class="py-5 mb-5">
        <div class="flex py-5">
          <div class="form-group flex items-center mr-5 pr-5">
            <label class="vs--input-label mr-2">{{$t('name')}}</label>
            <vs-input class="small" :placeholder="$t('name')" v-model="data.name" />
          </div>
          <div class="form-group flex items-center">
            <label class="vs--input-label mr-2">{{$t('type')}}</label>
            <vs-input class="small" @click.stop="focus()" @blur="blur()" v-model="selectedTypeName"  name='type' />
          </div>
        </div>
        <label class="vs--input-label mr-5">{{$t('assetField')}}</label>
        <div class="flex flex-wrap py-3">
          <vs-checkbox class="small mr-4" vs-value="name" v-model="data.fields">{{$t('name')}}</vs-checkbox>
          <vs-checkbox class="small mr-4" vs-value="sn" v-model="data.fields">{{$t('sn')}}</vs-checkbox>
          <vs-checkbox class="small mr-4" vs-value="zone" v-model="data.fields">{{$t('zone')}}</vs-checkbox>
          <vs-checkbox class="small mr-4" vs-value="type" v-model="data.fields">{{$t('type')}}</vs-checkbox>
          <vs-checkbox class="small mr-4" vs-value="maintenanceenceDate" v-model="data.fields">{{$t('maintainenceDate')}}</vs-checkbox>
          <vs-checkbox class="small mr-4" vs-value="brand" v-model="data.fields">{{$t('brand')}}</vs-checkbox>
          <vs-checkbox class="small mr-4" vs-value="model" v-model="data.fields">{{$t('model')}}</vs-checkbox>
        </div>
      </div>
      <div>
        <div class="mt-5 flex items-center">
          <h5 class="mr-5">{{$t('inspectionPoints')}}</h5>
          <span class="cursor-pointer flex items-center primary mr-3" @click.stop="addNewIndex()">
            <feather-icon icon="PlusIcon" svg-classes="w-4 h-4" />
            {{$t('add')}}
          </span>
          <!-- <span class="cursor-pointer flex items-center primary" @click.stop="editIndex(data.children[0])">
            <feather-icon class="mr-1" icon="EditIcon" svg-classes="w-4 h-4" />
            {{$t('edit')}}
          </span> -->
        </div>
        <table class="templateTable mt-5 table w-full">
          <thead>
            <tr>
              <th class="pl-2">{{$t('assets')}}</th>
              <th>{{$t('inspectionIndex')}}</th>
              <th class="text-center">{{$t('type')}}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr class="row-Hover" :key="index" v-for="(item,index) of data.children">
              <th class="pl-2">{{$t('hardware')}}</th>
              <td>
                <div class="flex items-center">
                    <p class="col_width">{{item.label}}</p>
                    <div class="w-full">
                      <div
                        class="flex items-center"
                        :key="i"
                        v-for="(child,i) of item.children"
                      >
                        <p class="col_width">{{child.label}}</p>
                        <div>
                          <p class="col_width" :key="ind" v-for="(innerchild,ind) of child.children">{{innerchild.label}}</p>
                        </div>
                      </div>
                    </div>
                  </div>
              </td>
              <td class="text-center">
                <p v-if="item.inputType">{{$t((item.inputType).toLowerCase())}}</p>
                <p :key="i" v-for="(item,i) of item.children">
                  <template>
                    <p v-if="item.inputType">{{$t((item.inputType).toLowerCase())}}</p>
                    <p :key="ind" v-for="(child,ind) of item.children">
                      <template>
                        <p v-if="child.inputType">{{$t((child.inputType).toLowerCase())}}</p>
                      </template>
                    </p>
                  </template>
                </p>
              </td>
              <td class="text-center">
                <feather-icon
                  @click.stop="editIndex(item,index)"
                  class="cursor-pointer"
                  icon="EditIcon"
                  svg-classes="w-4 h-4 mr-2"
                />
                <feather-icon @click.stop="deleteInspectionIndex(index)" class="cursor-pointer" icon="Trash2Icon" svg-classes="w-4 h-4" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <vs-popup :key="updater" :title="$t('inspectionPoints')" :active.sync="addIndex">
        <form class="text-left">
          <div>
            <div class="flex items-center mb-3">
              <label class="vs-input--label mr-5 model-label">{{$t('name')}}</label>
              <vs-input :class="errors.has('name_l1')?'error':''" v-validate="'required'" name='name_l1' class="mr-2 small" v-model="newIndex.label" :placeholder="$t('name')" />
              <span v-tooltip="$t('addPoint')" @click.stop='appendChild(newIndex,{range:{min:"",max:""},label:"",inputType:"Value",children:[]})' class="flex text-primary cursor-pointer">
                <feather-icon icon="PlusIcon" svg-classes="w-5 h-5" />
                <!-- <span>{{$t('addPoint')}}</span> -->
              </span>
            </div>
            <div style="border:1px solid #eee;padding:20px" v-if="hasChildren(newIndex.children)">
              <div :class="index==0?'':'mt-5'" :key="index" v-for="(child,index) of newIndex.children">
                <div class="flex InspectionPointItem items-center relative mb-3">
                  <label class="vs-input--label mr-5 model-label">{{$t('name')}}</label>
                  <vs-input class="mr-2 small" :class="errors.has('name_l2')?'error':''" v-validate="'required'" name='name_l2' v-model="child.label" :placeholder="$t('name')" />
                  <span v-tooltip="$t('addPoint')" @click.stop="appendChild(newIndex.children[index],{range:{min:'',max:''},label:'',inputType:'Value'})" class="flex text-primary cursor-pointer">
                    <feather-icon icon="PlusIcon" svg-classes="w-5 h-5" />
                  </span>
                  <feather-icon @click.stop="newIndex.children.splice(index,1);newIndex.children.length==0?newIndex={...newIndex,range:{min:'',max:''},inputType:'Value'}:''" class="cursor-pointer removeInspectionPoint" icon="XIcon" svg-classes="w-5 h-5" />
                </div>
                <div style="border:1px solid #eee;padding:20px" v-if="hasChildren(child.children)">
                  <div :class="i==0?'':'mt-5'" :key="i" v-for="(innerchild,i) of child.children">
                    <div class="flex items-center relative InspectionPointItem mb-3">
                      <label class="vs-input--label mr-5 model-label">{{$t('name')}}</label>
                      <vs-input class="mr-2 small" :class="errors.has('name_l2')?'error':''" v-validate="'required'" name='name_l3' v-model="innerchild.label" :placeholder="$t('name')" />
                      <feather-icon @click.stop="child.children.splice(i,1);child.children.length==0?child={...child,range:{min:'',max:''},inputType:'Value'}:''" class="cursor-pointer removeInspectionPoint" icon="XIcon" svg-classes="w-5 h-5" />
                    </div>
                    <div class="flex">
                      <label class="vs-input--label mr-5 model-label">{{$t('type')}}</label>
                      <v-select class="no-clear small-select" v-model="innerchild.inputType" label='label' :reduce="typesOptions => typesOptions.value" :options="typesOptions" />
                    </div>
                    <div class="flex items-center mt-3" v-if="innerchild.inputType=='Value'">
                      <label class="vs-input--label mr-5 model-label">{{$t('reference')}}</label>
                      <vs-input type='number' class="xs" v-model="innerchild.range.min" :placeholder="$t('min')" />
                      <span class="inline-block mx-2 font-bold">-</span>
                      <vs-input type='number' :class="errors.has('min_l2')?'error':''" v-validate="`between:${innerchild.range.min},5000`" name='min_l2' class="xs" v-model="innerchild.range.max" :placeholder="$t('max')" />
                    </div>
                  </div>
                </div>
                <div class="flex" v-else>
                  <label class="vs-input--label mr-5 model-label">{{$t('type')}}</label>
                  <v-select class="no-clear small-select" v-model="child.inputType" label='label' :reduce="typesOptions => typesOptions.value" :options="typesOptions" />
                </div>
                <div class="flex items-center mt-3" v-if="child.inputType=='Value'">
                  <label class="vs-input--label mr-5 model-label">{{$t('reference')}}</label>
                  <vs-input type='number' class="xs" v-model="child.range.min" :placeholder="$t('min')" />
                  <span class="inline-block mx-2 font-bold">-</span>
                  <vs-input type='number' :class="errors.has('min_l3')?'error':''" v-validate="`between:${child.range.min},5000`" name='min_l3' class="xs" v-model="child.range.max" :placeholder="$t('max')" />
                </div>
              </div>
            </div>
            <div v-else>
              <div class="flex">
                <label class="vs-input--label mr-5 model-label">{{$t('type')}}</label>
                <v-select class="no-clear small-select" v-model="newIndex.inputType" label='label' :reduce="typesOptions => typesOptions.value" :options="typesOptions" />
              </div>
              <div class="flex items-center mt-3" v-if="newIndex.inputType=='Value'">
                <label class="vs-input--label mr-5 model-label">{{$t('reference')}}</label>
                <vs-input type='number' class="xs" v-model="newIndex.range.min" :placeholder="$t('min')" />
                <span class="inline-block mx-2 font-bold">-</span>
                <vs-input type='number' :class="errors.has('min_l1')?'error':''" v-validate="`between:${newIndex.range.min},5000`" name='min_l1' class="xs" v-model="newIndex.range.max" :placeholder="$t('max')" />
              </div>
            </div>
            <vs-button  class="mt-5" type='border' @click.prevent="createIndex">{{$t('ok')}}</vs-button>
          </div>
        </form>
      </vs-popup>
      <vs-popup :title="$t('preview')" fullscreen :active.sync="preview">
        <div>
          <table class="templateTable mt-5 table w-full">
            <thead class="text-center">
              <tr>
                <th class="pl-2">{{$t('assets')}}</th>
                <!-- <th>{{$t('inspectionIndex')}}</th> -->
                <th>{{$t('inspectionIndex')}}</th>
                <th class="text-start">{{$t('result')}}</th>
                <th>{{$t('remarks')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr class="row-Hover text-left" :key="index" v-for="(item,index) of data.children">
                <td class="pl-2">{{$t('hardware')}}</td>
                <!-- <td class="pl-2">{{item.label}}</td> -->
                <td class="text-center">
                  <div class="flex items-center">
                    <p class="col_width">{{item.label}}</p>
                    <div class="w-full">
                      <div
                        class="flex items-center"
                        :key="i"
                        v-for="(child,i) of item.children"
                      >
                        <p class="col_width">{{child.label}}</p>
                        <div>
                          <p class="col_width" :key="ind" v-for="(innerchild,ind) of child.children">{{innerchild.label}}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="text-center pl-2">
                  <div v-if="item.inputType" class="my-3">
                    <vs-input disabled class="small" v-if="item.inputType=='value'" v-model="item.status" />  
                    <div v-else class="flex">
                      <vs-checkbox :disabled='true' class="small" v-model="item.status">{{$t('normal')}}</vs-checkbox>
                      <vs-checkbox :disabled='true' class="small" v-model="item.status">{{$t('abnormal')}}</vs-checkbox>
                    </div>
                  </div>
                  <div :key="i" v-for="(item,i) of item.children" class="my-3">
                    <template>
                      <div v-if="item.inputType" class="my-3">
                        <vs-input disabled class="small" v-model="item.status" />  
                      </div>
                      <div :key="ind" v-for="(child,ind) of item.children" class="my-3">
                        <template>
                          <vs-input disabled class="small" v-model="child.status" />  
                        </template>
                      </div>
                    </template>
                  </div>                
                </td>
                <td class="text-center pl-2">
                  <template v-if="item.inputType">
                    <vs-input class="small my-3" v-model="item.remarks" />
                  </template>
                  <div :key="i" v-for="(item,i) of item.children">
                    <template>
                      <template v-if="item.inputType">
                        <vs-input disabled  class="small my-3" v-model="item.remarks" />
                      </template>
                      <div :key="ind" v-for="(child,ind) of item.children">
                          <template v-if="child.inputType">
                            <vs-input disabled  class="small my-3" v-model="child.remarks" />
                        </template>
                      </div>
                    </template>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </vs-popup>
      <data-view-sidebar class='soft-sidebar' :formValid='formValid' :isSidebarActive="dataSidebar.show" @closeSidebar="toggleDataSidebar"
        :title='$t("type")' @submitData='submitData' :submitText='$t("save")'>
        <div slot="content" v-if="dataSidebar.show">
          <Type ref="type" :typeTreeData.sync="typeTreeData"
            :typeSelectId.sync="typeSelectId" :typeSearchValue.sync="typeSearchValue">
          </Type>
        </div>
      </data-view-sidebar>
    </vx-card>
  </div>
</template>
<script>
  import assetapi from '@/api/assetapi.js';
  import Type from '../../assetsManagement/components/hover_type.vue';
export default {
  name: "templateDetail",
  components: {
    Type,
  },
  data() {
    return {
      addIndex: false,
      preview: false,
      typeSearchValue: '',
      updater: 0,
      selectedTypeName: '',
      typeSelectId: [],
      typeTreeData: [],
      TypeList: [],
      currentIndex:0,
      operating:0,
      typesOptions: [{label:this.$t('status'),value:'Status'}, {label:this.$t('value'),value:'Value'}],
      newIndex: {
        lable: "",
        inputType: 'Value',
        range:{min:0,max:0},
        children:[]
      },
      data: {
        name: "",
        hardwareTypeId: "",
        inputType: "",
        fields: [],
        children: []
      },
      dataSidebar: {
        title: '',
        show: false,
        operating: -1 // 0 type 1 zone
      },
    };
  },
  computed:{
    formValid(){
      return this.typeSelectId.length>0
    }
  },
  watch:{
    'data.hardwareTypeId'(id){
      this.selectedTypeName=this.TypeList[id]
    }
  },
  mounted(){
    if(!localStorage.assetTypeLabel){
      this.getTypeList()
    }else{
      this.TypeList=JSON.parse(localStorage.assetTypeLabel)
    }
    
    this.getTypeTreeData()
    let id=this.$router.history.current.params.id
    if(id!=0){
      this.getTemplateDetail(id)
    }
  },
  methods: {
    getTypeList() {
      this.$tools.ajax(assetapi.type+'/map', 'get').then((data) => {
        this.TypeList=data
        localStorage.setItem('assetTypeLabel',JSON.stringify(data))
      })
    },
    removeChildIndex(object,children,index){
      children.splice(index,1)
      if(children.length==0){
        object={...object,range:{min:'',max:''},inputType:'Value'}
        // console.log(object)
      }
    },
    addNewIndex(){
      this.addIndex=true;
      this.operating=0;
      this.newIndex= {label: '',range:{min:'0',max:'0'},inputType: 'Value',children:[]}
      this.updater=Math.random()
    },
    getTemplateDetail(id){
      this.$tools.ajax(assetapi.template+'/'+id, 'get').then((data) => {
        this.data = data.body;
      })
    },
    createIndex() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.addIndex=false
            if(!this.operating){
              this.data.children.push(this.newIndex)
            }else{
              this.data.children[this.currentIndex]=this.newIndex
            }
        } else {
          this.$vs.notify({
            text: this.$t('allFieldsRequired'),
            color: 'warning',
            position: 'top-center',
          })
        }
      })
    },
    getTypeTreeData() {
      this.$store.commit('UPDATE_LOADING', false)
      this.$tools.ajax(assetapi.type, 'get').then((data) => {
        this.typeTreeData = data;
        this.addTitle(this.typeTreeData);
      })
    },
    focus() {
      this.toggleDataSidebar(true)
    },
    blur() {
    },
    addTitle(data) {
      data.map((item) => {
        this.$set(item, 'title', item.name || item.label);
        if (item.children && item.children.length > 0) this.addTitle(item.children);
      });
    },
    appendChild(object,item) {
      delete object.range;
      delete object.inputType;
      object.children=[... object.children,item]
      this.updater=Math.random()
    },
    deleteInspectionIndex(index){
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: this.$t('title'),
        text: this.$t('deleteText'),
        acceptText: this.$t('acceptText'),
        cancelText: this.$t('cancleText'),
        accept: () => {
          this.data.children.splice(index,1)
        }
      })
    },
    editIndex (item,index) {
      item= this.prepareObject(item)
      this.newIndex=item
      this.currentIndex=index;
      this.operating=1;
      this.addIndex=true
      
    },
    prepareObject(item){
      item={...item,type:item.inputType?item.inputType:'',children:item.children?item.children:[]}
      item.children.forEach(child => {
        child={type:child.inputType?child.inputType:'',children:child.children?child.children:[]}
        
        child.children.forEach(innerchild => {
          innerchild={type:innerchild.inputType?innerchild.inputType:''}
        });
      });
      return item
    },
    hasChildren(object){
      let res = false;
      if(typeof object=='object'){
        if(object.length>0){
          res= true
        }
      }
      return res
    },
    SaveTemplate(){
      let params=this.data;
      let id=this.$router.history.current.params.id
      if(id!=0){
        this.$tools.ajax(assetapi.template+'/'+this.data.id, 'post',params,1).then((data) => {
          this.$vs.notify({
            text: this.$t('updateMsg'),
            color: 'success',
            position: 'top-center',
          })
          this.$router.push('/assetInspection/template')
        })
      }else{
        this.$tools.ajax(assetapi.template, 'put',params,1).then((data) => {
          this.$vs.notify({
            text: this.$t('addMsg'),
            color: 'success',
            position: 'top-center',
          })
          this.$router.push('/assetInspection/template')
        })
      }
    },
    submitData() {
      // this.selectedTypeName = this.typeSelectId[0].name
      this.data.hardwareTypeId = this.typeSelectId[0].id
      this.toggleDataSidebar(false)
    },
    toggleDataSidebar(val = false) {
      this.dataSidebar.show = val
    },
  }
};
</script>
<style lang="scss">
@import "@/assets/scss/vuexy/extraComponents/tree.scss";

table.templateTable {
  thead th {
    background-color: #e5e5e5;
  }
  .row-Hover {
    padding: 5px 10px;
    & > td {
      border-top: 1px solid #f3f3f3;
    }
    p,.p {
      line-height: 3;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.InspectionPointItem{
  .removeInspectionPoint{
    position: absolute !important;
    top: 0;
    right: 0;
    display: none;
  }
  &:hover{
    .removeInspectionPoint{
      display: inline-block;
    }
  }
}
.model-label{
  width: 100px;
}
.col_width{
  width:150px
}
</style>