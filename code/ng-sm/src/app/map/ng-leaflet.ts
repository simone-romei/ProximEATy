import { Map, Control, DomUtil, Marker, Icon, DomEvent, ControlOptions, LatLngExpression, MarkerOptions, Popup, PopupOptions, Util, LatLng, Point, DivIcon } from 'leaflet';
import { ComponentFactoryResolver, Injector, ComponentRef, Type, ComponentFactory } from '@angular/core';
import { Post } from '../model';

// import './leaflet.smoothmarkerbouncing.js';

//FIX ICON PROBLEM
Icon.Default.mergeOptions({
  iconRetinaUrl: "leaflet/marker-icon-2x.png",
  iconUrl: "leaflet/marker-icon.png",
  shadowUrl: "leaflet/marker-shadow.png"
});


export interface LLMap {
  map: Map;
}

export interface LLMarker extends LLMap {
  marker: Marker;
  image: string;
  title: string;
  desc: string;
  fb: string;
  cell: string;
}

export interface LLControl extends LLMap {
  control: Control;
}

export interface LLComponent<T extends LLMap> {

  readonly component: ComponentRef<T>;

  detect(): void;

  destroy(): void;

}


export class LLComponentWrapper<T> {

  component: ComponentRef<T>;

  constructor(public componentType: Type<T>, public resolver: ComponentFactoryResolver, public injector: Injector) {}

  create() {
    this.component = this.resolver.resolveComponentFactory(this.componentType).create(this.injector);
  }

  disableClickPropagation() {
    DomEvent.disableClickPropagation(this.component.location.nativeElement);
  }

  detect() {
      if (this.component) this.component.changeDetectorRef.detectChanges();
  }

  destroy() {
    if (this.component) this.component.destroy();
  }

  html(): HTMLElement {
    return (this.component) ? this.component.location.nativeElement : null;
  }

}

export class LLMarkerComponent<T extends LLMarker> extends Marker implements LLComponent<T> {

  private wrapper: LLComponentWrapper<T>;

  constructor(componentType: Type<T>, resolver: ComponentFactoryResolver, injector: Injector, latlng: LatLngExpression,
    icon?: string,
    public image?: string,
    public title?: string,
    public desc?: string,
    public fb?: string,
    public cell?: string) {
    super(latlng);
    this.wrapper = new LLComponentWrapper(componentType, resolver, injector);
    //Marker ICON
    this.setIcon(new DivIcon({
        className: 'marker-icon',
        html: "<div><img src='" + icon + "' /></div>",
        iconAnchor  : [12, 32],
        iconSize    : [50, 50]
    }));
  }

  get component(): ComponentRef<T> { return this.wrapper.component; }

  detect(): void {
    this.wrapper.detect();
  }

  destroy(): void {
    this.wrapper.destroy();
  }

  onAdd(map: Map): this {
    this.wrapper.create();
    this.wrapper.component.instance.map = map;
    this.wrapper.component.instance.marker = this;
    this.wrapper.component.instance.image = this.image;
    this.wrapper.component.instance.title = this.title;
    this.wrapper.component.instance.desc = this.desc;
    this.wrapper.component.instance.fb = this.fb;
    this.wrapper.component.instance.cell = this.cell;

    this.wrapper.detect();
    this.wrapper.disableClickPropagation();
    this.bindPopup(this.wrapper.html());
    return super.onAdd(map);
  }

  onRemove(map: Map): this {
    this.unbindPopup();
    this.wrapper.destroy();
    return super.onRemove(map);
  }

}

export class LLControlComponent<T extends LLControl> extends Control implements LLComponent<T> {

  private wrapper: LLComponentWrapper<T>;

  constructor(componentType: Type<T>, resolver: ComponentFactoryResolver, injector: Injector, options?: ControlOptions) {
    super(options);
    this.wrapper = new LLComponentWrapper(componentType, resolver, injector);
  }

  get component(): ComponentRef<T> { return this.wrapper.component; }

  detect(): void {
    this.wrapper.detect();
  }

  destroy(): void {
    this.wrapper.destroy();
  }

  onAdd(map: Map): HTMLElement {
    this.wrapper.create();
    this.wrapper.component.instance.map = map;
    this.wrapper.component.instance.control = this;
    this.wrapper.detect();
    this.wrapper.disableClickPropagation();
    return this.wrapper.html();
  }

  onRemove(map: Map): void {
    this.wrapper.destroy();
    super.onRemove(map);
  }

}
