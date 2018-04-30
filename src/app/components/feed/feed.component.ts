import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  availableFood:Array<object>;
  kitty: any;
  constructor(private walletService: WalletService, private dialogRef:MatDialogRef<FeedComponent>) { 
  	this.availableFood = [
  		{name: "Fishcake"},
  		{name: "Meowmix"}
  	]
  }

  ngOnInit() {
    this.walletService.currentKitty.subscribe(kitty => {
      this.kitty = kitty;
    });
  }

  doConfirmFeed() {
  	alert("Sorry, feeding isn't ready yet.");
  	this.dialogRef.close();
  }

  doClose() {
    this.dialogRef.close();
  }

}
