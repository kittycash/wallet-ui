import { Component, OnInit } from '@angular/core';
import { WalletService, TraitService } from '../../services';
import { MatDialog } from '@angular/material';
import { AddressPanelComponent } from '../wallet/address-panel/address-panel.component';
import { BreedComponent } from '../breed/breed.component';
import { EquipComponent } from '../equip/equip.component';
import { SendComponent } from '../send/send.component';
import { FullscreenComponent } from '../fullscreen/fullscreen.component';

@Component({
  selector: 'app-kitten-detail',
  templateUrl: './kitten-detail.component.html',
  styleUrls: ['./kitten-detail.component.scss']
})
export class KittenDetailComponent implements OnInit {

  kitty: any;
  entry: any;
  foodWallet: any;
  inventoryWallet: any;
  traits: any;

  constructor(private walletService: WalletService, 
              public dialog: MatDialog,
              private traitService: TraitService) { }

  ngOnInit() {
  	this.walletService.currentKittyDetail.subscribe(kitty => {
      this.kitty = kitty;

      this.traits = this.traitService.lookup(this.kitty.Phenotype);
    });

    this.walletService.currentEntry.subscribe(entry => {
      this.entry = entry;
    });

    this.walletService.currentfoodWallet.subscribe(wallet => {
      this.foodWallet = wallet;
    });

    this.walletService.currentinventoryWallet.subscribe(wallet => {
      this.inventoryWallet = wallet;
    });

  }

  doShowAddress() {
    let dialogRef = this.dialog.open(AddressPanelComponent, { width: '700px' });
  }

  doBreed() {
    let dialogRef = this.dialog.open(BreedComponent, { width: '700px' });
  }

  doBuy() {
  	alert("Marketplace coming soon!");
  }

  doSend() {
    this.walletService.setCurrentKitty(this.kitty);
    let dialogRef = this.dialog.open(SendComponent, { width: '700px' });
  }

  doEquip(item:any) {
    this.walletService.setCurrentItem(item);
    let dialogRef = this.dialog.open(EquipComponent, { width: '400px' });
  }

  doFeed(item:any) {
    this.walletService.setCurrentItem(item);
    let dialogRef = this.dialog.open(EquipComponent, { width: '400px' });
  }

  doFullscreen() {
    this.walletService.setCurrentKitty(this.kitty);
    let dialogRef = this.dialog.open(FullscreenComponent, {width: '700px' });
  }

  traitImage(icon:string) {
    return this.traitService.traitImage(icon);
  }
  
  kittyImage() {
    return this.walletService.kittyImage(this.kitty.Info.ID);
  }

}
