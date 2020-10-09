import { gql } from '@apollo/client';

export const COUNTRIES_QUERY = gql`
  query {
    Country {
      capital
      name
      officialLanguages {
        name
      }
    }
  }
`;
