<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="收据编号">
                <a-input placeholder="" v-model="queryParam.receiptNo" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="收据类型">
                <a-select placeholder="" mode="multiple" v-model="receiptType" :allowClear="true">
                  <a-select-option v-for="(item, index) in receiptTypeList" :value="item.receiptType" :key="index">{{
                    item.receiptTypeMeaning
                  }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="支付方式">
                <a-select placeholder="" v-model="queryParam.payType">
                  <a-select-option v-for="(item, index) in payTypeList" :value="item.payType" :key="index">{{
                    item.payTypeMeaning
                  }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="24" :sm="24">
              <span class="table-page-search-submitButtons" style="float: right; overflow: hidden;">
                <a-button
                  @click="
                    () => {
                      receiptType = []
                      queryParam.receiptNo = null
                      queryParam.receiptType = null
                      queryParam.payType = null
                      $refs.table.refresh(true)
                    }
                  "
                  >重置</a-button
                >
                <a-button type="primary" style="margin-left: 8px;" @click="$refs.table.refresh(true)">查询</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-card>
    <a-card title="收据列表" style="margin-top: 24px;" :bordered="false">
      <s-table ref="table" size="default" rowKey="id" :columns="columns" :data="loadData" showPagination="auto">
        <template slot="index" slot-scope="text, record, index">
          <span>{{ index + 1 + (queryParam.pageNo - 1) * queryParam.pageSize }}</span>
        </template>
        <span slot="receiptNo" slot-scope="text">
          <ellipsis :length="24" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="receiptTypeMeaning" slot-scope="text">
          <ellipsis :length="24" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="receiptMoney" slot-scope="text">
          <ellipsis :length="24" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="payTypeMeaning" slot-scope="text">
          <ellipsis :length="18" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="submitDate" slot-scope="text">
          <ellipsis :length="24" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="receiptStatusMeaning" slot-scope="text">
          <ellipsis :length="24" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="toPage(record)">查看详情</a>
            <a-divider type="vertical" />
            <a @click="newPage(record)">收据收款</a>
            <a-divider type="vertical" />
            <a-popconfirm title="确认作废？" ok-text="确认" cancel-text="取消" @confirm="confirm(record)">
              <a>作废收据</a>
            </a-popconfirm>
          </template>
        </span>
      </s-table>
    </a-card>
    <a-modal v-model="visible" title="选择微信支付方式" @ok="handleOk">
      <a-radio-group v-model="payType">
        <a-radio value="pay">
          扫码枪扫码付款
        </a-radio>
        <a-radio value="native-pay">
          扫描二维码付款
        </a-radio>
      </a-radio-group>
    </a-modal>
  </div>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { getFinReceiptOrder, keyValueList } from '@/api/api'

export default {
  name: 'ReceiptPayment',
  components: {
    STable,
    Ellipsis,
  },
  data() {
    return {
      receiptType: [],
      // 查询参数
      queryParam: {
        receiptNo: null, // 收据编号
        receiptType: null, // 收据类型
        payType: null, // 支付方式
        queryType: 'TO_PAY',
      },
      columns: [
        { title: '序号', dataIndex: 'index', width: 60, align: 'center', scopedSlots: { customRender: 'index' } },
        {
          title: '收据编号',
          dataIndex: 'receiptNo',
          scopedSlots: { customRender: 'receiptNo' },
        },
        {
          title: '收据类型',
          dataIndex: 'receiptTypeMeaning',
          scopedSlots: { customRender: 'receiptTypeMeaning' },
        },
        {
          title: '收据金额',
          dataIndex: 'receiptMoney',
          scopedSlots: { customRender: 'receiptMoney' },
        },
        {
          title: '付款方式',
          dataIndex: 'payTypeMeaning',
          scopedSlots: { customRender: 'payTypeMeaning' },
        },
        {
          title: '提交时间',
          dataIndex: 'submitDate',
          scopedSlots: { customRender: 'submitDate' },
        },
        {
          title: '收据状态',
          dataIndex: 'receiptStatusMeaning',
          scopedSlots: { customRender: 'receiptStatusMeaning' },
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: 300,
          scopedSlots: { customRender: 'action' },
        },
      ],
      loadData: (parameter) => {
        this.queryParam.receiptType = this.receiptType.length ? this.receiptType.join(',') : null
        return getFinReceiptOrder(Object.assign(this.queryParam, parameter)).then((res) => {
          return {
            data: res.result.data,
            pageNo: parameter.pageNo,
            pageSize: parameter.pageSize,
            totalCount: res.result.totalCount,
          }
        })
      },
      receiptTypeList: [],
      receiptStatusList: [],
      payTypeList: [],
      visible: false,
      payType: null,
      receiptInfo: null,
    }
  },
  mounted() {
    keyValueList({ type: 'FIN_PAY_RECEIPT_TYPE' }).then((res) => (this.receiptTypeList = res.result))

    keyValueList({ type: 'FIN_PAY_RECEIPT_STATUS_CODE' }).then((res) => (this.receiptStatusList = res.result))

    keyValueList({ type: 'FIN_PAY_RECEIPT_PAY_TYPE' }).then((res) => (this.payTypeList = res.result))
  },
  methods: {
    newPage(record) {
      const that = this
      if (record.payType === 'WEIXIN') {
        this.payType = 'pay'
        this.visible = true
        this.receiptInfo = record
      } else if (record.payType === 'CASH') {
        this.$confirm({
          title: '现金支付确认',
          content: '此收据为现金支付的支付方式，若已支付现金请点击确认操作，若现金仍为缴纳请取消确认。',
          onOk() {
            that.$notification.success({
              message: '成功',
              description: '操作成功',
            })
            that.$refs.table.refresh(true)
          },
          onCancel() {
            console.log('Cancel')
          },
        })
      }
    },
    toPage(record) {},
    confirm(record) {},
    handleOk() {
      this.visible = false
      const newPage = window.open(`/${this.payType}?receiptNo=${this.receiptInfo.receiptNo}`)
      const loop = setInterval(() => {
        if (newPage !== null && newPage.closed) {
          console.log('closed')
          this.$refs.table.refresh(true)
          clearInterval(loop)
        }
      }, 800)
    },
    onChange() {},
  },
}
</script>

<style scoped></style>
