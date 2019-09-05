<template>
  <b-navbar
    type="has-background-secondary"
    v-bind:fixed-top="true">
    <template slot="brand">
      <b-navbar-item
        tag="router-link"
        v-bind:to="{ name: 'home' }">
        TellYou
      </b-navbar-item>
    </template>

    <template slot="end" v-if="this.$store.state.user.isLoggedIn">
      <b-navbar-dropdown v-bind:label="this.$store.state.user.displayName">
        <a
          class="navbar-item"
          v-on:click="signOut">
          {{ $t('navbar.singOut') }}
        </a>
      </b-navbar-dropdown>
    </template>

    <template slot="end" v-else>
      <b-navbar-item tag="div">
        <div class="buttons">
          <router-link
            class="button is-primary is-rounded"
            v-bind:to="{ name: 'singUp' }">
            {{ $t('navbar.button.singUp') }}
          </router-link>

          <router-link
            class="button is-light is-rounded"
            v-bind:to="{ name: 'singIn' }">
            {{ $t('navbar.button.singIn') }}
          </router-link>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    async signOut () {
      try {
        await this.$store.dispatch('user/singOut')
      } catch (error) {
        this.$buefy.toast.open({
          duration: 5000,
          message: error.message,
          type: 'is-danger'
        })
      }
    }
  }
}
</script>
