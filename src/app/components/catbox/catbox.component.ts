import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Kitty } from '../../app.datatypes';
import { MatDialog } from '@angular/material';
import { FeedComponent } from '../feed/feed.component';
import { WalletService } from '../../services';

@Component({
  selector: 'cat-box',
  templateUrl: './catbox.component.html',
  styleUrls: ['./catbox.component.scss']
})
export class CatBoxComponent implements OnInit {

  constructor(private walletService: WalletService, public dialog: MatDialog) { }

  isLoading: boolean;

  ngOnInit() { }

  showToDo() {
    alert("Still ToDo");
  }

  showKittyDetails() {
    this.walletService.setCurrentEntry(this.entry);
    this.walletService.setCurrentKittyDetail(this.cat);
  }
  doFeed() {
    this.walletService.setCurrentKitty(this.cat);
    let dialogRef = this.dialog.open(FeedComponent, { width: '700px' });
  }

  boxImage(kitty_id:number) {
    return "assets/fake_cdn/box-" + ((kitty_id % 5) + 1) + ".png";
  }

  kittyImage() {
    return "https://staging-api.kittycash.com/v1/image/" + this.cat.Info.ID;
  }

  removeDetails() {
    this.cat.details = false;
  }

  @Input() cat: Kitty;
  @Input() entry: any;
}

