<template>
  <section class="hero has-background-secondary is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column is-half is-offset-one-quarter">
            <h1 class="title is-size-3-mobile is-size-2-desktop is-spaced">
              {{ $t('home.views.singUp.title') }}
            </h1>

            <h2 class="subtitle is-size-4-mobile is-size-3-desktop">
              {{ $t('home.views.singUp.subtitle') }}
            </h2>
          </div>
        </div>

        <div class="columns">
          <div class="column is-half is-offset-one-quarter">
            <div class="box">
              <b-field
                v-bind:label="$t('home.views.singUp.form.label.name')"
                v-bind:type="{ 'is-danger': $v.name.$error }"
                v-bind:message="[ !$v.name.required && $v.name.$error ? $t('error.field.is.required'):'' ]">
                <b-input v-model.trim="name"/>
              </b-field>

              <b-field
                v-bind:label="$t('home.views.singUp.form.label.email')"
                v-bind:type="{ 'is-danger': $v.email.$error }"
                v-bind:message="[ !$v.email.required && $v.email.$error ? $t('error.field.is.required'):'',
                                  !$v.email.email && $v.email.$error ? $t('error.email.is.invalid'):'' ]">
                <b-input
                  v-model.trim="email"
                  type="email"/>
              </b-field>

              <b-field
                v-bind:label="$t('home.views.singUp.form.label.password')"
                v-bind:type="{ 'is-danger': $v.password.$error }"
                v-bind:message="[ !$v.password.required && $v.password.$error ? $t('error.field.is.required'):'',
                                  !$v.password.minLength && $v.password.$error ? $t('error.password.minLength', { minLength: 6 }):'' ]">
                <b-input
                v-model.trim="password"
                type="password"
                password-reveal/>
              </b-field>

              <div class="has-text-centered">
                <b-button
                  v-on:click="singUp"
                  type="is-primary"
                  rounded>
                  {{ $t('home.views.singUp.buttons.singUp') }}
                </b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  validations: {
    name: {
      required
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    singUp () {
      this.$v.$touch()
    }
  }
}
</script>
