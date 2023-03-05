export const GenerateCacheKey = (ua: string, id: number) =>
  `jwt:refresh:${ua}:${id}`;
