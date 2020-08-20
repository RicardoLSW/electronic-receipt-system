<template>
  <div>
    <a-card :bordered="false" v-if="result === 'none'">
      <a-steps class="steps" :current="currentTab">
        <a-step title="选择收据类型" />
        <a-step title="填写收据信息" />
        <a-step title="开具完成" />
      </a-steps>
      <div>
        <step1 v-if="currentTab === 0" @nextStep="nextStep" />
        <step2 v-if="currentTab === 1" @nextStep="nextStep" @prevStep="prevStep" />
        <step3 v-if="currentTab === 2" @prevStep="prevStep" @finish="finish" />
      </div>
    </a-card>
    <a-card :bordered="false" v-else-if="result === 'success' || result === 'error'">
      <result :type="result" :description="description" :title="title">
        <template slot="action">
          <a-button style="margin-left: 8px;" v-if="result === 'success'" @click="toPage('receiptIssued')"
            >继续开具</a-button
          >
          <a-button style="margin-left: 8px;" v-else-if="result === 'error'" @click="toPage('receiptIssued')"
            >重新开具</a-button
          >
        </template>
      </result>
    </a-card>
  </div>
</template>

<script>
import step1 from './component/Step1'
import step2 from './component/Step2'
import step3 from './component/Step3'
import { Result } from '@/components'
export default {
  name: 'ReceiptIssu',
  components: {
    step1,
    step2,
    step3,
    Result,
  },
  data() {
    return {
      currentTab: 0,
      result: 'none',
      title: '',
      description: '',
    }
  },
  methods: {
    nextStep() {
      if (this.currentTab < 2) {
        this.currentTab += 1
      }
    },
    prevStep() {
      if (this.currentTab > 0) {
        this.currentTab -= 1
      }
    },
    finish(value) {
      this.title = `开具${value === 'success' ? '成功' : value === 'error' ? '失败' : ''}`
      this.result = value
      this.currentTab = 0
    },
    toPage(value) {
      if (value === 'receiptIssued') {
        this.result = 'none'
      } else if (value === 'receiptManagement') {
        this.$router.push({ name: value })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.steps {
  max-width: 750px;
  margin: 16px auto;
}
</style>
