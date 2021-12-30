import { TestBed } from '@angular/core/testing';

import { EventFeedService } from './event-feed.service';

describe('HistoryService', () => {
  let service: EventFeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventFeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
