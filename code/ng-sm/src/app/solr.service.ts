import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpParameterCodec, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';

import { environment } from './../environments/environment';
import { Post } from './model';

export class SolrSearch {}

export class SolrResult {
  constructor(public search: SolrSearch) {}
}

export class CustomHttpUrlEncodingCodec implements HttpParameterCodec {
    encodeKey(k: string): string { return this.standardEncoding(k); }
    encodeValue(v: string): string { return this.standardEncoding(v); }
    decodeKey(k: string): string { return decodeURIComponent(k); }
    decodeValue(v: string) { return decodeURIComponent(v); }
    standardEncoding(v: string): string {
      return encodeURIComponent(v);
    }
}

@Injectable({
  providedIn: 'root'
})
export class SolrService {

  private sub: Subscription = null;
  public obsSearch = new BehaviorSubject<SolrSearch>(null);
  public obsResult = new BehaviorSubject<SolrResult>(null);

  constructor(private http: HttpClient) { }

  public searchByDefault(): Promise<SolrResult> {
    const search = new SolrSearch();
    return this.doSearch(search);
  }

  public doUpdate(post: Post): Promise<void> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post<any>(environment.solr.endpoint + environment.solr.core + "/update/json/docs?commit=true", post, { headers })
    .toPromise();
  }

  public doSearch(search: SolrSearch): Promise<SolrResult> {
    this.obsSearch.next(search);
    const params = this.parseSearch(search);

    return this.http.get<any>(environment.solr.endpoint + environment.solr.core + "/select", { params })
      .pipe(
        map(response => this.parseResult(search, response)),
        tap(result => this.obsResult.next(result))
    ).toPromise();
  }

  private parseSearch(search: SolrSearch): HttpParams {
    let params = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()}).set('q','*:*');
    return params;
  }

  private parseResult(search: SolrSearch, response: any): SolrResult {
    const result = new SolrResult(search);
    return result;
  }

}
