const EnumHelper = {
  checkEnumValue<T extends object>(
    enumObj: T,
    value: unknown,
  ): value is T[keyof T] {
    if (!value) return false;
    return Object.values(enumObj).includes(value);
  },
};

export default EnumHelper;
