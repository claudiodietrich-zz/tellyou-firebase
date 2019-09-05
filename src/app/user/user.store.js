import * as firebase from 'firebase/app'

export default {
  namespaced: true,
  state: {
    uid: null,
    displayName: null,
    email: null,
    phoneNumber: null,
    photoURL: null,
    emailVerified: null,
    isLoggedIn: null
  },
  mutations: {
    updateProfile (state, { uid, displayName, email, phoneNumber, photoURL, emailVerified }) {
      state.uid = uid
      state.displayName = displayName
      state.email = email
      state.phoneNumber = phoneNumber
      state.photoURL = photoURL
      state.emailVerified = emailVerified
    },
    logIn (state) {
      state.isLoggedIn = true
    },
    logOut (state) {
      Object.keys(state).forEach((key) => { state[key] = null })
    }
  },
  actions: {
    startAuthenticationStateObserver (contex) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          contex.commit('updateProfile', user)
          contex.commit('logIn')
        } else {
          contex.commit('logOut')
        }
      })
    },
    async singUp (contex, { displayName, email, password }) {
      try {
        await contex.dispatch('createUserWithEmailAndPassword', { email, password })

        await contex.dispatch('updateProfile', { displayName })
      } catch (error) {
        throw error
      }
    },
    async createUserWithEmailAndPassword (contex, { email, password }) {
      try {
        // TODO: ver arquivo de referencia para tratamento de erros
        await firebase.auth().createUserWithEmailAndPassword(email, password)
      } catch (error) {
        throw error
      }
    },
    async signInWithEmailAndPassword (contex, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (error) {
        throw error
      }
    },
    async singOut (contex) {
      try {
        await firebase.auth().signOut()
      } catch (error) {
        throw error
      }
    },
    async updateProfile (contex, { displayName, photoUrl }) {
      try {
        const user = firebase.auth().currentUser

        // TODO: ver arquivo de referencia para tratamento de erros
        await user.updateProfile({ displayName, photoUrl })

        contex.commit('updateProfile', user)
      } catch (error) {
        throw error
      }
    }
  }
}
