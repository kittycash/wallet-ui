import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {

  kitty: any;
  entry: any;
  sendKittyForm: FormGroup;

  constructor(private walletService: WalletService, 
              private dialogRef:MatDialogRef<SendComponent>,
              private formBuilder: FormBuilder) { 
  	
  }

  ngOnInit() {
    this.walletService.currentEntry.subscribe(entry => {
      this.entry = entry;
    });
    this.walletService.currentKitty.subscribe(kitty => {
      this.kitty = kitty;

      this.sendKittyForm = this.formBuilder.group({
          toAddress: ['', Validators.required],
          kitty_id: [this.kitty.Info.ID, Validators.required]
      });
    });
  }

  doSend() {
    this.walletService.transferKitty(this.sendKittyForm.value.kitty_id, this.sendKittyForm.value.toAddress, this.entry.secret_key).then(result => {
      this.walletService.loadData();
      this.dialogRef.close();
    });
  }

  doClose() {
    this.dialogRef.close();
  }

  kittyImage() {
    return this.walletService.kittyImage(this.kitty.Info.ID);
  }

}
