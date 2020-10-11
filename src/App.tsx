import React, { useEffect, useState } from 'react';
import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonPage,
  IonSpinner,
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
import { CameraResultType, CameraSource, Plugins } from '@capacitor/core';

const { Share } = Plugins;

const BASE_URL = 'http://countries-274616.ew.r.appspot.com/';

const App: React.FC = () => {
  const [graphqlResponse, setGraphqlResponse] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: BASE_URL,
    resolvers: {},
  });

  useEffect(() => {
    setLoading(true);
    client
      .query({
        query: COUNTRIES_QUERY,
      })
      .then((res: CountriesResponseType) => {
        setGraphqlResponse(res);
      })
      .catch(err => alert(err.message))
      .finally(() => setLoading(false));
  }, [client]);

  const shareImage = async () => {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

    await Share.share({
      title: 'Check my image',
      url: image.path,
    });
  };

  const basicShare = async (url: string) => {
    await Share.share({
      title: 'Yahoo',
      text: 'Check this out!',
      url,
    });
  };

  // TODO: shareLocalFile

  return (
    <ApolloProvider client={client}>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Post Pandemic Travels</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          {loading && (
            <div
              style={{
                margin: '1rem',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <IonSpinner name="crescent" />
            </div>
          )}
          {graphqlResponse.data &&
            graphqlResponse.data.Country.map((country: CountryModel) => (
              <IonCard key={country.name}>
                <img
                  src={`https://picsum.photos/800/400?country=${country.name}`}
                  alt={country.name}
                />
                <IonCardHeader
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <IonCardSubtitle>{country.name}</IonCardSubtitle>
                    <IonCardTitle>{country.capital}</IonCardTitle>
                  </div>
                  <div>
                    <IonItem>
                      <IonButton onClick={() => shareImage()}>
                        Capture an image
                      </IonButton>
                      <IonButton
                        onClick={() =>
                          basicShare(
                            `https://picsum.photos/800/400?country=${country.name}`,
                          )
                        }
                      >
                        Basic Share
                      </IonButton>
                    </IonItem>
                  </div>
                </IonCardHeader>
              </IonCard>
            ))}
        </IonContent>
      </IonPage>
    </ApolloProvider>
  );
};

export default App;
