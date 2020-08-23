// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

// const RouteView = {
//   name: 'RouteView',
//   render: (h) => h('router-view'),
// }

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/work-space',
    children: [
      {
        path: 'work-space',
        name: 'workSpace',
        component: () => import('@/views/dashboard/WorkSpace'),
        meta: { title: '工作台', icon: bxAnaalyse, permission: ['workSpace'] },
      },
      {
        path: 'receipt-issued',
        name: 'receiptIssued',
        component: () => import('@/views/receiptIssu/ReceiptIssu'),
        meta: { title: '收据开具', icon: bxAnaalyse, permission: ['receiptIssued'] },
      },
      {
        path: 'receipt-collection',
        name: 'receiptCollection',
        component: () => import('@/views/receiptPayment/ReceiptPayment'),
        meta: { title: '收据收款', icon: bxAnaalyse, permission: ['receiptCollection'] },
      },
      {
        path: 'receipt-audit',
        name: 'receiptAudit',
        component: () => import('@/views/receiptAudit/ReceiptAudit'),
        meta: { title: '收据审核', icon: bxAnaalyse, permission: ['receiptAudit'] },
      },
      {
        path: 'receipt-query',
        name: 'receiptQuery',
        component: () => import('@/views/receiptTheQuery/ReceiptTheQuery'),
        meta: { title: '收据查询', icon: bxAnaalyse, permission: ['receiptQuery'] },
      },
      {
        path: 'receipt-print-list',
        name: 'receiptPrintList',
        component: () => import('@/views/receiptPrintList/ReceiptPrintList'),
        meta: { title: '收据打印', icon: bxAnaalyse, permission: ['receiptPrintList'] },
      },
      {
        path: 'receipt-print',
        name: 'receiptPrint',
        component: () => import('@/views/receiptPrint/ReceiptPrint'),
        meta: { title: '收据打印详情', permission: ['receiptPrintList'] },
        hidden: true,
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login'),
      },
    ],
  },
]
