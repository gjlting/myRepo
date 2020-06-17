const baseapi = '/api/v1';
// 登录模块用的api
// 登录 login 
const user = baseapi + '/user';
const auth = user + '/auth';
// 获取图片验证码 Get captcha 
const captcha = user + '/captcha';
// 修改密码 change password 
const changePwd = user + '/password/change';
// 忘记或者重置密码 Forgot password / Rest password 
const resetPwd = user + '/password/forgot';
// 注册 register 
const register = user + '/register';
// 短信验证码 shortcode
const shortcode = user + '/shortcode';
const queryuserByname = user + '/username/{username}';

// 关键字模糊查询

const keyword = user + '/keyword/'

// 更新公司信息
const updateCompany = user + '/company';
// 更新个人信息
const profile = user + '/profile';
// 查询用户可通过用户名/手机号/公司名称/执照
const queryUser = user + '/keyword/{keyword}';
const uploadProfileLogo = user + '/profile/logo';

// 成员
const Member = baseapi + '/member/';
const Primary = Member + 'primary/';
const MemberDelete = Member + 'delete';
const apply = baseapi + '/member/apply';
const quit = baseapi + '/member/quit';
const MemberUpdate = baseapi + '/member/update';

// 角色
const Role = baseapi + '/role/';

// teams

const team = baseapi + '/team/';
const teamMember = baseapi + '/team/member';
const teamLeader = baseapi + '/team/leader';

// department page

const department = baseapi + '/department/';
// 配置
const config = baseapi + '/utility/';

// membership
const membership = baseapi + '/member/memberships';
// switch company
const switchcompany = user + '/switch';


// business module
const business = baseapi + '/business/';
const consumer = business + 'consumer';
const provider = business + 'provider';
const updateTeam = business + 'support/team';

export default {
    user,
    auth,
    captcha,
    changePwd,
    resetPwd,
    register,
    shortcode,
    keyword,
    queryuserByname,

    updateCompany,
    profile,
    queryUser,
    uploadProfileLogo,

    Member,
    MemberDelete,
    Primary,
    apply,
    quit,
    MemberUpdate,

    Role,

    team,
    teamMember,
    teamLeader,

    department,
    config,

    membership,
    switchcompany,

    business,
    consumer,
    provider,
    updateTeam

}