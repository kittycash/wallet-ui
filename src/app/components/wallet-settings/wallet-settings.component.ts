import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-wallet-settings',
  templateUrl: './wallet-settings.component.html',
  styleUrls: ['./wallet-settings.component.scss']
})
export class WalletSettingsComponent implements OnInit {

   wallet: any;
   wallet_changes: any = {};

  constructor(private walletService: WalletService, 
              private dialogRef:MatDialogRef<WalletSettingsComponent>) { 
  	
  }

  ngOnInit() {
    this.walletService.currentWallet.subscribe(wallet => {
      this.wallet = wallet;
      console.log(this.wallet);
      this.wallet_changes = {
        label: this.wallet.meta.label,
        encrypted: this.wallet.meta.encrypted,
        password: ''
      }
    });
  }

  updateWallet() {

    let __this = this;

    var promises = [];

    if (this.wallet.meta.label != this.wallet_changes.label)
    {
      //Rename the wallet
      promises.push(this.walletService.renameWallet(this.wallet, this.wallet_changes.label));
    }

    if (!this.wallet.meta.encrypted && this.wallet_changes.encrypted && this.wallet_changes.password && this.wallet_changes.password.length > 0)
    {
       promises.push(this.walletService.encryptWallet(this.wallet, this.wallet_changes.password));
    }

    //Run all the promises

    Promise.all(promises).then(function(result){
      __this.walletService.loadData();
      __this.dialogRef.close();
    }).catch(function(err){
      alert(err);
      __this.dialogRef.close();
    });
    
  }

  doClose() {
    this.dialogRef.close();
  }

}
