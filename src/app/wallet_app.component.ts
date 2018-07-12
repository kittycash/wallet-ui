import { Component, EventEmitter } from '@angular/core';
import { Wallet } from './app.datatypes';
import { StateService, TraitService } from './services';

@Component({
  selector: 'app-wallet-root',
  templateUrl: './wallet_app.component.html',
  styleUrls: ['./wallet_app.component.scss']
})
export class WalletAppComponent {

  wallet: Wallet;

  constructor(
              private stateService: StateService,
              private traitService: TraitService
             ) { }

  ngOnInit() {
    this.stateService.currentWallet.subscribe(wallet => {
      this.wallet = wallet;
    });
  }

  exportWallet() {
    console.log("Wallet export!");
    alert("Wow!");
  }
}
