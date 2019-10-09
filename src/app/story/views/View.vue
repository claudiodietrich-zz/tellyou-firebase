<template>
  <section class="section">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h1 class="title">
              {{ story.title }}
            </h1>
          </div>
        </div>

        <div class="level-right">
          <div class="level-item">
            <button
              class="button is-primary is-rounded"
              v-if="isLeader"
              v-on:click="goToNextHistoryStage">
              {{ buttonNextStageText }}
            </button>
          </div>
        </div>
      </div>

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
import firebase from 'firebase'
import storyEnums from '@/app/story/story.enum'
import { db } from '@/libs/firebase'

export default {
  data () {
    return {
      buttonNextStageText: '',
      story: {}
    }
  },
  computed: {
    isLeader () {
      const currentUser = firebase.auth().currentUser

      return this.story.leader.uid === currentUser.uid
    }
  },
  methods: {
    setButtonNextStageText () {
      const storyStatus = this.story.status

      switch (storyStatus) {
        case storyEnums.STATUS.underConstruction:
          this.buttonNextStageText = 'colocar história em revisão'
          break
        case storyEnums.STATUS.inReview:
          this.buttonNextStageText = 'definir história como revisada'
          break
        case storyEnums.STATUS.revised:
          this.buttonNextStageText = 'finalizar história'
          break
      }
    },
    async goToNextHistoryStage () {
      this.startRequest()
      const currentStatus = this.story.status
      const nextStatus = currentStatus + 1

      await db.collection('stories').doc(this.story.id).update({
        status: nextStatus
      })

      const events = await db.collection('stories').doc(this.story.id).collection('events').where('storyId', '==', this.story.id).where('storyStatus', '==', currentStatus).get()

      events.forEach(async event => {
        let newEvent = event.data()
        newEvent.storyStatus = this.story.status

        await db.collection('stories').doc(this.story.id).collection('events').add(newEvent)
      })
      this.endRequest()
    }
  },
  async beforeMount () {
    db.collection('stories')
      .doc(this.$route.params.id)
      .get()
      .then(doc => {
        this.story = doc.data()
        this.story.id = doc.id
      })
      .then(() => {
        this.setButtonNextStageText()
      })
  }
}
</script>

<style scoped>
.heading {
  font-size: 15px;
}
</style>
