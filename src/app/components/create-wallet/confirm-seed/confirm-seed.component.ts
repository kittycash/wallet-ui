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

  selected_seeds: Array<string> = [];

  next() {
    this.onSubmit.emit(this.selected_seeds);
  }

  doCloseWindow() {
    console.log("Closing Window");
    this.closeWindow.emit();
  }

  wordSelected(word:any)
  {
  	let index = this.selected_seeds.indexOf(word);
  	return index > -1;
  }

  toggleWord(word:any) {
  	let index = this.selected_seeds.indexOf(word);
  	if (index > -1)
  	{
  		this.selected_seeds.splice(index, 1);
  	}
  	else
  	{
  		this.selected_seeds.push(word);
  	}
  }
}
