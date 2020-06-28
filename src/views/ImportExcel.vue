<template>
  <div class="importExcel">
    <div>
      <input
        style="display:none"
        type="file"
        ref="fileInput"
        accept=".xlsx, .xls, .csv"
        @change="importData($event)"
      />
      <span @click.stop="importOpen()">导入</span>
      <!-- <div :active.sync="bulk.show"> -->
      <vs-popup class="holamundo" title="导入" :active.sync="bulk.show">
        <div v-if="bulk.show">
          <a :href="href" dowmload="template.xlsx">下载模板</a>
          <a @click="uploadHardware()">上传</a>
        </div>
      </vs-popup>
      <ul>
        <li v-for="(item,key) in bulk.hardware" :key="key">
          <span>品牌：{{item.brand}}</span>
          <span>类型：{{item.model}}</span>
        </li>
      </ul>
    </div>
    <div class="flex">
      <feather-icon
        class="cursor-pointer"
        @click.stop="uploadFiles()"
        icon="ImageIcon"
        svg-classes="w-10 h-10"
      />
      <input
        style="display:none"
        multiple
        type="file"
        ref="uploadImage"
        accept="image/*"
        @change="uploadImage($event)"
      />
      <div class="img">
        <img id="image" ref="image" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import XLSX from "xlsx"
