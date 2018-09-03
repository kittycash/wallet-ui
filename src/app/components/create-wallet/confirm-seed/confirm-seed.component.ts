import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-seed',
  templateUrl: './confirm-seed.component.html',
  styleUrls: ['./confirm-seed.component.scss']
})
export class ConfirmSeedComponent {

  @Input() seed: string;
  @Input() fake_seeds: Array<string>;
  @Output() onSubmit = new EventEmitter();
  @Output() closeWindow = new EventEmitter();

  selected_seeds: Array<any> = [];

  next() {

    //Convert the object array to a string array
    let selected_seeds = [];

    for (var i = 0; i < this.selected_seeds.length; i++)
    {
      selected_seeds.push(this.selected_seeds[i].word);
    }

    this.onSubmit.emit(selected_seeds);
  }

  doCloseWindow() {
    this.closeWindow.emit();
  }

  wordSelected(index:any)
  {

    for (var i = 0; i < this.selected_seeds.length; i++)
    {
      if (this.selected_seeds[i].index == index)
      {
        return true;
      }
    }

    return false;
  }

  toggleWord(index:any, word:string) {

    if (this.wordSelected(index))
    {
      let index_to_splice = -1;
      for (var i = 0; i < this.selected_seeds.length; i++)
      {
        if (this.selected_seeds[i].index == index)
        {
          index_to_splice = i;
          break;
        }
      }

      if (index_to_splice > -1)
      {
        this.selected_seeds.splice(index_to_splice, 1);
      }
    }
    else
    {
      this.selected_seeds.push({index: index, word: word});
    }
  }
}
