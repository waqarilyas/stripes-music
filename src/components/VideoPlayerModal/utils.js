import firestore from '@react-native-firebase/firestore';

const comments = [
  {
    comment: 'What an amazing song',
    createdAt: +new Date(),
    id: 'comment-01',
    image:
      'https://res.cloudinary.com/practicaldev/image/fetch/s--ef-WXsPf--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/8050/Mm3V3467.jpg',
    videoId: 'drake-emotionless',
    updated: +new Date(),
    userId: 'jXioH8EBtcciZ4kRsW27QEIO0iD2',
    username: 'Arslan Mushtaq',
  },
  {
    comment: 'I love this song sooo much!',
    createdAt: +new Date(),
    id: 'comment-02',
    image:
      'https://res.cloudinary.com/practicaldev/image/fetch/s--ef-WXsPf--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/8050/Mm3V3467.jpg',
    videoId: 'drake-emotionless',
    updated: +new Date(),
    userId: 'jXioH8EBtcciZ4kRsW27QEIO0iD2',
    username: 'Arslan Mushtaq',
  },
  {
    comment: 'On repeat! Kept listening it for hours',
    createdAt: +new Date(),
    id: 'comment-03',
    image:
      'https://res.cloudinary.com/practicaldev/image/fetch/s--ef-WXsPf--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/8050/Mm3V3467.jpg',
    videoId: 'drake-emotionless',
    updated: +new Date(),
    userId: 'jXioH8EBtcciZ4kRsW27QEIO0iD2',
    username: 'Arslan Mushtaq',
  },
];

export const Add = () => {
  comments.forEach((comment) => {
    firestore()
      .collection('videos')
      .doc(comment.videoId)
      .collection('comments')
      .doc(comment.id)
      .set(comment);
  });
};
