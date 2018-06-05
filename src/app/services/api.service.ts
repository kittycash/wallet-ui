import { Injectable } from '@angular/core';
import { Wallet, WalletsGetRequest, WalletsNewRequest, AddressGetRequest, Address } from '../app.datatypes';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getAddressDetails(request: AddressGetRequest): Observable<Address>{
    return this.get("balance", {address: request.address}, {});
  }
  
  postWalletsGet(request: WalletsGetRequest): Observable<Wallet> {
    return this.post('wallets/get_paginated', request, {});
  }

  postAddAddress(request: WalletsGetRequest): Observable<Wallet> {
    return this.post('wallets/get', request, {});
  }

  getWalletsList(): Observable<Wallet[]> {
    return this.get('wallets/list', {}, {}).map(response => response.wallets)
  }

  getWalletsSeed(): Observable<string> {
    return this.post('wallets/seed', {}, {}).map(response => response.seed);
  }

  postWalletsNew(request: WalletsNewRequest): Observable<Wallet> {
    return this.post('wallets/new', request, {});
  }

  transferKitty(kitty_id:any, to_address:any, secret_key:any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.createSignature(kitty_id, to_address, secret_key).then(signature => {

        this.post('https://api.kittycash.com/v1/transfer', {kitty_id: kitty_id, to: to_address, sig: signature}, {}, true).subscribe(transfer => {
          if (transfer && transfer.success)
          {
            resolve(true);
          }
          else
          {
            reject(false);
          }
        });
      });
    });
  }

  createSignature(kitty_id:any, to_address:any, secret_key:any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.lastTransfer(kitty_id).subscribe(transfer => {
         let signature = null;

         if (transfer && transfer.transaction && transfer.transaction.sig)
         {
           signature = transfer.transaction.sig;
         }
        
        this.post('tools/sign_transfer_params', {kittyID: kitty_id, lastTransferSig: signature, toAddress: to_address, secretKey: secret_key}, {}).subscribe(sig => {
          resolve(sig.sig);
        });
          
      }, err => {
        this.post('tools/sign_transfer_params', {kittyID: kitty_id, toAddress: to_address, secretKey: secret_key}, {}).subscribe(sig => {
          resolve(sig.sig);
        });
      });
    });
  }

  lastTransfer(kitty_id:any): Observable<any> {
    return this.get('last_transfer', {kitty_id: kitty_id}, {});
  }

  private get(url: any, params:any = null, options:any = {}) {
    return this.httpClient.get(this.getUrl(url, params))
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  private post(url:any, params:any = {}, options: any = {}, override: boolean = false) {

    let actual_url = this.getUrl(url, params);

    if (override)
    {
      actual_url = url;
    }

    let p = this.getQueryString(params);

    if (override)
    {
      p = params;
    }

    return this.httpClient.post(actual_url, p, this.getOptions(override))
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  private getOptions(override: boolean = false) {

    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    if (override)
    {
      headers = {
        'Content-Type': 'application/json',
      };
    }

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
      return environment.walletUrl + url + '?' + this.getQueryString(options);    
  }
}
