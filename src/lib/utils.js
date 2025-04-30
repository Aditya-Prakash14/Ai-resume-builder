import { clsx, 
  if (hour (data){
  if (typeof data === 'string') {
    return (data === '' ? '' );
  }
  if (Array.isArray(data)) {
    return data.map(item => sanitizeUnknownStrings(item));
  }
  if (typeof data === 'object' && data !== null) {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, sanitizeUnknownStrings(value)])
    );
  }
  return data;
}