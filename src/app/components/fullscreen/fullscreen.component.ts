import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.component.html',
  styleUrls: ['./fullscreen.component.scss']
})
export class FullscreenComponent implements OnInit {

  kitty: any;
  constructor(private walletService: WalletService, private dialogRef:MatDialogRef<FullscreenComponent>) { }

  ngOnInit() {
    this.walletService.currentKitty.subscribe(kitty => {
      this.kitty = kitty;
    });
  }

  kittyImage() {
    return this.walletService.kittyImage(this.kitty.Info.ID);
  }

  doClose() {
    this.dialogRef.close();
  }

}
