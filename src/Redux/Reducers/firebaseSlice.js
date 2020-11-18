import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firestore, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { LOG } from '../../utils/Constants';

export const getSongs = createAsyncThunk('firebase/getSongs', async () => {
  let data = [];
  const path = firestore().collection('songs');
  const documents = await path.limit(6).get();
  documents.forEach((document) => {
    if (document.exists) {
      data.push(document.data());
    }
  });
  return data;
});

export const getAllSongs = createAsyncThunk(
  'firebase/getAllSongs',
  async () => {
    let data = [];
    const path = firestore().collection('songs');
    const documents = await path.get();
    documents.forEach((document) => {
      if (document.exists) {
        data.push(document.data());
      }
    });
    return data;
  },
);

export const getArtist = createAsyncThunk('firebase/getArtist', async (id) => {
  const path = firestore().collection('artists');
  const document = await path.doc(id).get();
  if (document.exists) {
    let response = document.data();
    response.createdAt = JSON.stringify(response.createdAt);
    response.updatedAt = JSON.stringify(response.updatedAt);
    return response;
  }
});

export const getMostPlayed = createAsyncThunk(
  'firebase/getMostPlayed',
  async () => {
    let data = [];
    const path = firestore().collection('songs');
    const documents = await path.orderBy('playCount', 'desc').limit(6).get();
    documents.forEach((document) => {
      if (document.exists) {
        data.push(document.data());
      }
    });
    return data;
  },
);

export const getMostPlayedSongs = createAsyncThunk(
  'firebase/getMostPlayedSongs',
  async () => {
    let data = [];
    const path = firestore().collection('songs');
    const documents = await path.orderBy('playCount', 'desc').get();
    documents.forEach((document) => {
      if (document.exists) {
        data.push(document.data());
      }
    });
    return data;
  },
);

export const getAlbums = createAsyncThunk('firebase/getAlbums', async () => {
  let data = [];
  const path = firestore().collection('albums');
  const documents = await path.limit(5).get();
  documents.forEach((document) => {
    if (document.exists) {
      data.push(document.data());
    }
  });
  return data;
});

export const getAllAlbums = createAsyncThunk(
  'firebase/getAllAlbums',
  async () => {
    let data = [];
    const path = firestore().collection('albums');
    const documents = await path.get();
    documents.forEach((document) => {
      if (document.exists) {
        data.push(document.data());
      }
    });
    return data;
  },
);

export const getAnAlbum = createAsyncThunk(
  'firebase/getAnAlbum',
  async (albumId) => {
    const path = firestore().collection('albums');
    const document = await path.doc(albumId).get();
    if (document.exists) {
      data.push(document.data());
    }
  },
);

export const getAlbumSongs = createAsyncThunk(
  'firebase/getAlbumSongs',
  async (albumId) => {
    let data = [];
    const path = firestore().collection('songs');
    const documents = await path.where('albumId', '==', albumId).get();
    documents.docs.forEach((document) => {
      if (document.exists) {
        const { title, artist, artwork, url, duration, id } = document.data();
        const temp = { title, artist, artwork, url, duration, id };
        data.push(temp);
      }
    });
    return data;
  },
);

export const getPlaylists = createAsyncThunk(
  'firebase/getPlaylists',
  async () => {
    let data = [];
    const path = firestore().collection('playlists');
    const documents = await path.limit(6).get();
    documents.forEach((document) => {
      console.log('-------Document-------', document);
      if (document.exists) {
        data.push(document.data());
      }
    });
    console.log('------------Playlist Data---------', data);
    return data;
  },
);

export const getAPlaylist = createAsyncThunk(
  'firebase/getAPlaylist',
  async (playlistId) => {
    const path = firestore().collection('playlists');
    const document = await path.doc(playlistId).get();
    if (document.exists) {
      data.push(document.data());
    }
  },
);

export const getAllPlaylists = createAsyncThunk(
  'firebase/getAllPlaylists',
  async () => {
    let data = [];
    const path = firestore().collection('playlists');
    const documents = await path.get();
    documents.forEach((document) => {
      if (document.exists) {
        data.push(document.data());
      }
    });
    return data;
  },
);

