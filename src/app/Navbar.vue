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

    <template slot="end">
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
            {{ $t('navbar.button.logIn') }}
          </router-link>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
