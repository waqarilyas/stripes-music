import firestore from '@react-native-firebase/firestore';

export const getCollection = (collection, limit, callback) => {
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

export const getCollections = (collection, callback) => {
  let data = [];
  firestore()
    .collection(collection)
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

export const getOrderedCollection = (
  collection,
  param,
  order,
  limit,
  callback,
) => {
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

export const getOrderedCollections = (collection, param, order, callback) => {
  let data = [];
  firestore()
    .collection(collection)
    .orderBy(param, order)
    .get()
    .then((documents) => {
      documents.forEach((document) => {
        data.push(document.data());
      });
      callback(data);
    });
};

export const getQueriedCollection = (
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

export const getUserProfile = (uid, callback) => {
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

export const getDocument = (collection, id, callback) => {
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
