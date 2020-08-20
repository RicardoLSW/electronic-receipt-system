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
      <a-alert :showIcon="true" style="margin-bottom: 16px;">
        <template slot="message">
          <span style="margin-right: 12px;">
            已选择: <a style="font-weight: 600;">{{ this.selectedRows.length }}</a>
          </span>
          <a style="margin-left: 24px;" @click="btnClick">批量打印</a>
        </template>
      </a-alert>
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        showPagination="auto"
        :rowSelection="options.rowSelection"
      >
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
        <span slot="payer" slot-scope="text">
          <ellipsis :length="24" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="receiptStatusMeaning" slot-scope="text">
          <ellipsis :length="24" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="toPage(record)" v-action:print>打印收据</a>
          </template>
        </span>
      </s-table>
    </a-card>
  </div>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { getFinReceiptOrder, keyValueList } from '@/api/api'

export default {
  name: 'ReceiptPrintList',
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
        receiptStatus: null, // 收据状态
        payType: null, // 支付方式
        queryType: 'PRINT',
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
          title: '付款单位 ',
          dataIndex: 'payer',
          scopedSlots: { customRender: 'payer' },
        },
        {
          title: '收据状态',
          dataIndex: 'receiptStatusMeaning',
          scopedSlots: { customRender: 'receiptStatusMeaning' },
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: 150,
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
      options: {
        rowSelection: {
          onChange: this.onSelectChange,
        },
      },
      selectedRowKeys: [],
      selectedRows: [],
    }
  },
  mounted() {
    keyValueList({ type: 'FIN_PAY_RECEIPT_TYPE' }).then((res) => (this.receiptTypeList = res.result))

    keyValueList({ type: 'FIN_PAY_RECEIPT_STATUS_CODE' }).then((res) => (this.receiptStatusList = res.result))

    keyValueList({ type: 'FIN_PAY_RECEIPT_PAY_TYPE' }).then((res) => (this.payTypeList = res.result))
  },
  methods: {
    toPage(record) {
      this.$router.push({ name: 'receiptPrint', query: { receiptNo: record.receiptNo } })
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    btnClick() {
      if (this.selectedRows.length) {
        window.open(`/print?receiptNo=${this.selectedRows.map((e) => e.receiptNo).join('-')}`)
      } else {
        this.$notification.warning({
          message: '警告',
          description: '最少需要选择一条数据',
        })
      }
    },
  },
}
</script>

<style scoped></style>
