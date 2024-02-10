export const arrayFiller = (array, newLength) => {
  const filledArray = [...array];
  for (let i = array.length; i < newLength; i++) {
    filledArray[i] = null;
  }
  return filledArray;
};
