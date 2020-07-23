<template>
  <b-container class="my-3">

    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>

    <b-button-toolbar justify aria-label="Toolbar with button groups and dropdown menu">
      <b-button-group class="mx-1">
        <b-button variant="outline-primary" @click="isEditMode = !isEditMode">
          {{isEditMode ? 'Preview' : 'Edit'}}
        </b-button>
        <b-button @click="save()" v-if="isEditMode" variant="primary">Save</b-button>
        <b-button
          v-if="!isNew"
          :disabled="invoice.status === 'pending'"
          @click="changeStatus('pending')"
          variant="success">
          Publish
        </b-button>
      </b-button-group>

      <b-button-group v-if="!isNew" class="mx-1">
        <b-button @click="changeStatus('archived')" variant="outline-danger">Archive</b-button>
      </b-button-group>
    </b-button-toolbar>

    <b-card class="invoice__card mt-3">

      <template v-if="isEditMode">
        <b-container>
          <b-row>

            <b-col>
              <b-container>
                <b-input-group prepend="From">
                  <b-input placeholder="John Doe" type="text" v-model="invoice.from"/>
                </b-input-group>
                <b-input-group class="mt-2" prepend="To">
                  <b-input placeholder="Pepito Perez" type="text" v-model="invoice.to"/>
                </b-input-group>
                <b-input-group class="mt-2" prepend="Notes">
                  <b-textarea
                    placeholder="How to pay it, where to send checks, etc..."
                    v-model="invoice.notes"/>
                </b-input-group>
              </b-container>
            </b-col>

            <b-col>
              <b-container>
                <b-row class="justify-content-end">
                  <b-input-group class="col-6">
                    <b-input placeholder="INVOICE" type="text" v-model="invoice.title"/>
                  </b-input-group>
                </b-row>
                <b-row class="justify-content-end mt-2">
                  <b-input-group prepend="#" class="col-6">
                    <b-input placeholder="001" type="text" v-model="invoice.number"/>
                  </b-input-group>
                </b-row>
                <b-row class="justify-content-end mt-4">
                  <b-input-group class="col-auto">
                    <b-datepicker placeholder="Invoice date" type="text" v-model="invoice.date"/>
                  </b-input-group>
                </b-row>
                <b-row class="justify-content-end mt-2">
                  <b-input-group class="col-auto">
                    <b-datepicker placeholder="Due date" type="text" v-model="invoice.dueDate"/>
                  </b-input-group>
                </b-row>
              </b-container>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple class="mt-5 col-12" small responsive="sm" striped hover>
              <b-thead head-variant="dark">
                <b-tr>
                  <b-th>Description</b-th>
                  <b-th>Quantity</b-th>
                  <b-th>Rate</b-th>
                  <b-th>Total</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-for="invoiceItem of invoice.items" :key="invoiceItem.id">
                  <b-td>
                    <b-input-group>
                      <b-input v-model="invoiceItem.description" type="text"/>
                    </b-input-group>
                  </b-td>
                  <b-td>
                    <b-input-group>
                      <b-input
                        @change="invoiceItem.total = invoiceItem.quantity * invoiceItem.rate"
                        placeholder="0" v-model="invoiceItem.quantity"/>
                    </b-input-group>
                  </b-td>
                  <b-td>
                    <b-input-group prepend="$">
                      <b-input
                        @change="invoiceItem.total = invoiceItem.quantity * invoiceItem.rate"
                        placeholder="0" v-model="invoiceItem.rate"/>
                    </b-input-group>
                  </b-td>
                  <b-td>
                    <b-input-group prepend="$">
                      <b-input :value="invoiceItem.total"
                               disabled/>
                    </b-input-group>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
            <b-button
              block
              @click="addInvoiceItem()"
              variant="outline-primary">
              Add row
            </b-button>
          </b-row>
          <b-row class="justify-content-end">
            <b-card-title class="col-auto mt-5">Total: $ {{invoiceTotal}}</b-card-title>
          </b-row>
        </b-container>
      </template>

      <template v-if="!isEditMode">
        <b-container>
          <b-row>
            <b-col class="text-left">
              <b-card-title>From {{invoice.from}}</b-card-title>
              <b-card-sub-title>To {{invoice.to}}</b-card-sub-title>

              <div class="mt-4">
                <b>Notes</b>
                <p>{{invoice.notes}}</p>
              </div>
            </b-col>
            <b-col class="text-right">
              <b-card-title>{{invoice.title}}</b-card-title>
              <b-card-sub-title>#{{invoice.number}}</b-card-sub-title>
              <b-card-sub-title class="mt-4">
                <b>Invoice date:</b>
                <span class="ml-2">{{invoice.date}}</span>
              </b-card-sub-title>
              <b-card-sub-title class="mt-1">
                <b>Due date:</b>
                <span class="ml-2">{{invoice.dueDate}}</span>
              </b-card-sub-title>
            </b-col>
          </b-row>
        </b-container>

        <b-table v-if="invoiceItems.length" class="mt-5" small responsive="sm" striped hover
                 :items="invoiceItems"
                 :fields="fields">
          <template v-slot:cell(index)="data">
            {{ data.index + 1 }}
          </template>
        </b-table>
        <b-card-title class="text-right mt-5">Total ${{invoiceTotal}}</b-card-title>
      </template>

    </b-card>
  </b-container>
