<template>
  <a-card :bordered="false">
    <div class="flex-row" style="justify-content: space-between; align-items: center;">
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
          >收据</span
        >
      </div>
      <a-button type="primary" @click="print" v-action:print>收据打印</a-button>
    </div>
    <div class="flex-column" style="justify-content: center; align-items: center; padding: 24px;">
      <div id="print-box">
        <div id="receipt" style="width: 1000px; height: 410px; background: #fccce7;">
          <div class="flex-row" style="justify-content: center; align-items: center; position: relative;">
            <div style="padding-bottom: 3px; border-bottom: 1px solid black;">
              <div style="font-size: 32px; padding: 5px 64px; text-align: center; border-bottom: 1px solid black;">
                收<span style="margin: 0px 24px;"></span>据
              </div>
            </div>
            <div style="position: absolute; right: 50px; font-size: 32px; bottom: 0px;">
              NQ<span style="color: #0c47c0;">{{ infoData.receiptNo }}</span>
            </div>
          </div>
          <div class="flex-row" style="padding: 20px 30px 0px; font-size: 18px; position: relative;">
            <div>单位：上海三菱电梯有限公司</div>
            <div style="position: absolute; right: 250px;">{{ infoData.submitDate | localDay }}</div>
          </div>
          <div
            class="flex-column"
            style="
              margin: 10px;
              border: 1.2px solid black;
              height: 230px;
              justify-content: space-between;
              align-items: center;
              font-size: 18px;
              font-weight: 400;
              position: relative;
            "
          >
            <div class="flex-row" style="width: 100%; padding: 20px 10px;">
              <div class="flex-row">
                <span>付款单位</span>
                <div style="width: 400px; border-bottom: 1px solid black; padding: 0 20px;">
                  {{ infoData.payer }}
                </div>
              </div>
              <div class="flex-row">
                <span>付款方式</span>
                <div style="width: 394px; border-bottom: 1px solid black; padding: 0 20px;">
                  {{ infoData.payTypeMeaning }}
                </div>
              </div>
            </div>
            <div class="flex-row" style="width: 100%; padding: 20px 10px;">
              <div class="flex-row">
                <span>人民币（大写）</span>
                <div style="width: 400px; border-bottom: 1px solid black; padding: 0 20px;">
                  {{ infoData.receiptMoneyCapital }}
                </div>
              </div>
              <div class="flex-row">
                <span>¥</span>
                <div style="width: 400px; border-bottom: 1px solid black; padding: 0 20px;">
                  {{ infoData.receiptMoney }}
                </div>
              </div>
            </div>
            <div class="flex-row" style="width: 100%; padding: 20px 10px;">
              <span>系付</span>
              <div style="width: 900px; border-bottom: 1px solid black; padding: 0 20px;">
                {{ infoData.receiptTypeMeaning }}，{{ infoData.receiptDesc }}
              </div>
            </div>
            <div
              style="
                position: absolute;
                right: 10px;
                width: 20px;
                margin: 0 auto;
                line-height: 24px;
                top: 50%;
                transform: translateY(-50%);
              "
            >
              客户联
            </div>
          </div>
          <div class="flex-row-space-around" style="font-size: 18px; padding: 0px 30px;">
            <div>单位公章：</div>
            <div>复核人：</div>
            <div>收款人：</div>
            <div>制单：李</div>
          </div>
        </div>
      </div>
      <div id="print-box2" style="margin-top: 50px;">
        <div id="receipt2" style="width: 1000px; height: 410px; background: #fccce7;">
          <div class="flex-row" style="justify-content: center; align-items: center; position: relative;">
            <div style="padding-bottom: 3px; border-bottom: 1px solid black;">
              <div style="font-size: 32px; padding: 5px 64px; text-align: center; border-bottom: 1px solid black;">
                收<span style="margin: 0px 24px;"></span>据
              </div>
            </div>
            <div style="position: absolute; right: 50px; font-size: 32px; bottom: 0px;">
              NQ<span style="color: #0c47c0;">{{ infoData.receiptNo }}</span>
            </div>
          </div>
          <div class="flex-row" style="padding: 20px 30px 0px; font-size: 18px; position: relative;">
            <div>单位：上海三菱电梯有限公司</div>
            <div style="position: absolute; right: 250px;">{{ infoData.submitDate | localDay }}</div>
          </div>
          <div
            class="flex-column"
            style="
              margin: 10px;
              border: 1.2px solid black;
              height: 230px;
              justify-content: space-between;
              align-items: center;
              font-size: 18px;
              font-weight: 400;
              position: relative;
            "
          >
            <div class="flex-row" style="width: 100%; padding: 20px 10px;">
              <div class="flex-row">
                <span>付款单位</span>
                <div style="width: 400px; border-bottom: 1px solid black; padding: 0 20px;">
                  {{ infoData.payer }}
                </div>
              </div>
              <div class="flex-row">
                <span>付款方式</span>
                <div style="width: 394px; border-bottom: 1px solid black; padding: 0 20px;">
                  {{ infoData.payTypeMeaning }}
                </div>
              </div>
            </div>
            <div class="flex-row" style="width: 100%; padding: 20px 10px;">
              <div class="flex-row">
                <span>人民币（大写）</span>
                <div style="width: 400px; border-bottom: 1px solid black; padding: 0 20px;">
                  {{ infoData.receiptMoneyCapital }}
                </div>
              </div>
              <div class="flex-row">
                <span>¥</span>
                <div style="width: 400px; border-bottom: 1px solid black; padding: 0 20px;">
                  {{ infoData.receiptMoney }}
                </div>
              </div>
            </div>
            <div class="flex-row" style="width: 100%; padding: 20px 10px;">
              <span>系付</span>
              <div style="width: 900px; border-bottom: 1px solid black; padding: 0 20px;">
                {{ infoData.receiptTypeMeaning }}，{{ infoData.receiptDesc }}
              </div>
            </div>
            <div
              style="
                position: absolute;
                right: 10px;
                width: 20px;
                margin: 0 auto;
                line-height: 24px;
                top: 50%;
                transform: translateY(-50%);
              "
            >
              记账联
            </div>
          </div>
          <div class="flex-row-space-around" style="font-size: 18px; padding: 0px 30px;">
            <div>单位公章：</div>
            <div>复核人：</div>
            <div>收款人：</div>
            <div>制单：李</div>
          </div>
        </div>
      </div>
    </div>
  </a-card>
</template>

<script>
import { toCanvas } from '@/utils/util'
import { getFinReceiptOrderDetail } from '@/api/api'

export default {
  name: 'ReceiptPrint',
  data() {
    return {
      icon: [require('@/assets/icons/u692.png')],
      infoData: {},
    }
  },
  mounted() {
    if (this.$route.query.receiptNo) {
      getFinReceiptOrderDetail(this.$route.query.receiptNo).then((res) => {
        if (['TO_PAY', 'NOT_TRANSFER', 'TRANSFERRED'].includes(res.receiptStatus)) {
          this.infoData = res
          setTimeout(() => {
            toCanvas('print-box', 'receipt', 1)
            toCanvas('print-box2', 'receipt2', 1)
          }, 0)
        }
      })
    }
  },
  methods: {
    print() {
      window.open(`/print?receiptNo=${this.$route.query.receiptNo}`)
    },
  },
}
</script>

<style scoped></style>
