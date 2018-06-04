import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Wallet, Kitty } from '../app.datatypes';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import { environment } from '../../environments/environment';

@Injectable()
export class WalletService {

  private pageSize:number = 10;

  private walletsSubject: Subject<Wallet[]> = new BehaviorSubject<Wallet[]>([]);
  private currentEntrySubject: Subject<any> = new BehaviorSubject<any>({});
  private currentKittySubject: Subject<any> = new BehaviorSubject<any>({});
  private currentItemSubject: Subject<any> = new BehaviorSubject<any>({});
  private currentKittyDetailSubject: Subject<any> = new BehaviorSubject<any>(false);

  private foodWalletSubject: Subject<any> = new BehaviorSubject<any>({});
  private inventoryWalletSubject: Subject<any> = new BehaviorSubject<any>({});

  get wallets(): Observable<Wallet[]> {
    return this.walletsSubject.asObservable();
  }

  get currentEntry(): Observable<any> {
    return this.currentEntrySubject.asObservable();
  }

  get currentKitty(): Observable<any> {
    return this.currentKittySubject.asObservable();
  }

  get currentItem(): Observable<any> {
    return this.currentItemSubject.asObservable();
  }

  get currentKittyDetail(): Observable<any> {
    return this.currentKittyDetailSubject.asObservable();
  }

  get currentfoodWallet(): Observable<any> {
    return this.foodWalletSubject.asObservable();
  }

  get currentinventoryWallet(): Observable<any> {
    return this.inventoryWalletSubject.asObservable();
  }

  kittyImage(kitty_id:any): string {
     return environment.walletUrl + "/image/" + kitty_id;
  }

  constructor(
    private apiService: ApiService,
  ) {
    this.loadData();
  }

  setCurrentEntry(entry: any){
    this.currentEntrySubject.next(entry);
  }

  setCurrentKitty(kitty: any){
    this.currentKittySubject.next(kitty);
  }

  setCurrentItem(item: any){
    this.currentItemSubject.next(item);
  }

  setCurrentKittyDetail(kitty: any){
    this.currentKittyDetailSubject.next(kitty);
  }

  unsetCurrentKittyDetail(){
    this.currentKittyDetailSubject.next(false);
  }

  getWalletData(label:string, password:any, page:number = 1) {

    //Get the address count for the label
    let aCount = this.getAddressCount(label);
    let pagingData = this.getPagingData(aCount, page);

     this.apiService.postWalletsGet({ label: label, password: password, startIndex: pagingData.startIndex, pageSize: pagingData.pageSize }).subscribe(wallet => {
       //Update the local stored address count
      localStorage.setItem(wallet.meta.label, wallet.total_count + "");
       wallet.paging = pagingData;
       this.updateWallet(this.addKitties(wallet));
     }, 
     error => {
       alert(error.statusText);
     });
  }

  addAddress(label:string)
  {
    let aCount = this.getAddressCount(label);
    aCount = aCount + 1;

    //Needs to be stored as a string in localstorage, not a number.
    localStorage.setItem(label, aCount + "");
  }

  private getAddressCount(label:string):number
  {
    let aCount = parseInt(localStorage.getItem(label));

    if (!aCount)
    {
      aCount = 1;
    }
    return aCount;
  }

  private getPagingData(aCount: number, page: number = 1)
  {

    let pageSize = 0;

    if (aCount < this.pageSize)
    {
      pageSize = aCount;
    }
    else if (aCount > this.pageSize && page == 1)
    {
      pageSize = this.pageSize;
    }
    else
    {
      pageSize = Math.min(this.pageSize - (this.pageSize * page) + aCount, this.pageSize);// aCount - (this.pageSize * page - 1);
    } 
    return {
      total: aCount,
      perPage: this.pageSize,
      page: page,
      startIndex: this.pageSize * (page - 1),
      pageSize: pageSize
    }
  }

  updateWallet(wallet:any) {
    this.wallets.take(1).subscribe(wallets => { 
       this.findWalletByLabel(wallet.meta.label).then(
        found_wallet => {
          let index = wallets.indexOf(found_wallet);
          wallets[index] = Object.assign(new Wallet(), wallet);
          this.setWallets(wallets);
        },
        not_found => {
          wallets.push(Object.assign(new Wallet(), wallet));
          this.setWallets(wallets);
        }
        );
    });
  }