export const getArtistNews = createAsyncThunk(
  'firebase/getArtistNews',
  async (artistId) => {
    let data = [];
    const path = firestore().collection('news');
    const documents = await path.where('artistId', '==', artistId).get();
    documents.forEach((document) => {
      if (document.exists) {
        data.push(document.data());
      }
    });

    console.log('--------Data from firebase slice---------', data);
    return data;
  },
);

export const getArtistPopularSongs = createAsyncThunk(
  'firebase/getArtistPopularSongs',
  async (artistId) => {
    let data = [];
    const path = firestore().collection('songs');
    const documents = await path.where('artistId', '==', artistId).get();
    documents.forEach((document) => {
      if (document.exists) {
        data.push(document.data());
      }
    });
    return data;
  },
);

export const getUser = createAsyncThunk('firebase/getUser', async () => {
  const uid = auth().currentUser.uid;
  const path = firestore().collection('users');
  const document = await path.doc(uid).get();
  if (document.exists) {
    console.log(
      '--------------LOGGED IN USER OBJECT------------',
      document.data(),
    );
    return document.data();
  }
});

export const getArtistPlaylists = createAsyncThunk(
  'firebase/getArtistPlaylists',
  async (artistId) => {
    let data = [];
    const path = firestore().collection('playlists');
    const documents = await path.where('authorId', '==', artistId).get();
    documents.forEach((document) => {
      if (document.exists) {
        data.push(document.data());
      }
    });
    return data;
  },
);

export const getHistory = createAsyncThunk('firebase/getHistory', async () => {
  let data = [];
  const uid = auth().currentUser.uid;
  const path = firestore().collection('users').doc(uid).collection('history');
  const documents = await path.orderBy('createdAt', 'desc').limit(5).get();
  documents.forEach((document) => {
    if (document.exists) {
      data.push(document.data());
    }
  });
  return data;
});

export const getAllHistory = createAsyncThunk(
  'firebase/getAllHistory',
  async () => {
    let data = [];
    const uid = auth().currentUser.uid;
    const path = firestore().collection('users').doc(uid).collection('history');
    const documents = await path.orderBy('createdAt', 'desc').get();
    documents.forEach((document) => {
      if (document.exists) {
        data.push(document.data());
      }
    });
    return data;
  },
);

export const getTopArtists = createAsyncThunk(
  'firebase/getTopArtists',
  async () => {
    let data = [];
    const path = firestore().collection('artists');
    const documents = await path
      .orderBy('followerCount', 'desc')
      .limit(5)
      .get();
    documents.forEach((document) => {
      if (document.exists) {
        data.push(document.data());
      }
    });
    return data;
  },
);

export const getTopAllArtists = createAsyncThunk(
  'firebase/getTopAllArtists',
  async () => {
    let data = [];
    const path = firestore().collection('artists');
    const documents = await path.orderBy('followerCount', 'desc').get();
    documents.forEach((document) => {
      if (document.exists) {
        data.push(document.data());
      }
    });
    return data;
  },
);

export const removeFromFavorites = createAsyncThunk(
  'firebase/removeFromFavorites',
  async (id) => {
    const uid = auth().currentUser.uid;
    await firestore()
      .collection('users')
      .doc(uid)
      .collection('favArtists')
      .doc(id)
      .set(
        {
          isFavorite: false,
        },
        { merge: true },
      );
  },
);

export const getBestAlbums = createAsyncThunk(
  'firebase/getBestAlbums',
  async () => {
    let data = [];
    const path = firestore().collection('albums');
    const documents = await path.orderBy('viewCount', 'desc').limit(6).get();
    documents.forEach((document) => {
      if (document.exists) {
        data.push(document.data());
      }
    });
    return data;
  },
);

export const getAllBestAlbums = createAsyncThunk(
  'firebase/getAllBestAlbums',
  async () => {
    let data = [];
    const path = firestore().collection('albums');
    const documents = await path.orderBy('viewCount', 'desc').get();
    documents.forEach((document) => {
      if (document.exists) {
        data.push(document.data());
      }
    });
    return data;
  },
);

