import firestore from '@react-native-firebase/firestore';

const videos = [
  {
    id: 'drake-emotionless',
    title: 'Emotionless',
    artist: 'Drake',
    description: 'Music Video of Emotionless by Drake',
    artistId: 'aubrey-drake-graham',
    poster:
      'https://firebasestorage.googleapis.com/v0/b/musicapp-956bc.appspot.com/o/videos%2Fdrake-emotionless%2Fdrake-scorpion-video-art.jpg?alt=media&token=b49801ed-ef19-4b4b-9137-2f59257591e9',
    albumId: 'drake-scorpion',
    fileUrl:
      'https://firebasestorage.googleapis.com/v0/b/musicapp-956bc.appspot.com/o/videos%2Fdrake-emotionless%2FEmotionless%20(Drake).mp4?alt=media&token=832c68e6-a1cb-411f-87f3-fa72bd6c8e07',
    likesCount: 25,
    isActive: true,
    createdAt: firestore.FieldValue.serverTimestamp(),
    updatedAt: firestore.FieldValue.serverTimestamp(),
    genreId: 'hip-hop',
  },
  {
    id: 'drake-nonstop',
    title: 'Nonstop',
    artist: 'Drake',
    description: 'Music Video of Nonstop by Drake',
    artistId: 'aubrey-drake-graham',
    poster:
      'https://firebasestorage.googleapis.com/v0/b/musicapp-956bc.appspot.com/o/videos%2Fdrake-nonstop%2Fdrake-nonstop-video-art.jpg?alt=media&token=e60a9833-5a53-4145-9e1f-7a569cbba292',
    albumId: 'drake-scorpion',
    fileUrl:
      'https://firebasestorage.googleapis.com/v0/b/musicapp-956bc.appspot.com/o/videos%2Fdrake-nonstop%2FNonstop%20(Drake).mp4?alt=media&token=d24837ed-c914-4302-a5f5-0993da20c4b3',
    likesCount: 60,
    isActive: true,
    createdAt: firestore.FieldValue.serverTimestamp(),
    updatedAt: firestore.FieldValue.serverTimestamp(),
    genreId: 'hip-hop',
  },
  {
    id: 'kanye-west-amazing',
    title: 'Amazing',
    artist: 'Kanye West',
    description: 'Music Video of Amazing by Kanye West',
    artistId: 'kanye-west',
    poster:
      'https://firebasestorage.googleapis.com/v0/b/musicapp-956bc.appspot.com/o/videos%2Fkanye-west-amazing%2Fkanye-west-amazing-video-art.jpg?alt=media&token=b5d1a357-9432-4193-81c9-42b9244df7f5',
    albumId: 'drake-scorpion',
    fileUrl:
      'https://firebasestorage.googleapis.com/v0/b/musicapp-956bc.appspot.com/o/videos%2Fkanye-west-amazing%2FAmazing%20(Kanye%20West).mp4?alt=media&token=86977a40-bcdd-4eb8-a676-fd380156b9d4',
    likesCount: 43,
    isActive: true,
    createdAt: firestore.FieldValue.serverTimestamp(),
    updatedAt: firestore.FieldValue.serverTimestamp(),
    genreId: 'hip-hop',
  },
  {
    id: 'kanye-west-say-you-will',
    title: 'Say You Will',
    artist: 'Kanye West',
    description: 'Music Video of Say You Will by Kanye West',
    artistId: 'kanye-west',
    poster:
      'https://firebasestorage.googleapis.com/v0/b/musicapp-956bc.appspot.com/o/videos%2Fkanye-west-say-you-will%2Fkanye-west-say-you-will-video-art.png?alt=media&token=01cafbc7-ca75-4de4-93eb-f82199f07f68',
    albumId: 'drake-scorpion',
    fileUrl:
      'https://firebasestorage.googleapis.com/v0/b/musicapp-956bc.appspot.com/o/videos%2Fkanye-west-say-you-will%2FSay%20you%20will%20(Kanye%20West).mp4?alt=media&token=c1116602-8320-4fc7-8afd-9ce50e678c4c',
    likesCount: 12,
    isActive: true,
    createdAt: firestore.FieldValue.serverTimestamp(),
    updatedAt: firestore.FieldValue.serverTimestamp(),
    genreId: 'hip-hop',
  },
];

const Add = () => {
  videos.forEach((video) => {
    firestore().collection('videos').doc(video.id).set(video);
  });
};

export default Add;
