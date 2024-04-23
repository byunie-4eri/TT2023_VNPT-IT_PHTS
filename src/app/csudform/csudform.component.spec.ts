import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsudformComponent } from './csudform.component';

describe('CsudformComponent', () => {
  let component: CsudformComponent;
  let fixture: ComponentFixture<CsudformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CsudformComponent]
    });
    fixture = TestBed.createComponent(CsudformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
