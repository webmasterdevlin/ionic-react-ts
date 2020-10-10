import React, { useState } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
} from '@apollo/client';
import { CountriesResponseType, CountryModel } from './models/country.model';
import { COUNTRIES_QUERY } from './graphql/queries';

const BASE_URL = 'http://countries-274616.ew.r.appspot.com/';

const App: React.FC = () => {
  const [graphqlResponse, setGraphqlResponse] = useState<any>({});

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: BASE_URL,
    resolvers: {},
  });

  client
    .query({
      query: COUNTRIES_QUERY,
    })
    .then((res: CountriesResponseType) => {
      setGraphqlResponse(res);
    });

  return (
    <ApolloProvider client={client}>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Post Pandemic Travels!</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          {graphqlResponse.data &&
            graphqlResponse.data.Country.map((country: CountryModel) => (
              <IonCard key={country.name}>
                <img
                  src={`https://picsum.photos/800/400?country=${country.name}`}
                  alt={country.name}
                />
                <IonCardHeader>
                  <IonCardSubtitle>{country.name}</IonCardSubtitle>
                  <IonCardTitle>{country.capital}</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            ))}
        </IonContent>
      </IonPage>
    </ApolloProvider>
  );
};

export default App;
