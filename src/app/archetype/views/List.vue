<template>
  <section class="section">
    <b-loading
      v-bind:is-full-page="true"
      v-bind:active.sync="isUnderRequest"
      v-bind:can-cancel="false"/>

    <div class="container">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h1 class="title">
              {{ $tc('archetype.label', 2) }}
            </h1>
          </div>
        </div>

        <div class="level-right">
          <div class="level-item">
            <router-link class="button is-primary is-rounded"
              v-bind:to="{ name: 'archetypeCreate' }">
              {{ $t('default.label.add', [ $tc('archetype.label', 1) ]) }}
            </router-link>
          </div>
        </div>
      </div>

      <div class="card mb-4"
        v-for="archetype in archetypes"
        v-bind:key="archetype.id">
        <div class="card-header">
          <div class="card-header-title">
            {{ archetype.name }}
            <b-tag
              class="ml-2"
              v-bind:type="archetype.isRequired ? 'is-primary' : 'is-secondary'"
              rounded>
              {{ archetype.isRequired ? $t('archetype.view.form.label.required') : $t('archetype.view.form.label.optional') }}
            </b-tag>
          </div>
        </div>

        <div class="card-content">
          {{ archetype.description }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { db } from '@/libs/firebase'

export default {
  data () {
    return {
      archetypes: []
    }
  },
  methods: {
    async getArchetypes () {
      this.startRequest()

      try {
        await this.$bind('archetypes', db.collection('archetypes'))
      } catch (error) {
        throw error
      }

      this.endRequest()
    }
  },
  mounted () {
    try {
      this.getArchetypes()
    } catch (error) {
      this.erroHandler(error)
    }
  }
}
</script>
