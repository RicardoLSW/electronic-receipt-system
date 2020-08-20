// eslint-disable-next-line
import {
  // eslint-disable-next-line
  getAction,
  // eslint-disable-next-line
  postAction,
  // eslint-disable-next-line
  httpAction,
  // eslint-disable-next-line
  putAction,
  // eslint-disable-next-line
  deleteAction,
  // eslint-disable-next-line
  patchAction,
  // eslint-disable-next-line
  exportAction,
  // eslint-disable-next-line
  http2Action,
} from '@/api/manage'

const getReceiptTotal = (params) => getAction('/receipt-total', params) // 工作台-数据
const getReceiptTypePercentage = (params) => getAction('/receipt-type-percentage', params) // 工作台-收据类别占比
const getReceiptMonthCount = (params) => getAction('/receipt-month-count', params) // 工作台-查询收据单本月统计数据

export { getReceiptTotal, getReceiptTypePercentage, getReceiptMonthCount }
