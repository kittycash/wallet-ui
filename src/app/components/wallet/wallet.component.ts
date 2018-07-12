import { Component, Input, OnInit } from '@angular/core';
import { Wallet } from '../../app.datatypes';
import { WalletService, ApiService } from '../../services';
import { MatDialog } from '@angular/material';
import { AddressPanelComponent } from './address-panel/address-panel.component';
import { BreedComponent } from '../breed/breed.component';
import { FeedComponent } from '../feed/feed.component';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  @Input() wallet: Wallet;
  kittyDetail: any;
  walletPassword: any = '';

  constructor(private walletService: WalletService, 
              private apiService: ApiService,
              public dialog: MatDialog) { }

  ngOnInit() {

  	this.walletService.currentKittyDetail.subscribe(kitty => {
      this.kittyDetail = kitty;
    });

    this.walletService.setCurrentEntry(this.wallet.entries[0]);
  }

  unlockWallet(wallet:any){
    this.walletService.getWalletData(wallet.meta.label, this.walletPassword);
  }

  handleKeyDown(event:any, wallet:any) {
    if(event.keyCode == 13) {
       this.unlockWallet(wallet);
    }
  }

  walletLocked(wallet:any){

    if (wallet && wallet.meta && wallet.meta.type == 'kittycash' && wallet.meta.encrypted && wallet.meta.locked)
    {
      return true;
    }

    return false;
  }

  addAddress(wallet:any) {

    const request:any = {
      label: wallet.meta.label,
      aCount: wallet.total_count + 1,
    };
    let __this = this;
    this.apiService.postAddAddress(request).subscribe(response => {
      __this.walletService.addAddress(wallet.meta.label);
      __this.walletService.getWalletData(wallet.meta.label, false, wallet.paging.page);
    });

  }

  getPage(page: number, wallet: any){
    this.walletService.getWalletData(wallet.meta.label, false, page);
  }

  toggleCollapse(entry:any) {
    entry.collapse = !entry.collapse;
  }

  doBreed(entry:any) {
    this.walletService.setCurrentEntry(entry);
    let dialogRef = this.dialog.open(BreedComponent, { width: '700px' });
    let __this = this;
    dialogRef.afterClosed().subscribe(result => {
      //Refresh the wallets
      // __this.walletService.loadData();
    });
  }

  doFeed(kitty:any) {
    this.walletService.setCurrentKitty(kitty);
    let dialogRef = this.dialog.open(FeedComponent, { width: '700px' });
    let __this = this;
    dialogRef.afterClosed().subscribe(result => {
      //Refresh the wallets
      // __this.walletService.loadData();
    });
  }

  doShowAddress(entry:any) {
    this.walletService.setCurrentEntry(entry);
    let dialogRef = this.dialog.open(AddressPanelComponent, { width: '700px' });
  }
}
