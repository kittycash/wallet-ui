import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-equip',
  templateUrl: './equip.component.html',
  styleUrls: ['./equip.component.scss']
})
export class EquipComponent implements OnInit {

  item: any;
  constructor(private walletService: WalletService, private dialogRef:MatDialogRef<EquipComponent>) {  }

  ngOnInit() {
    this.walletService.currentItem.subscribe(item => {
      this.item = item;
    });
  }

  doConfirmEquip() {
  	alert("Sorry, equiping items isn't ready yet.");
  	this.dialogRef.close();
  }

  doConfirmFeed() {
    alert("Sorry, feeding isn't ready yet.");
    this.dialogRef.close();
  }

  doClose(){
    this.dialogRef.close();
  }

}
