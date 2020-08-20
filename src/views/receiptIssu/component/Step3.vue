<template>
  <div class="flex-column" style="padding: 20px; height: 500px; justify-content: space-between;">
    <div>
      <div class="flex-row" style="align-items: center;">
        <a-avatar shape="square" :size="16" :src="icon[0]" />
        <span
          style="
            color: rgba(0, 0, 0, 0.847058823529412);
            font-size: 16px;
            font-family: 'PingFangSC-Regular', 'PingFang SC';
            font-weight: 400;
            margin-left: 5px;
          "
          >收据信息</span
        >
      </div>
      <a-table
        :columns="columns"
        :data-source="tableData"
        bordered
        :pagination="false"
        :show-header="false"
        style="margin: 20px 0px;"
      >
        <template slot="name" slot-scope="text">
          <div>
            {{ text }}
          </div>
        </template>
        <template slot="value" slot-scope="text">
          <div>{{ text }}</div>
        </template>
      </a-table>
    </div>
    <a-form-item style="width: 100%; display: flex; justify-content: center;">
      <a-button @click="prevStep" style="margin-right: 10px;">上一步</a-button>
      <a-button type="primary" @click="finish" style="margin-left: 10px;" :loading="loading">完成收据开具</a-button>
    </a-form-item>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { isEmpty } from '@/utils/util'

export default {
  name: 'Step3',
  data() {
    return {
      icon: [require('@/assets/icons/u692.png')],
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
          width: 300,
          customCell: () => {
            return { style: 'background: rgba(250, 250, 250, 1);' }
          },
        },
        {
          title: 'Value',
          dataIndex: 'value',
          scopedSlots: { customRender: 'value' },
        },
      ],
      tableData: [],
      keyValue: [
        {
          key: 'receiptNo',
          value: '收据编号',
        },
        {
          key: 'receiptTypeMeaning',
          value: '收据类型',
        },
        {
          key: 'paidNo',
          value: '实收编号',
        },
        {
          key: 'payer',
          value: '付款单位',
        },
        {
          key: 'receiptDesc',
          value: '收据描述',
        },
        {
          key: 'receiptMoney',
          value: '收据金额',
        },
        {
          key: 'payTypeMeaning',
          value: '支付方式',
        },
        {
          key: 'contractNo',
          value: '合同号',
        },
        {
          key: 'invoiceNo',
          value: '发票号',
        },
        {
          key: 'customerNo',
          value: '客户号',
        },
      ],
      loading: false,
    }
  },
  mounted() {
    const { receiptIssuedForm } = this
    if (!isEmpty(receiptIssuedForm().step2) && !isEmpty(receiptIssuedForm().step1)) {
      this.keyValue.forEach((e, i) => {
        for (const key in receiptIssuedForm().step2) {
          if (e.key === key) {
            if (receiptIssuedForm().step2[key]) {
              this.tableData.push({
                key: i,
                name: this.keyValue.filter((e) => e.key === key)[0].value,
                value: receiptIssuedForm().step2[key],
              })
            }
          }
        }
      })
    }
  },
  methods: {
    ...mapGetters(['receiptIssuedForm']),
    ...mapActions(['setReceiptIssuedForm']),
    /**
     * 上一步
     */
    prevStep() {
      this.$emit('prevStep')
    },
    /**
     * 完成开具
     */
    finish() {
      this.loading = true
      const { setReceiptIssuedForm } = this
      setReceiptIssuedForm({})
      this.loading = false
      this.$emit('finish', 'success')
    },
  },
}
</script>

<style scoped></style>
