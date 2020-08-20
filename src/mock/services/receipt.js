import Mock from 'mockjs2'
import { builder } from '../util'

// 获取收据编号
const getOrderNo = () => {
  return builder({
    receiptNo: Mock.mock('@integer(100000000, 999999999)'),
  })
}

Mock.mock(/\/order-no/, 'get', getOrderNo)
