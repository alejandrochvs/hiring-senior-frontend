import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    invoices: [],
    isLoadingInvoices: false,
  },
  mutations: {
    SET_INVOICES(state, invoices) {
      state.invoices = invoices;
    },
    UPDATE_INVOICE(state, invoiceToUpdate) {
      // eslint-disable-next-line
      state.invoices = state.invoices.map((invoice) => {
        return invoice.id === invoiceToUpdate.id ? invoiceToUpdate : invoice;
      });
    },
    ADD_INVOICE(state, newInvoice) {
      state.invoices = [
        ...state.invoices,
        newInvoice,
      ];
    },
    SET_LOADING_INVOICES(state, isLoading = !state.isLoadingInvoices) {
      state.isLoadingInvoices = isLoading;
    },
    FIND_LATE(state) {
      const today = new Date();
      state.invoices = state.invoices.map((invoice) => ({
        ...invoice,
        status: new Date(invoice.dueDate) < today ? 'late' : invoice.status,
      }));
    },
  },
  actions: {
    SetInvoices(context, invoices) {
      context.commit('SET_INVOICES', invoices);
    },
    AddInvoice(context, invoice) {
      context.commit('ADD_INVOICE', invoice);
      context.dispatch('SaveLocalInvoices');
    },
    UpdateInvoice(context, invoice) {
      context.commit('UPDATE_INVOICE', invoice);
      context.dispatch('SaveLocalInvoices');
    },
    SaveLocalInvoices(context) {
      context.commit('FIND_LATE');
      localStorage.setItem('invoices', JSON.stringify(context.state.invoices));
    },
    GetLocalInvoices(context) {
      const invoices = JSON.parse(localStorage.getItem('invoices'));
      context.commit('SET_INVOICES', invoices || []);
      context.commit('FIND_LATE');
    },
  },
});
