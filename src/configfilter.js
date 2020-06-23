import i18n from './i18n/i18n'
import Vue from 'vue'
var vue = new Vue({
  i18n
});
const progress=[
  {value:vue.$t('todo'),key:'TO_DO'},
  {value:vue.$t('inProgress'),key:'IN_PROGRESS'},
  {value:vue.$t('approved'),key:'APPROVED'},
  {value:vue.$t('rejected'),key:'NOT_APPROVED'},
  {value:vue.$t('review'),key:'IN_REVIEW'},
  {value:vue.$t('done'),key:'DONE'},
  {value:vue.$t('closed'),key:'CLOSED'},
]

const type=[
  {value:vue.$t('eTicket'),key:'STANDARD_EVENT'},
  {value:vue.$t('request'),key:'STANDARD_REQUEST'},
  {value:vue.$t('malfunction'),key:'STANDARD_TROUBLESHOOT'},
  {value:vue.$t('Warehousing'),key:'ASSET_WAREHOUSE'},
  {value:vue.$t('requestHardware'),key:'ASSET_USE_REQUEST'},
  {value:vue.$t('returnHardware'),key:'ASSET_RETURN'},
  {value:vue.$t('discardrequest'),key:'ASSET_DISCARD'},
  {value:vue.$t('inspection'),key:'ASSET_INSPECTION'},
]

export const status=[
  {
    label: vue.$t('available'),
    value: 'AVAILABLE'
  },
  {
    label: vue.$t('warehouse'),
    value: 'WAREHOUSE'
  }, {
    label: vue.$t('discarded'),
    value: 'DISCARDED'
  }, {
    label: vue.$t('maintenance'),
    value: 'MAINTENANCE'
  }
]

export const softType=[{
  label: vue.$t('operatingsystem'),
  value: 'OS'
}, {
  label: vue.$t('database'),
  value: 'DATA_BASE'
}, {
  label: vue.$t('antivirus'),
  value: 'ANTI_VIRUS'
}, {
  label: vue.$t('firewall'),
  value: 'FIRE_WALL'
}, {
  label: vue.$t('middleware'),
  value: 'MIDDLE_WARE'
}, {
  label: vue.$t('application'),
  value: 'APPLICATION'
}]

export const hardwareType=['server','storage','switch','cabinet','router','other']
export const softwareType=['OS','DATA_BASE','FIRE_WALL','MIDDLE_WARE','other']

export const filterTime=[
  {
    label: vue.$t('oneHour'),
    value: 0
  },
  {
    label: vue.$t('oneDay'),
    value: 1
  },
  {
    label: vue.$t('oneWeek'),
    value: 2
  },
  {
    label: vue.$t('oneMonth'),
    value: 3
  }
]

export const duration=[vue.$t('lastWeek'),vue.$t('oneMonth'),vue.$t('lastYear')]

// 配置map
export const progressMap = new Map();
for (let item of progress) {
  progressMap.set(item.key, item.value);
}

// 配置map
export const typeMap = new Map();
for (let item of type) {
  typeMap.set(item.key, item.value);
}

// 配置map
export const statusMap = new Map();
for (let item of status) {
  statusMap.set(item.value, item.label);
}
// 配置map
export const softTypeMap = new Map();
for (let item of softType) {
  softTypeMap.set(item.value, item.label);
}
