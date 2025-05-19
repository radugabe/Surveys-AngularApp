export function replaceTokensWithValues(
    text: string,
    replacements: { [key: string]: string | number }
  ): string {
    let result = text;
    for (const token in replacements) {
      const regex = new RegExp(`\\{\\{${token}\\}\\}`, 'g');
      result = result.replace(regex, replacements[token].toString());
    }
    return result;
  }
  