export function base64Encode(str: string): string {
  if (typeof Buffer === 'function') {
    // Node.js environment
    return Buffer.from(str).toString('base64');
  } else if (typeof btoa === 'function') {
    // Browser environment
    return btoa(str);
  } else {
    throw new Error('Base64 encoding not supported in this environment.');
  }
}
