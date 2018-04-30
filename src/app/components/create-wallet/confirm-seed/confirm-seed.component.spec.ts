import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmSeedComponent } from './confirm-seed.component';

describe('ConfirmSeedComponent', () => {
  let component: ConfirmSeedComponent;
  let fixture: ComponentFixture<ConfirmSeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmSeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmSeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
