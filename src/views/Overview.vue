<template>
  <div class="overview">
    <div class="flex">
      <div class="f-1">
        <highcharts :options="typedata"></highcharts>
      </div>
      <div class="f-1">
        <highcharts :options="statusdata"></highcharts>
      </div>
      <div class="f-1">
        <highcharts :options="softTypedata"></highcharts>
      </div>
    </div>
    <div class="flex items-center">
      <div class="mr-6 f-1">
        <div>
          <highcharts :options="grouthdata"></highcharts>
        </div>
      </div>
      <div class="f-1">
        <div>
          <highcharts :options="powerStatusdata"></highcharts>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import assetapi from "@/api/assetapi";
import { softwareType } from "@/configfilter.js";
export default {
  name: "Overview",
  data() {
    return {
      options: {
        chart: {
          type: "pie",
          height: 300
        },
        tooltip: {
          formatter: function() {
            return this.point.name + ": " + this.point.y;
          }
        },
        credits: {
          enabled: false // 去掉highcharts右下角版权标签
        },
        plotOptions: {
          pie: {
            allowPointSelect: false,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "{point.name}: {point.percentage:.1f} %",
              style: {
                fontWeight: "400"
              }
            },
            showInLegend: true
          }
        },
        title: {
          text: "",
          // align: "left",
          style: {
            fontSize: "1.2rem"
          }
        }
      },
      typedata: {},
      statusdata: {},
      softTypedata: {},
      grouthdata: {
        chart: {
          type: "line"
        },
        // colors: this.$store.state.chartDefaultColors,
        colors: [ '#3FA1FF','#3ECBCB','#50CB74', '#FBD444', '#ED561B', '#8643E0'],
        tooltip: {
          crosshairs: true,
          shared: true
        },
        plotOptions: {
          spline: {
            marker: {
              radius: 4,
              lineColor: "#666666",
              lineWidth: 1
            }
          }
        },
        credits: {
          enabled: false
        },
        xAxis: {
          categories: []
        },
        yAxis: {
          title: {
            text: ""
          }
        },
        title: {
          text: "AssetGrowth"
        },
        series: []
      },
      powerStatusdata: {
        chart: {
          type: "column"
        },
        colors: ["#50B432", "#3FA1FF"],
        legend: {
          reversed: false
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          column: {
            stacking: "normal"
          }
        },
        tooltip: {
          pointFormat:
            '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b>' +
            "<br/>",
          shared: true
        },
        xAxis: {
          categories: []
        },
        yAxis: {
          title: {
            text: ""
          }
        },
        title: {
          text: "hardwarePower"
        },
        series: []
      }
    };
  },
  mounted() {
    this.drawChartType();
    this.drawChartType();
    this.drawChartStatus();
    this.drawChartSoftType();
    this.drawChartGrowth();
    this.drawChartPower();
  },
  methods: {
    drawChartType() {
      this.$tools.ajax(assetapi.typePercent, "get").then(res => {
        let datas = [];
        res.types.forEach((item, index) => {
          datas.push({
            y: res.qty[index],
            name: this.$t(item)
          });
        });
        this.typedata = this.$tools.deepCopy(this.options);
        this.typedata.title.text = this.$t("hardwareType");
        this.typedata.series = [
          {
            data: datas
          }
        ];
      });
    },
    drawChartStatus() {
      this.$tools.ajax(assetapi.statusPercent, "get").then(res => {
        let datas = [];
        res.status.forEach((item, index) => {
          datas.push({
            y: res.qty[index],
            name: this.$t(item)
          });
        });
        this.statusdata = this.$tools.deepCopy(this.options);
        (this.statusdata.colors = ["#50CB74", "#3FA1FF", "#FBD444", "#ED561B"]),
          (this.statusdata.title.text = this.$t("hardwareStatus"));
        this.statusdata.series = [
          {
            innerSize: "60%",
            data: datas
          }
        ];
      });
    },
    drawChartSoftType() {
      this.$tools.ajax(assetapi.softSyepPercent, "get").then(res => {
        let datas = [];
        softwareType.forEach(item => {
          res.types.forEach((items, i) => {
            if (items === item) {
              datas.push({
                y: res.qty[i],
                name: this.$options.filters["softTypefilter"](items)
                  ? this.$options.filters["softTypefilter"](items)
                  : this.$t("other")
              });
            }
          });
        });
        this.softTypedata = this.$tools.deepCopy(this.options);
        this.softTypedata.title.text = this.$t("softwareType");
        this.softTypedata.series = [
          {
            data: datas
          }
        ];
      });
    },
    drawChartGrowth() {
      this.$tools.ajax(assetapi.growthTrend, "get").then(res => {
        this.grouthdata.xAxis.categories = res.weeks;
        this.grouthdata.series = [
          {
            name: this.$t("hardware"),
            data: res.hardwares,
            // zones: [
            //   {
            //     color: "#f7a35c"
            //   }
            // ]
          },
          {
            name: this.$t("software"),
            data: res.softwares,
            // zones: [
            //   {
            //     color: "#7cb5ec"
            //   }
            // ]
          }
        ];
      });
    },
    drawChartPower() {
      this.$tools.ajax(assetapi.powerTrend, "get").then(res => {
        res.types.forEach(item => {
          this.powerStatusdata.xAxis.categories.push(this.$t(item));
        });
        this.powerStatusdata.series = [
          {
            name: this.$t("poweredOn"),
            data: res.powered_on
          },
          {
            name: this.$t("poweredOff"),
            data: res.powered_off
          }
        ];
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.overview {
  .flex {
    display: flex;
    .f-1 {
      flex: 1;
    }
  }
}
.items-center {
  justify-content: space-between;
}
</style>
