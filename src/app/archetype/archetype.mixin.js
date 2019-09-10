import firebase from 'firebase/app'
const db = firebase.firestore()

export default {
  methods: {
    async addArchetype ({ name, description, isRequired }) {
      try {
        await db.collection('archetypes').add({
          name,
          description,
          isRequired
        })
      } catch (error) {
        throw error.message
      }
    }
  }
}
