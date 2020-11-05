import firestore from '@react-native-firebase/firestore';

export class UserPlaylist {
  constructor(updatedAt, duration, id, image, isPrivate, songs, title) {
    this.createdAt = +new Date();
    this.updatedAt = updatedAt || +new Date();
    this.duration = duration || '0H';
    this.id = id || '';
    this.image = image || '';
    this.isPrivate = isPrivate || false;
    this.songs = songs || [];
    this.title = title || '';
  }
}

export const userPlaylistConverter = {
  toFirestore: (playlist) => {
    return {
      createdAt: playlist.createdAt,
      updatedAt: playlist.updatedAt,
      duration: playlist.duration,
      id: playlist.id,
      image: playlist.image,
      isPrivate: playlist.isPrivate,
      songs: playlist.songs,
      title: playlist.title,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new UserPlaylist(
      data.createdAt,
      data.updatedAt,
      data.duration,
      data.id,
      data.image,
      data.isPrivate,
      data.songs,
      data.title,
    );
  },
};
