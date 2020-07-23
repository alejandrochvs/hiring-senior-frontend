<template>
  <div>
    <b-jumbotron
      header="Your invoices"
      :lead="`You have ${invoiceCount} invoices in total.`"
    >
      <router-link to="/invoices">
        <b-button size="lg" variant="link">See all</b-button>
      </router-link>
      <div>or</div>
      <router-link to="/new-invoice">
        <b-button size="lg" class="mt-3" variant="primary">
          <span class="mr-3">Create a new invoice</span>
          <b-icon-plus-square-fill/>
        </b-button>
      </router-link>
    </b-jumbotron>

    <div class="container-fluid">
      <div class="row">
        <FeaturedInvoices
          highlight="late"
          titleColor="danger"
          title="Late invoices"
          :invoices="lateInvoices"/>

        <FeaturedInvoices title="Draft invoices" :invoices="draftInvoices"/>
      </div>
    </div>
  </div>
</template>

<script>
import { BIconPlusSquareFill } from 'bootstrap-vue';
import FeaturedInvoices from './FeaturedInvoices.vue';

export default {
  name: 'InvoiceSummary',
  components: {
    BIconPlusSquareFill,
    FeaturedInvoices,
  },
  computed: {
    invoices() {
      return this.$store.state.invoices;
    },
    invoiceCount() {
      return this.invoices.length;
    },
    lateInvoices() {
      return this.invoices.filter(({ status }) => status === 'late');
    },
    draftInvoices() {
      return this.invoices.filter(({ status }) => status === 'draft');
    },
  },
};
</script>

<style scoped type="scss"></style>
