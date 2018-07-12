import { Component, EventEmitter, OnInit, Output, HostListener } from '@angular/core';
import { WalletService, StateService } from '../../services';
import { Wallet } from '../../app.datatypes';
import { MatDialog } from '@angular/material';
import { CreateWalletComponent } from '../create-wallet/create-wallet.component';
import { WalletSettingsComponent } from '../wallet-settings/wallet-settings.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() onSelect = new EventEmitter();

  wallets: Wallet[];
  currentWallet: any;

  @HostListener('document:refreshButtonClick', ['$event'])
    onRefresh(ev:any) {
      ev.preventDefault();
      //Do refresh
      this.walletService.loadData();
  }

  @HostListener('document:exportWallet', ['$event'])
    onExport(ev:any) {
      console.log("Let's export some wallets!");
      console.log(ev);
      ev.preventDefault();
      //Do refresh
     // this.walletService.loadData();
  }

  constructor(
    public dialog: MatDialog,
    private walletService: WalletService,
    private stateService: StateService
  ) { }

  ngOnInit() {
    this.walletService.wallets.subscribe(wallets => {
      this.wallets = wallets;
    });

    this.stateService.currentWallet.subscribe(wallet => {
      this.currentWallet = wallet;

    });
  }

  walletSettings(wallet: any)
  {
    this.walletService.setCurrentWallet(wallet);
    let dialogRef = this.dialog.open(WalletSettingsComponent, { width: '700px' });
    let __this = this;
    dialogRef.afterClosed().subscribe(result => {
   
    });
  }

  createWallet() {
    let dialogRef = this.dialog.open(CreateWalletComponent, { width: '700px' });
    let __this = this;
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  open(wallet: Wallet) {
    this.stateService.setWallet(wallet);
  }
}
