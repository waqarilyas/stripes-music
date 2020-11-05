import firestore from '@react-native-firebase/firestore';

const comments = [
  {
    id: 'comment-01',
    comment: 'What an amazing article!. Here is a like for you.',
    username: 'Harper Singh',
    userId: 'qGrBKwgj1chfE2GndamoqUoYW2Y2',
    postId: 'test-news-01',
    createdAt: +new Date(),
    updatedAt: +new Date(),
  },
  {
    id: 'comment-02',
    comment: 'Great article!. You deserve a like',
    username: 'Cater Johns',
    userId: 'NLG6sCsRXmZx87QwaF3c9UtmEG63',
    postId: 'test-news-01',
    createdAt: +new Date(),
    updatedAt: +new Date(),
  },
  {
    id: 'comment-03',
    comment: 'Great article!. You deserve a like',
    username: 'Andrey Mills',
    userId: 'HWYld9ztj2bZCAZ4rfqtwXsV5LO2',
    postId: 'test-news-01',
    createdAt: +new Date(),
    updatedAt: +new Date(),
  },
];

export const Add = () => {
  comments.forEach((comment) => {
    firestore().collection('comments').doc(comment.id).set(comment);
  });
};
