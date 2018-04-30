import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WalletService } from '../../services';
import { Wallet } from '../../app.datatypes';
import { MatDialog } from '@angular/material';
import { CreateWalletComponent } from '../create-wallet/create-wallet.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() onSelect = new EventEmitter();

  wallets: Wallet[];

  constructor(
    public dialog: MatDialog,
    private walletService: WalletService,
  ) { }

  ngOnInit() {
    this.walletService.wallets.subscribe(wallets => {
      this.wallets = wallets;
      if (this.wallets && this.wallets[0]) {
        this.open(this.wallets[0]);
      }
    });
  }

  createWallet() {
    let dialogRef = this.dialog.open(CreateWalletComponent, { width: '700px' });
    let __this = this;
    dialogRef.afterClosed().subscribe(result => {
      //Refresh the wallets
      __this.walletService.loadData();
    });
  }

  open(wallet: Wallet) {
    this.walletService.unsetCurrentKittyDetail();
    this.onSelect.emit(wallet);
  }
}
