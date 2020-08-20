<script src="../../mock/services/common.js"></script>
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
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        showPagination="auto"
        :alert="options.alert"
        :rowSelection="options.rowSelection"
      >
        <template slot="index" slot-scope="text, record, index">
          <span>{{ index + 1 + (queryParam.pageNo - 1) * queryParam.pageSize }}</span>
        </template>
        <span slot="receiptNo" slot-scope="text">
          <ellipsis :length="18" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="receiptTypeMeaning" slot-scope="text">
          <ellipsis :length="18" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="receiptMoney" slot-scope="text">
          <ellipsis :length="18" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="payTypeMeaning" slot-scope="text">
          <ellipsis :length="18" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="submitDate" slot-scope="text">
          <ellipsis :length="18" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="receiptStatusMeaning" slot-scope="text">
          <ellipsis :length="18" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="payer" slot-scope="text">
          <ellipsis :length="18" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="receiptSourceMeaning" slot-scope="text">
          <ellipsis :length="18" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="toPage(record)">查看详情</a>
            <a-divider type="vertical" />
            <a @click="audit(record)">审核</a>
          </template>
        </span>
      </s-table>
    </a-card>
    <a-modal title="收据审核" :visible="visible" @cancel="handleCancel">
      <a-form :form="form">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="审核备注"
          v-if="!(record.receiptStatus === 'NOT_TRANSFER')"
        >
          <a-textarea v-model="commentText" :rows="4" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="实收编号"
          v-if="record.receiptStatus === 'NOT_TRANSFER'"
        >
          <a-input
            placeholder="请输入实收编号"
            v-decorator="['paidNo', { rules: [{ required: true, message: '请输入实收编号' }] }]"
          />
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-button
          key="back"
          @click="handleReject"
          type="danger"
          ghost
          :loading="loading"
          v-if="!(record.receiptStatus === 'NOT_TRANSFER')"
        >
          退回
        </a-button>
        <a-button key="submit" type="primary" @click="handleApprove" :loading="loading">
          通过
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { getFinReceiptOrder, keyValueList } from '@/api/api'
export default {
  name: 'ReceiptAudit',
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
        payType: null, // 支付类型
        queryType: 'TO_APPROVE',
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
          title: '付款单位 ',
          dataIndex: 'payer',
          scopedSlots: { customRender: 'payer' },
        },
        {
          title: '收据来源',
          dataIndex: 'receiptSourceMeaning',
          scopedSlots: { customRender: 'receiptSourceMeaning' },
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
      options: {
        alert: {
          btnName: '批量审核',
          show: true,
          btnClick: () => {
            if (this.selectedRows.some((e) => e.receiptStatus === 'NOT_TRANSFER')) {
              this.$notification.warning({
                message: '警告',
                description: '银行转账类型的收据无法批量审核，请单独进行审核！',
              })
            } else {
              this.visible = true
            }
          },
        },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange,
        },
      },
      selectedRowKeys: [],
      selectedRows: [],
      visible: false,
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      record: {},
      commentText: null,
      loading: false,
      payTypeList: [],
      form: this.$form.createForm(this),
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
    handleApprove() {
      const {
        form: { validateFields },
      } = this
      validateFields((err, values) => {
        if (!err) {
          this.$notification.success({
            message: '成功',
            description: '操作成功',
          })
          this.commentText = null
          this.$refs.table.refresh(true)
          this.visible = false
        }
      })
    },
    handleReject() {
      this.$notification.success({
        message: '成功',
        description: '操作成功',
      })
      this.commentText = null
      this.$refs.table.refresh(true)
      this.visible = false
    },
    handleCancel() {
      this.visible = false
    },
    audit(record) {
      this.record = record
      this.visible = true
    },
    toPage(record) {},
  },
}
</script>

<style scoped></style>
