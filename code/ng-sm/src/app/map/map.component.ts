import { Component, OnInit, ComponentFactoryResolver, Injector, DoCheck } from '@angular/core';
import { Map, TileLayer, Marker, Control, ControlOptions, LatLngExpression, MarkerOptions, FeatureGroup } from 'leaflet';
import { ResizedEvent } from 'angular-resize-event';
import { MapService } from '../map.service';
import { LLComponent, LLControlComponent, LLControl, LLMarkerComponent } from './ng-leaflet';
import { ControlPostComponent } from '../control-post/control-post.component';
import { MarkerPostComponent } from '../marker-post/marker-post.component';
import { MarkerClusterGroup } from 'leaflet.markercluster';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, DoCheck {

  public map: Map;
  public markerEdit: LLMarkerComponent<MarkerPostComponent> = null;
  private cluster = new MarkerClusterGroup();

  private components: Array<LLComponent<any>> = new Array<LLComponent<any>>();


  constructor(private resolver: ComponentFactoryResolver, private injector: Injector, private mapService: MapService) { }

  ngOnInit(): void {
    this.initMap();
  }

  ngDoCheck(): void {
    this.components.forEach(comp => comp.detect());
  }

  public onResized(event: ResizedEvent) {
    this.map.invalidateSize();
  }

  public addControlPost(): ControlPostComponent {
    const component = new LLControlComponent<ControlPostComponent>(ControlPostComponent, this.resolver, this.injector, { position: 'bottomleft' });
    component.addTo(this.map);
    this.components.push(component);
    return component.component.instance;
  }

  public addMarkerEdit(latlng?: LatLngExpression): MarkerPostComponent {
    if(!this.markerEdit) {
      this.markerEdit = new LLMarkerComponent<MarkerPostComponent>(MarkerPostComponent, this.resolver, this.injector, this.map.getCenter())
      this.markerEdit.addTo(this.map);
      this.components.push(this.markerEdit);
    }
    return this.markerEdit.component.instance;
  }

  public addMarker(latlng: LatLngExpression, icon: string, image: string, title: string, desc: string, fb: string, cell: string) {
      let marker = new LLMarkerComponent<MarkerPostComponent>(MarkerPostComponent, this.resolver, this.injector,
        latlng,
        icon,
        image,
        title,
        desc);
      // this.markerEdit.addTo(this.map);
      this.cluster.addLayer(marker);
      this.components.push(marker);

      // marker.component.instance.image = icon;
      marker.detect();
    // this.markerEdit.component.instance.addTo(this.map);
  }


  private initMap() {
    this.map = new Map('map', { zoomControl: false, attributionControl: false });
    this.map.fitWorld();
    new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    this.mapService.registerMap(this);

    this.addControlPost();


    this.map.addLayer(this.cluster);
    // this.addMarkerEdit();

    //FIXME hardcoded marked!!! from SOLR next :)
    // this.addMarker(
    //   [41.398945, 2.200539],
    //   'https://www.greefa.com/wp-content/uploads/2016/05/web750px_0000_tomaat.png',
    //   'https://www.greefa.com/wp-content/uploads/2016/05/web750px_0000_tomaat.png',
    //   "Geoponika",
    //   "Test1"
    // );
    // this.addMarker(
    //   [41.398945, 2.200539],
    //   'https://www.greefa.com/wp-content/uploads/2016/05/web750px_0000_tomaat.png',
    //   'https://www.greefa.com/wp-content/uploads/2016/05/web750px_0000_tomaat.png',
    //   "Geoponika2",
    //   "Test2"
    // );

    this.addMarker(
[42.774706, 11.795599],
"https://lh3.googleusercontent.com/proxy/jJgQXPOlVAudoJcJ0-YmGVbHiqZ_qv2taxWjrxdW6mYbgCGOU5S_XTtYeSkkk-J-b6bVry7jbcs4MAsHxsJ7hVBVm_WVEG39",
"https://scontent.ffco4-1.fna.fbcdn.net/v/t1.0-9/60873753_2213060628763294_8265905985558675456_n.png?_nc_cat=102&_nc_sid=85a577&_nc_ohc=eIf-ce47jAIAX-lGU2A&_nc_ht=scontent.ffco4-1.fna&oh=f3be526df3266e5e13e7f24b7a6ce2ba&oe=5ECC4378",
"Organic Farmer",
"Predio Potantino is an organic company with a wide range of products (70 different items) that range from the production of raw raw materials such as spelt, wheat and legumes to baked goods and beer.",
"facebook_page",
"cell"
);



    this.map.flyToBounds(this.cluster.getBounds());

  }

}
