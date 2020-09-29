import firestore from '@react-native-firebase/firestore';

const getCollection = (collection, limit, callback) => {
  let data = [];
  firestore()
    .collection(collection)
    .limit(limit)
    .get()
    .then((documents) => {
      documents.forEach((document) => {
        if (document.exists) {
          data.push(document.data());
        }
      });
      callback(data);
    });
};

const getOrderedCollection = (collection, param, order, limit, callback) => {
  let data = [];
  firestore()
    .collection(collection)
    .orderBy(param, order)
    .limit(limit)
    .get()
    .then((documents) => {
      documents.forEach((document) => {
        data.push(document.data());
      });
      callback(data);
    });
};

const getQueriedCollection = (
  collection,
  field,
  query,
  value,
  limit,
  callback,
) => {
  let data = [];
  firestore()
    .collection(collection)
    .where(field, query, value)
    .limit(limit)
    .get()
    .then((documents) => {
      documents.forEach((document) => {
        if (document.exists) {
          data.push(document.data());
        }
      });
      callback(data);
    });
};

const getUserProfile = (uid, callback) => {
  firestore()
    .collection('users')
    .doc(uid)
    .get()
    .then((document) => {
      if (document.exists) {
        callback(document.data());
      }
    });
};

const getDocument = (collection, id, callback) => {
  firestore()
    .collection(collection)
    .doc(id)
    .get()
    .then((document) => {
      if (document.exists) {
        callback(document);
      }
    });
};

export {
  getCollection,
  getOrderedCollection,
  getUserProfile,
  getDocument,
  getQueriedCollection,
};
