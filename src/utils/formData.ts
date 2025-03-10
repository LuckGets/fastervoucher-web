function makeFormData<T extends object>(obj: T): FormData {
  const formData = new FormData();
  for (const prop in obj) {
    const value = obj[prop];
    if (value instanceof Blob) {
      // Handle File or Blob data.
      formData.append(prop, value);
    } else if (typeof value === 'object') {
      // For objects or arrays, convert to a JSON string.
      formData.append(prop, JSON.stringify(value));
    } else {
      // For primitive values, simply convert to a string.
      formData.append(prop, String(value));
    }
  }

  return formData;
}

export default makeFormData;
