export interface Place {
  id: string;

  lat: number;
  lng: number;

  country: string;
  area: string;
  city: string;
  zone: string;

  name: string;
  address: string;
}


export interface Post {
  id: string;
  msg: string;
  place: Place;
}
