function mongooseErrorFormater(error) {
  const errorsArray = {};

  for (const key in error.errors) {
    errorsArray[key] = error.errors[key].message;
  }

  return errorsArray;
}

export default mongooseErrorFormater;
