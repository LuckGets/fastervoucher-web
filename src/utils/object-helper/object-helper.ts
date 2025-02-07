import UndefineAbleType from '../types/undefineAble.type';

export const ObjectHelper = {
  isObjectEmpty: function (object: UndefineAbleType<object>): boolean {
    if (!object) return true;
    return Object.keys(object).length === 0;
  },
};
