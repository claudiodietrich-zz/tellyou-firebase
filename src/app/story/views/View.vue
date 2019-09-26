<template>
  <section class="section">
    <div class="container">
      <h1 class="title">
        {{ story.title }}
      </h1>

      <div class="box">
        <h1 class="is-size-4 mb-4">
          {{ $tc('default.label.objective') }}
        </h1>

        <p>
          {{ story.objective }}
        </p>

        <h1 class="is-size-4 mt-4 mb-4">
          {{ $tc('default.label.stage', story.stages.length) }}
        </h1>

        <div class="timeline">
          <div
            class="timeline-item"
            v-for="(stage, index) in story.stages"
            v-bind:key="stage.id">
            <div
              class="timeline-marker is-32x32"
              v-bind:class="[ stage.events && stage.events.length === 0 ? 'is-danger' : 'is-primary']">
            </div>
            <b-tooltip
              v-bind:label="stage.description"
              position="is-right"
              animated
              multilined>
              <div class="timeline-content">
                <router-link
                  class="heading has-badge-rounded"
                  v-bind:to="{ name: 'storyStageView', params: { storyId: story.id, stageId: stage.id } }">
                  {{ `${index + 1} - ${stage.name}` }}
                </router-link>
              </div>
            </b-tooltip>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import store from '@/store'

export default {
  computed: {
    story () {
      return this.$store.state.story.story
    }
  },
  async beforeRouteEnter (to, from, next) {
    const id = to.params.id
    await store.dispatch('story/bindStory', { id })
    next()
  }
}
</script>

<style scoped>
.heading {
  font-size: 15px;
}
</style>
