import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  @Output() onSubmit = new EventEmitter();

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      encrypted: [false],
      password: [''],
      password2: ['']
    });

    this.form.get('encrypted')
      .valueChanges.subscribe((value: boolean) => {
       setTimeout(() => {
          if (value) {       
               this.form.get('password').setValidators(Validators.required);
               this.form.get('password2').setValidators(Validators.required);
          } else {
              this.form.get('password').clearValidators();
              this.form.get('password2').clearValidators()
        }
      });
    });
  }

  submit() {
    this.onSubmit.emit(this.form.value);
  }
}
