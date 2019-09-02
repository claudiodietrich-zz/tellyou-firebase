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
            {{ $t('navbar.buttons.singUp') }}
          </router-link>

          <a href="#" class="button is-light is-rounded">
            {{ $t('navbar.buttons.logIn') }}
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
