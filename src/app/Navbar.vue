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
          <a href="#" class="button is-primary is-rounded">
            {{ $t('navbar.buttons.singUp') }}
          </a>

          <a href="#" class="button is-light is-rounded">
            {{ $t('navbar.buttons.logIn') }}
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
