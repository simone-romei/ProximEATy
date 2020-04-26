import { Injectable } from '@angular/core';
import { Map, TileLayer, Marker, Control, ControlOptions, LatLngExpression, MarkerOptions, FeatureGroup } from 'leaflet';
import { MapComponent } from './map/map.component';
import { MarkerPostComponent } from './marker-post/marker-post.component';
import { BehaviorSubject } from 'rxjs';
import { Post } from './model';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map: MapComponent = null;

  public obsPost = new BehaviorSubject<Post>(null);

  constructor() { }

  public registerMap(map: MapComponent) {
    this.map = map;
    this.map.map.on('controlPostAdd', (event:any) => this.obsPost.next(event.post));
    // this.map.map.on('controlPostEdit', (event:any) => this.obsPost.next(event.post));
    // this.map.map.on('controlPostRemove', (event:any) => this.obsPost.next(event.post));
  }

  public addPost() {

  }

  // public addMarkerEdit(): MarkerPostComponent {
  //   return (this.map) ? this.map.addMarkerEdit() : null;
  // }

}
