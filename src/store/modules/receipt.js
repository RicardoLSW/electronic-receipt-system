const receipt = {
  state: {
    receiptIssuedForm: {},
  },

  mutations: {
    SET_RECEIPT_ISSUED_FORM: (state, receiptIssuedForm) => {
      state.receiptIssuedForm = receiptIssuedForm
    },
  },

  actions: {
    setReceiptIssuedForm({ commit }, receiptIssuedForm) {
      commit('SET_RECEIPT_ISSUED_FORM', receiptIssuedForm)
    },
  },
}

export default receipt
