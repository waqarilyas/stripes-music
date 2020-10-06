export const thousandSeprator = (num = 0) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
