function convertCountryCodeToString(flag: string): string {
  // const flag = convertToEmoji(code);
  // The Unicode code point for the regional indicator symbol 'A'
  const baseCodePoint: number = 0x1f1e6;

  // Convert the emoji flag to an array of Unicode code points
  return Array.from(flag, (char) => {
    // Get the Unicode code point of the character
    const codePoint: number = char.codePointAt(0)!;

    // Calculate the offset from the base code point
    const offset: number = codePoint - baseCodePoint;

    // Convert the offset to the corresponding ASCII character
    return String.fromCharCode(offset + 65); // ASCII 'A' starts at 65
  }).join(""); // Join the array into a string
}

export default convertCountryCodeToString;
