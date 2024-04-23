import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThnAddEditComponent } from './thn-add-edit.component';

describe('ThnAddEditComponent', () => {
  let component: ThnAddEditComponent;
  let fixture: ComponentFixture<ThnAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThnAddEditComponent]
    });
    fixture = TestBed.createComponent(ThnAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
