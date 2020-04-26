import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Place } from './model';
import { map } from 'rxjs/operators';

export class Coord {

  constructor(public lat: number, public lng: number, public accuracy?: number) {}

}

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  public position = new BehaviorSubject<Coord>(null);

  constructor(private http: HttpClient) { }

  public resolvePosition(timeout?: number): Promise<Place> {
    return new Promise<Place>((res, rej) => {
      this.getPosition(timeout)
        .then(coord => {
          this.resolvePlace(coord)
            .then(place => res(place))
            .catch(error => rej(error));
        })
        .catch(error => rej(error));
    });
  }

  public getPosition(timeout?: number): Promise<Coord> {
      return new Promise<Coord>((res, rej) => {
        navigator.geolocation.getCurrentPosition(
          resp => {
            const coord = new Coord(resp.coords.latitude, resp.coords.longitude, resp.coords.accuracy);
            console.log('getPosition', coord);
            this.position.next(coord);
            res(coord);
          },
          error => {
            rej(error);
          },
          { timeout: (timeout ? timeout : 5000 ) }
        );
      });
  }

  public resolvePlace(coord: Coord): Promise<Place> {
    console.log('resolvePlace', coord);
    const params = new HttpParams()
      .set('format', 'jsonv2')
      .set('lat', String(coord.lat))
      .set('lon', String(coord.lng))
      .set('zoom', '18')
      .set('addressdetail', '1')
      .set('extratags', '1')
      .set('namedetails', '1');
    return this.http.get('https://nominatim.openstreetmap.org/reverse', { params }).pipe(
      map((data: any) => {
        const place = <Place> {};
        place.lat = coord.lat;
        place.lng = coord.lng;
        if(data.address) {
          if(data.address.country) place.country = data.address.country;
          if(data.address.state) place.area = data.address.state;
          if(data.address.city) place.city = data.address.city;
          if(data.address.city_district) place.zone = data.address.city_district;
        }
        if(data.name) place.name = data.name;
        if(data.display_name) place.address = data.display_name;
        console.log('resolvePlace', place);
        return place;
      })).toPromise();
  }

}
