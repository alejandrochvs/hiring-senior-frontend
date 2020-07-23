import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/invoices',
    name: 'Invoices',
    component: () => import(/* webpackChunkName: "invoices" */ '../views/Invoices.vue'),
  },
  {
    path: '/new-invoice',
    name: 'NewInvoice',
    component: () => import(/* webpackChunkName: "invoice" */ '../views/Invoice.vue'),
  },
  {
    path: '/invoice/:id',
    name: 'Invoice',
    component: () => import(/* webpackChunkName: "invoice" */ '../views/Invoice.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
