import { Injectable } from '@angular/core';
import { Wallet, WalletsGetRequest, WalletsNewRequest, AddressGetRequest, Address } from '../app.datatypes';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RequestOptions } from '@angular/http';

@Injectable()
export class ApiService {

  private url = 'http://127.0.0.1:6148/api/';

  constructor(
    private httpClient: HttpClient,
  ) { }

  getAddressDetails(request: AddressGetRequest): Observable<Address>{
    return this.get("iko/address/" + request.address, {type: 'json'});
  }
  
  postWalletsGet(request: WalletsGetRequest): Observable<Wallet> {
    return this.post('wallets/get', request);
  }

  getWalletsList(): Observable<Wallet[]> {
    return this.get('wallets/list').map(response => response.wallets)
      .flatMap(wallets => Observable.forkJoin(wallets.map((wallet:any) => this.postWalletsGet({ label: wallet.label }))));
  }

  getWalletsSeed(): Observable<string> {
    return this.post('wallets/seed').map(response => response.seed);
  }

  postWalletsNew(request: WalletsNewRequest): Observable<Wallet> {
    return this.post('wallets/new', request);
  }

  private get(url: any, params:any = null, options:any = {}) {
    return this.httpClient.get(this.getUrl(url, params))
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  private post(url:any, params:any = {}, options: any = {}) {
    return this.httpClient.post(this.getUrl(url), this.getQueryString(params), this.getOptions())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  private getOptions() {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    return { headers: headers };
  }

  private getQueryString(parameters:any = null) {
    if (!parameters) {
      return '';
    }

    return Object.keys(parameters).reduce((array,key) => {
      array.push(key + '=' + encodeURIComponent(parameters[key]));
      return array;
    }, []).join('&');
  }

  private getUrl(url:any, options:any = null) {
    return this.url + url + '?' + this.getQueryString(options);
  }
}
