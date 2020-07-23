<template>
  <div class="invoices__list">
    <b-container v-if="invoices.length" class="pt-3">
      <b-row class="mb-3">
        <b-input-group>
          <template v-slot:prepend>
            <b-input-group-text>
              <b-icon-search/>
              <span class="ml-3">Search</span>
            </b-input-group-text>
          </template>
          <b-form-input
            type="search"
            placeholder="Filter by title or notes"
            v-model="query"
          ></b-form-input>
        </b-input-group>
        <b-input-group class="mt-3" prepend="Status">
          <b-form-select placeholder="Paid" v-model="status" :options="statuses"></b-form-select>
        </b-input-group>
      </b-row>
      <b-row class="justify-content-center">
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
        ></b-pagination>
      </b-row>
      <b-row>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3"
             v-for="invoice of paginatedInvoices"
             v-bind:key="invoice.id">
          <MiniInvoice highlight="view" :invoice="invoice"/>
        </div>
      </b-row>
      <b-row class="justify-content-center">
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
        ></b-pagination>
      </b-row>
    </b-container>
    <b-container v-if="!invoices.length">
      <b-card class="my-5 p-5">
        <b-card-title>No invoices, let's create a new invoice</b-card-title>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import { BIconSearch } from 'bootstrap-vue';
import MiniInvoice from '../components/MiniInvoice.vue';

export default {
  name: 'Invoices',
  components: {
    MiniInvoice,
    BIconSearch,
  },
  data() {
    return {
      currentPage: 1,
      perPage: 12,
      query: '',
      status: '',
      statuses: [
        {
          value: '',
          text: 'Clear selection',
        },
        {
          value: 'late',
          text: 'Late',
        },
        {
          value: 'pending',
          text: 'Pending',
        },
        {
          value: 'paid',
          text: 'Paid',
        },
        {
          value: 'draft',
          text: 'Draft',
        },
      ],
    };
  },
  mounted() {
    const { query: { status, query } } = this.$route;
    this.status = status || this.status || '';
    this.query = query || this.query || '';
  },
  computed: {
    invoices() {
      return this.$store.state.invoices;
    },
    filteredInvoices() {
      return this.invoices
        .filter(({ status }) => (this.status ? status === this.status : true))
        .filter(({ title, notes }) => title.includes(this.query) || notes.includes(this.query));
    },
    rows() {
      return this.filteredInvoices.length;
    },
    paginatedInvoices() {
      return this.filteredInvoices.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage,
      );
    },
  },
};
</script>

<style scoped lang="scss">
  .invoices__list {
    min-height: 80vh;
  }
</style>
