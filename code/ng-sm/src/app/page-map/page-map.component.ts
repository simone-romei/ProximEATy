import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';

@Component({
  selector: 'app-page-map',
  templateUrl: './page-map.component.html',
  styleUrls: ['./page-map.component.scss']
})
export class PageMapComponent implements OnInit {

  public showFormPort = false;

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
  }

}
