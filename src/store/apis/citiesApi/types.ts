export  interface FoundCity {
  toponymName: string;
  countryName: string;
  lng: string
}
export interface CitiesList {
  geonames: FoundCity[];
}