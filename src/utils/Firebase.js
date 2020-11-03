import firestore from '@react-native-firebase/firestore';
import axios from 'axios';

export const addPlayCount = async (id) => {
  const songReference = firestore().collection('songs').doc(id);

  return firestore().runTransaction(async (transaction) => {
    const songSnapshot = await transaction.get(songReference);

    if (!songSnapshot) {
      throw 'Song does not exist!';
    }

    await transaction.update(songReference, {
      playCount: songSnapshot.data().playCount + 1,
    });
  });
};

export const uploadDataToStorage = async (collection, engineName, callback) => {
  let documentsData = [];

  await firestore()
    .collection(collection)
    .get()
    .then((documents) => {
      documents.forEach((document) => {
        if (document.exists) {
          switch (collection) {
            case 'songs':
              const audio = {
                artist: document.data().artist,
                artwork: document.data().artwork,
                duration: document.data().duration,
                id: document.data().id,
                title: document.data().title,
              };
              documentsData.push(audio);
              break;
            case 'videos':
              const video = {
                artist: document.data().artist,
                poster: document.data().poster,
                duration: document.data().duration,
                id: document.data().id,
                title: document.data().title,
              };
              documentsData.push(video);
              break;
            case 'playlists':
              const playlist = {
                author: document.data().author,
                duration: document.data().duration,
                id: document.data().id,
                title: document.data().title,
                image: document.data().image,
              };

              documentsData.push(playlist);
              break;
            case 'artists':
              const artists = {
                firstname: document.data().firstName,
                lastname: document.data().lastName,
                image: document.data().imgUrl,
                followercount: document.data().followerCount,
              };
              documentsData.push(artists);
              break;
            case 'albums':
              const albums = {
                author: document.data().author,
                duration: document.data().duration,
                image: document.data().imgUrl,
                songcount: document.data().songCount,
                title: document.data().title,
              };
              documentsData.push(albums);
              break;
            default:
              break;
          }
        }
      });
    });

  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer private-s18ijwj2r5ccjkfczo7awhhh',
  };

  axios
    .post(
      `https://host-vgzu6u.api.swiftype.com/api/as/v1/engines/${engineName}/documents`,
      documentsData,
      {
        headers: headers,
      },
    )
    .then((response) => {
      // console.log('----------- RESPONSE------------- ', response);
    })
    .catch((error) => {
      console.log('-----POST ERROR------', engineName, ':', error);
    });
};

export const getSearchData = async (searchValue, engineName, callback) => {
  axios
    .get(
      `https://host-vgzu6u.api.swiftype.com/api/as/v1/engines/${engineName}/search?query=${searchValue}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer private-s18ijwj2r5ccjkfczo7awhhh',
        },
      },
    )
    .then((response) => callback(response.data))
    .catch((err) => console.log(err));
};

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

export const getQueriedCollections = (
  collection,
  field,
  query,
  value,
  callback,
) => {
  let data = [];
  firestore()
    .collection(collection)
    .where(field, query, value)
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

export const getPlaylists = (uid, callback) => {
  let data = [];
  firestore()
    .collection('users')
    .doc(uid)
    .collection('playlists')
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

export const getDocument = (collection, id, callback) => {
  firestore()
    .collection(collection)
    .doc(id)
    .get()
    .then((document) => {
      if (document.exists) {
        callback(document.data());
      }
    });
};

export const getUserSubCollections = (uid, subCollectionId, callback) => {
  let data = [];
  firestore()
    .collection('users')
    .doc(uid)
    .collection(subCollectionId)
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
