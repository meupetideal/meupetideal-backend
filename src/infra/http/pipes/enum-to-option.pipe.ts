export interface Option {
  key: string;
  value: string;
}

export class EnumToOptionPipe {
  public static transform(
    values: object,
    translatedValues: Record<string, string>,
  ): Option[] {
    return Object.keys(values).reduce((acc, key) => {
      const keyValue = values[key];
      acc.push({
        key: keyValue,
        value: translatedValues[keyValue],
      });
      return acc;
    }, [] as Option[]);
  }
}
