import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import { WalletService } from './wallet.service';
import { Wallet } from '../app.datatypes';

@Injectable()
export class StateService {

  wallets: Wallet[];
  private selectedWalletSubject: Subject<any> = new BehaviorSubject<any>(false);
  private walletSet: boolean = false;
  private waitingWallet: any = false;
  private currentWalletLabel: string;

  get currentWallet(): Observable<any> {
    return this.selectedWalletSubject.asObservable();
  }

  constructor(private walletService: WalletService) {
    this.walletService.wallets.subscribe(wallets => {
      this.wallets = wallets;

      //Check if an initial wallet has been set from load and make sure that it is a kitty wallet, not a food or inventory wallet
      if (!this.walletSet && wallets && wallets.length > 0 && wallets[0].meta && wallets[0].meta.type == "kittycash")
      {
        this.setWallet(wallets[0]);
      }
      else if (this.waitingWallet) //If there is a label waiting, once the data loads find it and set as the current wallet
      {
        let wallet = this.findWalletByLabel(this.waitingWallet);
        if (wallet)
        {
          this.waitingWallet = false;
          this.setWallet(wallet);
        }
      }
      else if (this.currentWalletLabel)
      {
        let wallet = this.findWalletByLabel(this.currentWalletLabel);
        if (wallet)
        {
          this.setWallet(wallet);
        }
      }
    });
  }

  private findWalletByLabel(label:string)
  {
    for (let i = 0; i < this.wallets.length; i++)
    {
      let wallet = this.wallets[i];

      if (wallet && wallet.meta && wallet.meta.label && wallet.meta.label == label)
      {
          return wallet;        
      }
    }

    return false;
  }

  setWallet(wallet: any)
  {
    this.walletSet = true;
    this.currentWalletLabel = wallet.meta.label;
    this.walletService.unsetCurrentKittyDetail();
    this.selectedWalletSubject.next(wallet);
  }

  setWalletByLabel(label: string){
    this.waitingWallet = label;
    this.walletService.loadData();
  }

}
