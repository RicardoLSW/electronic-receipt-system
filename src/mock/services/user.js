import Mock from 'mockjs2'
import { builder, getBody } from '../util'

const info = (options) => {
  console.log('options', options)
  const body = getBody(options)
  const userInfo = {
    id: '4291d7da9005377ec9aec4a71ea837f',
    name: '天野远子',
    username: body.username,
    password: '',
    avatar: '/avatar2.jpg',
    status: 1,
    telephone: '',
    lastLoginIp: '27.154.74.117',
    lastLoginTime: 1534837621348,
    creatorId: 'admin',
    createTime: 1497160610259,
    merchantCode: 'TLif2btpzg079h15bk',
    deleted: 0,
    roleId: body.username,
    role: {},
  }

  switch (userInfo.roleId) {
    case 'xiaoMing':
      userInfo.role = {
        id: 'xiaoMing',
        name: '管理员',
        describe: '拥有所有权限',
        permissions: [
          {
            roleId: 'xiaoMing',
            permissionId: 'workSpace',
            permissionName: '工作台',
            actionEntitySet: [
              {
                action: 'receiptIssued',
                describe: '收据开具',
                defaultCheck: false,
              },
              {
                action: 'receiptAudit',
                describe: '收据审核',
                defaultCheck: false,
              },
              {
                action: 'receiptQuery',
                describe: '收据查询',
                defaultCheck: false,
              },
              {
                action: 'receiptPrintList',
                describe: '收据打印',
                defaultCheck: false,
              },
            ],
            actionList: null,
            dataAccess: null,
          },
          {
            roleId: 'xiaoMing',
            permissionId: 'receiptIssued',
            permissionName: '收据开具',
            actionEntitySet: [],
            actionList: null,
            dataAccess: null,
          },
          {
            roleId: 'xiaoMing',
            permissionId: 'receiptAudit',
            permissionName: '收据审核',
            actionEntitySet: [],
            actionList: null,
            dataAccess: null,
          },
          {
            roleId: 'xiaoMing',
            permissionId: 'receiptPrintList',
            permissionName: '收据打印',
            actionEntitySet: [],
            actionList: null,
            dataAccess: null,
          },
          {
            roleId: 'xiaoMing',
            permissionId: 'receiptQuery',
            permissionName: '收据查询',
            actionEntitySet: [],
            actionList: null,
            dataAccess: null,
          },
        ],
      }
      break
    case 'xiaoHong':
      userInfo.role = {
        id: 'xiaoHong',
        name: '管理员',
        describe: '拥有所有权限',
        permissions: [
          {
            roleId: 'xiaoHong',
            permissionId: 'workSpace',
            permissionName: '工作台',
            actionEntitySet: [
              {
                action: 'receiptCollection',
                describe: '收据收款',
                defaultCheck: false,
              },
              {
                action: 'receiptQuery',
                describe: '收据查询',
                defaultCheck: false,
              },
            ],
            actionList: null,
            dataAccess: null,
          },
          {
            roleId: 'xiaoHong',
            permissionId: 'receiptCollection',
            permissionName: '收据收款',
            actionEntitySet: [],
            actionList: null,
            dataAccess: null,
          },
          {
            roleId: 'xiaoHong',
            permissionId: 'receiptQuery',
            permissionName: '收据查询',
            actionEntitySet: [],
            actionList: null,
            dataAccess: null,
          },
        ],
      }
      break
    default:
      break
  }

  return builder(userInfo)
}

Mock.mock(/\/api\/user\/info/, 'get', info)
