import Mock from 'mockjs2'
import { builder } from '../util'

// 获取收据编号
const getOrderNo = () => {
  return builder({
    receiptNo: Mock.mock('@integer(100000000, 999999999)'),
  })
}

// 查询收据详情
const finReceiptOrder = () => {
  return builder({
    id: 11841,
    receiptNo: '20200719000001',
    receiptType: 'PICK',
    receiptTypeMeaning: '梯货款',
    receiptMoney: 10,
    submitDate: '2020-07-19 17:34:08',
    receiptStatusMeaning: '待付款',
    receiptStatus: 'TO_PAY',
    payer: '财务部测试付款人',
    payDate: null,
    receiptSource: '100006',
    receiptSourceMeaning: '财务部',
    nodeLevel: 'LEVEL4',
    processAssignee: 'nbs13,u2083,',
    processAssigneeName: '王威,庞宏',
    objectVersionNumber: 2,
    payType: 'WEIXIN',
    payTypeMeaning: '微信支付',
    receiptDesc: '财务部收据描述',
    invoiceNo: '财务部测试发票号',
    customerNo: null,
    contractNo: null,
    receiptMoneyCapital: '壹拾元整',
    businessSource: 'FinPayReceiptProcess',
    createdBy: 'nbs35',
    printStatus: 'N',
    paidNo: null,
    payStatus: null,
    qrCode: 'weixin://wxpay/aaa?pr=bbb',
  })
}

Mock.mock(/\/order-no/, 'get', getOrderNo)
Mock.mock(/\/fin-receipt-order/, 'get', finReceiptOrder)
