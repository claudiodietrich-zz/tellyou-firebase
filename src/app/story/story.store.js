import { firestoreAction } from 'vuexfire'
import { db } from '@/libs/firebase'

export default {
  namespaced: true,
  state: {
    story: { }
  },
  mutations: {

  },
  actions: {
    bindStory: firestoreAction(async ({ bindFirestoreRef }, { id }) => {
      await bindFirestoreRef('story', db.collection('stories').doc(id))
    })
  }
}
