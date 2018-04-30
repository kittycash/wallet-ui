import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-wallet',
  templateUrl: './create-wallet.component.html',
  styleUrls: ['./create-wallet.component.scss']
})
export class CreateWalletComponent implements OnInit {
  new_wallet: any;
  seed: string;
  fake_seeds: Array<string>;
  step = 1;

  constructor(
    private apiService: ApiService,
    private dialogRef:MatDialogRef<CreateWalletComponent>
  ) { }

  ngOnInit() {

  }

  handleStepOne(values: any) {
    this.new_wallet = values;
    this.step = 2;
  }

  handleStepTwo() {
    this.apiService.getWalletsSeed().subscribe(
      seed => {
        if (seed) {
          this.seed = seed;
          this.step = 3;
        }
      }
    )
  }

  handleStepThree() {
    //Get another seed to feed with fake data
    this.apiService.getWalletsSeed().subscribe(
      fake_seed => {
        if (fake_seed) {
          let fake_seeds = this.uniq(this.seed.split(" ").concat(fake_seed.split(" ")));
           
          if (fake_seeds.length >= 16)
          {
            this.fake_seeds = this.shuffle(fake_seeds.slice(0, 16));
            this.step = 4;
          }
          else
          {
            alert("Error generating fake seeds");
            return false;
          }
          
        }
      }
    )
  }

  private uniq(a:any) {
    var seen = {};
    return a.filter(function(item:any) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
  }

  private shuffle(array:any) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  handleStepFour(selected_seeds: Array<string>) {

    //turn the seed back into an array, sort it and put it back to a string
    let seed_compare = this.seed.split(" ").sort().join(" ");
    let selected_compare = selected_seeds.sort().join(" ");

    if (seed_compare == selected_compare)
    {
      const request:any = {
        label: this.new_wallet.name,
        seed: this.seed,
        aCount: 1,
        encrypted: this.new_wallet.encrypted,
        password: this.new_wallet.encrypted ? this.new_wallet.password : null,
      };

      this.apiService.postWalletsNew(request).subscribe(response => {
        this.closeWindow();
      });
    }
    else
    {
      alert("Sorry, that is incorrect!");
    }
  }

  closeWindow() {
    this.dialogRef.close();
  }
}
