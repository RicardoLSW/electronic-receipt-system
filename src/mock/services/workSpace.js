import Mock from 'mockjs2'
import { builder } from '../util'

// 工作台-数据
const receiptTotal = () => {
  return builder({
    lastWeekCount: Mock.mock('@integer(1, 999)'),
    lastWeekReceiptMoney: Mock.mock('@integer(1, 999999)'),
    todayCount: Mock.mock('@integer(1, 99)'),
    todayReceiptMoney: Mock.mock('@integer(1, 999999)'),
    assigneeNum: Mock.mock('@integer(1, 99)'),
  })
}

// 饼图数据
const receiptTypePercentage = () => {
  const count = 5
  const finRcptTypeDetailVoList = new Array(count)
  const receiptTotalMoney = Mock.mock('@integer(1, 999999)')
  for (let i = 0; i < count; i++) {
    finRcptTypeDetailVoList[i] = {
      receiptMoney: Mock.mock('@integer(1, 99999)'),
      receiptPct: Mock.mock('@float(1, 99, 2, 2)') + '%',
      receiptTypeMeaning: Mock.mock('@csentence(5)'),
    }
  }
  return builder({
    finRcptTypeDetailVoList,
    receiptTotalMoney,
  })
}

// 折线图数据
const receiptMonthCount = () => {
  const count = 31
  const thisMonth = new Array(count)
  const lastMonth = new Array(count)
  for (let i = 0; i < count; i++) {
    thisMonth[i] = {
      count: Mock.mock('@integer(1, 99)'),
      day: `2020/08/${i < 9 ? '0' + (i + 1) : i + 1}`,
      type: '本月',
    }
    lastMonth[i] = {
      count: Mock.mock('@integer(1, 99)'),
      day: `2020/08/${i < 9 ? '0' + (i + 1) : i + 1}`,
      type: '上月',
    }
  }
  return builder({
    finRcptMonthTotalVo: {
      lastMouthRcptCount: Mock.mock('@integer(1, 99)'),
      lastMouthRcptMoney: Mock.mock('@integer(1, 99999)'),
      rcptCountFlag: 'DOWN',
      rcptMoneyFlag: 'DOWN',
      receiptType: 'PREPAID',
      receiptTypeMeaning: '预付款',
      thisMouthMoneyPct: '0.00%',
      thisMouthOrderPct: '0.00%',
      thisMouthRcptCount: Mock.mock('@integer(1, 99)'),
      thisMouthRcptMoney: Mock.mock('@integer(1, 99)'),
    },
    finRcptMonthDetailVoList: thisMonth.concat(lastMonth),
  })
}

Mock.mock(/\/receipt-total/, 'get', receiptTotal)
Mock.mock(/\/receipt-type-percentage/, 'get', receiptTypePercentage)
Mock.mock(/\/receipt-month-count/, 'get', receiptMonthCount)
