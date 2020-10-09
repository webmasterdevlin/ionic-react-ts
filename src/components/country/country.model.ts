export type CountryModel = {
  name: string;
  population: string;
  capital: string;
  distanceToOtherCountries: Array<DistanceCountry>;
};

export type DistanceCountry = {
  name: string;
};

export type CountriesResponseType = {
  data: CountriesDataType;
};

export type CountriesDataType = {
  countries: Array<CountryModel>;
};