export const getVideos = createAsyncThunk('firebase/getVideos', async () => {
  let data = [];
  const path = firestore().collection('videos');
  const documents = await path.limit(6).get();
  documents.forEach((document) => {
    if (document.exists) {
      data.push(document.data());
    }
  });
  return data;
});

export const getPopularVideos = createAsyncThunk(
  'firebase/getPopularVideos',
  async () => {
    let data = [];
    const path = firestore().collection('videos');
    const documents = await path.orderBy('viewCount', 'desc').limit(6).get();
    documents.forEach((document) => {
      if (document.exists) {
        data.push(document.data());
      }
    });
    return data;
  },
);

export const getAllPopularVideos = createAsyncThunk(
  'firebase/getAllPopularVideos',
  async () => {
    let data = [];
    const path = firestore().collection('videos');
    const documents = await path.orderBy('viewCount', 'desc').get();
    documents.forEach((document) => {
      if (document.exists) {
        data.push(document.data());
      }
    });
    return data;
  },
);

export const getLatestVideos = createAsyncThunk(
  'firebase/getLatestVideos',
  async () => {
    let data = [];
    const path = firestore().collection('videos');
    const documents = await path.orderBy('createdAt', 'desc').limit(6).get();
    documents.forEach((document) => {
      if (document.exists) {
        data.push(document.data());
      }
    });
    return data;
  },
);

export const getAllLatestVideos = createAsyncThunk(
  'firebase/getAllLatestVideos',
  async () => {
    let data = [];
    const path = firestore().collection('videos');
    const documents = await path.orderBy('createdAt', 'desc').get();
    documents.forEach((document) => {
      if (document.exists) {
        data.push(document.data());
      }
    });
    return data;
  },
);

export const addToRecentlyPlayed = createAsyncThunk(
  'firebase/addToRecentlyPlayed',
  async (result) => {
    const uid = auth().currentUser.uid;
    await firestore()
      .collection('users')
      .doc(uid)
      .collection('history')
      .add(result);
  },
);

export const addPlayCount = createAsyncThunk(
  'firebase/addPlayCount',
  async (id) => {
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
  },
);

export const updateUser = createAsyncThunk('firebase/updateUser', (newData) => {
  firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .set(newData, {
      merge: true,
    })
    .then((res) => {
      console.log('------user------', res);
    });
});

export const addAlbumViewCount = createAsyncThunk(
  'firebase/addAlbumViewCount',
  async (id) => {
    const albumReference = firestore().collection('albums').doc(id);

    return firestore().runTransaction(async (transaction) => {
      const albumSnapshot = await transaction.get(albumReference);

      if (!albumReference) {
        throw 'Album does not exist';
      }

      await transaction.update(albumReference, {
        viewCount: albumSnapshot.data().viewCount + 1,
      });
    });
  },
);

export const addVideoViewCount = createAsyncThunk(
  'firebase/addAlbumViewCount',
  async (id) => {
    const videoReference = firestore().collection('videos').doc(id);

    return firestore().runTransaction(async (transaction) => {
      const videoSnapshot = await transaction.get(videoReference);

      if (!videoSnapshot) {
        throw 'Album does not exist';
      }

      await transaction.update(videoSnapshot, {
        viewCount: videoSnapshot.data().viewCount + 1,
      });
    });
  },
);

export const addAlbumPlayCount = createAsyncThunk(
  'firebase/addAlbumViewCount',
  async (id) => {
    const albumReference = firestore().collection('albums').doc(id);

    return firestore().runTransaction(async (transaction) => {
      const albumSnapshot = await transaction.get(albumReference);

      if (!albumReference) {
        throw 'Album does not exist';
      }

      await transaction.update(albumReference, {
        playCount: albumSnapshot.data().playCount + 1,
      });
    });
  },
);

export const getAllNews = createAsyncThunk('firebase/getAllNews', async () => {
  let data = [];
  const path = firestore().collection('news');
  const documents = await path.orderBy('createdAt', 'desc').get();
  documents.forEach((document) => {
    if (document.exists) {
      data.push(document.data());
    }
  });
  return data;
});

