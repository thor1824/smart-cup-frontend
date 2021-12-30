import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFeedComponent } from './event-feed.component';

describe('HistoryComponent', () => {
  let component: EventFeedComponent;
  let fixture: ComponentFixture<EventFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
