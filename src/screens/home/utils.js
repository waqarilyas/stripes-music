import firestore from '@react-native-firebase/firestore';

const getCollection = (collection, callback) => {
  let data = [];
  firestore()
    .collection(collection)
    .limit(10)
    .get()
    .then((documents) => {
      documents.forEach((document) => {
        data.push(document.data());
      });
      callback(data);
    });
};

const getOrderedCollection = (collection, param, order, callback) => {
  let data = [];
  firestore()
    .collection(collection)
    .orderBy(param, order)
    .limit(10)
    .get()
    .then((documents) => {
      documents.forEach((document) => {
        data.push(document.data());
      });
      callback(data);
    });
};

export { getCollection, getOrderedCollection };
