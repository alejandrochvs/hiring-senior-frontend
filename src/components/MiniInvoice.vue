<template>
  <b-card
    style="max-width: 20rem;"
    class="mb-3"
  >
    <b-card-title class="text-right one-liner">{{invoice.title || '---'}}</b-card-title>
    <b-card-sub-title class="text-right one-liner">#{{invoice.number || '---'}}</b-card-sub-title>
    <b-card-text class="text-left line-clamp mt-2 mb-4">
      {{invoice.notes || '----'}}
    </b-card-text>

    <b-button-group size="sm">
      <b-button
        class="mini-invoice__pay-btn"
        v-if="invoice.status !== 'paid' && invoice.status !== 'draft'"
        @click="$router.push(`/invoice/${invoice.id}`)"
        :variant="highlight === 'late' ? 'success' : 'outline-success'">
        Pay
      </b-button>
      <b-button
        @click="$router.push(`/invoice/${invoice.id}`)"
        :variant="highlight === 'pending' ? 'primary' : 'outline-primary'">
        View
      </b-button>
      <b-button
        @click="$router.push(`/invoice/${invoice.id}?editMode=true`)"
        :variant="highlight === 'draft' ? 'primary' : 'outline-primary'">
        Edit
      </b-button>
    </b-button-group>
  </b-card>
</template>

<script>
export default {
  name: 'MiniInvoice',
  props: {
    invoice: {
      type: Object,
      default: () => ({}),
    },
    highlight: {
      type: String,
      default: 'draft',
    },
  },
  computed: {},
};
</script>

<style scoped lang="scss">
  .one-liner {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .line-clamp {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
