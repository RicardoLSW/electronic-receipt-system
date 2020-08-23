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
              <a-form-item label="收据状态">
                <a-select v-model="queryParam.receiptStatus">
                  <a-select-option
                    v-for="(item, index) in receiptStatusList"
                    :value="item.receiptStatus"
                    :key="index"
                    >{{ item.receiptStatusMeaning }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="支付方式">
                <a-select v-model="queryParam.payType">
                  <a-select-option v-for="(item, index) in payTypeList" :value="item.payType" :key="index">{{
                    item.payTypeMeaning
                  }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="支付时间">
                <a-range-picker @change="onChange" style="width: 100%;" v-model="rangePicker" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <span class="table-page-search-submitButtons" style="float: right; overflow: hidden;">
                <a-button type="primary">导出</a-button>
                <a-button
                  style="margin-left: 8px;"
                  @click="
                    () => {
                      queryParam.receiptNo = null
                      queryParam.receiptStatus = null
                      receiptType = []
                      queryParam.receiptType = null
                      queryParam.payType = null
                      rangePicker = null
                      queryParam.startDate = null
                      queryParam.endDate = null
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
          <a style="margin-left: 24px;" @click="btnClick">批量记账</a>
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
          <ellipsis :length="18" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="payTypeMeaning" slot-scope="text">
          <ellipsis :length="18" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="submitDate" slot-scope="text">
          <ellipsis :length="24" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="payer" slot-scope="text">
          <ellipsis :length="10" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="payDate" slot-scope="text">
          <ellipsis :length="24" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="receiptStatusMeaning" slot-scope="text, record">
          <ellipsis :length="24" tooltip :style="{ color: record.receiptStatus === 'BOOKED' ? '#52c41a' : '' }">{{
            text
          }}</ellipsis>
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="toPage(record)">查看详情</a>
            <a-divider type="vertical" v-if="record.payType === 'BANK' && record.receiptStatus !== 'CANCEL'" />
            <a-popconfirm
              title="确认作废？"
              ok-text="确认"
              cancel-text="取消"
              @confirm="confirm(record)"
              v-if="record.payType === 'BANK' && record.receiptStatus !== 'CANCEL'"
            >
              <a>作废收据</a>
            </a-popconfirm>
          </template>
        </span>
      </s-table>
    </a-card>
  </div>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { getFinReceiptOrder, keyValueList } from '@/api/api'
import moment from 'moment'

export default {
  name: 'ReceiptTheQuery',
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
        startDate: null,
        endDate: null,
        queryType: 'QUERY',
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
          title: '支付时间 ',
          dataIndex: 'payDate',
          scopedSlots: { customRender: 'payDate' },
        },
        {
          title: '收据状态',
          dataIndex: 'receiptStatusMeaning',
          scopedSlots: { customRender: 'receiptStatusMeaning' },
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: 170,
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
      receiptTypeList: [], // 收据类型列表
      receiptStatusList: [], // 收据状态列表
      options: {
        rowSelection: {
          onChange: this.onSelectChange,
        },
      },
      selectedRowKeys: [],
      selectedRows: [],
      payTypeList: [], // 支付方式列表
      rangePicker: null,
    }
  },
  mounted() {
    keyValueList({ type: 'FIN_PAY_RECEIPT_TYPE' }).then((res) => (this.receiptTypeList = res.result))

    keyValueList({ type: 'FIN_PAY_RECEIPT_STATUS_CODE' }).then((res) => (this.receiptStatusList = res.result))

    keyValueList({ type: 'FIN_PAY_RECEIPT_PAY_TYPE' }).then((res) => (this.payTypeList = res.result))
  },
  methods: {
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toPage(record) {},
    btnClick() {},
    confirm(record) {},
    onChange(e) {
      if (e.length) {
        this.queryParam.startDate = moment(e[0]).format('YYYY-MM-DD')
        this.queryParam.endDate = moment(e[1]).format('YYYY-MM-DD')
      } else {
        this.queryParam.startDate = this.queryParam.endDate = null
      }
    },
  },
}
</script>

<style scoped></style>