export const getNews = createAsyncThunk('firebase/getNews', async () => {
  let data = [];
  const path = firestore().collection('news');
  const documents = await path.orderBy('createdAt', 'desc').limit(5).get();
  documents.forEach((document) => {
    if (document.exists) {
      data.push(document.data());
    }
  });
  return data;
});

export const getANews = createAsyncThunk(
  'firebase/getANews',
  async (newsId) => {
    const path = firestore().collection('news');
    const document = await path.doc(newsId).get();
    if (document.exists) {
      return document.data();
    }
  },
);

const firebaseSlice = createSlice({
  name: 'firebase',
  initialState: {
    error: null,
    status: '',
    user: {},
    playlist: {},
    artist: {},
    artists: [],
    allTopArtists: [],
    album: {},
    albumSongs: [],
    songs: [],
    allSongs: [],
    history: [],
    allHistory: [],
    allAlbums: [],
    albums: [],
    mostPlayed: [],
    mostPlayedSongs: [],
    playlists: [],
    allPlaylists: [],
    artistNews: [],
    artistPopularSongs: [],
    artistPlaylists: [],
    favoriteSongList: [],
    bestAlbums: [],
    allBestAlbums: [],
    videos: [],
    popularVideos: [],
    allPopularVideos: [],
    latestVideos: [],
    allLatestVideos: [],
    favoriteArtists: [],
    allNews: [],
    limitedNews: [],
    news: {},
  },
  extraReducers: {
    // User data
    [getUser.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload;
    },

    [updateUser.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload;
    },

    // Songs Collections
    [getSongs.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.songs = action.payload;
    },

    // All Songs Collections
    [getAllSongs.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.allSongs = action.payload;
    },

    // Most Played Songs Collection
    [getMostPlayed.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.mostPlayed = action.payload;
    },

    // Most Played Songs Collection
    [getMostPlayedSongs.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.mostPlayedSongs = action.payload;
    },

    // Playlists Collection
    [getPlaylists.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.playlists = action.payload;
    },

    // A Playlist Document
    [getAPlaylist.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.playlist = action.payload;
    },

    // All Playlists Collection
    [getAllPlaylists.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.allPlaylists = action.payload;
    },

    // Limited Albums
    [getAlbums.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.albums = action.payload;
    },

    // All Albums
    [getAllAlbums.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.allAlbums = action.payload;
    },

    // An Album
    [getAnAlbum.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.album = action.payload;
    },

    // Album related Songs
    [getAlbumSongs.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.albumSongs = action.payload;
    },

    // Get Artist Document
    [getArtist.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.artist = action.payload;
    },

    // Get Artist News
    [getArtistNews.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.artistNews = action.payload;
    },

    // Get Artist Popular Songs
    [getArtistPopularSongs.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.artistPopularSongs = action.payload;
    },

    // Get Artist Popular Songs
    [getArtistPopularSongs.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.artistPopularSongs = action.payload;
    },

    // Get Artist Playlists
    [getArtistPlaylists.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.artistPlaylists = action.payload;
    },

    // Get user audio history
    [getHistory.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.history = action.payload;
    },

    // Get All user audio history
    [getAllHistory.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.allHistory = action.payload;
    },

    // Get top artists
    [getTopArtists.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.artists = action.payload;
    },

    // Get All top artists
    [getTopAllArtists.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.allTopArtists = action.payload;
    },

    // Get Best Playlists
    [getBestAlbums.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.bestAlbums = action.payload;
    },

    // Get All Best Playlists
    [getAllBestAlbums.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.allBestAlbums = action.payload;
    },

    // Get Videos
    [getVideos.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.videos = action.payload;
    },

    // Get Popular Video
    [getPopularVideos.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.popularVideos = action.payload;
    },

    // Get All Popular Video
    [getAllPopularVideos.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.allPopularVideos = action.payload;
    },

    // Get Latest Videos
    [getLatestVideos.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.latestVideos = action.payload;
    },

    // Get All News
    [getAllNews.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.allNews = action.payload;
    },

    [getANews.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.news = action.payload;
    },

    [getNews.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.limitedNews = action.payload;
    },
  },
});

export default firebaseSlice.reducer;
