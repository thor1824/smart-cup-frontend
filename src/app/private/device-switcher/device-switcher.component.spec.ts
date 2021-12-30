import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSwitcherComponent } from './device-switcher.component';

describe('DeviceSwitcherComponent', () => {
  let component: DeviceSwitcherComponent;
  let fixture: ComponentFixture<DeviceSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceSwitcherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
