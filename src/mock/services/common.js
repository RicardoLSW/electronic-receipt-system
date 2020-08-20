import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

// 值列表
const lookupValue = (options) => {
  const parameters = getQueryParameters(options)

  switch (parameters.type) {
    // 收据类型
    case 'FIN_PAY_RECEIPT_TYPE':
      return builder(
        JSON.parse(
          '[{"receiptType":"STORAGE","receiptTypeMeaning":"仓储费"},{"receiptType":"PREPAID","receiptTypeMeaning":"预付款"},{"receiptType":"PICK","receiptTypeMeaning":"梯货款"},{"receiptType":"CARRY","receiptTypeMeaning":"搬运设备"},{"receiptType":"UNQUALIFIED","receiptTypeMeaning":"不合格品赔偿"},{"receiptType":"STAFF","receiptTypeMeaning":"员工付款"},{"receiptType":"FINE","receiptTypeMeaning":"罚款"},{"receiptType":"CUSTOMER_MEAL","receiptTypeMeaning":"客饭费"},{"receiptType":"CERTIFICATE","receiptTypeMeaning":"补合格证"},{"receiptType":"OTHER","receiptTypeMeaning":"其他"}]'
        )
      )
    // 付款方式
    case 'FIN_PAY_RECEIPT_PAY_TYPE':
      return builder(
        JSON.parse(
          '[{"payType":"WEIXIN","payTypeMeaning":"微信支付"},{"payType":"CASH","payTypeMeaning":"现金支付"},{"payType":"BANK","payTypeMeaning":"银行转账"}]'
        )
      )
    // 收据状态
    case 'FIN_PAY_RECEIPT_STATUS_CODE':
      return builder(
        JSON.parse(
          '[{"receiptStatus":"TO_APPROVE","receiptStatusMeaning":"待审核"},{"receiptStatus":"REJECTED","receiptStatusMeaning":"已退回"},{"receiptStatus":"CANCEL","receiptStatusMeaning":"已作废"},{"receiptStatus":"TO_PAY","receiptStatusMeaning":"待付款"},{"receiptStatus":"COMPLETED","receiptStatusMeaning":"已完成"},{"receiptStatus":"BOOKED","receiptStatusMeaning":"已记账"},{"receiptStatus":"NOT_TRANSFER","receiptStatusMeaning":"未转账"},{"receiptStatus":"TRANSFERRED","receiptStatusMeaning":"已转账"}]'
        )
      )
    default:
      return null
  }
}

const finReceiptOrder = (options) => {
  const totalCount = 111
  const result = []
  const parameters = getQueryParameters(options)
  const pageSize = parseInt(parameters.pageSize)
  const pageNo = parseInt(parameters.pageNo)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? totalCount % pageSize : pageSize) + 1
  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    const payType = Mock.mock('@pick(["WEIXIN", "CASH"])')
    const payTypeMeaning = payType === 'WEIXIN' ? '微信支付' : '现金支付'
    const receiptTypeMeaning = Mock.mock(
      `@pick(${JSON.parse(
        '[{"receiptType":"STORAGE","receiptTypeMeaning":"仓储费"},{"receiptType":"PREPAID","receiptTypeMeaning":"预付款"},{"receiptType":"PICK","receiptTypeMeaning":"梯货款"},{"receiptType":"CARRY","receiptTypeMeaning":"搬运设备"},{"receiptType":"UNQUALIFIED","receiptTypeMeaning":"不合格品赔偿"},{"receiptType":"STAFF","receiptTypeMeaning":"员工付款"},{"receiptType":"FINE","receiptTypeMeaning":"罚款"},{"receiptType":"CUSTOMER_MEAL","receiptTypeMeaning":"客饭费"},{"receiptType":"CERTIFICATE","receiptTypeMeaning":"补合格证"},{"receiptType":"OTHER","receiptTypeMeaning":"其他"}]'
      ).map((e) => e.receiptTypeMeaning)})`
    )
    let receiptStatusMeaning = []
    if (parameters.queryType === 'TO_APPROVE' || parameters.queryType === 'TO_PAY') {
      receiptStatusMeaning = Mock.mock(
        `@pick(${JSON.parse(
          '[{"receiptStatus":"TO_APPROVE","receiptStatusMeaning":"待审核"},{"receiptStatus":"REJECTED","receiptStatusMeaning":"已退回"},{"receiptStatus":"CANCEL","receiptStatusMeaning":"已作废"},{"receiptStatus":"TO_PAY","receiptStatusMeaning":"待付款"},{"receiptStatus":"COMPLETED","receiptStatusMeaning":"已完成"},{"receiptStatus":"BOOKED","receiptStatusMeaning":"已记账"},{"receiptStatus":"NOT_TRANSFER","receiptStatusMeaning":"未转账"},{"receiptStatus":"TRANSFERRED","receiptStatusMeaning":"已转账"}]'
        )
          .filter((e) => e.receiptStatus === parameters.queryType)
          .map((e) => e.receiptStatusMeaning)})`
      )
    } else {
      receiptStatusMeaning = Mock.mock(
        `@pick(${JSON.parse(
          '[{"receiptStatus":"TO_APPROVE","receiptStatusMeaning":"待审核"},{"receiptStatus":"REJECTED","receiptStatusMeaning":"已退回"},{"receiptStatus":"CANCEL","receiptStatusMeaning":"已作废"},{"receiptStatus":"TO_PAY","receiptStatusMeaning":"待付款"},{"receiptStatus":"COMPLETED","receiptStatusMeaning":"已完成"},{"receiptStatus":"BOOKED","receiptStatusMeaning":"已记账"},{"receiptStatus":"NOT_TRANSFER","receiptStatusMeaning":"未转账"},{"receiptStatus":"TRANSFERRED","receiptStatusMeaning":"已转账"}]'
        ).map((e) => e.receiptStatusMeaning)})`
      )
    }
    result.push({
      id: tmpKey,
      key: tmpKey,
      receiptNo: Mock.mock('@integer(1000000000, 9999999999)'),
      receiptTypeMeaning,
      payTypeMeaning,
      receiptStatusMeaning,
      receiptMoney: Mock.mock('@integer(1000, 99999)'),
      payDate: Mock.mock('@date(yyyy-mm-dd)'),
      submitDate: Mock.mock('@date(yyyy-mm-dd)'),
      receiptStatus: Mock.mock('@csentence(5)'),
      payer: Mock.mock('@cname'),
      receiptSourceMeaning: Mock.mock('@csentence(5)'),
      payType,
    })
  }

  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result,
  })
}

Mock.mock(/\/lookup-values/, 'get', lookupValue)
Mock.mock(/\/fin-receipt-order/, 'get', finReceiptOrder)
