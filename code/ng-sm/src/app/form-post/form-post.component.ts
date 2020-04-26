import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SolrService } from '../solr.service';
import { Post, Place } from '../model';
import { GeoService } from '../geo.service';
import { MapService } from '../map.service';

@Component({
  selector: 'app-form-post',
  templateUrl: './form-post.component.html',
  styleUrls: ['./form-post.component.scss']
})
export class FormPostComponent implements OnInit {

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, private solrService: SolrService, private mapService: MapService) { }

  get post(): Post {
    const post = <Post> {};
    post.id = this.form.get('id').value;
    post.msg = this.form.get('msg').value;
    post.place = this.form.get('place').value;
    return post;
  }

  onSubmit() {
    if(this.form.valid) {
      const post = this.post;

      if(!post.place) {

      }


      console.log("onSubmit");
      // this.geoService.resolvePosition().then(
      //   place => console.log("resolved place", place)
      // );
    } else {
      console.warn("onSubmit", 'not valid');
    }
    // this.solrService.doUpdate(this.post);
  }

  ngOnInit(): void {
    // Create Form
    this.form = this.formBuilder.group({
      id: <string>null,
      msg: <string>null,
      place: <Place>null
    });
  }

}
