import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Wallet, Kitty } from '../app.datatypes';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WalletService {

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

  loadData() {
    this.apiService.getWalletsList().subscribe(wallets => {
      let promises = [];
   
       wallets
      .map((wallet:any) => { return wallet.entries })
      .map((entries) => {
        for (let i = 0; i < entries.length; i++)
        {
          let entry = entries[i];

          if (!entry.kitties)
          {
            entry.kitties = [];
          }

          //Add a fake kitties

          let kitty = new Kitty();
          kitty.kitty_id = 1;
          kitty.name = "Shitrock";
          kitty.breed = "Tabby";
          kitty.bio = "Shitrock lives in sunnyvale trailer park";
          kitty.box_open = true;
          kitty.image = "assets/cats/fake1.png";
          entry.kitties.push(kitty);

          let kitty2 = new Kitty();
          kitty2.kitty_id = 2;
          kitty2.name = "Steve French";
          kitty2.breed = "Tabby";
          kitty2.bio = "If you love something, let it free";
          kitty2.box_open = true;
          kitty2.image = "assets/cats/fake2.png";
          entry.kitties.push(kitty2);

          //Don't know how to get actual kitties into the wallet, but this will inject them to the object if they are there
          // this.apiService.getAddressDetails({address: entry.address}).subscribe((data) => {
          //   entry.kitties = data.kitties;
          // });
        }
      });


      //Add in fake inventory and food wallets
      let inventory = {
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
      this.walletsSubject.next(wallets);

      this.foodWalletSubject.next(food);
      this.inventoryWalletSubject.next(inventory);
      console.log(wallets);
    });
  }
}
