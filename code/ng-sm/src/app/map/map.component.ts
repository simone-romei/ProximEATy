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
  private cluster = new MarkerClusterGroup({
    spiderfyDistanceMultiplier: 1.5,
    maxClusterRadius: 200
  });

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
        desc,
        fb,
        cell
      );
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

//     this.addMarker(
// [42.774706, 11.795599],
// "https://lh3.googleusercontent.com/proxy/jJgQXPOlVAudoJcJ0-YmGVbHiqZ_qv2taxWjrxdW6mYbgCGOU5S_XTtYeSkkk-J-b6bVry7jbcs4MAsHxsJ7hVBVm_WVEG39",
// "https://scontent.ffco4-1.fna.fbcdn.net/v/t1.0-9/60873753_2213060628763294_8265905985558675456_n.png?_nc_cat=102&_nc_sid=85a577&_nc_ohc=eIf-ce47jAIAX-lGU2A&_nc_ht=scontent.ffco4-1.fna&oh=f3be526df3266e5e13e7f24b7a6ce2ba&oe=5ECC4378",
// "Organic Farmer",
// "Predio Potantino is an organic company with a wide range of products (70 different items) that range from the production of raw raw materials such as spelt, wheat and legumes to baked goods and beer.",
// "https://www.facebook.com/PredioPotantin/",
// "+39 328 978 9057"
// );
//
// this.addMarker(
// [41.768639, 12.457341],
// "https://www.solarelli.it/wp-content/uploads/2017/03/fragola_basilicata_500x500pixel-wpcf_300x300.png",
// "http://www.agricolturanuova.it/wp-content/uploads/2015/03/solologo-2.png",
// "Organic Farmer",
// "The New Agricultural Cooperative was born in 1977 to create jobs and preserve the territory with an organic agriculture project. The company has been biodynamic since 2010.",
// "https://www.facebook.com/agricolturanuova/",
// "06 507 0453"
// );
//
// this.addMarker(
// [41.768639, 12.457341],
// "https://cdn.shopify.com/s/files/1/1902/2975/products/spelt_grits.png?v=1495896643",
// "http://www.agricolturanuova.it/wp-content/uploads/2015/03/solologo-2.png",
// "Organic Farmer",
// "The New Agricultural Cooperative was born in 1977 to create jobs and preserve the territory with an organic agriculture project. The company has been biodynamic since 2010.",
// "https://www.facebook.com/agricolturanuova/",
// "06 507 0453"
// );


this.addMarker(
[42.774706, 11.795599],
"https://lh3.googleusercontent.com/proxy/jJgQXPOlVAudoJcJ0-YmGVbHiqZ_qv2taxWjrxdW6mYbgCGOU5S_XTtYeSkkk-J-b6bVry7jbcs4MAsHxsJ7hVBVm_WVEG39",
"https://scontent.ffco4-1.fna.fbcdn.net/v/t1.0-9/60873753_2213060628763294_8265905985558675456_n.png?_nc_cat=102&_nc_sid=85a577&_nc_ohc=eIf-ce47jAIAX-lGU2A&_nc_ht=scontent.ffco4-1.fna&oh=f3be526df3266e5e13e7f24b7a6ce2ba&oe=5ECC4378",
"Az. Predio Potantin Organic Farmer",
"Predio Potantino is an organic company with a wide range of products (70 different items) that range from the production of raw raw materials such as spelt, wheat and legumes to baked goods and beer.",
"https://www.facebook.com/PredioPotantino/",
"+39 328 978 9057"
);

this.addMarker(
[42.774706, 11.795599],
"https://cdn.pixabay.com/photo/2014/04/02/10/52/chocolate-chip-cookies-304801_1280.png",
"https://scontent.ffco4-1.fna.fbcdn.net/v/t1.0-9/60873753_2213060628763294_8265905985558675456_n.png?_nc_cat=102&_nc_sid=85a577&_nc_ohc=eIf-ce47jAIAX-lGU2A&_nc_ht=scontent.ffco4-1.fna&oh=f3be526df3266e5e13e7f24b7a6ce2ba&oe=5ECC4378",
"Az. Predio Potantin Organic Farmer",
"Predio Potantino is an organic company with a wide range of products (70 different items) that range from the production of raw raw materials such as spelt, wheat and legumes to baked goods and beer.",
"https://www.facebook.com/PredioPotantino/",
"+39 328 978 9057"
);

this.addMarker(
[42.774706, 11.795599],
"https://www.pursuedtirol.com/media/image/d9/1c/eb/Tagliatelle-Einkorn2_600x600.png",
"https://scontent.ffco4-1.fna.fbcdn.net/v/t1.0-9/60873753_2213060628763294_8265905985558675456_n.png?_nc_cat=102&_nc_sid=85a577&_nc_ohc=eIf-ce47jAIAX-lGU2A&_nc_ht=scontent.ffco4-1.fna&oh=f3be526df3266e5e13e7f24b7a6ce2ba&oe=5ECC4378",
"Az. Predio Potantin Organic Farmer",
"Predio Potantino is an organic company with a wide range of products (70 different items) that range from the production of raw raw materials such as spelt, wheat and legumes to baked goods and beer.",
"https://www.facebook.com/PredioPotantino/",
"+39 328 978 9057"
);

