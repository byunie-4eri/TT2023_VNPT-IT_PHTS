import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThnformComponent } from './thnform.component';

describe('ThnformComponent', () => {
  let component: ThnformComponent;
  let fixture: ComponentFixture<ThnformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThnformComponent]
    });
    fixture = TestBed.createComponent(ThnformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
