import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricFeedComponent } from './metric-feed.component';

describe('MetricFeedComponent', () => {
  let component: MetricFeedComponent;
  let fixture: ComponentFixture<MetricFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetricFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
