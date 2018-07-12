import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-show-seed',
  templateUrl: './show-seed.component.html',
  styleUrls: ['./show-seed.component.scss']
})
export class ShowSeedComponent {

  @Input() seed: string;
  @Output() onSubmit = new EventEmitter();

  customSeed: boolean = false;

  next() {
    this.onSubmit.emit(this.seed);
  }
}
