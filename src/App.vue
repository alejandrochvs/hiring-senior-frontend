<template>
  <div id="app">
    <b-navbar toggleable="lg" variant="light">
      <b-navbar-brand>
        <router-link to="/">
          <b-icon-app-indicator></b-icon-app-indicator>
          <span class="ml-2">Home</span>
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/invoices">
              <b-icon-files/>
              <span class="ml-1">Invoices</span>
            </router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <router-link to="/new-invoice">
            <b-button variant="primary">
              <span class="mr-2">Create a new invoice</span>
              <b-icon-plus-square-fill></b-icon-plus-square-fill>
            </b-button>
          </router-link>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import {
  BIconAppIndicator, BIconPlusSquareFill, BIconFiles,
} from 'bootstrap-vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Footer,
    BIconAppIndicator,
    BIconPlusSquareFill,
    BIconFiles,
  },
  mounted() {
    this.$store.dispatch('GetLocalInvoices');
  },
};

</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
