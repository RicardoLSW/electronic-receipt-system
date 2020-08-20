<template>
  <div
    class="flex-column"
    style="max-width: 500px; margin: 40px auto 0; height: 500px; justify-content: space-between;"
  >
    <a-form :form="form" v-if="type === 0">
      <a-form-item label="付款单位" :labelCol="labelCol" :wrapperCol="wrapperCol" required>
        <a-input
          placeholder="请输入付款单位"
          v-decorator="['payer', { rules: [{ required: true, message: '请输入付款单位' }] }]"
        />
      </a-form-item>
      <a-form-item label="收据描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-textarea
          placeholder="请输入收据的相关描述"
          :rows="4"
          v-decorator="['receiptDesc', { rules: [{ message: '请输入收据的相关描述' }] }]"
        />
      </a-form-item>
      <a-form-item label="收据金额" :labelCol="labelCol" :wrapperCol="wrapperCol" required>
        <a-input-number
          placeholder="请输入金额"
          style="width: 100%;"
          :precision="2"
          :step="0.01"
          :min="0"
          v-decorator="['receiptMoney', { rules: [{ required: true, message: '请输入金额' }] }]"
        />
      </a-form-item>
      <a-form-item label="合同号" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input
          placeholder="请输入合同号"
          v-decorator="['contractNo', { rules: [{ required: true, message: '请输入合同号' }] }]"
        />
      </a-form-item>
      <a-form-item label="发票号" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input
          placeholder="请输入发票号"
          v-decorator="['invoiceNo', { rules: [{ required: true, message: 'invoiceNo' }] }]"
        />
      </a-form-item>
    </a-form>
    <a-form :form="form" v-if="type === 1">
      <a-form-item label="付款单位" :labelCol="labelCol" :wrapperCol="wrapperCol" required>
        <a-input
          placeholder="请输入付款单位"
          v-decorator="['payer', { rules: [{ required: true, message: '请输入付款单位' }] }]"
        />
      </a-form-item>
      <a-form-item label="收据描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-textarea
          placeholder="请输入收据的相关描述"
          :rows="4"
          v-decorator="['receiptDesc', { rules: [{ message: '请输入收据的相关描述' }] }]"
        />
      </a-form-item>
      <a-form-item label="收据金额" :labelCol="labelCol" :wrapperCol="wrapperCol" required>
        <a-input-number
          placeholder="请输入金额"
          style="width: 100%;"
          :precision="2"
          :step="0.01"
          :min="0"
          v-decorator="['receiptMoney', { rules: [{ required: true, message: '请输入金额' }] }]"
        />
      </a-form-item>
      <a-form-item label="客户号" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input
          placeholder="请输入客户号"
          v-decorator="['customerNo', { rules: [{ required: true, message: '请输入客户号' }] }]"
        />
      </a-form-item>
    </a-form>
    <a-form :form="form" v-if="type === 2">
      <a-form-item label="付款单位" :labelCol="labelCol" :wrapperCol="wrapperCol" required>
        <a-input
          placeholder="请输入付款单位"
          v-decorator="['payer', { rules: [{ required: true, message: '请输入付款单位' }] }]"
        />
      </a-form-item>
      <a-form-item label="收据描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-textarea
          placeholder="请输入收据的相关描述"
          :rows="4"
          v-decorator="['receiptDesc', { rules: [{ message: '请输入收据的相关描述' }] }]"
        />
      </a-form-item>
      <a-form-item label="收据金额" :labelCol="labelCol" :wrapperCol="wrapperCol" required>
        <a-input-number
          placeholder="请输入金额"
          style="width: 100%;"
          :precision="2"
          :step="0.01"
          :min="0"
          v-decorator="['receiptMoney', { rules: [{ required: true, message: '请输入金额' }] }]"
        />
      </a-form-item>
      <a-form-item label="发票号" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input
          placeholder="请输入发票号"
          v-decorator="['invoiceNo', { rules: [{ required: true, message: '请输入发票号' }] }]"
        />
      </a-form-item>
    </a-form>
    <a-form :form="form" v-if="type === 3">
      <a-form-item label="付款单位" :labelCol="labelCol" :wrapperCol="wrapperCol" required>
        <a-input
          placeholder="请输入付款单位"
          v-decorator="['payer', { rules: [{ required: true, message: '请输入付款单位' }] }]"
        />
      </a-form-item>
      <a-form-item label="收据描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-textarea
          placeholder="请输入收据的相关描述"
          :rows="4"
          v-decorator="['receiptDesc', { rules: [{ message: '请输入收据的相关描述' }] }]"
        />
      </a-form-item>
      <a-form-item label="收据金额" :labelCol="labelCol" :wrapperCol="wrapperCol" required>
        <a-input-number
          placeholder="请输入金额"
          style="width: 100%;"
          :precision="2"
          :step="0.01"
          :min="0"
          v-decorator="['receiptMoney', { rules: [{ required: true, message: '请输入金额' }] }]"
        />
      </a-form-item>
    </a-form>
    <a-form :form="form" v-if="type === 4">
      <a-form-item label="实收编号" :labelCol="labelCol" :wrapperCol="wrapperCol" required v-if="paidNoRequired">
        <a-input
          placeholder="请输入实收编号"
          v-decorator="['paidNo', { rules: [{ required: true, message: '请输入实收编号' }] }]"
        />
        <a-checkbox
          @change="onChange"
          style="position: absolute; width: 150px; margin-left: 10px; color: #ff4d4f;"
          :checked="!paidNoRequired"
        >
          暂无实收编号
        </a-checkbox>
      </a-form-item>
      <a-form-item label="实收编号" :labelCol="labelCol" :wrapperCol="wrapperCol" v-if="!paidNoRequired">
        <a-input
          placeholder="请输入实收编号"
          v-decorator="['paidNo', { rules: [{ message: '请输入实收编号' }] }]"
          disabled
        />
        <a-checkbox
          @change="onChange"
          style="position: absolute; width: 150px; margin-left: 10px; color: #ff4d4f;"
          :checked="!paidNoRequired"
        >
          暂无实收编号
        </a-checkbox>
      </a-form-item>
      <a-form-item label="付款单位" :labelCol="labelCol" :wrapperCol="wrapperCol" required>
        <a-input
          placeholder="请输入付款单位"
          v-decorator="['payer', { rules: [{ required: true, message: '请输入付款单位' }] }]"
          :disabled="isPaidNo"
        />
      </a-form-item>
      <a-form-item label="收据描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-textarea
          placeholder="请输入收据的相关描述"
          :rows="4"
          v-decorator="['receiptDesc', { rules: [{ message: '请输入收据的相关描述' }] }]"
        />
      </a-form-item>
      <a-form-item label="收据金额" :labelCol="labelCol" :wrapperCol="wrapperCol" required>
        <a-input-number
          placeholder="请输入金额"
          style="width: 100%;"
          :precision="2"
          :step="0.01"
          :min="0"
          v-decorator="['receiptMoney', { rules: [{ required: true, message: '请输入金额' }] }]"
          :disabled="isPaidNo"
        />
      </a-form-item>
    </a-form>
    <a-form-item style="width: 100%; display: flex; justify-content: center;">
      <a-button @click="prevStep" style="margin-right: 10px;">上一步</a-button>
      <a-button type="primary" @click="nextStep" style="margin-left: 10px;">下一步</a-button>
    </a-form-item>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { isEmpty } from '@/utils/util'
