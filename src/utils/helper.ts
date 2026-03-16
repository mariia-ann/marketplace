function isValidHttpUrl(string: string): boolean {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (err: any) {
    console.log(err);
    return false; // Not a valid URL string
  }
}

export { isValidHttpUrl };
