import React, { useEffect } from 'react';
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
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { COUNTRIES_QUERY } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { CountriesDataType } from '../models/country.model';

const Tab1: React.FC = () => {
  const query = useQuery<CountriesDataType>(COUNTRIES_QUERY);

  if (query.loading)
    return (
      <IonPage>
        <IonContent>Loading...</IonContent>
      </IonPage>
    );
  if (query.error)
    return (
      <IonPage>
        <IonContent>{query.error.message}</IonContent>
      </IonPage>
    );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {query?.data?.countries?.map((country: any) => (
          <IonCard>
            <img
              src={`https://picsum.photos/400/300?country=${country.name}`}
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
  );
};

export default Tab1;