import pick from 'lodash.pick'
import { getOrderNo } from '@/api/api'
export default {
  name: 'Step2',
  data() {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      type: null,
      paidNoRequired: true,
      isPaidNo: false,
    }
  },
  mounted() {
    const {
      form: { setFieldsValue },
      receiptIssuedForm,
    } = this
    if (!isEmpty(receiptIssuedForm().step1)) {
      if (receiptIssuedForm().step1.payType === 'BANK') {
        this.type = 4
        this.$nextTick(() => {
          if (!isEmpty(receiptIssuedForm().step2)) {
            this.paidNoRequired = receiptIssuedForm().step2.paidNoRequired
            this.isPaidNo = receiptIssuedForm().step2.isPaidNo
            setFieldsValue(pick(receiptIssuedForm().step2, ['payer', 'receiptDesc', 'receiptMoney', 'paidNo']))
          }
        })
      } else {
        // 根据不同收据类型，渲染相应的表单
        switch (receiptIssuedForm().step1.receiptType) {
          case 'STORAGE':
            this.type = 0
            this.$nextTick(() => {
              if (!isEmpty(receiptIssuedForm().step2)) {
                setFieldsValue(
                  pick(receiptIssuedForm().step2, ['payer', 'receiptDesc', 'receiptMoney', 'contractNo', 'invoiceNo'])
                )
              }
            })
            break
          case 'PREPAID':
          case 'PICK':
            this.type = 1
            this.$nextTick(() => {
              if (!isEmpty(receiptIssuedForm().step2)) {
                setFieldsValue(pick(receiptIssuedForm().step2, ['payer', 'receiptDesc', 'receiptMoney', 'customerNo']))
              }
            })
            break
          case 'CARRY':
          case 'UNQUALIFIED':
            this.type = 2
            this.$nextTick(() => {
              if (!isEmpty(receiptIssuedForm().step2)) {
                setFieldsValue(pick(receiptIssuedForm().step2, ['payer', 'receiptDesc', 'receiptMoney', 'invoiceNo']))
              }
            })
            break
          case 'STAFF':
          case 'FINE':
          case 'CUSTOMER_MEAL':
          case 'CERTIFICATE':
          case 'OTHER':
            this.type = 3
            this.$nextTick(() => {
              if (!isEmpty(receiptIssuedForm().step2)) {
                setFieldsValue(pick(receiptIssuedForm().step2, ['payer', 'receiptDesc', 'receiptMoney']))
              }
            })
            break
          default:
            break
        }
      }
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
     * 下一步
     */
    nextStep() {
      const {
        form: { validateFields },
        setReceiptIssuedForm,
        receiptIssuedForm,
      } = this
      validateFields(async (err, values) => {
        if (!err) {
          let receiptNo = null
          if (!receiptIssuedForm()?.step2?.receiptNo) {
            receiptNo = await getOrderNo().then((res) => res.result.receiptNo)
          }
          await setReceiptIssuedForm(
            Object.assign(receiptIssuedForm(), {
              step2: Object.assign(
                {
                  receiptNo: receiptIssuedForm()?.step2?.receiptNo ? receiptIssuedForm()?.step2?.receiptNo : receiptNo,
                  paidNoRequired: this.paidNoRequired,
                  isPaidNo: this.isPaidNo,
                },
                pick(receiptIssuedForm().step1, 'receiptTypeMeaning', 'receiptType', 'payType', 'payTypeMeaning'),
                values
              ),
            })
          )
          this.$emit('nextStep')
        }
      })
    },
    onChange(e) {
      const {
        form: { setFieldsValue },
      } = this
      this.paidNoRequired = !e.target.checked
      if (e.target.checked) {
        setFieldsValue({
          paidNo: null,
        })
      }
    },
  },
}
</script>

<style scoped></style>