// import assetapi from '@/api/assetapi.js';
export default {
  name: "ImportExcel",
  data() {
    return {
      href:
        this.$i18n.locale === "zh"
          ? "template/assets-template-zh.xlsx"
          : "template/assets-template-en.xlsx",
      bulk: {
        show: false,
        hardware: []
      },
      photos: []
    };
  },
  components: {
  },
  mounted() {
    this.$toast("hello world");
    this.$message({
      type: "success",
      content: "提示信息",
      duration: 3000
    });
  },
  methods: {
    importOpen() {
      this.bulk.show = true;
    },
    importData(e) {
      const files = e.target.files;
      const rawFile = files[0];
      if (!rawFile) return;
      this.uploadFile(rawFile);
    },
    uploadFile(rawFile) {
      this.$refs["fileInput"].value = null;
      this.readerData(rawFile);
    },
    uploadHardware() {
      this.$refs.fileInput.click();
      this.bulk.show = false;
    },
    getIdFiler(list, type) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].label === type) {
          return list[i];
        }
      }
      return "";
    },
    getDisplayName(list, type, attr) {
      for (let i = 0; i < list.length; i++) {
        if (list[i][attr] === type) {
          return list[i][attr];
        }
      }
      return "";
    },
    buldHardware(obj, length) {
      this.bulk.hardware = [];
      let a = [
        { l: "A", v: "type" },
        { l: "B", v: "name" },
        { l: "C", v: "sn" },
        { l: "D", v: "supervisor" },
        { l: "E", v: "code" },
        { l: "F", v: "zone" },
        { l: "G", v: "brand" },
        { l: "H", v: "model" },
        { l: "I", v: "units" },
        { l: "J", v: "installedOn" },
        { l: "K", v: "purchasedOn" },
        { l: "L", v: "warranty" },
        { l: "M", v: "ips" },
        { l: "N", v: "components" },
        { l: "O", v: "attributes" }
      ];
      for (let i = 2; i <= length + 1; i++) {
        let o = {
          type: "",
          name: "",
          sn: "",
          supervisor: "",
          code: "",
          zone: "",
          brand: "Other",
          model: "",
          units: 1,
          installedOn: "",
          purchasedOn: "",
          warranty: "",
          ips: [],
          components: [],
          attributes: [],
          consumer: "",
          container: false,
          contractNo: "",
          info: "",
          parent: "",
          placedAtUnit: 0,
          poweredOn: true,
          project: "",
          provider: "",
          documents: [],
          photos: [],
          status: "AVAILABLE",
          // owner:this.ownerinfo.showOwner
          owner: ""
        };
        try {
          a.forEach((item, index) => {
            if (obj[item.l + i]) {
              if (obj[item.l + i].w !== "") {
                o[item.v] = obj[item.l + i].w;
                // if(index===0){
                //   let typeid=this.$options.filters['getIdFiler'](this.typelist,obj[item.l+i].w).id
                //   if(typeid){
                //     o[item.v]=typeid
                //     o.container=this.$options.filters['getIdFiler'](this.typelist,obj[item.l+i].w).container
                //   }else{
                //     throw new Error(`${this.$t('check')}${i}${this.$t('row')}${this.$t('type')}`);
                //   }
                // }else if(index===3){
                //   // Match an existing supervisor
                //   let supervisors = this.$store.state.myUsers
                //   let providerName = this.$options.filters['getDisplayName'](supervisors,obj[item.l+i].w,'displayName')

                //   if(providerName){
                //     o[item.v]=providerName
                //   }else{
                //     throw new Error(`${this.$t('check')}${i}${this.$t('row')}${this.$t('supervisor')}`);
                //   }
                // }else if(index===5){
                //   let zoneid=this.$options.filters['getIdFiler'](this.zonelist,obj[item.l+i].w).id
                //   if(zoneid){
                //     o[item.v]=zoneid
                //   }else{
                //     throw new Error(`${this.$t('check')}${i}${this.$t('row')}${this.$t('zone')}`);
                //   }
                // }else if(index===9){
                //   if(!this.$tools.IsDate(obj[item.l+i].w)){
                //     throw new Error(`${this.$t('check')}${i}${this.$t('row')}${this.$t('installedOn')}`);
                //   }else{
                //      o[item.v]=obj[item.l+i].w
                //   }
                // }else if(index===10){
                //   if(!this.$tools.IsDate(obj[item.l+i].w)){
                //     throw new Error(`${this.$t('check')}${i}${this.$t('row')}${this.$t('maintenancestart')}`);
                //   }else{
                //      o[item.v]=obj[item.l+i].w
                //   }
                // }else if(index===11){
                //   if(!this.$tools.IsDate(obj[item.l+i].w)){
                //     throw new Error(`${this.$t('check')}${i}${this.$t('row')}${this.$t('maintenanceend')}`);
                //   }else{
                //      o[item.v]=obj[item.l+i].w
                //   }
                // }
                // else if(index===12){
                //   let iplist=[]
                //   let ip=obj[item.l+i].w.split("\n")
                //   ip.forEach(item=>{
                //     let ipitem=item.split(":")
                //     iplist.push({
                //       label:ipitem[0],
                //       ip:ipitem[1],
                //     })
                //   })
                //   o[item.v]=iplist
                // }else if(index===13){
                //   let comlist=[]
                //   let com=obj[item.l+i].w.split("\n")
                //   com.forEach(item=>{
                //     let comitem=item.split(":")
                //     comlist.push({
                //       label:comitem[0],
                //       value:comitem[1],
                //       quantity:comitem[2]
                //     })
                //   })
                //   o[item.v]=comlist
                // }else if(index===14){
                //   let attrlist=[]
                //   let attr=obj[item.l+i].w.split("\n")
                //   attr.forEach(item=>{
                //     let attritem=item.split(":")
                //     attrlist.push({
                //       label:attritem[0],
                //       value:attritem[1],
                //     })
                //   })
                //   o[item.v]=attrlist
                // }else{
                //   o[item.v]=obj[item.l+i].w
                // }
              }
            } else {
              if (index === 0) {
                throw new Error(
                  `${this.$t("check")}${i}${this.$t("row")}${this.$t(
                    "type"
                  )},${this.$t("type")}${this.$t("required")}`
                );
              } else if (index === 1) {
                throw new Error(
                  `${this.$t("check")}${i}${this.$t("row")}${this.$t(
                    "name"
                  )},${this.$t("name")}${this.$t("required")}`
                );
              } else if (index === 2) {
                throw new Error(
                  `${this.$t("check")}${i}${this.$t("row")}SN,SN ${this.$t(
                    "required"
                  )}`
                );
              } else if (index === 4) {
                throw new Error(
                  `${this.$t("check")}${i}${this.$t("row")}${this.$t(
                    "code"
                  )},${this.$t("code")}${this.$t("required")}`
                );
              } else if (index === 5) {
                throw new Error(
                  `${this.$t("check")}${i}${this.$t("row")}${this.$t(
                    "zone"
                  )},${this.$t("zone")}${this.$t("required")}`
                );
              }
            }
          });
        } catch (err) {
          this.$vs.notify({
            position: "top-center",
            time: 3000,
            color: "warning",
            text: err
          });
          return;
        }
        this.bulk.hardware.push(o);
        // this.$loading.close()
      }
      // this.$tools.ajax(assetapi.bulk, 'put', this.bulk.hardware, 1)
      // .then(()=>{
      //   this.queryHardwareList()
      // })
    },
    readerData(rawFile) {
      // this.$loading('正在加载中...')
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = e => {
          const data = e.target.result;
          const workbook = XLSX.read(data, {
            type: "array"
          });
          console.log(workbook);
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          if (!worksheet["!ref"]) {
            alert("当前导入的文档没有数据");
            return;
          }
          // const header = this.getHeaderRow(worksheet)
          const result = XLSX.utils.sheet_to_json(worksheet);
          // eslint-disable-next-line no-console
          console.log(result);
          // const meta = {
          //   sheetName: firstSheetName
          // }
          if (result.length <= 0) {
            alert("当前导入文档没有数据且默认第一行为标题");
            return;
          }
          this.buldHardware(worksheet, result.length);
          resolve();
        };
        reader.readAsArrayBuffer(rawFile);
      });
    },
    uploadFiles() {
      this.$refs.uploadImage.dispatchEvent(new MouseEvent("click"));
    },
    uploadImage(e) {
      let file = e.target.files[0];
      var formData = new FormData();
      formData.append("file", file);
      console.log(file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      let _this = this;
      reader.onload = function(data) {
        console.log(data);
        _this.$refs.image.src = data.target.result;
      };
    }
  }
};
</script>
<style scoped lang="scss">
.flex {
  display: flex;
  align-items: center;
}
.img {
  width: 100px;
  height: 100px;
  img {
    width: 100%;
    height: 100%;
    &:not([src]) {
      opacity: 0;
    }
  }
 
}
</style>
