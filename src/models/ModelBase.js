import firestore from '@react-native-firebase/firestore';

const serverTimeStamp = +new Date();

class ModelBase {
  constructor({ createdAt, updatedAt }) {
    this.createdAt = createdAt || serverTimeStamp;
    this.updatedAt = updatedAt || serverTimeStamp;
  }

  static converter() {
    return {
      toFirestore: (model) => {
        return { ...model };
      },
      fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new this.constructor({ ...data });
      },
    };
  }
}
