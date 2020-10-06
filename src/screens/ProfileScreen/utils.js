import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const history = [
  {
    albumId: 'drake-scorpion',
    artistId: 'aubrey-drake-garaham',
    artist: 'Drake',
    arts: [
      'https://firebasestorage.googleapis.com/v0/b/musicapp-956bc.appspot.com/o/songs%2Fdrake-scorpion%2Fdrake-scorpion-album-art.jpg?alt=media&token=2e81ecbe-2757-4f68-bee5-e3479b48c9d9',
    ],
    createdAt: firestore.FieldValue.serverTimestamp(),
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    duration: '3:04',
    fileUrl:
      'https://firebasestorage.googleapis.com/v0/b/musicapp-956bc.appspot.com/o/songs%2Fdrake-scorpion%2F02-drake-elevate.mp3?alt=media&token=9c7c2bb6-91c0-4af1-8910-b4459782cb05',
    genreId: 'hip-hop',
    id: 'drake-elevate',
    isActive: true,
    title: 'Elevate',
  },
  {
    albumId: 'drake-scorpion',
    artistId: 'aubrey-drake-garaham',
    artist: 'Drake',
    arts: [
      'https://firebasestorage.googleapis.com/v0/b/musicapp-956bc.appspot.com/o/songs%2Fdrake-scorpion%2Fdrake-scorpion-album-art.jpg?alt=media&token=2e81ecbe-2757-4f68-bee5-e3479b48c9d9',
    ],
    createdAt: firestore.FieldValue.serverTimestamp(),
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    duration: '3:58',
    fileUrl:
      'https://firebasestorage.googleapis.com/v0/b/musicapp-956bc.appspot.com/o/songs%2Fdrake-scorpion%2F03-drake-nonstop.mp3?alt=media&token=f4d40239-8c0f-40e0-8195-983126196cb3',
    genreId: 'hip-hop',
    id: 'drake-nonstop',
    isActive: true,
    title: 'Nonstop',
  },
  {
    albumId: 'kanye-west-808s-and-heartbreak',
    artistId: 'kanye-west',
    artist: 'Kanye West',
    arts: [
      'https://firebasestorage.googleapis.com/v0/b/musicapp-956bc.appspot.com/o/songs%2Fkanye-west-808s-and-heartbreak%2F04-kanye-west-amazing-album-art%2Famazing-02-album-art.jpg?alt=media&token=053ef7e0-bfe8-4156-90c0-7cec04dd8292',
      'https://firebasestorage.googleapis.com/v0/b/musicapp-956bc.appspot.com/o/songs%2Fkanye-west-808s-and-heartbreak%2F04-kanye-west-amazing-album-art%2Famazing-01-album-art.jpg?alt=media&token=954566ea-bb19-4801-94cb-99dcd4ec4eaa',
    ],
    createdAt: firestore.FieldValue.serverTimestamp(),
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    duration: '3:50',
    fileUrl:
      'https://firebasestorage.googleapis.com/v0/b/musicapp-956bc.appspot.com/o/songs%2Fkanye-west-808s-and-heartbreak%2F04-kanye-west-amazing-feat-young-jeezy.mp3?alt=media&token=780567ae-af59-48fc-844d-253f0abd2e90',
    genreId: 'hip-hop',
    id: 'kanye-west-amazing',
    isActive: true,
    title: 'Amazing (Feat. Young Jeezy)',
  },
  {
    albumId: 'kanye-west-808s-and-heartbreak',
    artistId: 'kanye-west',
    artist: 'Kanye West',
    arts: [
      'https://firebasestorage.googleapis.com/v0/b/musicapp-956bc.appspot.com/o/songs%2Fkanye-west-808s-and-heartbreak%2F01-kanye-west-say-you-will-album-art%2Fsee-you-will-album-art.jpg?alt=media&token=6e399b8d-979d-40cb-913c-6a19b2a8ac02',
    ],
    createdAt: firestore.FieldValue.serverTimestamp(),
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    duration: '6:17',
    fileUrl:
      'https://firebasestorage.googleapis.com/v0/b/musicapp-956bc.appspot.com/o/songs%2Fkanye-west-808s-and-heartbreak%2F01-kanye-west-say-you-will.mp3?alt=media&token=44f493a2-ec32-4c5c-920b-28885b99d09d',
    genreId: 'hip-hop',
    id: 'kanye-west-say-you-will',
    isActive: true,
    title: 'Say You Will',
  },
];

export const Add = () => {
  history.forEach((item) => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .collection('history')
      .doc(item.id)
      .set(item);
  });
};
