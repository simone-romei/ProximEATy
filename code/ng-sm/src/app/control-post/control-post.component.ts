import { Component, OnInit } from '@angular/core';
import { Map, Control } from 'leaflet';
import { LLControl } from '../map/ng-leaflet';
import { MapService } from '../map.service';

@Component({
  selector: 'app-control-post',
  templateUrl: './control-post.component.html',
  styleUrls: ['./control-post.component.scss']
})
export class ControlPostComponent implements OnInit, LLControl {

  control: Control;
  map: Map;

  public editMode = false;

  constructor(private mapService: MapService) { }

  setEditMode(isEdit: boolean) {
    this.editMode = isEdit;
    if(this.editMode) {}
    else {}
    // this.mapService.addMarkerEdit();
  }

  ngOnInit(): void {
  }

}
