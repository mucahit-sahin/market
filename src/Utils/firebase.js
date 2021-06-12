import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const signOut = () => {
  auth().signOut();
};

export const getFirestore = async (collection, doc) => {
  let ref = await firestore().collection(collection).doc(doc).get();
  return ref.data();
};

export const getStorage = async address => {
  let url = await storage().ref(address).getDownloadURL();
  return url;
};
