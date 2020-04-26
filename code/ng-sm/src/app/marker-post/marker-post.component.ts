import { Component, OnInit } from '@angular/core';
import { Map, Marker, DivIcon } from 'leaflet';
import { LLMarker } from '../map/ng-leaflet';

@Component({
  selector: 'app-marker-post',
  templateUrl: './marker-post.component.html',
  styleUrls: ['./marker-post.component.scss']
})
export class MarkerPostComponent implements OnInit, LLMarker {

  marker: Marker;
  map: Map;

  image: string;
  title: string;
  desc: string;
  fb: string;
  cell: string;

  constructor() { }

  ngOnInit(): void {}

  // setIcon(img: string) {
  //   this.marker.setIcon(new DivIcon({
  //     className: 'marker-icon',
  //     html: "<div><img src='" + img + "' /></div>",
  //     iconAnchor  : [12, 32],
  //     iconSize    : [50, 50]
  //   }));
  //   this.image = img;
  // }

}
