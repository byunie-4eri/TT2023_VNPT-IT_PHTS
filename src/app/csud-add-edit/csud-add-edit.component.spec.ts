import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsudAddEditComponent } from './csud-add-edit.component';

describe('CsudAddEditComponent', () => {
  let component: CsudAddEditComponent;
  let fixture: ComponentFixture<CsudAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CsudAddEditComponent]
    });
    fixture = TestBed.createComponent(CsudAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
