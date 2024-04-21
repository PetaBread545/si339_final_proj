import firebase from "firebase/app"
import "firebase/firestore"

var firebaseConfig = 'yourFirebaseConfig'

firebase.initializeApp(firebaseConfig)

export const firestore = firebase.firestore()

export default firebase

