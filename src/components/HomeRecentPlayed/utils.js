import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const history = [
  {
    album: 'drake-scorpion',
    artist: 'Drake',
    artistId: 'aubrey-drake-graham',
    artwork: [
      'https://musiccanada.files.wordpress.com/2018/11/drake.jpg?w=640',
    ],
    createdAt: +new Date(),
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    duration: 184,
    url:
      'https://raw.githubusercontent.com/arslanmushtaqcp/test-data-musicapp/master/audio/drake-scorpion/02-drake-elevate.mp3',
    genreId: 'hip-hop',
    id: 'drake-elevate',
    title: 'Elevate',
    updatedAt: +new Date(),
  },
  {
    album: 'drake-scorpion',
    artist: 'Drake',
    artistId: 'aubrey-drake-graham',
    artwork: [
      'https://static.stereogum.com/uploads/2018/07/Drake-Nonstop-video-1532695625-640x404.jpg',
    ],
    createdAt: +new Date(),
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    duration: 238,
    url:
      'https://raw.githubusercontent.com/arslanmushtaqcp/test-data-musicapp/master/audio/drake-scorpion/03-drake-nonstop.mp3',
    genreId: 'hip-hop',
    id: 'drake-nonstop',
    title: 'Nonstop',
    updatedAt: +new Date(),
  },
  {
    album: 'kanye-west-808s-and-heartbreak',
    artist: 'Kanye West',
    artistId: 'kanye-west',
    artwork: [
      'https://1.bp.blogspot.com/_yHFrOtUsKOo/SVhdw6wDPqI/AAAAAAAAAHo/wlX3Ua70N04/w1200-h630-p-k-no-nu/Kanye+West+-+Amazing+(FanMade+Single+Cover)+Made+by+BS.jpg',
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1e3aa1bd-dddf-4989-b7ce-99fc35726cea/d2l3xe8-309aca9a-e486-4c46-8532-caa37484c6bf.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMWUzYWExYmQtZGRkZi00OTg5LWI3Y2UtOTlmYzM1NzI2Y2VhXC9kMmwzeGU4LTMwOWFjYTlhLWU0ODYtNGM0Ni04NTMyLWNhYTM3NDg0YzZiZi5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.v6pmBSfalgMwDpuA82890JLr7Tjyua6YaJJgk_55sv8',
    ],
    createdAt: +new Date(),
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    duration: 230,
    url:
      'https://raw.githubusercontent.com/arslanmushtaqcp/test-data-musicapp/master/audio/kanye-west-808s-and-heartbreak/04-kanye-west-amazing-feat-young-jeezy.mp3',
    genreId: 'hip-hop',
    id: 'kanye-west-amazing',
    title: 'Amazing (Feat. Young Jeezy)',
    updatedAt: +new Date(),
  },
];

export const AddHistory = () => {
  const uid = auth().currentUser.uid;
  history.forEach((doc) => {
    firestore()
      .collection('users')
      .doc(uid)
      .collection('history')
      .doc(doc.id)
      .set(doc);
  });
};
