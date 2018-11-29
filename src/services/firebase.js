import firebase from  'firebase';
import 'firebase/firestore';

var config = {
    apiKey: "AIzaSyC3oNMh7YO4i660GlOJg38j-scJOnZy0oY",
    authDomain: "hack-firebase-ce083.firebaseapp.com",
    databaseURL: "https://hack-firebase-ce083.firebaseio.com",
    projectId: "hack-firebase-ce083",
    storageBucket: "hack-firebase-ce083.appspot.com",
    messagingSenderId: "871479055115"
  };
  firebase.initializeApp(config);

  const db = firebase.firestore();

  export const loginWithGmail = () => {
      const provider = new firebase.auth.GoogleAuthProvider();

      return firebase.auth().signInWithPopup(provider)
      .then((snap) => {
        createOrGetUser(snap.user);
        return snap.user;
      }).catch( error => console.error(error));
  }

  const createOrGetUser = profile => {
      db.collection('users').doc(profile.uid).get().then( snap => {
          console.log('craeteOrGetUSer');
        if(snap.exists){
            return getUser(snap.data());
        }else{
            return CreateUser(profile);
        }
       
      }).catch( error => console.error(error));
      
  }

  const getUser = user => {
      return user;
  }

  const CreateUser = (profile) =>{
      console.log('crea usuario');
      const user = {
          uid :profile.uid,
          displayName: profile.displayName,
          email : profile.email,
          photoURL : profile.photoURL
      }
      return db
      .collection('users')
      .doc(user.uid)
      .set(user)
      .then( r => r)
      .catch( error => console.error(error));;
  }

  export default firebase;