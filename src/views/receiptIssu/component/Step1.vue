<template>
  <a-form
    :form="form"
    style="max-width: 500px; margin: 40px auto 0; height: 500px; justify-content: space-between; align-items: center;"
    class="flex-column"
  >
    <div style="width: 100%;">
      <a-form-item label="收据类型" :labelCol="labelCol" :wrapperCol="wrapperCol" required style="width: 100%;">
        <a-select
          placeholder="请选择收据类型"
          v-decorator="['receiptType', { rules: [{ required: true, message: '请选择收据类型' }] }]"
        >
          <a-select-option v-for="(item, index) in receiptTypeList" :value="item.receiptType" :key="index">{{
            item.receiptTypeMeaning
          }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="支付方式" :labelCol="labelCol" :wrapperCol="wrapperCol" required style="width: 100%;">
        <a-select
          placeholder="请选择支付方式"
          v-decorator="['payType', { rules: [{ required: true, message: '请选择支付方式' }] }]"
        >
          <a-select-option v-for="(item, index) in payTypeList" :value="item.payType" :key="index">{{
            item.payTypeMeaning
          }}</a-select-option>
        </a-select>
      </a-form-item>
    </div>
    <a-form-item style="width: 100%; display: flex; justify-content: center;">
      <a-button type="primary" @click="nextStep">下一步</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { isEmpty } from '@/utils/util'
import pick from 'lodash.pick'
import { keyValueList } from '@/api/api'

export default {
  name: 'Step1',
  data() {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      receiptTypeList: [], // 收据类型
      payTypeList: [], // 支付方式
    }
  },
  mounted() {
    setTimeout(async () => {
      const {
        form: { setFieldsValue },
        receiptIssuedForm,
      } = this
      await keyValueList({ type: 'FIN_PAY_RECEIPT_TYPE' }).then((res) => (this.receiptTypeList = res.result))
      await keyValueList({ type: 'FIN_PAY_RECEIPT_PAY_TYPE' }).then((res) => (this.payTypeList = res.result))
      if (!isEmpty(receiptIssuedForm().step1)) {
        await setFieldsValue(pick(receiptIssuedForm().step1, ['receiptType', 'payType']))
      }
    }, 0)
  },
  methods: {
    ...mapActions(['setReceiptIssuedForm']),
    ...mapGetters(['receiptIssuedForm']),
    nextStep() {
      const {
        form: { validateFields },
        setReceiptIssuedForm,
        receiptIssuedForm,
      } = this
      // 先校验，通过表单校验后，才进入下一步
      validateFields((err, values) => {
        if (!err) {
          setReceiptIssuedForm(
            Object.assign(receiptIssuedForm(), {
              step1: Object.assign(
                this.receiptTypeList.filter((e) => e.receiptType === values.receiptType)[0],
                this.payTypeList.filter((e) => e.payType === values.payType)[0]
              ),
            })
          )
          this.$emit('nextStep')
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
