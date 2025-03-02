function makeFormData<T extends object>(obj: T): FormData {
  const formData = new FormData();
  console.log(obj);
  for (const prop in obj) {
    const value = obj[prop];
    if (prop === 'mainImg') {
      console.log(`Key: ${prop}, VALUE: ${value}`);
      console.log(typeof value);
      console.log('Instance of file?', value instanceof File);
    }
    formData.append(prop, value instanceof Blob ? value : String(value));
  }

  return formData;
}

export default makeFormData;
