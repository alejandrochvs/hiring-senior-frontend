<template>
  <div class="pb-5">
    <invoice-summary/>
  </div>
</template>

<script>
// @ is an alias to /src
import InvoiceSummary from '@/components/InvoiceSummary.vue';

export default {
  name: 'Home',
  components: {
    InvoiceSummary,
  },
};
</script>