  transferKitty(kitty_id: any, to_address: any, secret_key: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.apiService.transferKitty(kitty_id, to_address, secret_key).then(result => {
        resolve(true);
      });
    });
  }

  private setWallets(wallets:Array<any>)
  {
    //Sort the wallet
    wallets.sort(function(a:any,b:any){
      if (a.meta.type == "kittycash")
      {
        return 0;
      }
      else
      {
        return 1;
      }
    });

    this.walletsSubject.next(wallets);
  }

  private findWalletByLabel(label:string):Promise<any>
  {
    return new Promise<any>((resolve, reject) => {
      this.wallets.take(1).subscribe(wallets => { 
        let wallet:any = false;
        for (var i = 0; i < wallets.length; i++)
        {
          if (wallets[i].meta.label == label)
          {
            wallet = wallets[i];
          }
        }
        if (wallet)
        {
          resolve(wallet);
        }
        else
        {
          reject("Wallet not found");
        }
      });
    });
  }

  addKitties(wallet:any) {

      for (let i = 0; i < wallet.entries.length; i++)
      {
        let entry = wallet.entries[i];

        if (!entry.kitties)
        {
          entry.kitties = [];
        }

        if (i > 0)
        {
          entry.collapse = true;
        }
        
        this.apiService.getAddressDetails({address: entry.address}).subscribe((data:any) => {
          if (data && data.Addresses && data.Addresses[entry.address])
          {
            let address = data.Addresses[entry.address];
            entry.kitties = address;
          }
          
        });
      }

    return wallet;    
  }

 
  loadData() {
    this.apiService.getWalletsList().subscribe(api_wallets => {

      let wallets:Array<any> = [];
      api_wallets.map((api_wallet:any) => {

        if (api_wallet.encrypted && api_wallet.locked)
        {
          let wallet = {
            meta: api_wallet,
            entries: new Array()
          };

          wallet.meta.type = "kittycash";
          wallets.push(Object.assign(new Wallet(), wallet));
        }
        else
        {
          this.getWalletData(api_wallet.label, false);
        }
      });

      //Add in fake inventory and food wallets
      let inventory = {
        paging: this.getPagingData(3),
        meta: {
          encrypted: false,
          label: "Inventory",
          seed: "fake seed here",
          timestamp: 1524741046757150200,
          type: "inventory",
          version: 0
        },
        entries: [
          {
            address: "fake_inventory_address",
            public_key: "fake_public_key",
            private_key: "fake_private_key",
            kitties: [
              {
                image: 'assets/inventory/red_dress.svg',
                quantity: 10,
                name: 'Red Dress',
                description: 'Brings all the boy kitties to the yard',
                type: 'inventory'
              },
              {
                image: 'assets/inventory/spartan_shield.svg',
                quantity: 10,
                name: 'Spartan Shield',
                description: 'As a true warrior come back with your shield or on it.',
                type: 'inventory'
              },
              {
                image: 'assets/inventory/spartan_helmet.svg',
                quantity: 10,
                name: 'Spartan Helmet',
                description: 'Tonight we dine in hell!',
                type: 'inventory'
              }
            ] 
          }
        ]
      };

      let food = {
        paging: this.getPagingData(4),
        meta: {
          encrypted: false,
          label: "Food",
          seed: "fake seed here",
          timestamp: 1524741046757150200,
          type: "food",
          version: 0
        },
        entries: [
          {
            address: "fake_food_address",
            public_key: "fake_public_key",
            private_key: "fake_private_key",
            kitties: [
              {
                image: 'assets/food/mr_tuna.svg',
                quantity: 10,
                name: 'Mr Tuna Kitty Food',
                description: 'Fresh from the can!',
                type: 'food'
              },
              {
                image: 'assets/food/goldfish.svg',
                quantity: 10,
                name: 'Goldfish',
                description: 'Eat the beloved family pet',
                type: 'food'
              },
              {
                image: 'assets/food/fresh_fish.svg',
                quantity: 10,
                name: 'Fresh Fish on a Plate',
                description: '5 star meal!',
                type: 'food'
              },
              {
                image: 'assets/food/marihuana.png',
                quantity: 2,
                name: 'Marihuana',
                description: 'Increases HP by 50 & Decreases long term Happiness by 20',
                type: 'food'
              }
            ] 
          }
        ]
      };


      wallets.push(Object.assign(new Wallet(), inventory));
      wallets.push(Object.assign(new Wallet(), food));
      this.setWallets(wallets);

      this.foodWalletSubject.next(food);
      this.inventoryWalletSubject.next(inventory);

    });
  }
}
