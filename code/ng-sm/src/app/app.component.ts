import { Component, OnInit } from '@angular/core';
import { SolrService } from './solr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private solrService: SolrService) {}

  ngOnInit(): void {
    if(this.solrService.obsResult.getValue() == null) {
      this.solrService.searchByDefault();
    }
  }

}
