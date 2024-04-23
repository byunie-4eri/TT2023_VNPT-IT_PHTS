import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VphcformComponent } from './vphcform.component';

describe('VphcformComponent', () => {
  let component: VphcformComponent;
  let fixture: ComponentFixture<VphcformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VphcformComponent]
    });
    fixture = TestBed.createComponent(VphcformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
