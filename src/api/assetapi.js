const baseapi = '/asset/v1';

// hardware list
const hardware = baseapi + '/hardware/';
const filter = hardware + 'filter';
const hardwaresSoft = hardware + 'software/';
const install = hardwaresSoft + 'install';
const uninstall = hardwaresSoft + 'uninstall';
const bulk = hardware + 'bulk';
const version = hardware + 'version/';

// sn matching
const elastic = hardware + 'elastic/sn/'
// const elastic =hardware + 'elastic'
const sns = hardware + 'sn/bulk'


// software
const software = baseapi + '/software/'
const softwarefilter = software + 'filter'
const softwareUsage = software + 'usage'

// type
const type = baseapi + '/hardware/type/';
const addType = type + 'add';
const alias = type + 'alias';
const renameType = type + '/rename';

const template = type + 'template'

// license
const license = software + 'license/';
// license filter
const licensefilter = software + 'license/filter'

// type
const zone = baseapi + '/zone/';
const zoneids = baseapi + '/zone/id';
const addZone = zone + 'add';
const owner = zone + 'owner';
const renameZone = zone + '/rename';

// asset inspection
const inspection = baseapi + '/inspection/';
const task = inspection + 'task';
const todo = inspection + 'todo/task';


// add plugin delete plugin for container
const plugin = hardware + 'plugin';
const unplugin = hardware + 'unplug';

// power on & power off
const poweron = hardware + 'power/on';
const poweroff = hardware + 'power/off';

//brand model
const brand = hardware + 'brand/';
const model = hardware + 'brand/model';

//statistics-controller
const growthTrend = baseapi + '/stats/asset/growth/trend'
const typePercent = baseapi + '/stats/hardware/type/percent'
const statusPercent = baseapi + '/stats/hardware/status/percent'
const softSyepPercent = baseapi + '/stats/software/type/percent'
const powerTrend = baseapi + '/stats/hardware/power/trend'
export default {
  hardware,
  filter,
  hardwaresSoft,
  install,
  uninstall,
  bulk,
  version,

  sns,
  elastic,

  type,
  addType,
  alias,
  renameType,

  zone,
  zoneids,
  addZone,
  owner,
  renameZone,

  software,
  softwarefilter,
  softwareUsage,

  license,
  licensefilter,

  template,

  inspection,
  task,
  todo,

  plugin,
  unplugin,

  poweron,
  poweroff,

  brand,
  model,

  growthTrend,
  typePercent,
  statusPercent,
  softSyepPercent,
  powerTrend,
}