import UndefineAbleType from '../types/undefineAble.type';

export const ObjectHelper = {
  isObjectEmpty: function (object: UndefineAbleType<object>): boolean {
    if (!object) return true;
    return Object.keys(object).length === 0;
  },

  checkAndReturnEmptyFields: function <T extends object>(
    requiredFields: Array<keyof T>,
    obj: T,
  ): Array<keyof T> {
    if (this.isObjectEmpty(obj) || requiredFields.length < 1) return [];

    return requiredFields.filter((key) => {
      const value = obj[key];
      // Check for null or undefined
      if (value == null) return true;
      // If it's a string, consider empty string as missing
      if (typeof value === 'string' && value.trim() === '') return true;

      if (typeof value === 'number' && value === 0) return true;
      // If it's an array, consider empty array as missing
      if (Array.isArray(value) && value.length === 0) return true;
      return false;
    });
  },
};
