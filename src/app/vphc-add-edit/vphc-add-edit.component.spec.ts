import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VphcAddEditComponent } from './vphc-add-edit.component';

describe('VphcAddEditComponent', () => {
  let component: VphcAddEditComponent;
  let fixture: ComponentFixture<VphcAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VphcAddEditComponent]
    });
    fixture = TestBed.createComponent(VphcAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
