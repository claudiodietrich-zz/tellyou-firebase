<template>
  <div id="app">
    <tellyou-navbar/>
    <router-view/>
  </div>
</template>

<script>
import TellyouNavbar from '@/app/Navbar.vue'

export default {
  components: {
    TellyouNavbar
  },
  created () {
    try {
      this.$store.dispatch('user/startAuthenticationStateObserver')
    } catch (error) {

    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/style";
</style>
