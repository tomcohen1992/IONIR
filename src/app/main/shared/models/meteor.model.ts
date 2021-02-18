export interface IMeteor {
  id: number;
  name: string;
  nametype: string;
  recclass: string;
  mass: string;
  fall: string;
  year: string;
  reclat: string;
  reclong: string;
  geolocation: {
    type: string;
    coordinates: string[];
  };
}

export class ITableMeteor {
  id: number;
  name: string;
  nametype: string;
  mass: number;
  year: number;
}
