import { InMemoryCache } from '@apollo/client';
import { CountryModel } from './models/country.model';

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {},
    },
  },
});

export const countryNamesVar = cache.makeVar<CountryModel[]>([]);
