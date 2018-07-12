import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../../services';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-address-panel',
  templateUrl: './address-panel.component.html',
  styleUrls: ['./address-panel.component.scss']
})
export class AddressPanelComponent implements OnInit {

  QRType: string = 'img';
  entry: any;
  copied: boolean = false;

  constructor(private walletService: WalletService, private dialogRef:MatDialogRef<AddressPanelComponent>) { }

  ngOnInit() {
  	 this.walletService.currentEntry.subscribe(entry => {
      this.entry = entry;
    });
  }

  closeWindow() {
    this.dialogRef.close();
  }

  copyToClipboard() {

    let __this = this;
    this.copied = true;
    if (window['require'])
    {
      const {clipboard} = window['require']('electron');
      clipboard.writeText(this.entry.address);
    }

    setTimeout(function(){
      __this.copied = false;
    }, 2000);
  }

}
