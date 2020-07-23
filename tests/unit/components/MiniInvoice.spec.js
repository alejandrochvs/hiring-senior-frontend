import { shallowMount, createLocalVue } from '@vue/test-utils';
import MiniInvoice from '@/components/MiniInvoice.vue';
import { BootstrapVue } from 'bootstrap-vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('MiniInvoice.vue', () => {
  it('renders pay button when status is late', () => {
    const invoice = {
      id: 5,
      status: 'late',
      title: 'Hello world',
      number: '136',
      notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      from: 'Alejandro Chaves',
      to: 'Maria Ochoa',
      date: new Date(),
      dueDate: new Date(),
      items: [
        {
          description: 'Short description',
          quantity: 2,
          rate: 10,
        },
        {
          description: 'Short description 2',
          quantity: 30,
          rate: 20,
        },
      ],
      total: 620,
    };
    const wrapper = shallowMount(MiniInvoice, {
      propsData: {
        invoice,
        highlight: 'late',
      },
      localVue,
    });
    expect(wrapper.find('.mini-invoice__pay-btn'))
      .toBeDefined();
  });
});
