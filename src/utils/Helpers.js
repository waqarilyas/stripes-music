export const thousandSeprator = (num = 0) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const convertToMinutes = (seconds = 0) => {
  return (
    (seconds - (seconds %= 60)) / 60 + (seconds > 9 ? ':' : ':0') + seconds
  );
};

export const KFormatter = (num = 0) => {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
    : Math.sign(num) * Math.abs(num);
};

export const customDocId = (uid, passedId) => {
  return uid < passedId
    ? uid.concat('**', passedId)
    : passedId.concat('**', uid);
};
