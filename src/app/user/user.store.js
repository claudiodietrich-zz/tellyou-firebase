import * as firebase from 'firebase/app'
import { db } from '@/libs/firebase'

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
    async singUp (contex, { displayName, email, password }) {
      try {
        await contex.dispatch('createUserWithEmailAndPassword', { email, password })

        await contex.dispatch('updateProfile', { displayName })

        const user = firebase.auth().currentUser

        await db.collection('users').add({
          uid: user.uid,
          name: user.displayName,
          email: user.email
        })
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
