export const thousandSeprator = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const convertToMinutes = (seconds) => {
  return (
    (seconds - (seconds %= 60)) / 60 + (9 < seconds ? ':' : ':0') + seconds
  );
};
