import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const favoriteArtists = [
  {
    id: 'kanye-west',
    avatar:
      'https://s.abcnews.com/images/US/kanye-west-mo_hpMain_20200704-214451_1x1_992.jpg',
    name: 'Kanye West',
  },
  {
    id: 'aubrey-drake-graham',
    avatar:
      'https://www.blackpast.org/wp-content/uploads/Drake_Velvet_Underground_Toronto_August_24_2017_Photo_by_Anton_Mak.jpg',
    name: 'Drake',
  },
  {
    id: 'atif-aslam',
    avatar:
      'https://kashmirlife.net/wp-content/uploads/2018/08/maxresdefault-1.jpg',
    name: 'Atif Aslam',
  },
  {
    id: 'armaan-malik',
    avatar:
      'https://i2.cinestaan.com/image-bank/1500-1500/172001-173000/172219.jpg',
    name: 'Armaan Malik',
  },
];

export const Add = () => {
  favoriteArtists.forEach((obj) => {
    firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .set(
        {
          favoriteArtists: firestore.FieldValue.arrayUnion(obj),
        },
        { merge: true },
      );
  });
};
