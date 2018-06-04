import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-breed',
  templateUrl: './breed.component.html',
  styleUrls: ['./breed.component.scss']
})
export class BreedComponent implements OnInit {

  constructor(private walletService: WalletService, private dialogRef:MatDialogRef<BreedComponent>) { }
  
  selectedKitties: Array<any> = [];
  entry: any;
  
  ngOnInit() {
  	this.walletService.currentEntry.subscribe(entry => {
      this.entry = entry;
    });
  }

  doConfirmBreed() {
  	alert("Sorry, breeding isn't ready yet.");
  	this.dialogRef.close();
  }

  kittySelected(kitty: any){
    let index = this.selectedKitties.indexOf(kitty);

    return index > -1;
  }

  toggleKitty(kitty: any) {
    let index = this.selectedKitties.indexOf(kitty);

    if (index > -1)
    {
      this.selectedKitties.splice(index, 1);
    }
    else
    {
      this.selectedKitties.push(kitty);
    }

    if (this.selectedKitties.length > 2)
    {
      this.selectedKitties.shift();
    }
  }

  doClose() {
    this.dialogRef.close();
  }

  kittyImage(kitty_id:any):string {
    return this.walletService.kittyImage(kitty_id);
  }

}
