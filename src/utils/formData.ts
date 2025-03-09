function makeFormData<T extends object>(obj: T): FormData {
  const formData = new FormData();
  for (const prop in obj) {
    const value = obj[prop];
    formData.append(prop, value instanceof Blob ? value : String(value));
  }

  return formData;
}

export default makeFormData;
