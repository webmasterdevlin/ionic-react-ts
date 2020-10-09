import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ApolloClient, ApolloProvider, gql } from '@apollo/client';
import { cache } from './cache';

const BASE_URL = 'http://countries-274616.ew.r.appspot.com/';

const client = new ApolloClient({
  cache: cache,
  uri: BASE_URL,
  resolvers: {},
});

client
  .query({
    query: gql`
      {
        Country {
          name
          area
          capital
          population
          timezones {
            name
          }
          currencies {
            name
          }
          distanceToOtherCountries {
            countryName
          }
          flag {
            emojiUnicode
          }
        }
      }
    `,
  })
  .then(res => console.log(res));

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