this.addMarker(
[42.774706, 11.795599],
"https://www.larossaconserve.com/images/categorie/legumi.png",
"https://scontent.ffco4-1.fna.fbcdn.net/v/t1.0-9/60873753_2213060628763294_8265905985558675456_n.png?_nc_cat=102&_nc_sid=85a577&_nc_ohc=eIf-ce47jAIAX-lGU2A&_nc_ht=scontent.ffco4-1.fna&oh=f3be526df3266e5e13e7f24b7a6ce2ba&oe=5ECC4378",
"Az. Predio Potantin Organic Farmer",
"Predio Potantino is an organic company with a wide range of products (70 different items) that range from the production of raw raw materials such as spelt, wheat and legumes to baked goods and beer.",
"https://www.facebook.com/PredioPotantino/",
"+39 328 978 9057"
);

this.addMarker(
[41.768639, 12.457341],
"https://www.solarelli.it/wp-content/uploads/2017/03/fragola_basilicata_500x500pixel-wpcf_300x300.png",
"http://www.agricolturanuova.it/wp-content/uploads/2015/03/solologo-2.png",
"Agricoltura Nuova - Organic Farmer",
"The New Agricultural Cooperative was born in 1977 to create jobs and preserve the territory with an organic agriculture project. The company has been biodynamic since 2010.",
"https://www.facebook.com/agricolturanuova/",
"06 507 0453"
);

this.addMarker(
[41.768639, 12.457341],
"https://cdn.pixabay.com/photo/2014/04/02/10/52/chocolate-chip-cookies-304801_1280.png",
"http://www.agricolturanuova.it/wp-content/uploads/2015/03/solologo-2.png",
"Agricoltura Nuova - Organic Farmer",
"The New Agricultural Cooperative was born in 1977 to create jobs and preserve the territory with an organic agriculture project. The company has been biodynamic since 2010.",
"https://www.facebook.com/agricolturanuova/",
"06 507 0453"
);

this.addMarker(
[41.768639, 12.457341],
"https://i.pinimg.com/originals/4c/e7/53/4ce75302863054fb2269f443aa943751.png",
"http://www.agricolturanuova.it/wp-content/uploads/2015/03/solologo-2.png",
"Agricoltura Nuova - Organic Farmer",
"The New Agricultural Cooperative was born in 1977 to create jobs and preserve the territory with an organic agriculture project. The company has been biodynamic since 2010.",
"https://www.facebook.com/agricolturanuova/",
"06 507 0453"
);

this.addMarker(
[41.768639, 12.457341],
"https://library.kissclipart.com/20191022/boe/kissclipart-fennel-vegetable-food-plant-celery-08fccad0af174206.png",
"http://www.agricolturanuova.it/wp-content/uploads/2015/03/solologo-2.png",
"Agricoltura Nuova - Organic Farmer",
"The New Agricultural Cooperative was born in 1977 to create jobs and preserve the territory with an organic agriculture project. The company has been biodynamic since 2010.",
"https://www.facebook.com/agricolturanuova/",
"06 507 0453"
);

this.addMarker(
[41.768639, 12.457341],
"https://static.mulinobianco.it/upl/entities/product/equazione_pangriintegrali_1.png",
"http://www.agricolturanuova.it/wp-content/uploads/2015/03/solologo-2.png",
"Agricoltura Nuova - Organic Farmer",
"The New Agricultural Cooperative was born in 1977 to create jobs and preserve the territory with an organic agriculture project. The company has been biodynamic since 2010.",
"https://www.facebook.com/agricolturanuova/",
"06 507 0453"
);

this.addMarker(
[41.768639, 12.457341],
"ttps://www.iltagliere.it/immagini/articoli/820/419__pecorino%20crosta%20nera.png",
"http://www.agricolturanuova.it/wp-content/uploads/2015/03/solologo-2.png",
"Agricoltura Nuova - Organic Farmer",
"The New Agricultural Cooperative was born in 1977 to create jobs and preserve the territory with an organic agriculture project. The company has been biodynamic since 2010.",
"https://www.facebook.com/agricolturanuova/",
"06 507 0453"
);

this.addMarker(
[41.768639, 12.457341],
"https://www.pursuedtirol.com/media/image/d9/1c/eb/Tagliatelle-Einkorn2_600x600.png",
"http://www.agricolturanuova.it/wp-content/uploads/2015/03/solologo-2.png",
"Agricoltura Nuova - Organic Farmer",
"The New Agricultural Cooperative was born in 1977 to create jobs and preserve the territory with an organic agriculture project. The company has been biodynamic since 2010.",
"https://www.facebook.com/agricolturanuova/",
"06 507 0453"
);

