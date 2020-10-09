import { InMemoryCache } from '@apollo/client';

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {},
    },
  },
});

export const gameNamesVar = cache.makeVar<any[]>([]);
