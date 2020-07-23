<template>
  <div class="featured-invoice__container col-12 col-sm-6  mt-3">
    <b-overlay :show="invoices.length === 0" rounded="sm">

      <template v-slot:overlay>
        <div class="text-center">
          <h3>No invoices on this list.</h3>
        </div>
      </template>

      <h2 :class="`${titleColorClassName}`">{{title}}</h2>

      <div class="container mt-3">
        <div class="row justify-content-center">
          <div
            v-for="invoice in trimmedInvoices"
            v-bind:key="invoice.id"
            class="col-12 col-md-6 col-xl-4">
            <MiniInvoice :highlight="highlight" :invoice="invoice"/>
          </div>
        </div>
        <div class="row justify-content-center" v-if="invoicesOverflow.length">
          <b-button variant="outline-info" size="sm"
                    @click="$router.push(`/invoices?status=${highlight}`)">
            Show {{invoicesOverflow.length}} more...
          </b-button>
        </div>
      </div>
    </b-overlay>
  </div>

</template>

<script>
import MiniInvoice from './MiniInvoice.vue';

export default {
  name: 'FeaturedInvoices',
  props: {
    invoices: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    },
    titleColor: {
      type: String,
      default: '',
    },
    highlight: {
      type: String,
      default: 'draft',
    },
  },
  components: {
    MiniInvoice,
  },
  computed: {
    titleColorClassName() {
      return this.titleColor ? `text-${this.titleColor}` : '';
    },
    trimmedInvoices() {
      return this.invoices.slice(0, 3);
    },
    invoicesOverflow() {
      return this.invoices.slice(3);
    },
  },
};
</script>

<style scoped type="scss">
  .featured-invoice {
    &__container {
      background: red;
    }
  }
</style>