this.addMarker(
[41.991803, 12.396558],
"https://www.honeyassociation.com/images/banner_pic.png",
"https://www.coop-coraggio.it/wp-content/themes/coraggio/images/logoCoraggioHeader.png ",
"Coop Agricola Coraggio - Organic Farmer",
"From the dispute over the assignment of public lands to multifunctional agriculture, through training and environmental education. Co.r.ag.gio. since 2015 he manages the agricultural estate of Borghetto San Carlo, in the Veio Park, in via Cassia 1420 in Rome.",
"https://www.facebook.com/CoopCoraggio",
"+393883646013"
);

this.addMarker(
[41.991803, 12.396558],
"https://cdn.shopify.com/s/files/1/1902/2975/products/spelt_grits.png?v=1495896643",
"https://www.coop-coraggio.it/wp-content/themes/coraggio/images/logoCoraggioHeader.png ",
"Coop Agricola Coraggio - Organic Farmer",
"From the dispute over the assignment of public lands to multifunctional agriculture, through training and environmental education. Co.r.ag.gio. since 2015 he manages the agricultural estate of Borghetto San Carlo, in the Veio Park, in via Cassia 1420 in Rome.",
"https://www.facebook.com/CoopCoraggio",
"+393883646013"
);

this.addMarker(
[41.991803, 12.396558],
"https://www.larossaconserve.com/images/categorie/legumi.png",
"https://www.coop-coraggio.it/wp-content/themes/coraggio/images/logoCoraggioHeader.png ",
"Coop Agricola Coraggio - Organic Farmer",
"From the dispute over the assignment of public lands to multifunctional agriculture, through training and environmental education. Co.r.ag.gio. since 2015 he manages the agricultural estate of Borghetto San Carlo, in the Veio Park, in via Cassia 1420 in Rome.",
"https://www.facebook.com/CoopCoraggio",
"+393883646013"
);

this.addMarker(
[41.991803, 12.396558],
"https://static.mulinobianco.it/upl/entities/product/equazione_pangriintegrali_1.png",
"https://www.coop-coraggio.it/wp-content/themes/coraggio/images/logoCoraggioHeader.png ",
"Coop Agricola Coraggio - Organic Farmer",
"From the dispute over the assignment of public lands to multifunctional agriculture, through training and environmental education. Co.r.ag.gio. since 2015 he manages the agricultural estate of Borghetto San Carlo, in the Veio Park, in via Cassia 1420 in Rome.",
"https://www.facebook.com/CoopCoraggio",
"+393883646013"
);

this.addMarker(
[41.991803, 12.396558],
"https://cdn.pixabay.com/photo/2014/04/02/10/52/chocolate-chip-cookies-304801_1280.png",
"https://www.coop-coraggio.it/wp-content/themes/coraggio/images/logoCoraggioHeader.png ",
"Coop Agricola Coraggio - Organic Farmer",
"From the dispute over the assignment of public lands to multifunctional agriculture, through training and environmental education. Co.r.ag.gio. since 2015 he manages the agricultural estate of Borghetto San Carlo, in the Veio Park, in via Cassia 1420 in Rome.",
"https://www.facebook.com/CoopCoraggio",
"+393883646013"
);

this.addMarker(
[41.900750, 12.482995],
"https://static.takeaway.com/images/restaurants/bg/01O03511/logo_465x320.png",
"https://www.campagnamica.it/wp-content/themes/campagnamica/ui/shared/img/logo.png",
"Campagna Amica C.M. - FOOD HUB",
"Organizes and promotes the points of excellence of the Italian agricultural supply chain from producer to consumer and at zero km",
"https://www.facebook.com/campagnamica/",
"+3906 489931"
);


this.addMarker(
[41.866798, 12.491905],
"https://www.food-delivery.it/wp-content/themes/yootheme/cache/food-delivery-colore-89011aed.png",
"https://www.ilfattorinoecologico.it/images/il_fattorino_ecologico_pony_roma_logo.png",
"Il Fattorino Ecologico - DELIVERY",
"Thanks to our pony express rome services, we are able to deliver shipments in agreed ways from 30 minutes for an extra urgency, to 1h for a simple urgency to 3h for the standard service using our ecological fleet",
"https://www.facebook.com/pg/Il-Fattorino-Ecologico-531456223550099/posts/",
"+3906 5143 0912"
);


this.addMarker(
[41.897500, 12.566395],
"https://www.luismas.it/images/icon_catering.png",
"https://www.rinfrescoadomicilio.it/resources/image/logoridnew.png",
"Rinfresco a Domicilio - CATERING",
"You can order your tasty refreshments in Rome directly from home, organize business lunches, buffets, banqueting, refreshments, parties or a simple dinner with family",
"https://www.facebook.com/rinfrescoadomicilio/",
"+393938802264"
);





    this.map.flyToBounds(this.cluster.getBounds());

  }

}
