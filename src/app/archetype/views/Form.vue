<template>
  <section class="section">
    <div class="container">
      <h1 class="title">
        {{ $t('default.label.add', [ $tc('archetype.label', 1) ]) }}
      </h1>

      <div class="box">
        <b-field
          v-bind:label="$t('archetype.view.form.label.name')"
          v-bind:type="{ 'is-danger': $v.name.$error }"
          v-bind:message="[ !$v.name.required && $v.name.$error ? $t('error.field.is.required'):'']">
          <b-input
            v-model.trim="name"
            v-bind:disabled="isUnderRequest"/>
        </b-field>

        <b-field
          v-bind:label="$t('archetype.view.form.label.description')"
          v-bind:type="{ 'is-danger': $v.description.$error }"
          v-bind:message="[ !$v.description.required && $v.description.$error ? $t('error.field.is.required'):'']">
          <b-input
            v-model.trim="description"
            v-bind:disabled="isUnderRequest"
            type="textarea"/>
        </b-field>

        <b-field v-bind:label="$t('archetype.view.form.label.isRequired')">
          <b-switch
            v-model="isRequired"
            v-bind:disabled="isUnderRequest">
            {{ isRequired ? $t('archetype.view.form.label.required') : $t('archetype.view.form.label.optional') }}
          </b-switch>
        </b-field>

        <div class="has-text-centered">
          <b-button
            v-on:click="add"
            v-bind:loading="isUnderRequest"
            type="is-primary"
            rounded>
            {{ $t('default.label.add', [ $tc('archetype.label', 1) ]) }}
          </b-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import archetypeMixin from '@/app/archetype/archetype.mixin'

export default {
  mixins: [ archetypeMixin ],
  data () {
    return {
      name: '',
      description: '',
      isRequired: false
    }
  },
  validations: {
    name: {
      required
    },
    description: {
      required
    }
  },
  methods: {
    async add () {
      this.startRequest()

      try {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          await this.addArchetype({
            name: this.name,
            description: this.description,
            isRequired: this.isRequired
          })

          this.$router.push({ name: 'archetypeList' })
        }
      } catch (error) {
        this.errorHandler(error)
      }

      this.endRequest()
    }
  }
}
</script>
