import { Component } from '@angular/core';
import { Wallet } from './app.datatypes';

@Component({
  selector: 'app-wallet-root',
  templateUrl: './wallet_app.component.html',
  styleUrls: ['./wallet_app.component.scss']
})
export class WalletAppComponent {

  wallet: Wallet;

  handleOnSelect(wallet: Wallet) {
    this.wallet = wallet;
  }
}