</template>

<script>

const defaultBreadcrumb = [
  {
    text: 'Home',
    href: '/#/',
  },
  {
    text: 'Invoices',
    href: '/#/invoices',
  },
];

export default {
  name: 'Invoice',
  data() {
    return {
      invoice: {
        title: 'INVOICE',
        number: '001',
        notes: '',
        date: new Date(),
        dueDate: new Date(),
        from: '',
        to: '',
        items: [
          {
            id: Math.random(),
            quantity: 0,
            rate: 0,
            total: 0,
          },
        ],
      },
      fields: [
        {
          key: 'index',
          label: 'Row',
        },
        {
          key: 'description',
          label: 'Description',
        },
        {
          key: 'quantity',
          label: 'Quantity',
        },
        {
          key: 'rate',
          label: 'Rate',
          formatter(value) {
            return `$ ${value}`;
          },
        },
        {
          key: 'total',
          label: 'Total',
          formatter(value) {
            return `$ ${value}`;
          },
        },
      ],
      breadcrumb: [
        ...defaultBreadcrumb,
      ],
      isEditMode: false,
      isNew: false,
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    invoiceItems() {
      if (!this.invoice?.items) {
        return [];
      }
      return this.invoice.items.map((item) => ({
        ...item,
        total: (item.quantity * item.rate) || 0,
      }));
    },
    invoiceTotal() {
      return this.invoiceItems.reduce((sum, { total }) => total + sum, 0) || 0;
    },
  },
  watch: {
    $route(newRoute, old) {
      if (newRoute.path !== old.path) {
        this.init();
      }
    },
  },
  methods: {
    init() {
      this.breadcrumb = [...defaultBreadcrumb];
      this.isNew = false;
      const { params: { id: paramID } } = this.$route;
      if (!paramID) {
        [this.isNew, this.isEditMode] = [true, true];
        this.breadcrumb = [
          ...this.breadcrumb,
          {
            text: 'New invoice',
            active: true,
          },
        ];
        return;
      }
      [this.invoice] = this.$store.state.invoices.filter(({ id }) => +paramID === id);
      const { query: { editMode } } = this.$route;
      this.isEditMode = editMode;
      if (this.isEditMode) {
        this.breadcrumb = [
          ...this.breadcrumb,
          {
            text: `#${this.invoice.number} - ${this.invoice.title}`,
            href: `/#/invoice/${this.invoice.id}`,
            active: false,
          },
          {
            text: 'Edit',
            active: true,
          },
        ];
      } else {
        this.breadcrumb = [
          ...this.breadcrumb,
          {
            text: `#${this.invoice.number} - ${this.invoice.title}`,
            active: true,
          },
        ];
      }
    },
    changeStatus(newStatus, save = true) {
      this.invoice.status = newStatus;
      if (save) {
        this.save(false);
      }
    },
    async save(changeStatus = true) {
      if (changeStatus) {
        this.changeStatus('draft', false);
      }
      if (this.isNew) {
        const id = Math.random() * 1e7;
        await this.$store.dispatch('AddInvoice', {
          ...this.invoice,
          id,
        });
        await this.$router.push(`/invoice/${id}?editMode=true`);
        this.init();
      } else {
        this.$store.dispatch('UpdateInvoice', this.invoice);
      }
    },
    addInvoiceItem() {
      this.invoice = {
        ...this.invoice,
        items: [
          ...this.invoice.items,
          {
            id: Math.random(),
            quantity: 0,
            rate: 0,
            total: 0,
          },
        ],
      };
      this.invoice.status = 'draft';
    },
  },
};
</script>

<style scoped lang="scss">
  .invoice__card {
    min-height: 90vh;
  }
</style>
