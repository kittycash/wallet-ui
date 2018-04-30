import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Kitty } from '../../app.datatypes';
import { MatDialog } from '@angular/material';
import { EquipComponent } from '../equip/equip.component';
import { WalletService } from '../../services';

@Component({
  selector: 'item-box',
  templateUrl: './itembox.component.html',
  styleUrls: ['./itembox.component.scss']
})
export class ItemBoxComponent implements OnInit {

  constructor(private walletService: WalletService, public dialog: MatDialog) { }

  isLoading: boolean;

  ngOnInit() { }

  doEquip() {
    this.walletService.setCurrentItem(this.item);
    let dialogRef = this.dialog.open(EquipComponent, { width: '400px' });
  }

  doFeed() {
    this.walletService.setCurrentItem(this.item);
    let dialogRef = this.dialog.open(EquipComponent, { width: '400px' });
  }

  @Input() item: any;
}

