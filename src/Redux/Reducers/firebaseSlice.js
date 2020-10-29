import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const getSongs = createAsyncThunk('firebase/getSongs', async () => {
  let data = [];
  const path = firestore().collection('songs');
  const documents = await path.limit(6).get();
  documents.forEach((document) => {
    if (document.exists) {
      let response = document.data();
      response.createdAt = JSON.stringify(response.createdAt);
      response.updatedAt = JSON.stringify(response.updatedAt);
      data.push(response);
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
        let response = document.data();
        response.createdAt = JSON.stringify(response.createdAt);
        response.updatedAt = JSON.stringify(response.updatedAt);
        data.push(response);
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
        let response = document.data();
        response.createdAt = JSON.stringify(response.createdAt);
        response.updatedAt = JSON.stringify(response.updatedAt);
        data.push(response);
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
        let response = document.data();
        response.createdAt = JSON.stringify(response.createdAt);
        response.updatedAt = JSON.stringify(response.updatedAt);
        data.push(response);
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
      let response = document.data();
      response.createdAt = JSON.stringify(response.createdAt);
      response.updatedAt = JSON.stringify(response.updatedAt);
      data.push(response);
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
        let response = document.data();
        response.createdAt = JSON.stringify(response.createdAt);
        response.updatedAt = JSON.stringify(response.updatedAt);
        data.push(response);
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
      let response = document.data();
      response.createdAt = JSON.stringify(response.createdAt);
      response.updatedAt = JSON.stringify(response.updatedAt);
      return response;
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
      if (document.exists) {
        let response = document.data();
        response.createdAt = JSON.stringify(response.createdAt);
        response.updatedAt = JSON.stringify(response.updatedAt);
        data.push(response);
      }
    });
    return data;
  },
);

export const getAPlaylist = createAsyncThunk(
  'firebase/getAPlaylist',
  async (playlistId) => {
    const path = firestore().collection('playlists');
    const document = await path.doc(playlistId).get();
    if (document.exists) {
      let response = document.data();
      response.createdAt = JSON.stringify(response.createdAt);
      response.updatedAt = JSON.stringify(response.updatedAt);
      return response;
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
        let response = document.data();
        response.createdAt = JSON.stringify(response.createdAt);
        response.updatedAt = JSON.stringify(response.updatedAt);
        data.push(response);
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
        let response = document.data();
        response.createdAt = JSON.stringify(response.createdAt);
        response.updatedAt = JSON.stringify(response.updatedAt);
        data.push(response);
      }
    });
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
        let response = document.data();
        response.createdAt = JSON.stringify(response.createdAt);
        response.updatedAt = JSON.stringify(response.updatedAt);
        data.push(response);
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
        let response = document.data();
        response.createdAt = JSON.stringify(response.createdAt);
        response.updatedAt = JSON.stringify(response.updatedAt);
        data.push(response);
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
      let response = document.data();
      response.createdAt = JSON.stringify(response.createdAt);
      data.push(response);
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
        let response = document.data();
        response.createdAt = JSON.stringify(response.createdAt);
        data.push(response);
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
        let response = document.data();
        response.createdAt = JSON.stringify(response.createdAt);
        response.updatedAt = JSON.stringify(response.updatedAt);
        data.push(response);
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
        let response = document.data();
        response.createdAt = JSON.stringify(response.createdAt);
        response.updatedAt = JSON.stringify(response.updatedAt);
        data.push(response);
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

export const getBestPlaylists = createAsyncThunk(
  'firebase/getBestPlaylists',
  async () => {
    let data = [];
    const path = firestore().collection('playlists');
    const documents = await path.orderBy('viewCount', 'desc').limit(6).get();
    documents.forEach((document) => {
      if (document.exists) {
        let response = document.data();
        response.createdAt = JSON.stringify(response.createdAt);
        response.updatedAt = JSON.stringify(response.updatedAt);
        data.push(response);
      }
    });
    return data;
  },
);

export const getAllBestPlaylists = createAsyncThunk(
  'firebase/getAllBestPlaylists',
  async () => {
    let data = [];
    const path = firestore().collection('playlists');
    const documents = await path.orderBy('viewCount', 'desc').get();
    documents.forEach((document) => {
      if (document.exists) {
        let response = document.data();
        response.createdAt = JSON.stringify(response.createdAt);
        response.updatedAt = JSON.stringify(response.updatedAt);
        data.push(response);
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
      let response = document.data();
      response.createdAt = JSON.stringify(response.createdAt);
      response.updatedAt = JSON.stringify(response.updatedAt);
      data.push(response);
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
        let response = document.data();
        response.createdAt = JSON.stringify(response.createdAt);
        response.updatedAt = JSON.stringify(response.updatedAt);
        data.push(response);
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
        let response = document.data();
        response.createdAt = JSON.stringify(response.createdAt);
        response.updatedAt = JSON.stringify(response.updatedAt);
        data.push(response);
      }
    });
    return data;
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
    bestPlaylists: [],
    allBestPlaylists: [],
    videos: [],
    popularVideos: [],
    allPopularVideos: [],
    latestVideos: [],
    allLatestVideos: [],
  },
  extraReducers: {
    // User data
    [getUser.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.songs = action.payload;
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
    [getBestPlaylists.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.bestPlaylists = action.payload;
    },

    // Get All Best Playlists
    [getAllBestPlaylists.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.allBestPlaylists = action.payload;
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

    // Get Latest Videos
    [getLatestVideos.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.latestVideos = action.payload;
    },
  },
});

export default firebaseSlice.reducer;
